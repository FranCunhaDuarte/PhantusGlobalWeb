import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ID_CONTENIDO } from '@/components/layout/SaltarAlContenido';
import Nosotros from '@/components/sections/Nosotros';
import { alternativasDeRuta } from '@/lib/rutas';
import { tarjetaSocial } from '@/lib/tarjeta-social';

export async function generateMetadata({
  params
}: PageProps<'/[locale]/nosotros'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nosotros' });
  const tMetadata = await getTranslations({ locale, namespace: 'metadata' });
  const tMarca = await getTranslations({ locale, namespace: 'marca' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: alternativasDeRuta('/nosotros', locale),
    ...tarjetaSocial('/nosotros', locale, tMarca('nombre'), tMetadata('ogAlt'))
  };
}

export default async function NosotrosPage({
  params
}: PageProps<'/[locale]/nosotros'>) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id={ID_CONTENIDO} className="flex-1">
      <Nosotros />
    </main>
  );
}
