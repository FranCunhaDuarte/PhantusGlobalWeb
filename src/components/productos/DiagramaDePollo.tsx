'use client';

import {
  CENTROS_DE_CORTE,
  DETALLES_DEL_DIBUJO,
  LIENZO,
  REGIONES_DE_CORTE,
  SILUETA
} from '@/components/productos/ave';
import DiagramaDeDespiece from '@/components/productos/DiagramaDeDespiece';
import { CORTES_DE_POLLO } from '@/content/cortes-de-pollo';
import { useTranslations } from 'next-intl';

/**
 * El ave con sus cinco cortes. Comparte toda la mecánica con la media res
 * —`DiagramaDeDespiece`— y se diferencia en la geometría, el catálogo y el
 * ancho mínimo.
 *
 * **El ave aguanta el achique bastante mejor que la res**, y no es de gusto: son
 * cinco cortes grandes en ocho regiones contra dieciocho, varios de ellos finos.
 * La más chica es el muslo, 180 x 157 de las 1000 x 916 del lienzo, así que a
 * los 416 px que mide el bloque sale de 72 x 64 px; la res a 528 px ya tiene
 * tres regiones por debajo del área de toque.
 *
 * **Por eso el ave va sin piso de ancho y la res conserva el suyo.** Un mínimo
 * de 17rem acá no protegería de nada: obligaría a desplazarse de costado dentro
 * de la caja para mostrar un dibujo que a ese tamaño se entiende igual. Medido a
 * 375 de viewport el dibujo queda en 335 px y el muslo en **58 x 52**, todavía
 * bien por encima de los 24.
 */
export default function DiagramaDePollo({
  className
}: {
  className?: string;
}) {
  const t = useTranslations('productos.pollo.cortes');

  return (
    <DiagramaDeDespiece
      despiece={{
        lienzo: LIENZO,
        silueta: SILUETA,
        regiones: REGIONES_DE_CORTE,
        centros: CENTROS_DE_CORTE,
        cortes: CORTES_DE_POLLO,
        detalles: DETALLES_DEL_DIBUJO
      }}
      nombre={(corte) => t(corte)}
      etiqueta={t('etiqueta')}
      anchoMinimo="min-w-0"
      className={className}
    />
  );
}
