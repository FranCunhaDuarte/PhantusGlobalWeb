import { useTranslations } from 'next-intl';
import CatalogoDeEspecies from '@/components/productos/CatalogoDeEspecies';
import DiagramaDeCortes from '@/components/productos/DiagramaDeCortes';
import DiagramaDePollo from '@/components/productos/DiagramaDePollo';
import FondoDeApertura from '@/components/hero/FondoDeApertura';
import IndiceDeUnidades from '@/components/productos/IndiceDeUnidades';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import { ANCLA_DE_UNIDAD } from '@/content/unidades';
import foto from '@/imagenes/ciudad/costa.jpg';

/**
 * **La página entera de productos: el índice y las dos unidades desplegadas.**
 *
 * Hasta acá esto era sólo el índice —dos tarjetas y nada más— y cada unidad
 * tenía hoja propia: `/productos/pescados` con el catálogo de especies y
 * `/productos/carnes` con el diagrama de cortes. Las dos hojas se plegaron acá
 * adentro, así que el sitio pasó de siete rutas y **catorce URLs a cinco y
 * diez**, y las tarjetas del índice pasaron de navegar a saltar dentro de la
 * misma página.
 *
 * **Los dos bloques entran sin titular ni entrada**, que es lo que cambia
 * respecto de las hojas viejas. Ahí cada una abría con su `h1` y su párrafo;
 * acá el `h1` ya lo puso el índice y repetirlo dos veces más partiría la página
 * en tres aperturas. Lo que queda de cada unidad es su catálogo.
 *
 * **Pero el encabezado no desapareció, se volvió invisible.** Cada bloque lleva
 * un `h2` en `sr-only` con el nombre de su unidad, y hay dos motivos. Uno es la
 * estructura: sin él, una página con dos bloques grandes de contenido tendría un
 * solo encabezado en todo el documento y quien navega por encabezados no tendría
 * cómo saltar de las especies a los cortes. El otro es el ancla: la tarjeta del
 * índice apunta acá, y un destino de salto que no anuncia a dónde llegó deja al
 * lector de pantalla sin señal de que se movió.
 *
 * El alternado de fondos se mantiene —crema, crema elevado, crema— para que
 * ningún límite entre bloques quede sin corte.
 */
export default function Productos() {
  const t = useTranslations('productos');
  const tUnidades = useTranslations('productos.unidades');

  return (
    <>
      {/* Apertura con foto y velo, igual que `/nosotros`: la barra queda
          apoyada encima sin fondo propio —la ruta está en `RUTAS_CON_HERO`— y
          por eso la sección sube `-mt-header` y devuelve el alto con el
          `pt-header` de adentro. Sin ese par, el titular arrancaría debajo de
          la barra.

          El rótulo va en `pleno` y no en el gris de siempre: sobre el velo el
          crema pleno ya está a 4,54:1 del peor cuadro posible, así que cualquier
          atenuación por color lo perfora. */}
      <Section fondo="tinta" className="relative isolate -mt-header">
        <FondoDeApertura foto={foto} />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 pt-header text-center md:min-h-[16rem] md:justify-center">
          {/* Sin `Destacado`, como los titulares de `/nosotros`, `/mercados`,
              contacto y la tarjeta de la ciudad. Volver a ponerlo es envolver la
              palabra en `<destacado>` dentro de la clave, y entonces esto tiene
              que pasar de `t` a `t.rich`. */}
          <SectionHeading nivel={1} escala="titulo-mayor">
            {t('titulo')}
          </SectionHeading>
          <p className="text-entrada md:max-w-2xl">{t('entrada')}</p>
        </div>
      </Section>

      {/* **La foto de la apertura no es la de la tarjeta PRODUCTOS de la home**,
          que es la regla que sigue `/nosotros` —llegar y encontrar la misma
          imagen confirma que se llegó a donde se quería—. Acá no se puede: esa
          foto es la de la unidad de pescados y vuelve a aparecer en el índice, a
          media pantalla de acá; la misma imagen dos veces en una pantalla se lee
          como un error.

          **Va la costa, y no una del puerto, por las marcas.** Las tres fotos
          portuarias del repo tienen nombres de terceros legibles —`puerto` una
          cooperativa en la grúa y el nombre de un barco en el casco, `lanchas`
          tres nombres de embarcación, `buque` el cartel de un salón de eventos—
          y a ancho completo se leen. `costa` es la única sin nada escrito
          encima: mar abierto y escollera. Encaja igual, que es de donde sale
          todo lo que la página lista. */}
      <Section fondo="crema">
        <IndiceDeUnidades />
      </Section>

      <Section fondo="crema-elevado" ancla={ANCLA_DE_UNIDAD.pescados}>
        <h2 className="sr-only">{tUnidades('pescados.nombre')}</h2>
        <CatalogoDeEspecies />
      </Section>

      {/* **Los dos despieces entran en el contenedor y no salen a ancho de
          pantalla**, que es como estuvieron un rato. A ancho completo cada uno
          se llevaba la mitad del viewport —unos 940 px a 1920— pero se comían el
          tope de 72rem que respeta todo el resto de la página, y el bloque
          quedaba pegado a los bordes mientras el texto de arriba y el de abajo
          no.

          **El costo es que se achican, y está aceptado.** A 1280 la res queda en
          566 px y el ave en 283. Eso obligó a bajar el piso de ancho de la res,
          que era de 48rem —ver `DiagramaDeCortes`—.

          **Abajo de `lg` se apilan**, porque dos dibujos de este ancho en media
          pantalla angosta no se leen. Apiladas mantienen la misma proporción de
          2 a 1: la res a ancho completo y el ave a la mitad. */}
      {/* **Los dos despieces estuvieron en este mismo bloque y ahora son dos.**
          Iban uno al lado del otro bajo el titular de carnes, la res al 52 % del
          contenido y el ave al 26 %, con el sobrante repartido en el medio. Eso
          decía que el pollo es una parte de la carne vacuna, y no lo es: otro
          frigorífico, otra habilitación y otro comprador. Ahora cada unidad abre
          su propia ancla.

          **El ave creció al quedarse sola.** Medía la mitad que la res para no
          pesar lo mismo estando al lado; sin esa vecindad la restricción se cae,
          y más ancho sólo mejora la puntería sobre sus ocho regiones. Queda
          igual por debajo de la res, que tiene dieciocho cortes y varios finos.

          **Los dos entran en el contenedor y no salen a ancho de pantalla**, que
          es como estuvieron un rato: a ancho completo se comían el tope de 72rem
          que respeta el resto de la página y el bloque quedaba pegado a los
          bordes mientras el texto no. */}
      <Section fondo="crema" ancla={ANCLA_DE_UNIDAD.carnes}>
        {/* **Un solo encabezado por bloque y no dos.** Con los dos dibujos
            juntos hacía falta un `h2` de la unidad y un `h3` por animal, o el
            lector de pantalla encontraba dos grupos de regiones seguidos sin
            nada que dijera cuál era cuál. Separados, el `h3` repetía el `h2`. */}
        <h2 className="sr-only">{tUnidades('carnes.nombre')}</h2>
        {/* **`min-w-0` se queda aunque el dibujo ya entre.** Un ítem de flex
            arranca en `min-width: auto`, o sea que no se deja achicar por debajo
            de su contenido; sin esto, cualquier mínimo que vuelva a aparecer
            adentro estira la celda y desborda la página en vez de desplazarse
            dentro de su caja. Es el seguro, no el mecanismo. */}
        <div className="mx-auto min-w-0 max-w-[35rem]">
          <DiagramaDeCortes />
        </div>
      </Section>

      <Section fondo="crema-elevado" ancla={ANCLA_DE_UNIDAD.pollo}>
        <h2 className="sr-only">{tUnidades('pollo.nombre')}</h2>
        <div className="mx-auto min-w-0 max-w-[26rem]">
          <DiagramaDePollo />
        </div>

        {/* **Acá iba la línea de corazón, hígado, molleja y filete**, que son lo
            que se comercializa y no es una parte del ave: las tres menudencias
            son vísceras y el filete sale de la pechuga. Se sacó por pedido, y
            con ella esos cuatro productos dejaron de aparecer en el sitio: no
            pueden ser regiones del dibujo, así que el texto era el único lugar
            donde estaban. Las claves `productos.pollo.otrosTitulo` y
            `.otrosTexto` quedaron sin consumidor y no se borraron. */}
      </Section>
    </>
  );
}
