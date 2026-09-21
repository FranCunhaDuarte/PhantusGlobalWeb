import type { ReactNode } from 'react';
import EnlaceDeSeccion from '@/components/layout/EnlaceDeSeccion';
import { ButtonLink, clasesDeBoton } from '@/components/ui/Button';
import type { IdSeccion } from '@/content/secciones';
import type { Ruta } from '@/i18n/routing';
import { clases } from '@/lib/clases';

/**
 * El destino como ruta admite la forma de objeto además de la cadena, para
 * poder apuntar a un ancla dentro de otra página: es lo que necesitan los dos
 * bloques de la home desde que las unidades de negocio dejaron de tener hoja
 * propia y pasaron a ser anclas de `/productos`. El `hash` va sin numeral,
 * que es como lo quiere el `Link` tipado.
 */
type DestinoDeRuta = Ruta | { pathname: Ruta; hash: string };

type Destino =
  | { seccion: IdSeccion; href?: never }
  | { href: DestinoDeRuta; seccion?: never };

type BotonSaberMasProps = Destino & {
  children: ReactNode;
  className?: string;
};

/**
 * La salida de un bloque corto de la home hacia la página que lo desarrolla.
 * Cuando el destino es una sección va por `EnlaceDeSeccion` y no por
 * `ButtonLink`: a dónde apunta una sección lo decide ese componente y no quien
 * lo monta, así el día que una página vuelva a ser un ancla el botón sigue
 * funcionando sin tocarse. Las páginas que no son sección —una unidad de
 * negocio, por ejemplo— no tienen esa ambigüedad y van derecho por la ruta.
 *
 * Variante de borde, que es la secundaria que ya existe: el botón sólido queda
 * reservado para el CTA de contacto, que es la única acción de la página.
 *
 * El envoltorio es el que limita el ancho: un `w-fit` en la misma clase
 * perdería contra el `inline-flex` de la base del botón.
 */
export default function BotonSaberMas(props: BotonSaberMasProps) {
  const { children, className } = props;

  const contenido = (
    <>
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h13m-6-6 6 6-6 6" />
      </svg>
    </>
  );

  return (
    <div className={clases('flex', className)}>
      {props.seccion ? (
        <EnlaceDeSeccion
          seccion={props.seccion}
          className={clasesDeBoton({ variante: 'borde' })}
        >
          {contenido}
        </EnlaceDeSeccion>
      ) : (
        <ButtonLink href={props.href} variante="borde">
          {contenido}
        </ButtonLink>
      )}
    </div>
  );
}
