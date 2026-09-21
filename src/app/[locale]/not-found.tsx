import { useTranslations } from 'next-intl';
import MensajeNoEncontrado from '@/components/ui/MensajeNoEncontrado';
import { clasesDeBoton } from '@/components/ui/Button';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <MensajeNoEncontrado
      titulo={t('title')}
      descripcion={t('description')}
      enlaceInicio={
        <Link href="/" className={clasesDeBoton()}>
          {t('backHome')}
        </Link>
      }
    />
  );
}
