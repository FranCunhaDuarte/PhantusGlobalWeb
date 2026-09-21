import { createRequire } from 'node:module';
import { argv } from 'node:process';

const sharp = createRequire(import.meta.url)('sharp');

/**
 * Normaliza las fotos de corte para la tarjeta del diagrama de carnes. Los
 * originales llegan como fotos de producto: JPG vertical, el corte al medio y
 * fondo blanco de estudio. La tarjeta los apoya sobre el crema, así que el
 * blanco tiene que irse; y todos tienen que ocupar su hueco igual, o en la misma
 * tarjeta un lomo largo y un cuadril compacto se leen a escalas distintas.
 *
 *   node scripts/preparar-cortes.mjs <origen.jpg> <nombre-del-corte>
 *
 * **El fondo se quita por inundación desde el borde, no por umbral global.** Un
 * umbral de blanco se comería la grasa: la tapa del cuadril y la del bife son
 * casi tan claras como el fondo. Inundando desde los bordes sólo se va el blanco
 * que rodea al corte, y lo que está adentro se queda aunque sea igual de claro.
 *
 * Los archivos van con el nombre del corte en castellano, que es como se nombra
 * el dominio y como los manda el frigorífico.
 */
const ANCHO = 900;
const ALTO = 675;
const AIRE = 50;

/** Qué tan claro tiene que ser un píxel del borde para contarlo como fondo. */
const BLANCO = 238;

const [, , origen, nombre] = argv;

if (!origen || !nombre) {
  console.error('Uso: node scripts/preparar-cortes.mjs <origen.jpg> <nombre>');
  process.exit(1);
}

const { data, info } = await sharp(origen)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const an = info.width;
const al = info.height;
const canales = info.channels;

const fondo = new Uint8Array(an * al);
const pila = new Int32Array(an * al);
let tope = 0;

const esClaro = (p) => {
  const i = p * canales;
  return data[i] >= BLANCO && data[i + 1] >= BLANCO && data[i + 2] >= BLANCO;
};

const sembrar = (p) => {
  if (fondo[p] || !esClaro(p)) return;
  fondo[p] = 1;
  pila[tope++] = p;
};

for (let x = 0; x < an; x++) {
  sembrar(x);
  sembrar((al - 1) * an + x);
}
for (let y = 0; y < al; y++) {
  sembrar(y * an);
  sembrar(y * an + an - 1);
}

while (tope) {
  const p = pila[--tope];
  const x = p % an;
  const y = (p - x) / an;
  if (x > 0) sembrar(p - 1);
  if (x < an - 1) sembrar(p + 1);
  if (y > 0) sembrar(p - an);
  if (y < al - 1) sembrar(p + an);
}

let quitados = 0;
for (let p = 0; p < fondo.length; p++) {
  if (!fondo[p]) continue;
  data[p * canales + 3] = 0;
  quitados++;
}

const sinFondo = await sharp(data, { raw: { width: an, height: al, channels: canales } })
  .png()
  .toBuffer();

const recortado = await sharp(sinFondo).trim({ threshold: 1 }).toBuffer();
const recorte = await sharp(recortado).metadata();

if (recorte.width < 448) {
  console.warn(
    `  aviso: el corte mide ${recorte.width}px de ancho. La tarjeta llega a ` +
      '224 px de render, o sea 448 en pantalla de densidad doble: va a verse blando.'
  );
}

const sujeto = await sharp(recortado)
  .resize(ANCHO - AIRE * 2, ALTO - AIRE * 2, { fit: 'inside' })
  .toBuffer();

await sharp({
  create: {
    width: ANCHO,
    height: ALTO,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 }
  }
})
  .composite([{ input: sujeto, gravity: 'center' }])
  .png({ compressionLevel: 9 })
  .toFile(`src/imagenes/cortes/${nombre}.png`);

console.log(
  `${nombre}.png — fondo quitado ${((100 * quitados) / (an * al)).toFixed(0)}%, ` +
    `corte de ${recorte.width}x${recorte.height}`
);
