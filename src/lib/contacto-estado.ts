import type { ErroresDeContacto } from '@/lib/contacto-esquema';

/**
 * Lo que devuelve el envío, y lo único que el formulario sabe del servidor.
 *
 * `intento` es un contador, no un adorno: dos envíos seguidos pueden terminar
 * en el mismo estado y con los mismos errores, y el formulario necesita
 * distinguirlos para volver a mover el foco y a anunciar el resultado.
 */
export type EstadoDeContacto =
  | { estado: 'inicial' }
  | { estado: 'enviado'; intento: number }
  | { estado: 'invalido'; errores: ErroresDeContacto; intento: number }
  | { estado: 'rechazado'; motivo: MotivoDeRechazo; intento: number };

/** `limite`: demasiados envíos seguidos. `envio`: el correo no salió. */
export type MotivoDeRechazo = 'limite' | 'envio';

export const ESTADO_INICIAL: EstadoDeContacto = { estado: 'inicial' };

export function siguienteIntento(previo: EstadoDeContacto) {
  return previo.estado === 'inicial' ? 1 : previo.intento + 1;
}
