/**
 * Los cuatro datos duros que abren `/nosotros`, en el orden en que se leen: de
 * dónde salimos, a dónde llegamos, con quién trabajamos y en cuánto contestamos.
 *
 * **El segundo fue la estructura legal en Estados Unidos y ahora son los cuatro
 * mercados.** El dato viejo era real pero el más flojo de los cuatro para quien
 * lee: "Estados Unidos" a secas no dice si es una sociedad, una facturación o un
 * destino. No se perdió —sigue en la `metaDescription` de esta página y en el
 * bloque de destino de `/mercados`, donde tiene contexto— y su clave
 * `nosotros.datos.estructura` quedó sin consumidor y sin borrar.
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
