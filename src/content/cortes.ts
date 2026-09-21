/**
 * Los cortes de la media res de la página de carnes, en el orden en que los
 * recorre quien mira el dibujo: del cuarto delantero al trasero, de arriba
 * hacia abajo. El osobuco es uno solo con dos regiones, una por cuarto.
 *
 * Son los cortes que trae la lámina que aportó el cliente. Acá viven los
 * identificadores y nada más: el nombre visible sale de
 * `productos.carnes.cortes.<id>` y la geometría, de `res-vacuna.ts`.
 */
export const CORTES = [
  'azotillo',
  'palomita',
  'roastBeef',
  'bifeAncho',
  'bifeDeCostilla',
  'lomo',
  'cuadril',
  'peceto',
  'colitaDeCuadril',
  'paleta',
  'asado',
  'entrana',
  'vacio',
  'tapaDeNalga',
  'bolaDeLomo',
  'matambre',
  'tapaDeAsado',
  'osobuco'
] as const;

export type Corte = (typeof CORTES)[number];
