import { useState } from 'react';
import { useLang } from '../context/LangContext.jsx';
import { PRACTICE } from '../data/content.js';
import { pick } from '../lib/i18n.js';

function Quiz() {
  const { lang } = useLang();
  const [picked, setPicked] = useState(null);
  const quiz = PRACTICE.quiz;
  const answered = picked !== null;
  const ok = picked === quiz.answer;

  return (
    <div className="quiz">
      <div className="quiz-meta">
        <span className="label">{pick(PRACTICE.quizKicker, lang)}</span>
        <span className="label" style={{ letterSpacing: '0.12em' }}>01 / 08</span>
      </div>
      <p className="quiz-prompt">{pick(quiz.prompt, lang)}</p>
      <div className="quiz-opts">
        {quiz.options.map((opt, i) => {
          let state;
          if (answered && i === quiz.answer) state = 'correct';
          if (answered && i === picked && !ok) state = 'wrong';
          return (
            <button
              className="quiz-opt"
              key={i}
              type="button"
              data-state={state}
              disabled={answered}
              onClick={() => setPicked(i)}
            >
              <span className="key">{String.fromCharCode(65 + i)}</span>
              <span className="txt">{pick(opt, lang)}</span>
              <span className="mark">{state === 'wrong' ? '×' : '✓'}</span>
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="quiz-feedback">
          <span className={'quiz-verdict ' + (ok ? 'ok' : 'no')}>
            <span className="dot" />
            {ok ? pick(PRACTICE.correct, lang) : pick(PRACTICE.wrong, lang)}
          </span>
          <p className="quiz-exp">{pick(quiz.explanation, lang)}</p>
          <div className="quiz-foot">
            <span>{lang === 'zh' ? '错题进入当课重做' : 'Missed items return in the lesson retry'}</span>
            <button className="quiz-reset" type="button" onClick={() => setPicked(null)}>
              {pick(PRACTICE.next, lang)}
            </button>
          </div>
        </div>
      )}
      {!answered && (
        <div className="quiz-foot">
          <span>{pick(PRACTICE.hint, lang)}</span>
          <span>{lang === 'zh' ? '不扣分' : 'No penalty'}</span>
        </div>
      )}
    </div>
  );
}

export default function Practice() {
  const { lang } = useLang();
  return (
    <section className="section" id="practice">
      <div className="shell">
        <div className="sec-rule">
          <span className="label">03 — {pick(PRACTICE.eyebrow, lang)}</span>
          <span className="label">{pick(PRACTICE.meta, lang)}</span>
        </div>

        <div className="practice-grid">
          <div className="reveal">
            <h2 className="h-section">{pick(PRACTICE.title, lang)}</h2>
            <p className="lede" style={{ marginTop: 22 }}>{pick(PRACTICE.lede, lang)}</p>
            <div className="formats">
              {PRACTICE.formats.map((f) => (
                <div className="format" key={f.n}>
                  <b>{f.n}</b>
                  <span>{lang === 'zh' ? f.zh : f.en}<em>{lang === 'zh' ? f.en : f.zh}</em></span>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal" style={{ '--d': '90ms' }}>
            <Quiz />
          </div>
        </div>
      </div>
    </section>
  );
}
