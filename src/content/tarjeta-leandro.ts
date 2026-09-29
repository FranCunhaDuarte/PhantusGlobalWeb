import { WHATSAPP } from '@/content/contacto-directo';
import { SITIO } from '@/lib/sitio';

/**
 * La tarjeta de contacto de Leandro Fenoy, que vive en `/leandro` y se llega
 * por un QR o un enlace directo: **no está en la navegación ni en el sitemap y
 * no se indexa**.
 *
 * > **Es la única página del dominio con un nombre propio, y es a propósito.**
 * > El 24/09 el sitio pasó a imagen de empresa y el nombre salió de todas las
 * > páginas. Esta ruta la pidió Franco después, sabiéndolo: es una tarjeta
 * > personal que comparte el dominio, no una página del sitio. Por eso sus
 * > textos viven en su propio catálogo (`src/messages/tarjeta/`) y no en
 * > `es.json` ni `en.json`, que viajan enteros al navegador en cada página: si
 * > el nombre entrara ahí, volvería a estar en el payload de todo el sitio.
 *
 * Acá van las direcciones, que son dato; lo que se lee está en el catálogo.
 */
export const RUTA_DE_LA_TARJETA = '/leandro';

export const ENLACES_DE_LA_TARJETA = {
  whatsapp: WHATSAPP,
  correo: 'mailto:leandro@phantusglobal.com',
  linkedin: 'https://www.linkedin.com/in/leandro-fenoy-71082817b',
  sitio: SITIO.inicio('en')
} as const;

export type EnlaceDeLaTarjeta = keyof typeof ENLACES_DE_LA_TARJETA;

/** El orden de las filas: el de la tarjeta original. WeChat va último y aparte. */
export const ORDEN_DE_ENLACES: readonly EnlaceDeLaTarjeta[] = [
  'whatsapp',
  'correo',
  'linkedin',
  'sitio'
];

/** Los que salen del sitio se abren en otra pestaña; el correo no. */
export const ENLACES_EXTERNOS: ReadonlySet<EnlaceDeLaTarjeta> = new Set([
  'whatsapp',
  'linkedin',
  'sitio'
]);
