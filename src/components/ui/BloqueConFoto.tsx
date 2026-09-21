import Image, { type StaticImageData } from 'next/image';
import type { ReactNode } from 'react';
import { clases } from '@/lib/clases';

/**
 * El alto del bloque en escritorio. Lo pone el bloque y no el texto: con dos
 * párrafos cortos a un lado, la fila mediría lo que mide el texto y la foto
 * quedaría en una tira. Con esto, la foto manda y el texto se centra al lado.
 *
 * Es más bajo que el de la tarjeta de la ciudad —38rem— porque ahí la foto es el
 * argumento del bloque y acá acompaña a un texto que sí dice algo.
 */
const ALTO = 'md:min-h-[30rem]';

/**
 * El sangrado del lado del texto, que es lo que lo alinea con el resto de la
 * página. El bloque vive en una sección **sin `Container`**, así que la foto
 * llega sola a su borde y el que tiene que ponerse en su sitio es el texto.
 *
 * La cuenta es la del contenedor: su relleno mientras la pantalla entra en el
 * tope del sitio, y la mitad de lo que sobra más el relleno cuando lo pasa. De
 * ahí el `max` contra `72rem`, que es `--container-sitio`. **Si cambia ese token
 * o el relleno de `Container`, cambia esto.**
 *
 * Va en porcentaje y no en `vw` a propósito: `100vw` incluye la barra de
 * desplazamiento y el ancho del contenedor no, así que con `vw` el texto queda
 * unos píxeles corrido del resto. Y va en la grilla y no en la celda del texto
 * porque **el porcentaje se mide contra el bloque contenedor**: en la grilla eso
 * es la sección entera, que es lo que hace falta; en la celda sería su columna.
 */
const SANGRADO = {
  derecha: 'ps-5 sm:ps-[max(2rem,calc((100%-72rem)/2+2rem))]',
  izquierda: 'pe-5 sm:pe-[max(2rem,calc((100%-72rem)/2+2rem))]'
} as const;

/**
 * En el teléfono la foto se sale del sangrado de la grilla. Ahí la grilla es una
 * sola columna, y sin este tirón quedaría con el relleno del contenedor de un
 * lado y cero del otro. Desde `md` el sangrado es problema de la columna del
 * texto y esto no hace falta.
 *
 * **Sin `w-full` en la celda**: con el ancho fijo en el 100 % de su columna, el
 * tirón no la ensancha y la foto termina corta del lado que sangra. En `auto` la
 * celda se estira sola hasta su columna menos los márgenes, y con el margen en
 * negativo eso es la columna más el sangrado.
 */
const TIRON = {
  derecha: '-ms-5 sm:-ms-8 md:ms-0',
  izquierda: '-me-5 sm:-me-8 md:me-0'
} as const;

/** El orden de las columnas. La foto es el segundo hijo del DOM siempre, así que
 *  cuando va a la izquierda se la corre con `order`: el texto tiene que venir
 *  antes en el orden de lectura, que es el que oye un lector de pantalla y el
 *  que manda al apilarse en el teléfono. */
const ORDEN = {
  derecha: '',
  izquierda: 'md:order-first'
} as const;

const COLUMNAS = {
  derecha: 'md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]',
  izquierda: 'md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]'
} as const;

const RELLENO_DEL_TEXTO = {
  derecha: 'pe-5 sm:pe-8 md:pe-14',
  izquierda: 'ps-5 sm:ps-8 md:ps-14'
} as const;

type BloqueConFotoProps = {
  titulo: ReactNode;
  children: ReactNode;
  foto: StaticImageData;
  alt: string;
  /** De qué lado va la foto en escritorio. Apilado siempre queda abajo. */
  lado?: keyof typeof SANGRADO;
  className?: string;
};

/**
 * Un tramo de texto con una foto que llega al borde de la pantalla.
 *
 * **Sale de la tarjeta de la ciudad de `/nosotros`**, que hacía esto mismo con
 * un carrusel adentro. Acá la foto es una sola y el lado es elegible, que es lo
 * que deja alternar dos bloques seguidos —foto a la derecha, foto a la
 * izquierda— y que la página tenga ritmo en vez de dos filas iguales.
 *
 * **La foto lleva `alt` de verdad y no vacío.** En las tarjetas de sección el
 * `alt` va vacío porque el nombre en mayúsculas encima es su descripción; acá no
 * hay nada encima de la foto, así que quien no la ve se quedaría sin saber qué
 * muestra.
 */
export default function BloqueConFoto({
  titulo,
  children,
  foto,
  alt,
  lado = 'derecha',
  className
}: BloqueConFotoProps) {
  return (
    <div
      className={clases(
        'grid',
        COLUMNAS[lado],
        SANGRADO[lado],
        ALTO,
        className
      )}
    >
      <div
        className={clases(
          'flex flex-col items-start gap-5 py-10 md:justify-center',
          RELLENO_DEL_TEXTO[lado]
        )}
      >
        {/* La línea de arriba ancla el bloque: sin ella, el texto flota en el
            medio de una columna alta y no se lee como el arranque de nada. Es la
            misma hairline del extremo de alcance y del valor de marca. */}
        <span aria-hidden className="block h-px w-16 bg-(--fondo-linea)" />
        {titulo}
        {children}
      </div>

      <div
        className={clases(
          'relative isolate aspect-[4/3] md:aspect-auto md:h-full',
          TIRON[lado],
          ORDEN[lado]
        )}
      >
        <Image
          src={foto}
          alt={alt}
          fill
          sizes="(min-width: 48rem) 640px, 100vw"
          placeholder="blur"
          className="object-cover"
        />
      </div>
    </div>
  );
}
