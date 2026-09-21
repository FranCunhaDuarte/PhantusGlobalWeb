/**
 * Dónde está la empresa, en el formato que piden los datos estructurados: la
 * ciudad como nombre propio y el país como código ISO, que no se traducen. Lo
 * que se lee en pantalla sale de `pie.ubicacion` en los catálogos; esto es el
 * mismo hecho en la forma que entiende un buscador.
 *
 * No hay calle, número ni código postal: cuando aparezca el dato real se agrega
 * acá y `DatosDeOrganizacion` lo publica sin tocar nada más.
 */
export const DOMICILIO = {
  ciudad: 'Mar del Plata',
  pais: 'AR'
} as const;
