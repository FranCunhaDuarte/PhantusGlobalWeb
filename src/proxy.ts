import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

export const proxy = createMiddleware(routing);

export const config = {
  // Se excluyen `_next` (assets del build), `api` y cualquier ruta con punto
  // (favicon.ico, iconos generados, PNG de `public/brand`) porque redirigirlos
  // a `/es/...` rompería la descarga del archivo.
  //
  // `leandro` también queda afuera: es la tarjeta de contacto, vive fuera de
  // `[locale]` con su propio layout y va sólo en inglés, así que mandarla a
  // `/es/leandro` la dejaría en un 404. Tiene que coincidir con
  // `RUTA_DE_LA_TARJETA`; el matcher no admite importar la constante.
  matcher: '/((?!_next|api|leandro|.*\\.).*)'
};
