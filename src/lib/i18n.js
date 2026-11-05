export const B = (zh, en) => ({ zh, en });

export const pick = (value, lang) => {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  return value[lang] ?? value.en ?? value.zh ?? '';
};
