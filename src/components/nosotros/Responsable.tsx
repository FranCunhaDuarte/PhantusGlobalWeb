import { useTranslations } from 'next-intl';
import { LINKEDIN_DEL_RESPONSABLE } from '@/content/redes';
import { clases } from '@/lib/clases';

/**
 * Quién responde por la operación, con nombre, cargo y perfil.
 *
 * **Va después de los cuatro datos duros y no entre ellos.** La banda de
 * credenciales dice de dónde sale la mercadería, a dónde llega, con quién se
 * trabaja y en cuánto se contesta: cuatro rótulos con su valor, que se leen de
 * un vistazo. Una persona no se lee así —"Responsable: Leandro Fenoy" al lado de
 * "Origen: Mar del Plata" los iguala, y no son la misma clase de dato—, así que
 * es bloque propio.
 *
 * **Y va antes de la ciudad**, no al final: el sitio venía diciendo desde el
 * principio que cada operación tiene un responsable directo, y hasta acá no
 * decía quién. Puesto justo después de los datos, la página pasa de los hechos
 * a la persona que responde por ellos.
 *
 * **El enlace no lleva glifo de LinkedIn**, y no por olvido: Simple Icons lo
 * retiró a pedido de LinkedIn, que reclamó por marca registrada. Va como enlace
 * de texto con el subrayado fino del sitio, que es el gesto que ya usan el pie y
 * los canales de contacto.
 *
 * **Abre en pestaña nueva** porque saca del sitio, igual que el flotante de
 * WhatsApp.
 */
export default function Responsable({ className }: { className?: string }) {
  const t = useTranslations('nosotros.responsable');

  return (
    <div className={clases('flex flex-col gap-3', className)}>
      <p className="text-eyebrow uppercase texto-suave">{t('rotulo')}</p>
      <div className="flex flex-col gap-1">
        <p className="text-titulo">{t('nombre')}</p>
        <p className="texto-suave">{t('cargo')}</p>
      </div>
      <a
        href={LINKEDIN_DEL_RESPONSABLE}
        target="_blank"
        rel="noreferrer"
        className="w-fit font-medium underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
      >
        {t('enlace')}
      </a>
    </div>
  );
}
