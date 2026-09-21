/**
 * Nombre de un idioma en ese mismo idioma ("Español", "English", "Português").
 * Sale de los datos de `Intl` y no de los catálogos: sumar un locale a
 * `routing.ts` no obliga a agregar su etiqueta en todos los JSON.
 */
/**
 * `og:locale` pide `idioma_REGIÓN`, y la región no sale de los datos de `Intl`:
 * es una decisión de a qué mercado se le habla. Un idioma sin entrada acá viaja
 * con el código pelado, que los lectores de tarjetas toleran.
 */
const REGION_SOCIAL: Record<string, string> = { es: 'AR', en: 'US' };

export function localeSocial(codigo: string) {
  const region = REGION_SOCIAL[codigo];
  return region ? `${codigo}_${region}` : codigo;
}

export function nombreDeIdioma(codigo: string) {
  const nombres = new Intl.DisplayNames([codigo], { type: 'language' });
  const nombre = nombres.of(codigo) ?? codigo;
  return nombre.charAt(0).toLocaleUpperCase(codigo) + nombre.slice(1);
}
