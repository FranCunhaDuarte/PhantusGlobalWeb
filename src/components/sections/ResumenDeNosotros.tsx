import { useTranslations } from 'next-intl';
import BotonSaberMas from '@/components/layout/BotonSaberMas';
import Section from '@/components/ui/Section';
import SectionHeading, { Destacado } from '@/components/ui/SectionHeading';

// Crema base: arriba queda `productos`, que es crema elevado, y abajo vuelve el
// crema elevado de `como-trabajamos`. Los dos tonos se alternan para que el
// límite entre secciones se vea.
const FONDO = 'crema';

/**
 * Escaparate: una frase y la puerta a `/nosotros`, donde viven el manifiesto,
 * el relato del elefante, los valores y el alcance.
 *
 * Sin rótulo y con el titular al cuerpo del `h1`: es el único bloque de la home
 * que se sostiene en una sola línea, así que el peso se lo tiene que dar el
 * titular. Es además lo que lo distingue del resto, que arranca con rótulo.
 */
export default function ResumenDeNosotros() {
  const t = useTranslations('home.nosotros');

  return (
    <Section id="nosotros" fondo={FONDO}>
      <div className="flex max-w-3xl flex-col gap-6">
        <SectionHeading seccion="nosotros" escala="titulo-mayor">
          {t.rich('titulo', {
            destacado: (texto) => <Destacado>{texto}</Destacado>
          })}
        </SectionHeading>
        <p className="max-w-2xl text-entrada">{t('texto')}</p>
        <BotonSaberMas seccion="nosotros" className="mt-2">
          {t('cta')}
        </BotonSaberMas>
      </div>
    </Section>
  );
}
