'use client';

import {
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent
} from 'react';
import { useLocale, useTranslations } from 'next-intl';
import type { Fondo } from '@/components/ui/fondos';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { clases } from '@/lib/clases';
import { enfocarConAnillo } from '@/lib/foco';
import { nombreDeIdioma } from '@/lib/idiomas';

const ID_LISTA = 'selector-de-idioma';

/**
 * Abierto, el control entero —el que muestra el idioma vigente y la lista que
 * cuelga de él— deja de heredar el fondo de la barra y declara el suyo. Tiene
 * que leerse igual apoyado sobre el hero, sobre el crema elevado y sobre tinta,
 * y sobre el velo del hero no hay margen para resolverlo con una
 * transparencia: el crema pleno ya está a 4,54:1 del peor cuadro posible.
 */
const FONDO_ABIERTO: Fondo = 'crema-elevado';

/**
 * Cambia de idioma sobre la ruta y el ancla donde está parado el visitante, no
 * mandándolo al inicio. La lista sale de `routing.locales` y el nombre de cada
 * idioma lo da `Intl`, así que sumar un locale no toca este archivo. El `Link`
 * de next-intl ya sincroniza la cookie de preferencia al navegar.
 *
 * A la vista van las siglas; el nombre entero viaja para el lector de pantalla,
 * porque "EN" no es una pista para quien no sabe inglés. **El idioma vigente no
 * se repite en la lista**: ya lo dice la caja de arriba, y con dos locales
 * repetirlo dejaba una lista de dos donde uno era inerte.
 *
 * **Son enlaces, no un `<select>`**: se abren en pestaña nueva, el rastreador
 * los sigue y el idioma viaja en la URL. Por eso tampoco usa la API de popover:
 * un popover vive en la capa superior, donde el bloque contenedor es el
 * viewport, y atarlo al disparador pide posicionamiento por ancla —que todavía
 * no está en todos lados— o medir con JS en cada apertura, scroll y resize.
 * Sale más caro que el puñado de líneas que cuestan Escape, clic afuera y foco
 * acá abajo, y la lista tiene que quedar pegada a una barra que es `sticky` y
 * vive dentro de un contenedor con tope de ancho.
 *
 * Se abre al pasar el mouse, pero **el hover no puede ser el único camino**:
 * quien navega por teclado no tiene puntero y en una pantalla táctil no hay
 * hover. Por eso abre también con el foco y con un clic sobre la caja.
 */
export default function SelectorIdioma({ className }: { className?: string }) {
  const t = useTranslations('idioma');
  const idiomaActual = useLocale();
  const ruta = usePathname();
  const [ancla, setAncla] = useState('');
  const [abierto, setAbierto] = useState(false);
  const contenedor = useRef<HTMLElement>(null);
  const disparador = useRef<HTMLButtonElement>(null);

  const otros = routing.locales.filter((idioma) => idioma !== idiomaActual);

  useEffect(() => {
    const leerAncla = () => setAncla(window.location.hash.slice(1));
    leerAncla();
    window.addEventListener('hashchange', leerAncla);
    return () => window.removeEventListener('hashchange', leerAncla);
  }, []);

  useEffect(() => {
    if (!abierto) return;

    const cerrarSiEsAfuera = (evento: globalThis.PointerEvent) => {
      const destino = evento.target as Node | null;
      if (destino && !contenedor.current?.contains(destino)) setAbierto(false);
    };

    document.addEventListener('pointerdown', cerrarSiEsAfuera);
    return () => document.removeEventListener('pointerdown', cerrarSiEsAfuera);
  }, [abierto]);

  function alPresionarTecla(evento: KeyboardEvent) {
    if (!abierto || evento.key !== 'Escape') return;

    // Cortado acá: si el selector alguna vez cuelga de un `<dialog>`, Escape
    // cierra la lista y no se lleva puesto al que lo contiene.
    evento.preventDefault();
    evento.stopPropagation();
    setAbierto(false);
    enfocarConAnillo(disparador.current);
  }

  // Sólo mouse: en táctil `pointerenter` llega con el primer toque y abriría y
  // cerraría en el mismo gesto. Ahí manda el clic.
  function alEntrarElPuntero(evento: PointerEvent) {
    if (evento.pointerType === 'mouse') setAbierto(true);
  }

  function alSalirElPuntero(evento: PointerEvent) {
    if (evento.pointerType !== 'mouse') return;

    // Con el foco adentro la lista se queda: cerrarla por mover el mouse le
    // sacaría de abajo el elemento que alguien está por activar con el teclado.
    if (contenedor.current?.contains(document.activeElement)) return;
    setAbierto(false);
  }

  function alSalirElFoco(evento: FocusEvent) {
    const destino = evento.relatedTarget as Node | null;
    if (destino && !contenedor.current?.contains(destino)) setAbierto(false);
  }

  return (
    <nav
      ref={contenedor}
      aria-label={t('etiqueta')}
      onKeyDown={alPresionarTecla}
      onFocus={() => setAbierto(true)}
      onBlur={alSalirElFoco}
      onPointerEnter={alEntrarElPuntero}
      onPointerLeave={alSalirElPuntero}
      className={clases('relative', className)}
    >
      {/* Abierto, la caja y la lista comparten fondo y borde y se leen como
            una sola pieza: el borde inferior de la caja se va y lo continúa el
            de la lista. En reposo no hay caja — sólo la sigla y la punta. */}
      <div
        data-fondo={abierto ? FONDO_ABIERTO : undefined}
        className={clases(
          'transition-colors duration-150 motion-reduce:transition-none',
          abierto && 'ring-1 ring-(color:--fondo-separador)'
        )}
      >
        <button
          type="button"
          ref={disparador}
          onClick={() => setAbierto((estaba) => !estaba)}
          aria-expanded={abierto}
          aria-controls={ID_LISTA}
          aria-label={t('disparador', { idioma: nombreDeIdioma(idiomaActual) })}
          className="flex w-full items-center justify-between gap-1.5 px-2.5 py-3 text-sm font-semibold tracking-[0.08em] uppercase"
        >
          {idiomaActual}
          <Punta abierta={abierto} />
        </button>
      </div>

      {abierto && (
        <div
          data-fondo={FONDO_ABIERTO}
          // Absoluta y del ancho de la caja: la barra mide exactamente
          // `--spacing-header` con la lista desplegada y sin ella.
          className="absolute inset-x-0 top-full ring-1 ring-(color:--fondo-separador)"
        >
          <ul id={ID_LISTA}>
            {otros.map((idioma) => (
              <li key={idioma}>
                <Link
                  href={{ pathname: ruta, hash: ancla || undefined }}
                  locale={idioma}
                  hrefLang={idioma}
                  lang={idioma}
                  onClick={() => setAbierto(false)}
                  className="block px-2.5 py-3 text-sm font-medium tracking-[0.08em] uppercase transition-colors hover:bg-current/8 motion-reduce:transition-none"
                >
                  {idioma}
                  {/* El nombre entero no se ve pero sí se lee. Va después de
                        la sigla para que el nombre accesible empiece por la
                        palabra que se ve, que es la que dicta quien maneja por
                        voz. */}
                  <span className="sr-only">{nombreDeIdioma(idioma)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

/** Abierto o cerrado no queda sólo en `aria-expanded`: la punta lo dibuja. */
function Punta({ abierta }: { abierta: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={clases(
        'size-4 transition-transform duration-150 motion-reduce:transition-none',
        abierta && 'rotate-180'
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
