/**
 * Los cuatro datos duros que abren `/nosotros`, en el orden en que se leen: de
 * dónde salimos, a dónde llegamos, con quién trabajamos y en cuánto contestamos.
 *
 * **El segundo fue la estructura legal en Estados Unidos y ahora son los cuatro
 * mercados.** El dato viejo era real pero el más flojo de los cuatro para quien
 * lee: "Estados Unidos" a secas no dice si es una sociedad, una facturación o un
 * destino. Primero salió de la lista, y después **el cliente pidió borrarlo del
 * código**, así que la clave `nosotros.datos.estructura` ya no existe en ningún
 * catálogo.
 *
 * > **La afirmación sobrevive en otro lado y conviene saberlo**: `/mercados`
 * > sigue diciendo "En Estados Unidos, al origen argentino se le suma estructura
 * > legal propia". Si lo que hay que sacar es el reclamo y no sólo este dato,
 * > ése es el que queda.
 *
 * **Y la red dejó de ser de exportadores.** Por pedido del cliente el valor pasa
 * a `Frigoríficos habilitados por SENASA`, y lo mismo en las otras tres partes
 * del sitio donde se decía.
 *
 * **Existen para no escribirlos como prosa.** La página abría con tres párrafos
 * —rol, misión y responsable, 546 caracteres— que decían exactamente esto
 * envuelto en frases. Un dato con su rótulo se lee de un vistazo y no pide
 * leerse entero; además, el que busca uno solo lo encuentra sin barrer un
 * párrafo.
 *
 * El rótulo y el valor de cada uno salen de `nosotros.datos.<id>`, con `rotulo`
 * y `valor` por separado, porque el rótulo va en versalita gris y el valor en el
 * color del texto.
 */
export const CREDENCIALES = [
  'origen',
  'mercados',
  'red',
  'respuesta'
] as const;

export type Credencial = (typeof CREDENCIALES)[number];
