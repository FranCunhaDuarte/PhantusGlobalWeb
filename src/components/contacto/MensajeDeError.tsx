/**
 * El error no se comunica sólo con el color: hay ícono, texto y, en el control,
 * `aria-invalid`. Alguien que no distingue el rojo lo ve igual.
 */
export default function MensajeDeError({
  id,
  children
}: {
  id: string;
  children: string;
}) {
  return (
    <p id={id} className="flex items-start gap-1.5 text-sm texto-error">
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="mt-0.5 size-4 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <circle cx="10" cy="10" r="8" />
        <path d="M10 6v5" />
        <path d="M10 14h.01" />
      </svg>
      {children}
    </p>
  );
}
