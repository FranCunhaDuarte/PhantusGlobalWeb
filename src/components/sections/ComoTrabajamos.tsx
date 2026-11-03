import { useTranslations } from 'next-intl';
import PasoDelProceso from '@/components/proceso/PasoDelProceso';
import Eyebrow from '@/components/ui/Eyebrow';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import { PASOS } from '@/content/proceso';

// Cómo opera Phantus —compra y revende, una sola contraparte— no va en letra
// chica: es una sección propia, sobre azul y a media medida, con el rótulo
// arriba y una sola frase abajo. Fue "Cómo ganamos" mientras la empresa era
// bróker y cobraba comisión; como trader, cómo gana no se publica.
const FONDO_DEL_MODELO = 'azul';

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

      <Section fondo={FONDO_DEL_MODELO} medida="angosta">
        <Eyebrow>{t('modeloEyebrow')}</Eyebrow>
        <p className="mt-6 text-2xl sm:text-3xl">{t('modelo')}</p>
      </Section>
    </>
  );
}
