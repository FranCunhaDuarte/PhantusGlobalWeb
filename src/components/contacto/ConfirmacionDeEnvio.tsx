import type { ReactNode, Ref } from 'react';
import Eyebrow from '@/components/ui/Eyebrow';

type ConfirmacionDeEnvioProps = {
  refDelTitulo: Ref<HTMLHeadingElement>;
  rotulo: string;
  titulo: string;
  /** Ya trae el correo del visitante adentro, resaltado. */
  texto: ReactNode;
};

/**
 * El visitante se queda donde está: no hay redirección ni recarga, el
 * formulario se reemplaza por esto y el ancla sigue siendo la misma. No tiene
 * botón de volver: el formulario se rearma solo al rato, y eso lo decide
 * `FormularioDeContacto`.
 *
 * El título recibe el foco al aparecer —el botón que se acaba de pulsar ya no
 * existe—, así que es también el que anuncia el resultado: por eso lleva
 *`tabIndex={-1}`.
 *
 * **Va centrada y con `my-auto`** porque reemplaza a un formulario mucho más
 * alto y el panel conserva el alto de la fila: arriba a la izquierda dejaba
 * medio panel vacío abajo. El texto repite el correo que dejó el visitante,
 * que es lo que más tranquiliza: dice a dónde va a llegar la respuesta y deja
 * ver un error de tipeo antes de esperar dos días.
 */
export default function ConfirmacionDeEnvio({
  refDelTitulo,
  rotulo,
  titulo,
  texto
}: ConfirmacionDeEnvioProps) {
  return (
    <div className="my-auto flex flex-col items-center gap-5 py-4 text-center sm:py-6">
      {/* Tres tiempos: el dibujo entra creciendo, el círculo se traza y
          después el tilde. Los trazos usan `pathLength` para que el largo sea
          el mismo número que el desplazamiento de arranque, sin medir nada.
          Con quietud pedida aparece entero y quieto. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 48 48"
        className="size-18 text-deep animate-aparecer motion-reduce:animate-none"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle
          cx="24"
          cy="24"
          r="22"
          strokeWidth="2"
          pathLength={100}
          transform="rotate(-90 24 24)"
          className="[stroke-dasharray:100] [stroke-dashoffset:100] animate-trazo motion-reduce:animate-none motion-reduce:[stroke-dashoffset:0]"
        />
        <path
          d="M15 24.5l6.5 6.5L33.5 18"
          strokeWidth="3"
          pathLength={100}
          className="[stroke-dasharray:100] [stroke-dashoffset:100] animate-trazo-tilde motion-reduce:animate-none motion-reduce:[stroke-dashoffset:0]"
        />
      </svg>

      <div className="flex flex-col items-center gap-3">
        <Eyebrow>{rotulo}</Eyebrow>
        <h3
          ref={refDelTitulo}
          tabIndex={-1}
          className="text-titulo text-balance"
        >
          {titulo}
        </h3>
      </div>

      <p className="max-w-md text-entrada [overflow-wrap:anywhere]">{texto}</p>
    </div>
  );
}
