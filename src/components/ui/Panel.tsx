import type { ReactNode } from 'react';
import { ProveedorDeFondo } from '@/components/ui/ContextoDeFondo';
import type { Fondo } from '@/components/ui/fondos';

type PanelProps = {
  children: ReactNode;
  fondo: Fondo;
  className?: string;
};

/**
 * Bloque que corta el fondo de la sección sin abrir otra ancla: declara su
 * propia paleta y la publica, igual que `Section`. Es lo que usa una tarjeta o
 * un recuadro destacado para que el texto, la línea, el botón y el logo que
 * caigan adentro se resuelvan contra el fondo correcto.
 */
export default function Panel({ children, fondo, className }: PanelProps) {
  return (
    <div data-fondo={fondo} className={className}>
      <ProveedorDeFondo fondo={fondo}>{children}</ProveedorDeFondo>
    </div>
  );
}
