import type { StaticImageData } from 'next/image';
import type { Unidad } from '@/content/unidades';
import carnes from '@/imagenes/carnes.jpg';
import pescados from '@/imagenes/pescados-y-mariscos.jpg';
import pollo from '@/imagenes/pollo.jpg';

/**
 * La foto de cada unidad, por import estático: `next/image` saca de ahí el
 * ancho y el alto sin que nadie los declare, que es lo que evita el salto de
 * layout. Una ruta suelta en `public` los perdería.
 *
 * Son fotos, no recortes: van dentro de una caja con proporción fija y
 * `object-cover`. El catálogo de especies es el que usa PNG con alfa, porque
 * ahí el sujeto se apoya sobre el crema de la ficha.
 */
export const FOTO_DE_UNIDAD: Record<Unidad, StaticImageData> = {
  pescados,
  carnes,
  pollo
};
