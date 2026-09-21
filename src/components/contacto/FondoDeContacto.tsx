import Image from 'next/image';
import foto from '@/imagenes/contacto-mar.jpg';

/**
 * Fondo de la sección entera. Va absoluta contra el `<section>`, que es el
 * ancestro posicionado, así que el relleno del `Container` no la recorta.
 *
 * El velo es **bordó al 70 %** y no un negro genérico: la sección sigue siendo
 * la bordó de la home, con foto adentro. El número está medido contra el píxel
 * más claro de la foto (luminancia 214 de 255), que es el peor caso real: ahí
 * el crema del texto queda en 5,29:1, por encima de los 4,5 que pide el texto
 * chico. Con un velo más flojo la entrada y el rótulo caen por debajo.
 *
 * Decorativa, `alt` vacío: el texto de la sección no depende de ella.
 */
export default function FondoDeContacto() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <Image
        src={foto}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-accent/70" />
    </div>
  );
}
