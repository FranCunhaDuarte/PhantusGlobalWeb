'use client';

import {
  CENTROS_DE_CORTE,
  LIENZO,
  REGIONES_DE_CORTE,
  SILUETA
} from '@/components/productos/ave';
import DiagramaDeDespiece from '@/components/productos/DiagramaDeDespiece';
import { CORTES_DE_POLLO } from '@/content/cortes-de-pollo';
import { useTranslations } from 'next-intl';

/**
 * El ave con sus nueve cortes. Comparte toda la mecánica con la media res
 * —`DiagramaDeDespiece`— y se diferencia en la geometría, el catálogo y el
 * ancho mínimo.
 *
 * **El ave aguanta el achique bastante mejor que la res**, y no es de gusto: son
 * nueve cortes grandes contra dieciocho, varios de ellos finos. Medido, su
 * región más chica sigue por encima de los 24 px de área de toque hasta bien
 * abajo, mientras que la res a 528 px ya tiene tres por debajo.
 *
 * **Por eso el ave va sin piso de ancho y la res conserva el suyo.** Apilada en
 * el teléfono el ave mide la mitad que la res —unos 167 px a 375 de viewport— y
 * un mínimo de 17rem ahí no la protegería de nada: la obligaría a desplazarse de
 * costado dentro de su caja para mostrar un dibujo que a ese tamaño se entiende
 * igual. Medido, su región más chica sigue por encima de los 24 px de área de
 * toque incluso ahí.
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
        cortes: CORTES_DE_POLLO
      }}
      nombre={(corte) => t(corte)}
      etiqueta={t('etiqueta')}
      anchoMinimo="min-w-0"
      className={className}
    />
  );
}
