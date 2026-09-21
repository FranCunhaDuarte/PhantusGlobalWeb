import type { Ref } from 'react';
import MensajeDeError from '@/components/contacto/MensajeDeError';

/**
 * Lo que no es culpa de ningún campo: el cupo de envíos o un correo que no
 * salió. Recibe el foco al aparecer, porque si no quien navega con teclado se
 * queda en el botón sin enterarse de que pasó algo.
 */
export default function AvisoDeRechazo({
  ref,
  children
}: {
  ref: Ref<HTMLDivElement>;
  children: string;
}) {
  return (
    <div
      ref={ref}
      tabIndex={-1}
      className="border border-(--fondo-error) px-4 py-3"
    >
      <MensajeDeError id="envio-rechazado">{children}</MensajeDeError>
    </div>
  );
}
