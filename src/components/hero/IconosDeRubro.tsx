import { useTranslations } from 'next-intl';
import { clases } from '@/lib/clases';

/**
 * Los tres rubros del hero, dibujados.
 *
 * **Fueron cuatro y la copa de vino se fue.** Era el único de los cuatro que no
 * tiene nada detrás en el sitio —ni página, ni catálogo, ni una línea de copy—,
 * así que prometía una unidad de negocio que no existe. Pollo queda en la misma
 * situación y se sostiene por otra cosa: es alimento del mismo circuito
 * frigorífico que carne vacuna, y el titular dice "alimentos". El vino no es de
 * ese circuito.
 *
 * **Dos son de Lucide** (licencia ISC, uso comercial permitido y sin atribución
 * obligatoria) y el pollo es de Healthicons (**MIT**). Los tres están copiados
 * adentro en vez de venir del paquete: son tres iconos de los más de mil que
 * trae `lucide-react`, y una dependencia de tiempo de ejecución para eso no se
 * paga sola. Copiados, además, el grosor y el tamaño los decide el sitio y no la
 * librería. Queda anotado en `src/imagenes/FUENTES.md`.
 *
 * **El pollo es el animal y no la pieza, por decisión del cliente.** Fue
 * `drumstick` de Lucide —la pata, o sea el producto— bajo una regla que pedía
 * que ninguno de los tres fuera un animal entero. Franco pidió cambiar la regla
 * antes que el dibujo: la gallina se queda. Antes de eso hubo también una
 * gallina dibujada a mano, que se fue por otra cosa —con cresta, pico y ojo, al
 * lado de un titular en mayúsculas sobre video se leía como ilustración
 * infantil—; ésta es una silueta y no tiene ese problema.
 *
 * > **La regla que se cae dejaba al pescado del lado equivocado.** Decía que los
 * > tres son producto y ninguno es animal entero, y el pescado es un pez entero
 * > desde siempre. Hoy el impar es el corte de carne, que es el único que no es
 * > un animal. Volver a emparejarlos es cambiar ése, no éste.
 *
 * **Vaciar la silueta fue parte de la elección, no un retoque.** El original es
 * maciza, y maciza no convive con dos iconos de trazo: se lee como una mancha al
 * lado de dos dibujos. Dibujada por su contorno, con el mismo 1,5 que los otros,
 * el juego queda parejo aunque el motivo no lo esté. El trazado del banco viene
 * en un lienzo de 48 y acá está escalado a 24, así que hereda el grosor del
 * `<svg>` en vez de traerse el suyo.
 *
 * > **El pescado es `fish-symbol`, que es la forma del ichthys.** Se planteó
 * > —dos arcos que se cruzan en la cola es el símbolo cristiano, no un icono de
 * > pescado— y la decisión de usarlo igual fue de Franco. Si alguna vez molesta,
 * > lo que lo desactiva es un punto de ojo: con ojo se lee como pez y sin ojo,
 * > como símbolo. La alternativa entera es volver a `fish`, que es el que
 * > estaba.
 *
 * **La vaca sigue siendo un corte de carne y no una vaca**, y ahora eso es lo
 * único que rompe el juego: en Lucide no hay vaca, y dibujarla es otro problema
 * —ya se intentó en este proyecto para el diagrama de cortes y lo que no sale no
 * es el trazo sino la anatomía—. Si alguna vez aparece una en un banco de
 * licencia libre, es la que falta.
 */
const RUBROS = [
  {
    id: 'pescado',
    trazado: <path d="M2 16s9-15 20-4C11 23 2 8 2 8" />
  },
  {
    id: 'pollo',
    // La única que no es de Lucide: `animal-chicken` de Healthicons, MIT. Viene
    // como silueta maciza en un lienzo de 48; acá va **vaciada y escalada a 24**
    // para que herede el trazo de 1,5 del `<svg>` como los otros dos, en vez de
    // arrastrar un `transform` y un grosor propios.
    trazado: (
      <path d="M9.25 3.707c0 -0.891 -1.077 -1.337 -1.707 -0.707L3.25 7.293C2.62 7.923 3.066 9 3.957 9h1.735a4.15 4.15 0 0 1 -0.138 1.2l-0.38 1.421c-0.441 1.647 -0.567 3.456 0.375 4.877A7.85 7.85 0 0 0 12 20v1h-2.5v1h4.75v-1H13v-1.05a7.85 7.85 0 0 0 4.367 -1.962A6.95 6.95 0 0 1 14.739 18.5C11.036 18.5 8 15.608 8 12a0.5 0.5 0 0 1 1 0c0 3.02 2.551 5.5 5.739 5.5c1.763 0 3.335 -0.76 4.386 -1.952q0.05 -0.056 0.11 -0.093c0.25 -0.545 0.439 -1.124 0.557 -1.727c0.185 -0.946 0.457 -1.892 1.039 -2.66c0.242 -0.318 -0.03 -0.768 -0.424 -0.703L13.849 11.445a2.5 2.5 0 0 1 -2.6 -1.266l-1.66 -3.033l1.01 -0.897C11.287 5.637 10.855 4.5 9.935 4.5H9.25zm-0.153 2.538L9.935 5.5H9.25a1 1 0 0 1 -1 -1V3.707l-1.322 1.322q0.165 -0.029 0.338 -0.029a1.94 1.94 0 0 1 1.702 1.009zm-3.742 0.358L3.957 8h1.58l-0.149 -0.574a1.95 1.95 0 0 1 -0.033 -0.823M7 7a0.5 0.5 0 1 0 0 -1a0.5 0.5 0 0 0 0 1" />
    )
  },
  {
    id: 'carne',
    trazado: (
      <>
        <path d="M16.4 13.7A6.5 6.5 0 1 0 6.28 6.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.4-4.3" />
        <path d="m18.5 6 1.754 3.5a6.48 6.48 0 0 1-1.854 8.2C15.4 20.2 11 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5" />
        <circle cx="12.5" cy="8.5" r="2.5" />
      </>
    )
  }
] as const;

/**
 * Reemplazan a la bajada del hero, que enumeraba la red SENASA, los cuatro
 * mercados y el recorrido de origen a destino. **Dicen otra cosa**: qué se
 * comercia, no cómo. Es un cambio de registro, no una traducción a iconos.
 *
 * **El trazo va en 1,5 y no en los 2 de Lucide.** Los iconos se rinden a 32 px
 * en el teléfono y 36 en escritorio, un tamaño y medio el que Lucide dibuja, y a
 * 2 el trazo queda grueso al lado de una tipografía de titular; a 1,5 acompaña.
 *
 * Estuvieron en 40 y 48, con el doble de aire entre ellos, y pesaban demasiado
 * para lo que son: una nota al pie del titular, no un menú.
 *
 * **Cada icono lleva su nombre para el lector de pantalla y el dibujo va
 * `aria-hidden`.** Sin eso, quien no ve la pantalla no se entera de que el hero
 * nombra tres rubros. Lo que se oye es la lista, no tres imágenes.
 */
export default function IconosDeRubro({ className }: { className?: string }) {
  const t = useTranslations('home.hero.rubros');

  return (
    <ul className={clases('flex flex-wrap justify-center gap-x-6 gap-y-4 sm:gap-x-8', className)}>
      {RUBROS.map(({ id, trazado }) => (
        <li key={id} className="flex">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-8 sm:size-9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {trazado}
          </svg>
          <span className="sr-only">{t(id)}</span>
        </li>
      ))}
    </ul>
  );
}
