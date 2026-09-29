import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import en from '@/messages/en.json';
import { montserrat } from '@/lib/fuentes';
import '../globals.css';

/**
 * Layout raíz propio: la tarjeta vive fuera de `[locale]`, sin header, pie ni
 * botón flotante, y el proxy de idioma no la toca (ver `src/proxy.ts`).
 *
 * **Va sólo en inglés**, como la tarjeta original: le habla al comprador del
 * exterior, que es quien recibe el QR. Al proveedor se le pasa el idioma y los
 * mensajes a mano porque acá no hay segmento `[locale]` del que deducirlos, y
 * de los mensajes sólo `marca`, que es lo único que pide un componente de
 * cliente —el `alt` del logo—.
 */
export default function LayoutDeLaTarjeta({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider locale="en" messages={{ marca: en.marca }}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
