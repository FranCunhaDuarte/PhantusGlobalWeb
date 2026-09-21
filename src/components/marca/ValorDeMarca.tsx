import type { ReactNode } from 'react';

type ValorDeMarcaProps = {
  nombre: ReactNode;
  descripcion: ReactNode;
};

/**
 * Un valor del manual con su bajada. Va dentro de un `<dl>`: el nombre no es un
 * titular, así que no abre un nivel más de jerarquía dentro de la sección.
 *
 * **Apila el nombre sobre la bajada, y antes iba al costado.** Mientras los tres
 * valores eran una lista a lo alto, el término cabía en una columna de 10rem a
 * la izquierda; desde que van en tres columnas, esa columna dejaba la bajada en
 * una tira de texto de cuatro palabras de ancho.
 *
 * La línea de arriba es lo que separa un valor del siguiente: en tres columnas
 * sin ella, los tres se leen como un solo párrafo cortado.
 */
export default function ValorDeMarca({
  nombre,
  descripcion
}: ValorDeMarcaProps) {
  return (
    <div className="flex flex-col gap-2 border-t borde-seccion pt-5">
      {/* El nombre va como rótulo y no como texto del mismo cuerpo: al lado de
          una bajada en cuerpo de entrada, un término del mismo tamaño se leía
          como el arranque de la frase. */}
      <dt className="text-eyebrow uppercase">{nombre}</dt>
      <dd>{descripcion}</dd>
    </div>
  );
}
