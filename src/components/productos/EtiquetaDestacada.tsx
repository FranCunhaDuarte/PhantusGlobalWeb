import { clases } from '@/lib/clases';

/**
 * Cuál es la que más se mueve. Va **rellena** y no con contorno, que es como se
 * distingue de la etiqueta de régimen: aquella describe bajo qué régimen entra
 * la especie, ésta no describe nada —destaca—. Si las dos caen en la misma
 * ficha, el peso las separa sin necesidad de ubicarlas distinto.
 *
 * Va a cuerpo chico: se monta sobre la esquina de fichas compactas —las del
 * catálogo miden 220 px— y a cuerpo de texto tapaba el recorte.
 */
export default function EtiquetaDestacada({
  children,
  className
}: {
  children: string;
  className?: string;
}) {
  return (
    <p
      className={clases(
        'inline-flex bg-accent px-2.5 py-1 text-xs font-semibold tracking-[0.1em] text-ink-inverse uppercase',
        className
      )}
    >
      {children}
    </p>
  );
}
