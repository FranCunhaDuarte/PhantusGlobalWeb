/**
 * Las dos unidades de negocio, en el orden en que las lista el índice de
 * productos. Pescados y mariscos es el foco y va primero; carnes es la
 * secundaria y no tiene catálogo, por decisión y no por omisión.
 *
 * El nivel intermedio existió hasta la Fase 11, se colapsó cuando carnes salió
 * del menú —un índice de una sola tarjeta no es un índice— y volvió en la 12
 * cuando carnes volvió a ser unidad. Las etiquetas visibles salen de
 * `productos.unidades.<id>`.
 */
export const UNIDADES = ['pescados', 'carnes'] as const;

export type Unidad = (typeof UNIDADES)[number];

/**
 * **Una unidad ya no es una ruta: es un ancla dentro de `/productos`.** Tuvo
 * hoja propia —`/productos/pescados` y `/productos/carnes`, cuatro URLs— hasta
 * que las dos se plegaron adentro del índice: ahí quedaron el catálogo de
 * especies y el diagrama de cortes, uno debajo del otro, y las tarjetas del
 * índice pasaron de navegar a saltar.
 *
 * Por eso el valor es el id pelado y no `#pescados`: quien salta dentro de la
 * página le pone el `#` adelante, y quien llega desde la home lo pasa como
 * `hash` al `Link` tipado, que no lo quiere con el numeral.
 */
export const ANCLA_DE_UNIDAD = {
  pescados: 'pescados',
  carnes: 'carnes'
} as const satisfies Record<Unidad, string>;
