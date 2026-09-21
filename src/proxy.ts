import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

export const proxy = createMiddleware(routing);

export const config = {
  // Se excluyen `_next` (assets del build), `api` y cualquier ruta con punto
  // (favicon.ico, iconos generados, PNG de `public/brand`) porque redirigirlos
  // a `/es/...` rompería la descarga del archivo.
  matcher: '/((?!_next|api|.*\\.).*)'
};
