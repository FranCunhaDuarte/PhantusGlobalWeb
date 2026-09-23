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

      {/* **Los dos despieces vuelven a un solo bloque**, que es de donde
          salieron: estuvieron juntos bajo el titular de carnes, se separaron en
          dos secciones cuando el pollo pasó a ser unidad propia —tenerlo colgado
          del bloque de carnes decía que es un subproducto de la vacuna, y no lo
          es— y ahora vuelven a compartir bloque por pedido.

          **Que compartan bloque no vuelve a subordinar el pollo**, y ésa es la
          diferencia con la disposición vieja. Cada dibujo conserva **su propia
          ancla y su propio `h2`**, así que para la navegación y para el lector de
          pantalla siguen siendo dos unidades; lo que comparten es la franja y el
          fondo. Antes había un solo `h2` —el de carnes— y el ave colgaba de él.

          **El ancla ya no la pone `Section` sino cada celda**, porque la sección
          tiene dos destinos de salto y el prop admite uno. Las dos llevan
          `scroll-mt-ancla`, que es lo mismo que la sección les daba.

          **Los dos entran en el contenedor y no salen a ancho de pantalla**, que
          es como estuvieron un rato: a ancho completo se comían el tope de 72rem
          que respeta el resto de la página y el bloque quedaba pegado a los
          bordes mientras el texto no. */}
      <Section fondo="crema">
        {/* **Las medidas mandan por `basis` y no por `width`.** Los dos topes
            —35rem la res, 26rem el ave— suman 61rem, que a 1280 entra en los
            68rem del contenido pero no a 1024. Con la base en esas mismas
            medidas, los dos se achican en proporción y la res sigue midiendo lo
            que el ave por 35 a 26; con un `w-full` para los dos, el reparto
            pasaría a ser mitad y mitad y el ave quedaría más ancha que la res.

            **`min-w-0` se queda aunque los dibujos ya entren.** Un ítem de flex
            arranca en `min-width: auto`, o sea que no se deja achicar por debajo
            de su contenido; sin esto, el piso de ancho de la res estira su celda
            y desborda la página en vez de desplazarse dentro de su caja. */}
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:justify-center lg:gap-10">
          <div
            id={ANCLA_DE_UNIDAD.carnes}
            className="w-full min-w-0 max-w-[35rem] scroll-mt-ancla lg:basis-[35rem]"
          >
            <h2 className="sr-only">{tUnidades('carnes.nombre')}</h2>
            <DiagramaDeCortes />
          </div>

          <div
            id={ANCLA_DE_UNIDAD.pollo}
            className="w-full min-w-0 max-w-[26rem] scroll-mt-ancla lg:basis-[26rem]"
          >
            <h2 className="sr-only">{tUnidades('pollo.nombre')}</h2>
            <DiagramaDePollo />
          </div>
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
