'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import IconoDeWhatsApp from '@/components/contacto/IconoDeWhatsApp';
import { WHATSAPP } from '@/content/contacto-directo';
import { SECCION_CONTACTO } from '@/content/secciones';
import { clases } from '@/lib/clases';

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
 * La sección de contacto **sólo existe en la home**, así que en las otras seis
 * rutas el observador no encuentra nada y el botón se queda visible, que es lo
 * correcto.
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

  useEffect(() => {
    const contacto = document.getElementById(SECCION_CONTACTO);
    if (!contacto) return;

    const observador = new IntersectionObserver(([entrada]) =>
      setSobreContacto(entrada.isIntersecting)
    );
    observador.observe(contacto);
    return () => observador.disconnect();
  }, []);

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
        'fixed right-5 bottom-5 z-20 flex size-14 items-center justify-center bg-[#25D366] text-ink shadow-lg',
        'transition-[opacity,transform] duration-200 hover:scale-105 focus-visible:outline-[3px] focus-visible:outline-offset-0 focus-visible:outline-ink',
        'motion-reduce:transition-none motion-reduce:hover:scale-100',
        sobreContacto ? 'pointer-events-none opacity-0' : 'opacity-100'
      )}
    >
      <IconoDeWhatsApp className="size-7" />
    </a>
  );
}
