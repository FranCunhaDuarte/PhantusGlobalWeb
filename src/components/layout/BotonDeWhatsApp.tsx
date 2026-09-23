import { useTranslations } from 'next-intl';
import IconoDeWhatsApp from '@/components/contacto/IconoDeWhatsApp';
import { WHATSAPP } from '@/content/contacto-directo';

/**
 * El único elemento fijo del sitio: el acceso a WhatsApp, abajo a la derecha y
 * en todas las páginas.
 *
 * ## El verde es el de WhatsApp y el glifo no es blanco
 *
 * **Blanco sobre el verde de WhatsApp da 1,98:1**, por debajo del 3:1 que pide
 * un elemento no textual, y es la combinación que usa la propia marca. Con el
 * glifo en **tinta** el mismo verde da **9,32:1**. Así que el fondo se queda en
 * el verde —que es lo que hace que el botón se reconozca de lejos, y la única
 * razón para traer un color de afuera de la paleta— y el dibujo va en el color
 * del sitio.
 *
 * **El verde contra el crema de la página da 1,69:1**, así que el borde del
 * botón por sí solo no se distingue del fondo. Lo resuelve la sombra, que es lo
 * que lo despega; sin ella, sobre el crema el botón se lee como una mancha
 * apoyada y no como un control.
 *
 * ## Por qué es cuadrado
 *
 * Un botón flotante de WhatsApp suele ser un círculo, y acá no: las tarjetas,
 * los botones y hasta el pulgar de la barra de desplazamiento son cuadrados, y
 * un círculo sería la única forma redonda del sitio. Lo que tiene que
 * reconocerse es el glifo y el verde, no la silueta.
 *
 * ## El apilado
 *
 * Va en `z-20`, **debajo del header** (`z-30`), para que al scrollear no se
 * monte sobre la barra. El menú mobile no compite: es un `<dialog>` con
 * `showModal()`, o sea que vive en la capa superior y queda encima de todo sin
 * pelear por un número.
 *
 * Mide 56 px, que es el alto del botón `grande` del formulario y bastante más
 * que los 24 del mínimo de área de toque.
 */
export default function BotonDeWhatsApp() {
  const t = useTranslations('whatsapp');

  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noreferrer"
      aria-label={t('aria')}
      className="fixed right-5 bottom-5 z-20 flex size-14 items-center justify-center bg-[#25D366] text-ink shadow-lg transition-transform duration-200 hover:scale-105 focus-visible:outline-[3px] focus-visible:outline-offset-0 focus-visible:outline-ink motion-reduce:transition-none motion-reduce:hover:scale-100"
    >
      <IconoDeWhatsApp className="size-7" />
    </a>
  );
}
