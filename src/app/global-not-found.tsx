import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import MensajeNoEncontrado from '@/components/ui/MensajeNoEncontrado';
import { clasesDeBoton } from '@/components/ui/Button';
import { routing } from '@/i18n/routing';
import { montserrat } from '@/lib/fuentes';
import './globals.css';

// Esta página se renderiza fuera del árbol de layouts, así que no hay segmento
// `[locale]` del que leer el idioma: se usa la cookie de preferencia que deja
// el proxy y, si todavía no existe, el idioma por defecto.
async function idiomaPreferido() {
  const almacen = await cookies();
  const guardado = almacen.get('NEXT_LOCALE')?.value;
  return hasLocale(routing.locales, guardado) ? guardado : routing.defaultLocale;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await idiomaPreferido();
  const t = await getTranslations({ locale, namespace: 'notFound' });

  return { title: t('title') };
}

export default async function GlobalNotFound() {
  const locale = await idiomaPreferido();
  const t = await getTranslations({ locale, namespace: 'notFound' });

  return (
    <html
      lang={locale}
      className={`${montserrat.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <MensajeNoEncontrado
          titulo={t('title')}
          descripcion={t('description')}
          enlaceInicio={
            <a href={`/${locale}`} className={clasesDeBoton()}>
              {t('backHome')}
            </a>
          }
        />
      </body>
    </html>
  );
}
