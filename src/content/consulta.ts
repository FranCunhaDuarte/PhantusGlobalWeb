import { SECCION_CONTACTO } from '@/content/secciones';

/**
 * Qué viene a preguntar quien entra. El hero y los cierres de cada subpágina lo
 * llevan al formulario en la query (`/es?consulta=compra#contacto`). El
 * formulario lo lee del lado del cliente para preseleccionar; si el parámetro
 * falta o trae cualquier otra cosa, arranca sin preselección y la página sigue
 * siendo estática.
 *
 * **Fueron tres y son dos: se sacó `venta`, que era el exportador argentino.**
 * El sitio le habla a un solo público —el importador que trae desde la
 * Argentina— y una opción para el otro lado era el único resto de cuando eran
 * dos. La red de exportadores sigue existiendo y el sitio la sigue nombrando,
 * pero como algo que Phantus tiene, no como alguien a quien le habla.
 *
 * **Las dos opciones viajan por la URL**, y eso importa: `compra` la ponen el
 * hero y los cuatro cierres, y `otro` la pone el pie de las condiciones de
 * operación, para quien busca una mercadería que no está en el catálogo.
 */
export const TIPOS_DE_CONSULTA = ['compra', 'otro'] as const;

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
