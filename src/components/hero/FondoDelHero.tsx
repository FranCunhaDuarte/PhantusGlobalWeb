import Image from 'next/image';
import VideoDelHero from '@/components/hero/VideoDelHero';
import { clases } from '@/lib/clases';
import foto from '@/imagenes/hero-mar.jpg';

/**
 * Fondo de la sección entera. Va absoluto contra el `<section>`, que es el
 * ancestro posicionado, así que el relleno del `Container` no lo recorta y
 * sangra de borde a borde sin negativos. El hero sube la altura del header, de
 * modo que esta caja incluye la banda que queda debajo de la barra.
 */
const CAJA = 'pointer-events-none absolute inset-0 overflow-hidden';

/** Los dos barcos quedan en la banda central; centrar no corta ninguno. */
const ENCUADRE = 'object-cover object-[62%_center]';

/**
 * Negro sobre el video, y la opacidad no se elige a ojo. El peor cuadro posible
 * es blanco puro: ahí el compuesto es gris `(1 - α)`, y para que el crema del
 * texto (#F2ECE2, L = 0,8436) llegue a los 4,5:1 que pide el texto chico del
 * hero hace falta que el fondo no supere L = 0,1486, o sea sRGB 0,4217. De
 * `1 - α ≤ 0,4217` sale `α ≥ 0,578`; redondeado hacia arriba, 58 %. Con eso el
 * piso son 4,53:1 **sin mirar qué muestra el video**, y todo lo que el video
 * aporte de oscuro sólo lo mejora.
 */
const VELO = 'absolute inset-0 bg-black/58';

export default function FondoDelHero() {
  return (
    <div aria-hidden className={CAJA}>
      <Image
        src={foto}
        alt=""
        fill
        sizes="100vw"
        // Es el elemento más grande de la primera pantalla y le gana al `h1`:
        // descubierta al parsear el `<img>` costaba 2,33 s con red y CPU de
        // móvil, declarada en el `<head>` baja a 1,41 s. Además es el póster del
        // video, así que tiene que estar pintada antes de que el video exista.
        preload
        placeholder="blur"
        className={ENCUADRE}
      />
      <VideoDelHero className={clases('absolute inset-0 size-full', ENCUADRE)} />
      <div className={VELO} />
    </div>
  );
}
