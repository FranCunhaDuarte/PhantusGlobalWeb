import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ID_CONTENIDO } from '@/components/layout/SaltarAlContenido';
import LlamadaAContacto from '@/components/sections/LlamadaAContacto';
import Mercados from '@/components/sections/Mercados';
import { alternativasDeRuta } from '@/lib/rutas';
import { tarjetaSocial } from '@/lib/tarjeta-social';

export async function generateMetadata({
  params
}: PageProps<'/[locale]/mercados'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'mercados' });
  const tMetadata = await getTranslations({ locale, namespace: 'metadata' });
  const tMarca = await getTranslations({ locale, namespace: 'marca' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: alternativasDeRuta('/mercados', locale),
    ...tarjetaSocial('/mercados', locale, tMarca('nombre'), tMetadata('ogAlt'))
  };
}

export default async function MercadosPage({
  params
}: PageProps<'/[locale]/mercados'>) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'mercados.contacto' });

  return (
    <main id={ID_CONTENIDO} className="flex-1">
      <Mercados />
      <LlamadaAContacto
        titulo={t('titulo')}
        texto={t('texto')}
        cta={t('cta')}
      />
    </main>
  );
}
