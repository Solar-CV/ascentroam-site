import { useState } from 'react';
import { useLang } from '../context/LangContext.jsx';
import { METHOD, TRACKS } from '../data/content.js';
import { UNITS, START, SUMMIT } from '../data/curriculum.js';
import { pick } from '../lib/i18n.js';

function Strip({ lessons }) {
  return (
    <span className="unit-strip" aria-hidden="true">
      {Array.from({ length: lessons }).map((_, i) => (
        <i
          key={i}
          style={{
            display: 'block',
            width: [1, 1.5, 2.5, 3.5][i % 4] + 'px',
            height: 8 + ((i * 11) % 19) + 'px',
            background: 'currentColor',
            opacity: 0.55,
          }}
        />
      ))}
    </span>
  );
}

export default function Method() {
  const { lang } = useLang();
  const [open, setOpen] = useState('m5i');

  return (
    <section className="section" id="method">
      <div className="shell">
        <div className="sec-rule">
          <span className="label">01 — {pick(METHOD.eyebrow, lang)}</span>
          <span className="label">{pick(METHOD.note, lang)}</span>
        </div>

        <div className="method-top">
          <div className="reveal">
            <h2 className="h-section">{pick(METHOD.title, lang)}</h2>
            <p className="lede" style={{ marginTop: 24 }}>{pick(METHOD.body, lang)}</p>
            <p className="method-aside">{pick(METHOD.aside, lang)}</p>
          </div>

          <div className="reveal" style={{ '--d': '90ms' }}>
            <div className="method-readout">
              <div className="readout-row">
                <span className="readout-num">{START.toLocaleString('en-US')}</span>
                <span className="readout-arrow">→</span>
                <span className="readout-num apex">{SUMMIT.toLocaleString('en-US')}</span>
              </div>
              <div className="readout-bar" aria-hidden="true">
                {UNITS.map((u) => (
                  <i
                    key={u.id}
                    style={{
                      flex: 1,
                      height: 6 + ((u.altitude - 1200) / (SUMMIT - 1200)) * 24 + 'px',
                      background: u.track === 'trek' ? 'var(--blue)' : 'var(--ink)',
                      opacity: u.track === 'trek' ? 0.55 : 0.82,
                    }}
                  />
                ))}
              </div>
              <div className="readout-sub">
                <span className="label" style={{ marginRight: 10 }}>{pick(METHOD.start, lang)}</span>
                {START.toLocaleString('en-US')} m
                <span style={{ margin: '0 10px', opacity: 0.5 }}>/</span>
                <span className="label" style={{ marginRight: 10 }}>{pick(METHOD.summit, lang)}</span>
                {SUMMIT.toLocaleString('en-US')} m
              </div>
            </div>
          </div>
        </div>

        <div className="ladder">
          {UNITS.map((unit, idx) => {
            const isOpen = open === unit.id;
            return (
              <div className={'unit' + (isOpen ? ' open' : '')} key={unit.id}>
                <button
                  className="unit-head"
                  type="button"
                  onClick={() => setOpen(isOpen ? null : unit.id)}
                  aria-expanded={isOpen}
                >
                  <span className="unit-alt">
                    {unit.altitude.toLocaleString('en-US')}
                    <b>{unit.lessons} L</b>
                  </span>
                  <span>
                    <span className="unit-title">{pick(unit.title, lang)}</span>
                    <span className="unit-code">
                      {unit.code} · {unit.lessons} {pick(METHOD.lessons, lang)}
                    </span>
                  </span>
                  <Strip lessons={unit.lessons} />
                  <span className="unit-plus" aria-hidden="true" />
                </button>

                <div className="unit-body-wrap">
                  <div className="unit-body">
                    <div className="unit-body-inner">
                      <div>
                        <p className="unit-sub">{pick(unit.subtitle, lang)}</p>
                        <div className="topics">
                          {unit.topics.map((topic, i) => (
                            <span className="topic" key={i}>{pick(topic, lang)}</span>
                          ))}
                        </div>
                      </div>
                      <div className="unit-targets">
                        <span className="label">{pick(METHOD.peaksLabel, lang)}</span>
                        {unit.peaks.map((peak) => (
                          <div className="target-row" key={peak.en}>
                            <span>
                              {lang === 'zh' ? peak.zh : peak.en}
                              {peak.note && (
                                <span style={{ color: 'var(--muted)', fontSize: 10, marginLeft: 8 }}>
                                  {pick(peak.note, lang)}
                                </span>
                              )}
                            </span>
                            <span className="alt">{peak.alt} m</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
