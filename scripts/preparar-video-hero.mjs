import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { statSync } from 'node:fs';
import { argv } from 'node:process';

const require = createRequire(import.meta.url);
const ffmpeg = require('ffmpeg-static');

/**
 * Deja el video de fondo del hero listo para publicar. El material llega como
 * venga —medio minuto, decenas de megabytes— y el hero necesita un clip corto,
 * liviano, sin audio y que cierre en loop sin salto.
 *
 *   node scripts/preparar-video-hero.mjs <origen.mp4> <inicio en segundos>
 *
 * Los parámetros de salida son los del manual y no son de gusto:
 *
 * - **Sin pista de audio** (`-an`). El video es decorativo y va en `muted`; una
 *   pista que nadie va a oír es peso puro.
 * - **H.264 High + yuv420p.** Es lo que reproduce todo, incluido Safari en iOS,
 *   que con otros submuestreos se planta.
 * - **`+faststart`.** Mueve el índice al principio del archivo: sin eso el
 *   navegador tiene que bajar el archivo entero antes de mostrar un cuadro.
 * - **1920×1080 y nada más.** El velo negro al 58 % se come el detalle fino, así
 *   que subir de 1080p es pagar peso por nada.
 *
 * El techo de peso es lo que manda: **2,5 MB**, y la referencia 1,5. Se consigue
 * con dos pasadas a bitrate fijo en vez de CRF, porque lo que hay que garantizar
 * acá es el tamaño y no la calidad —con el velo encima, la calidad sobra—.
 */
const DURACION = 10;

/**
 * El loop no se resuelve con un corte sino con un fundido cruzado: el final se
 * mezcla con el principio, así que al reiniciar no hay salto.
 *
 * **Un corte limpio no alcanza en este material.** La cámara está fija y el
 * barco se mueve despacio, así que ahí el corte casi no se notaría; lo que no
 * perdona es la rompiente, que cambia por completo entre dos instantes
 * cualesquiera. Con el fundido, la espuma se disuelve en vez de saltar.
 *
 * El precio es que hay que traer `FUNDIDO` segundos de más del origen y que esos
 * segundos se ven mezclados. A 1,5 s sobre 10 es un octavo del clip y no se
 * percibe como una transición, que es exactamente lo que se busca.
 */
const FUNDIDO = 1.5;

const ANCHO = 1920;
const ALTO = 1080;
const CUADROS = 25;
const BITRATE = '1800k';
const TECHO_EN_MB = 2.5;

const DESTINO = 'public/video/hero.mp4';

const [, , origen, inicioCrudo] = argv;
const inicio = Number(inicioCrudo ?? 0);

if (!origen || Number.isNaN(inicio)) {
  console.error(
    'Uso: node scripts/preparar-video-hero.mjs <origen.mp4> <inicio en segundos>'
  );
  process.exit(1);
}

const correr = (args) =>
  execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], {
    stdio: 'inherit'
  });

/**
 * El filtro del fundido cruzado, que es la única parte que no se lee sola.
 *
 * `[0]` entra con `DURACION + FUNDIDO` segundos. Se parte en dos: `main` es el
 * clip desde `FUNDIDO` hasta el final —o sea los `DURACION` segundos que se
 * publican— y `jt` son los primeros `FUNDIDO` segundos, con el alfa entrando de
 * 0 a 1 y corridos al final del clip.
 *
 * El corrimiento es `DURACION - FUNDIDO`: ahí `main` está mostrando el final del
 * material y `jt` empieza a aparecer encima hasta quedar solo. Como el último
 * cuadro de `jt` es el primer cuadro de `main`, el clip cierra donde abre.
 */
const CRUCE = [
  '[0]split[body][pre]',
  `[pre]trim=duration=${FUNDIDO},format=yuva420p,fade=d=${FUNDIDO}:alpha=1,setpts=PTS+${DURACION - FUNDIDO}/TB[jt]`,
  `[body]trim=start=${FUNDIDO},setpts=PTS-STARTPTS[main]`,
  '[main][jt]overlay,format=yuv420p'
].join(';');

const COMUNES = [
  '-ss', String(inicio),
  '-t', String(DURACION + FUNDIDO),
  '-i', origen,
  '-filter_complex', CRUCE,
  '-r', String(CUADROS),
  '-s', `${ANCHO}x${ALTO}`,
  '-an',
  '-c:v', 'libx264',
  '-profile:v', 'high',
  '-pix_fmt', 'yuv420p',
  '-b:v', BITRATE,
  '-preset', 'veryslow'
];

const registro = 'public/video/.paso';

correr([...COMUNES, '-pass', '1', '-passlogfile', registro, '-f', 'null', '-']);
correr([...COMUNES, '-pass', '2', '-passlogfile', registro, '-movflags', '+faststart', DESTINO]);

const mb = statSync(DESTINO).size / 1024 / 1024;
console.log(`${DESTINO}  ${mb.toFixed(2)} MB  ${DURACION}s  ${ANCHO}x${ALTO}`);

if (mb > TECHO_EN_MB) {
  console.warn(
    `  aviso: pasa el techo de ${TECHO_EN_MB} MB. Bajá BITRATE y volvé a correr.`
  );
}
