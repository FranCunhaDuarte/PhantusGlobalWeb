import type { ReactNode } from 'react';

type PasoDelProcesoProps = {
  orden: number;
  titulo: ReactNode;
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
    <li className="grid gap-x-8 gap-y-3 border-t borde-seccion py-7 md:grid-cols-[3rem_minmax(0,4fr)_minmax(0,7fr)] md:items-baseline">
      {/* El orden ya lo dice la lista; el número es decoración tipográfica. */}
      <span aria-hidden className="text-xl tabular-nums texto-suave">
        {String(orden).padStart(2, '0')}
      </span>
      <h2 className="text-xl leading-snug">{titulo}</h2>
      <p className="text-entrada">{texto}</p>
    </li>
  );
}
