import ImagenDeCorte from '@/components/productos/ImagenDeCorte';
import Panel from '@/components/ui/Panel';

/**
 * Medidas de la tarjeta, en píxeles y no en clases: quien la coloca necesita el
 * número para ponerla por encima del puntero sin medirla en cada movimiento.
 * Son los mismos que la clase de abajo: 14rem de ancho, y el alto que salen del
 * relleno, la foto en 4:3 y el rótulo. Si cambia una clase, cambian estos.
 */
export const ANCHO_DE_TARJETA = 224;
export const ALTO_DE_TARJETA = 203;

/** Ancho de render de la foto dentro de la tarjeta. */
const MEDIDAS = '224px';

/** La tarjeta mide siempre lo mismo, así que la marca de agua también: una sola
 *  medida, la mínima del manual para el isotipo suelto. */
const ANCHO_DE_MARCA = 50;

type TarjetaDeCorteProps = {
  corte: string;
  nombre: string;
};

/**
 * Lo que aparece al apuntar un corte: su nombre y la foto del corte. La media
 * res dejó de llevar los nombres escritos encima —eran dieciocho rótulos, varios
 * girados y otros achicados para entrar— y pasaron acá, donde hay lugar para el
 * nombre entero y para mostrar de qué se está hablando.
 *
 * El hueco es el mismo del catálogo de especies: con foto o sin ella la tarjeta
 * mide lo mismo, así que enchufar los PNG no la hace saltar.
 */
export default function TarjetaDeCorte({ corte, nombre }: TarjetaDeCorteProps) {
  return (
    <Panel
      fondo="crema-elevado"
      className="w-56 border borde-seccion p-3 shadow-lg"
    >
      <ImagenDeCorte
        corte={corte}
        medidas={MEDIDAS}
        anchoDeMarca={ANCHO_DE_MARCA}
      />
      <p className="mt-2 text-center text-sm font-semibold">{nombre}</p>
    </Panel>
  );
}
