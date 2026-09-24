/**
 * Los cinco pasos de una operación, en orden. Los textos salen de
 * `comoTrabajamos.pasos.<id>`.
 */
export const PASOS = [
  'sourcing',
  'especificacion',
  'negociacion',
  'logistica',
  'cierre'
] as const;

/**
 * Los cuatro pasos que resume `/nosotros`, que **no son los cinco de
 * `/como-trabajamos`**: son más cortos, están escritos como una frase cada uno
 * —sin título propio— y nombran el frigorífico y el forwarder, que es lo que el
 * cliente quiso dejar dicho en la página institucional. Los textos salen de
 * `nosotros.proceso.pasos.<id>`.
 *
 * **Que convivan dos listas es una tensión real y no un descuido.** La página
 * larga sigue en pie, con sus cinco pasos y su propio detalle; ésta es el
 * resumen. Si alguna vez hay que unificarlas, lo que hay que decidir es cuál de
 * las dos queda, no cómo se fusionan.
 */
export const PASOS_DE_NOSOTROS = [
  'frigorifico',
  'oferta',
  'documentacion',
  'traslado'
] as const;
