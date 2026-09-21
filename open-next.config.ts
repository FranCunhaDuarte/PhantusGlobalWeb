import { defineCloudflareConfig } from '@opennextjs/cloudflare';

/**
 * Configuración del adaptador de Cloudflare.
 *
 * **Va sin caché incremental a propósito.** El adaptador ofrece enganchar KV,
 * R2 o D1 como almacén de ISR, y acá no hace falta: las catorce URLs se
 * prerenderizan en el build y ninguna declara `revalidate`, así que salen de
 * Workers Assets como archivos quietos. Lo único que corre en el Worker son el
 * proxy de idioma y la Server Action del formulario, y ninguno de los dos
 * cachea nada.
 *
 * El día que alguna página pase a revalidarse, esto es lo que hay que tocar:
 * `incrementalCache` con el binding correspondiente.
 */
export default defineCloudflareConfig();
