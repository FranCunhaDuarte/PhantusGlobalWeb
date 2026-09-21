import { useTranslations } from 'next-intl';
import IconoDeCredencial from '@/components/nosotros/IconoDeCredencial';
import { CREDENCIALES } from '@/content/credenciales';
import { clases } from '@/lib/clases';

/**
 * Los cuatro datos duros de la apertura, en grilla. Va como `<dl>` porque es
 * exactamente eso: un término y su definición. El rótulo lleva la versalita gris
 * del sitio y el valor va en el color del texto, que es lo que hace que se lea
 * el dato y no el rótulo.
 *
 * **Cada uno arranca con su propia línea arriba.** Sin ella, cuatro pares
 * apilados en dos columnas se leen como una tabla sin bordes y cuesta ver dónde
 * termina uno y empieza el otro. Es la misma hairline que usan el extremo de
 * alcance y el valor de marca.
 */
export default function ListaDeCredenciales({
  className
}: {
  className?: string;
}) {
  const t = useTranslations('nosotros.datos');

  return (
    <dl
      className={clases(
        'grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4',
        className
      )}
    >
      {CREDENCIALES.map((dato) => (
        <div key={dato} className="flex flex-col gap-2 border-t borde-seccion pt-4">
          {/* El icono va **encima del rótulo y no al costado**: en cuatro
              columnas, una fila de icono más versalita deja el rótulo en dos
              renglones apenas la pantalla se angosta, y ahí el par se lee como
              un ítem de lista en vez de como un dato. Arriba, la columna queda
              en tres pisos parejos —icono, rótulo, valor— en todos los anchos. */}
          <IconoDeCredencial credencial={dato} />
          <dt className="text-eyebrow uppercase texto-suave">
            {t(`${dato}.rotulo`)}
          </dt>
          <dd className="font-medium text-balance">{t(`${dato}.valor`)}</dd>
        </div>
      ))}
    </dl>
  );
}
