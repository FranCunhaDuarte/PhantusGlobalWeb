'use client';

import { useRef, useState, type PointerEvent } from 'react';
import TarjetaDeCorte, {
  ALTO_DE_TARJETA,
  ANCHO_DE_TARJETA
} from '@/components/productos/TarjetaDeCorte';
import { clases } from '@/lib/clases';

/**
 * La geometría de un animal, tal como la emiten `res-vacuna.ts` y `ave.ts`.
 * Los dos módulos exportan lo mismo con los mismos nombres, así que este
 * componente no sabe cuál le tocó.
 */
export type Despiece = {
  lienzo: string;
  silueta: string;
  regiones: Record<string, readonly string[]>;
  centros: Record<string, readonly (readonly [number, number])[]>;
  cortes: readonly string[];
};

type DiagramaDeDespieceProps = {
  despiece: Despiece;
  /** El nombre visible de un corte. Lo resuelve quien monta, con su propio
   *  espacio de nombres: la res y el ave no comparten catálogo. */
  nombre: (corte: string) => string;
  /** Nombre del grupo, para el lector de pantalla y para el contenedor que se
   *  desplaza. */
  etiqueta: string;
  /** Ancho mínimo del dibujo. La res no baja de 48rem —abajo de eso sus
   *  regiones finas dejan de poder tocarse— y el ave aguanta bastante menos,
   *  porque son nueve cortes grandes y no dieciocho. */
  anchoMinimo: string;
  className?: string;
};

/**
 * Grosor de la línea divisoria, **en píxeles de pantalla y no en unidades del
 * lienzo**. Esa distinción es el arreglo: el número era el mismo para los dos
 * animales y salía muy distinto en cada uno, porque los lienzos no miden lo
 * mismo ni se rinden al mismo ancho. Medido a 1280, con 1,5 unidades, la res
 * dibujaba a **0,80 px** y el ave a **0,24**, tres veces más fina; al lado de la
 * otra el ave se leía como un dibujo de otro juego.
 *
 * `vector-effect: non-scaling-stroke` saca el trazo de la transformación del
 * `viewBox`, así que este número es el que se ve, igual en los dos y a
 * cualquier ancho.
 *
 * Las regiones se extrajeron creciendo hasta tocarse, así que el límite entre
 * dos vecinas es una arista compartida: el trazo de cada una la pinta desde su
 * lado y los dos se superponen, de modo que la línea mide esto y no el doble.
 */
const GROSOR_DE_LINEA = 1.8;

/** Aire entre el puntero y el borde de abajo de la tarjeta. */
const AIRE = 12;

type Apuntado = { corte: string; x: number; y: number };

/**
 * La media res con sus dieciocho cortes: al apuntar uno, su región se pinta con
 * el bordó de la paleta y aparece una tarjeta con el nombre y la foto del corte.
 * El dibujo es el de la lámina que aportó el cliente, extraída región por región
 * —ver `res-vacuna.ts`, que cuenta cómo.
 *
 * **El dibujo no lleva los nombres escritos encima.** Los llevó: eran dieciocho
 * rótulos, varios girados y otros achicados para entrar, y aun así tres se
 * pasaban del borde de su región. Ahora el dibujo es sólo el dibujo.
 *
 * **La tarjeta sigue al puntero y va siempre por encima de él.** Va anclada al
 * mouse y no al centro de la región porque una región grande —el asado, el
 * vacío— tiene el centro lejos de donde está mirando el visitante. Nunca se
 * cuelga abajo ni se frena contra el borde de arriba: apuntando un corte del
 * lomo, la tarjeta se sale del alto del dibujo y se apoya sobre el texto de la
 * página. Eso es a propósito —la distancia al puntero tiene que ser siempre la
 * misma— y es la otra razón por la que la tarjeta vive fuera del contenedor que
 * se desplaza: ahí adentro el recorte vertical se la comería.
 *
 * **Vive fuera del contenedor que se desplaza**, y no es un detalle: ese
 * contenedor tiene `overflow-x`, y en CSS eso vuelve el eje vertical recortable
 * también, así que la tarjeta de un corte del lomo se cortaría por arriba.
 *
 * **Cada región es un control, no una zona que reacciona al puntero.** El nombre
 * está a la vista sólo mientras se apunta, así que sin esto no hay forma de
 * leerlo en una pantalla táctil ni por teclado: las regiones son tabulables, se
 * anuncian con su nombre y abren la tarjeta también al recibir el foco —ahí la
 * tarjeta se ancla al centroide, que es lo único que se sabe sin puntero—. Por
 * eso el `<svg>` **no lleva `role="img"`**: eso taparía a los controles de
 * adentro, y con ellos no hace falta una lista aparte para el lector de
 * pantalla.
 *
 * El anillo de foco no se dibuja: en SVG no se ve bien sobre un trazado
 * recortado, y acá el foco ya tiene dos señales propias que no dependen del
 * color solo —la región se pinta de bordó y se abre la tarjeta—.
 */
export default function DiagramaDeDespiece({
  despiece,
  nombre,
  etiqueta,
  anchoMinimo,
  className
}: DiagramaDeDespieceProps) {
  const { lienzo, silueta, regiones, centros, cortes } = despiece;
  const [LIENZO_X, LIENZO_Y, LIENZO_ANCHO, LIENZO_ALTO] = lienzo
    .split(' ')
    .map(Number);
  const caja = useRef<HTMLDivElement>(null);
  const [apuntado, setApuntado] = useState<Apuntado | null>(null);

  function desdeElPuntero(corte: string, evento: PointerEvent) {
    const marco = caja.current?.getBoundingClientRect();
    if (!marco) return;
    setApuntado({
      corte,
      x: evento.clientX - marco.left,
      y: evento.clientY - marco.top
    });
  }

  /** Sin puntero —teclado— el ancla es el centroide de la región. */
  function desdeElCentroide(corte: string, indice: number) {
    const marco = caja.current?.getBoundingClientRect();
    if (!marco) return;
    const [cx, cy] = centros[corte][indice];
    setApuntado({
      corte,
      x: ((cx - LIENZO_X) / LIENZO_ANCHO) * marco.width,
      y: ((cy - LIENZO_Y) / LIENZO_ALTO) * marco.height
    });
  }

  const region = (corte: string, d: string, indice: number) => (
    <path
      key={d}
      d={d}
      tabIndex={0}
      role="button"
      aria-label={nombre(corte)}
      onPointerEnter={(evento) => desdeElPuntero(corte, evento)}
      onPointerMove={(evento) => desdeElPuntero(corte, evento)}
      onPointerLeave={() =>
        setApuntado((previo) => (previo?.corte === corte ? null : previo))
      }
      onFocus={() => desdeElCentroide(corte, indice)}
      onBlur={() => setApuntado(null)}
      strokeWidth={GROSOR_DE_LINEA}
      vectorEffect="non-scaling-stroke"
      strokeLinejoin="round"
      className={clases(
        'cursor-pointer stroke-surface transition-colors duration-200 outline-none motion-reduce:transition-none',
        apuntado?.corte === corte ? 'fill-accent' : 'fill-ink'
      )}
    />
  );

  return (
    <div ref={caja} className={clases('relative', className)}>
      {/* El dibujo no se achica más allá de 48rem: abajo de eso las regiones
          chicas dejan de poder tocarse con el dedo. Se desplaza en su propio
          contenedor, así que la página no desborda; es enfocable y tiene nombre
          por lo mismo que la pista del carrusel. */}
      <div
        tabIndex={0}
        role="group"
        aria-label={etiqueta}
        className="overflow-x-auto"
      >
        <svg
          viewBox={lienzo}
          aria-label={etiqueta}
          className={clases('mx-auto w-full max-w-5xl', anchoMinimo)}
        >
          <path
            d={silueta}
            strokeWidth={GROSOR_DE_LINEA}
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
            className="fill-ink stroke-surface"
          />

          {cortes.map((corte) =>
            regiones[corte].map((d, indice) => region(corte, d, indice))
          )}
        </svg>
      </div>

      {apuntado && (
        <div
          aria-hidden
          className="pointer-events-none absolute z-10"
          style={{
            left: apuntado.x - ANCHO_DE_TARJETA / 2,
            top: apuntado.y - ALTO_DE_TARJETA - AIRE
          }}
        >
          <TarjetaDeCorte nombre={nombre(apuntado.corte)} />
        </div>
      )}
    </div>
  );
}
