/**
 * De quién vino el pedido, para poder limitarlo.
 *
 * Node no expone la IP del socket dentro de una Server Action, así que el único
 * dato disponible es `x-forwarded-for`, y ese lo escribe quien quiera: el
 * cliente puede mandarlo ya armado y el proxy le agrega su parte al final. Por
 * eso no se lee la primera entrada —que es la que el cliente controla— sino la
 * que escribió el proxy de confianza más cercano, contando desde la derecha.
 *
 * Eso supone que en producción hay exactamente un proxy de confianza adelante
 * (el reverse proxy del VPS) y que nadie llega al servidor sin pasar por él. Si
 * mañana hay dos saltos, o un CDN delante del proxy, `CONTACTO_PROXIES_DE_CONFIANZA`
 * dice cuántos saltar; si la app queda expuesta directo, este dato deja de ser
 * confiable y el límite pasa a ser burlable cambiando una cabecera.
 */
const PROXIES_DE_CONFIANZA = Number(
  process.env.CONTACTO_PROXIES_DE_CONFIANZA ?? 1
);

/**
 * Sin cabecera no hay a quién atribuirle el pedido. Todos esos envíos comparten
 * un mismo cupo en vez de quedar sin límite: es preferible que se estorben entre
 * sí a que un solo cliente sin cabecera pueda mandar sin tope.
 */
const SIN_ORIGEN = 'sin-origen';

export function ipDelPedido(cabeceras: Headers) {
  const reenviada = cabeceras.get('x-forwarded-for');
  if (!reenviada) return cabeceras.get('x-real-ip')?.trim() || SIN_ORIGEN;

  const saltos = reenviada
    .split(',')
    .map((parte) => parte.trim())
    .filter(Boolean);

  const saltar = Number.isFinite(PROXIES_DE_CONFIANZA)
    ? Math.max(1, Math.trunc(PROXIES_DE_CONFIANZA))
    : 1;

  return saltos.at(-saltar) ?? SIN_ORIGEN;
}
