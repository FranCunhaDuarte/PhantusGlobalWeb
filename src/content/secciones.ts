import type { Ruta } from '@/i18n/routing';

/**
 * Las secciones del sitio, en el orden en que las lista la navegación. Es la
 * única lista: el header, el pie y el índice de tarjetas de la home la consumen
 * de acá, y las etiquetas visibles salen de `src/messages` bajo `secciones.<id>`.
 *
 * **Las tres navegables se declaran a mano y contacto se suma después**, que es
 * al revés de como estuvo hasta acá —una lista de cuatro y un `filter` que
 * sacaba contacto—. El motivo es de tipos: así `SeccionNavegable` es la unión de
 * esas tres y no `IdSeccion` entera, y `FOTO_DE_ACCESO` puede exigir una foto
 * por cada una sin pedir una para contacto, que no es una tarjeta.
 *
 * **Fue el orden de la home y ya no lo es.** Hasta la Fase 12 cada id tenía su
 * bloque en la home y la lista decía en qué orden aparecían. Hoy la home es
 * hero, índice, pescados, carnes y contacto: de los cuatro ids, sólo `productos`
 * y `contacto` abren ancla ahí. Los otros dos son ruta y nada más.
 *
 * **`como-trabajamos` salió de la lista y su página sigue en pie.** Dejó de
 * tener entrada en el header y en el pie; se llega por el sitemap y por donde se
 * la enlace a mano. Es decisión de Franco, igual que la inversa —que `/mercados`
 * entrara— y se puede revertir agregando el id acá y su ruta abajo.
 */
export const SECCIONES_NAVEGABLES = [
  'nosotros',
  'mercados',
  'productos'
] as const;

/** La sección de contacto se navega desde el CTA, no desde la lista de anclas. */
export const SECCION_CONTACTO = 'contacto';

/**
 * La home como entrada de la barra. **No entra en `SECCIONES_NAVEGABLES`** y eso
 * no es un detalle: esa lista es también la de las tarjetas del índice de la
 * home, y una tarjeta que lleva a la página en la que ya estás no es una
 * entrada del índice. Por eso hay dos vistas de la misma lista —la barra y el
 * pie— y una sola fuente.
 */
export const SECCION_INICIO = 'inicio';

export const SECCIONES = [
  SECCION_INICIO,
  ...SECCIONES_NAVEGABLES,
  SECCION_CONTACTO
] as const;

export type IdSeccion = (typeof SECCIONES)[number];
export type SeccionNavegable = (typeof SECCIONES_NAVEGABLES)[number];

/**
 * Lo que listan la barra y el panel mobile. Contacto no está: vive en el botón
 * sólido, que es la única acción real de la página.
 */
export const SECCIONES_DEL_HEADER = [
  SECCION_INICIO,
  ...SECCIONES_NAVEGABLES
] as const;

/**
 * Lo que lista el pie. **Inicio no va acá**: el logotipo del pie ya lleva a la
 * home y está a dos centímetros de la lista.
 */
export const SECCIONES_DEL_PIE = [
  ...SECCIONES_NAVEGABLES,
  SECCION_CONTACTO
] as const;

export const RUTA_DE_INICIO = '/' satisfies Ruta;
export const RUTA_DE_NOSOTROS = '/nosotros' satisfies Ruta;
export const RUTA_DE_MERCADOS = '/mercados' satisfies Ruta;
export const RUTA_DE_PRODUCTOS = '/productos' satisfies Ruta;

/**
 * Secciones que además tienen página propia. La entrada del header y del pie
 * deja de ser un ancla de la home y pasa a ser una ruta.
 *
 * Hoy lo son las tres navegables, así que la navegación entera son rutas y el
 * único ancla que queda es el de contacto. `EnlaceDeSeccion` sigue resolviendo
 * los tres casos —ruta, ancla en la home y ancla de la home vista desde una
 * subpágina— porque eso puede volver a cambiar sin tocar a quien lo monta.
 */
const PAGINA_DE_SECCION: { readonly [K in IdSeccion]?: Ruta } = {
  inicio: RUTA_DE_INICIO,
  nosotros: RUTA_DE_NOSOTROS,
  mercados: RUTA_DE_MERCADOS,
  productos: RUTA_DE_PRODUCTOS
};

export function paginaDeSeccion(seccion: IdSeccion) {
  return PAGINA_DE_SECCION[seccion];
}

/** Id del titular de una sección, para colgarle el `aria-labelledby`. */
export function idDeTitulo(seccion: IdSeccion) {
  return `${seccion}-titulo`;
}

export function ancla(seccion: IdSeccion) {
  return `#${seccion}`;
}
