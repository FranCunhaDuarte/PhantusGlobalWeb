import { useLocale, useTranslations } from 'next-intl';
import { TELEFONO_MARCABLE } from '@/content/contacto-directo';
import { LINKEDIN_DE_LA_EMPRESA } from '@/content/redes';
import { DOMICILIO } from '@/content/domicilio';
import assets from '@/lib/marca-assets.json';
import { urlAbsoluta } from '@/lib/rutas';
import { SITIO } from '@/lib/sitio';

/**
 * `Organization` en JSON-LD. Sólo lleva lo que el sitio realmente publica:
 * nombre, dominio, logotipo, la ciudad, el correo del pie y —desde que el
 * cliente lo pasó— el teléfono. **Siguen sin completarse horarios, redes e
 * identificadores fiscales**: no hay dato real y un campo inventado en datos
 * estructurados es peor que la ausencia del campo.
 *
 * El teléfono va en **E.164**, que es lo que pide schema.org y lo que usa el
 * `tel:` del bloque de contacto: el número formateado que se lee en pantalla no
 * sirve acá.
 *
 * Va en la home, que es la página que Google toma como representativa del sitio,
 * y no en el layout: repetirlo en cada ruta no agrega nada.
 */
export default function DatosDeOrganizacion() {
  const t = useTranslations();
  const idioma = useLocale();

  const datos = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: t('marca.nombre'),
    description: t('metadata.description'),
    url: urlAbsoluta('/', idioma),
    logo: `${SITIO.origen}${assets.logotipo.tinta.src}`,
    email: t('pie.correo'),
    telephone: TELEFONO_MARCABLE,
    // `sameAs` es donde Google espera los perfiles oficiales de la
    // organización, y es lo que le deja atar el sitio con la página de LinkedIn.
    // **Va el de la empresa y no el de la persona**: el perfil de alguien que
    // trabaja acá no es un perfil de la organización, y declararlo como tal
    // sería exactamente el campo inventado que el resto de este objeto evita.
    sameAs: [LINKEDIN_DE_LA_EMPRESA],
    address: {
      '@type': 'PostalAddress',
      addressLocality: DOMICILIO.ciudad,
      addressCountry: DOMICILIO.pais
    }
  };

  return (
    <script
      type="application/ld+json"
      // El JSON se serializa a mano: es dato propio, no entra nada del
      // visitante, y `</` se escapa para que un texto no pueda cerrar la
      // etiqueta antes de tiempo.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(datos).replace(/</g, '\\u003c')
      }}
    />
  );
}
