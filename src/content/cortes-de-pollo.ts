/**
 * Los cortes del ave, en el orden en que los recorre quien mira el dibujo: de
 * la pechuga a la cola, y de adentro hacia afuera.
 *
 * Fueron nueve mientras el dibujo era la lámina de despiece del cliente. Hoy el
 * dibujo es **un ave entera vista desde arriba**, y esa vista no muestra cabeza,
 * cuello, espinazo ni pecho: el ave viene sin cabeza ni cuello, el espinazo
 * queda del otro lado y el pecho, debajo de la pechuga. Los cuatro se mudaron a
 * `OTROS_DE_POLLO` —se siguen comercializando, no son una parte de este
 * dibujo—, y sus nombres siguen en los dos catálogos.
 *
 * Acá viven los identificadores y nada más: el nombre visible sale de
 * `productos.pollo.cortes.<id>` y la geometría, de `ave.ts`.
 *
 * **El muslo se lleva la pata y la garra.** En la silueta no hay línea que las
 * separe, así que apuntarlo enciende la pata entera. Es el mismo caso que el
 * osobuco en la res.
 */
export const CORTES_DE_POLLO = [
  'pechuga',
  'ala',
  'contramuslo',
  'muslo',
  'rabadilla'
] as const;

export type CorteDePollo = (typeof CORTES_DE_POLLO)[number];

/**
 * Lo que se comercializa y **no es una parte del dibujo**, así que no puede ser
 * una región: las tres menudencias son vísceras, el filete sale de la pechuga y
 * los cuatro últimos no se ven en esta vista.
 *
 * Se listan al pie del diagrama en vez de inventarles un lugar sobre el ave.
 * Dibujar un corazón adentro del pecho sería marcar una zona del cuerpo que el
 * dibujo no divide, y el visitante leería que ahí hay un corte donde en realidad
 * hay otro.
 */
export const OTROS_DE_POLLO = [
  'corazon',
  'higado',
  'molleja',
  'filete',
  'cabeza',
  'cuello',
  'espinazo',
  'pecho'
] as const;

export type OtroDePollo = (typeof OTROS_DE_POLLO)[number];
