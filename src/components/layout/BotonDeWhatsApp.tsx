'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import IconoDeWhatsApp from '@/components/contacto/IconoDeWhatsApp';
import { WHATSAPP } from '@/content/contacto-directo';
import { usePathname } from '@/i18n/navigation';
import { clases } from '@/lib/clases';

/**
 * Dónde se esconde: **sobre cualquier cierre de página**.
 *
 * El bordó es el fondo del cierre y de ningún otro bloque del sitio —lo usan la
 * sección de contacto de la home y `LlamadaAContacto`, que es el cierre de las
 * demás—, así que `data-fondo` alcanza para encontrarlos sin que cada página
 * tenga que marcarse. El pie entra a la lista porque `/nosotros` no cierra con
 * bordó y sin él ahí el botón no se escondería nunca.
 */
const ZONAS = '[data-fondo="bordo"], footer';

/**
 * El único elemento fijo del sitio: el acceso a WhatsApp, abajo a la derecha y
 * en todas las páginas.
 *
 * ## Va como lo usa WhatsApp: círculo verde y glifo blanco
 *
 * **Es el único elemento redondo del sitio**, donde las tarjetas, los botones y
 * hasta el pulgar de la barra de desplazamiento son cuadrados. Es a propósito:
 * lo que tiene que reconocerse al instante es que es WhatsApp, y la forma es
 * parte de eso tanto como el color.
 *
 * > **El glifo en blanco sobre el verde da 1,98:1**, por debajo del 3:1 que pide
 * > un elemento no textual. Es la combinación de la propia marca y es la que
 * > pidió Franco sabiendo el número, así que queda anotada y no es un olvido.
 * > Estuvo en tinta, que sobre el mismo verde da 9,32:1. Si alguna vez hay que
 * > cumplir el 3:1 sin perder el blanco, el camino es el verde oscuro de la
 * > marca (`#128C7E`), que con blanco da 4,14:1.
 *
 * **El verde contra el crema de la página da 1,69:1**, así que el borde del
 * botón por sí solo no se distingue del fondo. Lo resuelve la sombra, que es lo
 * que lo despega; sin ella, sobre el crema el botón se lee como una mancha
 * apoyada y no como un control.
 *
 * ## Se esconde sobre la sección de contacto, y por dos motivos
 *
 * El primero es medido: en un teléfono de 375 px, con el botón de enviar del
 * formulario a la altura del flotante, **el flotante le tapa 32 px del borde
 * derecho —el 11 %— y ahí el toque cae en el glifo** en vez de en Enviar.
 *
 * El segundo es que ahí sobra: la sección de contacto ya lista WhatsApp al lado
 * del teléfono y del correo, así que el flotante repite un camino que está a la
 * vista.
 *
 * Lo resuelve el mismo mecanismo que el header: un `IntersectionObserver` sobre
 * la sección, que avisa sólo en el cruce y no deja nada corriendo mientras se
 * scrollea. **Se oculta con `opacity` y `pointer-events` y no desmontando**: así
 * el cruce es un fundido y no un salto, y el nodo no entra y sale del árbol de
 * accesibilidad en cada scroll.
 *
 * **Observaba sólo `#contacto` y ése era el error**: esa sección existe nada más
 * que en la home, así que en las otras seis rutas el botón no se escondía jamás.
 * Ahora la lista es `ZONAS` —todo cierre en bordó, más el pie— y se vuelve a
 * armar en cada ruta. Ver ahí y en el efecto.
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
  const [sobreContacto, setSobreContacto] = useState(false);
  const ruta = usePathname();

  // **Se vuelve a enganchar en cada ruta**, y ésa es la mitad del arreglo. El
  // botón vive en el layout, así que sobrevive a la navegación del cliente: con
  // la lista de dependencias vacía, el observador se quedaba mirando los nodos
  // de la página anterior —ya desmontados— y no volvía a avisar nunca.
  useEffect(() => {
    const zonas = document.querySelectorAll(ZONAS);
    if (!zonas.length) return;

    // Son varias —el cierre y el pie— así que no alcanza con la última entrada:
    // hay que saber si queda alguna a la vista.
    const aLaVista = new Set<Element>();
    const observador = new IntersectionObserver((entradas) => {
      for (const entrada of entradas) {
        if (entrada.isIntersecting) aLaVista.add(entrada.target);
        else aLaVista.delete(entrada.target);
      }
      setSobreContacto(aLaVista.size > 0);
    });

    for (const zona of zonas) observador.observe(zona);
    return () => observador.disconnect();
  }, [ruta]);

  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noreferrer"
      aria-label={t('aria')}
      // Escondido de verdad y no sólo transparente: sin esto seguiría recibiendo
      // el toque encima del botón de enviar, que es justo lo que se quiere
      // evitar, y el tabulador pasaría por un control invisible.
      aria-hidden={sobreContacto}
      tabIndex={sobreContacto ? -1 : undefined}
      className={clases(
        'fixed right-5 bottom-5 z-20 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg',
        // El anillo de foco va por fuera y no pegado al borde: sobre el verde,
        // con el glifo ya en blanco, un contorno al ras se confunde con el
        // propio botón.
        'transition-[opacity,transform] duration-200 hover:scale-105 focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-ink',
        'motion-reduce:transition-none motion-reduce:hover:scale-100',
        sobreContacto ? 'pointer-events-none opacity-0' : 'opacity-100'
      )}
    >
      <IconoDeWhatsApp className="size-7" />
    </a>
  );
}
