import { FOTO_DE_UNIDAD } from '@/components/productos/fotos-de-unidad';
import TarjetaConFoto from '@/components/ui/TarjetaConFoto';
import { ANCLA_DE_UNIDAD, type Unidad } from '@/content/unidades';

/**
 * Ancho que llega a medir la foto: tres columnas dentro del `Container` a su
 * tope (1088 px) con dos gaps de 12 dejan tarjetas de 355 px. Es el mismo
 * número que el índice de accesos de la home, porque desde ahora las dos
 * grillas miden igual.
 */
const MEDIDAS = ['(min-width: 48rem) 355px', '100vw'].join(', ');

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
      // Misma forma que las tarjetas de la home. Eran `ancha` —3:2 en todos los
      // anchos— mientras eran dos y ocupaban media pantalla cada una; con tres
      // y la grilla igualada, las dos piezas del sitio que son "elegí por dónde
      // entrar" se ven iguales.
      forma="alta"
    />
  );
}
