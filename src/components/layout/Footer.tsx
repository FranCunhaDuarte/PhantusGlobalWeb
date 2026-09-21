import { useTranslations } from 'next-intl';
import EnlaceDeSeccion from '@/components/layout/EnlaceDeSeccion';
import NavegacionDeSecciones from '@/components/layout/NavegacionDeSecciones';
import Container from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';
import { SECCIONES, SECCION_CONTACTO } from '@/content/secciones';
import { LEGALES, RUTA_DE_LEGAL } from '@/content/legales';
import { Link } from '@/i18n/navigation';

const FONDO = 'tinta';

export default function Footer() {
  const t = useTranslations('pie');
  const tNavegacion = useTranslations('navegacion');
  const tMarca = useTranslations('marca');
  const tLegales = useTranslations('legales');
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
            <div className="flex flex-col gap-1.5">
              <p className="font-medium">{tMarca('slogan')}</p>
              <p className="max-w-xs texto-suave">{t('ubicacion')}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-eyebrow uppercase texto-suave">{t('navegar')}</h2>
            <NavegacionDeSecciones
              etiqueta={t('navegar')}
              secciones={SECCIONES}
              orientacion="vertical"
            />
          </div>

          {/* El correo va en texto plano desde la Fase 11. Hasta entonces el
              único canal era el formulario, justamente para no exponerlo a los
              rastreadores de direcciones; el cliente lo publicó en su copy y la
              decisión se toma sabiendo ese costo. El responsable no es adorno:
              es el dato que el copy pone al lado de la dirección. */}
          <div className="flex flex-col gap-4">
            <h2 className="text-eyebrow uppercase texto-suave">{t('contacto')}</h2>
            <p className="texto-suave">{t('canal')}</p>
            <div className="flex flex-col gap-1">
              <p className="font-medium">{t('responsable')}</p>
              <a
                href={`mailto:${t('correo')}`}
                className="w-fit break-all underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
              >
                {t('correo')}
              </a>
            </div>
            <EnlaceDeSeccion
              seccion={SECCION_CONTACTO}
              className="w-fit font-medium underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
            >
              {t('escribirnos')}
            </EnlaceDeSeccion>
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
