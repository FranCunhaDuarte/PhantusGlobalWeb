'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import EnlaceDeSeccion from '@/components/layout/EnlaceDeSeccion';
import NavegacionDeSecciones from '@/components/layout/NavegacionDeSecciones';
import { clasesDeBoton } from '@/components/ui/Button';
import Logo from '@/components/ui/Logo';
import { SECCION_CONTACTO } from '@/content/secciones';
import { clases } from '@/lib/clases';

const ID_PANEL = 'menu-de-secciones';

/**
 * El panel es de los pocos lugares donde el logo no vive dentro de una
 * `Section`, un `Panel` ni el header, así que no hay fondo del que deducir
 * la variante y hay que pasárselo. El otro es el pie.
 */
const FONDO_DEL_PANEL = 'tinta';

/** Mínimo del manual para el logotipo. El panel llega a 384 px y le sobra. */
const ANCHO_DEL_LOGO = 150;

type MenuDeSeccionesProps = {
  /**
   *`icono`es el botón cuadrado que acompaña a una navegación ya desplegada.
   *`texto`nombra el menú, y es lo que hace falta cuando el disparador es la
   * única puerta a las secciones y también está en escritorio: ahí un icono
   * suelto obliga a adivinar.
   */
  disparador?: 'icono' | 'texto';
  /** Alto de la fila del botón de cerrar, para que quede a la altura del
   * header que abrió el panel. */
  altoDeCabecera?: string;
  className?: string;
};

/**
 *`<dialog>`abierto con`showModal()`: el navegador se encarga del atrapado de
 * foco, de devolverlo al botón al cerrar, de la capa superior y de Escape.
 *`closedby="any"`suma el cierre por clic afuera donde está disponible.
 */
export default function MenuDeSecciones({
  disparador = 'icono',
  altoDeCabecera = 'h-header',
  className
}: MenuDeSeccionesProps) {
  const t = useTranslations('navegacion');
  const tPie = useTranslations('pie');
  const panel = useRef<HTMLDialogElement>(null);
  const cerrarRef = useRef<HTMLButtonElement>(null);
  const [abierto, setAbierto] = useState(false);

  const cerrar = useCallback(() => panel.current?.close(), []);

  function abrir() {
    panel.current?.showModal();
    cerrarRef.current?.focus();
    setAbierto(true);
  }

  useEffect(() => {
    if (!abierto) return;

    //`showModal()`ya inhibe el scroll del fondo en los navegadores actuales,
    // pero no en todos; esto lo vuelve determinista.
    const anterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = anterior;
    };
  }, [abierto]);

  useEffect(() => {
    const dialogo = panel.current;
    if (!dialogo) return;

    // El panel también se cierra por fuera de React (Escape, clic afuera): hay
    // que escuchar el evento nativo para que el estado no quede desfasado.
    const sincronizar = () => setAbierto(false);
    dialogo.addEventListener('close', sincronizar);
    return () => dialogo.removeEventListener('close', sincronizar);
  }, []);

  useEffect(() => {
    const dialogo = panel.current;
    if (!dialogo || 'closedBy' in HTMLDialogElement.prototype) return;

    // Safari todavía no implementa`closedby`: el clic afuera se detecta viendo
    // si las coordenadas caen fuera de la caja del panel.
    const cerrarSiEsAfuera = (evento: MouseEvent) => {
      if (evento.target !== dialogo) return;
      const caja = dialogo.getBoundingClientRect();
      const adentro =
        evento.clientX >= caja.left &&
        evento.clientX <= caja.right &&
        evento.clientY >= caja.top &&
        evento.clientY <= caja.bottom;
      if (!adentro) dialogo.close();
    };

    dialogo.addEventListener('click', cerrarSiEsAfuera);
    return () => dialogo.removeEventListener('click', cerrarSiEsAfuera);
  }, []);

  const comunes = {
    type: 'button',
    onClick: abrir,
    'aria-expanded': abierto,
    'aria-controls': ID_PANEL,
    'aria-haspopup': 'dialog'
  } as const;

  return (
    <div className={className}>
      {disparador === 'texto' ? (
        // Sin`aria-label`: el nombre accesible es la propia palabra, y uno
        // puesto encima dejaría al dictado por voz sin el nombre que se ve. El
        // subrayado usa la misma tinta al 50 % que el pelo del selector de
        // idioma, y el aire vertical lleva el área táctil a 44 px.
        <button
          {...comunes}
          className="-mx-1 inline-flex items-center px-1 py-3 text-sm font-medium underline decoration-1 decoration-current/50 underline-offset-[6px] transition-colors hover:decoration-current"
        >
          {t('menu')}
        </button>
      ) : (
        <button
          {...comunes}
          aria-label={t('abrirMenu')}
          className="-mr-2 inline-flex size-11 items-center justify-center transition-colors hover:bg-current/8"
        >
          <IconoMenu />
        </button>
      )}

      <dialog
        id={ID_PANEL}
        ref={panel}
        closedby="any"
        aria-label={t('menuSecciones')}
        data-fondo="tinta"
        className={clases(
          'm-0 ms-auto h-dvh max-h-none w-full max-w-sm p-0',
          'open:flex open:flex-col',
          // Entra deslizándose desde el costado. La transición discreta es lo
          // que hace que la propiedad display espere a la animación en vez de
          // cortarla, y el estado de arranque es lo que da la posición desde la
          // que entra: sin él el panel ya estaría en su sitio al pintarse.
          'translate-x-full opacity-0 open:translate-x-0 open:opacity-100',
          'starting:open:translate-x-full starting:open:opacity-0',
          'transition-[transform,opacity,overlay,display] transition-discrete duration-300 ease-out',
          'backdrop:bg-ink/60 backdrop:opacity-0 open:backdrop:opacity-100',
          'starting:open:backdrop:opacity-0',
          'backdrop:transition-opacity backdrop:duration-300',
          'motion-reduce:transition-none'
        )}
      >
        <div
          className={clases(
            'flex items-center justify-between px-5',
            altoDeCabecera
          )}
        >
          <Logo sobre={FONDO_DEL_PANEL} ancho={ANCHO_DEL_LOGO} />
          <button
            type="button"
            ref={cerrarRef}
            onClick={cerrar}
            aria-label={t('cerrarMenu')}
            className="-mr-2 inline-flex size-11 items-center justify-center transition-colors hover:bg-current/12"
          >
            <IconoCerrar />
          </button>
        </div>

        <div className="flex flex-1 flex-col justify-between gap-10 overflow-y-auto px-5 pb-10">
          <NavegacionDeSecciones
            etiqueta={t('menuSecciones')}
            orientacion="panel"
            alNavegar={cerrar}
            className="text-2xl"
          />

          {/* Al pie del panel y no suelto arriba: el botón de ancho completo es
              el final del recorrido, y las dos líneas de abajo le dan piso a un
              panel que si no queda medio vacío. */}
          <div className="flex flex-col gap-5">
            <EnlaceDeSeccion
              seccion={SECCION_CONTACTO}
              onClick={cerrar}
              className={clasesDeBoton({ className: 'w-full justify-center' })}
            >
              {t('cta')}
            </EnlaceDeSeccion>

            <div className="flex flex-col gap-1 text-sm texto-suave">
              <a
                href={'mailto:' + tPie('correo')}
                className="underline decoration-1 underline-offset-4 transition-colors hover:texto-realce motion-reduce:transition-none"
              >
                {tPie('correo')}
              </a>
              <p>{tPie('ubicacion')}</p>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}

function IconoMenu() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function IconoCerrar() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}
