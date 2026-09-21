import { setRequestLocale } from 'next-intl/server';
import { ID_CONTENIDO } from '@/components/layout/SaltarAlContenido';
import DatosDeOrganizacion from '@/components/marca/DatosDeOrganizacion';
import AccesosDelSitio from '@/components/sections/AccesosDelSitio';
import Contacto from '@/components/sections/Contacto';
import Hero from '@/components/sections/Hero';
import ResumenDeCarnes from '@/components/sections/ResumenDeCarnes';
import ResumenDeProductos from '@/components/sections/ResumenDeProductos';

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id={ID_CONTENIDO} className="flex-1">
      <DatosDeOrganizacion />
      <Hero />
      {/* Las tres tarjetas van pegadas al hero: son el índice del sitio y lo
          primero que se ve al bajar del video. Reemplazaron al bloque de
          nosotros, que era titular, una línea y un botón. `SECCIONES` no cambia:
          `nosotros` sigue siendo sección y ruta —el header la lista—, lo que
          desapareció es el ancla `#nosotros` de la home. */}
      <AccesosDelSitio />
      {/* Debajo del índice, lo que se comercializa, y nada más. Carnes va detrás
          de pescados y no al lado, porque es la unidad secundaria.

          `como-trabajamos` tenía acá su bloque de escaparate y se fue: la página
          sigue existiendo y el header la sigue listando. Con eso, de los cuatro
          ids de `SECCIONES` sólo `productos` y `contacto` abren ancla en la
          home; los otros dos son ruta y nada más. */}
      <ResumenDeProductos />
      <ResumenDeCarnes />
      <Contacto />
    </main>
  );
}
