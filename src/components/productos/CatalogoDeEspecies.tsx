import { useTranslations } from 'next-intl';
import FichaDeEspecie from '@/components/productos/FichaDeEspecie';
import { ESPECIES, ETIQUETA_DE_ESPECIE } from '@/content/especies';
import { clases } from '@/lib/clases';

/**
 * Ancho que llega a medir el recorte, que no es el de la ficha sino el que queda
 * dentro de su relleno: la columna de contenido mide 1088 px y en cuatro
 * columnas con `gap-6` deja fichas de 254, menos los 12 px de `p-3` por lado.
 */
const MEDIDAS = [
  '(min-width: 64rem) 230px',
  '(min-width: 40rem) calc(33vw - 56px)',
  'calc(50vw - 56px)'
].join(', ');

/**
 * El catálogo de especies, en grilla densa: once fichas compactas de dos a
 * cuatro columnas. Fue dos columnas de fichas grandes —con descripción y dos
 * bloques de dato al pie— mientras las especies eran cuatro; a once, esa página
 * se leía como un informe y no como un catálogo.
 *
 * **Sin tope de ancho propio**: la grilla ocupa la columna de contenido entera,
 * que es lo que la deja alineada con el titular. Lo tuvo mientras las fichas
 * eran grandes y llevaban descripción —a 1400 px del `Container` el párrafo
 * pasaba los 80 caracteres por renglón—, pero eso dejaba 64 px de aire sólo del
 * lado derecho y la grilla se leía corrida. Sin descripción, el argumento del
 * largo de línea ya no aplica: la ficha más ancha que produce la grilla son 254
 * px.
 */
export default function CatalogoDeEspecies({
  className
}: {
  className?: string;
}) {
  const t = useTranslations('productos.pescados');

  return (
    <ul
      className={clases(
        'grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4',
        className
      )}
    >
      {ESPECIES.map((especie) => {
        const disponibilidad = `especies.${especie}.disponibilidad`;
        const formatos = `especies.${especie}.formatos`;

        return (
          <FichaDeEspecie
            key={especie}
            especie={especie}
            etiquetaDestacada={
              ETIQUETA_DE_ESPECIE[especie] &&
              t(`etiquetas.${ETIQUETA_DE_ESPECIE[especie]}`)
            }
            nombre={t(`especies.${especie}.nombre`)}
            cientifico={t(`especies.${especie}.cientifico`)}
            disponibilidad={
              t.has(disponibilidad) ? t(disponibilidad) : undefined
            }
            formatos={t.has(formatos) ? t(formatos) : undefined}
            medidasDeImagen={MEDIDAS}
          />
        );
      })}
    </ul>
  );
}
