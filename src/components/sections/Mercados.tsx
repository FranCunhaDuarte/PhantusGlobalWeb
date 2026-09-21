import { useTranslations } from 'next-intl';
import RutasDeMercado from '@/components/alcance/RutasDeMercado';
import FondoDeApertura from '@/components/hero/FondoDeApertura';
import BloqueConFoto from '@/components/ui/BloqueConFoto';
import Eyebrow from '@/components/ui/Eyebrow';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import hero from '@/imagenes/mercados.jpg';
import puerto from '@/imagenes/ciudad/puerto.jpg';
import buque from '@/imagenes/ciudad/buque.jpg';

/**
 * Hasta acá fue el cuarto bloque de `/nosotros` y se llamaba alcance. Pasó a
 * página propia cuando la home estrenó su índice de tres tarjetas: una tarjeta
 * que dice MERCADOS y cae en el pie de otra página promete algo que no cumple.
 *
 * **La página se rehizo: era el hero y una sola banda de prosa.** Entre la
 * apertura y el CTA había un único bloque con las dos puntas de la operación en
 * dos columnas de texto —884 caracteres— y los cuatro mercados como cuatro
 * píldoras chiquitas al pie de la columna derecha. Una página que se llama
 * Mercados y donde los mercados son lo más chico que hay.
 *
 * Ahora son tres tramos y **cada uno se lee distinto**:
 *
 * 1. **De dónde sale**, con la flota amarrada a la derecha.
 * 2. **Hasta dónde llega**, con el buque saliendo a la izquierda. La foto
 *    cambia de lado a propósito: dos bloques iguales seguidos se leen como una
 *    tabla, y alternarlos le da el ritmo que la página no tenía.
 * 3. **Los cuatro mercados**, dibujados como un origen y cuatro ramas sobre
 *    tinta, con el estándar colgando de la única rama que lo tiene.
 *
 * El texto bajó de unos 884 caracteres a unos 560 sin perder ningún dato: lo que
 * se fue es la envoltura y una enumeración de los cuatro mercados en prosa que
 * estaba tres centímetros encima de la lista de los cuatro mercados.
 *
 * Sigue **sin mapa**: los destinos son cuatro mercados, no cuatro puntos, y un
 * mapa con cuatro chinches dice menos que la banda.
 */
export default function Mercados() {
  const t = useTranslations('mercados');

  return (
    <>
      {/* Apertura con foto y velo, igual que `/nosotros`: la barra queda
          apoyada encima sin fondo propio —la ruta está en `RUTAS_CON_HERO`— y
          por eso la sección sube `-mt-header` y devuelve el alto con el
          `pt-header` de adentro. Sin ese par, el titular arrancaría debajo de
          la barra.

          El rótulo va en `pleno` y no en el gris de siempre: sobre el velo el
          crema pleno ya está a 4,54:1 del peor cuadro posible, así que cualquier
          atenuación por color lo perfora. */}
      <Section fondo="tinta" className="relative isolate -mt-header">
        <FondoDeApertura foto={hero} />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 pt-header text-center md:min-h-[16rem] md:justify-center">
          <Eyebrow tono="pleno">{t('eyebrow')}</Eyebrow>
          {/* Sin `Destacado`, como los titulares de `/nosotros` y de contacto:
              los tres se sacaron por pedido. Volver a ponerlo es envolver la
              palabra en `<destacado>` dentro de la clave, y entonces esto
              tiene que pasar de `t` a `t.rich`. */}
          <SectionHeading nivel={1} escala="titulo-mayor">
            {t('titulo')}
          </SectionHeading>
          {/* **Más angosta que la de las otras dos aperturas**, que van en
              `2xl`. Es el mismo tope que usa el subtexto del hero de la home
              contra su columna de `3xl`: con el ancho del titular y la mitad del
              cuerpo, la bajada se lee como un segundo bloque de texto en vez de
              como su bajada. */}
          <p className="text-entrada md:max-w-xl">{t('entrada')}</p>
        </div>
      </Section>

      {/* Los dos bloques van `relleno="sin"` y `contenedor={false}`: la foto
          tiene que llegar al borde y el bloque mide su propio alto, así que no
          hay aire de sección alrededor. Es lo mismo que hace la tarjeta de la
          ciudad en `/nosotros`. */}
      <Section fondo="crema-elevado" relleno="sin" contenedor={false}>
        <BloqueConFoto
          titulo={<h2 className="text-titulo">{t('origen.titulo')}</h2>}
          foto={puerto}
          alt={t('origen.alt')}
        >
          <p className="max-w-md text-entrada">
            {t('origen.texto')}
          </p>
          <p className="max-w-md">{t('origen.detalle')}</p>
        </BloqueConFoto>
      </Section>

      <Section fondo="crema" relleno="sin" contenedor={false}>
        <BloqueConFoto
          lado="izquierda"
          titulo={<h2 className="text-titulo">{t('destino.titulo')}</h2>}
          foto={buque}
          alt={t('destino.alt')}
        >
          <p className="max-w-md text-entrada">
            {t('destino.texto')}
          </p>
          <p className="max-w-md">{t('destino.detalle')}</p>
        </BloqueConFoto>
      </Section>

      {/* **El árbol de destinos va sobre tinta**, y es el único bloque oscuro de
          la página además del hero. Es a propósito: los cuatro mercados son lo
          que la página promete desde el nombre, y en crema quedaban como un
          apéndice del bloque de arriba. Sobre oscuro son el ancla visual.

          El orden de fondos queda tinta → crema elevado → crema → tinta →
          bordó: ningún límite sin corte, y las dos bandas oscuras del final se
          separan por color. */}
      <Section fondo="tinta">
        <RutasDeMercado
          etiqueta={t('mercadosTitulo')}
          origen={t('origenDeLasRutas')}
        />
        {/* El estándar va debajo del árbol y no colgando de su rama, y arranca
            nombrando el mercado para que se sepa de cuál habla. Colgarlo dejaba
            el ítem de Estados Unidos más alto que los otros tres y descolocaba
            el trunco; el porqué está en `RutasDeMercado`. */}
        <p className="mt-12 max-w-2xl">{t('cumplimiento')}</p>
      </Section>
    </>
  );
}
