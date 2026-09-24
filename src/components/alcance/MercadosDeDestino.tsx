import { useTranslations } from 'next-intl';
import { MERCADOS } from '@/content/mercados';

/**
 * Los cuatro mercados de destino, en grilla sobre tinta.
 *
 * ## Reemplazó a un árbol que dibujaba un rectángulo vacío
 *
 * El bloque anterior (`RutasDeMercado`) los dibujaba como un origen y cuatro
 * ramas: "Mar del Plata" a la izquierda, un trunco vertical y cuatro líneas
 * horizontales hasta los nombres, alineados a la derecha. La idea era buena
 * —de un puerto salen cuatro destinos— y el resultado, no:
 *
 * - **Las cuatro ramas más el trunco leen como una tabla**, no como un árbol.
 *   Cinco líneas rectas cerrando un área son un borde, y el ojo lee un
 *   rectángulo con el interior en blanco.
 * - **Ese rectángulo medía unos 600 px de ancho y no tenía nada adentro.** Más
 *   de la mitad de la banda era aire encerrado.
 * - **Los nombres quedaban expulsados contra el borde derecho**, lo más lejos
 *   posible del origen del que supuestamente colgaban.
 * - **El origen repetía el titular de la página**, que ya dice "Del puerto de
 *   Mar del Plata al mundo" dos bloques más arriba.
 *
 * ## Qué hace en su lugar
 *
 * Cuatro celdas con su pelo arriba, el nombre en el cuerpo del titular. Es el
 * mismo gesto que los datos duros de `/nosotros`: una grilla de cuatro donde
 * cada uno arranca con su línea. Acá los mercados ocupan el ancho entero de la
 * banda en vez de una cuarta parte, que era el argumento del bloque —la página
 * se llama Mercados y los mercados tienen que ser lo más grande que hay—.
 *
 * **`text-balance` en el nombre**, que sólo hace falta para uno: "Estados
 * Unidos" no entra en una celda de 248 px y parte en dos. Sin balancear queda
 * "Estados" arriba y "Unidos" solo abajo; con él, las dos líneas se reparten.
 *
 * **El cumplimiento sigue debajo de la grilla y no adentro de su celda.** De los
 * cuatro mercados hay estándar publicado de uno solo, así que meterlo en la
 * celda de Estados Unidos deja tres celdas visiblemente incompletas y sugiere
 * que a los otros tres les falta el dato. Abajo, la nota arranca nombrando el
 * mercado y la asimetría se lee como lo que es: hay dato de uno.
 *
 * Va como `<ul>` porque es una enumeración: el lector de pantalla anuncia
 * cuántas son antes de leerlas.
 */
export default function MercadosDeDestino({
  etiqueta,
  cumplimiento
}: {
  etiqueta: string;
  cumplimiento: string;
}) {
  const t = useTranslations('mercados.mercados');

  return (
    <div>
      <h2 className="text-eyebrow uppercase texto-suave">{etiqueta}</h2>

      <ul className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {MERCADOS.map((mercado) => (
          <li key={mercado} className="border-t borde-seccion pt-6">
            <p className="text-titulo leading-tight text-balance">
              {t(mercado)}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-14 max-w-2xl">{cumplimiento}</p>
    </div>
  );
}
