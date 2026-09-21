import Image, { type StaticImageData } from 'next/image';

/**
 * El fondo de la apertura de una subpágina: una foto a sangre con el velo de
 * marca encima. Lo usan `/nosotros`, `/mercados` y `/productos`.
 *
 * **No es `FondoDelHero`**, que es el de la home y tiene tres capas —póster,
 * video y velo— porque ahí hay video. Acá la foto es la única capa.
 *
 * Va absoluto contra el `<section>`, que es el ancestro posicionado, así que el
 * relleno del `Container` no lo recorta y sangra de borde a borde sin márgenes
 * negativos. Quien lo monta tiene que declarar `relative isolate` en su
 * `Section`.
 *
 * **El velo es negro al 58 % y es el mismo número del hero de la home, por la
 * misma cuenta.** El peor píxel posible es blanco puro: ahí el compuesto es el
 * gris `1 - α`, y para que el crema del texto (#F2ECE2, L = 0,8436) llegue a los
 * 4,5:1 que pide el texto chico hace falta L ≤ 0,1486, o sea sRGB 0,4217. De
 * `1 - α ≤ 0,4217` sale `α ≥ 0,578`. Al estar calculado contra blanco, **vale
 * para cualquier foto**: no hay que medirle el píxel más claro a ninguna de las
 * tres ni a la que las reemplace. El de la sección de contacto sí está medido
 * contra su foto, porque ahí el velo es bordó y no negro.
 *
 * Decorativa, `alt` vacío: el texto de la sección no depende de ella.
 */
export default function FondoDeApertura({ foto }: { foto: StaticImageData }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <Image
        src={foto}
        alt=""
        fill
        sizes="100vw"
        // Es lo más grande de la primera pantalla de su página y le gana al
        // `h1`, igual que el póster en la home.
        preload
        placeholder="blur"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/58" />
    </div>
  );
}
