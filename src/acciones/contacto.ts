'use server';

import { headers } from 'next/headers';
import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import {
  CAMPO_IDIOMA,
  datosDelFormulario,
  erroresDeContacto,
  esquemaDeContacto
} from '@/lib/contacto-esquema';
import { siguienteIntento, type EstadoDeContacto } from '@/lib/contacto-estado';
import { armarMail } from '@/lib/contacto-mail';
import { pareceAutomatico } from '@/lib/contacto-trampa';
import { enviarMail } from '@/lib/correo';
import { ipDelPedido } from '@/lib/ip-del-pedido';
import { dentroDelLimite } from '@/lib/limite-de-envios';

/** La casilla la lee alguien de Mar del Plata: el mail interno va en castellano. */
const IDIOMA_DE_LA_CASILLA = routing.defaultLocale;

/**
 * La acción es una ruta POST como cualquier otra: se la puede invocar a mano,
 * sin pasar por el formulario y con lo que se le ocurra a quien la invoque. Por
 * eso acá no se confía en nada de lo que llega —ni en los campos, ni en el
 * idioma, ni en las trampas del cliente— y todo se vuelve a resolver desde
 * cero. La validación del navegador es comodidad; la que cuenta es esta.
 */
export async function enviarConsulta(
  previo: EstadoDeContacto,
  formulario: FormData
): Promise<EstadoDeContacto> {
  const intento = siguienteIntento(previo);

  const validado = esquemaDeContacto.safeParse(datosDelFormulario(formulario));
  if (!validado.success) {
    return {
      estado: 'invalido',
      errores: erroresDeContacto(validado.error),
      intento
    };
  }

  // El cupo cuenta envíos bien formados, no intentos: quien se equivoca en un
  // campo no se queda sin poder escribir. Frenar una inundación de basura mal
  // formada es tarea del proxy que está adelante, no de esta función. Va antes
  // que la trampa a propósito: lo que cae en la trampa también gasta cupo, o un
  // robot que la pisa en cada envío podría insistir para siempre.
  if (!dentroDelLimite(ipDelPedido(await headers()))) {
    return { estado: 'rechazado', motivo: 'limite', intento };
  }

  // Al robot se le contesta que salió bien: si ve el rechazo, prueba de nuevo
  // hasta encontrar la forma. Del lado del servidor queda el rastro en el log.
  if (pareceAutomatico(formulario)) {
    console.warn('[contacto] envío descartado por la trampa de robots.');
    return { estado: 'enviado', intento };
  }

  const idiomaCrudo = formulario.get(CAMPO_IDIOMA);
  const idiomaDelVisitante = hasLocale(routing.locales, idiomaCrudo)
    ? idiomaCrudo
    : routing.defaultLocale;

  const t = await getTranslations({
    locale: IDIOMA_DE_LA_CASILLA,
    namespace: 'home.contacto.mail'
  });

  const resultado = await enviarMail(
    armarMail({
      datos: validado.data,
      idiomaDelVisitante,
      t
    })
  );

  if (resultado === 'fallado') {
    return { estado: 'rechazado', motivo: 'envio', intento };
  }

  return { estado: 'enviado', intento };
}
