import { useTranslations } from 'next-intl';
import PasoDelProceso from '@/components/proceso/PasoDelProceso';
import Eyebrow from '@/components/ui/Eyebrow';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import { PASOS } from '@/content/proceso';

// Cómo se gana la plata no va en letra chica ni al pie de la página anterior:
// es una sección propia, sobre azul y a media medida, con el rótulo arriba y
// una sola frase abajo.
const FONDO_COMISION = 'azul';

export default function ComoTrabajamos() {
  const t = useTranslations('comoTrabajamos');

  return (
    <>
      <Section fondo="crema">
        <div className="flex max-w-3xl flex-col gap-4">
          <SectionHeading nivel={1} escala="titulo-mayor">
            {t('titulo')}
          </SectionHeading>
          <p className="text-entrada">{t('entrada')}</p>
        </div>

        {/* Los pasos van uno debajo del otro y no en cuatro columnas: en
            columnas el texto de cada paso queda en una medida angosta y en
            cuerpo chico, que es exactamente lo que la home dejó de hacer. Acá
            cada paso tiene el renglón completo y el número al costado. */}
        <ol className="mt-12 max-w-5xl border-b borde-seccion">
          {PASOS.map((paso, indice) => (
            <PasoDelProceso
              key={paso}
              orden={indice + 1}
              titulo={t(`pasos.${paso}.titulo`)}
              texto={t(`pasos.${paso}.texto`)}
            />
          ))}
        </ol>
      </Section>

      <Section fondo={FONDO_COMISION} medida="angosta">
        <Eyebrow>{t('comisionEyebrow')}</Eyebrow>
        <p className="mt-6 text-2xl sm:text-3xl">{t('comision')}</p>
      </Section>
    </>
  );
}
