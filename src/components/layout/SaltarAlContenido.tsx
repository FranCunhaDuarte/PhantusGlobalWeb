import { useTranslations } from 'next-intl';
import { clasesDeBoton } from '@/components/ui/Button';

export const ID_CONTENIDO = 'contenido';

/**
 * Primer elemento enfocable del documento: se ve sólo cuando llega el foco. Se
 * esconde desplazándolo fuera de la pantalla y no con `sr-only`, cuyo reseteo
 * al recuperar el foco le borraría el padding al botón.
 */
export default function SaltarAlContenido() {
  const t = useTranslations('navegacion');

  return (
    <a
      href={`#${ID_CONTENIDO}`}
      className={clasesDeBoton({
        tamano: 'compacto',
        className:
          'fixed top-4 left-4 z-50 -translate-y-[200%] transition-transform focus:translate-y-0 motion-reduce:transition-none'
      })}
    >
      {t('saltarAlContenido')}
    </a>
  );
}
