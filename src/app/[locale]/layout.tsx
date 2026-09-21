import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Footer from '@/components/layout/Footer';
import ScrollAlInicio from '@/components/layout/ScrollAlInicio';
import RealceDeBotones from '@/components/ui/RealceDeBotones';
import Header from '@/components/layout/Header';
import SaltarAlContenido from '@/components/layout/SaltarAlContenido';
import { montserrat } from '@/lib/fuentes';
import { routing } from '@/i18n/routing';
import { alternativasDeRuta } from '@/lib/rutas';
import { SITIO } from '@/lib/sitio';
import { tarjetaSocial } from '@/lib/tarjeta-social';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const tMarca = await getTranslations({ locale, namespace: 'marca' });

  return {
    metadataBase: new URL(SITIO.origen),
    // `default` es el título de la home; la plantilla la completan las
    // subpáginas, que declaran sólo su parte propia.
    title: { default: t('title'), template: t('template') },
    description: t('description'),
    alternates: alternativasDeRuta('/', locale),
    ...tarjetaSocial('/', locale, tMarca('nombre'), t('ogAlt'))
  };
}

export default async function LocaleLayout({
  children,
  params
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${montserrat.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          <ScrollAlInicio />
          <SaltarAlContenido />
          <Header />
          {children}
          <Footer />
          <RealceDeBotones />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
