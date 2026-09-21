import HeaderCompleto from '@/components/layout/HeaderCompleto';
import HeaderMinimo from '@/components/layout/HeaderMinimo';

const VARIANTES = {
  completo: HeaderCompleto,
  minimo: HeaderMinimo
} as const;

/** Variante de header en uso. Es la única línea que hay que tocar para pasar de
 *  una a la otra. */
const VARIANTE: keyof typeof VARIANTES = 'completo';

export default function Header() {
  const Elegida = VARIANTES[VARIANTE];
  return <Elegida />;
}
