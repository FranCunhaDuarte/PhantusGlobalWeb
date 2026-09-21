/**
 * Los cortes del ave, en el orden en que los recorre quien mira el dibujo: por
 * arriba de la cabeza a la cola, por abajo del pecho al muslo.
 *
 * Son los nueve que trae la lámina de despiece que aportó el cliente. Acá viven
 * los identificadores y nada más: el nombre visible sale de
 * `productos.pollo.cortes.<id>` y la geometría, de `ave.ts`.
 *
 * **El muslo se lleva las patas y las garras.** En la lámina no hay línea que
 * las separe, así que apuntarlo enciende la pata entera. Es el mismo caso que el
 * osobuco en la res.
 */
export const CORTES_DE_POLLO = [
  'cabeza',
  'cuello',
  'espinazo',
  'rabadilla',
  'pechuga',
  'pecho',
  'ala',
  'contramuslo',
  'muslo'
] as const;

export type CorteDePollo = (typeof CORTES_DE_POLLO)[number];

/**
 * Lo que se comercializa y **no es una parte del dibujo**, así que no puede ser
 * una región: las tres menudencias son vísceras y el filete sale de la pechuga.
 *
 * Se listan al pie del diagrama en vez de inventarles un lugar sobre el ave.
 * Dibujar un corazón adentro del pecho sería marcar una zona del cuerpo que la
 * lámina no divide, y el visitante leería que ahí hay un corte donde en realidad
 * hay otro.
 */
export const OTROS_DE_POLLO = [
  'corazon',
  'higado',
  'molleja',
  'filete'
] as const;

export type OtroDePollo = (typeof OTROS_DE_POLLO)[number];
