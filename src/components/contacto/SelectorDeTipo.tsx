import Campo from '@/components/contacto/Campo';
import { TIPOS_DE_CONSULTA, type TipoDeConsulta } from '@/content/consulta';
import { clases } from '@/lib/clases';

type SelectorDeTipoProps = {
  etiqueta: string;
  vacio: string;
  opciones: Record<TipoDeConsulta, string>;
  valor: TipoDeConsulta | '';
  error?: string;
  alElegir: (tipo: TipoDeConsulta | '') => void;
};

/**
 * Es la primera pregunta del formulario porque es la que ordena todo lo demás, y
 * la que el hero ya contestó por el visitante cuando llegó con `?consulta=`.
 *
 * Va como lista desplegable: es el campo que se contesta eligiendo y no
 * escribiendo. Sin elegir, el texto va en el gris de lo secundario para que el
 * campo se lea vacío como los de al lado.
 *
 * **La punta la dibuja el sitio, no el sistema.** Con los campos convertidos en
 * una línea, la flecha nativa del `<select>` quedaba flotando lejos del texto y
 * con el gris del sistema operativo, que no es de ninguna de las dos paletas —y
 * encima cambia entre Windows, macOS y Android—. Con `appearance-none` se apaga
 * y va la misma punta que usa el selector de idioma, que hereda el color del
 * texto. No recibe puntero: el clic tiene que llegar al `<select>` de abajo.
 */
export default function SelectorDeTipo({
  etiqueta,
  vacio,
  opciones,
  valor,
  error,
  alElegir
}: SelectorDeTipoProps) {
  return (
    <Campo campo="tipo" etiqueta={etiqueta} error={error}>
      {(control) => (
        <div className="relative">
          <select
            {...control}
            className={clases(
              control.className,
              'appearance-none pr-11',
              valor === '' && 'texto-suave'
            )}
            value={valor}
            onChange={(evento) =>
              alElegir(evento.target.value as TipoDeConsulta | '')
            }
          >
            <option value="">{vacio}</option>
            {TIPOS_DE_CONSULTA.map((opcion) => (
              <option key={opcion} value={opcion} className="text-ink">
                {opciones[opcion]}
              </option>
            ))}
          </select>

          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="pointer-events-none absolute end-4 top-1/2 size-4 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      )}
    </Campo>
  );
}
