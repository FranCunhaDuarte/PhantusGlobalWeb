/**
 * Marca que pide el anillo de foco para un foco movido por código.
 *
 * `:focus-visible` no alcanza: Chromium se lo concede a un `.focus()` sólo si
 * la interacción anterior fue de teclado, así que quien llegó con el mouse ve
 * saltar el foco a otro lado sin ninguna pista de a dónde fue. La marca la
 * pone quien mueve el foco y la levanta el propio elemento al perderlo, y
 * `globals.css` le dibuja el mismo anillo. El clic directo sobre un campo no
 * pasa por acá, así que ahí el anillo sigue sin aparecer.
 */
const MARCA = 'data-foco-forzado';

export function enfocarConAnillo(elemento: HTMLElement | null | undefined) {
  if (!elemento) return;

  // Dos envíos seguidos pueden fallar en el mismo campo: si ya está marcado
  // sigue enfocado, y volver a suscribir el `blur` apilaría oyentes que hacen
  // lo mismo.
  if (!elemento.hasAttribute(MARCA)) {
    // La marca va antes del foco para que el anillo esté entero en el primer
    // cuadro en que el elemento está enfocado.
    elemento.setAttribute(MARCA, '');
    elemento.addEventListener('blur', () => elemento.removeAttribute(MARCA), {
      once: true
    });
  }

  elemento.focus();
}
