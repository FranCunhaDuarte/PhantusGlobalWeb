import { routing } from '@/i18n/routing';

/**
 * Origen público del sitio. En Vercel la variable de entorno del deploy sirve
 * para las vistas previas; en producción manda el dominio de la marca.
 */
const origen =
  process.env.NEXT_PUBLIC_SITIO_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://phantusglobal.com');

export const SITIO = {
  origen,
  /** URL absoluta de la home de cada idioma. */
  inicio: (idioma: string) => `${origen}/${idioma}`,
  idiomas: routing.locales
} as const;
