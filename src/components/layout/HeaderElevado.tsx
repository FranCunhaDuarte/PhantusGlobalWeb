'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ProveedorDeFondo } from '@/components/ui/ContextoDeFondo';
import type { Fondo } from '@/components/ui/fondos';
import { usePathname } from '@/i18n/navigation';
import type { Ruta } from '@/i18n/routing';
import { clases } from '@/lib/clases';

type HeaderElevadoProps = {
  children: ReactNode;
  /**
   * Si el límite inferior se dibuja también con el header apoyado arriba de
   * todo. Con `false` el header no se separa de nada hasta que algo le pasa por
   * debajo, que es cuando la separación empieza a significar algo.
   */
  limiteEnReposo?: boolean;
};

/**
 * Las rutas que abren con un hero oscuro a sangre. Ahí el header arranca
 * apoyado encima, sin fondo propio; en las demás arranca en crema desde el
 * primer pintado, sin esperar a que hidrate. `usePathname` resuelve en el
 * prerender —todas las rutas son estáticas—, así que el HTML ya sale con el
 * estado que corresponde.
 *
 * **Fue una sola ruta.** Cuando `/nosotros` estrenó su hero con foto, la barra
 * le llegaba en crema y quedaba como una franja clara apoyada sobre la foto en
 * vez de encima de ella.
 *
 * **Sumar una ruta acá no alcanza**: su primer bloque tiene que subir
 * `-mt-header` y devolver el alto con un `pt-header` adentro, o el contenido
 * arranca debajo de la barra. Las dos cosas van juntas.
 */
const RUTAS_CON_HERO = new Set<Ruta>([
  '/',
  '/nosotros',
  '/mercados',
  '/productos'
]);

/**
 * El límite inferior va como `box-shadow` interior y no como borde: así la barra
 * mide exactamente `--spacing-header` y el hero puede subir esa misma altura sin
 * dejar un pelo de fondo asomando arriba de todo. Los tres estados declaran la
 * sombra para que la transición interpole el color en vez de cortar.
 *
 * **No hay sombra proyectada.** El estado elevado llevaba una corta hacia abajo
 * —`0 6px 16px -14px` en tinta al 70 %— y se sacó por pedido. Lo que separa la
 * barra del contenido es la línea fuerte, que ya es el recurso del resto del
 * sitio: acá no hay ningún otro plano flotando sobre otro, así que la sombra
 * prometía una profundidad que la página no usa en ninguna otra parte.
 */
const LIMITE = {
  ninguno: 'shadow-[inset_0_-1px_0_0_transparent]',
  linea: 'shadow-[inset_0_-1px_0_0_var(--fondo-linea)]',
  elevado: 'shadow-[inset_0_-1px_0_0_var(--color-line-strong)]'
} as const;

/**
 * El header tiene tres estados y uno solo de ellos depende de la ruta.
 *
 * Apoyado sobre el hero no tiene fondo: el video se ve entero y el contenido va
 * en crema, que es lo que declara el fondo `tinta`. Apoyado sobre cualquier
 * otra página es crema con su línea. Apenas le pasa contenido por debajo —en las
 * seis rutas por igual— pasa al crema elevado y sube la línea a la fuerte:
 * crema sobre crema separado por un pelo deja de leerse en cuanto hay algo
 * abajo.
 *
 * El aviso lo da un centinela del alto del umbral y un `IntersectionObserver`:
 * el navegador avisa sólo en el cruce, así que no hay nada corriendo mientras se
 * scrollea. El centinela está fuera de flujo, no ocupa lugar.
 *
 * El fondo vigente se publica por contexto igual que en `Section` y `Panel`, que
 * es de donde el logo saca su variante: el asset pasa a depender del estado sin
 * que el header tenga que pasárselo a mano.
 */
export default function HeaderElevado({
  children,
  limiteEnReposo = true
}: HeaderElevadoProps) {
  const centinela = useRef<HTMLDivElement>(null);
  const [elevado, setElevado] = useState(false);
  const ruta = usePathname();
  const sobreHero = !elevado && RUTAS_CON_HERO.has(ruta);

  useEffect(() => {
    const nodo = centinela.current;
    if (!nodo) return;

    const observador = new IntersectionObserver(([entrada]) =>
      setElevado(!entrada.isIntersecting)
    );
    observador.observe(nodo);
    return () => observador.disconnect();
  }, []);

  const fondo: Fondo = elevado
    ? 'crema-elevado'
    : sobreHero
      ? 'tinta'
      : 'crema';

  return (
    <>
      <div
        ref={centinela}
        aria-hidden="true"
        className="absolute top-0 left-0 h-2 w-px"
      />
      <header
        data-fondo={fondo}
        className={clases(
          'sticky top-0 z-30',
          'transition-[background-color,color,box-shadow] duration-200 motion-reduce:transition-none',
          elevado
            ? LIMITE.elevado
            : sobreHero
              ? clases('bg-transparent', LIMITE.ninguno)
              : limiteEnReposo
                ? LIMITE.linea
                : LIMITE.ninguno
        )}
      >
        <ProveedorDeFondo fondo={fondo}>{children}</ProveedorDeFondo>
      </header>
    </>
  );
}
