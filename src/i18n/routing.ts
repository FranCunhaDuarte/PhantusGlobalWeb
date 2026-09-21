import { defineRouting } from 'next-intl/routing';

const UN_ANIO_EN_SEGUNDOS = 60 * 60 * 24 * 365;

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'always',
  // Detección por cookie de preferencia y, si no existe, por `Accept-Language`.
  localeDetection: true,
  // La preferencia tiene que sobrevivir al cierre del navegador: sin `maxAge`
  // explícito la cookie caducaría antes de lo que dura el ciclo de compra.
  localeCookie: {
    maxAge: UN_ANIO_EN_SEGUNDOS
  },
  /**
   * Las subpáginas existen para rankear, así que el inglés no puede navegar en
   * castellano. La clave es la ruta interna (la que existe como carpeta bajo
   * `app/[locale]`) y el valor, la URL pública de cada idioma. Sumar una ruta
   * acá es lo que habilita a `Link` a apuntarle: el resto del sitio no escribe
   * URLs a mano.
   */
  pathnames: {
    '/': '/',
    '/nosotros': {
      es: '/nosotros',
      en: '/about'
    },
    '/como-trabajamos': {
      es: '/como-trabajamos',
      en: '/how-we-work'
    },
    '/mercados': {
      es: '/mercados',
      en: '/markets'
    },
    '/productos': {
      es: '/productos',
      en: '/products'
    },
    '/terminos': {
      es: '/terminos',
      en: '/terms'
    },
    '/privacidad': {
      es: '/privacidad',
      en: '/privacy'
    }
  }
});

export type Ruta = keyof typeof routing.pathnames;
