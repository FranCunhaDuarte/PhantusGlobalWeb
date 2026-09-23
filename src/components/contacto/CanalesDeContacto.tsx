import { useTranslations } from 'next-intl';
import IconoDeWhatsApp from '@/components/contacto/IconoDeWhatsApp';
import { clasesDeBoton } from '@/components/ui/Button';
import { TELEFONO_MARCABLE, WHATSAPP } from '@/content/contacto-directo';
import { LINKEDIN_DEL_RESPONSABLE } from '@/content/redes';
import { clases } from '@/lib/clases';

/** El mismo subrayado fino del pie: es el gesto que el sitio ya usa para un
 *  enlace que no es botón. */
const ENLACE =
  'w-fit break-all font-medium underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70';

/**
 * Teléfono, correo y WhatsApp al lado del formulario. No compiten con él —el
 * formulario sigue siendo la conversión, y es el único camino que llega con el
 * tipo de consulta ya elegido—, pero hay quien no completa un formulario y
 * llama, y hasta la Fase 11 no tenía a dónde.
 *
 * ## Los dos datos van con rótulo, y el tercero es un botón
 *
 * **Fue una lista de tres enlaces subrayados y se leía como un pie de página.**
 * Tres renglones chicos, sin rótulo, sobre el bordó y al lado de un panel crema
 * de 700 px de alto: la columna no sostenía su mitad. Ahora el teléfono y el
 * correo van como **término y definición** —`<dl>`, versalita gris arriba y el
 * dato en el color del texto—, que es exactamente el mismo gesto que los cuatro
 * datos duros de `/nosotros`, incluida la hairline propia de cada uno. Un dato
 * con su rótulo se lee de un vistazo, y de paso el bloque gana el alto que le
 * faltaba.
 *
 * **WhatsApp sale de la lista y pasa a botón de borde**, y no es decoración: de
 * los tres es el único que no es un dato sino una acción —abre una conversación,
 * no muestra un número—, y como enlace suelto tenía que explicarse con un glifo
 * al lado para que se entendiera qué hacía. De botón se entiende solo. Va de
 * borde y no sólido porque el sólido es del envío del formulario, que está a la
 * derecha y es la conversión de la página.
 *
 * El glifo se queda igual: es lo que hace reconocible la marca de un vistazo.
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
  const tResponsable = useTranslations('nosotros.responsable');

  return (
    <div className={clases('flex flex-col gap-6', className)}>
      <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
        <div className="flex flex-col gap-1 border-t border-(--fondo-linea) pt-3">
          <dt className="text-eyebrow uppercase texto-suave">
            {t('canales.telefono')}
          </dt>
          <dd>
            <a href={`tel:${TELEFONO_MARCABLE}`} className={ENLACE}>
              {t('telefono')}
            </a>
          </dd>
        </div>

        <div className="flex flex-col gap-1 border-t border-(--fondo-linea) pt-3">
          <dt className="text-eyebrow uppercase texto-suave">
            {t('canales.correo')}
          </dt>
          <dd>
            <a href={`mailto:${t('correo')}`} className={ENLACE}>
              {t('correo')}
            </a>
          </dd>
        </div>
      </dl>

      {/* El glifo va en el color del texto y no en el verde de la marca: acá no
          hay fondo propio que lo sostenga, y el verde sobre el bordó de la
          sección no llega a contraste. El verde sólo vive en el botón flotante,
          que sí se trae el suyo. */}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        className={clasesDeBoton({ variante: 'borde', className: 'w-fit' })}
      >
        <IconoDeWhatsApp className="size-4 flex-none" />
        {tWhatsapp('etiqueta')}
      </a>

      {/* **Quién contesta, al pie de los canales.** No es un cuarto canal —no se
          le escribe por LinkedIn— así que va separado por su propia línea y con
          el nombre en el color del texto contra el cargo en gris. Es el mismo
          dato que abre `/nosotros`, y acá está porque el que va a escribir
          quiere saber a quién le escribe. */}
      <div className="flex flex-col gap-1 border-t border-(--fondo-linea) pt-4">
        <p className="font-medium">{tResponsable('nombre')}</p>
        <a
          href={LINKEDIN_DEL_RESPONSABLE}
          target="_blank"
          rel="noreferrer"
          className={clases(ENLACE, 'texto-suave')}
        >
          {tResponsable('cargo')} · {tResponsable('enlace')}
        </a>
      </div>
    </div>
  );
}
