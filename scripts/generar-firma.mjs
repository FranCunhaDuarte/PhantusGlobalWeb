import { readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

/**
 * La imagen de la firma de correo: el logotipo en crema sobre el azul de
 * sección, que es una de las combinaciones que admite el manual.
 *
 * Se publica en `public/brand/firma-email.png` para que tenga una URL fija
 * (`https://phantusglobal.com/brand/firma-email.png`): Gmail inserta la imagen
 * de la firma por dirección web y la vuelve a pedir en cada correo, así que si
 * la imagen cambia, cambia en todas las firmas sin tocarlas.
 *
 * **La firma la muestra a 192 × 142**, que es la medida que pidió Franco, y el
 * archivo sale a 4x para que en pantallas de alta densidad no se vea borroso.
 *
 * El logotipo va a 160 px de ancho en esa caja, y el número no es de gusto: el
 * manual pide 150 como mínimo y un aire de un tercio del alto del nombre
 * alrededor, que es el 6,4 % del ancho del logotipo por lado. Con 192 de caja,
 * el techo es 170; a 160 quedan 16 px por lado contra los 10 que pide.
 */
const RAIZ = path.resolve(import.meta.dirname, '..');
const ORIGEN = path.join(RAIZ, 'src', 'imagenes', 'marca', 'logotipo.svg');
const DESTINO = path.join(RAIZ, 'public', 'brand', 'firma-email.png');

const TINTA = '#0B1421';
const CREMA = '#F2ECE2';
const AZUL = '#162B4C';

/** Medidas en que se ve la firma; el archivo sale a `ESCALA` veces esto. */
const ANCHO_VISIBLE = 192;
const ALTO_VISIBLE = 142;
const LOGO_VISIBLE = 160;
const ESCALA = 4;

const ANCHO = ANCHO_VISIBLE * ESCALA;
const ALTO = ALTO_VISIBLE * ESCALA;
const ANCHO_DEL_LOGO = LOGO_VISIBLE * ESCALA;

const svg = await readFile(ORIGEN, 'utf8');
if (!svg.includes(`fill="${TINTA}"`)) {
  throw new Error(
    `${path.basename(ORIGEN)} no trae el relleno ${TINTA}: el recoloreo no alcanzaría al dibujo.`
  );
}

const logo = await sharp(Buffer.from(svg.replaceAll(`fill="${TINTA}"`, `fill="${CREMA}"`)), {
  density: 300
})
  .resize({ width: ANCHO_DEL_LOGO })
  .png()
  .toBuffer();

await sharp({
  create: { width: ANCHO, height: ALTO, channels: 3, background: AZUL }
})
  .composite([{ input: logo, gravity: 'center' }])
  .png({ compressionLevel: 9, palette: true })
  .toFile(DESTINO);

console.log(
  `Firma generada en ${path.relative(RAIZ, DESTINO)}: ${ANCHO} × ${ALTO}, se ve a ${ANCHO_VISIBLE} × ${ALTO_VISIBLE}.`
);
