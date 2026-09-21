import type { ReactNode } from 'react';
import { clases } from '@/lib/clases';

type EyebrowProps = {
  children: ReactNode;
  /**
   * `pleno` es para los rótulos que se apoyan sobre una foto: ahí el gris no
   * llega a contraste y no hay lavado razonable que lo salve. Va como prop y no
   * como clase porque `clases()` es un join: dos utilidades que pisan el color
   * se resolverían por orden en la hoja, no por orden en el atributo.
   */
  tono?: 'suave' | 'pleno';
  className?: string;
};

const TONOS = {
  suave: 'texto-suave',
  pleno: ''
} as const;

/** Rótulo breve encima de un titular. La escala y el tracking salen del tema. */
export default function Eyebrow({
  children,
  tono = 'suave',
  className
}: EyebrowProps) {
  return (
    <p className={clases('text-eyebrow uppercase', TONOS[tono], className)}>
      {children}
    </p>
  );
}
