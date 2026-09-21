'use client';

import { useTranslations } from 'next-intl';
import EnlaceDeSeccion from '@/components/layout/EnlaceDeSeccion';
import { SECCIONES_DEL_HEADER, type IdSeccion } from '@/content/secciones';
import { clases } from '@/lib/clases';

type NavegacionDeSeccionesProps = {
  /** Nombre accesible del landmark: hay más de un `nav` por página. */
  etiqueta: string;
  secciones?: readonly IdSeccion[];
  orientacion?: 'horizontal' | 'vertical' | 'panel';
  alNavegar?: () => void;
  className?: string;
};

const DISPOSICION = {
  // El aire de adentro del grupo es menor que el que lo separa del bloque de
  // controles: si no, la última sección se lee más cerca del selector de idioma
  // que de la sección anterior.
  horizontal: 'flex-row flex-wrap items-center gap-x-5 gap-y-2 xl:gap-x-6',
  vertical: 'flex-col gap-1',
  // Sin aire entre ítems: cada uno trae su propio pelo abajo y el aire va
  // adentro de la fila, para que el área táctil sea la fila entera y no el
  // texto.
  panel: 'flex-col'
} as const;

/**
 * El subrayado entra desde el borde izquierdo en vez de bajar la opacidad, y lo
 * pinta el realce del fondo vigente (bordó sobre crema, crema sobre los
 * oscuros). Va como fondo y no como `text-decoration` porque el ancho de un
 * subrayado no se anima, y porque así el estado activo y el hover ocupan
 * exactamente la misma línea en vez de dibujar dos.
 */
const ENLACE = clases(
  'inline-block py-1 font-medium',
  'bg-[image:linear-gradient(var(--fondo-realce),var(--fondo-realce))]',
  'bg-no-repeat bg-[position:0_100%] bg-[length:0%_2px]',
  'transition-[background-size,color] duration-200 motion-reduce:transition-none',
  'hover:bg-[length:100%_2px] focus-visible:bg-[length:100%_2px]',
  'aria-[current]:texto-realce aria-[current]:bg-[length:100%_2px]'
);

/**
 * En el panel el enlace no es una palabra sino una fila: ocupa el ancho, se
 * toca en cualquier punto y el subrayado que crece desde el borde no tendría
 * sentido —ya ocupa todo—. El realce lo da el color y la punta, que se corre.
 */
const ENLACE_DE_PANEL = clases(
  'group flex items-center justify-between gap-4 py-4 font-medium',
  'border-b border-(color:--fondo-separador)',
  'transition-colors duration-200 motion-reduce:transition-none',
  'hover:texto-realce aria-[current]:texto-realce'
);

/**
 * La lista de secciones mezcla rutas y anclas de la home. A dónde apunta cada
 * una lo resuelve `EnlaceDeSeccion`; acá sólo se arma la lista y su disposición.
 */
export default function NavegacionDeSecciones({
  etiqueta,
  secciones = SECCIONES_DEL_HEADER,
  orientacion = 'horizontal',
  alNavegar,
  className
}: NavegacionDeSeccionesProps) {
  const t = useTranslations('secciones');

  return (
    <nav aria-label={etiqueta} className={className}>
      <ul className={clases('flex', DISPOSICION[orientacion])}>
        {secciones.map((seccion) => (
          <li key={seccion}>
            <EnlaceDeSeccion
              seccion={seccion}
              onClick={alNavegar}
              className={orientacion === 'panel' ? ENLACE_DE_PANEL : ENLACE}
            >
              {t(seccion)}
              {orientacion === 'panel' && <Punta />}
            </EnlaceDeSeccion>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Se corre al apuntar: el mismo gesto que el subrayado en la barra. */
function Punta() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5 flex-none transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
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
