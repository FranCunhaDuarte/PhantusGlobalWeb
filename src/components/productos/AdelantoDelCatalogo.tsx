'use client';

import { useTranslations } from 'next-intl';
import Carrusel from '@/components/productos/Carrusel';
import EtiquetaDestacada from '@/components/productos/EtiquetaDestacada';
import ImagenDeEspecie from '@/components/productos/ImagenDeEspecie';
import {
  ESPECIES_DEL_ADELANTO,
  ETIQUETA_DE_ESPECIE
} from '@/content/especies';

/**
 * Ancho que llega a medir el recorte dentro de la pista: los ítems tienen ancho
 * fijo por tramo, así que no depende del viewport más que en el primero.
 */
const MEDIDAS = ['(min-width: 40rem) 288px', '70vw'].join(', ');

/** El isotipo de la marca de agua mientras no hay recorte. Abajo va al mínimo
 *  del manual, que es lo único que entra en la celda más chica de la pista. */
const ANCHO_DE_MARCA = 50;
const ANCHO_DE_MARCA_GRANDE = 85;

/**
 * Las seis especies de `ESPECIES_DEL_ADELANTO` como carrusel, sin descripción ni
 * ventana: es el adelanto de la home y lo único que promete es que el catálogo
 * existe y qué hay adentro. La mecánica de la pista —scroll nativo con anclaje,
 * arrastre con mouse y flechas— vive en `Carrusel`, que comparte con el adelanto
 * de cortes.
 *
 * **La lista ya no es la de las especies con recorte.** Dos de las seis todavía
 * no tienen foto y se ven con la marca de agua; el hueco las deja del mismo alto
 * que las otras, así que cuando lleguen los PNG no se mueve nada.
 */
export default function AdelantoDelCatalogo({
  className
}: {
  className?: string;
}) {
  const t = useTranslations('productos.pescados.especies');
  const tp = useTranslations('productos.pescados');
  const tc = useTranslations('home.productos.carrusel');

  return (
    <Carrusel
      className={className}
      etiqueta={tc('etiqueta')}
      anterior={tc('anterior')}
      siguiente={tc('siguiente')}
      items={ESPECIES_DEL_ADELANTO.map((especie) => ({
        clave: especie,
        contenido: (
          <>
            {/* La etiqueta va montada sobre el recorte y no encima del nombre:
                sólo una especie la lleva, y arriba del nombre correría esa
                tarjeta unos píxeles y desalinearía los nombres de toda la
                pista. Así no toca el layout. */}
            <div className="relative">
              <ImagenDeEspecie
                especie={especie}
                medidas={MEDIDAS}
                anchoDeMarca={ANCHO_DE_MARCA}
                anchoDeMarcaGrande={ANCHO_DE_MARCA_GRANDE}
              />
              {ETIQUETA_DE_ESPECIE[especie] && (
                <EtiquetaDestacada className="absolute start-0 top-0">
                  {tp(`etiquetas.${ETIQUETA_DE_ESPECIE[especie]}`)}
                </EtiquetaDestacada>
              )}
            </div>
            {/* Centrado y no alineado a la izquierda como el resto de la
                página: el recorte se centra en su hueco, y con el nombre al
                costado los dos se leen como dos cosas y no como una. */}
            <p className="text-center font-semibold text-balance">
              {t(`${especie}.nombre`)}
            </p>
          </>
        )
      }))}
    />
  );
}
