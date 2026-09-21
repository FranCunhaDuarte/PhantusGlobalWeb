'use client';

import DiagramaDeDespiece from '@/components/productos/DiagramaDeDespiece';
import {
  CENTROS_DE_CORTE,
  LIENZO,
  REGIONES_DE_CORTE,
  SILUETA
} from '@/components/productos/res-vacuna';
import { CORTES } from '@/content/cortes';
import { useTranslations } from 'next-intl';

/**
 * La media res con sus dieciocho cortes. Toda la mecánica —el pintado al
 * apuntar, la tarjeta que sigue al puntero, el foco por teclado— vive en
 * `DiagramaDeDespiece`, que es el mismo componente que dibuja el ave: acá sólo
 * se le pasa la geometría de la res y su catálogo.
 *
 * **Tuvo un piso de 48rem y ya no lo tiene**, y eso es una decisión con costo
 * medido. El piso existía porque abajo de ahí las regiones finas dejan de poder
 * tocarse: a 1024 px las veintidós quedan por encima de los 24 px que pide el
 * área de toque, a 768 ya hay dos por debajo y a 528 el osobuco queda en 15 px
 * de ancho y el lomo en 15 de alto.
 *
 * Con el par metido dentro del contenedor, sostener ese piso significaba que la
 * res se desplazara de costado dentro de una columna de 528 px, y lo que se
 * pidió fue que **entrara**. Así que se achica: el dibujo entero se ve de una
 * sola vez y sus cortes más finos pasan a ser difíciles de apuntar con
 * precisión. El nombre igual se lee —cada región es un control tabulable y la
 * tarjeta se abre también con el foco del teclado—, así que lo que se pierde es
 * puntería, no información.
 *
 * Queda un piso mínimo para que no se vuelva ilegible en el teléfono, y es
 * bastante más bajo que el ancho del contenedor a 320 px, que son 280.
 */
export default function DiagramaDeCortes({
  className
}: {
  className?: string;
}) {
  const t = useTranslations('productos.carnes.cortes');

  return (
    <DiagramaDeDespiece
      despiece={{
        lienzo: LIENZO,
        silueta: SILUETA,
        regiones: REGIONES_DE_CORTE,
        centros: CENTROS_DE_CORTE,
        cortes: CORTES
      }}
      nombre={(corte) => t(corte)}
      etiqueta={t('etiqueta')}
      anchoMinimo="min-w-[17rem]"
      className={className}
    />
  );
}
