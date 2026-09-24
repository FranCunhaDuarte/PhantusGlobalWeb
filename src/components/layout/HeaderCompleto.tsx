import { useTranslations } from 'next-intl';
import EnlaceDeSeccion from '@/components/layout/EnlaceDeSeccion';
import HeaderElevado from '@/components/layout/HeaderElevado';
import MenuDeSecciones from '@/components/layout/MenuDeSecciones';
import NavegacionDeSecciones from '@/components/layout/NavegacionDeSecciones';
import SelectorIdioma from '@/components/layout/SelectorIdioma';
import { clasesDeBoton } from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';
import { SECCION_CONTACTO } from '@/content/secciones';
import { Link } from '@/i18n/navigation';

export default function HeaderCompleto() {
  const t = useTranslations('navegacion');

  return (
    <HeaderElevado>
      <Container>
        <div className="flex h-header items-center justify-between gap-4">
          {/* **Acá estuvo el lema, bajo el logo, y se sacó por pedido.** Entraba
              —el bloque del logo llegaba a 87 px dentro de una barra de 96— pero
              vivía de los 9 px que sobraban. Sigue en el pie, que es donde el
              manual lo pone. */}
          <Link href="/" aria-label={t('inicio')} className="inline-flex shrink-0">
            {/* Por debajo de `xs` el logotipo completo entra a los codazos con
                el selector de idioma y el botón de menú: ahí va el isotipo
                suelto, que el manual habilita para espacios mínimos. Desde `xs`
                manda el logotipo completo, que es lo que el manual pide para el
                header. Ambos por encima de sus mínimos (50 px y 150 px).
                La variante de color no se pasa a mano: la publica
                `HeaderElevado` por contexto y cambia con el estado de la
                barra. */}
            <Logo forma="isotipo" ancho={50} fondoCambiante className="xs:hidden" />
            <Logo
              forma="logotipo"
              ancho={150}
              fondoCambiante
              className="hidden xs:block"
            />
          </Link>

          {/* Tres grupos: logotipo, navegación y controles. El aire crece hacia
              afuera —12 px adentro del bloque de controles, 20 px entre
              secciones, 32 px entre un grupo y el otro— para que se lean como
              tres cosas y no como una fila de siete. El gap de adentro de un
              grupo nunca puede ser mayor que el que lo separa del de al lado. */}
          <div className="flex items-center gap-3 lg:gap-8 xl:gap-10">
            <NavegacionDeSecciones
              etiqueta={t('secciones')}
              className="hidden text-sm lg:block xl:text-base"
            />
            <div className="flex items-center gap-1.5 sm:gap-3">
              <SelectorIdioma />
              {/* El ocultado va en el envoltorio: `hidden` sobre el botón perdería
                  contra el `inline-flex` de su clase base. */}
              <div className="hidden sm:flex">
                <EnlaceDeSeccion
                  seccion={SECCION_CONTACTO}
                  className={clasesDeBoton({ tamano: 'compacto' })}
                >
                  {t('cta')}
                </EnlaceDeSeccion>
              </div>
              <MenuDeSecciones className="lg:hidden" />
            </div>
          </div>
        </div>
      </Container>
    </HeaderElevado>
  );
}
