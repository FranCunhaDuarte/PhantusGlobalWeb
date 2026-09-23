import { setRequestLocale } from 'next-intl/server';
import { ID_CONTENIDO } from '@/components/layout/SaltarAlContenido';
import DatosDeOrganizacion from '@/components/marca/DatosDeOrganizacion';
import AccesosDelSitio from '@/components/sections/AccesosDelSitio';
import Contacto from '@/components/sections/Contacto';
import Hero from '@/components/sections/Hero';

/**
 * **La home quedó en tres bloques: hero, índice y contacto.** Es un escaparate
 * de verdad: presentar, dejar elegir a dónde ir y ofrecer el formulario.
 *
 * **Los dos bloques de producto se sacaron por pedido.** Eran el carrusel de
 * especies —que abría el ancla `#productos`— y el CTA de carnes y pollo con sus
 * dos fotos. Lo que mostraban vive entero en `/productos`, a un clic de la
 * tarjeta del índice, así que lo que se perdió no es contenido sino una segunda
 * puerta al mismo lugar.
 *
 * **Ningún enlace se rompe con eso**, y conviene saber por qué: `productos`
 * resuelve como **ruta** en `PAGINA_DE_SECCION`, no como ancla, así que el
 * header, el menú y el pie siempre apuntaron a `/productos` y no a `#productos`.
 * El único ancla que le queda a la home es `#contacto`, que no está en esa tabla.
 *
 * **Lo que quedó sin consumidor y no se borró**: `ResumenDeProductos`,
 * `ResumenDeCarnes`, `AdelantoDelCatalogo`, `Carrusel` —que ya había perdido al
 * otro, `AdelantoDeCortes`—, `ESPECIES_DEL_ADELANTO` y las claves
 * `home.productos.*` y `home.carnes.*` de los dos catálogos.
 *
 * El orden de fondos queda **tinta → crema elevado → bordó**: el corte más
 * fuerte arriba de todo y ningún límite entre dos tonos iguales.
 */
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
      <Contacto />
    </main>
  );
}
