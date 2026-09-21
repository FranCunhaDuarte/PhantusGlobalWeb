import EtiquetaDestacada from '@/components/productos/EtiquetaDestacada';
import ImagenDeEspecie from '@/components/productos/ImagenDeEspecie';
import Panel from '@/components/ui/Panel';
import type { Especie } from '@/content/especies';

/**
 * El isotipo de la marca de agua mientras no hay recorte, a su mínimo del
 * manual. Con la ficha compacta el hueco más chico que produce la grilla son las
 * dos columnas a 375 px: ahí la imagen mide 131 px de ancho y 98 de alto, y la
 * huella del isotipo a 50 px es de 88 × 91. Entra, pero sin margen: si la grilla
 * se aprieta más, la marca deja de entrar antes que la imagen.
 */
const ANCHO_DE_MARCA = 50;

type FichaDeEspecieProps = {
  especie: Especie;
  nombre: string;
  cientifico: string;
  etiquetaDestacada?: string;
  disponibilidad?: string;
  formatos?: string;
  medidasDeImagen: string;
};

/**
 * La ficha del catálogo, en formato compacto: recorte, nombre, nombre científico
 * y las dos líneas de dato que decide una compra —cuándo hay y en qué formato
 * sale—. **Sin descripción y sin rótulos de bloque**: eran una tarjeta con dos
 * pies separados por líneas y un párrafo en el medio, y a once especies eso pasó
 * de catálogo a informe. Las descripciones siguen escritas en los catálogos de
 * i18n por si vuelven a hacer falta.
 *
 * Las dos líneas van sin título propio: "Zafra de abril a septiembre" y "HG, HGT
 * y filet" se explican solas, y un rótulo encima de cada una era la mitad del
 * alto de la ficha.
 */
export default function FichaDeEspecie({
  especie,
  nombre,
  cientifico,
  etiquetaDestacada,
  disponibilidad,
  formatos,
  medidasDeImagen
}: FichaDeEspecieProps) {
  return (
    <li className="flex">
      <Panel
        fondo="crema-elevado"
        className="relative flex w-full flex-col border borde-seccion p-3"
      >
        {/* Fuera del flujo y clavada en la esquina: adentro, el relleno la
            empujaba hacia el centro y dejaba de leerse como un marbete. */}
        {etiquetaDestacada && (
          <EtiquetaDestacada className="absolute start-0 top-0 z-10">
            {etiquetaDestacada}
          </EtiquetaDestacada>
        )}

        <ImagenDeEspecie
          especie={especie}
          medidas={medidasDeImagen}
          anchoDeMarca={ANCHO_DE_MARCA}
          anchoDeMarcaGrande={ANCHO_DE_MARCA}
        />

        {/* `h3` y no `h2`: la grilla cuelga del encabezado de la unidad, que es
            el `h2` invisible que `Productos` pone antes del catálogo. Con las
            once especies en `h2` quedaban como hermanas de ese encabezado en vez
            de como su contenido, y quien navega por encabezados perdía el
            límite entre las dos unidades. */}
        <h3 className="mt-3 leading-tight font-semibold text-balance">
          {nombre}
        </h3>
        {/* Sin cursiva: Montserrat se carga en un solo estilo y el navegador la
            inclinaría a la fuerza. El científico se distingue por cuerpo. */}
        <p className="mt-1 text-xs texto-suave">{cientifico}</p>

        {/* Al pie, para que las fichas de una fila alineen abajo aunque a una le
            falte la ventana —de siete de las once no hay dato— o los formatos. */}
        <div className="mt-auto flex flex-col gap-1 pt-3">
          {disponibilidad && <p className="text-xs">{disponibilidad}</p>}
          {formatos && <p className="text-xs texto-suave">{formatos}</p>}
        </div>
      </Panel>
    </li>
  );
}
