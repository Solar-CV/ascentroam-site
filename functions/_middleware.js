/* ============================================================
   Cloudflare Pages Functions middleware — IP language hint
   Mainland China (cf-ipcountry = CN) gets __AR_LANG__ = "zh".
   Everyone else gets no hint and falls back to browser language.
   A stored ar-lang choice always wins in useLanguage().
   ============================================================ */

export async function onRequest(context) {
  const { request, next } = context;
  const country = request.headers.get('cf-ipcountry') || '';
  const acceptsHtml = (request.headers.get('Accept') || '').includes('text/html');

  const response = await next();

  // Only transform HTML documents. JS, CSS, images and fonts are untouched.
  if (country === 'CN' && acceptsHtml) {
    return new HTMLRewriter()
      .on('head', {
        element(el) {
          // Prepend so the inline theme/language bootstrap in index.html
          // can read window.__AR_LANG__ on its very first run.
          el.prepend('<script>window.__AR_LANG__="zh"</script>', { html: true });
        },
      })
      .transform(response);
  }

  return response;
}
