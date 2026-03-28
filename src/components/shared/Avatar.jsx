const VARIANTS = ['warm', 'rose', 'sage', 'sand', 'clay'];

function hashToVariant(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return VARIANTS[Math.abs(hash) % VARIANTS.length];
}

export default function Avatar({ id, size = 34 }) {
  const variant = hashToVariant(id || '');
  return (
    <div
      className={`avatar avatar--${variant}`}
      style={{ width: size, height: size, fontSize: size * 0.32 }}
    >
      {id}
    </div>
  );
}
