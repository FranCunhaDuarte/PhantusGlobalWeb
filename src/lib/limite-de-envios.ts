/**
 * Ventana deslizante en memoria: cuántos envíos aceptamos de un mismo origen en
 * un rato. Alcanza para un contenedor único en un VPS, que es como está pensado
 * el deploy hoy.
 *
 * Es **por instancia del proceso**: el contador vive en el heap y se pierde en
 * cada reinicio o redeploy. Si algún día esto se escala horizontalmente —dos
 * contenedores detrás de un balanceador, o un runtime serverless que levanta
 * una instancia por pedido— el límite real pasa a ser el que está acá
 * multiplicado por la cantidad de instancias, es decir, deja de servir. Ese es
 * el día de mover el contador a un almacén compartido (Redis o equivalente).
 */
const VENTANA_MS = 10 * 60 * 1000;

const ENVIOS_POR_VENTANA = 5;

/** Techo de orígenes recordados, para que el mapa no crezca sin límite. */
const ORIGENES_MAXIMOS = 5000;

const registro = new Map<string, number[]>();

function purgar(ahora: number) {
  for (const [origen, marcas] of registro) {
    const vigentes = marcas.filter((marca) => ahora - marca < VENTANA_MS);
    if (vigentes.length === 0) registro.delete(origen);
    else registro.set(origen, vigentes);
  }
}

export function dentroDelLimite(origen: string) {
  const ahora = Date.now();

  if (registro.size >= ORIGENES_MAXIMOS) purgar(ahora);

  const previas = registro.get(origen) ?? [];
  const vigentes = previas.filter((marca) => ahora - marca < VENTANA_MS);

  if (vigentes.length >= ENVIOS_POR_VENTANA) {
    registro.set(origen, vigentes);
    return false;
  }

  vigentes.push(ahora);
  registro.set(origen, vigentes);
  return true;
}
