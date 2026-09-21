import HuecoDeImagen from '@/components/productos/HuecoDeImagen';
import { IMAGEN_DE_CORTE } from '@/components/productos/imagenes-de-corte';

type ImagenDeCorteProps = {
  corte: string;
  medidas: string;
  anchoDeMarca: number;
  anchoDeMarcaGrande?: number;
  className?: string;
};

/**
 * La foto de un corte en el mismo hueco que usa el catálogo de especies: la
 * comparten el adelanto de la home y la tarjeta que abre el diagrama de cortes.
 * Acá sólo se busca el archivo; el resto lo resuelve `HuecoDeImagen`.
 */
export default function ImagenDeCorte({ corte, ...resto }: ImagenDeCorteProps) {
  return <HuecoDeImagen recorte={IMAGEN_DE_CORTE[corte]} {...resto} />;
}
