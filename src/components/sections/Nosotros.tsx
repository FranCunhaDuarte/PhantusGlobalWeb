import { useTranslations } from 'next-intl';
import CarruselDeLaCiudad from '@/components/nosotros/CarruselDeLaCiudad';
import foto from '@/imagenes/nosotros-hero.jpg';
import FondoDeApertura from '@/components/hero/FondoDeApertura';
import ListaDeCredenciales from '@/components/nosotros/ListaDeCredenciales';
import Logo from '@/components/ui/Logo';
import PasoDelProceso from '@/components/proceso/PasoDelProceso';
import { PASOS_DE_NOSOTROS } from '@/content/proceso';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';

/**
 * La página de quiénes somos, rehecha: **fue tres bloques de prosa y ahora se
 * apoya en datos y en fotos.**
 *
 * Lo que había era un manifiesto de tres párrafos —rol, misión y responsable, 546
 * caracteres seguidos—, el elefante con otro párrafo largo y tres valores con
 * bajadas de dos renglones. Todo cierto y todo texto: la página se leía como un
 * documento y no como una presentación.
 *
 * Ahora son tres tramos y **ninguno se lee igual que el anterior**, que es lo
 * único que se conservó del planteo viejo:
 *
 * 1. **La apertura** es un hero con foto y velo, como el de la home: titular y
 *    una sola línea, centrados en crema. Debajo, en su propia banda, los cuatro
 *    datos duros en grilla, que reemplazan a los tres párrafos —decían
 *    exactamente eso envuelto en frases—.
 * 2. **La ciudad** es una tarjeta a ancho de pantalla que pasa cuatro fotos de
 *    Mar del Plata sola. El texto es corto porque las fotos hacen el trabajo; la
 *    página venía diciendo "estamos en el principal puerto pesquero del país" y
 *    eso era una frase.
 * 3. **El elefante** se queda —es el eje de la marca— pero con el párrafo a la
 *    mitad.
 *
 * El texto de la página bajó de unos 1280 caracteres a unos 900, sin perder
 * ningún dato: lo que se fue es la envoltura.
 *
 * **El alcance ya no está acá.** Las dos puntas de la operación y los cuatro
 * mercados se mudaron a `/mercados` cuando la home estrenó su índice de tres
 * tarjetas.
 */
export default function Nosotros() {
  const t = useTranslations('nosotros');

  return (
    <>
      {/* La apertura es un hero con foto, como el de la home: el mismo velo
          negro al 58 %, el texto en crema encima y **la barra apoyada arriba,
          sin fondo propio**. Eso último no salía gratis: `HeaderElevado` ponía
          la barra en tinta sólo en la home, así que acá llegaba en crema y se
          veía como una franja clara apoyada sobre la foto. Hoy la ruta está en
          `RUTAS_CON_HERO`, y por eso esta sección sube `-mt-header` y devuelve
          el alto con el `pt-header` de adentro: sin ese par, el titular
          arrancaría debajo de la barra.

          Lo que **no** copia del hero de la home es el titular en mayúsculas y a
          800: ese sigue siendo de la home y de ningún otro. */}
      <Section fondo="tinta" className="relative isolate -mt-header">
        <FondoDeApertura foto={foto} />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 pt-header text-center md:min-h-[16rem] md:justify-center">
          {/* Sin `Destacado`, igual que el titular de contacto: los dos se
              sacaron por pedido y van parejos. Volver a ponerlo es envolver la
              palabra en `<destacado>` dentro de la clave, y entonces esto
              tiene que pasar de `t` a `t.rich`. */}
          <SectionHeading nivel={1} escala="titulo-mayor">
            {t('titulo')}
          </SectionHeading>
          <p className="text-entrada md:max-w-2xl">{t('entrada')}</p>
        </div>
      </Section>

      {/* Los cuatro datos salen del hero y quedan en su propia banda. Sobre el
          velo no podrían llevar el rótulo en gris —`ink-inverse-muted` sobre el
          peor cuadro da 3,09:1, por debajo del 4,5 que pide el texto chico— y
          sin ese gris el rótulo y el valor se leen como una sola línea. */}
      {/* **Crema elevado y no crema base**, que es el tono más claro que tiene
          la paleta y lo que el sitio usa donde hace falta que algo se lea como
          blanco. No hay un blanco real al que ir: la paleta entera es cálida y
          un #FFF acá quedaría frío contra el crema del resto de la página, que
          es el mismo crema del logotipo.

          Como el bloque de abajo —la tarjeta de la ciudad— también es crema
          elevado, ese límite queda sin corte. No molesta porque la tarjeta trae
          su propia foto de borde a borde, que es la que marca dónde empieza. */}
      <Section fondo="crema-elevado">
        <ListaDeCredenciales />
      </Section>

      {/* **Acá iba la tarjeta del responsable —nombre, cargo y LinkedIn— y se
          sacó por pedido.** Es la segunda vez que esta página nombra y deja de
          nombrar a una persona, así que conviene dejar dicho qué se cae con
          ella: el argumento de credibilidad de la página pasa a ser la red y el
          puerto, y no el nombre de quien atiende.

          **El componente `Responsable` y las claves `nosotros.responsable.*`
          siguen vivos**, y no por política de huérfanos: los usa
          `CanalesDeContacto`, al lado del formulario. Si ahí también tiene que
          salir, es otro pedido.

          **El bloque de proceso ocupa su lugar, y hacía falta que algo lo
          ocupara**: era el crema que separaba la banda de credenciales de la
          tarjeta de la ciudad, que son las dos crema elevado. Sin nada en el
          medio, la página dejaba dos límites del mismo tono pegados. */}
      <Section fondo="crema">
        {/* Cuatro pasos, cada uno una frase y sin título propio: es lo que mandó
            el cliente y no se le inventa un nombre a cada uno. Por eso
            `PasoDelProceso` va sin `titulo`; con él, el paso emite un `h2` y
            acá abajo de otro `h2` haría falta bajarlo de nivel.

            **No reemplaza a `/como-trabajamos`, que sigue con sus cinco pasos**
            y su detalle. Esto es el resumen; que convivan las dos listas es una
            tensión anotada en `PASOS_DE_NOSOTROS`. */}
        <SectionHeading>{t('proceso.titulo')}</SectionHeading>
        <ol className="mt-8 border-b borde-seccion">
          {PASOS_DE_NOSOTROS.map((paso, indice) => (
            <PasoDelProceso
              key={paso}
              orden={indice + 1}
              texto={t(`proceso.pasos.${paso}`)}
            />
          ))}
        </ol>
      </Section>

      {/* La tarjeta es el bloque entero: se trae adentro su propio titular y su
          bajada, porque el texto va a la izquierda de la foto y no encima. Y va
          `relleno="sin"`: **la tarjeta mide el alto de la sección**, así que no
          hay aire de sección alrededor. Con el relleno puesto quedaba flotando
          en una franja de crema elevado que no hacía nada. */}
      {/* **Sin `Container`**: el tope de ancho del sitio vale para el texto, que
          es lo que se lee, y acá recortaría la foto. La tarjeta se alinea sola
          —el texto con el sangrado de su grilla, la foto contra el borde—. */}
      <Section fondo="crema-elevado" relleno="sin" contenedor={false}>
        <CarruselDeLaCiudad />
      </Section>

      {/* El eje conceptual de la marca, centrado y con el isotipo encima: es el
          único bloque del sitio que se presenta como un escudo, y se lo puede
          permitir porque acá el isotipo ya está en una pieza que se presentó.
          Sin `gap` en la columna: el aire alrededor del isotipo lo pone `Logo`
          y un hueco propio se le sumaría al área de seguridad.

          **Fue tinta y pasó a crema, y no por gusto.** Con el CTA sacado, este
          es el último bloque de la página y abajo viene el pie, que también es
          tinta: en oscuro los dos se fundían en una sola mancha y el pie parecía
          arrancar con el isotipo del elefante. El cierre de la página tiene que
          ser un corte, y el más fuerte que queda es crema contra el pie.

          Lo que se pierde es que el bloque era el único del sitio sobre tinta.
          El isotipo va en tinta sobre crema, que es una de las dos
          combinaciones que el manual admite, así que `Logo` lo resuelve solo. */}
      <Section fondo="crema" medida="angosta" relleno="chico">
        <div className="flex flex-col items-center text-center">
          <Logo forma="isotipo" ancho={72} />
          <h2 className="text-titulo">{t('elefanteTitulo')}</h2>
          <p className="mt-6 max-w-2xl text-entrada">{t('elefanteTexto')}</p>
        </div>
      </Section>

      {/* **Acá cerraba el bloque de valores y se sacó por pedido**: "En qué nos
          apoyamos", con confianza, transparencia y compromiso en tres columnas.
          Con él se fueron del sitio los tres valores enteros —al pie ya los
          habían reemplazado las dos legales—, así que `VALORES`,
          `ValorDeMarca`, `nosotros.valoresTitulo`, `nosotros.valores.*` y
          `marca.valores.*` quedaron sin un solo consumidor. No se borraron: son
          copia del cliente y dato de marca, y el repo no tiene historial.

          **Y después se sacó el CTA**, que era el último bloque de la página y
          el único lugar de `/nosotros` con una llamada a contacto. Con él se
          fueron `nosotros.contacto.*` a la misma lista de huérfanos. La página
          cierra en el elefante: quien termina de leerla vuelve por el header o
          por el pie, que es lo que ya hace `/como-trabajamos`.

          De las cinco rutas, ésta es ahora la única sin CTA propio. */}
    </>
  );
}
