/**
 * Los cinco fondos de marca. Cada uno declara su paleta completa en
 * `globals.css` bajo `[data-fondo]`: texto, texto suave, línea, realce, anillo
 * de foco y colores de botón se heredan de ahí. Lo único que no puede resolver
 * CSS es qué archivo de logo corresponde, y eso lo resuelve `varianteLogoSobre`.
 */
export const FONDOS = [
  'crema',
  'crema-elevado',
  'azul',
  'bordo',
  'tinta'
] as const;

export type Fondo = (typeof FONDOS)[number];

export type VarianteLogo = 'tinta' | 'crema';

const OSCUROS = new Set<Fondo>(['azul', 'bordo', 'tinta']);

/**
 * El manual admite dos combinaciones y sólo dos: logo tinta sobre crema y logo
 * crema sobre azul, bordó o tinta. No existe logo azul ni bordó sobre crema.
 */
export function varianteLogoSobre(fondo: Fondo): VarianteLogo {
  return OSCUROS.has(fondo) ? 'crema' : 'tinta';
}
