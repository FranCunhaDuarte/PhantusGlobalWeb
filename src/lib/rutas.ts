import { getPathname } from '@/i18n/navigation';
import { routing, type Ruta } from '@/i18n/routing';
import { SITIO } from '@/lib/sitio';

/**
 * Todas las rutas indexables, para el sitemap. La lista se declara a mano
 * porque no toda ruta tiene por qué ir al sitemap, pero el `satisfies` obliga a
 * que cada entrada exista en `routing.pathnames`.
 */
export const RUTAS_PUBLICAS = [
  '/',
  '/productos',
  '/nosotros',
  '/mercados',
  '/como-trabajamos',
  '/terminos',
  '/privacidad'
] as const satisfies readonly Ruta[];

/**
 * Las legales van al sitemap —tienen que ser encontrables— pero no compiten con
 * el resto: son páginas de consulta, no de entrada. El sitemap les da la
 * prioridad más baja de las tres que usa.
 */
export const RUTAS_LEGALES = ['/terminos', '/privacidad'] as const satisfies readonly Ruta[];

export function esRutaLegal(ruta: Ruta) {
  return (RUTAS_LEGALES as readonly Ruta[]).includes(ruta);
}

export function urlAbsoluta(ruta: Ruta, idioma: string) {
  return `${SITIO.origen}${getPathname({ href: ruta, locale: idioma })}`;
}

/**
 * Canónica del idioma pedido más sus alternativas, tal como las quiere
 * `metadata.alternates`. Cada idioma tiene su propia URL traducida, así que
 * esto no se puede armar concatenando el prefijo a una ruta única.
 */
export function alternativasDeRuta(ruta: Ruta, idioma: string) {
  return {
    canonical: urlAbsoluta(ruta, idioma),
    languages: Object.fromEntries(
      routing.locales.map((otro) => [otro, urlAbsoluta(ruta, otro)])
    )
  };
}
