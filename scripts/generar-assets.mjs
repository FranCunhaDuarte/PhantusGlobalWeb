import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

/**
 * **El origen son los SVG de marca, versionados en el repo.**
 *
 * Fueron dos PNG sueltos en `~/Downloads` —`PRINCIPIO-01.png` y
 * `PRINCIPIO-04.png`— y eso costó caro: desaparecieron, y los PNG publicados
 * hubo que reconstruirlos desde una variante de 384 px que `next/image` había
 * dejado en caché, así que el logotipo quedó ampliado unas tres veces desde su
 * fuente. Con el vectorial adentro del repo eso no puede repetirse y el tamaño
 * de publicación deja de tener techo.
 */
const RAIZ = path.resolve(import.meta.dirname, '..');
const ORIGEN = path.join(RAIZ, 'src', 'imagenes', 'marca');
const DESTINO_PUBLICO = path.join(RAIZ, 'public', 'brand');
const DESTINO_APP = path.join(RAIZ, 'src', 'app');
const MANIFIESTO = path.join(RAIZ, 'src', 'lib', 'marca-assets.json');

const TRANSPARENTE = { r: 0, g: 0, b: 0, alpha: 0 };

// Las únicas dos combinaciones que el manual admite: tinta sobre crema, y crema
// sobre cualquiera de los tres fondos oscuros. No hay logo azul ni bordó.
const VARIANTES = {
  tinta: { r: 0x0b, g: 0x14, b: 0x21 },
  crema: { r: 0xf2, g: 0xec, b: 0xe2 }
};

// `lado` es el lado mayor del recorte, no el ancho: el isotipo es más alto que
// ancho y encuadrarlo por ancho lo dejaría más grande que el resto.
//
// **`nombre.svg` no se publica**, aunque esté en el repo: es "Phantus" sin
// "Global", la tercera forma del manual, y hoy no la usa ningún componente.
// Cuando haga falta, se suma acá y a `FormaLogo` en `Logo.tsx`.
const FORMAS = {
  logotipo: { archivo: 'logotipo.svg', lado: 1200 },
  isotipo: { archivo: 'isotipo.svg', lado: 512 }
};

/** El relleno que traen los SVG, y el único que el guion sabe reemplazar. Es el
 *  token `ink` de la paleta. */
const TINTA = '#0B1421';

/**
 * A qué resolución se rasteriza antes de bajar al tamaño de publicación. El SVG
 * declara su medida en píxeles a 96 ppp, así que a 300 el logotipo sale en unos
 * 3900 px de ancho y de ahí se baja a 1200: **siempre se reduce, nunca se
 * amplía**, que es exactamente lo contrario de lo que pasaba con los PNG
 * reconstruidos.
 */
const DENSIDAD = 300;

function archivoOrigen(forma) {
  return path.join(ORIGEN, FORMAS[forma].archivo);
}

/**
 * El recoloreo se hace **sobre el SVG y no sobre los píxeles**, y eso se llevó
 * puesta media página de este guion.
 *
 * Antes había que comprobar que el PNG fuera un plano de color con el antialias
 * íntegramente en el canal alfa, y después pisar el RGB de cada píxel dejando el
 * alfa quieto; cualquier variación de tono en el original habría dejado un halo
 * del color viejo en los bordes. Cambiando el atributo `fill` en la raíz del
 * vectorial, cada variante se rasteriza ya en su color y el antialias sale bien
 * por construcción.
 *
 * Lo que sí hay que verificar es que el reemplazo alcance a todo el dibujo: un
 * solo `fill`, en la raíz, y sin `<style>` ni `class` que puedan pintar por
 * abajo. Si el cliente vuelve a exportar desde Illustrator con la hoja de
 * estilos adentro —que es como vinieron los tres archivos—, esto frena.
 */
async function leerOrigen(forma) {
  const archivo = archivoOrigen(forma);
  const nombre = path.basename(archivo);
  const svg = await readFile(archivo, 'utf8');

  const rellenos = [...svg.matchAll(/fill="([^"]*)"/gi)].map((m) => m[1]);
  if (rellenos.length !== 1) {
    throw new Error(
      `${nombre} declara ${rellenos.length} atributos fill y se esperaba 1. ` +
        'El recoloreo por reemplazo dejaría partes del dibujo en el color viejo.'
    );
  }
  if (rellenos[0].toUpperCase() !== TINTA) {
    throw new Error(
      `${nombre} viene en ${rellenos[0]} y se esperaba ${TINTA}. ` +
        'Revisá el export antes de seguir.'
    );
  }
  if (/<style[\s>]|\sclass=/i.test(svg)) {
    throw new Error(
      `${nombre} trae <style> o class: el color puede estar pintado desde la ` +
        'hoja y el reemplazo del atributo no llegaría. Exportá sin estilos.'
    );
  }

  const { width, height } = await sharp(Buffer.from(svg)).metadata();
  return { svg, width, height };
}

/** Pinta el dibujo entero de un color, en el vectorial. */
function pintar(svg, { r, g, b }) {
  const hex =
    '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
  return svg.replace(`fill="${TINTA}"`, `fill="${hex}"`);
}

/** Rasteriza una forma ya pintada, encuadrada a su lado mayor. */
function rasterizar(svg, lado) {
  return sharp(Buffer.from(svg), { density: DENSIDAD }).resize({
    width: lado,
    height: lado,
    fit: 'inside',
    background: TRANSPARENTE
  });
}

async function generarDerivado(svg, forma, variante) {
  const nombre = `${forma}-${variante}.png`;
  const { width, height } = await rasterizar(
    pintar(svg, VARIANTES[variante]),
    FORMAS[forma].lado
  )
    .png({ compressionLevel: 9, effort: 10 })
    .toFile(path.join(DESTINO_PUBLICO, nombre));

  return { src: `/brand/${nombre}`, width, height };
}

/** El isotipo es tinta sobre transparente: sobre la pestaña del navegador se
 *  perdería, así que los iconos van sobre el crema de marca. */
async function lienzoDeIcono(svgIsotipo, lado, proporcionContenido) {
  const ladoContenido = Math.round(lado * proporcionContenido);
  const isotipo = await rasterizar(
    pintar(svgIsotipo, VARIANTES.tinta),
    ladoContenido
  ).toBuffer();

  return sharp({
    create: {
      width: lado,
      height: lado,
      channels: 4,
      background: { ...VARIANTES.crema, alpha: 1 }
    }
  }).composite([{ input: isotipo, gravity: 'center' }]);
}

async function generarIconoPng(svgIsotipo, nombre, lado, proporcionContenido) {
  const lienzo = await lienzoDeIcono(svgIsotipo, lado, proporcionContenido);
  await lienzo
    .png({ compressionLevel: 9, effort: 10 })
    .toFile(path.join(DESTINO_APP, nombre));
}

/**
 * Un `.ico` es una tabla de directorio seguida de las imágenes; desde hace dos
 * décadas cada entrada puede ser un PNG entero en vez de un DIB, que es lo que
 * se arma acá. Hace falta el archivo real porque los navegadores piden
 * `/favicon.ico` a la raíz aunque el HTML declare `icon.png`.
 */
async function generarFaviconIco(svgIsotipo, lados) {
  const imagenes = await Promise.all(
    lados.map(async (lado) => ({
      lado,
      // El decodificador de ICO de Next exige PNG en RGBA: sin `palette: false`
      // sharp entrega uno indexado y el build falla al leer el icono.
      png: await (await lienzoDeIcono(svgIsotipo, lado, 0.72))
        .ensureAlpha()
        .png({ compressionLevel: 9, palette: false })
        .toBuffer()
    }))
  );

  const CABECERA = 6;
  const ENTRADA = 16;
  const directorio = Buffer.alloc(CABECERA + ENTRADA * imagenes.length);
  directorio.writeUInt16LE(0, 0);
  directorio.writeUInt16LE(1, 2);
  directorio.writeUInt16LE(imagenes.length, 4);

  let desplazamiento = directorio.length;
  imagenes.forEach(({ lado, png }, indice) => {
    const base = CABECERA + ENTRADA * indice;
    directorio.writeUInt8(lado >= 256 ? 0 : lado, base);
    directorio.writeUInt8(lado >= 256 ? 0 : lado, base + 1);
    directorio.writeUInt8(0, base + 2);
    directorio.writeUInt8(0, base + 3);
    directorio.writeUInt16LE(1, base + 4);
    directorio.writeUInt16LE(32, base + 6);
    directorio.writeUInt32LE(png.length, base + 8);
    directorio.writeUInt32LE(desplazamiento, base + 12);
    desplazamiento += png.length;
  });

  const ico = Buffer.concat([directorio, ...imagenes.map(({ png }) => png)]);
  await writeFile(path.join(DESTINO_APP, 'favicon.ico'), ico);
}

async function main() {
  await rm(DESTINO_PUBLICO, { recursive: true, force: true });
  await mkdir(DESTINO_PUBLICO, { recursive: true });

  const manifiesto = {};
  const fuentes = {};
  for (const forma of Object.keys(FORMAS)) {
    const { svg, width, height } = await leerOrigen(forma);
    fuentes[forma] = svg;
    console.log(
      `origen ok  ${FORMAS[forma].archivo} (${width}x${height}, un solo fill ${TINTA})`
    );

    manifiesto[forma] = {};
    for (const variante of Object.keys(VARIANTES)) {
      const derivado = await generarDerivado(svg, forma, variante);
      manifiesto[forma][variante] = derivado;
      console.log(`generado ${derivado.src} (${derivado.width}x${derivado.height})`);
    }
  }

  await generarIconoPng(fuentes.isotipo, 'icon.png', 512, 0.72);
  await generarIconoPng(fuentes.isotipo, 'apple-icon.png', 180, 0.72);
  await generarFaviconIco(fuentes.isotipo, [16, 32, 48]);
  console.log('generado src/app/icon.png, apple-icon.png y favicon.ico');

  await writeFile(MANIFIESTO, `${JSON.stringify(manifiesto, null, 2)}\n`, 'utf8');
  console.log(`generado ${path.relative(RAIZ, MANIFIESTO)}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
