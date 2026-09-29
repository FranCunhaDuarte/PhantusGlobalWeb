import { clases } from '@/lib/clases';

/**
 * Se corre al apuntar: el mismo gesto que el subrayado en la barra. Quien la
 * usa tiene que poner `group` en la fila que la contiene.
 */
export default function Punta({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={clases(
        'size-5 flex-none transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none',
        className
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}
