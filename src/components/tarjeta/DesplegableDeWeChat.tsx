'use client';

import Image from 'next/image';
import { useEffect, useId, useState } from 'react';
import ContenidoDeFila, { FILA } from '@/components/tarjeta/ContenidoDeFila';
import { clases } from '@/lib/clases';
import qr from '@/imagenes/tarjeta/wechat.png';

type DesplegableDeWeChatProps = {
  rotulo: string;
  mostrar: string;
  ocultar: string;
  qrAlt: string;
  texto: string;
  id: string;
  copiar: string;
  copiado: string;
};

/** Cuánto queda el tilde en el botón después de copiar. */
const DURACION_DEL_AVISO = 2000;

/**
 * WeChat no tiene enlace que abra una conversación desde afuera: se agrega a
 * alguien escaneando su QR o buscando su ID. Por eso es un botón que despliega
 * las dos cosas y no un enlace como las demás filas.
 *
 * El QR va **sin optimizar**: `next/image` lo pasaría a WebP con pérdida y los
 * bordes de los módulos se ablandan, que es justo lo que la cámara necesita
 * nítido. Con `loading="lazy"`, que es el valor por defecto, no se baja hasta
 * que se abre el panel.
 *
 * El ID lleva un botón de copiar porque quien lo busca en WeChat casi siempre
 * está en el mismo teléfono y no puede escanear su propia pantalla.
 */
export default function DesplegableDeWeChat({
  rotulo,
  mostrar,
  ocultar,
  qrAlt,
  texto,
  id,
  copiar,
  copiado
}: DesplegableDeWeChatProps) {
  const [abierto, setAbierto] = useState(false);
  const [recienCopiado, setRecienCopiado] = useState(false);
  const idDelPanel = useId();

  useEffect(() => {
    if (!recienCopiado) return;
    const temporizador = setTimeout(
      () => setRecienCopiado(false),
      DURACION_DEL_AVISO
    );
    return () => clearTimeout(temporizador);
  }, [recienCopiado]);

  async function copiarId() {
    try {
      await navigator.clipboard.writeText(id);
      setRecienCopiado(true);
    } catch {
      // Sin permiso de portapapeles el ID sigue ahí, seleccionable a mano.
    }
  }

  // Botón y panel van en un mismo bloque para que el panel abra pegado a su
  // caja, como una sola pieza, y no con el aire que separa a los canales.
  return (
    <div>
      <button
        type="button"
        aria-expanded={abierto}
        aria-controls={idDelPanel}
        onClick={() => setAbierto(!abierto)}
        className={clases(FILA, 'cursor-pointer')}
      >
        <ContenidoDeFila
          rotulo={rotulo}
          dato={abierto ? ocultar : mostrar}
          claseDePunta={abierto ? 'rotate-90' : undefined}
        />
      </button>

      <div
        id={idDelPanel}
        hidden={!abierto}
        className="bg-surface px-5 py-6 text-center"
      >
        <Image
          src={qr}
          alt={qrAlt}
          unoptimized
          className="mx-auto h-auto w-full max-w-65 [image-rendering:pixelated]"
        />
        <p className="mt-5 text-sm">{texto}</p>
        <div className="mt-1 flex items-center justify-center gap-1">
          <p className="font-semibold break-all select-all texto-realce">{id}</p>
          <button
            type="button"
            onClick={copiarId}
            aria-label={recienCopiado ? copiado : copiar}
            title={recienCopiado ? copiado : copiar}
            className="flex size-10 flex-none cursor-pointer items-center justify-center texto-suave transition-colors hover:texto-realce motion-reduce:transition-none"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {recienCopiado ? (
                <path d="M20 6 9 17l-5-5" />
              ) : (
                <>
                  <rect x="8" y="8" width="13" height="13" rx="1" />
                  <path d="M16 8V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h4" />
                </>
              )}
            </svg>
          </button>
        </div>
        {/* El cambio de ícono no se oye: esto lo anuncia. */}
        <p role="status" className="sr-only">
          {recienCopiado ? copiado : ''}
        </p>
      </div>
    </div>
  );
}
