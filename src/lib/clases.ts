type Clase = string | false | null | undefined;

/** Une clases descartando lo vacío. Lo último gana, así que un `className` que
 *  llega por props se pasa al final para poder pisar el valor por defecto. */
export function clases(...partes: Clase[]) {
  return partes.filter(Boolean).join(' ');
}
