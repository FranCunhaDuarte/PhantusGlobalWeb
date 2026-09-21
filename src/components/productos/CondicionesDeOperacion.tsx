import { useTranslations } from 'next-intl';
import { enlaceDeConsulta } from '@/content/consulta';
import { Link } from '@/i18n/navigation';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';

const FONDO = 'crema-elevado';

/**
 * En qué se traduce una operación más allá de la especie: formato, condición
 * comercial y cumplimiento. Es el dato técnico que el sitio no tenía hasta la
 * Fase 11 y que decide una compra, pero **no baja a la ficha de cada especie**:
 * el cliente dio el menú de formatos como menú general, no especie por especie,
 * y repartirlo por especie sería inventar qué corresponde a cuál.
 */
const CONDICIONES = ['formatos', 'comerciales', 'cumplimiento'] as const;

export default function CondicionesDeOperacion() {
  const t = useTranslations('productos.pescados.condiciones');

  return (
    <Section fondo={FONDO}>
      <SectionHeading className="max-w-3xl">{t('titulo')}</SectionHeading>

      <dl className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
        {CONDICIONES.map((condicion) => (
          <div key={condicion} className="border-t borde-seccion pt-5">
            <dt className="text-lg font-semibold">
              {t(`${condicion}.titulo`)}
            </dt>
            <dd className="mt-3">{t(`${condicion}.texto`)}</dd>
          </div>
        ))}
      </dl>

      {/* Desde la Fase 12 carnes tiene página propia, así que acá quedan las
          categorías que no son ninguna de las dos unidades. Enlace y no párrafo,
          porque quien busca otra mercadería necesita a dónde ir y no que se lo
          expliquen; llega al formulario con "Otra consulta" elegida. */}
      <p className="mt-10 max-w-3xl">{t('otras.texto')}</p>
      <p className="mt-4">
        <Link
          href={enlaceDeConsulta('otro')}
          className="inline-flex items-center gap-2 text-entrada underline decoration-1 underline-offset-4 transition-colors hover:texto-realce motion-reduce:transition-none"
        >
          {t('otras.enlace')}
          <Flecha />
        </Link>
      </p>
    </Section>
  );
}

function Flecha() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4 flex-none"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}
