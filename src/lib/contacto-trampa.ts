/**
 * Dos trampas baratas contra el envío automático, sin CAPTCHA y sin pedirle
 * nada al visitante.
 *
 * La primera es un campo señuelo, oculto y fuera del orden de tabulación: una
 * persona no lo ve y un robot que completa todos los `input` del formulario sí
 * lo llena. La segunda es cuánto pasó entre que el formulario se pintó y que se
 * envió: llenar cuatro campos en menos de tres segundos no lo hace nadie.
 *
 * Lo que viaja es el tiempo transcurrido y no el instante de pintado, así el
 * reloj del visitante puede estar corrido y la cuenta sigue dando. Es un dato
 * del cliente, o sea falsificable como cualquier campo del formulario: frena al
 * robot que envía el formulario tal como viene, no al que lo estudia. A ese lo
 * frena el límite por IP, que corre del lado del servidor.
 */
export const CAMPO_SENUELO = 'direccion-alternativa';

export const CAMPO_TRANSCURRIDO = 'transcurrido';

const ESPERA_MINIMA_MS = 3000;

export function pareceAutomatico(formulario: FormData) {
  const senuelo = formulario.get(CAMPO_SENUELO);
  if (typeof senuelo === 'string' && senuelo.trim() !== '') return true;

  const transcurrido = Number(formulario.get(CAMPO_TRANSCURRIDO));
  return !Number.isFinite(transcurrido) || transcurrido < ESPERA_MINIMA_MS;
}
