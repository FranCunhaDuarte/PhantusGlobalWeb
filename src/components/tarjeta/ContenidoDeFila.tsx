import Punta from '@/components/ui/Punta';
import { clases } from '@/lib/clases';

/**
 * Cada canal es una fila entera con su pelo abajo y la punta que se corre al
 * apuntar: la misma pieza que las secciones en el panel del menú. El rótulo va
 * arriba en versalita gris y el dato debajo en el color del texto, como los
 * canales de la sección de contacto: lo que se lee es el dato.
 *
 * Mide 64 px como mínimo porque la tarjeta se abre casi siempre en un teléfono,
 * y se toca en cualquier punto de la fila.
 */
export const FILA = clases(
  'group flex min-h-16 w-full items-center justify-between gap-4 py-3 text-start',
  'border-b border-(color:--fondo-separador)',
  'transition-colors duration-200 motion-reduce:transition-none',
  'hover:texto-realce'
);

type ContenidoDeFilaProps = {
  rotulo: string;
  dato: string;
  claseDePunta?: string;
};

export default function ContenidoDeFila({
  rotulo,
  dato,
  claseDePunta
}: ContenidoDeFilaProps) {
  return (
    <>
      <span className="flex min-w-0 flex-col gap-1">
        <span className="text-eyebrow uppercase texto-suave">{rotulo}</span>
        <span className="truncate font-medium">{dato}</span>
      </span>
      <Punta className={clases('texto-realce', claseDePunta)} />
    </>
  );
}
