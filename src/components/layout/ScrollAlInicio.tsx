'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { usePathname } from '@/i18n/navigation';

/**
 * Deja la página nueva arriba de todo al cambiar de ruta.
 *
 * **Sin esto no quedaba arriba**, y por dos motivos a la vez. Medido navegando
 * desde `/es/mercados` con el scroll en 1800: la página nueva terminaba en **96
 * px**, que es exactamente el alto del header, y tardaba unos 900 ms en llegar
 * ahí animándose, así que se veía la página anterior irse hacia arriba.
 *
 * - **Los 96 px** salen de que el router lleva a la vista el contenido y no el
 *   documento. El hero de cada ruta sube `-mt-header`, así que "el principio del
 *   contenido" y "el principio de la página" no son el mismo punto.
 * - **La animación** sale de `scroll-behavior: smooth`, que el sitio declara en
 *   `html` para que los saltos por ancla —`#contacto`, `#pescados`— se deslicen
 *   en vez de cortar. Esa regla es buena y se queda: lo que hace este
 *   componente es pedir el salto con `behavior: 'instant'`, que gana sobre el
 *   CSS para esa llamada y sólo para esa.
 *
 * **Tres casos en los que no hace nada**, y los tres importan:
 *
 * - **La primera carga.** Ahí el navegador ya sabe dónde poner la página: puede
 *   venir con ancla en la URL o con una posición recordada.
 * - **Volver y avanzar.** Con el botón del navegador lo que se espera es
 *   recuperar dónde estabas, no el principio. Se detecta con `popstate`, que
 *   llega antes de que la ruta cambie.
 * - **Cuando la URL trae ancla.** Es el caso de `EnlaceDeSeccion` yendo a
 *   `#contacto` desde una subpágina: ahí la ruta cambia *y* hay un destino
 *   dentro de la página. Saltar al principio se comería el salto.
 *
 * Los saltos dentro de una misma página no pasan por acá: van como `<a
 * href="#id">` y no cambian la ruta, así que el efecto ni se dispara.
 *
 * **El salto va en `useLayoutEffect` y no en `useEffect`**, que es la
 * diferencia entre un cuadro y ninguno. Con el efecto normal el navegador
 * alcanzaba a pintar la página nueva con el scroll viejo antes de corregirlo:
 * medido cuadro a cuadro, uno solo a los 21 ms, pero un salto de 2488 px en un
 * cuadro se ve como un parpadeo. El de diseño corre antes de ese pintado.
 */

/**
 * `useLayoutEffect` avisa por consola cuando se lo llama en el servidor, donde
 * no hace nada. Este componente sólo trabaja después de hidratar, así que del
 * lado del servidor se usa el otro y el aviso no aparece.
 */
const useEfectoDeDiseño =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

export default function ScrollAlInicio() {
  const ruta = usePathname();
  const primeraCarga = useRef(true);
  const volviendo = useRef(false);

  useEffect(() => {
    const marcar = () => {
      volviendo.current = true;
    };
    window.addEventListener('popstate', marcar);
    return () => window.removeEventListener('popstate', marcar);
  }, []);

  useEfectoDeDiseño(() => {
    if (primeraCarga.current) {
      primeraCarga.current = false;
      return;
    }
    if (volviendo.current) {
      volviendo.current = false;
      return;
    }
    if (window.location.hash) return;

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [ruta]);

  return null;
}
