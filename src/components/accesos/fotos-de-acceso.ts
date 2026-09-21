import type { StaticImageData } from 'next/image';
import type { SeccionNavegable } from '@/content/secciones';
import mercados from '@/imagenes/mercados.jpg';
import nosotros from '@/imagenes/nosotros.jpg';
import productos from '@/imagenes/pescados-y-mariscos.jpg';

/**
 * La foto de cada tarjeta del índice de la home, por import estático:
 * `next/image` saca de ahí el ancho y el alto sin que nadie los declare, que es
 * lo que evita el salto de layout.
 *
 * **Va una por sección navegable y el tipo lo exige**: si mañana entra una
 * sección más a la navegación, esto deja de compilar hasta que tenga foto. Es a
 * propósito —una tarjeta sin foto es un rectángulo vacío— y es el motivo por el
 * que `SeccionNavegable` existe como tipo aparte de `IdSeccion`.
 *
 * **`productos` comparte archivo con la tarjeta de la unidad de pescados**, y es
 * a propósito: las dos llevan al mismo lugar, así que la misma foto es la pista
 * de que es el mismo destino. No se repiten dentro de una misma página —la
 * tarjeta de unidad vive en `/productos`, esta tarjeta en la home—.
 *
 * Las otras dos pasaron la cuenta del velo: su píxel más claro deja el nombre en
 * 3,39:1 (mercados) y 3,40:1 (nosotros), por encima del 3:1 que pide el texto
 * grande. Origen y licencia, en `src/imagenes/FUENTES.md`.
 */
export const FOTO_DE_ACCESO: Record<SeccionNavegable, StaticImageData> = {
  nosotros,
  mercados,
  productos
};
