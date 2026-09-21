'use client';

import { useTranslations } from 'next-intl';
import Carrusel from '@/components/productos/Carrusel';
import ImagenDeCorte from '@/components/productos/ImagenDeCorte';
import { CORTES_CON_RECORTE } from '@/components/productos/imagenes-de-corte';

/** Lo mismo que el adelanto de especies: la pista da ítems de ancho fijo por
 *  tramo, así que el ancho de render no depende del viewport más que en el
 *  primero. */
const MEDIDAS = ['(min-width: 40rem) 288px', '70vw'].join(', ');

const ANCHO_DE_MARCA = 50;
const ANCHO_DE_MARCA_GRANDE = 85;

/**
 * Los cortes con foto como carrusel, con la misma pista que el adelanto de
 * especies. Es lo más parecido a un catálogo que carnes puede tener sin
 * inventar: **foto y nombre, y nada más**. Lo que no existe como dato es la
 * especificación —congelado o enfriado, certificación del frigorífico, calibre y
 * destino—, que cambia entre un pedido y otro; por eso no hay ficha por corte ni
 * acá ni en la página de la unidad.
 *
 * Los cortes sin foto no entran, igual que las especies sin recorte: la media
 * res de `/productos` los nombra a los dieciocho, que es donde está la
 * lista completa.
 */
export default function AdelantoDeCortes({
  className
}: {
  className?: string;
}) {
  const t = useTranslations('productos.carnes.cortes');
  const tc = useTranslations('home.carnes.carrusel');

  return (
    <Carrusel
      className={className}
      etiqueta={tc('etiqueta')}
      anterior={tc('anterior')}
      siguiente={tc('siguiente')}
      items={CORTES_CON_RECORTE.map((corte) => ({
        clave: corte,
        contenido: (
          <>
            <ImagenDeCorte
              corte={corte}
              medidas={MEDIDAS}
              anchoDeMarca={ANCHO_DE_MARCA}
              anchoDeMarcaGrande={ANCHO_DE_MARCA_GRANDE}
            />
            <p className="text-center font-semibold text-balance">
              {t(corte)}
            </p>
          </>
        )
      }))}
    />
  );
}
