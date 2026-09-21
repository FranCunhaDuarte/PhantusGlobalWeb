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

  return (
    <ul className={clases('grid gap-5 lg:grid-cols-2', className)}>
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
