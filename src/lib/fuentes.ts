import { Montserrat } from 'next/font/google';

/**
 * **Montserrat es la única familia del sitio.** Hubo una secundaria, Fraunces
 * Bold, para una o dos palabras dentro de un titular; se sacó por pedido. Con
 * ella se fueron el token `--font-display` del `@theme` y la variable que el
 * `<html>` publicaba.
 *
 * El énfasis no se perdió: `Destacado` lo da ahora con peso y color dentro de
 * esta misma familia. Montserrat entra como fuente variable, así que los cortes
 * que use no cuestan un archivo más.
 *
 * Sólo `latin`. `subsets` no decide qué `@font-face` se declara sino cuál se
 * precarga: los cortes latin-ext, vietnamita y cirílico siguen declarados y el
 * navegador los baja si alguna vez aparece un carácter suyo. Pedir latin-ext
 * costaba 100 kB precargados en cada visita para cubrir letras que no existen
 * ni en el copy ni en los nombres de país que devuelve `Intl` en es/en.
 */
export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--fuente-montserrat'
});
