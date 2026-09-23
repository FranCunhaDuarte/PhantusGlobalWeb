import Image from 'next/image';
import { useTranslations } from 'next-intl';
import BotonSaberMas from '@/components/layout/BotonSaberMas';
import { FOTO_DE_UNIDAD } from '@/components/productos/fotos-de-unidad';
import { ANCLA_DE_UNIDAD } from '@/content/unidades';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';

// Crema elevado: arriba queda el crema base de `productos` y abajo arranca el
// bordó del formulario. Es el último tramo claro de la home, que va tinta →
// elevado → base → elevado → bordó.
const FONDO = 'crema-elevado';

/** Las dos fotos del bloque, en el mismo orden que el titular las nombra. */
const FOTOS = ['carnes', 'pollo'] as const;

/**
 * Anchos que llega a medir cada foto: la mitad de la columna del dibujo desde
 * `lg` —unos 330 px— y media pantalla por debajo, donde van en dos columnas.
 */
const MEDIDAS = '(min-width: 64rem) 330px, 50vw';

/**
 * La segunda y la tercera unidad de negocio en la home, en un solo bloque:
 * **texto a un lado y las dos fotos al otro**, con una salida a los despieces.
 * No es un adelanto de catálogo, y ahí está el cambio.
 *
 * **Llevaba un carrusel de cortes con foto y se sacó por pedido.** Tenía la
 * misma forma que el de pescados —titular, carrusel, salida— y ése era el
 * problema: dos pistas de fotos al hilo prometían dos catálogos del mismo peso,
 * que es justo lo que la unidad de carnes se ocupa de desmentir. Carnes no tiene
 * catálogo publicado y no lo va a tener mientras la especificación se arme
 * contra el pedido.
 *
 * **Después fue sólo texto, y era el bloque más flaco de la home**: un titular,
 * un párrafo y un botón sobre fondo liso, entre un carrusel de especies arriba y
 * el formulario abajo. Ahora lleva las mismas dos fotos que identifican a las
 * unidades en el índice de `/productos`, que es a donde el botón lleva: llegar y
 * reencontrarlas confirma que se llegó a donde se quería, igual que la apertura
 * de `/nosotros` repite la foto de su tarjeta.
 *
 * **Van sin velo y sin nombre encima**, a diferencia de `TarjetaConFoto`. Acá el
 * titular que tienen al lado ya las nombra, así que el nombre sería la tercera
 * vez que se dice lo mismo; y sin texto encima, el velo no tiene qué proteger.
 * Por eso tampoco hay que medirles el píxel más claro: la cuenta del 50 % existe
 * para que un nombre en crema llegue a 3:1.
 *
 * **Son decorativas** —`alt` vacío—: lo que dicen está en el titular y en la
 * bajada, y el enlace es el botón.
 *
 * **El titular nombra las dos unidades** —carnes y pollo—, que es lo que hay del
 * otro lado desde que los dos despieces comparten bloque. Decía sólo "Carnes", y
 * así el pollo no aparecía en ninguna parte de la home salvo en un icono del
 * hero.
 *
 * **La línea es propia (`home.carnes.texto`) y reemplazó a una del cliente.**
 * Acá estuvo `productos.carnes.entrada` —"No es nuestro foco y no lo
 * disimulamos: pescados y mariscos es la unidad que tiene catálogo. Carnes la
 * tomamos cuando podemos llevar la operación hasta el final"— que explicaba bien
 * por qué no hay catálogo pero **se leía como una disculpa**: en un CTA, decir
 * primero lo que no se hace suena a que no se sabe del tema. La que está ahora
 * dice lo mismo por el lado del oficio —a pedido, con el frigorífico habilitado
 * que pide cada destino, especificación por operación—: explica igual por qué no
 * hay catálogo, sin pedir permiso. `productos.carnes.entrada` vuelve a quedar
 * sin consumidor y no se borró.
 *
 * **El botón sigue siendo el de borde y no el sólido.** El sólido es del CTA de
 * contacto, que es la única acción real de la home; esto es una salida a otra
 * parte del sitio, igual que el de pescados.
 *
 * **No abre ancla y no entra en `SECCIONES`.** La navegación del sitio lleva a
 * `Productos`, que es el índice de las tres unidades; sumar una entrada más al
 * header por un bloque de la home sería contar dos veces la misma estructura.
 */
export default function ResumenDeCarnes() {
  const t = useTranslations('home.carnes');

  return (
    <Section fondo={FONDO}>
      {/* **Las fotos van después del texto en el DOM y antes en pantalla desde
          `lg`.** Leído en orden, primero está de qué se habla; mirado, la vista
          entra por la imagen. `order` lo resuelve sin duplicar nada ni desordenar
          la tabulación, porque acá adentro el único control es el botón.

          **El texto no se lleva la mitad**: se fija en 22rem, que es medida
          cómoda para un párrafo de cinco renglones, y el resto se lo quedan las
          fotos. A mitades quedaban en 250 px de ancho cada una. */}
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
        <div className="lg:w-[22rem] lg:shrink-0">
          <SectionHeading className="uppercase">{t('titulo')}</SectionHeading>
          <p className="mt-4 text-entrada">{t('texto')}</p>
          <BotonSaberMas
            className="mt-8"
            href={{ pathname: '/productos', hash: ANCLA_DE_UNIDAD.carnes }}
          >
            {t('cta')}
          </BotonSaberMas>
        </div>

        <div className="grid w-full grid-cols-2 gap-4 lg:order-first lg:flex-1">
          {FOTOS.map((unidad) => (
            <div key={unidad} className="relative aspect-[3/2] overflow-hidden">
              <Image
                src={FOTO_DE_UNIDAD[unidad]}
                alt=""
                fill
                sizes={MEDIDAS}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
