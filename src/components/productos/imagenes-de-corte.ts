import type { StaticImageData } from 'next/image';
import { CORTES } from '@/content/cortes';
import bifeAncho from '@/imagenes/cortes/bife-ancho.png';
import bifeDeCostilla from '@/imagenes/cortes/bife-de-costilla.png';
import cuadril from '@/imagenes/cortes/cuadril.png';
import lomo from '@/imagenes/cortes/lomo.png';

/**
 * Un recorte por corte: la foto que aparece en la tarjeta al apuntar una región
 * de la media res. Viven en `src/imagenes/cortes` y no en `public` por lo mismo
 * que los de especie: el import estático le da a `next/image` el ancho y el alto
 * sin declararlos a mano, que es lo que evita el salto de layout.
 *
 * **El mapa vale para los dos animales.** Es un `Partial`, así que un corte
 * que no esté —hoy, los cinco del pollo— cae en el hueco con la marca de agua
 * sin que nada se rompa.
 *
 * **Van cuatro de dieciocho.** Mientras falte uno, su tarjeta muestra el hueco
 * con el isotipo al 7 %, igual que el catálogo de especies. Enchufar otro es
 * pasarlo por `scripts/preparar-cortes.mjs`, importarlo arriba y sumarlo al
 * mapa.
 *
 * Lo que hay que pedir está en `src/imagenes/FUENTES.md`. El original puede
 * venir como foto de producto con fondo blanco: `scripts/preparar-cortes.mjs` le
 * quita el fondo por inundación desde el borde —un umbral global se comería la
 * grasa— y lo centra en el lienzo 4:3 que espera la tarjeta.
 *
 * **Los archivos van con el nombre del corte en castellano**, que es como se
 * nombra el dominio y como los va a nombrar el frigorífico que los mande.
 */
export const IMAGEN_DE_CORTE: Partial<Record<string, StaticImageData>> = {
  lomo,
  cuadril,
  bifeAncho,
  bifeDeCostilla
  // Faltan: azotillo, palomita, roastBeef, peceto, colitaDeCuadril, paleta,
  // asado, entrana, vacio, tapaDeNalga, bolaDeLomo, matambre, tapaDeAsado,
  // osobuco.
};

/**
 * Qué cortes mostraba el adelanto de la home: los que tienen foto. Los dieciocho
 * están nombrados y dibujados en la media res —ahí el que no tiene foto igual se
 * apunta y se lee—, pero una pista donde la mayoría de las celdas es la marca de
 * agua se lee como imágenes rotas.
 *
 * **Quedó sin consumidor** cuando el adelanto de cortes salió de la home por
 * pedido y el bloque de carnes pasó a ser un CTA a los despieces. Con él se
 * quedaron sin uso `IMAGEN_DE_CORTE`, `ImagenDeCorte` y los cuatro PNG. No se
 * borró nada: son material del cliente y el repo no tiene historial.
 *
 * El adelanto de especies **no usaba este criterio**: su lista es editorial
 * (`ESPECIES_DEL_ADELANTO`) y lleva dos sin foto, por pedido. Acá se mantenía
 * porque de dieciocho cortes hay foto de cuatro: una lista editorial habría sido
 * la misma lista, escrita a mano.
 */
export const CORTES_CON_RECORTE = CORTES.filter(
  (corte) => corte in IMAGEN_DE_CORTE
);
