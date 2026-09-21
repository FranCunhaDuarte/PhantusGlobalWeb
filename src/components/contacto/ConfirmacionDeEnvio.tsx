import type { Ref } from 'react';
import Button from '@/components/ui/Button';

type ConfirmacionDeEnvioProps = {
  refDelTitulo: Ref<HTMLHeadingElement>;
  titulo: string;
  texto: string;
  otra: string;
  alEscribirOtra: () => void;
};

/**
 * El visitante se queda donde está: no hay redirección ni recarga, el
 * formulario se reemplaza por esto y el ancla sigue siendo la misma.
 *
 * El título recibe el foco al aparecer —el botón que se acaba de pulsar ya no
 * existe—, así que es también el que anuncia el resultado: por eso lleva
 *`tabIndex={-1}`y queda antes del botón de escribir otra, para que desde ahí
 * se siga tabulando hacia adelante.
 */
export default function ConfirmacionDeEnvio({
  refDelTitulo,
  titulo,
  texto,
  otra,
  alEscribirOtra
}: ConfirmacionDeEnvioProps) {
  return (
    <div className="flex flex-col items-start gap-4">
      <span
        aria-hidden="true"
        className="flex size-12 items-center justify-center bg-deep text-ink-inverse"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m5 12.5 4.5 4.5L19 7.5" />
        </svg>
      </span>

      <h3 ref={refDelTitulo} tabIndex={-1} className="text-2xl">
        {titulo}
      </h3>
      <p className="max-w-prose">{texto}</p>

      <Button variante="borde" onClick={alEscribirOtra}>
        {otra}
      </Button>
    </div>
  );
}
