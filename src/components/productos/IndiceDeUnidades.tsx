import { useTranslations } from 'next-intl';
import TarjetaDeUnidad from '@/components/productos/TarjetaDeUnidad';
import { UNIDADES } from '@/content/unidades';
import { clases } from '@/lib/clases';

/**
 * Las dos unidades, a ancho completo del contenedor: son dos y ocupar media
 * pantalla cada una es lo que las hace leerse como las dos entradas del sitio y
 * no como dos tarjetas más de una grilla.
 */
export default function IndiceDeUnidades({
  className
}: {
  className?: string;
}) {
  const t = useTranslations('productos.unidades');

  // **La misma grilla que el índice de accesos de la home**, hasta el número:
  // tres columnas desde `md` y 12 px de aire. Fue `lg:grid-cols-2` con 20 px
  // mientras las unidades eran dos y ocupaban media pantalla cada una; con tres
  // entradas esa medida ya no decía nada, y las dos piezas del sitio que hacen
  // lo mismo —dejar elegir por dónde entrar— ahora se ven iguales.
  return (
    <ul className={clases('grid gap-3 md:grid-cols-3', className)}>
      {UNIDADES.map((unidad) => (
        <TarjetaDeUnidad
          key={unidad}
          unidad={unidad}
          nombre={t(`${unidad}.nombre`)}
        />
      ))}
    </ul>
  );
}
