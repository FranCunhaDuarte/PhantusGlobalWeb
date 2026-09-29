import type { ConsultaDeContacto } from '@/lib/contacto-esquema';
import { nombreDeIdioma } from '@/lib/idiomas';
import marca from '@/lib/marca-assets.json';
import { SITIO } from '@/lib/sitio';

/**
 * Nada de lo que escribe el visitante puede llegar crudo ni a una cabecera del
 * mail ni a la plantilla HTML. El esquema ya limpia los controles al validar;
 * esto lo vuelve a hacer acá, que es el borde por donde el dato sale del
 * sistema, para que ningún camino futuro se saltee el paso.
 */
function sinSaltos(valor: string) {
  return valor.replace(/[\r\n]+/g, ' ').trim();
}

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

function escapar(valor: string) {
  return valor.replace(/[&<>"']/g, (caracter) => ESCAPES[caracter]);
}

/**
 * Outlook de escritorio no entiende `white-space: pre-wrap`, así que los saltos
 * del mensaje se vuelven `<br>` después de escapar, nunca antes.
 */
function conSaltos(valor: string) {
  return escapar(valor).replace(/\n/g, '<br>');
}

/**
 * Los tokens de `globals.css`, repetidos a mano: un cliente de correo no lee la
 * hoja del sitio ni variables CSS. Si la paleta cambia, cambia acá también.
 */
const COLOR = {
  surface: '#F2ECE2',
  surfaceRaised: '#FBF8F4',
  ink: '#0B1421',
  inkMuted: '#5A6A7E',
  inkInverse: '#F2ECE2',
  accent: '#64192E',
  linea: '#DDD4C6'
} as const;

/** Montserrat no se puede cargar en casi ningún cliente; queda primera para quien la tenga instalada. */
const FUENTE = "Montserrat,'Segoe UI',Helvetica,Arial,sans-serif";

/**
 * El logotipo va a 150 px, que es el mínimo de render del manual, y en crema
 * sobre la banda tinta, que es una de las combinaciones válidas. Tiene que ser
 * una URL absoluta: el correo se abre lejos del sitio.
 */
const LOGO = {
  src: `${SITIO.origen}${marca.logotipo.crema.src}`,
  ancho: 150,
  alto: Math.round((150 * marca.logotipo.crema.height) / marca.logotipo.crema.width)
};

/** Quien lee la casilla está en Mar del Plata: la hora de llegada va en la de ahí. */
const ZONA_HORARIA = 'America/Argentina/Buenos_Aires';

type Etiquetas = (clave: string, valores?: Record<string, string>) => string;

type ArmarMail = {
  datos: ConsultaDeContacto;
  /** En qué idioma está navegando quien consulta, para saber cómo contestarle. */
  idiomaDelVisitante: string;
  /** En qué idioma se lee la casilla: fija el formato de la fecha. */
  idiomaDeLaCasilla: string;
  recibida: Date;
  /** Traducciones bajo `home.contacto.mail`, en el idioma de la casilla. */
  t: Etiquetas;
};

export type MailDeConsulta = {
  asunto: string;
  texto: string;
  html: string;
  responderA: string;
};

export function armarMail({
  datos,
  idiomaDelVisitante,
  idiomaDeLaCasilla,
  recibida,
  t
}: ArmarMail): MailDeConsulta {
  const tipo = t(`tipos.${datos.tipo}`);
  const fecha = new Intl.DateTimeFormat(idiomaDeLaCasilla, {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: ZONA_HORARIA
  }).format(recibida);

  // Empresa y país siguen en el esquema aunque el formulario ya no los pida:
  // llegan vacíos y la fila no se dibuja.
  // El correo no va entre las filas: en el HTML ya está debajo del nombre, como
  // enlace, y repetido en la tabla se lee dos veces lo mismo.
  const todas: [string, string][] = [
    [t('campos.empresa'), datos.empresa],
    [t('campos.pais'), datos.pais],
    [t('campos.idioma'), nombreDeIdioma(idiomaDelVisitante)],
    [t('campos.recibida'), fecha]
  ];

  const filas = todas.filter(([, valor]) => valor !== '');

  const asunto = sinSaltos(t('asunto', { nombre: datos.nombre, tipo }));

  const texto = [
    `${t('campos.tipo')}: ${tipo}`,
    `${t('campos.nombre')}: ${datos.nombre}`,
    `${t('campos.email')}: ${datos.email}`,
    ...filas.map(([etiqueta, valor]) => `${etiqueta}: ${valor}`),
    '',
    `${t('campos.mensaje')}:`,
    datos.mensaje
  ].join('\n');

  const responder = `mailto:${datos.email}?subject=${encodeURIComponent(`Re: ${asunto}`)}`;

  // Lo que muestran las bandejas al lado del asunto. Sin esto, Gmail toma el
  // primer texto que encuentra, que sería el alt del logo.
  const preencabezado = sinSaltos(datos.mensaje).slice(0, 140);

  const rotulo = `font:600 11px/1.4 ${FUENTE};letter-spacing:.14em;text-transform:uppercase;color:${COLOR.inkMuted}`;

  const html = `<!doctype html>
<html lang="${escapar(idiomaDeLaCasilla)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${escapar(t('titulo'))}</title>
</head>
<body style="margin:0;padding:0;background:${COLOR.surface};-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${COLOR.surface}">${escapar(preencabezado)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${COLOR.surface}">
<tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:${COLOR.surfaceRaised};border:1px solid ${COLOR.linea}">

<tr><td style="background:${COLOR.ink};padding:28px 32px">
<img src="${escapar(LOGO.src)}" width="${LOGO.ancho}" height="${LOGO.alto}" alt="${escapar(t('logoAlt'))}" style="display:block;border:0;width:${LOGO.ancho}px;height:${LOGO.alto}px;font:600 18px ${FUENTE};color:${COLOR.inkInverse}">
</td></tr>
<tr><td style="height:4px;line-height:4px;font-size:0;background:${COLOR.accent}">&nbsp;</td></tr>

<tr><td style="padding:36px 32px 8px">
<p style="margin:0 0 14px;${rotulo}">${escapar(t('eyebrow'))}</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
<td style="background:${COLOR.accent};padding:6px 12px;font:600 12px/1.2 ${FUENTE};letter-spacing:.08em;text-transform:uppercase;color:${COLOR.inkInverse}">${escapar(tipo)}</td>
</tr></table>
<h1 style="margin:18px 0 6px;font:600 26px/1.25 ${FUENTE};color:${COLOR.ink}">${escapar(datos.nombre)}</h1>
<p style="margin:0;font:400 15px/1.5 ${FUENTE}"><a href="mailto:${escapar(datos.email)}" style="color:${COLOR.ink};text-decoration:underline">${escapar(datos.email)}</a></p>
</td></tr>

<tr><td style="padding:28px 32px 8px">
<p style="margin:0 0 10px;${rotulo}">${escapar(t('campos.mensaje'))}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td style="border-left:3px solid ${COLOR.accent};background:${COLOR.surface};padding:20px 22px;font:400 15px/1.65 ${FUENTE};color:${COLOR.ink}">${conSaltos(datos.mensaje)}</td>
</tr></table>
</td></tr>

<tr><td style="padding:28px 32px 8px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
${filas
  .map(
    ([etiqueta, valor]) =>
      `<tr><td style="padding:12px 0;border-top:1px solid ${COLOR.linea};width:38%;vertical-align:top;${rotulo}">${escapar(etiqueta)}</td><td style="padding:12px 0;border-top:1px solid ${COLOR.linea};vertical-align:top;font:400 14px/1.5 ${FUENTE};color:${COLOR.ink}">${escapar(valor)}</td></tr>`
  )
  .join('\n')}
</table>
</td></tr>

<tr><td style="padding:24px 32px 36px">
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
<td style="background:${COLOR.ink}"><a href="${escapar(responder)}" style="display:inline-block;padding:14px 24px;font:600 14px/1 ${FUENTE};letter-spacing:.04em;color:${COLOR.inkInverse};text-decoration:none">${escapar(t('responder', { nombre: datos.nombre }))}</a></td>
</tr></table></td></tr>

</table>
<p style="margin:20px 0 0;max-width:600px;font:400 12px/1.5 ${FUENTE};color:${COLOR.inkMuted}">${escapar(t('pie'))}</p>
</td></tr>
</table>
</body>
</html>`;

  return { asunto, texto, html, responderA: sinSaltos(datos.email) };
}
