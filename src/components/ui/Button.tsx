import type {
  ComponentProps,
  ComponentPropsWithoutRef,
  ReactNode
} from 'react';
import { Link } from '@/i18n/navigation';
import { clases } from '@/lib/clases';

type Apariencia = {
  variante?: 'solido' | 'borde' | 'azul';
  tamano?: 'normal' | 'compacto' | 'grande';
  className?: string;
};

const BASE =
  'inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap transition-colors';

// `grande` es para el envío del formulario: es la única acción real del sitio
// y con el tamaño normal quedaba flojo abajo de un panel ancho.
const TAMANOS = {
  normal: 'px-6 py-3 text-sm',
  compacto: 'px-4 py-2 text-sm',
  grande: 'px-8 py-4 text-base'
} as const;

// Los colores no se nombran acá: los declara el fondo vigente (`[data-fondo]`
// en globals.css), así el mismo botón queda legible sobre crema y sobre los
// tres oscuros sin que nadie invierta nada. El foco lo pinta`:focus-visible`.
const VARIANTES = {
  solido: 'boton-realce bg-(--boton-fondo) text-(--boton-texto)',
  // El borde es el único límite visible del botón secundario, así que tiene que
  // llegar a 3:1 contra el fondo: al 40 % se quedaba en 2,5:1 sobre crema.
  borde:
    'border border-current/55 hover:border-transparent hover:bg-(--boton-fondo) hover:text-(--boton-texto)',
  // El azul de la paleta clavado, sin pasar por el fondo vigente: es el CTA del
  // hero, que se apoya sobre el video. Sin borde por decisión de diseño: contra
  // el peor cuadro posible del velo el relleno da 2,66:1, por debajo de los 3:1
  // que pide el límite visible de un control, así que el contorno queda a cargo
  // de que el video sea oscuro. El texto adentro no depende de eso: 12,04:1.
  azul: 'boton-realce bg-deep text-ink-inverse [--boton-fondo-activo:var(--color-deep-hover)]'
} as const;

export function clasesDeBoton({
  variante = 'solido',
  tamano = 'normal',
  className
}: Apariencia = {}) {
  return clases(
    BASE,
    TAMANOS[tamano],
    VARIANTES[variante],
    'disabled:pointer-events-none disabled:opacity-50',
    className
  );
}

type ButtonProps = Apariencia & ComponentPropsWithoutRef<'button'>;

export default function Button({
  variante,
  tamano,
  className,
  type = 'button',
  ...resto
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clasesDeBoton({ variante, tamano, className })}
      {...resto}
    />
  );
}

type ButtonLinkProps = Apariencia & {
  href: ComponentProps<typeof Link>['href'];
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, 'href' | 'className' | 'children'>;

/** Mismo botón, pero navegando: usa el`Link`tipado con prefijo de idioma. */
export function ButtonLink({
  variante,
  tamano,
  className,
  ...resto
}: ButtonLinkProps) {
  return (
    <Link
      className={clasesDeBoton({ variante, tamano, className })}
      {...resto}
    />
  );
}
