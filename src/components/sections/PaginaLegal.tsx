import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';

type Tramo = { id: string; titulo: string; texto: string };

type PaginaLegalProps = {
  titulo: string;
  entrada: string;
  actualizado: string;
  tramos: readonly Tramo[];
};

/**
 * El molde de las dos páginas legales. Es una sola pieza porque las dos se leen
 * igual: titular, una línea de encuadre, la fecha de última actualización y una
 * lista de tramos numerados.
 *
 * **No lleva hero con foto**, que es lo que abre `/nosotros`, `/mercados` y
 * `/productos`. Una página legal se abre para buscar un dato, no para que la
 * recorran: una foto a pantalla completa acá sólo pondría media pantalla entre
 * quien llega y lo que vino a leer.
 *
 * **La columna es angosta a propósito.** Es la única parte del sitio con texto
 * corrido de verdad, y a ancho de contenedor la línea pasaría las cien letras.
 *
 * **El número del tramo va en el gris de lo secundario y el título en el color
 * del texto**: el número ordena, no informa. Es el mismo criterio que los pasos
 * de cómo trabajamos.
 */
export default function PaginaLegal({
  titulo,
  entrada,
  actualizado,
  tramos
}: PaginaLegalProps) {
  return (
    <Section fondo="crema" medida="angosta">
      <div className="flex flex-col gap-4">
        <SectionHeading nivel={1} escala="titulo-mayor">
          {titulo}
        </SectionHeading>
        <p className="text-entrada">{entrada}</p>
        <p className="text-sm texto-suave">{actualizado}</p>
      </div>

      {/* `<ol>` y no una pila de `<section>`: los tramos están numerados y el
          número es parte de cómo se los cita. El lector de pantalla anuncia
          cuántos son y en cuál está. */}
      <ol className="mt-14 flex flex-col gap-10">
        {tramos.map((tramo, i) => (
          <li key={tramo.id} className="flex flex-col gap-3">
            <h2 className="flex gap-3 text-lg font-semibold">
              <span aria-hidden className="texto-suave">
                {i + 1}.
              </span>
              {tramo.titulo}
            </h2>
            {/* `whitespace-pre-line`: algún tramo lleva más de un párrafo y el
                corte es parte del texto, no algo que se adivine del ancho. Va
                como salto de línea en el catálogo, igual que el nombre de la
                unidad de pescados. */}
            <p className="whitespace-pre-line">{tramo.texto}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
