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

/**
 * El mismo número, en el formato que pide WhatsApp: **sin el `+` y sin nada que
 * no sea dígito**. `wa.me` no acepta espacios ni guiones y con el `+` adelante
 * arma un enlace que no abre conversación.
 *
 * El `9` sí va, igual que en el `tel:`: para WhatsApp el número de un celular
 * argentino es el internacional completo.
 */
export const WHATSAPP = `https://wa.me/${TELEFONO_MARCABLE.replace(/\D/g, '')}`;
