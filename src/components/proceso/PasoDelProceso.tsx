import type { ReactNode } from 'react';
import { clases } from '@/lib/clases';

type PasoDelProcesoProps = {
  orden: number;
  /**
   * **Opcional, y por eso el paso tiene dos formas.** Los cinco de
   * `/como-trabajamos` tienen un nombre propio —Sourcing, Especificación
   * técnica— y ahí el título es lo que se busca al barrer la lista. Los cuatro
   * de `/nosotros` son una frase cada uno y nada más: ponerles un título sería
   * inventar copy que el cliente no mandó, así que ahí la frase ocupa las dos
   * columnas de texto.
   */
  titulo?: ReactNode;
  texto: ReactNode;
};

/**
 * Un paso por renglón: número, título y texto en tres columnas desde `md`. La
 * línea de arriba la pone cada paso y la de abajo la lista, así el bloque queda
 * cerrado por los dos lados sin que el último paso sea un caso aparte.
 */
export default function PasoDelProceso({
  orden,
  titulo,
  texto
}: PasoDelProcesoProps) {
  return (
    <li
      className={clases(
        'grid gap-x-8 gap-y-3 border-t borde-seccion py-7 md:items-baseline',
        titulo
          ? 'md:grid-cols-[3rem_minmax(0,4fr)_minmax(0,7fr)]'
          : 'md:grid-cols-[3rem_minmax(0,11fr)]'
      )}
    >
      {/* El orden ya lo dice la lista; el número es decoración tipográfica. */}
      <span aria-hidden className="text-xl tabular-nums texto-suave">
        {String(orden).padStart(2, '0')}
      </span>
      {titulo && <h2 className="text-xl leading-snug">{titulo}</h2>}
      <p className="text-entrada">{texto}</p>
    </li>
  );
}
