'use client';

import { useEffect, useState } from 'react';

/**
 * Ruta del video de fondo dentro de `public`. Mientras sea `null` el hero se
 * queda con el póster, que es exactamente lo que ve quien tiene el video
 * bloqueado o pide quietud.
 *
 * El archivo lo prepara `scripts/preparar-video-hero.mjs`, que es donde están
 * escritos los porqués de cada parámetro: 10 s, 1920×1080, H.264 High, yuv420p,
 * sin pista de audio, `+faststart` y **2,16 MB**, contra el techo de 2,5. Cierra
 * en loop por fundido cruzado y no por corte, porque la rompiente cambia por
 * completo entre dos instantes cualesquiera y un corte se vería.
 */
const FUENTE: string | null = '/video/hero.mp4';

const QUIETUD = '(prefers-reduced-motion: reduce)';

/**
 * Capa de movimiento del hero. Se monta **después** de hidratar y sólo si el
 * visitante no pidió quietud: `autoplay` es un atributo, así que la preferencia
 * no se puede respetar desde CSS y lo que se decide no es si reproduce sino si
 * el elemento existe. Con la preferencia activa no hay ni pedido de red.
 *
 * No lleva `poster`: ese atributo toma una URL cruda, se saltearía el
 * optimizador de `next/image` y bajaría una segunda copia de la misma foto. El
 * póster es la capa de abajo, que ya está pintada cuando esto aparece.
 */
export default function VideoDelHero({ className }: { className?: string }) {
  const [reproducir, setReproducir] = useState(false);

  useEffect(() => {
    if (!FUENTE) return;

    const consulta = window.matchMedia(QUIETUD);
    const evaluar = () => setReproducir(!consulta.matches);
    evaluar();
    consulta.addEventListener('change', evaluar);
    return () => consulta.removeEventListener('change', evaluar);
  }, []);

  if (!FUENTE || !reproducir) return null;

  return (
    <video
      src={FUENTE}
      autoPlay
      muted
      loop
      playsInline
      // Decorativo: no lo anuncia un lector de pantalla y no entra al orden de
      // foco ni aunque alguna vez se le pongan controles.
      aria-hidden="true"
      tabIndex={-1}
      className={className}
    />
  );
}
