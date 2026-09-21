import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  // El root layout vive bajo `[locale]`, así que Next no puede componer el 404
  // con `not-found.tsx` dentro de ese layout: sin esta bandera la página de
  // error llega al navegador sin HTML del servidor.
  experimental: {
    globalNotFound: true
  }
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
