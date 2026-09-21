import { Resend } from 'resend';
import type { MailDeConsulta } from '@/lib/contacto-mail';

/**
 * Las tres variables del envío. Ninguna tiene valor por defecto: si falta la
 * casilla de destino o el remitente verificado, el mail no se manda a ningún
 * lado razonable, y un default escondido en el código es peor que un error.
 *
 * Se leen dentro de la función y no en el módulo porque el módulo se evalúa
 * durante el build para prerenderizar la home: congelarlas ahí haría que el
 * valor que vale sea el del build y no el del entorno donde corre el servidor.
 */
function configuracion() {
  return {
    apiKey: process.env.RESEND_API_KEY,
    destino: process.env.CONTACTO_DESTINO,
    remitente: process.env.CONTACTO_REMITENTE
  };
}

export type ResultadoDeEnvio = 'enviado' | 'simulado' | 'fallado';

const SIN_CONFIGURAR = '(sin configurar)';

/**
 * Sin API key el envío se simula: el mail se arma y se sanitiza igual que en
 * producción y se escribe al log del servidor. Así el flujo entero —validación,
 * límites, trampas, confirmación— se puede probar sin cuenta de Resend, y el
 * día que se cargue la clave no cambia nada más que el destino final.
 */
export async function enviarMail(mail: MailDeConsulta): Promise<ResultadoDeEnvio> {
  const { apiKey, destino, remitente } = configuracion();

  if (!apiKey) {
    console.info(
      [
        '[contacto] ENVÍO SIMULADO: no hay RESEND_API_KEY configurada.',
        `  de:      ${remitente ?? SIN_CONFIGURAR}`,
        `  para:    ${destino ?? SIN_CONFIGURAR}`,
        `  responder a: ${mail.responderA}`,
        `  asunto:  ${mail.asunto}`,
        '  cuerpo:',
        mail.texto.replace(/^/gm, '    ')
      ].join('\n')
    );
    return 'simulado';
  }

  if (!destino || !remitente) {
    console.error(
      '[contacto] hay RESEND_API_KEY pero falta CONTACTO_DESTINO o CONTACTO_REMITENTE: el envío no se intenta.'
    );
    return 'fallado';
  }

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: remitente,
      to: destino,
      replyTo: mail.responderA,
      subject: mail.asunto,
      text: mail.texto,
      html: mail.html
    });

    if (error) {
      console.error('[contacto] Resend rechazó el envío:', error);
      return 'fallado';
    }

    return 'enviado';
  } catch (falla) {
    console.error('[contacto] el envío por Resend tiró una excepción:', falla);
    return 'fallado';
  }
}
