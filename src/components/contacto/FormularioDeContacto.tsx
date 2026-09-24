'use client';

import {
  startTransition,
  Suspense,
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent
} from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { enviarConsulta } from '@/acciones/contacto';
import AvisoDeRechazo from '@/components/contacto/AvisoDeRechazo';
import Campo from '@/components/contacto/Campo';
import ConfirmacionDeEnvio from '@/components/contacto/ConfirmacionDeEnvio';
import PreseleccionDeConsulta from '@/components/contacto/PreseleccionDeConsulta';
import SelectorDeTipo from '@/components/contacto/SelectorDeTipo';
import Button from '@/components/ui/Button';
import type { TipoDeConsulta } from '@/content/consulta';
import {
  CAMPO_IDIOMA,
  datosDelFormulario,
  erroresDeContacto,
  esquemaDeContacto,
  LARGO_MAXIMO,
  type CampoDeContacto
} from '@/lib/contacto-esquema';
import {
  ESTADO_INICIAL,
  siguienteIntento,
  type EstadoDeContacto
} from '@/lib/contacto-estado';
import { clases } from '@/lib/clases';
import { CAMPO_SENUELO, CAMPO_TRANSCURRIDO } from '@/lib/contacto-trampa';
import { enfocarConAnillo } from '@/lib/foco';

type Valores = {
  tipo: TipoDeConsulta | '';
  mensaje: string;
  nombre: string;
  empresa: string;
  pais: string;
  email: string;
};

const VACIO: Valores = {
  tipo: '',
  mensaje: '',
  nombre: '',
  empresa: '',
  pais: '',
  email: ''
};

/**
 * Los campos son controlados por dos motivos: React reinicia un formulario no
 * controlado en cuanto termina la acción, y lo que escribió alguien no se puede
 * perder porque le faltó una arroba; y el tipo de consulta tiene que poder
 * llegar preseleccionado desde la query.
 */
export default function FormularioDeContacto() {
  const t = useTranslations('home.contacto');
  const idioma = useLocale();

  const [valores, setValores] = useState(VACIO);
  const [preseleccion, setPreseleccion] = useState<TipoDeConsulta | ''>('');
  const [descartado, setDescartado] = useState(0);

  const formulario = useRef<HTMLFormElement>(null);
  const aviso = useRef<HTMLDivElement>(null);
  const tituloDeExito = useRef<HTMLHeadingElement>(null);
  const montadoEn = useRef(Date.now());
  const volviendoAlFormulario = useRef(false);
  const enVuelo = useRef(false);

  const accion = useCallback(
    async (
      previo: EstadoDeContacto,
      datos: FormData
    ): Promise<EstadoDeContacto> => {
      // La validación del cliente es comodidad: ahorra el viaje y pone el foco
      // en el campo enseguida. La que decide es la del servidor, que vuelve a
      // correr este mismo esquema sin confiar en que esto haya pasado.
      const validado = esquemaDeContacto.safeParse(datosDelFormulario(datos));
      if (!validado.success) {
        return {
          estado: 'invalido',
          errores: erroresDeContacto(validado.error),
          intento: siguienteIntento(previo)
        };
      }

      datos.set(CAMPO_TRANSCURRIDO, String(Date.now() - montadoEn.current));
      return enviarConsulta(previo, datos);
    },
    []
  );

  const [estado, enviar, pendiente] = useActionState(accion, ESTADO_INICIAL);

  useEffect(() => {
    if (!pendiente) enVuelo.current = false;
  }, [pendiente]);

  /**
   * El envío se dispara a mano y no con `action={enviar}` porque React reinicia
   * el formulario apenas termina una acción: los campos de texto los recupera
   * del estado, pero el tipo de consulta elegido se pierde, y quien se equivocó
   * en un campo tendría que volver a contestar lo que ya contestó.
   *
   * El cerrojo va acá y no en `disabled`: el atributo recién aparece cuando
   * React vuelve a pintar, así que dos clics en el mismo tick entran los dos.
   */
  function alEnviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (enVuelo.current) return;
    enVuelo.current = true;

    const datos = new FormData(evento.currentTarget);
    startTransition(() => enviar(datos));
  }

  const enviado = estado.estado === 'enviado' && estado.intento > descartado;
  const errores = estado.estado === 'invalido' ? estado.errores : {};

  const error = (campo: CampoDeContacto) => {
    const clave = errores[campo];
    return clave ? t(`errores.${clave}`) : undefined;
  };

  useEffect(() => {
    if (estado.estado === 'invalido') {
      enfocarConAnillo(
        formulario.current?.querySelector<HTMLElement>('[aria-invalid="true"]')
      );
    } else if (estado.estado === 'rechazado') {
      enfocarConAnillo(aviso.current);
    } else if (estado.estado === 'enviado') {
      // Tras un envío exitoso el botón pulsado se desmonta con el formulario.
      // El foco va al título de la confirmación: es el texto que dice qué
      // pasó, y de ahí se sigue tabulando al botón de escribir otra. Si el
      // envío ya fue descartado, la confirmación no está montada, la ref es
      // nula y el foco lo mueve el efecto de abajo.
      enfocarConAnillo(tituloDeExito.current);
    }
  }, [estado]);

  // Al volver al formulario, el botón que se acaba de pulsar deja de existir:
  // sin esto el foco se cae al documento y quien navega con teclado se pierde.
  // El primer control es el tipo de consulta, que conserva la preselección.
  useEffect(() => {
    if (!volviendoAlFormulario.current) return;
    volviendoAlFormulario.current = false;
    const campos = formulario.current;
    enfocarConAnillo(
      campos?.querySelector<HTMLElement>('select, input:not([type="hidden"])')
    );
  }, [descartado]);

  const preseleccionar = useCallback((tipo: TipoDeConsulta) => {
    setPreseleccion(tipo);
    setValores((previos) => ({ ...previos, tipo }));
  }, []);

  function escribirOtra() {
    if (estado.estado === 'enviado') setDescartado(estado.intento);
    setValores({ ...VACIO, tipo: preseleccion });
    volviendoAlFormulario.current = true;
  }

  // El éxito no se anuncia por acá: el foco se mueve al título de la
  // confirmación y el lector ya lo lee al recibirlo. Repetirlo en la región
  // viva sería el mismo mensaje dos veces seguidas; el texto que sigue al
  // título queda a un paso en el orden de lectura.
  const anuncio = () => {
    if (pendiente) return t('enviando');
    if (estado.estado === 'invalido') return t('errores.resumen');
    if (estado.estado === 'rechazado') return t(`rechazo.${estado.motivo}`);
    return '';
  };

  return (
    <>
      {/* La región viva vive fuera del formulario y de la confirmación: tiene
          que estar en el árbol desde antes de que cambie el resultado para que
          el lector de pantalla lo anuncie. */}
      <p role="status" aria-live="polite" className="sr-only">
        {anuncio()}
      </p>

      {enviado ? (
        <ConfirmacionDeEnvio
          refDelTitulo={tituloDeExito}
          titulo={t('exito.titulo')}
          texto={t('exito.texto')}
          otra={t('exito.otra')}
          alEscribirOtra={escribirOtra}
        />
      ) : (
        <form
          ref={formulario}
          onSubmit={alEnviar}
          noValidate
          className="flex flex-col gap-10"
        >
          <Suspense fallback={null}>
            <PreseleccionDeConsulta alLeer={preseleccionar} />
          </Suspense>

          <div className="flex flex-col gap-6">
            <SelectorDeTipo
              etiqueta={t('tipo.etiqueta')}
              vacio={t('tipo.vacio')}
              opciones={{
                compra: t('tipo.compra'),
                venta: t('tipo.venta'),
                otro: t('tipo.otro')
              }}
              valor={valores.tipo}
              error={error('tipo')}
              alElegir={(tipo) => setValores({ ...valores, tipo })}
            />

            {/* Los dos campos cortos comparten fila desde sm: uno abajo del
                otro dejaban una columna de cuatro controles sueltos en un panel
                que a partir de ahí es ancho. */}
            <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
              <Campo
                campo="nombre"
                etiqueta={t('campos.nombre')}
                error={error('nombre')}
              >
                {(control) => (
                  <input
                    {...control}
                    type="text"
                    autoComplete="name"
                    maxLength={LARGO_MAXIMO.nombre}
                    value={valores.nombre}
                    onChange={(evento) =>
                      setValores({ ...valores, nombre: evento.target.value })
                    }
                  />
                )}
              </Campo>

              <Campo
                campo="email"
                etiqueta={t('campos.email')}
                error={error('email')}
              >
                {(control) => (
                  <input
                    {...control}
                    type="email"
                    autoComplete="email"
                    maxLength={LARGO_MAXIMO.email}
                    value={valores.email}
                    onChange={(evento) =>
                      setValores({ ...valores, email: evento.target.value })
                    }
                  />
                )}
              </Campo>

              {/* **Empresa y país son opcionales**, y por eso llevan la marca:
                  `Campo` decide con ella lo que muestra el rótulo y lo que
                  anuncia el lector de pantalla, y de paso saca el `required` del
                  DOM. Los pidió el cliente sin decir si eran obligatorios, y
                  exigirlos le agrega dos trabas a la única conversión del sitio.

                  Los cuatro cortos van en la misma grilla de dos columnas, así
                  que el orden en pantalla es nombre y correo arriba, empresa y
                  país abajo. */}
              <Campo
                campo="empresa"
                etiqueta={t('campos.empresa')}
                opcional={t('opcional')}
                error={error('empresa')}
              >
                {(control) => (
                  <input
                    {...control}
                    type="text"
                    autoComplete="organization"
                    maxLength={LARGO_MAXIMO.empresa}
                    value={valores.empresa}
                    onChange={(evento) =>
                      setValores({ ...valores, empresa: evento.target.value })
                    }
                  />
                )}
              </Campo>

              <Campo
                campo="pais"
                etiqueta={t('campos.pais')}
                opcional={t('opcional')}
                error={error('pais')}
              >
                {(control) => (
                  <input
                    {...control}
                    type="text"
                    autoComplete="country-name"
                    maxLength={LARGO_MAXIMO.pais}
                    value={valores.pais}
                    onChange={(evento) =>
                      setValores({ ...valores, pais: evento.target.value })
                    }
                  />
                )}
              </Campo>
            </div>

            <Campo
              campo="mensaje"
              etiqueta={t('campos.mensaje')}
              error={error('mensaje')}
            >
              {(control) => (
                <textarea
                  {...control}
                  rows={4}
                  className={clases(control.className, 'resize-y')}
                  maxLength={LARGO_MAXIMO.mensaje}
                  value={valores.mensaje}
                  onChange={(evento) =>
                    setValores({ ...valores, mensaje: evento.target.value })
                  }
                />
              )}
            </Campo>
          </div>

          <input type="hidden" name={CAMPO_IDIOMA} value={idioma} readOnly />

          {/* Señuelo: fuera del orden de tabulación y oculto a los lectores de
              pantalla. Quien lo complete es un programa. */}
          <div
            aria-hidden="true"
            className="absolute -left-[9999px] h-px w-px overflow-hidden"
          >
            <input
              type="text"
              name={CAMPO_SENUELO}
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </div>

          {estado.estado === 'rechazado' && (
            <AvisoDeRechazo ref={aviso}>
              {t(`rechazo.${estado.motivo}`)}
            </AvisoDeRechazo>
          )}

          {/* La única acción real de la página: ancho completo donde la
              pantalla es angosta y con su propio aire abajo de todo.

              **Al lado iba la promesa de 24 a 48 horas hábiles y se sacó por
              pedido.** Con eso, el plazo ya no se lee en ningún punto del
              formulario: sigue estando en la confirmación de envío
              (`exito.texto`) y entre las credenciales de `/nosotros`, o sea
              recién después de mandar o en otra página.

              El envoltorio queda como `div` a secas y no como fila flexible
              porque ahora tiene un solo hijo. No se puede borrar del todo: el
              botón es `inline-flex` con `sm:w-auto`, y colgado directo del
              `form` —que es `flex flex-col`— el estirado por defecto lo dejaría
              a ancho completo en todas las medidas. */}
          <div>
            <Button
              type="submit"
              tamano="grande"
              className="w-full sm:w-auto"
              disabled={pendiente}
            >
              {pendiente ? t('enviando') : t('enviar')}
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
