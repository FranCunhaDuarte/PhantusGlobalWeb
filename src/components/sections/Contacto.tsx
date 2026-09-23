import { useTranslations } from 'next-intl';
import CanalesDeContacto from '@/components/contacto/CanalesDeContacto';
import FondoDeContacto from '@/components/contacto/FondoDeContacto';
import FormularioDeContacto from '@/components/contacto/FormularioDeContacto';
import Eyebrow from '@/components/ui/Eyebrow';
import Panel from '@/components/ui/Panel';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';

// El formulario va sobre un panel crema porque el estado de error necesita un
// rojo que llegue a contraste, y sobre el bordó no hay rojo que lo haga.
//
// **Crema elevado, que es el tono más claro de la paleta.** Estuvo en crema
// base un tramo, para que el campo —que es el elevado— se levantara un tono por
// encima del panel. Eso se fue por pedido: el panel va lo más claro que la
// paleta permite.
//
// **La consecuencia es que el panel y el campo son ahora el mismo tono**, así
// que la caja del campo ya no se levanta y lo único que la dibuja es su borde.
// Alcanza —`--fondo-separador` da 3,50:1 contra este fondo, por encima del 3:1
// que pide el límite de un control— pero es el margen justo: si alguna vez se
// aclara el borde o se oscurece el panel, hay que volver a medirlo.
//
// Y no hay un tono más claro al que mover el campo: la paleta tiene dos cremas
// y éste es el de arriba. Un blanco puro quedaría a 1,05:1 del panel, o sea
// invisible, y encima es frío al lado de toda la paleta, que es cálida.
const FONDO = 'crema-elevado';

export default function Contacto() {
  const t = useTranslations('home.contacto');
  const tSecciones = useTranslations('secciones');

  return (
    <Section id="contacto" fondo="bordo" className="relative isolate">
      <FondoDeContacto />
      {/* Desde`xl`el encuadre se va al costado del formulario en vez de
 quedar encima: son 230 px de alto que la página no gasta y, sobre
 todo, el formulario entra en pantalla junto con el motivo por el que
 hay que completarlo. El corte es en`xl`y no en`lg`porque a 1024 px
 la columna del formulario deja los campos de a dos en 240 px. */}
      <div className="grid gap-10 xl:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] xl:gap-16">
        <div className="flex max-w-3xl flex-col gap-4">
          <Eyebrow>{tSecciones('contacto')}</Eyebrow>
          {/* **Sin `Destacado`, que es la excepción del sitio.** Los otros ocho
              titulares llevan una o dos palabras en 800 y en el color de
              realce; acá se sacó por pedido y el titular va parejo. Volver a
              ponerlo es envolver la palabra en `<destacado>` dentro de la
              clave, y entonces esto tiene que pasar de `t` a `t.rich`. */}
          <SectionHeading seccion="contacto">{t('titulo')}</SectionHeading>
          <p className="text-entrada">{t('entrada')}</p>
          {/* Debajo de la bajada y separados por una línea: son la alternativa
              al formulario, no un pie de página del encuadre. */}
          <CanalesDeContacto className="mt-4" />
        </div>

        <Panel fondo={FONDO} className="max-w-4xl p-6 sm:p-9 xl:max-w-none">
          <FormularioDeContacto />
        </Panel>
      </div>
    </Section>
  );
}
