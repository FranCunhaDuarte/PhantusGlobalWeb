import type { ReactNode } from 'react';

type ExtremoDeAlcanceProps = {
  titulo: string;
  texto: string;
  detalle: string;
  /** Lo que cuelga del extremo cuando hay algo que enumerar: hoy, los mercados
   *  de destino. */
  children?: ReactNode;
};

/**
 * Las dos puntas de una operación se dibujan igual porque ahora las dos son
 * igual de concretas. Hasta la Fase 11 la regla del destino se desvanecía en
 * vez de cortar: no había mercados que nombrar y una línea cerrada prometía una
 * lista que el sitio no tenía. Con los cuatro mercados publicados, la línea
 * cierra.
 */
export default function ExtremoDeAlcance({
  titulo,
  texto,
  detalle,
  children
}: ExtremoDeAlcanceProps) {
  return (
    <div>
      <span aria-hidden className="block h-px bg-(--fondo-linea)" />
      <h3 className="mt-5 text-2xl">{titulo}</h3>
      <p className="mt-4 text-entrada">{texto}</p>
      <p className="mt-4">{detalle}</p>
      {children}
    </div>
  );
}
