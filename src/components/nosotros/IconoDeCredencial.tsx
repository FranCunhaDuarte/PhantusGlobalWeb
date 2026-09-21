import type { Credencial } from '@/content/credenciales';

/**
 * Un trazado por credencial. **Son de Lucide** (licencia ISC, uso comercial
 * permitido y sin atribución obligatoria) y están copiados adentro en vez de
 * venir del paquete, por lo mismo que los del hero: son cuatro iconos de los más
 * de mil que trae `lucide-react`, y copiados el grosor y el tamaño los decide el
 * sitio. Queda anotado en `src/imagenes/FUENTES.md`.
 *
 * **Cada uno dibuja el rótulo y no el valor**, que es lo que los vuelve útiles a
 * los cuatro juntos: el pin para el origen, el globo para los mercados, el
 * organigrama para la red y el reloj para el plazo. Un icono que dibujara el
 * valor —una bandera argentina, cuatro banderitas— repetiría lo que el dato ya
 * dice y encima ataría el icono a un valor que puede cambiar. Es justo lo que
 * pasó: el segundo dato dejó de ser la estructura legal y pasó a ser los cuatro
 * mercados, y lo único que hubo que cambiar fue este trazado.
 */
const TRAZADO: Record<Credencial, React.ReactNode> = {
  origen: (
    <>
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  mercados: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </>
  ),
  red: (
    <>
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
      <path d="M12 12V8" />
    </>
  ),
  respuesta: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </>
  )
};

/**
 * **Va `aria-hidden` y sin nombre accesible.** El rótulo de al lado ya dice de
 * qué dato se trata, así que anunciarlo otra vez sería leer dos veces lo mismo.
 * Es al revés que los iconos del hero, que ahí sí llevan su nombre en `sr-only`
 * porque son lo único que nombra los rubros.
 *
 * El trazo va en 1,5 como el resto de los iconos del sitio, y el color sale del
 * gris de lo secundario: el icono acompaña al rótulo, no al valor, así que pesa
 * lo mismo que el rótulo.
 */
export default function IconoDeCredencial({
  credencial
}: {
  credencial: Credencial;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-6 shrink-0 texto-suave"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {TRAZADO[credencial]}
    </svg>
  );
}
