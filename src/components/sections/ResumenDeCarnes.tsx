import { useTranslations } from 'next-intl';
import BotonSaberMas from '@/components/layout/BotonSaberMas';
import { ANCLA_DE_UNIDAD } from '@/content/unidades';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';

// Crema elevado: arriba queda el crema base de `productos` y abajo arranca el
// bordó del formulario. Es el último tramo claro de la home, que va tinta →
// elevado → base → elevado → bordó.
const FONDO = 'crema-elevado';

/**
 * La segunda unidad de negocio en la home: **titular, una línea y una salida a
 * los despieces**. No es un adelanto de catálogo y eso es lo que cambió.
 *
 * **Llevaba un carrusel de cortes con foto y se sacó por pedido.** Tenía la
 * misma forma que el de pescados —titular, carrusel, salida— y ahí estaba el
 * problema: dos pistas de fotos al hilo prometían dos catálogos del mismo peso,
 * que es justo lo que la unidad de carnes se ocupa de desmentir. Carnes no tiene
 * catálogo publicado y no lo va a tener mientras la especificación se arme
 * contra el pedido; lo que sí tiene es el despiece, que es dato real y está
 * dibujado. Así que el bloque dejó de mostrar producto y pasó a ser una
 * invitación a ir a verlo.
 *
 * **La línea no es copy nuevo**: es `productos.carnes.entrada`, del archivo del
 * cliente, que quedó sin consumidor cuando `/productos/carnes` se plegó adentro
 * de `/productos` y su hoja perdió el titular y la entrada. Dice exactamente lo
 * que hace falta decir acá —que carnes no es el foco y que el catálogo es el de
 * pescados—, así que explica sola por qué debajo no hay una pista de fotos.
 *
 * **El botón sigue siendo el de borde y no el sólido.** El sólido es del CTA de
 * contacto, que es la única acción real de la home; esto es una salida a otra
 * parte del sitio, igual que el de pescados.
 *
 * **Apunta a `#carnes`, que es el bloque de los dos despieces.** Desde que la
 * res y el ave comparten bloque, caer ahí muestra los dos: el corte y el pollo.
 *
 * **No abre ancla ni entra en `SECCIONES`.** La navegación del sitio lleva a
 * `Productos`, que es el índice de las tres unidades; sumar una entrada más al
 * header por un bloque de la home sería contar dos veces la misma estructura.
 */
export default function ResumenDeCarnes() {
  const t = useTranslations('home.carnes');
  const tUnidad = useTranslations('productos.carnes');

  return (
    <Section fondo={FONDO}>
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <SectionHeading className="uppercase">{t('titulo')}</SectionHeading>
        <p className="text-entrada">{tUnidad('entrada')}</p>
        <BotonSaberMas
          className="mt-2"
          href={{ pathname: '/productos', hash: ANCLA_DE_UNIDAD.carnes }}
        >
          {t('cta')}
        </BotonSaberMas>
      </div>
    </Section>
  );
}
