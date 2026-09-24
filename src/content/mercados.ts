/**
 * Los mercados de destino donde Phantus opera hoy, en el orden en que los
 * nombra el cliente. Es dato real y acotado: son estos cuatro y no una lista
 * abierta, así que la página los enumera en vez de argumentar por
 * qué no puede. Los nombres salen de `mercados.mercados.<id>`.
 *
 * **Dos de los cuatro no son países**: `europa` y `asia` son regiones, y los
 * otros dos se nombran distinto en cada idioma. Por eso esto no se resuelve con
 * `Intl.DisplayNames` como los países del formulario: van cuatro claves por
 * catálogo.
 *
 * **`asia` fue `china`.** El mercado concreto es China, pero el sitio lo nombra
 * por la región: es la misma decisión que ya estaba tomada para Europa, donde
 * tampoco se nombra el país. Si alguna vez hay que volver al país, lo que cambia
 * es el id acá y su clave en los dos catálogos.
 *
 * **De cumplimiento hay dato de uno solo**, Estados Unidos, y esa asimetría no
 * se modela acá: la nota que lo dice va debajo de la grilla de destinos y
 * arranca nombrando el mercado, así que no hace falta una lista de cuáles lo
 * tienen. Meterlo en su celda deja tres celdas visiblemente incompletas y
 * sugiere que a los otros tres les falta el dato; abajo, la asimetría se lee
 * como lo que es.
 *
 * **`origenDeLasRutas` quedó sin consumidor y no se borró.** Era el nodo "Mar
 * del Plata" del que colgaban las cuatro ramas del dibujo anterior; hoy el
 * origen lo dice el titular de la página, dos bloques más arriba.
 */
export const MERCADOS = ['estados-unidos', 'mexico', 'europa', 'asia'] as const;

export type Mercado = (typeof MERCADOS)[number];
