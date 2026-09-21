import type { ReactNode } from 'react';
import Container from '@/components/ui/Container';
import { ProveedorDeFondo } from '@/components/ui/ContextoDeFondo';
import type { Fondo } from '@/components/ui/fondos';
import { idDeTitulo, type IdSeccion } from '@/content/secciones';
import { clases } from '@/lib/clases';

/**
 * El aire vertical de la sección.
 *
 * `sin` existe para el caso de una sección cuyo contenido es **una sola pieza
 * que tiene que llegar a los dos bordes**: hoy, la tarjeta de Mar del Plata en
 * `/nosotros`, que ocupa el alto entero de su sección. Con el relleno puesto,
 * esa tarjeta flotaba en una franja de crema elevado y el bloque medía el alto
 * de la tarjeta más dos veces el aire.
 *
 * `chico` es para un bloque que ya se destaca por otra cosa y no necesita que el
 * aire lo aísle: hoy, el del elefante, que es el único del sitio sobre tinta y
 * está centrado con el isotipo encima. Con el aire de sección, esa franja oscura
 * medía más de lo que ocupa lo que tiene adentro.
 *
 * **Va como prop y no como clase en `className`** porque `clases()` es un join y
 * no un merge: un `py-0` agregado desde afuera pelearía con `py-seccion` por
 * orden en la hoja, que es justo el conflicto que el proyecto evita.
 */
const RELLENOS = {
  normal: 'py-seccion',
  chico: 'py-12 sm:py-16',
  sin: ''
} as const;

type SectionProps = {
  children: ReactNode;
  /** Ancla de navegación. Viene de `src/content/secciones.ts`, no suelto. */
  id?: IdSeccion;
  /**
   * Ancla de un bloque que **no** es una sección del sitio: no está en
   * `SECCIONES`, no la lista el header y no la resuelve `EnlaceDeSeccion`.
   * Existe para saltar dentro de una misma página —hoy, las dos unidades dentro
   * de `/productos`, a las que apuntan las tarjetas del índice—.
   *
   * A diferencia de `id`, no publica `aria-labelledby`: no hay un titular con
   * el id que `idDeTitulo` esperaría, porque estos bloques van sin título a la
   * vista. El `<section>` queda sin nombre accesible, o sea sin landmark, y la
   * estructura la da el encabezado `sr-only` que el bloque trae adentro.
   */
  ancla?: string;
  fondo?: Fondo;
  medida?: 'plena' | 'angosta';
  relleno?: keyof typeof RELLENOS;
  /**
   * En `false` la sección no envuelve en `Container`: el contenido queda a
   * ancho de pantalla y **quien lo monta se hace cargo de alinearlo**.
   *
   * Existe para el caso de una sección donde una imagen tiene que llegar al
   * borde: hoy, la tarjeta de Mar del Plata en `/nosotros`. Meterla en el
   * contenedor y sacarla después con un margen negativo se probó y es peor —el
   * porcentaje de un margen en una celda de grilla se mide contra la celda y no
   * contra el contenedor, así que la cuenta no cierra—.
   */
  contenedor?: boolean;
  className?: string;
};

export default function Section({
  children,
  id,
  ancla,
  fondo = 'crema',
  medida = 'plena',
  relleno = 'normal',
  contenedor = true,
  className
}: SectionProps) {
  return (
    <section
      id={id ?? ancla}
      data-fondo={fondo}
      // El header sticky mide `--spacing-header`; sin este margen de scroll el
      // salto por ancla deja el titular debajo de la barra.
      className={clases(
        RELLENOS[relleno],
        (id || ancla) && 'scroll-mt-ancla',
        className
      )}
      aria-labelledby={id && idDeTitulo(id)}
    >
      <ProveedorDeFondo fondo={fondo}>
        {contenedor ? <Container medida={medida}>{children}</Container> : children}
      </ProveedorDeFondo>
    </section>
  );
}
