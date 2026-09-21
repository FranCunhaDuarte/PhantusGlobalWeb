import type { Regimen } from '@/content/especies';
import { clases } from '@/lib/clases';

type EtiquetaDeTemporadaProps = {
  regimen: Regimen;
  etiqueta: string;
  className?: string;
};

/**
 * Bajo qué régimen se administra la pesquería. Hoy la ficha sólo la monta para
 * la zafra —la de cuota no marcaba nada que la línea de disponibilidad no
 * dijera—, pero el mapa se queda completo: el realce es por régimen y no por
 * "la que se muestra", así que si mañana vuelve la de cuota entra en el color
 * del texto y la de zafra sigue destacándose.
 */
const REALCE: Record<Regimen, string> = {
  cuota: '',
  zafra: 'texto-realce'
};

export default function EtiquetaDeTemporada({
  regimen,
  etiqueta,
  className
}: EtiquetaDeTemporadaProps) {
  return (
    <p
      className={clases(
        // Mismo piso que el botón de borde: es el único límite visible de la píldora.
        'inline-flex border border-current/55 px-3 py-1 text-eyebrow uppercase',
        REALCE[regimen],
        className
      )}
    >
      {etiqueta}
    </p>
  );
}
