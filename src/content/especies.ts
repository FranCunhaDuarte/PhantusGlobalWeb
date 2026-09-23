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
  'langostino',
  'merluza',
  'corvina',
  'calamar',
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
 * Qué especies llevan etiqueta en el catálogo, y cuál. Es un dato de la
 * operación y no del recurso —cambia con el negocio, no con la pesquería—, por
 * eso vive acá y no en el régimen.
 *
 * **Fue una sola especie y ahora es un mapa.** Hasta acá era `ESPECIE_DESTACADA`,
 * un único id con un único texto; con dos especies etiquetadas por motivos
 * distintos —la merluza por volumen, el langostino por decisión comercial— un
 * solo campo ya no alcanzaba. El valor es la clave de i18n bajo
 * `productos.pescados.etiquetas` y no el texto: el nombre dice el rol y el
 * catálogo dice las palabras, que ya cambiaron una vez.
 *
 * Es `Partial` a propósito: la mayoría de las once no lleva ninguna, y una ficha
 * sin etiqueta no es un caso especial sino el normal.
 */
export const ETIQUETA_DE_ESPECIE: Partial<Record<Especie, string>> = {
  merluza: 'volumen',
  langostino: 'destacado'
};

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
  'langostino',
  'merluza',
  'corvina',
  'calamar',
  'pescadilla',
  'besugo'
];
