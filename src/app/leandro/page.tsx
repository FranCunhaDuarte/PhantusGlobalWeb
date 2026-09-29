import type { Metadata } from 'next';
import { createTranslator } from 'next-intl';
import ContenidoDeFila, { FILA } from '@/components/tarjeta/ContenidoDeFila';
import DesplegableDeWeChat from '@/components/tarjeta/DesplegableDeWeChat';
import Logo from '@/components/ui/Logo';
import Panel from '@/components/ui/Panel';
import {
  ENLACES_DE_LA_TARJETA,
  ENLACES_EXTERNOS,
  ORDEN_DE_ENLACES,
  RUTA_DE_LA_TARJETA
} from '@/content/tarjeta-leandro';
import { SITIO } from '@/lib/sitio';
import mensajes from '@/messages/tarjeta/en.json';

const t = createTranslator({ locale: 'en', messages: mensajes });

export const metadata: Metadata = {
  metadataBase: new URL(SITIO.origen),
  title: t('metaTitle'),
  description: t('metaDescription'),
  alternates: { canonical: RUTA_DE_LA_TARJETA },
  // Se comparte por QR y por enlace, no se busca. Y es la única página del
  // dominio con un nombre propio: indexarla sería publicarlo en el buscador,
  // que es justo lo que el sitio dejó de hacer.
  robots: { index: false, follow: false },
  openGraph: {
    type: 'profile',
    url: RUTA_DE_LA_TARJETA,
    title: t('metaTitle'),
    description: t('metaDescription'),
    images: [{ url: '/og/en.png', width: 1200, height: 630 }]
  }
};

/**
 * La estructura es la de la tarjeta que se pasó —logo, nombre, cargo, bajada,
 * cinco canales y la ciudad al pie— y el dibujo es el del sitio: Montserrat
 * sola, sin esquinas redondeadas, filas con pelo en vez de cajas y los colores
 * resueltos por el fondo.
 *
 * **Al pie no va el isotipo que traía el original**: estaba a 18 px y el manual
 * pone su mínimo en 50. A 50, con su área de seguridad, pesaba tanto como el
 * logotipo de arriba en un pie de una línea.
 */
export default function TarjetaDeLeandro() {
  return (
    <Panel
      fondo="crema"
      className="flex flex-1 justify-center bg-surface px-4 pt-12 pb-10 md:pt-18"
    >
      <main className="flex w-full max-w-md flex-col">
        <header className="flex flex-col items-center text-center">
          <Logo ancho={220} />
          <span aria-hidden className="mt-8 block h-px w-16 bg-(--fondo-linea)" />
          <h1 className="mt-7 text-titulo-mayor">{t('nombre')}</h1>
          <p className="mt-3 text-eyebrow uppercase texto-realce">
            {t('cargo')}
          </p>
          <p className="mt-3 texto-suave">{t('bajada')}</p>
        </header>

        <nav
          aria-label={t('contacto')}
          className="mt-10 flex flex-col border-t border-(color:--fondo-separador)"
        >
          {ORDEN_DE_ENLACES.map((enlace) => (
            <a
              key={enlace}
              href={ENLACES_DE_LA_TARJETA[enlace]}
              className={FILA}
              {...(ENLACES_EXTERNOS.has(enlace)
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              <ContenidoDeFila
                rotulo={t(`enlaces.${enlace}.rotulo`)}
                dato={t(`enlaces.${enlace}.dato`)}
              />
            </a>
          ))}

          <DesplegableDeWeChat
            rotulo={t('wechat.rotulo')}
            mostrar={t('wechat.mostrar')}
            ocultar={t('wechat.ocultar')}
            qrAlt={t('wechat.qrAlt')}
            texto={t('wechat.texto')}
            id={t('wechat.id')}
          />
        </nav>

        <footer className="mt-12 text-center text-sm texto-suave">
          {t('ubicacion')}
        </footer>
      </main>
    </Panel>
  );
}
