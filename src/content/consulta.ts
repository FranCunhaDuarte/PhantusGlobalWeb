import { SECCION_CONTACTO } from '@/content/secciones';

/**
 * Qué viene a preguntar quien entra. El hero y los cierres de cada subpágina lo
 * llevan al formulario en la query (`/es?consulta=compra#contacto`). El
 * formulario lo lee del lado del cliente para preseleccionar; si el parámetro
 * falta o trae cualquier otra cosa, arranca sin preselección y la página sigue
 * siendo estática.
 *
 * **Fueron tres, bajaron a dos y volvieron a ser tres.** `venta` —el exportador
 * argentino— se había sacado porque el sitio le hablaba a un solo público, el
 * importador; el cliente lo pidió de vuelta, así que el formulario vuelve a
 * tener las dos puntas. **Lo que no cambió es a quién le habla el resto del
 * sitio**: los titulares y las bajadas siguen escritos para el importador, y
 * ahora hay una opción del formulario que no tiene arriba ningún texto que la
 * invite. Es una asimetría a mirar, no un error.
 *
 * **Las tres viajan por la URL**, y eso importa: `compra` la ponen el hero y los
 * cuatro cierres, `otro` la pone el pie de las condiciones de operación, y
 * `venta` **no la enlaza nadie todavía** —el contrato la acepta y está lista
 * para cuando algún texto le hable al exportador—.
 */
export const TIPOS_DE_CONSULTA = ['compra', 'venta', 'otro'] as const;

export type TipoDeConsulta = (typeof TIPOS_DE_CONSULTA)[number];

export const PARAMETRO_CONSULTA = 'consulta';

export function esTipoDeConsulta(valor: unknown): valor is TipoDeConsulta {
  return TIPOS_DE_CONSULTA.includes(valor as TipoDeConsulta);
}

export function enlaceDeConsulta(tipo: TipoDeConsulta) {
  return {
    pathname: '/',
    query: { consulta: tipo },
    hash: SECCION_CONTACTO
  } as const;
}
