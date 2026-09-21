import Image, { type StaticImageData } from 'next/image';
import type { ReactNode } from 'react';

/**
 * Las dos proporciones que usa el sitio, con las clases literales acá porque
 * Tailwind lee el código fuente y no resuelve una clase armada por quien la
 * consume.
 *
 * `ancha` es la del índice de unidades: dos tarjetas a media pantalla, donde un
 * 3:2 ya mide 686 × 457 y crecer más la deja sin nada al lado.
 *
 * `alta` es la de las tres tarjetas de la home. Es 3:2 **sólo en el teléfono**,
 * donde las tres van apiladas y una atrás de otra en vertical convertiría el
 * índice en tres pantallas de scroll; desde `md`, que es donde entran las tres
 * en fila, pasa a 4:5 y la tarjeta se para.
 */
const PROPORCIONES = {
  ancha: 'aspect-[3/2]',
  alta: 'aspect-[3/2] md:aspect-[4/5]'
} as const;

const ENLACE =
  'group relative isolate flex w-full items-center justify-center overflow-hidden';

type TarjetaConFotoProps = {
  /**
   * La tarjeta no arma su propio enlace: recibe el contenido y las clases, y
   * quien la monta decide con qué lo envuelve. Es lo que deja que el índice de
   * la home pase por `EnlaceDeSeccion` —el único que sabe si una sección es ruta
   * o ancla— y el de unidades, por el `Link` tipado con su ruta directa.
   */
  enlace: (contenido: ReactNode, clases: string) => ReactNode;
  foto: StaticImageData;
  nombre: string;
  /** Anchos que llega a medir la foto; los declara la grilla, que es la que
   *  sabe cuántas columnas hay. */
  medidas: string;
  forma?: keyof typeof PROPORCIONES;
  nivel?: 2 | 3;
};

/**
 * Una foto, un velo y un nombre encima. Es la tarjeta de las dos grillas que el
 * sitio usa para elegir a dónde ir: las tres secciones en la home y las dos
 * unidades de negocio en `/productos`.
 *
 * **El velo es negro al 50 % y el número no es de gusto.** El nombre va en crema
 * (#F2ECE2, L = 0,8436) y el peor píxel de las cuatro fotos es casi blanco puro
 * —la de carnes llega a (255, 255, 253)—, así que la cuenta se hace contra
 * blanco igual que en el hero. Al 50 % el compuesto queda en L = 0,2140 y el
 * contraste entre **3,39 y 3,40:1**, que es lo que pide el texto grande. El
 * nombre va en 30 px, bien por encima de los 24 px que marcan ese umbral sin
 * mirar el peso. El hero necesita 58 % porque ahí el texto es chico y el piso es
 * 4,5:1; acá subir a 58 % sería pagar foto embarrada por un contraste que el
 * tamaño del nombre no exige.
 *
 * **Si el nombre alguna vez achica, el velo vuelve a 58 %**: al 50 % el texto
 * chico queda en 3,39:1 y no llega. Y toda foto nueva que entre acá tiene que
 * pasar la misma cuenta contra su píxel más claro.
 *
 * El nombre va en mayúsculas, como el titular del hero: son los dos únicos
 * lugares del sitio donde una mayúscula ocupa ese cuerpo.
 *
 * La tarjeta entera es el enlace, no un botón adentro: el destino es uno solo y
 * el área de toque de un teléfono es la tarjeta. La foto no lleva `alt` porque
 * el nombre que va encima es su descripción.
 */
export default function TarjetaConFoto({
  enlace,
  foto,
  nombre,
  medidas,
  forma = 'ancha',
  nivel = 2
}: TarjetaConFotoProps) {
  const Titulo = `h${nivel}` as const;

  const contenido = (
    <>
      <Image
        src={foto}
        alt=""
        sizes={medidas}
        placeholder="blur"
        className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      {/* Plano y sobre toda la tarjeta, no en degradé: el nombre va centrado y
          un degradé dejaría con menos velo justo la mitad por la que pasa. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-black/50 transition-colors duration-300 group-hover:bg-black/40 motion-reduce:transition-none"
      />

      {/* El salto de "Pescados y mariscos" viene en el propio catálogo y lo
          respeta `whitespace-pre-line`: dónde corta un nombre es parte del
          nombre, no algo que el componente pueda adivinar del ancho. El inglés
          no lleva salto porque "Seafood" es una palabra. */}
      <Titulo className="px-6 text-center text-3xl leading-tight font-semibold whitespace-pre-line uppercase sm:text-4xl">
        {nombre}
      </Titulo>
    </>
  );

  // `data-fondo` va en el `li` y no en el enlace: quien lo envuelve puede ser
  // `EnlaceDeSeccion`, que no acepta atributos sueltos. El contenido lo hereda
  // igual, que es lo único que importa —el nombre va en crema sobre el velo—.
  return (
    <li className="flex" data-fondo="tinta">
      {enlace(contenido, `${ENLACE} ${PROPORCIONES[forma]}`)}
    </li>
  );
}
