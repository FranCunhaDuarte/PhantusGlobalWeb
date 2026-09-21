import { FOTO_DE_UNIDAD } from '@/components/productos/fotos-de-unidad';
import TarjetaConFoto from '@/components/ui/TarjetaConFoto';
import { ANCLA_DE_UNIDAD, type Unidad } from '@/content/unidades';

/**
 * Ancho que llega a medir la foto: dos columnas dentro del `Container` a su
 * tope, con el gap, dejan tarjetas de 686 px.
 */
const MEDIDAS = ['(min-width: 64rem) 690px', '100vw'].join(', ');

/**
 * Una de las dos unidades de negocio en el índice de `/productos`. La tarjeta
 * —foto, velo y nombre— es `TarjetaConFoto`, que comparte con el índice de
 * secciones de la home; acá sólo se busca la foto y se arma el enlace.
 *
 * **Va como `<a href="#...">` y no con el `Link` tipado**, porque desde que las
 * dos hojas se plegaron adentro de `/productos` el destino está en esta misma
 * página. Es la regla del proyecto para cualquier salto interno: lo resuelve el
 * navegador, que ya respeta `scroll-margin-top` y `prefers-reduced-motion`.
 *
 * Tampoco pasa por `EnlaceDeSeccion`: una unidad de negocio no es una sección
 * del sitio, así que no tiene la ambigüedad entre ruta y ancla que ese
 * componente existe para resolver. Acá siempre es ancla.
 */
export default function TarjetaDeUnidad({
  unidad,
  nombre
}: {
  unidad: Unidad;
  nombre: string;
}) {
  return (
    <TarjetaConFoto
      enlace={(contenido, clases) => (
        <a href={`#${ANCLA_DE_UNIDAD[unidad]}`} className={clases}>
          {contenido}
        </a>
      )}
      foto={FOTO_DE_UNIDAD[unidad]}
      nombre={nombre}
      medidas={MEDIDAS}
    />
  );
}
