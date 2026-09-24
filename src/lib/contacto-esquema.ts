import { z } from 'zod';
import { TIPOS_DE_CONSULTA } from '@/content/consulta';

export const CAMPOS_DE_CONTACTO = [
  'tipo',
  'mensaje',
  'nombre',
  'empresa',
  'pais',
  'email'
] as const;

export type CampoDeContacto = (typeof CAMPOS_DE_CONTACTO)[number];

/**
 * Viaja con el formulario pero no es un campo que alguien complete: es el
 * idioma en que se está navegando, para que el mail interno diga en qué hay
 * que contestar. No entra al esquema porque un valor raro no es un error del
 * visitante; el servidor lo valida contra `routing.locales` y sigue.
 */
export const CAMPO_IDIOMA = 'idioma';

/**
 * Los topes son del esquema, no del `maxlength` del input: el atributo frena a
 * quien escribe en el navegador y nada más. El servidor recorta acá para que
 * un mensaje de dos megas no llegue nunca al proveedor de correo.
 */
export const LARGO_MAXIMO = {
  nombre: 80,
  empresa: 80,
  pais: 56,
  email: 254,
  mensaje: 2000
} as const;

export const LARGO_MINIMO_DE_MENSAJE = 10;

/**
 * El mensaje de cada regla es una clave de `home.contacto.errores`, no un texto: el
 * esquema es uno solo y corre en los dos lados, así que no puede saber en qué
 * idioma está el visitante. Quien muestra el error lo traduce, y con eso el
 * error que calcula el cliente y el que devuelve el servidor son el mismo dato.
 */
const CLAVE = {
  nombreRequerido: 'nombre.requerido',
  nombreLargo: 'nombre.largo',
  emailRequerido: 'email.requerido',
  emailInvalido: 'email.invalido',
  emailLargo: 'email.largo',
  mensajeRequerido: 'mensaje.requerido',
  mensajeCorto: 'mensaje.corto',
  mensajeLargo: 'mensaje.largo',
  tipoRequerido: 'tipo.requerido',
  empresaLarga: 'empresa.largo',
  paisLargo: 'pais.largo'
} as const;

/**
 * Un valor que va a terminar en una cabecera de correo no puede traer saltos de
 * línea ni caracteres de control: con un `\r\n` en el nombre, el asunto deja de
 * ser un asunto y abre una cabecera nueva. Se colapsa todo el espacio en blanco
 * a un espacio simple y se tira el resto de los controles C0.
 */
const CONTROLES = /[\u0000-\u001f\u007f]/g;
const CONTROLES_SIN_SALTO = /[\u0000-\u0009\u000b-\u001f\u007f]/g;

function unaSolaLinea(valor: string) {
  return valor.replace(CONTROLES, ' ').replace(/\s+/g, ' ').trim();
}

/** El cuerpo sí conserva los saltos, pero normalizados y sin el resto de los controles. */
function variasLineas(valor: string) {
  return valor.replace(/\r\n?/g, '\n').replace(CONTROLES_SIN_SALTO, ' ').trim();
}

export const esquemaDeContacto = z.object({
  tipo: z.enum(TIPOS_DE_CONSULTA, CLAVE.tipoRequerido),
  mensaje: z
    .string(CLAVE.mensajeRequerido)
    .trim()
    .min(1, CLAVE.mensajeRequerido)
    .min(LARGO_MINIMO_DE_MENSAJE, CLAVE.mensajeCorto)
    .max(LARGO_MAXIMO.mensaje, CLAVE.mensajeLargo)
    .transform(variasLineas),
  nombre: z
    .string(CLAVE.nombreRequerido)
    .trim()
    .min(2, CLAVE.nombreRequerido)
    .max(LARGO_MAXIMO.nombre, CLAVE.nombreLargo)
    .transform(unaSolaLinea),
  /**
   * **Empresa y país son opcionales, y es una decisión.** El cliente los pidió
   * sin decir si son obligatorios; exigirlos le agrega dos trabas a la única
   * conversión del sitio y deja afuera a quien consulta a título personal. Sin
   * `min`, una cadena vacía pasa y llega al mail como ausente, que es lo que
   * hace que la fila no se dibuje.
   *
   * Llevan tope igual: el que decide cuánto entra es el esquema y no el
   * `maxlength` del input, que sólo frena a quien escribe en el navegador.
   */
  empresa: z
    .string()
    .trim()
    .max(LARGO_MAXIMO.empresa, CLAVE.empresaLarga)
    .transform(unaSolaLinea),
  pais: z
    .string()
    .trim()
    .max(LARGO_MAXIMO.pais, CLAVE.paisLargo)
    .transform(unaSolaLinea),
  email: z
    .string(CLAVE.emailRequerido)
    .trim()
    .min(1, CLAVE.emailRequerido)
    .max(LARGO_MAXIMO.email, CLAVE.emailLargo)
    .pipe(z.email(CLAVE.emailInvalido))
    .transform(unaSolaLinea)
});

export type ConsultaDeContacto = z.output<typeof esquemaDeContacto>;

export type ErroresDeContacto = Partial<Record<CampoDeContacto, string>>;

/**
 * Lo que llega puede no ser un formulario: la acción es una ruta POST como
 * cualquier otra y alguien la puede invocar a mano. Todo campo ausente o que no
 * sea texto entra como cadena vacía, así el esquema lo rechaza con una clave
 * propia en vez de con el mensaje por defecto de Zod, que no está traducido.
 */
export function datosDelFormulario(formulario: FormData) {
  const texto = (campo: string) => {
    const valor = formulario.get(campo);
    return typeof valor === 'string' ? valor : '';
  };

  return Object.fromEntries(
    CAMPOS_DE_CONTACTO.map((campo) => [campo, texto(campo)])
  ) as Record<CampoDeContacto, string>;
}

/** Un error por campo: el primero que reportó el esquema, que es el más específico. */
export function erroresDeContacto(error: z.ZodError): ErroresDeContacto {
  const errores: ErroresDeContacto = {};

  for (const falla of error.issues) {
    const campo = falla.path[0];
    if (typeof campo !== 'string') continue;
    const conocido = campo as CampoDeContacto;
    errores[conocido] ??= falla.message;
  }

  return errores;
}
