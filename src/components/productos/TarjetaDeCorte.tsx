import Panel from '@/components/ui/Panel';

/**
 * Medidas de la tarjeta, en píxeles y no en clases: quien la coloca necesita el
 * número para ponerla por encima del puntero sin medirla en cada movimiento.
 * Salen del ancho fijo, del relleno, del borde y de la altura de línea del
 * nombre. **Si cambia una clase de abajo, cambian estos dos**, y se comprueban
 * midiendo la tarjeta en el navegador.
 */
export const ANCHO_DE_TARJETA = 192;
export const ALTO_DE_TARJETA = 46;

type TarjetaDeCorteProps = {
  nombre: string;
};

/**
 * Lo que aparece al apuntar un corte: su nombre, y nada más. La media res dejó
 * de llevar los nombres escritos encima —eran dieciocho rótulos, varios girados
 * y otros achicados para entrar— y pasaron acá, donde hay lugar para el nombre
 * entero.
 *
 * **Llevó también la foto del corte y se sacó por pedido.** De los veintitrés
 * cortes que hay entre la res y el ave, diecinueve no tienen PNG, así que la
 * mayoría de las veces lo que se abría era el hueco con la marca de agua: una
 * caja de 150 px de alto que no mostraba nada y empujaba el nombre lejos del
 * puntero. Sin ella la tarjeta bajó de 203 px de alto a 46 y quedó pegada al
 * cursor, que es donde se la está mirando.
 *
 * **Con esto `ImagenDeCorte` se quedó sin el único consumidor que le quedaba.**
 * El otro era el adelanto de cortes de la home, que también se sacó por pedido,
 * así que hoy **los cuatro PNG de corte no se sirven en ninguna parte del
 * sitio**. No se borraron: son material del cliente.
 *
 * **El ancho es fijo y no `fit-content`.** Con ancho automático la tarjeta
 * cambiaría de medida entre "Lomo" y "Colita de cuadril", y como se centra sobre
 * el puntero restándole la mitad del ancho, saltaría de lugar al pasar de un
 * corte al de al lado. Los 192 px entran el nombre más largo de los dos idiomas
 * —"Colita de cuadril" y "Drumstick and leg", diecisiete caracteres— en un solo
 * renglón; si alguna vez entra uno más largo, el nombre parte en dos y hay que
 * subir `ALTO_DE_TARJETA`.
 */
export default function TarjetaDeCorte({ nombre }: TarjetaDeCorteProps) {
  return (
    <Panel
      fondo="crema-elevado"
      className="w-48 border borde-seccion px-3 py-3 shadow-lg"
    >
      <p className="text-center text-sm font-semibold">{nombre}</p>
    </Panel>
  );
}
