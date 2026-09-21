/**
 * Las dos puntas de una operación, en el orden en que se cuentan. Las dos son
 * concretas: el origen es Mar del Plata y la red de exportadores habilitados, y
 * el destino son los cuatro mercados de `src/content/mercados.ts`. Los textos
 * salen de `mercados.<id>`, que hasta la mudanza a ruta propia fueron
 * `nosotros.alcance.<id>`.
 */
export const EXTREMOS = ['origen', 'destino'] as const;

export type Extremo = (typeof EXTREMOS)[number];
