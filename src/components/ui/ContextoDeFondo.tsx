'use client';

import { createContext, use, type ReactNode } from 'react';
import type { Fondo } from '@/components/ui/fondos';

const ContextoDeFondo = createContext<Fondo | null>(null);

/**
 * Publica el fondo vigente para lo que cuelgue adentro. Lo montan `Section` y
 * `Panel`, que son los dos lugares donde se declara `data-fondo`: así el dato
 * viaja por el árbol igual que los colores viajan por CSS, y nadie tiene que
 * repetir a mano sobre qué está parado.
 */
export function ProveedorDeFondo({
  fondo,
  children
}: {
  fondo: Fondo;
  children: ReactNode;
}) {
  return <ContextoDeFondo value={fondo}>{children}</ContextoDeFondo>;
}

/** `null` fuera de toda sección; quien lo consuma decide qué hacer con eso. */
export function useFondo() {
  return use(ContextoDeFondo);
}
