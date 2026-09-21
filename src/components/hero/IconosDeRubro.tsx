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
 * **El pescado y el corte de carne son de Lucide** (licencia ISC, uso comercial
 * permitido y sin atribución obligatoria) y están copiados adentro en vez de
 * venir del paquete: son dos iconos de los más de mil que trae `lucide-react`, y
 * una dependencia de tiempo de ejecución para eso no se paga sola. Copiados,
 * además, el grosor y el tamaño los decide el sitio y no la librería. Queda
 * anotado en `src/imagenes/FUENTES.md`.
 *
 * **La gallina está dibujada acá y no sale de ninguna librería.** Lucide no
 * tiene pollo entero: lo más cerca es `drumstick`, que es lo que había, y a 32
 * px se lee como dos manchas unidas y no como un rubro. `bird` es un pájaro
 * cantor y `egg` es un huevo, que es otro producto. La cresta es lo que hace que
 * la forma se lea, así que va integrada al contorno de la cabeza y no como
 * trazo aparte: a este tamaño un adorno suelto arriba del contorno se empasta
 * con él.
 *
 * **La vaca sigue siendo un corte de carne y no una vaca**, porque en Lucide no
 * hay vaca y dibujarla es otro problema: ya se intentó en este proyecto para el
 * diagrama de cortes y el resultado está anotado —lo que no sale no es el trazo
 * sino la anatomía—. Una gallina de perfil es una silueta cerrada con una cresta
 * encima; una vaca reconocible no.
 *
 * Que dos sean animal entero y uno un corte no es una inconsistencia que se
 * note: los tres se leen como lo que se comercia.
 */
const RUBROS = [
  {
    id: 'pescado',
    trazado: (
      <>
        <path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z" />
        <path d="M18 12v.5" />
        <path d="M16 17.93a9.77 9.77 0 0 1 0-11.86" />
        <path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33" />
        <path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4" />
        <path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98" />
      </>
    )
  },
  {
    id: 'pollo',
    trazado: (
      <>
        {/* Cuerpo, cuello y cabeza en un solo contorno cerrado, con la cresta y
            el pico formando parte de él. */}
        <path d="M6.6 9.4C7.9 7.6 10.2 6.4 12.8 6.2c1.1-.1 1.7-.6 1.8-1.6-.2-1.2.4-2 1.3-1.9 0-1.2 1.1-1.6 1.7-.7.6-.8 1.7-.3 1.5.9.3.5.4 1.1.3 1.7l2.4.8-2.4 1c-.2.9-.4 1.6-.7 2.2 1.6 1.4 2.5 3.3 2.5 5.4 0 3.3-3.7 5.8-8.2 5.8S4.8 17.3 4.8 14c0-1.7.7-3.3 1.8-4.6Z" />
        {/* La cola sale del anca y vuelve, así que es una cuña y no una antena:
            con un solo trazo se leía como una línea pinchada al cuerpo. */}
        <path d="M6.6 9.4C5.3 7.6 3.6 6.2 1.6 5.4c1.2 2.2 2 4.5 2.4 6.9" />
        {/* El ojo va como segmento de largo cero con punta redonda, que es como
            Lucide dibuja los puntos: un `circle` con relleno sería el único
            trazado relleno de los tres iconos. */}
        <path d="M17.4 4.6h.01" />
        <path d="M10.6 19.8v2.1M15 19.6v2.3" />
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
 * La gallina está dibujada para ese mismo 1,5: con el trazo más grueso, la
 * cresta y el pico se empastan.
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
