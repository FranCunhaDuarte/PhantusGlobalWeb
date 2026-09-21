import IndiceDeAccesos from '@/components/accesos/IndiceDeAccesos';
import Section from '@/components/ui/Section';

// Crema elevado: va pegado al hero, que es tinta, y abajo arranca el crema base
// de `productos`. Es el primer tramo de la alternancia de la home.
const FONDO = 'crema-elevado';

/**
 * El índice del sitio, pegado al hero: tres tarjetas con foto que llevan a
 * quiénes somos, a los mercados y al catálogo. Es lo primero que aparece al
 * bajar del video, y por eso son tres puertas y no tres argumentos — quien entra
 * elige antes de leer.
 *
 * **Va sin titular ni bajada, y es el único bloque de la home que no tiene
 * ninguno de los dos.** Los nombres de las tarjetas ocupan el cuerpo de un
 * titular y dicen exactamente lo que hay del otro lado; un encabezado encima
 * sería un cuarto rótulo diciendo "y además, estas tres cosas". Por eso la
 * `Section` tampoco abre ancla: no hay titular al que colgarle el
 * `aria-labelledby`, y la lista ya se anuncia como lista de tres enlaces.
 *
 * **Reemplazó al bloque de nosotros**, que era un titular, una línea y un botón.
 * Lo que decía —quién responde por la operación— sigue entero en `/nosotros`, a
 * un clic de la primera tarjeta.
 */
export default function AccesosDelSitio() {
  return (
    <Section fondo={FONDO}>
      <IndiceDeAccesos />
    </Section>
  );
}
