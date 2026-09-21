import { useTranslations } from 'next-intl';
import HeaderElevado from '@/components/layout/HeaderElevado';
import MenuDeSecciones from '@/components/layout/MenuDeSecciones';
import SelectorIdioma from '@/components/layout/SelectorIdioma';
import Container from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';
import { Link } from '@/i18n/navigation';
import { clases } from '@/lib/clases';

/**
 * El alto lo fija el logo y nada más. Con el logotipo completo a 158 px el
 * manual pide 56 px de arte más 10 de aire por lado: 76 px, que entran en 80.
 * Donde manda el isotipo la cuenta cambia y sube: su área de seguridad se mide
 * contra el alto del nombre, que es mayor que el propio isotipo, así que a 52 px
 * pide 55 de arte más 20 por lado, o sea 95, y la barra vuelve a 96.
 */
const ALTO_DE_BARRA = 'h-24 min-[24rem]:h-20';

/**
 * Header sin navegación desplegada: marca, idioma y una puerta al resto. Las
 * secciones no desaparecen, se mudan al panel, que es el mismo en escritorio y
 * en mobile.
 *
 * El umbral del logotipo es propio y más bajo que `xs`, que está calculado para
 * la barra completa: acá la derecha ocupa 143 px —el disparador de idioma más
 * el de menú— y el logotipo con su aire 178, que con el gap de 16 suman 337 y
 * entran desde 377 px de viewport. Queda en 384 para no cortar tan al filo.
 */
export default function HeaderMinimo() {
  const t = useTranslations('navegacion');

  return (
    <HeaderElevado limiteEnReposo={false}>
      <Container>
        <div
          className={clases('flex items-center justify-between gap-4', ALTO_DE_BARRA)}
        >
          <Link href="/" aria-label={t('inicio')} className="inline-flex shrink-0">
            <Logo
              forma="isotipo"
              ancho={52}
              fondoCambiante
              className="min-[24rem]:hidden"
            />
            <Logo
              forma="logotipo"
              ancho={158}
              fondoCambiante
              className="hidden min-[24rem]:block"
            />
          </Link>

          {/* El selector de idioma se queda a la vista. Es el control más chico
              de los tres y el sitio vive de que un comprador de afuera lo
              encuentre sin buscar: esconderlo detrás del panel ahorraría poco
              peso y cobraría un clic en cada página. */}
          <div className="flex items-center gap-2 sm:gap-4">
            <SelectorIdioma />
            <MenuDeSecciones disparador="texto" altoDeCabecera={ALTO_DE_BARRA} />
          </div>
        </div>
      </Container>
    </HeaderElevado>
  );
}
