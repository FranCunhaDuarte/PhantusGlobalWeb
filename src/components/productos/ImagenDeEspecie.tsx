import HuecoDeImagen from '@/components/productos/HuecoDeImagen';
import { IMAGEN_DE_ESPECIE } from '@/components/productos/imagenes-de-especie';
import type { Especie } from '@/content/especies';

type ImagenDeEspecieProps = {
  especie: Especie;
  medidas: string;
  anchoDeMarca: number;
  anchoDeMarcaGrande: number;
  className?: string;
};

/**
 * El recorte de una especie en el hueco del catálogo. La proporción, la marca de
 * agua y el `alt` vacío los resuelve `HuecoDeImagen`, que es el mismo hueco que
 * usan la ficha, el adelanto de la home y la tarjeta del diagrama de cortes;
 * acá sólo se busca el archivo, que es lo propio del dominio.
 */
export default function ImagenDeEspecie({
  especie,
  ...resto
}: ImagenDeEspecieProps) {
  return <HuecoDeImagen recorte={IMAGEN_DE_ESPECIE[especie]} {...resto} />;
}
