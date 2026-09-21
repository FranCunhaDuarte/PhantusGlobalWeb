import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import {
  alternativasDeRuta,
  esRutaLegal,
  RUTAS_PUBLICAS,
  urlAbsoluta
} from '@/lib/rutas';

export default function sitemap(): MetadataRoute.Sitemap {
  return RUTAS_PUBLICAS.flatMap((ruta) =>
    routing.locales.map((idioma) => ({
      url: urlAbsoluta(ruta, idioma),
      changeFrequency: 'monthly' as const,
      priority: ruta === '/' ? 1 : esRutaLegal(ruta) ? 0.3 : 0.8,
      alternates: { languages: alternativasDeRuta(ruta, idioma).languages }
    }))
  );
}
