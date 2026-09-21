import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { chromium } from 'playwright-core';

/**
 * Genera la imagen social de cada idioma como PNG estático en `public/og`.
 *
 * La tarjeta se dibuja en el navegador, apoyada sobre una página del propio
 * sitio: de ahí sale Montserrat ya cargada por `next/font` y los tokens de
 * `globals.css`, así que la pieza usa la tipografía y la paleta reales y no una
 * aproximación. `next/font` sólo emite WOFF2 y satori —el motor
 * de `ImageResponse`— no lo lee, así que el camino de generar en build obligaba
 * a meter los TTF a mano o a caer en una fuente del sistema, que no es la marca.
 *
 * El resultado es un archivo quieto: en producción no se genera nada.
 *
 * Uso: `npm run assets:og` con el sitio levantado (`PHANTUS_OG_URL`, por
 * defecto el dev server en el 3001).
 */
const RAIZ = path.resolve(import.meta.dirname, '..');
const DESTINO = path.join(RAIZ, 'public', 'og');
const ORIGEN = process.env.PHANTUS_OG_URL ?? 'http://localhost:3001';

export const MEDIDA_OG = { ancho: 1200, alto: 630 };

const IDIOMAS = ['es', 'en'];

async function textos(idioma) {
  const mensajes = JSON.parse(
    await readFile(path.join(RAIZ, 'src', 'messages', `${idioma}.json`), 'utf8')
  );
  return {
    descriptor: mensajes.home.hero.eyebrow,
    ubicacion: mensajes.pie.ubicacion
  };
}

const HOJA = `
  .og {
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;
    width: ${MEDIDA_OG.ancho}px;
    height: ${MEDIDA_OG.alto}px;
    background: var(--color-ink);
    color: var(--color-ink-inverse);
    font-family: var(--font-body);
  }
  /* El isotipo de marca de agua: el manual lo habilita para este uso, y es lo
     que le pone el elefante a la pieza sin repetir el logotipo dos veces.
     Entero y no sangrado por el borde: recortado deja de leerse como la P y
     pasa a ser una mancha. */
  .og-marca {
    position: absolute;
    top: 50%;
    right: 74px;
    height: 428px;
    transform: translateY(-50%);
    opacity: 0.11;
  }
  .og-cuerpo {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 34px;
    padding: 0 80px;
    width: 700px;
  }
  .og-logo { width: 344px; }
  .og-descriptor {
    margin: 0;
    font-size: 52px;
    font-weight: 600;
    line-height: 1.12;
    letter-spacing: -0.02em;
  }
  .og-ubicacion {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 18px;
    font-size: 21px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--color-ink-inverse-muted);
  }
  .og-ubicacion::before {
    content: '';
    width: 56px;
    height: 2px;
    background: currentColor;
  }
`;

function tarjeta({ descriptor, ubicacion }) {
  return `
    <div class="og">
      <img class="og-marca" src="/brand/isotipo-crema.png" alt="">
      <div class="og-cuerpo">
        <img class="og-logo" src="/brand/logotipo-crema.png" alt="">
        <p class="og-descriptor">${descriptor}</p>
        <p class="og-ubicacion">${ubicacion}</p>
      </div>
    </div>
  `;
}

function documento({ clases, hojas }, cuerpo) {
  return `<!doctype html>
<html class="${clases}">
  <head>
    <meta charset="utf-8">
    ${hojas.map((href) => `<link rel="stylesheet" href="${href}">`).join('\n    ')}
    <style>html,body{margin:0}${HOJA}</style>
  </head>
  <body>${cuerpo}</body>
</html>`;
}

async function generar(pagina) {
  const manifiesto = {};
  for (const idioma of IDIOMAS) {
    // `load` y no `networkidle`: el dev server deja abierto el canal de HMR y
    // la red nunca queda quieta.
    const respuesta = await pagina.goto(`${ORIGEN}/${idioma}`, {
      waitUntil: 'load'
    });
    if (!respuesta?.ok()) {
      throw new Error(
        `${ORIGEN}/${idioma} respondió ${respuesta?.status()}. ` +
          'Levantá el sitio o pasá PHANTUS_OG_URL.'
      );
    }

    // De la página real se toman dos cosas: sus hojas de estilo —donde viven
    // los `@font-face` que `next/font` sirve desde el propio origen— y las
    // clases que ponen las variables de fuente en el `<html>`.
    const armazon = await pagina.evaluate(() => ({
      clases: document.documentElement.className,
      hojas: [...document.querySelectorAll('link[rel="stylesheet"]')].map(
        (enlace) => enlace.href
      )
    }));

    // Se reemplaza el documento entero en vez de inyectar dentro del que hay:
    // React sigue montado y vuelve a pintar encima de cualquier cosa que se le
    // cuelgue al `<body>`. Pisar el documento se lleva puesta la aplicación y
    // deja la tarjeta sola, sobre el mismo origen, así que las rutas de los
    // assets de marca y de las fuentes siguen resolviendo.
    await pagina.setContent(
      documento(armazon, tarjeta(await textos(idioma))),
      { waitUntil: 'load' }
    );

    await pagina.evaluate(async () => {
      // Sin esperar a la familia concreta, el primer pintado sale con la fuente
      // de reserva y la tarjeta queda con otra letra. El nombre de la familia
      // lo genera `next/font` con un hash, así que se lee del elemento en vez
      // de escribirse.
      const descriptor = document.querySelector('.og-descriptor');
      await document.fonts.load(
        `600 58px ${getComputedStyle(descriptor).fontFamily}`
      );
      await document.fonts.ready;
      await Promise.all(
        [...document.images].map((img) => (img.complete ? null : img.decode()))
      );
    });

    const archivo = path.join(DESTINO, `${idioma}.png`);
    await pagina.locator('.og').screenshot({ path: archivo });
    manifiesto[idioma] = `/og/${idioma}.png`;
    console.log(`generado /og/${idioma}.png (${MEDIDA_OG.ancho}x${MEDIDA_OG.alto})`);
  }
  return manifiesto;
}

async function main() {
  await mkdir(DESTINO, { recursive: true });

  const navegador = await chromium.launch({ channel: 'msedge' });
  let manifiesto;
  try {
    const pagina = await navegador.newPage({
      viewport: { width: MEDIDA_OG.ancho, height: MEDIDA_OG.alto },
      deviceScaleFactor: 1
    });
    // Sin tope explícito, un origen que no responde deja el proceso colgado con
    // el navegador abierto y sin decir nada.
    pagina.setDefaultTimeout(30_000);
    manifiesto = await generar(pagina);
  } finally {
    await navegador.close();
  }

  await writeFile(
    path.join(RAIZ, 'src', 'lib', 'og-assets.json'),
    `${JSON.stringify({ medida: MEDIDA_OG, imagenes: manifiesto }, null, 2)}\n`,
    'utf8'
  );
  console.log('generado src/lib/og-assets.json');
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
