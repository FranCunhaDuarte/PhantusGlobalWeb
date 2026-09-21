'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  esTipoDeConsulta,
  PARAMETRO_CONSULTA,
  type TipoDeConsulta
} from '@/content/consulta';

/**
 * Lo único que lee la query, y no pinta nada. Está aparte y bajo su propio
 * `Suspense` por eso: `useSearchParams` saca del prerender a todo el árbol de
 * cliente que cuelga del límite más cercano, así que el límite tiene que
 * encerrar esto y nada más. El formulario entero se sigue prerenderizando y
 * `/es` y `/en` siguen siendo estáticas.
 *
 * Si el parámetro falta o trae cualquier otra cosa, no avisa nada y el selector
 * arranca sin preseleccionar: `otro` no viaja por la URL y no se puede inventar
 * desde acá.
 */
export default function PreseleccionDeConsulta({
  alLeer
}: {
  alLeer: (tipo: TipoDeConsulta) => void;
}) {
  const parametros = useSearchParams();
  const valor = parametros.get(PARAMETRO_CONSULTA);

  useEffect(() => {
    if (esTipoDeConsulta(valor)) alLeer(valor);
  }, [valor, alLeer]);

  return null;
}
