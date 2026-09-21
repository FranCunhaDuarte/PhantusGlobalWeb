import type { Ruta } from '@/i18n/routing';

/**
 * Las dos páginas legales, en el orden en que las lista el pie.
 *
 * **No son secciones del sitio.** No están en `SECCIONES`, no las lista el
 * header ni el menú, y `EnlaceDeSeccion` no las conoce: se llega por el pie y
 * por el sitemap. Por eso viven en su propio archivo y no colgando de
 * `secciones.ts`, que es la lista de navegación.
 */
export const LEGALES = ['terminos', 'privacidad'] as const;

export type Legal = (typeof LEGALES)[number];

export const RUTA_DE_LEGAL = {
  terminos: '/terminos',
  privacidad: '/privacidad'
} as const satisfies Record<Legal, Ruta>;

/**
 * Los tramos de cada página, que son los que arman el índice de claves.
 *
 * **Las dos hablan del sitio y no del servicio**, y ese encuadre es lo que
 * decide qué tramos hay. Unos términos del servicio de intermediación hablarían
 * de comisión, de quién responde por la mercadería y de qué pasa si una
 * operación se cae; nada de eso está acá, porque eso se pacta por operación y no
 * se acepta navegando una página. Lo que está acá es qué es este sitio, qué
 * puede esperarse de lo que publica y qué pasa con los datos que alguien deja
 * en el formulario.
 */
export const TRAMOS_DE_TERMINOS = [
  'objeto',
  'catalogo',
  'uso',
  'propiedad',
  'disponibilidad',
  'enlaces',
  'cambios'
] as const;

/**
 * El orden no es decorativo: arranca por lo que se recibe, sigue por para qué se
 * usa y recién después por lo que **no** se hace. Ese tramo es el más
 * informativo de los seis —no hay analítica, ni píxeles, ni cookies de
 * terceros— y se lee mejor después de saber qué sí pasa.
 */
export const TRAMOS_DE_PRIVACIDAD = [
  'queRecibimos',
  'paraQue',
  'cookies',
  'queNoHacemos',
  'abuso',
  'terceros',
  'derechos',
  'cambios'
] as const;

export type TramoDeTerminos = (typeof TRAMOS_DE_TERMINOS)[number];
export type TramoDePrivacidad = (typeof TRAMOS_DE_PRIVACIDAD)[number];
