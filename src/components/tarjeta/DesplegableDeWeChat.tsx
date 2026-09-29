'use client';

import Image from 'next/image';
import { useId, useState } from 'react';
import ContenidoDeFila, { FILA } from '@/components/tarjeta/ContenidoDeFila';
import Panel from '@/components/ui/Panel';
import { clases } from '@/lib/clases';
import qr from '@/imagenes/tarjeta/wechat.png';

type DesplegableDeWeChatProps = {
  rotulo: string;
  mostrar: string;
  ocultar: string;
  qrAlt: string;
  texto: string;
  id: string;
};

/**
 * WeChat no tiene enlace que abra una conversación desde afuera: se agrega a
 * alguien escaneando su QR o buscando su ID. Por eso es un botón que despliega
 * las dos cosas y no un enlace como las demás filas.
 *
 * El QR va **sin optimizar**: `next/image` lo pasaría a WebP con pérdida y los
 * bordes de los módulos se ablandan, que es justo lo que la cámara necesita
 * nítido. Con `loading="lazy"`, que es el valor por defecto, no se baja hasta
 * que se abre el panel.
 */
export default function DesplegableDeWeChat({
  rotulo,
  mostrar,
  ocultar,
  qrAlt,
  texto,
  id
}: DesplegableDeWeChatProps) {
  const [abierto, setAbierto] = useState(false);
  const idDelPanel = useId();

  return (
    <>
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

      <div id={idDelPanel} hidden={!abierto} className="pt-4">
        <Panel
          fondo="crema-elevado"
          className="border border-(color:--fondo-separador) px-5 py-6 text-center"
        >
          <Image
            src={qr}
            alt={qrAlt}
            unoptimized
            className="mx-auto h-auto w-full max-w-65 [image-rendering:pixelated]"
          />
          <p className="mt-4 text-sm">{texto}</p>
          <p className="mt-1 font-semibold break-all select-all texto-realce">
            {id}
          </p>
        </Panel>
      </div>
    </>
  );
}
