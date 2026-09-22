/**
 * Los dos canales directos, además del formulario. Lo que se ve —el número
 * formateado y la dirección— vive en los catálogos, igual que `pie.correo`: son
 * nombres propios y valen lo mismo en los dos idiomas. Acá vive lo que no se ve.
 *
 * **El número marcable no es el que se lee.** El cliente lo pasó como
 * `+54 0 223 683-8585`, y ese `0` es el prefijo interurbano argentino: se marca
 * desde adentro del país y **se cae** cuando adelante va `+54`. Un `tel:` con el
 * cero de más no conecta desde el exterior, que es justamente de donde llaman
 * los importadores. Así que el enlace va en E.164 —sin espacios y sin guiones— y
 * el texto a la vista se queda con la separación que se lee mejor.
 *
 * **Es un celular, confirmado por Franco**, y por eso lleva el `9` entre el país
 * y el área. Ese nueve hace el mismo trabajo que el cero pero al revés: desde el
 * exterior es obligatorio y desde adentro del país no se marca. Los dos dígitos
 * juntos —`+54 0 9`— no existen; va el nueve y no va el cero.
 */
export const TELEFONO_MARCABLE = '+5492236838585';
