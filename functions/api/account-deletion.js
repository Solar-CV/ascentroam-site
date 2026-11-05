const MAX_BODY = 12000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      ...extraHeaders,
    },
  });
}

function clean(value, max) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export async function onRequestPost({ request, env }) {
  const type = request.headers.get('content-type') || '';
  if (!type.toLowerCase().includes('application/json')) {
    return json({ ok: false, error: 'invalid_content_type' }, 415);
  }

  let raw;
  try {
    raw = await request.text();
  } catch (e) {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }
  if (raw.length > MAX_BODY) {
    return json({ ok: false, error: 'payload_too_large' }, 413);
  }

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch (e) {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }

  // Honeypot: accept quietly and forward nothing.
  if (clean(payload.website, 200)) {
    return json({ ok: true, requestId: null }, 202);
  }

  const email = clean(payload.email, 254).toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return json({ ok: false, error: 'invalid_email' }, 400);
  }
  if (payload.confirm !== true) {
    return json({ ok: false, error: 'confirmation_required' }, 400);
  }

  if (!env || !env.ACCOUNT_DELETION_WEBHOOK) {
    return json({ ok: false, error: 'not_configured' }, 503);
  }

  const requestId = crypto.randomUUID();
  const receivedAt = new Date().toISOString();
  const forward = {
    type: 'account_deletion_request',
    requestId,
    receivedAt,
    app: 'AscentRoam',
    package: 'com.ascentroam.app',
    source: 'web',
    locale: payload.locale === 'zh' ? 'zh' : 'en',
    email,
    identifier: clean(payload.identifier, 120),
    note: clean(payload.note, 1000),
  };

  const headers = { 'content-type': 'application/json' };
  if (env.ACCOUNT_DELETION_TOKEN) {
    headers.authorization = 'Bearer ' + env.ACCOUNT_DELETION_TOKEN;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(env.ACCOUNT_DELETION_WEBHOOK, {
      method: 'POST',
      headers,
      body: JSON.stringify(forward),
      signal: controller.signal,
    });

    if (!response.ok) {
      return json({ ok: false, error: 'upstream_error' }, 502);
    }

    let result = null;
    try {
      result = await response.json();
    } catch (e) {}
    const id = result && (result.requestId || result.id) ? String(result.requestId || result.id) : requestId;

    return json({ ok: true, requestId: id, receivedAt }, 202);
  } catch (error) {
    const timeout = error && error.name === 'AbortError';
    return json({ ok: false, error: timeout ? 'upstream_timeout' : 'upstream_unreachable' }, 502);
  } finally {
    clearTimeout(timer);
  }
}

export async function onRequestGet() {
  return json({ ok: false, error: 'method_not_allowed' }, 405, { allow: 'POST, OPTIONS' });
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: { allow: 'POST, OPTIONS', 'cache-control': 'no-store' },
  });
}
