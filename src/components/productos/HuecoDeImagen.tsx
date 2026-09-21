import Image, { type StaticImageData } from 'next/image';
import Logo from '@/components/ui/Logo';
import { clases } from '@/lib/clases';

/**
 * La proporción del hueco, y el contrato con quien prepare los recortes. Va acá
 * y no en los mapas de imágenes porque Tailwind necesita la clase literal.
 *
 * No es una preferencia: el hueco más chico que produce el layout es la celda
 * del adelanto a 320 px de viewport, que mide 130 px de ancho, y adentro tiene
 * que entrar el isotipo a su mínimo del manual —50 px de arte más su área de
 * seguridad, 88 × 91 px de huella—. A 2:1 esa celda daría 65 px de alto y a 3:2,
 * 87: en las dos la marca de agua se sale. A 4:3 da 101 y entra. Lo que hay que
 * pedir, entonces, es el sujeto compuesto sobre un lienzo 4:3; uno más apaisado
 * entra igual pero deja aire arriba y abajo, porque el recorte va `contain`.
 */
const PROPORCION = 'aspect-4/3';

/**
 * Mientras no hay recorte, el hueco no se deja vacío ni se rellena con un gris
 * con un ícono: lleva el isotipo a un 7 % sobre el crema. Es marca de agua, uno
 * de los usos que el manual le da al isotipo suelto, y a esa opacidad queda por
 * debajo del nombre en vez de competir con él. Es decorativo por definición, así
 * que el bloque va `aria-hidden`.
 */
const MARCA_DE_AGUA = 'opacity-[0.07]';

type HuecoDeImagenProps = {
  /** El recorte, si existe. Sin él se dibuja la marca de agua. */
  recorte?: StaticImageData;
  /** Anchos que llega a medir el hueco; los declara quien lo monta, que es
   *  el que sabe cuántas columnas hay. */
  medidas: string;
  /**
   * Ancho de render del isotipo mientras el hueco está vacío, en el ancho más
   * apretado que llega a medir. `Logo` no baja de 50 px, que es el mínimo del
   * manual para el isotipo suelto, y le suma su área de seguridad: la huella
   * completa de ese mínimo es 88 × 91 px y tiene que entrar en el hueco.
   */
  anchoDeMarca: number;
  /** El mismo isotipo desde `lg`, donde el hueco ya da para más. Se alternan
   *  por visibilidad y no cambiando el ancho de uno solo: es el mismo archivo en
   *  los dos casos, así que el navegador lo pide una vez igual. Sin este dato la
   *  marca mide lo mismo en todos los anchos, que es lo que quiere una caja de
   *  medida fija. */
  anchoDeMarcaGrande?: number;
  className?: string;
};

/**
 * El hueco de un recorte de producto —una especie, un corte—, con la proporción
 * final puesta desde el principio: con imagen o sin ella la caja mide lo mismo,
 * así que enchufar los PNG no mueve nada de lo que está abajo.
 *
 * El `alt` va vacío a propósito: el recorte muestra lo que el nombre de al lado
 * ya dice, y describirlo sería repetir. No es una foto de la operación ni aporta
 * un dato que no esté en el texto.
 */
export default function HuecoDeImagen({
  recorte,
  medidas,
  anchoDeMarca,
  anchoDeMarcaGrande,
  className
}: HuecoDeImagenProps) {
  if (recorte) {
    return (
      <div className={clases('w-full', PROPORCION, className)}>
        <Image
          src={recorte}
          alt=""
          sizes={medidas}
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  // Las dos medidas van en envoltorios y no como clases sueltas del `Logo`: es
  // el caso que `clases()` no resuelve, porque `hidden` y el `inline-flex` que
  // trae el logo pisan la misma propiedad y gana el orden de la hoja.
  return (
    <div
      aria-hidden
      className={clases(
        'flex w-full items-center justify-center',
        PROPORCION,
        MARCA_DE_AGUA,
        className
      )}
    >
      {anchoDeMarcaGrande === undefined ? (
        <Logo forma="isotipo" ancho={anchoDeMarca} />
      ) : (
        <>
          <span className="lg:hidden">
            <Logo forma="isotipo" ancho={anchoDeMarca} />
          </span>
          <span className="hidden lg:inline">
            <Logo forma="isotipo" ancho={anchoDeMarcaGrande} />
          </span>
        </>
      )}
    </div>
  );
}
