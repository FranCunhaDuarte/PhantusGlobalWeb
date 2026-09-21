import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { locale as segmentoIdioma } from 'next/root-params';
import { routing } from './routing';

export default getRequestConfig(async ({ locale: idiomaExplicito }) => {
  // `[locale]` actúa como catch-all, así que el segmento puede traer basura
  // (`/pt`, `/robots.txt`): siempre se valida antes de cargar el catálogo.
  const candidato = idiomaExplicito ?? (await segmentoIdioma());
  const idioma = hasLocale(routing.locales, candidato)
    ? candidato
    : routing.defaultLocale;

  return {
    locale: idioma,
    messages: (await import(`../messages/${idioma}.json`)).default
  };
});
