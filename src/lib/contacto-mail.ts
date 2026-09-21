import type { ConsultaDeContacto } from '@/lib/contacto-esquema';
import { nombreDeIdioma } from '@/lib/idiomas';

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

type Etiquetas = (clave: string, valores?: Record<string, string>) => string;

type ArmarMail = {
  datos: ConsultaDeContacto;
  /** En qué idioma está navegando quien consulta, para saber cómo contestarle. */
  idiomaDelVisitante: string;
  /** Traducciones bajo `contacto.mail`, en el idioma de la casilla. */
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
  t
}: ArmarMail): MailDeConsulta {
  const todas: [string, string][] = [
    [t('campos.tipo'), t(`tipos.${datos.tipo}`)],
    [t('campos.nombre'), datos.nombre],
    [t('campos.email'), datos.email],
    [t('campos.idioma'), nombreDeIdioma(idiomaDelVisitante)]
  ];

  const filas = todas.filter(([, valor]) => valor !== '');

  const asunto = sinSaltos(
    t('asunto', { nombre: datos.nombre, tipo: t(`tipos.${datos.tipo}`) })
  );

  const texto = [
    ...filas.map(([etiqueta, valor]) => `${etiqueta}: ${valor}`),
    '',
    `${t('campos.mensaje')}:`,
    datos.mensaje
  ].join('\n');

  const html = [
    `<h1 style="font:600 18px system-ui,sans-serif">${escapar(t('titulo'))}</h1>`,
    '<table style="font:14px system-ui,sans-serif;border-collapse:collapse">',
    ...filas.map(
      ([etiqueta, valor]) =>
        `<tr><th align="left" style="padding:4px 16px 4px 0;vertical-align:top">${escapar(etiqueta)}</th><td style="padding:4px 0">${escapar(valor)}</td></tr>`
    ),
    '</table>',
    `<h2 style="font:600 14px system-ui,sans-serif">${escapar(t('campos.mensaje'))}</h2>`,
    `<p style="font:14px/1.6 system-ui,sans-serif;white-space:pre-wrap">${escapar(datos.mensaje)}</p>`
  ].join('');

  return { asunto, texto, html, responderA: sinSaltos(datos.email) };
}
