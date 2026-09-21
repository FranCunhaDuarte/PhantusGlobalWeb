import Image from 'next/image';
import VideoDelHero from '@/components/hero/VideoDelHero';
import { clases } from '@/lib/clases';
import foto from '@/imagenes/hero-mar.jpg';

/**
 * Fondo de la sección entera. Va absoluto contra el `<section>`, que es el
 * ancestro posicionado, así que el relleno del `Container` no lo recorta y
 * sangra de borde a borde sin negativos. El hero sube la altura del header, de
 * modo que esta caja incluye la banda que queda debajo de la barra.
 */
const CAJA = 'pointer-events-none absolute inset-0 overflow-hidden';

/** Los dos barcos quedan en la banda central; centrar no corta ninguno. */
const ENCUADRE = 'object-cover object-[62%_center]';

/**
 * El velo, y por qué es un filtro sobre cada capa en vez de un negro encima.
 *
 * **La cuenta no cambió.** El peor cuadro posible es blanco puro: para que el
 * crema del texto (#F2ECE2, L = 0,8436) llegue a los 4,5:1 que pide el texto
 * chico del hero, el fondo no puede superar L = 0,1486, o sea sRGB 0,4217.
 * Negro al 58 % encima da `0,42 × origen`; `brightness(0.42)` da exactamente lo
 * mismo, porque las dos operaciones son la misma multiplicación en el mismo
 * espacio de color. El piso siguen siendo 4,53:1 **sin mirar qué muestra el
 * video**, y todo lo que el video aporte de oscuro sólo lo mejora.
 *
 * **Lo que sí cambia es cómo se compone, y ése era el problema.** El velo era un
 * `div` con `bg-black/58` apoyado encima del `<video>`. Un video opaco, sin
 * filtro y sin transformación es justo el caso que Chromium puede mandar a un
 * **plano de superposición del hardware**: en vez de dibujarlo con el resto de
 * la página, se lo pasa directo al controlador de pantalla. Lo promueve cuando
 * la página se queda quieta y vuelve atrás apenas algo se mueve, que es
 * exactamente el síntoma —el velo se va al frenar el scroll y vuelve al
 * moverse—. Cuando el video viaja por su propio plano, lo que está dibujado
 * encima queda del otro lado de la composición.
 *
 * **Un video con filtro no se puede promover**, porque ya no se lo puede
 * escanear tal cual. Al pasar el oscurecido a filtro, el velo deja de existir
 * como capa: no hay nada encima del video que se pueda perder.
 *
 * > **Esto no se puede comprobar con una captura.** Tanto las capturas del
 * > navegador como la grabación de Playwright leen la salida del renderizador,
 * > que es anterior a la composición del hardware: ahí el velo siempre se ve
 * > bien. Por eso una medición cuadro a cuadro dio el velo constante y no
 * > encontró nada. Lo único que ve este error es una pantalla de verdad.
 */
const VELO = 'brightness-[0.42]';

export default function FondoDelHero() {
  return (
    <div aria-hidden className={CAJA}>
      <Image
        src={foto}
        alt=""
        fill
        sizes="100vw"
        // Es el elemento más grande de la primera pantalla y le gana al `h1`:
        // descubierta al parsear el `<img>` costaba 2,33 s con red y CPU de
        // móvil, declarada en el `<head>` baja a 1,41 s. Además es el póster del
        // video, así que tiene que estar pintada antes de que el video exista.
        preload
        placeholder="blur"
        className={clases(ENCUADRE, VELO)}
      />
      <VideoDelHero
        className={clases('absolute inset-0 size-full', ENCUADRE, VELO)}
      />
    </div>
  );
}
