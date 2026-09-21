import type { ReactNode } from 'react';
import { ID_CONTENIDO } from '@/components/layout/SaltarAlContenido';

type MensajeNoEncontradoProps = {
  titulo: string;
  descripcion: string;
  /** El enlace de vuelta lo provee quien lo usa: dentro del árbol de
   *  `[locale]` es el `Link` tipado y fuera de él un ancla simple. */
  enlaceInicio: ReactNode;
};

export default function MensajeNoEncontrado({
  titulo,
  descripcion,
  enlaceInicio
}: MensajeNoEncontradoProps) {
  return (
    <main
      id={ID_CONTENIDO}
      className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center"
    >
      <h1 className="text-titulo">{titulo}</h1>
      <p className="max-w-md texto-suave">{descripcion}</p>
      <div className="mt-2">{enlaceInicio}</div>
    </main>
  );
}
