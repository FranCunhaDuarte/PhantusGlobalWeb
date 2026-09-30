import Punta from '@/components/ui/Punta';
import { clases } from '@/lib/clases';

/**
 * Cada canal es una caja crema suelta sobre el blanco de la página, separada de
 * la siguiente por aire y no por una línea. Al apuntar entra una barra bordó por
 * el borde izquierdo —como sombra interior, así no corre el contenido— y la
 * punta se corre: el mismo gesto que las filas del menú.
 *
 * El rótulo va arriba en versalita gris y el dato debajo en el color del texto,
 * como los canales de la sección de contacto: lo que se lee es el dato. El gris
 * sobre este crema da 4,71:1.
 *
 * Mide 72 px como mínimo porque la tarjeta se abre casi siempre en un teléfono,
 * y se toca en cualquier punto de la caja. Sin esquinas redondeadas, como las
 * tarjetas y los botones del sitio.
 */
export const FILA = clases(
  'group flex min-h-18 w-full items-center justify-between gap-4 bg-surface px-5 py-4 text-start',
  'shadow-[inset_0_0_0_0_var(--color-accent)] hover:shadow-[inset_3px_0_0_0_var(--color-accent)]',
  'transition-shadow duration-200 motion-reduce:transition-none'
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
