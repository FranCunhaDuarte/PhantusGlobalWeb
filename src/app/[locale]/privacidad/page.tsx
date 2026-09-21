import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ID_CONTENIDO } from '@/components/layout/SaltarAlContenido';
import PaginaLegal from '@/components/sections/PaginaLegal';
import { TRAMOS_DE_PRIVACIDAD } from '@/content/legales';
import { alternativasDeRuta } from '@/lib/rutas';
import { tarjetaSocial } from '@/lib/tarjeta-social';

export async function generateMetadata({
  params
}: PageProps<'/[locale]/privacidad'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legales.privacidad' });
  const tMetadata = await getTranslations({ locale, namespace: 'metadata' });
  const tMarca = await getTranslations({ locale, namespace: 'marca' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: alternativasDeRuta('/privacidad', locale),
    ...tarjetaSocial('/privacidad', locale, tMarca('nombre'), tMetadata('ogAlt'))
  };
}

export default async function PrivacidadPage({
  params
}: PageProps<'/[locale]/privacidad'>) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'legales.privacidad' });

  return (
    <main id={ID_CONTENIDO} className="flex-1">
      <PaginaLegal
        titulo={t('titulo')}
        entrada={t('entrada')}
        actualizado={t('actualizado')}
        tramos={TRAMOS_DE_PRIVACIDAD.map((id) => ({
          id,
          titulo: t(`tramos.${id}.titulo`),
          texto: t(`tramos.${id}.texto`)
        }))}
      />
    </main>
  );
}
