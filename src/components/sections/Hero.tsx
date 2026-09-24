import { useTranslations } from 'next-intl';
import FondoDelHero from '@/components/hero/FondoDelHero';
import IconosDeRubro from '@/components/hero/IconosDeRubro';
import EnlaceDeSeccion from '@/components/layout/EnlaceDeSeccion';
import { clasesDeBoton } from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import { SECCION_CONTACTO } from '@/content/secciones';

/**
 * El único bloque oscuro arriba de todo. No es una elección de color sino la
 * consecuencia del velo: el texto va en crema y el titular no lleva destacado
 * ninguno —el bordó sobre oscuro no llega a contraste—, así que el acento lo da
 * la mayúscula. El corte contra `productos`, que es crema elevado, es el más
 * fuerte de la home.
 */
const FONDO = 'tinta';

/**
 * El hero sube el alto del header para que la barra quede encima del video y no
 * a continuación. La barra mide exactamente `--spacing-header` —su línea va como
 * sombra interior, no como borde—, así que no queda un pelo de fondo asomando
 * arriba de todo.
 */
const SANGRADO = 'relative isolate -mt-header';

/**
 * Texto centrado sobre el video, que va de fondo a la sección entera. El alto
 * mínimo se limita contra el viewport y no es un número fijo: la sección que
 * sigue tiene que asomar al cargar, y en una pantalla de 800 px un hero de
 * 34rem ya no la deja entrar.
 */
const COLUMNA_DE_TEXTO =
  'relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center md:gap-7 md:min-h-[20rem] md:justify-center lg:min-h-[min(34rem,calc(100svh_-_22rem))]';

export default function Hero() {
  const t = useTranslations('home.hero');

  return (
    <Section fondo={FONDO} className={SANGRADO}>
      <FondoDelHero />
      {/* Devuelve el alto que el sangrado se llevó: el texto arranca donde
          arrancaba cuando el header ocupaba lugar en el flujo. */}
      <div className="pt-header">
        <div className={COLUMNA_DE_TEXTO}>
          {/* El rótulo es parte del titular, no un bloque más de la columna: con
              el mismo aire que el resto se leía suelto, y en mobile ese aire de
              más es lo que le deja lugar a la foto sin empujar la sección de
              abajo fuera de pantalla. */}
          <div className="flex flex-col gap-3">
            <Eyebrow tono="pleno">{t('eyebrow')}</Eyebrow>

            {/* Sin `Destacado`: acá la mayúscula ya es el acento, y encima el
                realce de `Destacado` es bordó, que sobre el velo no llega a
                contraste. */}
            {/* El único titular del sitio a 800: el resto va en los 600 de
                Montserrat SemiBold, que es la voz de titulares del manual.
                Cuesta cero bytes —la familia entra como variable, así que el
                peso ya está en el archivo— y acá se justifica porque compite
                con una foto a pantalla completa. */}
            <SectionHeading
              nivel={1}
              escala="titulo-mayor"
              className="font-extrabold uppercase"
            >
              {t('titulo')}
            </SectionHeading>

            {/* **La bajada volvió.** Estuvo, se fue cuando entraron los iconos
                de rubro y la pidió de nuevo el cliente, ahora diciendo otra
                cosa: antes enumeraba la red, los mercados y el recorrido; hoy
                dice quién es la empresa y con quién trabaja.

                Va en `text-base` y no en `text-entrada`, y desde `md` no pasa
                de `max-w-xl` contra los `3xl` de la columna: compite con un
                titular en mayúsculas a cuerpo mayor, y con el mismo ancho y la
                mitad del cuerpo se leería como un segundo bloque de texto en
                vez de como su bajada. Bajar de cuerpo no toca el contraste,
                porque el velo está calculado para texto chico. */}
            <p className="mx-auto text-base md:max-w-xl">{t('bajada')}</p>
          </div>

          {/* Los cuatro rubros, en lugar de la bajada. La que había enumeraba
              la red SENASA, los cuatro mercados y el recorrido de origen a
              destino: **eso ya no está en la primera pantalla de la home**, y es
              una pérdida real de dato —los mercados sólo se nombran ahora en
              `/mercados`—. */}
          <IconosDeRubro />

          {/* Un solo destino y sin `?consulta=`: de qué lado está quien entra lo
              pregunta el propio formulario, que es donde la respuesta se usa. El
              contrato sigue vivo para los CTA de `alcance` y las unidades, que
              llegan con el lado ya elegido.
              Va por `EnlaceDeSeccion` y no por un `href` a mano porque es el
              único que sabe que `#contacto` existe en la home y no en una
              subpágina. El envoltorio es el que limita el ancho: el `inline-flex`
              del botón perdería contra un `w-fit` puesto en la misma clase. */}
          <div className="flex justify-center">
            <EnlaceDeSeccion
              seccion={SECCION_CONTACTO}
              className={clasesDeBoton({ variante: 'azul' })}
            >
              {t('cta')}
            </EnlaceDeSeccion>
          </div>
        </div>
      </div>
    </Section>
  );
}
