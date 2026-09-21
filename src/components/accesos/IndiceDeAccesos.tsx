import { useTranslations } from 'next-intl';
import { FOTO_DE_ACCESO } from '@/components/accesos/fotos-de-acceso';
import EnlaceDeSeccion from '@/components/layout/EnlaceDeSeccion';
import TarjetaConFoto from '@/components/ui/TarjetaConFoto';
import { SECCIONES_NAVEGABLES } from '@/content/secciones';
import { clases } from '@/lib/clases';

/**
 * Ancho que llega a medir cada foto: tres columnas dentro del `Container` a su
 * tope (1088 px) con dos gaps de 12 quedan en 355 px. Abajo de `md` es una
 * columna y la tarjeta ocupa el ancho de la pantalla.
 */
const MEDIDAS = ['(min-width: 48rem) 355px', '100vw'].join(', ');

/**
 * El índice del sitio: una tarjeta por sección navegable, en grilla de tres
 * desde `md`.
 *
 * **Recorre `SECCIONES_NAVEGABLES` y usa las etiquetas del header.** Tuvo lista
 * propia —`ACCESOS`, con su propio espacio de nombres en i18n— mientras las
 * tarjetas y la navegación decían cosas distintas: la barra listaba productos,
 * nosotros y cómo trabajamos, y las tarjetas nosotros, mercados y productos.
 * Cuando la barra pasó a ser esas tres mismas, mantener dos listas paralelas era
 * garantizar que se desfasaran. Ahora se agrega una sección en un solo lugar.
 *
 * **El destino lo resuelve `EnlaceDeSeccion`**, no la tarjeta: es el único que
 * sabe si una sección es ruta o ancla. Hoy las tres son ruta, pero eso ya cambió
 * dos veces.
 *
 * El índice de unidades de `/productos` va a dos columnas porque son dos
 * entradas y ocupar media pantalla cada una es lo que las hace leerse como las
 * dos puertas de esa página; acá son tres y la grilla es de tres, que es lo que
 * las pone al mismo nivel entre sí.
 *
 * **Van en `forma="alta"` y con menos aire que el índice de unidades** (12 px
 * contra 20). Son tres y están pegadas al hero: apretadas se leen como una sola
 * pieza de tres partes, que es lo que un índice tiene que parecer, y no como
 * tres bloques sueltos que caen ahí.
 */
export default function IndiceDeAccesos({
  className
}: {
  className?: string;
}) {
  const t = useTranslations('secciones');

  return (
    <ul className={clases('grid gap-3 md:grid-cols-3', className)}>
      {SECCIONES_NAVEGABLES.map((seccion) => (
        <TarjetaConFoto
          key={seccion}
          enlace={(contenido, clasesDelEnlace) => (
            <EnlaceDeSeccion seccion={seccion} className={clasesDelEnlace}>
              {contenido}
            </EnlaceDeSeccion>
          )}
          foto={FOTO_DE_ACCESO[seccion]}
          nombre={t(seccion)}
          medidas={MEDIDAS}
          forma="alta"
        />
      ))}
    </ul>
  );
}
