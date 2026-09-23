import { useTranslations } from 'next-intl';
import IconoDeWhatsApp from '@/components/contacto/IconoDeWhatsApp';
import { TELEFONO_MARCABLE, WHATSAPP } from '@/content/contacto-directo';
import { clases } from '@/lib/clases';

/** El mismo subrayado fino del pie: es el gesto que el sitio ya usa para un
 *  enlace que no es botón. */
const ENLACE =
  'w-fit break-all font-medium underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70';

/**
 * Teléfono y correo al lado del formulario. No compiten con él —el formulario
 * sigue siendo la conversión, y es el único camino que llega con el tipo de
 * consulta ya elegido—, pero hay quien no completa un formulario y llama, y
 * hasta acá no tenía a dónde.
 *
 * **Van como `tel:` y `mailto:` y no como texto suelto**: en un teléfono el
 * número se marca de un toque, que es donde más se usa. El precio es el mismo
 * que el sitio ya paga por el correo del pie desde la Fase 11 —queda expuesto a
 * los rastreadores— y la decisión de publicarlos es del cliente.
 *
 * El número que se marca no es el que se lee: ver `contacto-directo.ts`.
 */
export default function CanalesDeContacto({
  className
}: {
  className?: string;
}) {
  const t = useTranslations('home.contacto');
  const tWhatsapp = useTranslations('whatsapp');

  return (
    <ul className={clases('flex flex-col gap-2', className)}>
      <li>
        <a href={`tel:${TELEFONO_MARCABLE}`} className={ENLACE}>
          {t('telefono')}
        </a>
      </li>
      <li>
        <a href={`mailto:${t('correo')}`} className={ENLACE}>
          {t('correo')}
        </a>
      </li>
      {/* **Es el único de los tres que lleva glifo**, y no es un descuido: el
          teléfono y el correo se leen solos, y "WhatsApp" a secas no dice si es
          un número o un enlace que abre la conversación. El dibujo va en el
          color del texto y no en el verde de la marca: acá no hay fondo propio
          que lo sostenga, y el verde sobre el crema del panel queda a 1,69:1. */}
      <li>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          className={clases(ENLACE, 'inline-flex items-center gap-2 no-underline')}
        >
          <IconoDeWhatsApp className="size-4 flex-none" />
          <span className="underline decoration-1 underline-offset-4">
            {tWhatsapp('etiqueta')}
          </span>
        </a>
      </li>
    </ul>
  );
}
