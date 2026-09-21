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
 * **Los tres son de Lucide** (licencia ISC, uso comercial permitido y sin
 * atribución obligatoria) y están copiados adentro en vez de venir del paquete:
 * son tres iconos de los más de mil que trae `lucide-react`, y una dependencia
 * de tiempo de ejecución para eso no se paga sola. Copiados, además, el grosor y
 * el tamaño los decide el sitio y no la librería. Queda anotado en
 * `src/imagenes/FUENTES.md`.
 *
 * **El registro bajó de literal a sobrio, y eso descartó la gallina dibujada a
 * mano.** Estuvo un tiempo acá, con cresta, pico y ojo, y al lado de un titular
 * en mayúsculas sobre video se leía como ilustración infantil. Ahora el pollo va
 * con `drumstick`, que es la pata: no es el animal sino el producto, que es
 * justamente el registro del resto del sitio.
 *
 * > **El pescado es `fish-symbol`, que es la forma del ichthys.** Se planteó
 * > —dos arcos que se cruzan en la cola es el símbolo cristiano, no un icono de
 * > pescado— y la decisión de usarlo igual fue de Franco. Si alguna vez molesta,
 * > lo que lo desactiva es un punto de ojo: con ojo se lee como pez y sin ojo,
 * > como símbolo. La alternativa entera es volver a `fish`, que es el que
 * > estaba.
 *
 * **La vaca sigue siendo un corte de carne y no una vaca**, porque en Lucide no
 * hay vaca y dibujarla es otro problema: ya se intentó en este proyecto para el
 * diagrama de cortes y el resultado está anotado —lo que no sale no es el trazo
 * sino la anatomía—.
 *
 * Los tres son producto y ninguno es animal entero, que es lo que hace que el
 * juego se lea parejo.
 */
const RUBROS = [
  {
    id: 'pescado',
    trazado: <path d="M2 16s9-15 20-4C11 23 2 8 2 8" />
  },
  {
    id: 'pollo',
    trazado: (
      <>
        <path d="M15.4 15.63a7.875 6 135 1 1 6.23-6.23 4.5 3.43 135 0 0-6.23 6.23" />
        <path d="m8.29 12.71-2.6 2.6a2.5 2.5 0 1 0-1.65 4.65A2.5 2.5 0 1 0 8.7 18.3l2.59-2.59" />
      </>
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
