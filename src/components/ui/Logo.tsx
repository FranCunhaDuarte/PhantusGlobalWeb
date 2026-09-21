'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useFondo } from '@/components/ui/ContextoDeFondo';
import { varianteLogoSobre, type Fondo, type VarianteLogo } from '@/components/ui/fondos';
import { clases } from '@/lib/clases';
import assets from '@/lib/marca-assets.json';

export type FormaLogo = 'logotipo' | 'isotipo';

type AssetMarca = { src: string; width: number; height: number };

const archivos = assets as Record<FormaLogo, Record<VarianteLogo, AssetMarca>>;

/** Orden de apilado con `fondoCambiante`: la primera define la caja. */
const VARIANTES_SUPERPUESTAS = [
  'tinta',
  'crema'
] as const satisfies readonly VarianteLogo[];

/** Mínimos del manual, en píxeles de ancho de render. */
const ANCHO_MINIMO: Record<FormaLogo, number> = {
  logotipo: 150,
  isotipo: 50
};

/**
 * Cuánto mide el nombre "Phantus" en cada asset, en proporción al alto del
 * archivo. Medido sobre el arte: el logotipo publica 426 px de alto y el nombre
 * ocupa 229 de esos; el isotipo suelto es el mismo trazo de la P recortado, que
 * dentro del logotipo mide 212 px contra los 229 del nombre. El manual pide un
 * tercio de esa altura de aire alrededor, y de acá sale.
 */
const ALTO_DEL_NOMBRE: Record<FormaLogo, number> = {
  logotipo: 229 / 426,
  isotipo: 229 / 212
};

type LogoProps = {
  /**
   * Fondo sobre el que se apoya. Por defecto lo toma de la `Section`, el
   * `Panel` o el header que lo contiene; se pasa a mano sólo donde no hay
   * ninguno de los tres, que es el pie.
   */
  sobre?: Fondo;
  forma?: FormaLogo;
  /** Ancho de render en px; la altura se deriva de la proporción del asset. */
  ancho: number;
  /**
   * Si el fondo de abajo puede cambiar sin recargar la página. Entonces las dos
   * variantes se pintan superpuestas y lo que cambia es la opacidad: cambiar el
   * `src` obliga a bajar el otro archivo recién en el momento del cambio, y con
   * red lenta eso deja el logo invisible casi un segundo. Lo usa el header, que
   * pasa de apoyarse sobre el hero a apoyarse sobre crema al scrollear.
   */
  fondoCambiante?: boolean;
  className?: string;
};

export default function Logo({
  sobre,
  forma = 'logotipo',
  ancho,
  fondoCambiante = false,
  className
}: LogoProps) {
  const t = useTranslations('marca');
  const heredado = useFondo();
  const fondo = sobre ?? heredado;

  if (!fondo) {
    throw new Error(
      'El logo se está usando fuera de toda `Section`, `Panel` o header, así que ' +
        'no hay fondo del que deducir la variante de color. Pasale `sobre` con el ' +
        'fondo sobre el que se apoya.'
    );
  }

  if (ancho < ANCHO_MINIMO[forma]) {
    throw new Error(
      `El ${forma} no baja de ${ANCHO_MINIMO[forma]} px de ancho (se pidió ${ancho}).`
    );
  }

  const vigente = varianteLogoSobre(fondo);
  const asset = archivos[forma][vigente];
  const alto = Math.round((ancho * asset.height) / asset.width);
  // El aire va como margen y no como padding de un envoltorio: el alto y el
  // ancho del `Image` siguen siendo los pedidos, y quien lo monta sigue pudiendo
  // mandarle clases de visibilidad sin que se le corra el recorte.
  const aire = Math.round((alto * ALTO_DEL_NOMBRE[forma]) / 3);

  // Las dos variantes tienen exactamente la misma caja, así que la primera la
  // define y la segunda se superpone. El `alt` va sólo en la que se ve: la otra
  // es decorativa y un lector de pantalla no tiene que nombrar la marca dos
  // veces.
  const dibujar = (variante: VarianteLogo, superpuesta: boolean) => (
    <Image
      key={variante}
      src={archivos[forma][variante].src}
      alt={
        variante === vigente
          ? forma === 'logotipo'
            ? t('logotipoAlt')
            : t('isotipoAlt')
          : ''
      }
      width={ancho}
      height={alto}
      // Sin `preload`: el logo no es el LCP de ninguna de las seis rutas en
      // ningún ancho, así que adelantar su descarga no compra nada y le sacaría
      // banda a la foto del hero, que sí lo es. Si algún día lo fuera, el prop
      // de `next/image` es `preload`, no `priority`, que quedó deprecado en
      // Next 16.
      className={clases(
        superpuesta && 'absolute inset-0',
        fondoCambiante &&
          'transition-opacity duration-200 motion-reduce:transition-none',
        variante === vigente ? 'opacity-100' : 'opacity-0'
      )}
    />
  );

  return (
    <span
      style={{ margin: `${aire}px` }}
      className={clases('relative', className)}
    >
      {fondoCambiante
        ? VARIANTES_SUPERPUESTAS.map((variante, indice) =>
            dibujar(variante, indice > 0)
          )
        : dibujar(vigente, false)}
    </span>
  );
}
