'use client';

import { useEffect } from 'react';

/**
 * El realce de los botones nace en el punto exacto donde entró el puntero, así
 * que alguien tiene que leer esa posición. Va delegado y montado una sola vez,
 * y no como estado de cada botón: el estilo de los botones sale de
 * `clasesDeBoton`, un ayudante sin estado que usan por igual el servidor y el
 * cliente, y volver cliente a cada consumidor para escuchar un puntero sería
 * pagar caro por un dato que un solo oyente puede repartir.
 *
 * Sin JavaScript —o antes de hidratar— el círculo nace del centro, que es el
 * valor por defecto de las dos variables. El efecto no depende de esto: se
 * degrada, no se rompe.
 */
export default function RealceDeBotones() {
  useEffect(() => {
    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)');

    function apuntar(evento: PointerEvent) {
      const destino = evento.target;
      if (!(destino instanceof Element)) return;

      const boton = destino.closest<HTMLElement>('.boton-realce');
      if (!boton || quieto.matches) return;

      const caja = boton.getBoundingClientRect();
      boton.style.setProperty('--realce-x', `${evento.clientX - caja.left}px`);
      boton.style.setProperty('--realce-y', `${evento.clientY - caja.top}px`);
    }

    // `pointerover` y no `pointerenter`: sube por el árbol, así que un solo
    // oyente cubre todos los botones, incluidos los que aparecen después.
    document.addEventListener('pointerover', apuntar);
    return () => document.removeEventListener('pointerover', apuntar);
  }, []);

  return null;
}
