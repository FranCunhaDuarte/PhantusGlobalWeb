import type { ReactNode } from 'react';
import MensajeDeError from '@/components/contacto/MensajeDeError';
import { clases } from '@/lib/clases';

/** Lo que el campo le pasa a su control para que queden atados label, nota y error. */
export type ControlDeCampo = {
  id: string;
  name: string;
  className: string;
  required?: true;
  'aria-invalid'?: true;
  'aria-describedby'?: string;
};

type CampoProps = {
  campo: string;
  etiqueta: string;
  /** Su presencia es lo que marca el campo como no obligatorio, acá y en el DOM. */
  opcional?: string;
  /** Aclaración de cómo completarlo. Va debajo del control, no entre él y su etiqueta. */
  nota?: string;
  error?: string;
  children: (control: ControlDeCampo) => ReactNode;
};

/**
 * El campo es una caja del mismo tono que su panel, definida enteramente por su
 * borde.
 *
 * **Fueron dos versiones que no funcionaron, y por motivos opuestos.** La
 * primera era una caja con borde pleno en `ink-muted` y fondo `surface` sobre el
 * crema elevado del panel: el borde pesaba 5,2:1 —contraste de sobra, presencia
 * de formulario de trámite— y encima el campo quedaba **más oscuro que el
 * panel**, así que lo más pesado de la pieza era la parte vacía. La segunda sacó
 * la caja entera y dejó sólo una regla abajo; quedó liviana pero sin cuerpo: un
 * campo vacío no se veía hasta que se lo apuntaba.
 *
 * Lo que queda toma de cada una lo que servía. Sigue siendo una caja, porque un
 * control tiene que verse antes de tocarlo, pero:
 *
 * - **El campo y el panel son el mismo crema elevado.** Hubo un tramo en que el
 *   panel iba en crema base y la caja se levantaba un tono por encima, que era
 *   la inversión exacta de la primera versión; el panel se aclaró por pedido y
 *   con eso la diferencia de tono desapareció. **Lo único que dibuja la caja es
 *   el borde**, así que su contraste dejó de ser un respaldo y pasó a ser lo
 *   único que hay.
 * - **El borde es neutro y suave**, no un rectángulo de color. `--fondo-separador`
 *   es tinta al 50 % y da 3,45:1: exactamente el 3:1 que pide el límite de un
 *   control, sin un punto de más. Ese token existe para esto.
 * - **El relleno es 16 × 10 px**, que deja el campo en 46 px de alto. Fue 14
 *   vertical —54 px— con el argumento de que los campos apretados se leen como
 *   planilla; se bajó por pedido. El piso no es el gusto sino el área de toque:
 *   el mínimo de WCAG son 24 px y acá hay casi el doble, así que todavía sobra
 *   margen, pero por debajo de unos 40 el campo empieza a costar en el teléfono.
 * - **Al apuntar y al enfocar el borde cambia de color y nada más se mueve.** El
 *   anillo de foco del sitio, que va a 3 px por fuera, acá está apagado: sobre
 *   una caja redondeada dibujaba un halo flotante. Lo que marca el foco es el
 *   borde más un anillo pegado; el porqué está en `NORMAL`.
 *
 * El error suma un anillo en vez de engrosar el borde, que es lo único que la
 * primera versión tenía bien: un borde más grueso correría el campo un píxel
 * justo cuando alguien está mirándolo.
 */
const CONTROL = [
  // `scroll-mt-ancla` es el mismo margen de scroll que usan las secciones: al
  // fallar, el foco salta al primer campo inválido y sin esto el navegador lo
  // deja pegado al borde de arriba, o sea entero debajo del header sticky.
  'w-full scroll-mt-ancla bg-surface-raised px-4 py-2.5 text-base',
  'rounded-md border transition-colors motion-reduce:transition-none',
  // El anillo de foco del sitio va a 3 px del borde, y sobre una caja
  // redondeada eso dibuja un halo flotante que repite la forma del campo. Acá
  // se apaga y el foco lo marca el borde. Ver `NORMAL`.
  'focus:outline-none'
].join(' ');

/**
 * **El color con variante va como `border-[var(--x)]` y no como
 * `border-(color:--x)`.** El atajo con paréntesis funciona suelto —lo usan el
 * borde de reposo de acá abajo y la flecha del carrusel— pero **con `hover:` o
 * `focus:` adelante Tailwind no genera la regla**: la clase queda en el DOM, la
 * hoja no la tiene y el borde no cambia nunca. Está comprobado en el navegador,
 * preguntándole a `document.styleSheets` por el selector.
 */
const NORMAL = [
  'border-(color:--fondo-separador)',
  'hover:border-[var(--fondo-texto)]',
  // **Sin el anillo del sitio, esto es lo único que marca el foco**, así que no
  // alcanza con cambiar el color del borde: un borde de 1 px que pasa de gris a
  // azul es un cambio de color solo, y quien no distingue esos dos tonos se
  // queda sin saber dónde está parado. El anillo pegado —sin desplazamiento— le
  // suma un píxel por fuera, de modo que el límite se lee como 2 px de azul sin
  // que nada se mueva. Es la misma mecánica del estado de error, que ya la usaba.
  'focus:border-[var(--fondo-foco)] focus:ring-1 focus:ring-[var(--fondo-foco)]'
].join(' ');

// Al enfocar un campo inválido el anillo engorda en vez de cambiar de color: el
// error es el dato más importante de los dos, así que el rojo se queda y lo que
// avisa del foco es el grosor. Sin esto, un campo inválido enfocado se ve igual
// que uno inválido sin enfocar.
const CON_ERROR = [
  'border-(color:--fondo-error) ring-1 ring-(color:--fondo-error)',
  'focus:ring-2 focus:ring-[var(--fondo-error)]'
].join(' ');

export default function Campo({
  campo,
  etiqueta,
  opcional,
  nota,
  error,
  children
}: CampoProps) {
  const idNota = nota ? `${campo}-nota` : undefined;
  const idError = error ? `${campo}-error` : undefined;
  // El error va primero: es lo accionable, y el orden de `aria-describedby` es
  // el orden en que se lee.
  const descripcion = [idError, idNota].filter(Boolean).join(' ');

  return (
    <div className="flex flex-col gap-2">
      {/* El rótulo del campo es el rótulo del sitio: el mismo cuerpo, la misma
          caja alta y el mismo gris que llevan los encabezados del pie y los
          extremos de alcance. Era `text-sm font-semibold`, que no es un estilo
          que exista en ninguna otra parte. */}
      <label htmlFor={campo} className="text-eyebrow uppercase texto-suave">
        {etiqueta}
        {opcional && <span className="ml-1.5 normal-case">({opcional})</span>}
      </label>

      {children({
        id: campo,
        name: campo,
        className: clases(CONTROL, error ? CON_ERROR : NORMAL),
        required: opcional ? undefined : true,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': descripcion || undefined
      })}

      {error && idError && (
        <MensajeDeError id={idError}>{error}</MensajeDeError>
      )}

      {nota && idNota && (
        <p id={idNota} className="text-sm texto-suave">
          {nota}
        </p>
      )}
    </div>
  );
}
