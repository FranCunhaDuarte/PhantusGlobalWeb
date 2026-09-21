/**
 * Los dos canales directos, además del formulario. Lo que se ve —el número
 * formateado y la dirección— vive en los catálogos, igual que `pie.correo`: son
 * nombres propios y valen lo mismo en los dos idiomas. Acá vive lo que no se ve.
 *
 * **El número marcable no es el que se lee.** El cliente lo pasó como
 * `+54 0 223 683-8585`, y ese `0` es el prefijo interurbano argentino: se marca
 * desde adentro del país y **se cae** cuando adelante va `+54`. Un `tel:` con el
 * cero de más no conecta desde el exterior, que es justamente de donde llaman
 * los importadores. Así que el enlace va en E.164 —sin cero, sin espacios y sin
 * guiones— y el texto a la vista se queda con la separación que se lee mejor.
 *
 * Está escrito como línea fija de Mar del Plata (área 223, ocho dígitos de
 * abonado). **Si fuera un celular** hay que meter un `9` entre el país y el
 * área: `+549223...`. Conviene confirmarlo antes de publicar.
 */
export const TELEFONO_MARCABLE = '+542236838585';
