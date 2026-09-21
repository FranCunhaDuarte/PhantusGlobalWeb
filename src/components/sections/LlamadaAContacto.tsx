import { ButtonLink } from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import { enlaceDeConsulta } from '@/content/consulta';

type LlamadaAContactoProps = {
  titulo: string;
  texto: string;
  cta: string;
};

/**
 * Cierre de las subpáginas. El CTA lleva al formulario de la home con el tipo de
 * consulta puesto en la query, igual que el hero: `enlaceDeConsulta` arma una
 * ruta y no un ancla, así que funciona desde cualquier página y en cualquier
 * idioma.
 *
 * **Fueron dos botones, uno por punta de la operación** —"Soy importador" en
 * sólido y "Soy exportador" en borde—. Quedó uno cuando el sitio pasó a hablarle
 * sólo al importador: el segundo botón no tenía a quién llevar.
 *
 * Con un solo botón se va también la variante de borde, que existía para
 * jerarquizar entre los dos. Acá no hay nada que jerarquizar.
 */
export default function LlamadaAContacto({
  titulo,
  texto,
  cta
}: LlamadaAContactoProps) {
  return (
    <Section fondo="bordo" medida="angosta">
      <div className="flex flex-col gap-5">
        <SectionHeading>{titulo}</SectionHeading>
        <p className="text-entrada">{texto}</p>
        <div className="mt-2 flex">
          <ButtonLink href={enlaceDeConsulta('compra')}>{cta}</ButtonLink>
        </div>
      </div>
    </Section>
  );
}
