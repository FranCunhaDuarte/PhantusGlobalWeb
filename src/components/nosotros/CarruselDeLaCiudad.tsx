'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import costa from '@/imagenes/ciudad/costa.jpg';
import lanchas from '@/imagenes/ciudad/lanchas.jpg';
import puerto from '@/imagenes/ciudad/puerto.jpg';
import buque from '@/imagenes/ciudad/buque.jpg';
import { clases } from '@/lib/clases';

/**
 * Las cuatro fotos van por import estático, igual que las de tarjeta:
 * `next/image` saca de ahí el ancho y el alto sin que nadie los declare.
 *
 * **El orden abre por la costa y no por el puerto**, que es lo que estuvo
 * primero: la primera foto es la que se ve sin interactuar, y la costa con la
 * ciudad de fondo ubica antes de mostrar el oficio. De ahí se va cerrando —el
 * frente urbano, la flota amarrada, las lanchas, el buque saliendo—.
 */
const FOTOS = [
  { foto: costa, alt: 'costaAlt' },
  { foto: puerto, alt: 'puertoAlt' },
  { foto: lanchas, alt: 'lanchasAlt' },
  { foto: buque, alt: 'buqueAlt' }
] as const;

/** La foto ocupa la columna derecha: 7 de 12 del contenido a su tope, o sea
 *  unos 630 px a 1280 de viewport. Abajo de `md` va a ancho de pantalla. */
const MEDIDAS = ['(min-width: 48rem) 640px', '100vw'].join(', ');

/**
 * El alto de la tarjeta en escritorio. Lo pone la tarjeta y no el texto: con dos
 * renglones a la izquierda, la fila mediría lo que mide el texto y la foto
 * quedaría en una tira. Con esto, la foto manda y el texto se centra al lado.
 */
const ALTO = 'md:min-h-[38rem]';

/**
 * El sangrado izquierdo de la grilla, que es lo que alinea el texto con el resto
 * de la página. La tarjeta vive en una sección **sin `Container`**, así que la
 * foto llega sola al borde derecho y el que tiene que ponerse en su sitio es el
 * texto.
 *
 * La cuenta es la del contenedor: su relleno mientras la pantalla entra en el
 * tope del sitio, y la mitad de lo que sobra más el relleno cuando lo pasa. De
 * ahí el `max` contra `72rem`, que es `--container-sitio`. **Si cambia ese token
 * o el relleno de `Container`, cambia esto.**
 *
 * Va en porcentaje y no en `vw` a propósito: `100vw` incluye la barra de
 * desplazamiento y el ancho del contenedor no, así que con `vw` el texto queda
 * unos píxeles corrido del resto. Y va en la grilla y no en la celda del texto
 * porque **el porcentaje se mide contra el bloque contenedor**: en la grilla eso
 * es la sección entera, que es lo que hace falta; en la celda sería su columna.
 */
const SANGRADO = 'ps-5 sm:ps-[max(2rem,calc((100%-72rem)/2+2rem))]';

const ESPERA = 5000;
const QUIETUD = '(prefers-reduced-motion: reduce)';

/**
 * Mar del Plata en una tarjeta que pasa sola: el texto a la izquierda y la foto
 * ocupando entera la mitad derecha, de borde a borde y de arriba abajo.
 *
 * **Las fotos son el argumento**, no la decoración: la página dice que la empresa
 * está en el principal puerto pesquero del país y hasta acá eso era sólo una
 * frase. Fueron tres fotos chicas en fila —355 px cada una— y se veían como
 * material de relleno.
 *
 * **Las tres están montadas siempre y lo que cambia es la opacidad.** No se
 * desmonta ni se cambia el `src`: así no hay salto de layout, no hay un cuadro en
 * blanco mientras baja la siguiente y el cruce es un fundido y no un corte. El
 * precio son tres imágenes en la primera carga.
 *
 * **Se puede parar, y hace falta que se pueda.** Una pieza que se mueve sola,
 * dura más de cinco segundos y convive con texto necesita un modo de frenarla:
 * es el criterio 2.2.2 de WCAG. Hubo un botón de pausa y se sacó por pedido, así
 * que el freno quedó repartido en tres gestos que no dibujan nada:
 *
 * - **al apuntar con el mouse** y **al entrar el foco por teclado** —si alguien
 *   está por pulsar un tramo, la foto no puede cambiarle abajo—, y
 * - **al elegir una foto**, que además lo deja frenado para siempre: quien tocó
 *   el indicador dijo cuál quiere mirar, y seguir pasando sería desobedecerlo.
 *
 * Ese último es el que cubre el criterio sin un control aparte, porque se llega
 * a él con mouse y con teclado.
 *
 * **Con `prefers-reduced-motion` no arranca.** Es la misma regla del video del
 * hero: lo que decide la preferencia no es el estilo sino el comportamiento, así
 * que no se puede resolver desde CSS.
 *
 * **Sólo la foto visible se anuncia.** Las otras dos van `aria-hidden`: un lector
 * de pantalla que leyera las tres descripciones de corrido diría que hay tres
 * imágenes donde se ve una.
 */
export default function CarruselDeLaCiudad({
  className
}: {
  className?: string;
}) {
  const t = useTranslations('nosotros.ciudad');
  const [actual, setActual] = useState(0);
  const [elegidoAMano, setElegidoAMano] = useState(false);
  const [quietud, setQuietud] = useState(true);
  const [detenidoAlMirar, setDetenidoAlMirar] = useState(false);
  const caja = useRef<HTMLDivElement>(null);

  // La preferencia se lee después de hidratar. Arranca en `true` para que el
  // servidor y el primer pintado del cliente coincidan: sin eso, quien pidió
  // quietud ve el pase arrancar por un cuadro antes de que se apague.
  useEffect(() => {
    const consulta = window.matchMedia(QUIETUD);
    const evaluar = () => setQuietud(consulta.matches);
    evaluar();
    consulta.addEventListener('change', evaluar);
    return () => consulta.removeEventListener('change', evaluar);
  }, []);

  const corriendo = !elegidoAMano && !quietud && !detenidoAlMirar;

  useEffect(() => {
    if (!corriendo) return;
    const reloj = setInterval(
      () => setActual((i) => (i + 1) % FOTOS.length),
      ESPERA
    );
    return () => clearInterval(reloj);
  }, [corriendo]);

  return (
    /* Sin fondo propio: la tarjeta deja ver el crema elevado de la sección, que
       es el tono más claro de la paleta. Fue un `Panel` en crema base y eso la
       recortaba contra la sección; sin él, lo único que la dibuja es la foto.

       Sacarlo no toca ningún color: crema y crema elevado resuelven el mismo
       `--fondo-texto`, así que el titular y la bajada se leen igual. Lo que se
       pierde es el `data-fondo` propio, y no hacía falta: adentro no hay nada
       que deduzca su variante del fondo. */
    <div
      className={clases(
        'grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]',
        SANGRADO,
        ALTO,
        className
      )}
    >
      {/* El texto se centra contra el alto de la foto. **Sin relleno a la
          izquierda**: ese lado lo pone el sangrado de la grilla, que es lo que
          lo deja alineado con el resto de la página. */}
      <div className="flex flex-col items-start gap-5 py-10 pe-8 md:justify-center md:pe-14">
        {/* La línea de arriba ancla el bloque: sin ella, el texto flota en el
            medio de una columna alta y no se lee como el arranque de nada. Es la
            misma hairline del valor de marca y del extremo de alcance. */}
        <span
          aria-hidden
          className="block h-px w-16 bg-(--fondo-linea)"
        />
        {/* Sin `Destacado`, como los titulares de la apertura y de contacto.
            Volver a ponerlo es envolver la palabra en `<destacado>` dentro de
            la clave, y entonces esto tiene que pasar de `t` a `t.rich`. */}
        <h2 className="text-titulo">{t('titulo')}</h2>
        {/* Tope de medida propio: la columna llega a 527 px en pantalla ancha y
            un párrafo de ese largo al lado de una foto se lee como un bloque de
            documento. Con el tope, la línea queda en unas diez palabras. */}
        <p className="max-w-sm text-entrada text-balance">{t('texto')}</p>
      </div>

      <div
        ref={caja}
        role="group"
        aria-label={t('etiqueta')}
        onPointerEnter={(evento) => {
          if (evento.pointerType === 'mouse') setDetenidoAlMirar(true);
        }}
        onPointerLeave={(evento) => {
          if (evento.pointerType === 'mouse') setDetenidoAlMirar(false);
        }}
        onFocus={() => setDetenidoAlMirar(true)}
        onBlur={(evento) => {
          if (!caja.current?.contains(evento.relatedTarget as Node | null)) {
            setDetenidoAlMirar(false);
          }
        }}
        // Abajo de `md` la foto necesita alto propio; desde ahí lo toma de la
        // fila, que es lo que la hace llegar de arriba abajo.
        //
        // La foto llega al borde derecho sin hacer nada: la sección no tiene
        // `Container`, así que la columna termina donde termina la pantalla.
        //
        // **En el teléfono se sale del sangrado de la grilla.** Ahí la grilla es
        // una sola columna, y sin este tirón la foto quedaría con 20 px de aire
        // a la izquierda y cero a la derecha. Desde `md` el sangrado es problema
        // de la columna del texto y acá no hace falta.
        //
        // **Sin `w-full`**: con el ancho fijo en el 100 % de la columna, el
        // tirón de la izquierda no la ensancha y la foto termina corta del lado
        // derecho. En `auto`, la celda se estira sola hasta su columna menos los
        // márgenes, y con el margen en negativo eso es la columna más el
        // sangrado.
        className={clases(
          'relative isolate aspect-[4/3] md:aspect-auto md:h-full',
          '-ms-5 sm:-ms-8 md:ms-0'
        )}
      >
        {FOTOS.map(({ foto, alt }, i) => (
          <Image
            key={alt}
            src={foto}
            alt={i === actual ? t(alt) : ''}
            aria-hidden={i === actual ? undefined : true}
            sizes={MEDIDAS}
            placeholder="blur"
            priority={i === 0}
            className={clases(
              'absolute inset-0 size-full object-cover transition-opacity duration-700 motion-reduce:transition-none',
              i === actual ? 'opacity-100' : 'opacity-0'
            )}
          />
        ))}

        <Indicador
          actual={actual}
          etiqueta={(i) => t('irA', { numero: i + 1, total: FOTOS.length })}
          alElegir={(i) => {
            setActual(i);
            setElegidoAMano(true);
          }}
        />
      </div>
    </div>
  );
}

/**
 * Tres tramos al pie de la foto, uno por imagen, repartiéndose el ancho entero.
 * Sin fondo detrás: se apoyan directo sobre la foto y lo que los distingue es la
 * opacidad —el vigente bastante más opaco que los otros dos—.
 *
 * **La diferencia de opacidad es la única señal visual, y sobre una foto
 * cualquiera eso es frágil**: contra un cielo blanco los tres tramos en crema se
 * parecen. Por eso cada tramo lleva `aria-current`, que es lo que dice cuál está
 * activo sin depender de que se vea. Si alguna vez hace falta que se vea siempre,
 * lo que hay que traer de vuelta es un fondo propio.
 *
 * **El botón es más alto que la barra que se ve.** La barra mide 4 px y un
 * control de 4 px de alto no se puede tocar con el dedo: el relleno vertical lo
 * lleva a 24 px, que es el mínimo de área de toque, y la barra va adentro como
 * un `span`.
 */
function Indicador({
  actual,
  etiqueta,
  alElegir
}: {
  actual: number;
  etiqueta: (i: number) => string;
  alElegir: (i: number) => void;
}) {
  return (
    <ul className="absolute inset-x-0 bottom-0 z-10 flex gap-1.5 px-3">
      {FOTOS.map(({ alt }, i) => (
        <li key={alt} className="flex flex-1">
          <button
            type="button"
            onClick={() => alElegir(i)}
            aria-current={i === actual}
            aria-label={etiqueta(i)}
            className="group w-full cursor-pointer py-2.5"
          >
            <span
              className={clases(
                'block h-1 w-full bg-surface transition-opacity duration-300 motion-reduce:transition-none',
                i === actual
                  ? 'opacity-90'
                  : 'opacity-30 group-hover:opacity-60'
              )}
            />
          </button>
        </li>
      ))}
    </ul>
  );
}
