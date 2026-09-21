import type { StaticImageData } from 'next/image';
import type { Especie } from '@/content/especies';
import angelshark from '@/imagenes/especies/angelshark.png';
import breaded from '@/imagenes/especies/breaded.png';
import croaker from '@/imagenes/especies/croaker.png';
import flathead from '@/imagenes/especies/flathead.png';
import hake from '@/imagenes/especies/hake.png';
import porgy from '@/imagenes/especies/porgy.png';
import seabass from '@/imagenes/especies/seabass.png';
import shrimp from '@/imagenes/especies/shrimp.png';
import skate from '@/imagenes/especies/skate.png';
import squid from '@/imagenes/especies/squid.png';
import weakfish from '@/imagenes/especies/weakfish.png';

/**
 * Un recorte por especie: PNG con canal alfa que se apoya sobre el crema de la
 * ficha, no una foto metida en una caja. Viven en `src/imagenes/especies` y no
 * en `public` por lo mismo que las fotos de unidad: el import estático le da a
 * `next/image` el ancho y el alto sin declararlos a mano.
 *
 * **Los archivos van con el nombre de la especie en inglés** —`hake`,
 * `croaker`, `squid`, `shrimp`— y la clave del mapa en castellano, que es como
 * el proyecto nombra el dominio. El recorte es material que se intercambia con
 * proveedores y fotógrafos, y ahí el nombre en inglés viaja mejor.
 *
 * Lo que hay que pedir: PNG con transparencia real, sujeto recortado, sin
 * sombra ni fondo horneados, y **1200 px de ancho como mínimo** —la ficha llega
 * a 438 px de render, o sea 876 en pantalla de densidad doble—. El lienzo lo
 * normaliza `scripts/preparar-especies.mjs`: recorta el margen transparente y
 * centra el sujeto en **1200×900**, para que un pescado largo y un calamar
 * compacto no se lean a escalas distintas dentro de la misma grilla.
 *
 * **El lienzo fue 1200×800 y era un error**: el hueco es 4:3 y una imagen 3:2
 * entraba por ancho, dejando una banda muerta arriba y abajo que nadie pidió. Y
 * el aire alrededor del sujeto es ahora el mismo que usa `preparar-cortes.mjs`
 * —89 % del ancho, 85 % del alto—, porque con cuentas distintas los dos
 * carruseles de la home se leían a escalas distintas. **Si se cambia el aire de
 * un guion hay que cambiar el del otro.**
 *
 * **`shrimp` viene de un original de 350 px** y el script lo agranda 3x para
 * que no quede diminuto al lado de los otros tres. En pantalla de densidad
 * doble se nota más blando; hay que reemplazarlo cuando aparezca el original
 * grande. El resto entró por encima del piso.
 */

/**
 * **Están las once.** El mapa sigue siendo `Partial` a propósito: sacar una
 * especie del catálogo, o sumar una antes de que llegue su recorte, no tiene que
 * romper la página —cae sola en el hueco con el isotipo al 7 %—.
 */
export const IMAGEN_DE_ESPECIE: Partial<Record<Especie, StaticImageData>> = {
  merluza: hake,
  corvina: croaker,
  calamar: squid,
  langostino: shrimp,
  pescadilla: weakfish,
  besugo: porgy,
  pezPalo: flathead,
  mero: seabass,
  polloDeMar: angelshark,
  raya: skate,
  rebozado: breaded
};
