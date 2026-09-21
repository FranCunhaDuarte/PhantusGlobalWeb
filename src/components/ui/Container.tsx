import type { ReactNode } from 'react';
import { clases } from '@/lib/clases';

type ContainerProps = {
  children: ReactNode;
  /** `angosto` es para bloques de lectura seguida; el resto usa el ancho pleno. */
  medida?: 'plena' | 'angosta';
  className?: string;
};

const MEDIDAS = {
  plena: 'max-w-sitio',
  angosta: 'max-w-3xl'
} as const;

export default function Container({
  children,
  medida = 'plena',
  className
}: ContainerProps) {
  return (
    <div
      className={clases('mx-auto w-full px-5 sm:px-8', MEDIDAS[medida], className)}
    >
      {children}
    </div>
  );
}
