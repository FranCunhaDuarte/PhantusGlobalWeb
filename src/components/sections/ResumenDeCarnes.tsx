import { useTranslations } from 'next-intl';
import BotonSaberMas from '@/components/layout/BotonSaberMas';
import AdelantoDeCortes from '@/components/productos/AdelantoDeCortes';
import { ANCLA_DE_UNIDAD } from '@/content/unidades';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';

// Crema elevado: arriba queda el crema base de `productos` y abajo arranca el
// bordó del formulario. Es el último tramo claro de la home, que va tinta →
// elevado → base → elevado → bordó.
const FONDO = 'crema-elevado';

/**
 * La segunda unidad de negocio en la home, con la misma forma que la primera:
 * titular en mayúsculas, carrusel y una salida. Va **después** de `nosotros` y
 * no pegado a `productos` a propósito: carnes es la unidad secundaria, y dos
 * carruseles al hilo arriba de todo harían que la home prometiera dos catálogos
 * del mismo peso.
 *
 * **No abre ancla ni entra en `SECCIONES`.** La navegación del sitio lleva a
 * `Productos`, que es el índice de las dos unidades; sumar una entrada más al
 * header por un bloque de la home sería contar dos veces la misma estructura.
 */
export default function ResumenDeCarnes() {
  const t = useTranslations('home.carnes');

  return (
    <Section fondo={FONDO}>
      <SectionHeading className="uppercase">{t('titulo')}</SectionHeading>

      <AdelantoDeCortes className="mt-10" />

      <div className="mt-10 flex justify-center">
        <BotonSaberMas
          href={{ pathname: '/productos', hash: ANCLA_DE_UNIDAD.carnes }}
        >{t('cta')}</BotonSaberMas>
      </div>
    </Section>
  );
}
