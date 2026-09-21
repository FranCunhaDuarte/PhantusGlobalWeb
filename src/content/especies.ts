/**
 * Las especies del catálogo, con el régimen bajo el que se administra cada
 * pesquería. El régimen es el dato estable año a año y es lo que le cambia la
 * compra a quien está del otro lado: las de cuota se consiguen todo el año, las
 * de zafra sólo mientras la temporada está abierta. Nombre, descripción,
 * formatos y ventana salen de `productos.especies.<id>`.
 *
 * `rebozado` no es una especie sino producto elaborado a partir del filet de
 * merluza. Entra igual porque el catálogo es lo que se comercializa y no una
 * clave taxonómica; su ficha lo dice con todas las letras.
 */
export const ESPECIES = [
  'merluza',
  'corvina',
  'calamar',
  'langostino',
  'pescadilla',
  'besugo',
  'pezPalo',
  'mero',
  'polloDeMar',
  'raya',
  'rebozado'
] as const;

export type Especie = (typeof ESPECIES)[number];

export const REGIMENES = ['cuota', 'zafra'] as const;

export type Regimen = (typeof REGIMENES)[number];

/**
 * Parcial a propósito: sólo hay régimen y ventana para las cuatro especies de
 * las que el cliente pasó el dato. Del resto se publica lo que sí se sabe
 * —nombre, científico y formatos— y la ficha se queda sin la línea de
 * disponibilidad antes que inventarla.
 */
export const REGIMEN_DE_ESPECIE: Partial<Record<Especie, Regimen>> = {
  merluza: 'cuota',
  corvina: 'zafra',
  calamar: 'zafra',
  langostino: 'zafra'
};

/**
 * Cuál se destaca en el catálogo. Es un dato de la operación y no del recurso
 * —cambia con el negocio, no con la pesquería—, por eso vive acá y no en el
 * régimen. El nombre dice el rol y no el motivo: qué texto lleva la etiqueta lo
 * decide i18n, y ya cambió una vez.
 */
export const ESPECIE_DESTACADA: Especie = 'merluza';

/**
 * Qué especies muestra el adelanto de la home. Es una selección editorial y no
 * la lista de las que tienen recorte, que es lo que fue hasta acá: son las seis
 * de mayor volumen, en el orden del catálogo.
 *
 * **Las seis tienen foto.** Pescadilla y besugo entraron sin recorte, sabiendo
 * el costo —entre cuatro recortes reales, una celda con marca de agua se lee
 * como imagen rota—, y el problema se fue solo cuando llegaron sus PNG, sin
 * tocar este archivo. Eso es lo que la lista explícita compra: la selección es
 * editorial y no "las que tienen foto".
 */
export const ESPECIES_DEL_ADELANTO: readonly Especie[] = [
  'merluza',
  'corvina',
  'calamar',
  'langostino',
  'pescadilla',
  'besugo'
];
