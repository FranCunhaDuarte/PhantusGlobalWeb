'use client';

import type { ReactNode } from 'react';
import { ancla, paginaDeSeccion, type IdSeccion } from '@/content/secciones';
import { Link, usePathname } from '@/i18n/navigation';

type EnlaceDeSeccionProps = {
  seccion: IdSeccion;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

/**
 * El único lugar donde se decide a dónde apunta el nombre de una sección. Hay
 * tres casos y ninguno se puede resolver escribiendo la URL a mano:
 *
 * - la sección tiene página propia: se navega a la ruta, que el `Link` tipado
 *   traduce al idioma vigente;
 * - es un ancla y estamos en la home: va como `<a href="#...">`, que es lo que
 *   el navegador sabe hacer respetando `scroll-margin-top` y
 *   `prefers-reduced-motion`;
 * - es un ancla y estamos en una subpágina: ahí `#contacto` no existe, así que
 *   primero hay que volver a la home del idioma correcto.
 */
export default function EnlaceDeSeccion({
  seccion,
  children,
  className,
  onClick
}: EnlaceDeSeccionProps) {
  const ruta = usePathname();
  const pagina = paginaDeSeccion(seccion);

  if (pagina) {
    return (
      <Link
        href={pagina}
        onClick={onClick}
        aria-current={ruta.startsWith(pagina) ? 'page' : undefined}
        className={className}
      >
        {children}
      </Link>
    );
  }

  if (ruta === '/') {
    return (
      <a href={ancla(seccion)} onClick={onClick} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link
      href={{ pathname: '/', hash: seccion }}
      onClick={onClick}
      className={className}
    >
      {children}
    </Link>
  );
}
