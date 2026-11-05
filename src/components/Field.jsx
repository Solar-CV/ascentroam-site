import { useEffect, useRef } from 'react';
import { LineField } from '../lib/linefield.js';

export default function Field({
  src,
  mode = 'photo',
  seed,
  cell = 7,
  columns = 0,
  cellAspect,
  focusX,
  focusY,
  lens = false,
  skyMask = false,
  animate = false,
  className = '',
  style,
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const field = new LineField(ref.current, {
      src,
      mode,
      seed,
      cell,
      columns,
      cellAspect,
      focusX,
      focusY,
      lens,
      skyMask,
      animate,
    });
    field.start();
    return () => field.destroy();
  }, [src, mode, seed, cell, columns, cellAspect, focusX, focusY, lens, skyMask, animate]);

  return <canvas ref={ref} className={className} style={style} aria-hidden="true" />;
}
