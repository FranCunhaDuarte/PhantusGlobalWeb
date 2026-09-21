import { useTranslations } from 'next-intl';
import { MERCADOS } from '@/content/mercados';

/**
 * El trunco vertical que une las cuatro ramas, dibujado por tramos.
 *
 * **No se puede poner el borde en la lista entera**: ahí la línea arrancaría en
 * el borde de arriba del primer ítem y terminaría en el de abajo del último, o
 * sea sobresaliendo por los dos extremos. El trunco tiene que ir del centro de
 * la primera rama al centro de la última, y eso en CSS no se sabe sin medir.
 *
 * Entonces cada ítem trae su propio tramo: el primero desde su centro para
 * abajo, el último desde arriba hasta su centro, y los del medio de punta a
 * punta. Sumados dan exactamente el trunco que hace falta, y sigue andando si
 * mañana los mercados son cinco.
 *
 * **Esto depende de que las cuatro ramas midan lo mismo**, porque "el centro del
 * ítem" y "dónde sale la rama" tienen que ser el mismo punto. Es el motivo por
 * el que el estándar de Estados Unidos **no** cuelga de su rama: ahí ese ítem
 * quedaba más alto que los otros tres, su centro se corría para abajo y el
 * trunco arrancaba desalineado de su propia rama. La nota va debajo del árbol.
 *
 * **Qué tramo va en cada ítem lo decide el índice y no `first:` / `last:`.**
 * Con las variantes el trunco salía cortado en tres pedazos, y el motivo es que
 * `first:` pregunta si **el propio elemento** es el primer hijo de su padre: el
 * tramo es siempre el primer hijo de su `<li>`, así que los cuatro se llevaban
 * `top: 50%` y ninguno `bottom: 50%`. Cada uno arrancaba en la mitad de su
 * ítem y dejaba un hueco de media fila con el de arriba. Lo que hace falta
 * preguntar es por la posición del `<li>`, y eso acá se sabe: viene en el
 * `map`.
 *
 * **Y las cuatro filas llevan el mismo relleno, sin quitarle el de arriba a la
 * primera ni el de abajo a la última.** Con esos dos recortes el centro del ítem
 * dejaba de ser el centro de su fila y el trunco arrancaba 10 px corrido de su
 * propia rama. El precio es algo de aire de más en las puntas de la lista, que
 * no molesta; el desalineado sí se veía.
 */
function tramo(indice: number, total: number) {
  const arriba = indice === 0 ? 'top-1/2' : 'top-0';
  const abajo = indice === total - 1 ? 'bottom-1/2' : 'bottom-0';
  return `absolute start-0 w-px bg-(--fondo-linea) ${arriba} ${abajo}`;
}

/**
 * Los mercados de destino, dibujados como lo que son: **un origen y cuatro
 * ramas**. Es lo que el titular de la página ya dice —"del puerto de Mar del
 * Plata al mundo"— puesto en imagen en vez de en lista.
 *
 * **Fueron cuatro píldoras y después cuatro columnas con su pelo arriba.** Las
 * columnas ordenaban pero seguían sin decir nada: cuatro nombres uno al lado del
 * otro son una enumeración, y lo que la página cuenta es que de un solo puerto
 * salen cuatro destinos. El árbol dibuja esa relación.
 *
 * **Las ramas cruzan el ancho y los nombres arrancan todos en la misma
 * columna.** La línea es `flex-1` y el nombre tiene ancho fijo desde `sm`, así
 * que los cuatro quedan alineados y las cuatro líneas miden igual. Con el nombre
 * pegado al trunco el dibujo se amontonaba a la izquierda y dejaba media banda
 * vacía; estirado, la distancia se ve, que es de lo que habla la página.
 *
 * **No es un mapa, y eso sigue siendo a propósito.** Un mapa con cuatro chinches
 * dice menos que esto: acá lo que importa no es dónde caen los puntos sino que
 * hay un origen y son cuatro. Además Europa no es un punto.
 *
 * Va como `<ul>`: es una enumeración, y el lector de pantalla anuncia cuántas
 * son antes de leerlas. Las líneas son `aria-hidden` —el dibujo es para el ojo,
 * y la relación ya la da que las cuatro cuelguen del mismo encabezado—.
 */
export default function RutasDeMercado({
  etiqueta,
  origen
}: {
  etiqueta: string;
  origen: string;
}) {
  const t = useTranslations('mercados.mercados');

  return (
    <div>
      <h3 className="text-eyebrow uppercase texto-suave">{etiqueta}</h3>

      {/* La columna del origen se dimensiona por su contenido y la de destinos
          se lleva el resto. Abajo de `md` se apilan: el origen arriba, las
          ramas debajo, que es como se lee un árbol en una pantalla angosta. */}
      <div className="mt-10 grid gap-6 md:grid-cols-[auto_minmax(0,1fr)] md:gap-0">
        {/* El origen va centrado contra el alto de las ramas, que es lo que lo
            deja a la altura del medio del trunco. El tramo horizontal sale de
            su borde y llega hasta ahí. */}
        <div className="relative flex items-center md:pe-10">
          <span className="text-lg font-semibold">{origen}</span>
          <span
            aria-hidden
            className="absolute end-0 top-1/2 hidden h-px w-10 bg-(--fondo-linea) md:block"
          />
        </div>

        <ul className="flex flex-col">
          {MERCADOS.map((mercado, indice) => (
            <li key={mercado} className="relative py-5">
              <span aria-hidden className={tramo(indice, MERCADOS.length)} />

              <div className="flex items-center gap-6">
                {/* La rama. Va `flex-1` y el nombre a ancho fijo, así que las
                    cuatro líneas miden lo mismo y los cuatro nombres arrancan
                    en la misma columna. Abajo de `sm` el nombre vuelve a medir
                    lo suyo: con 224 px fijos, la línea quedaba en 32 px a 320
                    de viewport y dejaba de leerse como una rama. */}
                <span aria-hidden className="h-px flex-1 bg-(--fondo-linea)" />
                <p className="shrink-0 text-2xl font-semibold sm:w-72 sm:text-3xl">
                  {t(mercado)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
