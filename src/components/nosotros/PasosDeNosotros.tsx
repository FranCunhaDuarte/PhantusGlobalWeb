import { useTranslations } from 'next-intl';
import Panel from '@/components/ui/Panel';
import SectionHeading from '@/components/ui/SectionHeading';
import { PASOS_DE_NOSOTROS } from '@/content/proceso';

/**
 * Los cuatro pasos de `/nosotros`, **como tarjeta y en dos por dos**.
 *
 * **Empezó como la lista de `/como-trabajamos` y no servía acá.** Aquella es una
 * pila de renglones a ancho completo, y funciona porque cada paso tiene un
 * título que ancla la mirada y un párrafo que justifica el ancho. Éstos son una
 * frase cada uno: en un renglón de 1088 px, una oración de diez palabras queda
 * flotando al lado de un número y el bloque se lee como cuatro líneas sueltas.
 *
 * Dos por dos arregla lo dos cosas a la vez: **la medida** —cada frase queda en
 * unos 460 px, que es medida de lectura— y **la forma**, porque un cuadro de
 * cuatro se lee como un proceso de cuatro pasos y una pila de cuatro renglones,
 * no.
 *
 * **Va en un `Panel` y no suelto sobre la sección.** Es el bloque que ocupa el
 * lugar que dejó la tarjeta del responsable, entre la banda de credenciales y la
 * tarjeta de la ciudad, y las dos vecinas son piezas con borde propio: suelto,
 * el bloque quedaba como el único tramo de texto desnudo de la página. El crema
 * elevado del panel sobre el crema de la sección es la misma inversión que usa
 * el formulario de contacto.
 *
 * **El número es grande y gris, no una viñeta.** Va en `tabular-nums` para que
 * los cuatro se alineen, y `aria-hidden` porque el orden ya lo dice la lista:
 * leído en voz alta, "01" antes de cada paso es ruido.
 *
 * **Sin hairline por celda**, que es lo que sí llevan los cuatro datos duros de
 * la banda de arriba. Son dos grillas de cuatro, una encima de la otra: con la
 * misma línea las dos, la página parecería repetir el mismo bloque dos veces.
 * Acá el corte lo da el panel.
 */
export default function PasosDeNosotros() {
  const t = useTranslations('nosotros.proceso');

  return (
    <Panel fondo="crema-elevado" className="p-8 sm:p-12">
      <SectionHeading>{t('titulo')}</SectionHeading>
      <ol className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2">
        {PASOS_DE_NOSOTROS.map((paso, indice) => (
          <li key={paso} className="flex gap-5">
            <span
              aria-hidden
              className="text-titulo leading-none tabular-nums texto-suave"
            >
              {String(indice + 1).padStart(2, '0')}
            </span>
            <p className="text-entrada">{t(`pasos.${paso}`)}</p>
          </li>
        ))}
      </ol>
    </Panel>
  );
}
