import { useTranslations } from 'next-intl';
import BotonSaberMas from '@/components/layout/BotonSaberMas';
import { ANCLA_DE_UNIDAD } from '@/content/unidades';
import AdelantoDelCatalogo from '@/components/productos/AdelantoDelCatalogo';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';

// Crema base: arriba queda el crema elevado de los accesos y abajo vuelve el
// elevado de `carnes`. La bajada de la home es tinta → elevado → base → elevado
// → base → bordó, sin dos límites del mismo tono pegados.
const FONDO = 'crema';

/**
 * Qué se comercializa, y es lo primero después del hero: quien entra pregunta
 * eso antes que el manifiesto. Es a la vez la sección `productos` de la home y
 * el adelanto del catálogo, que hasta la Fase 11 eran dos bloques distintos —la
 * vidriera de unidades de negocio y el carrusel de especies— apuntando al mismo
 * lugar. Con una sola unidad de negocio eso era decir dos veces lo mismo.
 */
export default function ResumenDeProductos() {
  const t = useTranslations('home.productos');

  return (
    <Section id="productos" fondo={FONDO}>
      {/* Sin rótulo ni bajada: el titular nombra la unidad y el carrusel de
          abajo muestra de qué se trata. El rótulo decía exactamente lo mismo
          que el titular dice ahora, y la bajada enumeraba cuatro especies que
          están justo debajo, con foto. */}
      <SectionHeading seccion="productos" className="uppercase">
        {t('titulo')}
      </SectionHeading>

      <AdelantoDelCatalogo className="mt-10" />

      <div className="mt-10 flex justify-center">
        {/* Va derecho al catálogo y no al índice de unidades: lo que este
            bloque acaba de mostrar son especies. Al índice se llega por el
            nombre de la sección, arriba, y por la navegación. */}
        <BotonSaberMas
          href={{ pathname: '/productos', hash: ANCLA_DE_UNIDAD.pescados }}
        >{t('cta')}</BotonSaberMas>
      </div>
    </Section>
  );
}
