import type { Metadata } from 'next';
import { routing, type Ruta } from '@/i18n/routing';
import { localeSocial } from '@/lib/idiomas';
import og from '@/lib/og-assets.json';
import { urlAbsoluta } from '@/lib/rutas';

/**
 * Open Graph y Twitter de una ruta. Va acá y no suelto en cada página porque
 * Next reemplaza el objeto `openGraph` entero cuando una página declara el
 * suyo: si una subpágina pusiera sólo el título, se quedaría sin imagen. El
 * título y la descripción no se repiten: Next los toma de los campos
 * `title`/`description` ya resueltos de esa misma página.
 *
 * `images` queda relativa a propósito; `metadataBase` la vuelve absoluta, que
 * es lo único que aceptan los lectores de tarjetas.
 */
export function tarjetaSocial(
  ruta: Ruta,
  idioma: string,
  nombre: string,
  alt: string
): Metadata {
  const imagen = {
    url: og.imagenes[idioma as keyof typeof og.imagenes],
    width: og.medida.ancho,
    height: og.medida.alto,
    alt
  };

  return {
    openGraph: {
      type: 'website',
      siteName: nombre,
      url: urlAbsoluta(ruta, idioma),
      locale: localeSocial(idioma),
      alternateLocale: routing.locales
        .filter((otro) => otro !== idioma)
        .map(localeSocial),
      images: [imagen]
    },
    twitter: { card: 'summary_large_image', images: [imagen] }
  };
}
