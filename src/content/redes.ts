/**
 * El LinkedIn de la empresa. Es una URL, o sea dato y no texto visible: lo único
 * que se lee es la palabra "LinkedIn", que vive en los catálogos.
 *
 * Entra al JSON-LD como `sameAs`, que es donde Google espera los perfiles
 * oficiales de una organización y lo que le deja atar el sitio con la página.
 *
 * > **Acá vivía también el perfil de la persona y se borró.** El sitio llegó a
 * > nombrar a un responsable —nombre, cargo y LinkedIn en `/nosotros` y al lado
 * > del formulario— y el cliente pasó a imagen de empresa: ninguna página
 * > pública lleva un nombre propio.
 * >
 * > **No alcanzaba con dejar de mostrarlo.** Los catálogos de i18n viajan
 * > enteros al navegador, así que el nombre seguía llegando en el payload de
 * > cada página aunque no se dibujara en ninguna. Por eso salieron también las
 * > claves `nosotros.responsable.*` y el componente que las usaba.
 */
export const LINKEDIN_DE_LA_EMPRESA =
  'https://www.linkedin.com/company/phantus-global';
