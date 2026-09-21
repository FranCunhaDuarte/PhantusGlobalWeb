import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ID_CONTENIDO } from '@/components/layout/SaltarAlContenido';
import LlamadaAContacto from '@/components/sections/LlamadaAContacto';
import Productos from '@/components/sections/Productos';
import { alternativasDeRuta } from '@/lib/rutas';
import { tarjetaSocial } from '@/lib/tarjeta-social';

export async function generateMetadata({
  params
}: PageProps<'/[locale]/productos'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'productos' });
  const tMetadata = await getTranslations({ locale, namespace: 'metadata' });
  const tMarca = await getTranslations({ locale, namespace: 'marca' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: alternativasDeRuta('/productos', locale),
    ...tarjetaSocial('/productos', locale, tMarca('nombre'), tMetadata('ogAlt'))
  };
}

/**
 * **La única página de productos.** Fue un índice de dos tarjetas con una hoja
 * por unidad detrás; las dos hojas se plegaron adentro, así que acá está todo:
 * el índice, el catálogo de especies, el diagrama de cortes, las condiciones de
 * operación y el cierre.
 *
 * **Ahora sí lleva llamada a contacto, y antes no.** Mientras era un índice de
 * dos opciones no la necesitaba —su único trabajo era dejar elegir, y el CTA
 * vivía en cada unidad—. Con las dos unidades acá adentro, esta página es el
 * final del recorrido y tiene que cerrar.
 *
 * El CTA no reusa el de ninguna de las dos hojas: el de pescados preguntaba por
 * especie y temporada y el de carnes por corte y mercado, y acá hace falta uno
 * que cubra las dos. De ahí `productos.contacto`.
 *
 * **Entre los despieces y el cierre había un bloque de condiciones de operación**
 * —formatos, condiciones comerciales y cumplimiento en tres columnas, más la
 * mención de las otras categorías— y se sacó por pedido. El componente
 * `CondicionesDeOperacion` y las claves `productos.pescados.condiciones.*`
 * quedaron sin consumidor y no se borraron.
 *
 * **Con él se fue el único enlace del sitio a `?consulta=otro`.** La opción
 * sigue existiendo en el desplegable del formulario y sigue viajando por la URL
 * si alguien la escribe, pero ya no hay desde dónde llegar con ella puesta.
 */
export default async function ProductosPage({
  params
}: PageProps<'/[locale]/productos'>) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'productos.contacto' });

  return (
    <main id={ID_CONTENIDO} className="flex-1">
      <Productos />
      <LlamadaAContacto
        titulo={t('titulo')}
        texto={t('texto')}
        cta={t('cta')}
      />
    </main>
  );
}
