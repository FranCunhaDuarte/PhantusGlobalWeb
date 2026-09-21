'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode
} from 'react';
import { clases } from '@/lib/clases';

/**
 * Un ítem y su separación: es lo que avanza cada pulsación de las flechas.
 *
 * El ancho está elegido para que las cuatro **no** entren nunca: a 288 px, con
 * el gap, la pista pide 1212 contra los 1088 que da el contenido a 1280. Si
 * entraran, las flechas se esconderían y en escritorio esto dejaría de leerse
 * como un carrusel para parecer una grilla de cuatro.
 *
 * Vive acá y no en cada adelanto porque es la medida la que decide si hay
 * carrusel: cambiarla en un solo bloque convertiría ese bloque en una grilla.
 */
const PASO = 'w-[70vw] max-w-72 sm:w-72';

export type ItemDeCarrusel = {
  clave: string;
  contenido: ReactNode;
};

type CarruselProps = {
  items: readonly ItemDeCarrusel[];
  /** Nombre accesible de la pista: qué se está recorriendo. */
  etiqueta: string;
  anterior: string;
  siguiente: string;
  className?: string;
};

/**
 * La pista de los adelantos de la home: unos pocos recortes al hilo con su
 * nombre debajo. La usan el catálogo de especies y el de cortes, que muestran
 * lo mismo —foto y nombre— sobre dominios distintos.
 *
 * La pista es scroll nativo con anclaje, no un carrusel manejado por JS: así el
 * gesto táctil, la rueda del trackpad y el scroll por teclado funcionan sin que
 * nadie los reimplemente. Las flechas son una comodidad para el mouse, no el
 * único camino — por eso la pista es enfocable y tiene nombre: un contenedor que
 * scrollea sin poder recibir foco deja afuera a quien navega por teclado.
 *
 * Los ítems no son enlaces: varios destinos al mismo lugar son ruido para quien
 * tabula. El enlace es el que va abajo del bloque, una sola vez.
 */
export default function Carrusel({
  items,
  etiqueta,
  anterior,
  siguiente,
  className
}: CarruselProps) {
  const pista = useRef<HTMLUListElement>(null);
  const [alInicio, setAlInicio] = useState(true);
  const [alFinal, setAlFinal] = useState(true);
  const [arrastrando, setArrastrando] = useState(false);
  const arrastre = useRef<{
    desdeX: number;
    desdeScroll: number;
    puntero: number;
  } | null>(null);

  const revisarBordes = useCallback(() => {
    const caja = pista.current;
    if (!caja) return;

    const restante = caja.scrollWidth - caja.clientWidth - caja.scrollLeft;
    setAlInicio(caja.scrollLeft <= 1);
    // Un píxel de tolerancia: el ancho de scroll puede quedar fraccionado.
    setAlFinal(restante <= 1);
  }, []);

  useEffect(() => {
    revisarBordes();
    const caja = pista.current;
    if (!caja) return;

    const observador = new ResizeObserver(revisarBordes);
    observador.observe(caja);
    return () => observador.disconnect();
  }, [revisarBordes]);

  // Sólo mouse: el táctil ya scrollea nativo y engancharlo acá duplicaría el
  // gesto peleando con el anclaje. El puntero se captura para que soltar fuera
  // de la pista no deje el arrastre pegado.
  function alApretar(evento: PointerEvent<HTMLUListElement>) {
    if (evento.pointerType !== 'mouse') return;

    const caja = pista.current;
    if (!caja) return;

    arrastre.current = {
      desdeX: evento.clientX,
      desdeScroll: caja.scrollLeft,
      puntero: evento.pointerId
    };
    caja.setPointerCapture(evento.pointerId);
    setArrastrando(true);
  }

  function alMover(evento: PointerEvent<HTMLUListElement>) {
    const tirando = arrastre.current;
    const caja = pista.current;
    if (!tirando || !caja || evento.pointerId !== tirando.puntero) return;

    // Sin esto el navegador empieza a seleccionar el texto de los nombres.
    evento.preventDefault();
    caja.scrollLeft = tirando.desdeScroll - (evento.clientX - tirando.desdeX);
  }

  function alSoltar(evento: PointerEvent<HTMLUListElement>) {
    if (!arrastre.current || evento.pointerId !== arrastre.current.puntero) {
      return;
    }

    pista.current?.releasePointerCapture(evento.pointerId);
    arrastre.current = null;
    setArrastrando(false);
  }

  function desplazar(sentido: 1 | -1) {
    const caja = pista.current;
    const primero = caja?.firstElementChild as HTMLElement | undefined;
    if (!caja || !primero) return;

    const gap = Number.parseFloat(getComputedStyle(caja).columnGap) || 0;
    caja.scrollBy({ left: sentido * (primero.offsetWidth + gap) });
  }

  // Sin flechas cuando entran todas: un control que no hace nada estorba.
  const cabenTodas = alInicio && alFinal;

  return (
    <div className={clases('relative', className)}>
      <ul
        ref={pista}
        onScroll={revisarBordes}
        onPointerDown={alApretar}
        onPointerMove={alMover}
        onPointerUp={alSoltar}
        onPointerCancel={alSoltar}
        tabIndex={0}
        role="group"
        aria-label={etiqueta}
        className={clases(
          'flex snap-x snap-mandatory gap-5 overflow-x-auto',
          'scroll-smooth motion-reduce:scroll-auto',
          // El cursor promete lo que el arrastre cumple: aparece sólo con mouse,
          // porque en táctil no hay cursor y en teclado el gesto son las flechas.
          arrastrando ? 'cursor-grabbing select-none' : 'cursor-grab',
          // El anclaje deja el primer ítem pegado al borde del contenido; sin
          // este relleno, el foco de teclado recorta el anillo contra el borde.
          'scroll-px-1 px-1 py-1',
          '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
        )}
      >
        {items.map((item) => (
          <li
            key={item.clave}
            className={clases('flex shrink-0 snap-start flex-col gap-3', PASO)}
          >
            {item.contenido}
          </li>
        ))}
      </ul>

      {/* Absolutas y centradas contra la pista: así aparecer o esconderse no
          mueve una línea del contenido de abajo. Desde `sm` nada más — en un
          teléfono taparían el único recorte visible, y ahí el gesto es deslizar.
          El recorte que asoma al costado es la pista de que hay más. */}
      {!cabenTodas && (
        <>
          <Flecha
            sentido={-1}
            etiqueta={anterior}
            inactiva={alInicio}
            alPulsar={desplazar}
            className="-left-4 lg:-left-6"
          />
          <Flecha
            sentido={1}
            etiqueta={siguiente}
            inactiva={alFinal}
            alPulsar={desplazar}
            className="-right-4 lg:-right-6"
          />
        </>
      )}
    </div>
  );
}

function Flecha({
  sentido,
  etiqueta,
  inactiva,
  alPulsar,
  className
}: {
  sentido: 1 | -1;
  etiqueta: string;
  inactiva: boolean;
  alPulsar: (sentido: 1 | -1) => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => alPulsar(sentido)}
      disabled={inactiva}
      aria-label={etiqueta}
      className={clases(
        'absolute top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center sm:inline-flex',
        // Fondo propio: la flecha se apoya sobre el recorte, no sobre la sección.
        'bg-surface-raised border border-(color:--fondo-separador)',
        'transition-colors hover:bg-current/8 disabled:pointer-events-none disabled:opacity-40',
        className
      )}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={clases('size-5', sentido === 1 && 'rotate-180')}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m15 6-6 6 6 6" />
      </svg>
    </button>
  );
}
