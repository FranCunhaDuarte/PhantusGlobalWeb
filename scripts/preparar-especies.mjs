import { createRequire } from 'node:module';
import { statSync } from 'node:fs';
import { argv } from 'node:process';

const sharp = createRequire(import.meta.url)('sharp');

/**
 * Normaliza los recortes de especie. Los originales llegan como venga —cuadrados,
 * con margen transparente de sobra y de cualquier peso— y el catálogo necesita que
 * todos ocupen su hueco igual: si un pescado largo y un calamar compacto entran
 * con lienzos distintos, en la misma grilla se leen a escalas distintas.
 *
 * Recorta el margen transparente, centra el sujeto en 1200×800 —el 3:2 que declara
 * el hueco de la ficha— y recomprime. El alfa se conserva: es lo que deja el
 * recorte apoyado sobre el crema en lugar de metido en una caja.
 *
 *   node scripts/preparar-especies.mjs <origen.png> <nombre-en-ingles>
 *
 * Los archivos van con el nombre de la especie en inglés (`hake`, `croaker`,
 * `squid`, `shrimp`): son material que se intercambia con proveedores y
 * fotógrafos, y ahí viaja mejor.
 */
/**
 * El lienzo es **4:3, el mismo del hueco**. Fue 3:2 y era un error: el hueco lo
 * declara `HuecoDeImagen` en 4:3 y `FUENTES.md` pide 4:3 a quien mande material.
 * Con la imagen en 3:2, `object-contain` la encajaba por ancho y dejaba una
 * banda muerta arriba y abajo que nadie había pedido.
 */
const ANCHO = 1200;
const ALTO = 900;

/**
 * La caja del sujeto, **en la misma proporción que usa `preparar-cortes.mjs`**:
 * 89 % del ancho y 85 % del alto del lienzo. No es un número elegido acá sino el
 * de allá, y es a propósito.
 *
 * El motivo: los dos carruseles de la home miden exactamente lo mismo —252 px
 * por ítem, verificado en el navegador— pero uno al lado del otro el de pescados
 * se leía más grande, y eso se reportó como "más alto". La causa era que cada
 * guion componía con su propia cuenta: un pescado llenaba el 90 % del alto de su
 * baldosa y un corte, que es una lonja chata, el 41 %. Con la misma regla, el
 * pescado queda tan ancho como un bife y la diferencia de alto pasa a ser la que
 * impone la forma del bicho, que es la única que no se puede sacar: una merluza
 * no va a ocupar nunca lo mismo que un bife angosto.
 *
 * **Si se cambia el aire de un guion hay que cambiar el del otro**, o los dos
 * carruseles vuelven a leerse distinto.
 */
const CAJA_ANCHO = Math.round(ANCHO * (800 / 900));
const CAJA_ALTO = Math.round(ALTO * (575 / 675));

const [, , origen, nombre] = argv;

if (!origen || !nombre) {
  console.error('Uso: node scripts/preparar-especies.mjs <origen.png> <nombre>');
  process.exit(1);
}

const entrada = sharp(origen);
const { hasAlpha } = await entrada.metadata();

if (!hasAlpha) {
  console.error(
    `${origen} no tiene canal alfa. El recorte se apoya sobre el crema de la ` +
      'ficha: sin transparencia queda una caja blanca encima del fondo.'
  );
  process.exit(1);
}

const recortado = await entrada.trim({ threshold: 1 }).toBuffer();
const recorte = await sharp(recortado).metadata();

// El hueco de la ficha llega a 438 px de render, o sea 876 en pantalla de
// densidad doble. Por debajo de eso el recorte se agranda para que no quede
// diminuto al lado de los otros, y eso se paga en nitidez: conviene saberlo en
// vez de descubrirlo en la pantalla de alguien.
if (recorte.width < 876) {
  const veces = (CAJA_ANCHO / recorte.width).toFixed(1);
  console.warn(
    `  aviso: el recorte mide ${recorte.width}px y se agranda ${veces}x. ` +
      'Va a verse blando en pantalla de densidad doble; pedí el original más grande.'
  );
}
const sujeto = await sharp(recortado)
  .resize(CAJA_ANCHO, CAJA_ALTO, { fit: 'inside' })
  .toBuffer();

const destino = `src/imagenes/especies/${nombre}.png`;
const info = await sharp({
  create: {
    width: ANCHO,
    height: ALTO,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 }
  }
})
  .composite([{ input: sujeto, gravity: 'center' }])
  .png({ compressionLevel: 9, palette: true, quality: 90 })
  .toFile(destino);

const antes = Math.round(statSync(origen).size / 1024);
const ahora = Math.round(info.size / 1024);
console.log(`${destino}  ${info.width}x${info.height}  ${ahora} kB (antes ${antes} kB)`);
