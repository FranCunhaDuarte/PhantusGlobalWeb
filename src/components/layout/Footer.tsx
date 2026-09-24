import { useTranslations } from 'next-intl';
import { TELEFONO_MARCABLE, WHATSAPP } from '@/content/contacto-directo';
import NavegacionDeSecciones from '@/components/layout/NavegacionDeSecciones';
import Container from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';
import { SECCIONES_DEL_PIE } from '@/content/secciones';
import { LEGALES, RUTA_DE_LEGAL } from '@/content/legales';
import { Link } from '@/i18n/navigation';

const FONDO = 'tinta';

/** El mismo subrayado fino que usan los canales al lado del formulario. */
const ENLACE =
  'w-fit break-all font-medium underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70';

export default function Footer() {
  const t = useTranslations('pie');
  const tNavegacion = useTranslations('navegacion');
  const tMarca = useTranslations('marca');
  const tLegales = useTranslations('legales');
  const tContacto = useTranslations('home.contacto');
  const tWhatsapp = useTranslations('whatsapp');
  const anio = new Date().getFullYear();

  return (
    <footer data-fondo={FONDO} className="py-14">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Link href="/" aria-label={tNavegacion('inicio')} className="inline-flex w-fit">
              <Logo sobre={FONDO} ancho={186} />
            </Link>
            {/* El slogan va pegado al logotipo y en el color pleno del fondo:
                es marca, no una nota al pie. La ciudad, que sí es dato de
                contacto, queda abajo en el gris de lo secundario. */}
            {/* **La ciudad se mudó a la columna de contacto**, por pedido: es
                dato de contacto y ahí está el resto. Acá quedaba debajo del
                lema y repetirla en las dos columnas era decirla dos veces en la
                misma franja. */}
            <p className="font-medium">{tMarca('slogan')}</p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-eyebrow uppercase texto-suave">{t('navegar')}</h2>
            <NavegacionDeSecciones
              etiqueta={t('navegar')}
              secciones={SECCIONES_DEL_PIE}
              orientacion="vertical"
            />
          </div>

          {/* El correo va en texto plano desde la Fase 11. Hasta entonces el
              único canal era el formulario, justamente para no exponerlo a los
              rastreadores de direcciones; el cliente lo publicó en su copy y la
              decisión se toma sabiendo ese costo.

              **Al lado iba el nombre del responsable y se sacó por pedido.** Con
              él se fue también la dirección personal, que llevaba su nombre:
              `pie.correo` pasó a la casilla genérica, que es la que la sección
              de contacto ya publicaba. De paso quedan las dos iguales, que era
              una inconsistencia anotada desde que entraron los canales
              directos. El JSON-LD lee esta misma clave, así que el correo de la
              organización siguió sin tocarse. */}
          <div className="flex flex-col gap-4">
            <h2 className="text-eyebrow uppercase texto-suave">{t('contacto')}</h2>
            <p className="texto-suave">{t('canal')}</p>
            {/* **Acá iba un "Escribinos" al formulario y se sacó por pedido.**
                Era el mismo destino que la entrada `Contacto` de la columna de
                navegación, dos columnas a la izquierda: el mismo enlace dos
                veces en la misma franja. La clave `pie.escribirnos` quedó sin
                consumidor y no se borró.

                La línea de arriba sigue siendo cierta —nombra el formulario y
                el correo— porque al formulario se sigue llegando desde el pie,
                por esa entrada de navegación. */}
            {/* **Los cuatro datos de contacto, iguales en todas las páginas y
                en los dos idiomas.** Hasta acá el pie tenía sólo el correo, y
                quien llegaba al final de una subpágina no tenía ni el teléfono
                ni WhatsApp sin volver a la home: la sección de contacto con los
                canales vive únicamente ahí.

                El número que se marca no es el que se lee —ver
                `contacto-directo.ts`— y el enlace de WhatsApp sale del mismo
                dato, así que no hay dos números que puedan desfasarse.

                La ciudad va última y sin enlace: es dónde estamos, no un canal,
                así que no lleva el subrayado de los otros tres. */}
            <ul className="flex flex-col gap-3">
              <li>
                <a href={`mailto:${t('correo')}`} className={ENLACE}>
                  {t('correo')}
                </a>
              </li>
              <li>
                <a href={`tel:${TELEFONO_MARCABLE}`} className={ENLACE}>
                  {tContacto('telefono')}
                </a>
              </li>
              <li>
                <a href={WHATSAPP} target="_blank" rel="noreferrer" className={ENLACE}>
                  {tWhatsapp('etiqueta')}
                </a>
              </li>
              <li className="texto-suave">{t('ubicacion')}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t borde-seccion pt-8 sm:flex-row sm:items-center sm:justify-between">
          {/* **Acá iban los tres valores de marca** —confianza, transparencia,
              compromiso— y los reemplazaron las dos legales. Los valores no se
              perdieron: siguen siendo un bloque propio en `/nosotros`, con su
              bajada, que es donde dicen algo. Al pie eran tres palabras sueltas
              en versalita gris, indistinguibles de un menú, justo en la franja
              donde se buscan los enlaces legales.

              Van con el `Link` tipado y no con `EnlaceDeSeccion`: no son
              secciones del sitio y no tienen la ambigüedad entre ruta y ancla
              que ese componente resuelve. */}
          <ul className="flex flex-wrap gap-x-6 gap-y-1 text-eyebrow uppercase texto-suave">
            {LEGALES.map((legal) => (
              <li key={legal}>
                <Link
                  href={RUTA_DE_LEGAL[legal]}
                  className="underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
                >
                  {tLegales(`${legal}.enlace`)}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-sm texto-suave">{t('derechos', { anio })}</p>
        </div>
      </Container>
    </footer>
  );
}
