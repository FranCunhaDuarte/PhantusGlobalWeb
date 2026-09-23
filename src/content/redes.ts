/**
 * Los dos perfiles de LinkedIn. Son URLs, o sea dato y no texto visible: lo
 * único que se lee es la palabra "LinkedIn", que vive en los catálogos.
 *
 * **Son dos y hacen cosas distintas.** El de la empresa entra al JSON-LD como
 * `sameAs`, que es donde Google espera los perfiles oficiales de una
 * organización y lo que le deja atar el sitio con la página. El de la persona no
 * va ahí —no es un perfil de la organización— y se usa en `/nosotros` y en
 * contacto, que es donde el nombre dice algo.
 *
 * > **El sitio volvió a nombrar a una persona.** Hubo un responsable con nombre
 * > y apellido en el pie y se sacó por pedido, junto con la dirección personal
 * > que lo llevaba. Esto no es lo mismo que volver atrás: el correo sigue siendo
 * > uno solo y genérico, y lo que vuelve es un nombre con cargo y perfil, que es
 * > un argumento de credibilidad y no un canal de contacto.
 */
export const LINKEDIN_DE_LA_EMPRESA =
  'https://www.linkedin.com/company/phantus-global';

export const LINKEDIN_DEL_RESPONSABLE =
  'https://www.linkedin.com/in/leandro-fenoy-71082817b/';
