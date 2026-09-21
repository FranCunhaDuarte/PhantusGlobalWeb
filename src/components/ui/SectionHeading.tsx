import type { ReactNode } from 'react';
import { idDeTitulo, type IdSeccion } from '@/content/secciones';
import { clases } from '@/lib/clases';

type SectionHeadingProps = {
  children: ReactNode;
  /** Si se indica, el titular toma el id que `Section` referencia. */
  seccion?: IdSeccion;
  nivel?: 1 | 2 | 3;
  escala?: 'titulo' | 'titulo-mayor';
  className?: string;
};

const ESCALAS = {
  titulo: 'text-titulo',
  'titulo-mayor': 'text-titulo-mayor'
} as const;

export default function SectionHeading({
  children,
  seccion,
  nivel = 2,
  escala = 'titulo',
  className
}: SectionHeadingProps) {
  const Titulo = `h${nivel}` as const;

  return (
    <Titulo
      id={seccion && idDeTitulo(seccion)}
      className={clases(ESCALAS[escala], className)}
    >
      {children}
    </Titulo>
  );
}

/**
 * Una o dos palabras destacadas dentro de un titular. Se usa de a poco y por
 * contraste, nunca para el titular entero ni para texto corrido.
 *
 * **Fue Fraunces Bold y ya no**: la familia secundaria salió del sitio, así que
 * el contraste que antes lo daba el cambio de tipografía ahora lo dan el peso y
 * el color, dentro de Montserrat.
 *
 * **Va en 800 y no en 700, y eso lo decide el peor caso.** El titular que lo
 * contiene va en los 600 de SemiBold —lo pone la regla de `h1`–`h6` en
 * `globals.css`—, así que sobre crema alcanzaría con 700: ahí `texto-realce` es
 * el bordó y el color ya hace la mitad del trabajo. **Sobre los tres fondos
 * oscuros no hay color que valga**: `--fondo-realce` resuelve a `ink-inverse`,
 * que es exactamente el mismo crema del texto que lo rodea, así que el peso es
 * lo único que distingue la palabra. A 700 esa diferencia casi no se ve; a 800
 * sí. Mientras Fraunces existió el asunto no aparecía, porque el contraste lo
 * daba el cambio de tipografía.
 *
 * **No cuesta bytes**: Montserrat entra como fuente variable y los dos cortes ya
 * están en el archivo. Es el mismo 800 del titular del hero, que sigue siendo el
 * único del sitio que lo lleva entero.
 */
export function Destacado({ children }: { children: ReactNode }) {
  return <span className="font-extrabold texto-realce">{children}</span>;
}
