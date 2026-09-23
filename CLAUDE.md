@AGENTS.md

# Phantus Global

Sitio institucional de **Phantus Global**, bróker de comercio internacional de
**pescado y mariscos del Atlántico Sur**, con origen en **Mar del Plata,
Argentina** y estructura legal en **Estados Unidos**. Dominio:
`phantusglobal.com`. Contacto público: `sales@phantusglobal.com` y
`+54 9 223 683-8585`. **El sitio nombra a una persona y eso fue y volvió**: hubo
un responsable con nombre y apellido en el pie y se sacó por pedido, junto con la
dirección personal que lo llevaba. Volvió el 23/09, pero distinto: nombre, cargo
y perfil de LinkedIn en `/nosotros` y en contacto —un argumento de credibilidad—
mientras el correo sigue siendo uno solo y genérico. Las dos URLs viven en
`src/content/redes.ts`; la de la empresa entra al JSON-LD como `sameAs` y la de
la persona, no: el perfil de alguien que trabaja acá no es un perfil de la
organización.

## Qué hace la empresa

Conecta exportadores argentinos con importadores del exterior y cobra comisión
por la operación. **No toma posesión de la mercadería**: no compra, no almacena,
no revende, no opera como planta. Y **tampoco toca el dinero**: el pago va
directo entre exportador e importador. Eso cambia cómo se escribe todo el copy —
no somos un exportador ni un trader, somos el nexo.

Trabaja con una **red de exportadores argentinos habilitados por SENASA**,
seleccionados por calidad y cumplimiento normativo. Cada operación se apoya en
el conocimiento técnico del producto —tallas, formatos, rendimientos y
temporadas por especie— y tiene **un responsable directo**, del primer contacto
a la llegada del contenedor.

Mercados de destino, y son estos cuatro: **Estados Unidos, México, Europa y
China**. Cumplimiento por mercado: **FDA, HACCP y SIMP** para Estados Unidos,
con documentación sanitaria y de origen. Formatos: **IQF, bloque, HOSO, HLSO,
filet**, con talla, calibre, rendimiento y packing por operación. Incoterms:
**FOB, CFR, CIF**. Plazo de respuesta publicado: **24 a 48 horas hábiles**.

Las especies del catálogo son once: **merluza hubbsi, corvina, calamar illex,
langostino, pescadilla de red, besugo, pez palo, mero, pollo de mar, raya y
rebozado de merluza**. "Pollo de mar" es el **nombre comercial del pez ángel**
(`Squatina guggenheim` y `Squatina argentina`), que es como lo pide el mercado;
la ficha lo aclara para que nadie crea que es otra especie. **Las dos Squatina
están en la Lista Roja de la UICN** —`guggenheim` en peligro, `argentina` en
peligro crítico—: la pesquería es legal en la Argentina, pero es un dato que
pesa en la Unión Europea y ante compradores con política de sostenibilidad, y
Franco lo sabe. Si alguna vez se decide declararlo en el sitio, va en la ficha. El mero es `Acanthistius patachonicus`, el mero patagónico del
Atlántico Sur — **no el grouper tropical** (`Epinephelus`), que es lo que un
comprador puede tener en la cabeza al leer la palabra; por eso la ficha lleva el
nombre científico y el inglés dice *Argentine seabass*.
El rebozado no es una especie sino producto elaborado a partir del filet de
merluza; entra igual porque el catálogo es lo que se comercializa y no una clave
taxonómica, y su ficha lo dice. **Se publican sólo las que tienen recorte**: hoy
son las cuatro primeras.
**Carnes vuelve a ser unidad de negocio** en la Fase 12, con página propia
(`/productos/carnes`). Sigue siendo la secundaria y **sigue sin catálogo**: la
página es titular, entrada, el **diagrama de cortes** —dieciocho cortes sobre una
media res, en `DiagramaDeCortes`— y el CTA. Los cortes son dato real; lo que no
existe como dato es la especificación (congelado o enfriado, certificación del
frigorífico, calibre, destino), que es lo que cambia entre un pedido y otro, así
que no hay ficha por corte.

La home **ya no adelanta cortes**. Llevó un carrusel de cuatro cortes con foto y
se sacó por pedido: con la misma forma que el de pescados, prometía un catálogo
de carnes que no existe ni va a existir mientras la especificación se arme contra
el pedido. En su lugar `ResumenDeCarnes` es un CTA —titular, una línea y un botón
a los despieces—, que manda a lo único que de carnes sí es dato publicado.

### El diagrama de cortes

**El dibujo es la lámina de cortes argentinos que aportó Franco** (`diagram-of-
argentine-beef-cuts-on-cattle-silhouette-vector.jpg`). El nombre del archivo es
el de un banco de vectores: la licencia la tiene él, se planteó el punto y la
decisión fue suya. Queda anotado en `src/imagenes/FUENTES.md`, con el camino de
salida por si hay que soltarla.

**No es un trazado automático de la imagen**, que habría dado una sola mancha
negra con agujeros. Las líneas blancas de la lámina dejan cada corte como una
isla negra propia, así que el procedimiento fue: umbral a 60, **rellenar las
letras blancas** —si no, al erosionar muerden el borde de su región y la dejan
dentada—, erosionar tres píxeles para despegar las islas que la compresión JPEG
había pegado, etiquetar componentes conexos y trazar cada contorno por vecindad
de Moore, simplificado con Douglas-Peucker. Salen 18 cortes y 5 piezas de
silueta, y el módulo entero pesa 6 kB. El guion quedó en el scratchpad de la
sesión; si hay que rehacerlo, lo que importa es esa secuencia.

Antes de esto hubo dos intentos y los dos enseñan algo. El primero fue **dibujar
la vaca a mano** con curvas de Bézier: tilaba y era accesible, pero no llegó a
parecer una vaca ni después de cinco pasadas —el problema no es dividir el
cuerpo en regiones sino la anatomía, y eso se resuelve buscando el dibujo—. El
segundo fue la lámina de dominio público de Commons, que se ve bien pero es de
**primales estadounidenses**: once regiones donde la argentina tiene dieciocho,
y sin lomo propio.

**Es SVG y no `<canvas>`**, aunque la pedida hablara de un lienzo: cada corte
tiene que ser un elemento con su propio estado de hover y su región de puntero.
En canvas eso obliga a reimplementar la detección de impacto a mano y deja el
dibujo fuera del árbol de accesibilidad.

**La línea divisoria la dibuja un trazo, no el aire entre regiones.** Al
principio era al revés: la erosión que despega las islas deja seis píxeles de
aire entre vecinas —el triple de lo que mide la línea en la lámina— y el grosor
quedaba atado a un número de la extracción en vez de ser una decisión de diseño.
Ahora, después de etiquetar, **cada región crece de vuelta** contra la máscara
sin erosionar hasta que no queda píxel sin dueño, así que las dieciocho tilan el
cuerpo y el límite entre dos vecinas es una arista compartida. El trazo de cada
una la pinta desde su lado y los dos se superponen, de modo que la línea mide
`GROSOR_DE_LINEA` y no el doble. Cambiarla es cambiar esa constante.

**`GROSOR_DE_LINEA` está en píxeles de pantalla, no en unidades del lienzo**, y
esa distinción arregló un desnivel que no se veía venir. El número era el mismo
para los dos animales, pero los lienzos no miden lo mismo ni se rinden al mismo
ancho: medido a 1280, con 1,5 unidades la res dibujaba a **0,80 px y el ave a
0,24**, tres veces más fina, y al lado de la otra el ave se leía como un dibujo
de otro juego. Con `vector-effect: non-scaling-stroke` el trazo sale de la
transformación del `viewBox` y el número es el que se ve, igual en los dos y a
cualquier ancho. Hoy son 1,8 px.

Llenar hasta el último píxel importa: mientras los píxeles en disputa quedaban
sin asignar, en los cruces de tres regiones se veía el fondo de la página como
una mota blanca. Un píxel que dos regiones alcanzan en la misma vuelta se lo
queda la de menor id; da igual cuál, con tal de que no quede ninguno suelto.

**Se curvan cinco piezas y nada más: los óvalos.** En la lámina, palomita, lomo,
entraña, tapa de asado y tapa de nalga son elipses; el resto de las divisiones
son rectas, y curvarlas las deja onduladas. El trazado sale de una grilla de
píxeles, así que el contorno crudo de una elipse es una escalera y se nota: a esas
cinco se les pasa **corte de esquinas de Chaikin** —dos vueltas— y se emiten como
Bézier cúbica por Catmull-Rom. Las demás piezas salen en polilínea, tal cual el
contorno. La lista vive en `lamina.mjs`, junto al mapa de pieza a corte.

Dentro de una pieza redondeada, además, **el borde exterior se respeta**: si un
tramo da al fondo no se curva, porque ahí la línea es silueta de la vaca. Hoy eso
sólo afecta a la palomita, que roza el cuello.

**Cómo se decide si un punto es interno, que costó dos intentos.** La pregunta
obvia —¿algún vecino no está en la máscara?— no sirve: las líneas divisorias de
la lámina son blancas igual que el fondo, así que también caen fuera de la
máscara. La segunda —¿algún vecino no tiene etiqueta?— tampoco: el recrecido
llena hasta el borde de la línea pero no la línea misma, así que sus píxeles se
quedan sin dueño. Con cualquiera de las dos, **todo límite interno parece dar al
fondo y sale en rectas**, que fue exactamente el síntoma: los óvalos se veían
como polígonos. La pregunta que sí sirve es **si hay una etiqueta ajena a cuatro
píxeles**: el límite interno la encuentra del otro lado de la línea divisoria y
el borde de la vaca no encuentra nada. Cuatro alcanza porque las líneas de la
lámina miden dos o tres.

**Las islas mínimas se descartan como semilla, no como salida.** La erosión parte
en dos las partes finas del dibujo —la punta de un cuerno, una pezuña, un tramo
de pata— y el jirón sobrevive como componente propio. Si queda como semilla,
compite con su vecina en el recrecido y termina dibujado como pieza suelta, con
su propia línea divisoria en el medio de un cuerno. Dejándolo sin dueño, el
recrecido se lo da a quien lo rodea. El umbral es 250 píxeles de semilla, que
está por debajo de la tapa de nalga —376, el corte más chico— y por encima de
todos los jirones.

**El osobuco es la pata entera, de las cuatro.** La lámina corta cada pata en
dos o tres piezas —muslo, garrón, caña— y todas son el mismo corte, así que las
cinco regiones van juntas bajo un id. Apuntar una enciende las cuatro patas, que
es lo correcto: el osobuco es esa parte de todas. De la silueta quedan sólo dos
piezas, la cabeza y un jirón del pecho que en la lámina no está rotulado.

### Cómo se verifica que no falte nada

`verificar.mjs` (scratchpad) pinta el SVG generado en negro sobre blanco al
tamaño de la lámina y lo compara píxel a píxel con la máscara del original,
sacando un mapa donde el rojo es cuerpo sin dibujar y el azul, dibujo de más.
**Lo que tiene que quedar es una línea de un píxel en cada borde y nada más**:
ése es el error propio de pasar de píxeles a curvas. Cualquier manchón sólido es
una pieza que se perdió. Hoy la diferencia queda en **2,46 % sin
dibujar y 0,35 % de más**, todo repartido en el perímetro, y ninguna pieza del
resultado baja de 1500 píxeles.

**El dibujo no lleva los nombres escritos encima.** Los llevó: eran dieciocho
rótulos, varios girados y otros achicados para entrar, y aun así tres se pasaban
del borde de su región. Ahora el dibujo es sólo el dibujo y el nombre vive en una
**tarjeta que se abre al apuntar** un corte (`TarjetaDeCorte`).

**La tarjeta es sólo el nombre, y llevó la foto del corte.** Se sacó por pedido,
y el motivo de fondo es que de los veintitrés cortes entre la res y el ave
**diecinueve no tienen PNG** —hay foto de cuatro, y las cuatro son de la res—:
la mayoría de las veces lo que se abría era el hueco con
la marca de agua, una caja de 150 px de alto que no mostraba nada y empujaba el
nombre lejos del puntero. Medida en el navegador, la tarjeta pasó de **203 px de
alto a 46** y quedó pegada al cursor. `ImagenDeCorte` sigue vivo: lo usa el
adelanto de la home, que ahí sí muestra sólo los cortes que tienen foto. Volver
atrás es devolverle el `<ImagenDeCorte>` y subir `ALTO_DE_TARJETA`.

**El ancho de la tarjeta es fijo y no `fit-content`**, y eso no es pereza: la
tarjeta se centra sobre el puntero restándole la mitad del ancho, así que con
ancho automático saltaría de lugar al pasar de "Lomo" a "Colita de cuadril". Los
192 px entran el nombre más largo de los dos idiomas —diecisiete caracteres— en
un solo renglón; uno más largo parte en dos y obliga a subir el alto.

**La tarjeta sigue al puntero y va siempre por encima de él.** Se ancla al mouse
y no al centro de la región porque una región grande —el asado, el vacío— tiene
el centro lejos de donde está mirando el visitante. **No se cuelga abajo ni se
frena contra el borde de arriba**: apuntando un corte del lomo se sale del alto
del dibujo y se apoya sobre el texto de la página. Es a propósito —la distancia
al puntero tiene que ser siempre la misma, o la tarjeta salta al acercarse al
borde— y es la otra razón por la que vive fuera del contenedor que se desplaza.
Sin puntero —cuando el foco llega por teclado— el ancla es el centroide de la
región, que es lo único que se sabe.

**No recibe puntero**: si lo hiciera taparía su propia región y el
`pointerleave` la cerraría apenas aparece.

**Vive fuera del contenedor que se desplaza**, y no es un detalle: ese contenedor
lleva `overflow-x`, y en CSS eso vuelve recortable también el eje vertical, así
que la tarjeta de un corte del lomo se cortaría por arriba. Por eso el ancho y
el alto de la tarjeta se exportan como números desde `TarjetaDeCorte`: quien la
coloca los necesita para ponerla encima del puntero sin medirla en cada
movimiento, y si cambia una clase de la tarjeta hay que cambiarlos.

**Cada región es un control, no una zona que reacciona al puntero.** El nombre
está a la vista sólo mientras se apunta, así que sin esto no hay forma de leerlo
en una pantalla táctil ni por teclado: las regiones son tabulables, se anuncian
con su nombre y abren la tarjeta también al recibir el foco. Por eso el `<svg>`
**no lleva `role="img"`** —eso taparía a los controles de adentro— y por eso no
hace falta una lista aparte para el lector de pantalla. El anillo de foco no se
dibuja: en SVG no se ve bien sobre un trazado recortado, y acá el foco ya tiene
dos señales propias que no dependen del color solo —la región se pinta de bordó y
se abre la tarjeta—.

> **La cola es parte de la región del peceto** y se pinta con él. En la lámina
> no hay línea que las separe, así que ninguna extracción las va a distinguir;
> separarlas es dibujar el corte a mano.

**El dibujo no baja de 48rem de ancho.** Con el rótulo adentro hay un ancho
mínimo por debajo del cual el nombre deja de leerse. Así que la lámina no se
achica más allá de ahí y abajo se desplaza, en su propio contenedor —la página
no desborda—. El contenedor es enfocable y tiene nombre por lo mismo que la
pista del carrusel.

**Los nombres en inglés no están confirmados por el cliente.** Los que tienen
equivalente de exportación claro lo usan (lomo → tenderloin, peceto → eye round,
vacío → flank, asado → short ribs, bola de lomo → knuckle, osobuco → shank) y
los que no lo tienen **se quedan en castellano**, que es como se comercializan:
azotillo, palomita, matambre, entraña, tapa de asado, tapa de nalga. Conviene
chequearlos antes de publicar.

**Los nombres en inglés de los cortes son la correspondencia de exportación
habitual** (bife angosto → striploin, cuadrada → topside, bola de lomo →
knuckle, vacío → flank, asado → short ribs, falda → plate) y **no están
confirmados por el cliente**. Conviene chequearlos antes de publicar. Las
categorías que no son ninguna de las dos unidades siguen viviendo en el pie de
`/productos/pescados`, con su enlace a `?consulta=otro`.

### El espejo de audiencia

El castellano le habla al **exportador argentino** y el inglés, al **comprador
del exterior**. No son traducciones espejo: el hero en castellano dice "alimentos
argentinos de exportación" y el inglés, "Export-grade food from Argentina".

**El titular del hero nombra el producto, y eso costó una vuelta.** Decía "Tu
producto en cuatro mercados": elegante, pero apoyado entero en el rótulo de
arriba, porque "tu producto" puede ser cualquier cosa y "cuatro mercados" no dice
de qué se comercia. Quien caía sin saber qué es Phantus tenía que leer el rótulo
para entenderlo. Ahora la palabra *pescado* está en el titular.

**Hay tres restricciones y las tres descartaron candidatos.**

- **El largo.** El titular va a 800 y en mayúsculas sobre video: de más de unos
  33 caracteres pasa a tres líneas a 1440 y cuatro a 375, y deja de leerse como
  titular. Ahí murió "Conectamos pescado argentino con el mundo", que era la más
  clara de todas porque suma el verbo del negocio.
- **No pueden decir que exportan.** Phantus no toma posesión de la mercadería ni
  toca el dinero. "De exportación" funciona porque **describe la mercadería y no
  a la empresa**, igual que "calidad de exportación": es el término del rubro.
- **No puede encerrarse en pescado.** Carnes es unidad de negocio, así que el
  titular dice "alimentos" y el rótulo de arriba nombra las dos —"Bróker de
  pescado, mariscos y carnes"—. Estuvo un rato en "pescado argentino de
  exportación" y Franco lo bajó por eso.
- **El registro es institucional**, aunque vosee. Se probó "Pescado argentino,
  con papeles" —que es lo que el inglés venía diciendo desde la Fase 11— y en
  castellano rioplatense suena a chiste y arrastra la otra acepción. Fuera.

> **Cuidado con repetir la bajada.** Termina en "De origen a destino", así que
> cualquier titular que diga lo mismo con otras palabras —"de punta a punta",
> "puerto a puerto"— dice dos veces lo mismo en dos renglones.

**Cambiar el titular no obliga a regenerar la imagen social**: la tarjeta se
dibuja con `home.hero.eyebrow` y `pie.ubicacion`, no con `titulo`. Los dos catálogos tienen las mismas claves y distinto punto de
vista. El registro es cercano profesional y voseo en castellano; el copy que
manda el cliente viene en registro formal ("Contáctenos", "dirijan su consulta")
y **no se copia tal cual**.

## Marca

El isotipo es un **elefante**: la "P" integra la cabeza y la trompa. "Phantus"
es un recorte de *elephantus*. El elefante está elegido por ser el animal de la
memoria y de los vínculos de largo plazo. Es el eje conceptual de la marca, no un
adorno.

**El slogan es "The elephant never forgets"**, y va en inglés en los dos idiomas.
Lo dijo Franco así y se trata como se trata un logotipo: es una pieza fija de
marca, no una frase que se traduzca. Por eso vive en `marca.slogan` con el mismo
valor en los dos catálogos, igual que `pie.correo` y `pie.responsable` —nombres
propios—.

Aparece **pegado al logotipo en el pie**, en el color pleno del fondo y no en el
gris de lo secundario: es marca, no una nota. La ciudad, que sí es dato de
contacto, queda debajo en gris.

> **No es lo mismo que el titular del bloque del elefante en `/nosotros`**, que
> dice "El elefante no olvida. Nosotros tampoco." y sí está traducido. Ése es el
> relato —explica de dónde sale el nombre— y el slogan es la firma. Si alguna vez
> se quiere unificar, lo que hay que decidir es si ese titular pasa a ser el
> slogan en inglés dentro del castellano.

Valores: **Confianza, Transparencia, Compromiso**.

### Reglas de uso del logo

- Área de seguridad alrededor del logotipo: **1/3 de la altura del nombre**
  "Phantus" (el nombre, no el bloque con "Global"). No sale del padding de quien
  lo monta: `Logo.tsx` la aplica como margen propio, derivada del alto
  renderizado. El nombre mide 229 px en un logotipo de 426 px de alto, y 229
  contra los 212 que mide el isotipo suelto; esas dos proporciones son toda la
  cuenta.
- Tamaños mínimos de render: isotipo suelto **50 px**, "Phantus" (sin "Global")
  **100 px**, logotipo completo **150 px**. `Logo.tsx` los hace cumplir y tira
  error si se piden más chicos.
- La variante de color no la elige el consumidor: `Section`, `Panel` y
  `HeaderElevado` publican su fondo por contexto y `Logo` deduce de ahí si va
  tinta o crema. El prop `sobre` existe sólo para el pie, que no vive dentro de
  ninguno de los tres; un `Logo` sin contexto y sin `sobre` frena el build con el
  motivo escrito.
- Donde el fondo cambia sin recargar —el header, que pasa del hero a crema al
  scrollear— el logo va con `fondoCambiante`: pinta las dos variantes
  superpuestas y cruza la opacidad. Cambiar el `src` obliga a bajar el otro
  archivo recién en el instante del cambio, y con red lenta eso deja el logo
  invisible casi un segundo. Cuesta una imagen más por instancia; sólo lo usa el
  header.
- El isotipo suelto se usa donde el espacio es mínimo o donde la marca ya se
  presentó en la misma pieza: favicon, redes, marca de agua.
- Combinaciones de color válidas, y sólo estas: **logo tinta sobre crema**, y
  **logo crema sobre azul, bordó o tinta**. No existe logo azul ni bordó sobre
  crema.

### Paleta

| Token | Valor | Uso |
| --- | --- | --- |
| `surface` | `#F2ECE2` | crema, superficie base |
| `surface-raised` | `#FBF8F4` | crema elevado |
| `ink` | `#0B1421` | tinta: texto y bloques oscuros |
| `ink-muted` | `#5A6A7E` | texto secundario sobre crema |
| `ink-inverse` | `#F2ECE2` | texto sobre oscuro |
| `ink-inverse-muted` | `#CDC5B9` | texto secundario sobre oscuro |
| `deep` | `#162B4C` | azul de sección |
| `accent` | `#64192E` | bordó de sección |

Los fondos no se pintan a mano: `Section` toma `fondo` y `globals.css` resuelve
por `[data-fondo]` el color de texto, el texto suave, la línea, el separador, el
realce, el anillo de foco y los colores de botón. `Panel` es el mismo mecanismo
para un bloque que corta el fondo de la sección sin abrir otra ancla (una
tarjeta, un recuadro destacado, el panel de un desplegable). Los dos publican además el fondo por contexto de React, que
es de donde `Logo` saca su variante.

El texto que es **contenido** va en el color de texto del fondo (`ink` sobre
crema, `ink-inverse` sobre los oscuros). `texto-suave` —o sea `ink-muted`, que
sobre crema da 4,71:1 contra los 15,73:1 de `ink`— queda para lo genuinamente
secundario: rótulos, notas al pie, aclaraciones, nombres científicos, el número
de un paso. Una página mayormente gris clarito se lee como borrador; eso se
arregló en Fase 7 y no conviene volver atrás por comodidad.

`--fondo-separador` lo estrenó el selector de idioma en Fase 8 y vale para
cualquier límite que dibuje un control dentro de sí mismo: tiene que llegar a
3:1, y cuánta opacidad hace falta para eso depende del fondo —sobre crema, tinta
al 50 %; sobre oscuro, crema al 70 %—. Hoy lo usa el borde del panel del
selector, que sobre el crema elevado de la barra es su único límite: da 3,45:1
contra la superficie del propio panel, 3,45:1 contra la barra elevada y 3,11:1
contra el crema base.

`--fondo-atenuado` salió junto con el alternador de dos letras, que era el
único que lo usaba. Si vuelve, vuelve con su advertencia: sobre oscuro
valía **crema pleno**, y eso no era un olvido —sobre el hero el crema pleno ya
está a 4,54:1 del peor cuadro posible, así que cualquier atenuación por color lo
perfora y el énfasis lo tiene que dar el peso de la tipografía.

En Fase 6 se sacaron `surface-sunken` (`#EBE3D6`) y `accent-hover` (`#4E1324`):
estaban declarados y no los usaba nadie. `surface-sunken` además no admitía
`ink-muted` encima —4,34:1, no llega a AA—, así que si vuelve, vuelve con esa
advertencia. `line-strong` sí se queda: lo usa el header elevado.

El color del anillo de foco se declara en **todos** los elementos y no dentro de
`:focus-visible`. Tailwind 4 cuenta `outline-color` entre las propiedades de
`transition-colors`, así que puesto recién al enfocar el anillo entraba
desvaneciéndose desde el color del texto: 150 ms en los que un botón sólido lo
tenía del mismo tono que su propio fondo. Declarado de antemano, al enfocar sólo
cambian estilo y grosor, que no se animan.

### La barra de desplazamiento

También es superficie de marca: por defecto la pinta el sistema y sobre el crema
queda una cinta gris que no es de ninguna de las dos paletas. Se declara una vez
en `html` —pulgar en `ink-muted`, pista en `surface`— con los pseudoelementos de
WebKit al lado, para Safari, que todavía no implementa `scrollbar-color`. Los
navegadores que sí la entienden ignoran esos pseudoelementos, así que conviven
sin repetir el color. **El pulgar no va redondeado**, igual que las tarjetas y
los botones.

**De las dos propiedades sólo el color se hereda**, y está comprobado: el `body`
y el contenedor del diagrama de cortes salen con el color de marca y con
`scrollbar-width: auto`. Es lo que se quiere —la barra de la página va fina
porque recorre un documento largo, y las de adentro se quedan con el ancho del
sistema, que es el que se agarra con el mouse en una caja chica—, pero conviene
saberlo antes de suponer que `thin` llega a todos lados.

### Tipografía

- **Montserrat** es la voz principal. SemiBold (600) para titulares.
- **Fraunces Bold** es secundaria y de uso puntual: una o dos palabras
  destacadas dentro de un titular (`<Destacado>`), nunca texto corrido ni
  titulares enteros. Los ejes SOFT y WONK quedan en 0, que es el corte del
  logotipo.
- La escala tipográfica y el ritmo vertical se definen una sola vez, en el
  `@theme` de `globals.css` (`--text-eyebrow`, `--text-titulo`,
  `--text-titulo-mayor`, `--text-entrada`, `--spacing-seccion`,
  `--spacing-header`, `--spacing-ancla`).
- Las dos familias se piden con el corte **`latin`** y nada más. `subsets` no
  decide qué `@font-face` se declara sino cuál se precarga: latin-ext,
  vietnamita y cirílico siguen declarados y el navegador los baja si alguna vez
  aparece un carácter suyo. Pedir latin-ext costaba 100 kB precargados en cada
  visita. Está verificado que todo el texto posible —los dos catálogos, los 250
  nombres de país que devuelve `Intl` en es y en, y los nombres de idioma— cae
  dentro de `latin`; si entra un idioma nuevo, hay que volver a verificarlo.

## Stack

| Paquete | Versión |
| --- | --- |
| next | 16.3.5 |
| react / react-dom | 19.3.0 |
| tailwindcss | 4.3.3 |
| next-intl | 4.14.4 |
| typescript | 7.0.2 |
| sharp (dev) | ^0.35.4 |
| zod | ^4.6.5 |
| resend | ^6.28.0 |
| playwright-core (dev) | ^1.63.0 |

App Router con `src/`, sin `tailwind.config`: la configuración de Tailwind vive
en `@theme` dentro de `src/app/globals.css`.

## Estructura

```
src/app/[locale]/     páginas: home, /productos y sus dos hojas
                      (/pescados, /carnes), /nosotros, /mercados,
                      /como-trabajamos
src/app/robots.ts     robots.txt
src/app/sitemap.ts    sitemap.xml con alternates por idioma
src/components/ui/    primitivas: Container, Section, Panel, SectionHeading,
                      Eyebrow, Button, Logo, TarjetaConFoto, fondos y su
                      contexto
src/components/hero/  fondo del hero: póster, video y velo
src/components/layout/ Header (elige variante), HeaderCompleto, HeaderMinimo,
                      Footer, MenuDeSecciones, SelectorIdioma, navegación,
                      BotonSaberMas
src/components/sections/
                      bloques de la home (Hero, los cuatro Resumen…, Contacto) y
                      el contenido de cada página
src/components/productos/
                      índice de unidades, tarjeta de unidad y sus fotos,
                      catálogo de especies y su ficha, hueco de imagen, pista
                      del carrusel, adelanto de cortes,
                      adelanto de la home, etiquetas de temporada y destacada,
                      condiciones de operación
src/components/accesos/
                      índice de las tres tarjetas de la home y sus fotos
src/components/alcance/
                      extremo de alcance y lista de mercados de destino
src/components/contacto/
                      formulario y sus piezas: Campo, SelectorDeTipo, mensaje
                      de error, aviso de rechazo, confirmación y lectura de la
                      query
src/content/          datos de dominio sin texto visible (secciones, unidades
                      de negocio, especies, pasos del proceso, mercados,
                      valores, extremos de alcance, domicilio, consulta)
src/i18n/             routing, navigation y request de next-intl
src/lib/              utilidades (fuentes, clases, idiomas, sitio, rutas,
                      tarjeta social, manifiestos de marca y de imagen social)
src/messages/         es.json y en.json
public/brand/         logotipo e isotipo en tinta y crema
public/og/            es.png y en.png, la imagen social de cada idioma
scripts/              generar-assets.mjs (derivados de marca e iconos)
                      generar-og.mjs (imagen social por idioma)
```

## Reglas de código

- **El atajo `border-(color:--x)` no funciona con variante.** Suelto sí —lo usan
  la flecha del carrusel y el borde en reposo de un campo— pero con `hover:` o
  `focus:` adelante **Tailwind no genera la regla**: la clase queda escrita en el
  DOM, la hoja no la tiene y el estado no cambia nunca, sin ningún error. Con
  variante va la forma clásica, `hover:border-[var(--x)]`. Se comprueba desde el
  navegador recorriendo `document.styleSheets` y buscando el selector; mirar la
  hoja con `curl` **no sirve** porque en dev el nombre del chunk cambia entre
  peticiones y es fácil terminar leyendo otra.

- **Una ruta nueva no compila con `tsc --noEmit` hasta borrar `tsconfig.tsbuildinfo`.**
  Next genera los tipos de ruta en `.next/types` y `.next/dev/types`, y el build
  los ve, pero `tsc` suelto se queda con el caché incremental y sigue diciendo que
  la ruta no satisface `AppRoutes`. No es un error del código: `rm -f
  tsconfig.tsbuildinfo` y vuelve a pasar limpio. Si además se borró `.next` justo
  antes, hay que correr el build primero, que es lo que regenera los tipos.

- **Nada que dependa de `IntersectionObserver` se puede verificar con el panel
  del navegador escondido.** Con la ventana detrás de otra, la página deja de
  pintarse —`document.hidden` en true y **cero cuadros por segundo**— y el
  observador no dispara nunca, así que el header no cambia de fondo y el botón
  de WhatsApp no se esconde. **Parece un error del código y no lo es.** Se
  comprueba midiendo los cuadros con `requestAnimationFrame`, y se verifica de
  verdad abriendo una ventana propia con Playwright en `headless: false`, que es
  lo que hace `flotante.mjs` en el scratchpad.

- **Al agregar una clase de Tailwind que el proyecto no usaba todavía, verificar
  que la hoja se haya regenerado antes de mirar una captura.** El `next dev`
  sirvió CSS viejo tras cambiar un componente a `grid-cols-2 sm:grid-cols-3
  lg:grid-cols-4`: las clases estaban en el DOM, la regla no estaba en la hoja y
  la grilla se veía de una sola columna. No es un problema del código. Se
  destraba tocando `globals.css`, y se confirma pidiendo la hoja servida y
  buscando la utilidad.

- **Cero strings visibles fuera de `src/messages/*.json`**, incluidos `alt`,
  `aria-label`, `title` y `placeholder`. `es.json` y `en.json` tienen
  exactamente las mismas claves.
- Nombres de dominio en **castellano** (`SelectorIdioma`, `secciones`,
  `varianteLogoSobre`). Las primitivas de UI conservan el nombre en inglés.
- Enlaces de ruta con el `Link` tipado de `src/i18n/navigation.ts`. Los anclas
  dentro de la misma página van como `<a href="#id">` para que el salto lo haga
  el navegador, que ya respeta `scroll-margin-top` y `prefers-reduced-motion`.
- Las secciones del sitio se enlazan **siempre** con `EnlaceDeSeccion`, nunca a
  mano: es el único lugar que sabe si una sección es una ruta (productos,
  nosotros, cómo trabajamos), un ancla de la home estando en la home
  (contacto), o un ancla de la home vista desde una subpágina, donde
  `#contacto` no existe y hay que volver a `/es` o `/en` primero.
- `BotonSaberMas` es la salida de un bloque corto de la home hacia la página
  que lo desarrolla. Envuelve a `EnlaceDeSeccion` con la variante de borde del
  botón: el sólido queda para el CTA de contacto, que es la única acción real
  de la página.
- `SECCIONES` es **el orden de la navegación** y la única lista: el header, el
  menú mobile, el pie y el índice de tarjetas de la home la leen de ahí. Fue el
  orden de la home mientras cada id tenía su bloque ahí; hoy sólo `productos` y
  `contacto` abren ancla en la home. Las tres navegables se declaran a mano en
  `SECCIONES_NAVEGABLES` y contacto se suma después, para que `SeccionNavegable`
  sea la unión de esas tres: es lo que deja que `FOTO_DE_ACCESO` exija una foto
  por tarjeta sin pedir una para contacto. Que una sección sea ruta o ancla lo
  dice `paginaDeSeccion`, y es lo único que hay que tocar para cambiarlo.
- Mobile-first siempre. Componentizar de entrada, un archivo por
  responsabilidad.
- Comentar sólo decisiones no evidentes. Nada de comentarios de sección.
- `clases()` es un join, no un merge: dos utilidades de Tailwind que pisan la
  misma propiedad (`hidden` contra `inline-flex`) se resuelven por orden en la
  hoja, no por orden en el atributo. Cuando haya conflicto, poner la utilidad
  condicional en un envoltorio.

## Hero

El único bloque oscuro del sitio que arranca arriba de todo. De abajo hacia
arriba son tres capas dentro de `FondoDelHero`: el póster, el video y el velo.

**El video ya existe**: `public/video/hero.mp4`, y `FUENTE` lo apunta. Es la
costa con un carguero cruzando despacio en el horizonte, cielo cubierto, la misma
paleta apagada que el póster. **No es Mar del Plata** —en bancos libres no hay
material del puerto que sirva para esto— y con el velo encima no hay forma de
decir qué playa es; la decisión de usar una costa genérica se tomó sabiéndolo.
Origen y licencia, en `src/imagenes/FUENTES.md`.

Lo prepara `scripts/preparar-video-hero.mjs`, que es donde están escritos los
porqués de cada parámetro. Salida: **10 s, 1920×1080, 25 fps, H.264 High,
yuv420p, sin pista de audio, `+faststart` y 2,16 MB** contra el techo de 2,5.

**Cierra en loop por fundido cruzado y no por corte.** La cámara está fija y el
barco se mueve despacio, así que ahí un corte casi no se notaría; lo que no
perdona es la rompiente, que cambia por completo entre dos instantes
cualesquiera. El guion trae `DURACION + FUNDIDO` segundos del origen, corre los
primeros `FUNDIDO` al final con el alfa entrando y los superpone. Medido: entre
el primer cuadro y el último la diferencia media por canal es **2,0 sobre 255**,
contra 7,7 entre dos cuadros sin relación.

**Se codifica en dos pasadas a bitrate fijo y no con CRF**, porque lo que hay que
garantizar es el tamaño: con el velo al 58 % encima, la calidad sobra.

Quien tenga el video bloqueado o pida quietud sigue viendo el póster, que es la
foto del puerto por `next/image` con `preload` y `placeholder="blur"`. El `<video>` no lleva atributo `poster`: ese
atributo toma una URL cruda, se saltearía el optimizador y bajaría una segunda
copia de la misma foto. El póster es la capa de abajo, y ya está pintada.

Si alguna vez llega material propio —del puerto de Mar del Plata, que es lo que
el sitio dice— se reemplaza pasándolo por el mismo guion. Lo que hay que pedir:
**MP4 o MOV, 1920×1080 o más, cámara fija, 15 s o más para que haya de dónde
recortar**, y que el barco no se salga de cuadro. Del resto —duración, códec,
audio, peso, loop— se encarga el guion.

`prefers-reduced-motion` no se resuelve por CSS: `autoplay` es un atributo. Lo
que se decide en JS no es si reproduce sino **si el elemento existe**, así que
con la preferencia activa no hay ni pedido de red. El `<video>` se monta después
de hidratar, o sea nunca antes que el póster.

El velo oscurece al **42 % del original** y el número no es de gusto. El peor
cuadro posible es blanco puro: para que el crema del texto (#F2ECE2, L = 0,8436)
llegue a los 4,5:1 que pide el texto chico del hero hace falta L ≤ 0,1486, o sea
sRGB 0,4217. De ahí sale el 0,42, y el piso son 4,53:1 **sin mirar qué muestra el
video**. No es "poca opacidad" y no puede serlo: dejando pasar el 50 % el mismo
texto queda en 3,38:1.

**Y se aplica como `brightness(0.42)` sobre cada capa, no como un negro encima.**
Fue `bg-black/58` en un `div` apoyado sobre el video, que da exactamente el mismo
resultado —las dos operaciones son la misma multiplicación— pero se compone
distinto. Un video opaco, sin filtro y sin transformación es justo el caso que
Chromium puede mandar a un **plano de superposición del hardware**: en vez de
dibujarlo con el resto de la página se lo pasa directo al controlador de
pantalla, y lo que está dibujado encima queda del otro lado de la composición. Lo
promueve cuando la página se queda quieta y vuelve atrás apenas algo se mueve,
que era exactamente el síntoma reportado: **el velo se iba al frenar el scroll y
volvía al moverse**. Un video con filtro no se puede promover, y sin velo no hay
capa encima que perder.

> **Este error no se puede ver con una captura, y eso costó un diagnóstico
> entero.** Las capturas del navegador y la grabación de Playwright leen la
> salida del renderizador, que es anterior a la composición del hardware: ahí el
> velo siempre se ve bien. Una medición cuadro a cuadro dio el velo constante
> —109,72 con rango 0,08 sobre 22 muestras— y de ahí salió una explicación
> equivocada, que era el header pasando a crema. No lo era: el header cambia una
> sola vez al cruzar los 8 px y no vuelve atrás. Lo único que ve este error es una
> pantalla de verdad.

**`FondoDeApertura` se queda con el `div` al 58 %** y eso no es una inconsistencia
olvidada: las aperturas de `/nosotros`, `/mercados` y `/productos` son foto y no
video, así que no hay nada que promover a un plano propio.

Ese 4,54:1 es además el techo del hero: sobre el velo **nada se puede atenuar**,
ni el rótulo ni el disparador del selector de idioma. Lo que quiera texto
atenuado ahí arriba tiene que traerse su propio fondo sólido, que es lo que hace
el panel del selector.

**El titular del hero va entero en Montserrat, en mayúsculas y a 800**, y es el
único del sitio que hace las tres cosas: el resto de los titulares va en los 600
de SemiBold, que es la voz que les da el manual. El peso extra no cuesta bytes
—Montserrat entra como fuente variable, así que el corte ya está en el archivo— y
acá se justifica porque compite con una foto a pantalla completa. Tampoco mezcla
las dos fuentes: el resto sigue con la Fraunces en una o
dos palabras por `Destacado`. El destacado del hero primero dejó de ser bordó
—sobre oscuro no llega al contraste— y después se fue del todo; acá el acento lo
da la mayúscula. `Destacado` sigue vivo y lo usan ocho secciones.

**La bajada ya no existe: en su lugar van cuatro iconos.** Decía la red SENASA,
los cuatro mercados y "de origen a destino"; ahora hay un pescado, una copa, una
pata de pollo y un corte de carne, que dicen **qué se comercia y no cómo**.

> **Eso es una pérdida real de dato en la primera pantalla.** Los cuatro mercados
> de destino ya no se nombran en la home: sólo en `/mercados`, a un clic de la
> tarjeta del índice. Y la red SENASA, sólo en `/nosotros`.

> **Los iconos declaran cuatro rubros y el sitio tiene dos.** Vino y pollo no
> tienen unidad en `/productos` ni aparecen en ningún otro lado. Es la misma
> tensión que la Fase 12 dejó anotada, pero ahora en la primera pantalla: hay que
> decidir si esos dos rubros existen de verdad y les toca su hoja, o si los
> iconos vuelven a ser dos. **El rótulo del hero ya se abrió** a "Bróker de
> comercio internacional" por esto: enumeraba pescado, mariscos y carnes un
> renglón encima de cuatro iconos.

Los trazados son de Lucide, copiados adentro del componente en vez de traídos por
dependencia; el porqué y la licencia, en `IconosDeRubro` y en `FUENTES.md`. **No
hay vaca**: el rubro de carne va con un corte, que además conversa mejor con los
otros tres, que también son producto y no animal.

**El subtexto iba en `text-base` y no en `text-entrada`**, que es la entrada del
resto del sitio: compite con un titular en mayúsculas a cuerpo mayor, y sobre el
velo cuanto menos texto grande haya, mejor se lee el titular. Bajar de cuerpo no
toca el contraste porque el 58 % ya está calculado para texto chico.

Y **desde `md` no pasa de `max-w-xl`** contra los `max-w-3xl` de la columna: con
el mismo ancho que el titular y la mitad del cuerpo se leía como un segundo
bloque de texto en vez de como su bajada. Abajo de `md` no hace falta, porque la
columna ya es más angosta que eso.

El hero sube `-mt-header` para que la barra quede encima del video y no a
continuación, y devuelve ese alto con un `pt-header` adentro: el texto arranca
donde arrancaba. La cuenta cierra al píxel porque la barra mide exactamente
`--spacing-header` —su línea inferior va como sombra interior y no como borde—.
**Eso vale para `HeaderCompleto`**; si alguna vez manda `HeaderMinimo`, que mide
80/96, el sangrado del hero hay que revisarlo.

## Variantes de header

Hay dos y conviven. `HeaderCompleto` es la de siempre: logotipo, navegación
desplegada desde `lg`, selector de idioma y botón sólido de contacto.
`HeaderMinimo` deja a la vista el logotipo, el selector de idioma y un
disparador de menú con la palabra **Menú**, sin navegación desplegada en ningún
ancho y sin línea inferior mientras está apoyado arriba de todo. `Header.tsx` no
dibuja nada, elige:

```ts
const VARIANTE: keyof typeof VARIANTES = 'completo';
```

Es la única línea que hay que tocar para pasar de una a la otra.

### Los dos estados del fondo

Cualquiera sea la variante, la barra tiene tres fondos y un solo centinela.

- **Apoyada sobre el hero** (`tinta`, y sólo en la home): sin fondo propio, el
  video se ve entero por detrás, contenido en crema, logo crema, sin línea ni
  sombra.
- **Apoyada sobre cualquier otra página** (`crema`): lo de siempre, con su pelo
  inferior.
- **Scrolleada** (`crema-elevado`, en las seis rutas por igual): contenido en
  tinta, logo tinta, línea fuerte y sombra corta.

Quién decide qué: el cruce lo avisa el `IntersectionObserver` que ya estaba —un
centinela de 8 px fuera de flujo, nada corriendo mientras se scrollea— y la ruta
la da `usePathname`, que resuelve en el prerender porque las seis rutas son
estáticas. El HTML sale del build con el estado correcto, así que no hay
parpadeo al hidratar. **Cuidado con el orden de los hooks**: la ruta se lee
siempre, no detrás del `&&` del estado de scroll.

De ahí para abajo no se pinta nada a mano: el fondo se publica por contexto
—igual que en `Section` y `Panel`— y con eso se resuelven solos el color del
texto, el disparador del selector de idioma, el anillo de foco,
los colores del botón sólido y la variante del logo. La transición cruza fondo,
color y sombra en 200 ms y se apaga con `motion-reduce`.

La excepción es el panel del selector, que **no hereda el fondo de la barra**:
lo declara. Ver más abajo.

Nada de lo que resuelve la navegación está duplicado: `HeaderElevado`,
`MenuDeSecciones`, `NavegacionDeSecciones`, `SelectorIdioma` y `EnlaceDeSeccion`
son los mismos para las dos, y se diferencian por props —`limiteEnReposo` en el
primero, `disparador` y `altoDeCabecera` en el segundo— y no por copias.

### El panel de secciones

El menú es un `<dialog>` con `showModal()` anclado al costado: el navegador se
encarga del atrapado de foco, de devolverlo al botón al cerrar, de la capa
superior y de Escape.

**Entra deslizándose desde el costado**, y eso pide tres cosas que van juntas:
`transition-discrete` para que `display` espere a la animación en vez de
cortarla, el estado de arranque (`starting:`) para que el panel tenga de dónde
entrar —sin él ya está en su sitio cuando el navegador lo pinta— y el mismo par
sobre el `::backdrop`, que si no aparece de golpe. Todo se apaga con
`motion-reduce`.

**El logo va en la cabecera del panel con `sobre`**: es, con el pie, uno de los
dos lugares del sitio donde no vive dentro de una `Section`, un `Panel` ni el
header, así que no hay fondo del que deducir la variante.

**Los enlaces usan `orientacion="panel"`**, una tercera disposición de
`NavegacionDeSecciones` —no una copia de la lista—: cada sección es una fila
entera con su pelo abajo y una punta que se corre al apuntar. El subrayado que
crece desde el borde, que es el gesto de la barra, ahí no diría nada: la fila ya
ocupa todo el ancho.

Al pie del panel van el botón de contacto a ancho completo y dos líneas chicas
con el correo y la ciudad. No son decoración: sin ellas el panel queda medio
vacío, porque las secciones son tres.

El alto no es gusto, es el manual. El área de seguridad es un tercio del alto
del nombre "Phantus", y en el **isotipo suelto** esa cuenta se hace contra un
nombre más alto que el propio isotipo: a 52 px de ancho son 55 px de arte más 20
de aire por lado, o sea 95, y de ahí salen los 96 px de `--spacing-header`. El
**logotipo completo** lleva el nombre adentro y sale mucho más barato: a 158 px
son 56 de arte más 10 por lado, 76 en total. Por eso `HeaderMinimo` mide 80 px
donde entra el logotipo y vuelve a 96 por debajo de 368 px de viewport, que es
donde manda el isotipo. Los pisos absolutos del manual son 71 px con el logotipo
a su mínimo de 150 y 91 px con el isotipo a su mínimo de 50: bajar de ahí es
romper el área de seguridad, no ajustarla.

Ese umbral es propio de la barra mínima —a la derecha ocupa 143 px y el
logotipo con su aire 178, que con el gap de 16 entran desde 377— y va como
utilidad arbitraria (`min-[24rem]`, o sea 384 px, para no cortar al filo). Era
368 mientras el selector fue el par `ES | EN`: con el desplegable pasó de 81 px
a 94 y la cuenta se corrió 14 px. Si la variante mínima queda, merece token
propio en el `@theme`; `xs` no
sirve porque está calculado para la barra completa.

## i18n

Español e inglés, prefijo de idioma **siempre visible** (`/es`, `/en`), cookie
`NEXT_LOCALE` persistente por un año. Sumar un tercer idioma debería alcanzar
con agregarlo a `src/i18n/routing.ts` —incluidas sus rutas en `pathnames`— y
crear su JSON: el selector lee `routing.locales` y saca el nombre de cada idioma
de `Intl.DisplayNames`.

Las rutas están traducidas con `pathnames`: la clave es la carpeta real bajo
`app/[locale]` y el valor, la URL pública de cada idioma (`/productos` y
`/products`, con `/pescados` y `/seafood`, `/carnes` y `/meat`; `/nosotros` y
`/about`; `/mercados` y `/markets`; `/como-trabajamos` y `/how-we-work`). Son
**siete rutas y catorce URLs**, todas prerenderizadas. Eso hace dos
cosas: el inglés no navega en castellano, y el
`Link` deja de compilar si alguien apunta a una ruta que no existe. La ruta
interna sigue respondiendo, pero con redirección a la pública, así que no hay
contenido duplicado. `src/lib/rutas.ts` arma las absolutas y los alternates que
consumen el sitemap y la `metadata` de cada página.

### Selector de idioma

Es un desplegable, no el par `ES | EN` que hubo hasta Fase 8. El disparador
dice en qué idioma se está leyendo, con el nombre entero, y el panel lista los
nombres enteros de todos: dos letras no le sirven justamente a quien no entiende
el idioma en el que cayó.

Lo que no cambió y no puede cambiar:

- **Son enlaces, no un `<select>` con `onChange`.** Se abren en pestaña nueva y
  el rastreador los sigue. Cada opción lleva `hrefLang` y `lang`, y la vigente
  `aria-current`.
- **Preserva ruta y ancla**: parado en `/es/productos#x` el
  enlace a inglés apunta a `/en/products#x`. La ruta la da
  `usePathname` de next-intl y el ancla se lee del cliente, porque el hash no
  viaja al servidor. **La query no se preserva** —nunca lo hizo—, así que salir
  de `/es?consulta=compra#contacto` pierde la preselección del formulario.
- **Ningún idioma escrito a mano**: la lista es `routing.locales` y el nombre lo
  da `Intl.DisplayNames`. Sumar un locale no toca este archivo.

El panel **no usa la API de popover**, y no por desconocerla: un popover vive en
la capa superior, donde el bloque contenedor es el viewport, así que atarlo al
disparador pide posicionamiento por ancla —que todavía no está en todos los
navegadores— o medir con JS en cada apertura, scroll y resize. El disparador
vive dentro de un `Container` con tope de ancho, adentro de una barra `sticky`:
sale más caro que resolver a mano las tres cosas que el popover regala. Se
resuelven así: Escape en el `keydown` del control —cortado con
`stopPropagation` para no llevarse puesto a un `<dialog>` que lo contenga—, clic
afuera con un `pointerdown` en `document` mientras está abierto, y capa superior
no hace falta porque el panel cuelga del header, que ya es `z-30`. Tabular fuera
del control también lo cierra.

El foco entra al panel por la opción vigente y vuelve al disparador con Escape,
las dos veces con `enfocarConAnillo`: lo movió el código, no el visitante. No
lleva `role="menu"` ni `aria-haspopup` —son enlaces, no ítems de menú— así que
tampoco promete navegación por flechas: adentro se tabula.

El panel **declara su propio fondo** (`crema-elevado`) en lugar de heredar el de
la barra, porque tiene que leerse igual sobre el hero, sobre el crema elevado y
sobre tinta, y sobre el velo no hay margen para una transparencia. De ahí salen
solos el texto, el borde y el anillo de foco. Cuelga del disparador con
`absolute top-full`, así que **no empuja el layout ni cambia el alto de la
barra**: los 96 px se miden iguales con el panel abierto.

## Assets de marca

**El origen es vectorial y vive en el repo**: `src/imagenes/marca/{logotipo,
isotipo,nombre}.svg`. `npm run assets:brand` los lee y genera
`public/brand/{logotipo,isotipo}-{tinta,crema}.png`, `src/app/icon.png`,
`apple-icon.png`, `favicon.ico` y `src/lib/marca-assets.json`.

**El recoloreo se hace en el SVG, no en los píxeles.** Cada forma trae un solo
`fill` en la raíz; el guion lo reemplaza y rasteriza cada variante ya en su
color, así que el antialias sale bien por construcción. Antes el arte llegaba
como PNG y había que comprobar que fuera un plano de color con el antialias
íntegramente en el alfa para poder pisar el RGB sin dejar halo; esa verificación
ya no hace falta. La que sí quedó es que el reemplazo alcance a todo el dibujo:
un solo `fill`, sin `<style>` ni `class`. Si el cliente vuelve a exportar desde
Illustrator con la hoja de estilos adentro —que es como vinieron los tres
archivos—, el guion frena.

Se rasteriza a **300 ppp y se baja** al tamaño de publicación, así que siempre
se reduce y nunca se amplía.

> **Los originales estuvieron perdidos y aparecieron en vectorial.** Hasta acá
> eran dos PNG en `~/Downloads` que desaparecieron, y los cuatro publicados se
> habían reconstruido: el logotipo desde una variante de 384 px que `next/image`
> había dejado en `.next/cache` —o sea ampliado unas tres veces— y el isotipo
> despejando el alfa de `src/app/icon.png`. Regenerados desde el SVG, el mismo
> archivo de 1200 × 426 pesa **19 kB en vez de 30** y tiene los bordes en un
> píxel. Las medidas no cambiaron, así que `marca-assets.json` quedó igual y
> ningún componente se enteró.

> **`nombre.svg` está y no se publica.** Es "Phantus" sin "Global", la tercera
> forma del manual —mínimo de render 100 px—, y hoy no la usa ningún componente.
> Sumarla es agregarla a `FORMAS` en el guion y a `FormaLogo` en `Logo.tsx`.

> **A densidad 3 el logotipo del header se sirve corto.** `next/image` emite
> candidatos 1x y 2x nada más, así que para una caja de 186 px pide 558 px y
> recibe 384. A densidad 1 y 2 sirve la medida correcta. Se arregla de raíz
> pasando el logo a SVG en línea, que además haría innecesario `fondoCambiante`
> —el color se animaría por CSS en vez de cruzar dos imágenes— y ahorraría los
> 7,5 kB de la segunda variante.

## Imagen social y datos estructurados

`npm run assets:og` genera `public/og/{es,en}.png` (1200×630) y el manifiesto
`src/lib/og-assets.json`. Necesita el sitio levantado: toma `PHANTUS_OG_URL` o,
por defecto, `http://localhost:3001`.

La tarjeta se dibuja **en el navegador**, sobre una página del propio sitio, y se
captura con Playwright. No es el camino obvio y la razón es la tipografía:
`next/font` sólo emite WOFF2 y satori —el motor de `ImageResponse`— no lo lee, así
que generar en build obligaba a meter los TTF a mano o a caer en una fuente del
sistema, que no es la marca; `sharp` sola tiene el mismo problema, porque su
texto pasa por fontconfig y acá no hay Montserrat instalada. Apoyándose en una
página real salen Montserrat, Fraunces y los tokens de `globals.css` tal cual
son. El resultado es un archivo quieto: en producción no se genera nada.

El texto de la tarjeta sale de los catálogos (`home.hero.eyebrow` y
`pie.ubicacion`): no hay copy nuevo ni claves nuevas más que `metadata.ogAlt`.
**Si se cambia el rótulo del hero hay que regenerar**, y pasó el 21/09 al abrirse
el encuadre a carnes. El titular del hero **no** entra en la tarjeta, así que
cambiarlo solo no obliga a nada.

> **El encuadre general quedó a mitad de camino, y es lo próximo a mirar.** El
> hero ya dice "alimentos" y su rótulo nombra pescado, mariscos y carnes, pero
> `metadata.title`, `metadata.description` y `nosotros.rol` siguen diciendo que
> Phantus es bróker de **pescado y mariscos del Atlántico Sur**. Es la tensión que
> la Fase 12 dejó anotada; Franco la empezó a resolver por el hero. Lo que frena
> el resto es SEO: el `metaTitle` nombra las especies de mayor volumen a
> propósito, porque son los términos que se buscan, y abrirlo a "alimentos" los
> pierde.

`src/lib/tarjeta-social.ts` arma `openGraph` y `twitter` de cada ruta. Vive
aparte porque **Next reemplaza el objeto `openGraph` entero** cuando una página
declara el suyo: si una subpágina pusiera sólo el título, se quedaría sin imagen.
Título y descripción no se repiten ahí — Next los toma de los campos ya resueltos
de la página, incluida la plantilla `%s | Phantus Global`.

`DatosDeOrganizacion` publica el JSON-LD de `Organization` **sólo en la home**,
que es la página que Google toma como representativa. Lleva nombre, descripción,
dominio, logotipo, la ciudad y el correo —el mismo que el pie, de `pie.correo`—,
el teléfono en E.164 y nada más: **no hay horarios, redes ni identificadores
fiscales** porque no hay dato real, y un campo inventado en datos estructurados
es peor que la ausencia del campo. El domicilio vive en `src/content/domicilio.ts`, que es
donde se agrega calle y código postal cuando aparezcan.

**Teléfono y correo directo**, desde que el cliente los pasó: `+54 223 683-8585`
e `sales@phantusglobal.com`, al lado del formulario en la sección de contacto
(`CanalesDeContacto`), como `tel:` y `mailto:`. El formulario sigue siendo la
conversión —es el único camino que llega con el tipo de consulta ya elegido— pero
hay quien no completa un formulario y llama.

> **El número que se marca no es el que se lee.** El cliente lo pasó como
> `+54 0 223 683-8585` y ese `0` es el prefijo interurbano argentino: se marca
> desde adentro del país y **se cae** cuando adelante va `+54`. Un `tel:` con el
> cero de más no conecta desde el exterior, que es de donde llaman los
> importadores. El enlace va en E.164 (`+542236838585`, en
> `src/content/contacto-directo.ts`) y el texto a la vista lleva la separación
> que se lee mejor. **Es un celular, confirmado por Franco**, así que lleva el
> `9` entre país y área: `+5492236838585`. Ese nueve hace el mismo trabajo que
> el cero pero al revés —desde el exterior es obligatorio y desde adentro del
> país no se marca—, y los dos juntos no existen.

**Hay una sola dirección publicada y es `sales@phantusglobal.com`.** Estuvo
partida en dos —esa en la sección de contacto y una personal en el pie, que era
además la que el JSON-LD declaraba como correo de la organización— y se
unificaron al sacar el nombre del responsable. El pie y el JSON-LD leen la misma
clave, `pie.correo`, así que hay un solo lugar donde cambiarla.

El teléfono **sí entró al JSON-LD** como `telephone`, en E.164. Era uno de los
huecos declarados —"no hay dato real"— y dejó de serlo. Horarios, redes e
identificadores fiscales siguen afuera por el mismo motivo de siempre.

**El correo va en texto plano** en el pie (`pie.responsable` y `pie.correo`,
mismos valores en los dos catálogos porque son nombres propios) y como `mailto:`.
Hasta la Fase 10 el único canal era el formulario, justamente para no exponer la
dirección a los rastreadores de spam; el cliente la publicó en su copy y la
decisión se tomó sabiendo ese costo. Si alguna vez hay que revertirlo, es ese
bloque del `Footer` y la clave `email` del JSON-LD.

## Deploy en Cloudflare Workers

`@opennextjs/cloudflare` traduce la salida de `next build` a un Worker. Los
comandos son `npm run cf:build`, `cf:preview` (lo levanta local con el runtime
de verdad), `cf:deploy` y `cf:types`.

**No alcanzaba con exportar el sitio estático.** Catorce de las catorce URLs se
prerenderizan, sí, pero quedan dos cosas que necesitan servidor: el proxy de
idioma de next-intl —que es el que manda `/` a `/es`— y la Server Action del
formulario. Por eso va el adaptador y no `output: 'export'`.

**Las dos banderas de compatibilidad no son intercambiables.** `nodejs_compat`
es la obvia: el bundle de Next asume Node. `global_fetch_strictly_public` es la
que se olvida, y hace que un `fetch()` del Worker a su propio dominio salga a
internet en vez de resolverse adentro del runtime; sin ella no pasa por las
reglas de Cloudflare ni por el caché.

**`next/image` no anda sin el binding de Images.** El adaptador no trae
optimizador propio: sin `IMAGES` declarado, las fotos salen sin optimizar y se
pierden el `srcset` y el AVIF. Cloudflare cobra por transformación **única** y
no por visita, y regala 5000 por mes; el sitio tiene 32 imágenes y con sus
variantes queda en el orden de las 150 mensuales, así que entra gratis con
mucho margen. Verificado en local: el póster del hero vuelve como WebP de
16,7 kB contra los 276 del JPEG original.

**El Worker mide 2,70 MB comprimidos contra el techo de 3 del plan gratuito**,
o sea 8 % de aire. Es el número a mirar antes de sumar cualquier dependencia al
servidor: una biblioteca mediana lo pasa. El plan pago ($5 al mes) lleva el
techo a 10 MB y el problema desaparece. Los 11 MB de fotos y el video **no
cuentan**: salen de Workers Assets, que es gratis y no consume pedidos
facturables.

**Sin caché incremental, a propósito.** Ninguna página declara `revalidate`, así
que no hay nada que guardar. El día que alguna lo haga, se engancha KV o R2 en
`open-next.config.ts`.

> **El límite de envíos del formulario deja de servir acá, y es lo más
> importante de esta fase.** `limite-de-envios.ts` cuenta en un `Map` del heap,
> y el propio archivo ya avisaba que en un runtime que levanta instancias por
> pedido el tope real pasa a ser el escrito por la cantidad de instancias.
> Cloudflare corre muchos isolates, en muchos centros de datos, y los recicla:
> el cupo de 5 cada 10 minutos pasa a ser 5 **por isolate**. La trampa y el
> tiempo mínimo siguen funcionando igual, pero el tope por IP no. Lo que
> corresponde es el binding nativo de rate limiting de Cloudflare, que es
> gratis y no agrega servicio.

> **La IP sigue saliendo bien, pero por casualidad documentada.** Cloudflare
> agrega la IP del visitante **al final** de `x-forwarded-for`, así que leer
> desde la derecha con `CONTACTO_PROXIES_DE_CONFIANZA=1` da la correcta. Lo
> robusto es `CF-Connecting-IP`, que la pone el borde de Cloudflare y no se
> puede falsificar. Es una línea en `ip-del-pedido.ts`.

> **El proxy de idioma corre como middleware de Node y eso es experimental.**
> El build lo avisa: los mantenedores de OpenNext no lo sostienen oficialmente.
> Anda —está probado ruta por ruta— pero es lo primero a mirar si algún día una
> actualización rompe el redirect de idioma.

**Las credenciales no van en `wrangler.jsonc`**, que se commitea:
`RESEND_API_KEY`, `CONTACTO_DESTINO` y `CONTACTO_REMITENTE` se cargan con
`wrangler secret put`. Mientras falten, el formulario contesta igual y escribe
el mail al log como envío simulado, así que **un sitio publicado sin ellas
acepta consultas y no las manda a ningún lado**.

## Estado de las fases

- **Fase 0 — cerrada.** Andamiaje: Next + Tailwind + next-intl, i18n, tokens de
  marca, fuentes, assets.
- **Fase 1 — cerrada.** Assets corregidos a tinta/crema, primitivas de UI,
  Header sticky con menú mobile accesible, selector de idioma, Footer,
  `robots.ts`, `sitemap.ts`, `favicon.ico`, metadata reescrita.
- **Fase 2 — cerrada.** Hero, `nosotros` y `como-funciona`: manifiesto, misión,
  racional del elefante, valores y los cuatro pasos de la intermediación. En
  Fase 7 esos dos bloques se mudaron a página propia y `como-funciona` pasó a
  llamarse `como-trabajamos`, que es lo que la etiqueta decía desde el principio.
- **Fase 3 — cerrada.** Unidades de negocio con subpáginas propias y rutas
  traducidas, contexto de fondo y área de seguridad del logo. La home conserva
  un bloque corto de unidades de negocio que linkea al índice, y va antes de
  quiénes somos: quien entra quiere saber qué se comercializa antes de leer el
  manifiesto. Los dos tonos de crema se alternan para que ningún límite entre
  secciones quede sin corte.
- **Fase 4 — cerrada.** `alcance`. El argumento es que el origen es
  concreto y el destino no: estamos en Mar del Plata, que es el principal puerto
  pesquero del país, y el destino lo define cada operación. **No hay dato real de
  a qué mercados opera Phantus**, así que no nombra países, regiones
  ni cantidades, y no lleva mapa: un mapa sin destinos reales es una mentira
  dibujada y uno vacío se ve roto. Cuando llegue el dato, lo que puede crecer es
  el bloque `destino`, no el encuadre. En Fase 7 dejó de ser sección de la home
  y pasó a ser el cierre de `/nosotros`, donde el argumento encajaba mejor: dónde
  estamos parados es parte de quiénes somos. **Y volvió a mudarse**: hoy es la
  ruta `/mercados`, porque una de las tres tarjetas de la home la nombra. **En Fase 11 llegó el dato** —
  Estados Unidos, México, Europa y China— y el bloque `destino` creció como
  estaba previsto: los nombra, suma el cumplimiento por mercado y ya no tiene que
  argumentar por qué no hay lista. Sigue sin mapa.
- **Fase 5 — cerrada.** El formulario de `contacto`, sobre un panel crema
  dentro de la sección bordó: sobre bordó no hay un rojo de error que llegue a
  contraste. Con esto se acabaron los bloques provisorios y `EnConstruccion` ya
  no existe.
- **Fase 6 — cerrada.** Pulido previo al lanzamiento: imagen social por idioma
  con sus etiquetas, `Organization` en JSON-LD, corte `latin` de las fuentes,
  anillo de foco sin animación, tokens huérfanos fuera y el primer repaso
  responsive mirado de verdad (320 a 1440, cuatro rutas, dos idiomas).
  Medido sobre `next start`: el LCP es **texto en las seis combinaciones** —el
  `h1` del hero a 1440, el párrafo de entrada a 375—, así que **ninguna foto se
  precarga**. Con red y CPU de móvil (Slow 4G, CPU 4x) queda entre 1,19 y 1,58 s;
  CLS entre 0 y 0,004. Las fuentes terminan de cargar antes del primer pintado
  incluso ralentizadas, así que no hay destello.
- **Fase 7 — cerrada.** Reestructura: **la home pasa a ser escaparate**. Cinco
  bloques —hero, unidades de negocio, nosotros, cómo trabajamos, contacto— y los
  dos del medio son un titular, una o dos líneas y un `BotonSaberMas`. La prosa
  se mudó entera a dos páginas nuevas, `/nosotros` (`/about`) y
  `/como-trabajamos` (`/how-we-work`), y `alcance` dejó de ser sección para
  cerrar `/nosotros`. La home bajó de 6079 a **3701 px** a 1280 y de 8523 a
  **4488** a 375. **No se tiró texto**: lo que se acortó es lo que queda en la
  home.
  El cuerpo pasó de `ink-muted` a `ink` en 32 claves de contenido real; el gris
  quedó para rótulos, notas y letra chica. La tarjeta oscura de la home ya no la
  ocupa el relato del nombre sino el argumento comercial, y el relato del
  elefante es ahora el bloque central de `/nosotros`.
  La navegación pasó de cuatro entradas a tres: a 1024 px el aire entre el
  logotipo y la primera entrada pasó de 79 a 155 px en castellano y de 98 a 234
  en inglés.
  La imagen social **no hay que regenerarla**: sale de `home.hero.eyebrow` y
  `pie.ubicacion`, y ninguna de las dos cambió.
- **Fase 8 — cerrada.** El hero pasa a video de fondo con velo negro al 58 % y
  el header, a transparente encima mientras está apoyado ahí. El video todavía
  no está: queda el póster y una constante que apunta al archivo. La home
  arranca en tinta, así que el orden de fondos es tinta → crema elevado → crema
  → azul → bordó, sin dos límites iguales pegados y con el corte más fuerte
  arriba de todo. El destacado del titular dejó de ser bordó. Salieron dos
  tokens nuevos (`--fondo-separador`, `--fondo-atenuado`) porque sobre el velo
  el crema pleno está a 4,54:1 y no admite atenuación alguna.
  Medido sobre `next start` contra la versión anterior: el LCP y el CLS **no se
  movieron** (home a 1440 con Slow 4G y CPU 4x: 2,63 s antes, 2,69 s después;
  CLS 0,040 en los dos). El costo del cambio es la segunda variante del logo,
  +7,5 kB a 1440.
- **Fase 9 — cerrada.** Catálogo de especies. La lista de `/pescados` pasó a ser
  el catálogo —el hueco de imagen y nada más— y la home sumó un adelanto debajo
  del CTA de `nosotros`, en crema elevado. Los cuatro PNG no estaban todavía:
  quedaba el hueco con la proporción final y el isotipo al 7 % adentro. **Los
  cuatro llegaron después** y hoy el catálogo va con recorte; el hueco vacío
  sigue existiendo como caso y se sigue dibujando solo. Sólo pescados llevaba
  catálogo; carnes no.
  La home creció de 3748 a **4376 px** a 1280 (+628) y de 4254 a **4920** a 375
  (+666). Las doce URLs siguen prerenderizándose. Tres claves nuevas
  (`home.catalogo.eyebrow`, `.titulo`, `.cta`) y ninguna para las imágenes: el
  `alt` del recorte va vacío.
- **Fase 10 — cerrada.** El formulario de contacto, que es la conversión del
  sitio. Dejó de ser una pila de siete campos: dos tramos numerados, el mensaje
  arriba junto al tipo de consulta y el nombre ocupando la
  fila entera para que el país no quede con media fila vacía. El tipo de consulta
  llegó a ser una grilla de tres cajas y terminó siendo un `<select>`, igual que
  el país: son los dos campos que se contestan eligiendo y no escribiendo, y
  tratarlos igual le baja el ruido al formulario. La aclaración del
  mensaje pasó a debajo del control y el envío es el botón `grande`, 56 px de
  alto y de ancho completo hasta `sm`. `Campo` marca `required` en el DOM a
  partir de la ausencia de `opcional`.
  Tres claves nuevas (`home.contacto.grupos.consulta`, `.grupos.datos`,
  `home.contacto.respuesta`) y ninguna borrada; `ayudaMensaje` se acortó porque
  ahora es una nota al pie y no un párrafo. Un tamaño nuevo de botón y una regla
  nueva en `globals.css` (`.anillo-del-hijo`, que ya no está: se fue con la
  grilla). Las doce URLs seguían
  prerenderizándose y no había desborde horizontal de 320 a 1280.
- **Fase 11 — cerrada.** **Reposicionamiento.** El sitio deja de ser un bróker
  general de mercadería y pasa a ser bróker de **pescados y mariscos del
  Atlántico Sur**. Con carnes fuera del menú quedaba un índice de una sola
  tarjeta, así que el nivel intermedio se colapsó: `/unidades-de-negocio` y
  `/unidades-de-negocio/carnes` se borraron y
  `/unidades-de-negocio/pescados` subió a **`/productos`** (`/products`). De doce
  URLs a **ocho**, las ocho prerenderizadas. La home bajó a **4046 px** a 1280 y
  **4552** a 375, con cinco bloques: hero, productos, nosotros, cómo trabajamos,
  contacto; el adelanto del catálogo y la vidriera de unidades eran dos bloques
  que apuntaban al mismo lugar y quedaron en uno solo, que es la sección
  `productos`. Orden de fondos: tinta → crema elevado → crema → crema elevado →
  bordó (`ResumenDeComoTrabajamos` pasó de crema a crema elevado).
  Entraron todos los datos que el sitio venía declarando como inexistentes:
  mercados (EE.UU., México, Europa, China), red SENASA, estructura legal en
  EE.UU., cumplimiento FDA/HACCP/SIMP, formatos IQF/bloque/HOSO/HLSO/filet,
  Incoterms FOB/CFR/CIF, plazo de 24–48 horas hábiles, pago directo entre
  exportador e importador y el correo público. `comoTrabajamos` pasó de cuatro
  pasos a **cinco** (sourcing, especificación técnica, negociación comercial,
  logística y documentación, cierre).
  El hero sigue con **un solo CTA** —el par exportador/importador vive en el
  cierre de `/nosotros`, `/mercados`, `/como-trabajamos` y `/productos`—, y el archivo de copy
  del cliente venía con dos: manda el pedido de Franco, no el archivo. Del copy
  también se descartó el registro formal.
  La imagen social **sí hubo que regenerarla**: `home.hero.eyebrow` cambió.
- **Fase 12 — cerrada.** Vuelve el nivel intermedio de productos, con carnes
  de nuevo como unidad de negocio. `/productos` pasa a ser índice de dos
  tarjetas con foto, `/productos/pescados` (`/products/seafood`) se queda con el
  catálogo y las condiciones, y `/productos/carnes` (`/products/meat`) es la
  unidad secundaria, sin catálogo y con el encuadre más el CTA. **De ocho URLs a
  doce**, las doce prerenderizadas. Las dos fotos de unidad estaban huérfanas
  desde la Fase 11 y volvieron sin buscar material nuevo.
  El catálogo de especies subió de cuatro a **diez** —pescadilla de red, besugo,
  pez palo, mero, raya y rebozado de merluza— y cada ficha sumó el bloque de
  **formatos**. Seis de las diez todavía no tienen recorte y se muestran con la
  marca de agua; el carrusel de la home sigue mostrando sólo las cuatro que sí lo
  tienen.
  El formulario de contacto bajó de siete campos a **cuatro** —tipo, mensaje,
  nombre y correo— y perdió los dos tramos numerados.
  **Lo que no cambió y conviene mirar:** el hero, el `metaTitle` de la home y
  `/nosotros` siguen diciendo que Phantus es bróker de pescados y mariscos del
  Atlántico Sur. Con carnes de vuelta como unidad, eso es una tensión real —no un
  error—: hay que decidir si el encuadre general se abre o si carnes queda
  declaradamente en segundo plano, que es lo que hoy dice su propia página.
- **Fase 13 — el deploy, a medio camino.** Deja de ser Docker sobre un VPS y
  pasa a **Cloudflare Workers** con `@opennextjs/cloudflare`. El proyecto está
  configurado, construido y probado de punta a punta en local; lo único que
  falta es `wrangler login` y `npm run cf:deploy`, que son de Franco porque
  publican el sitio con su cuenta. Ver **Deploy en Cloudflare Workers**.
- **Pendiente, anterior a esta fase.** El LCP de la home con red de móvil es la
  foto del hero y está en 2,6–2,7 s, arriba del umbral de 2,5. Y hay un
  desplazamiento de 0,040 a 375 px que entra a los 1,3 s sobre una sección
  anclada. Los dos venían de antes y ninguno cambió en Fase 8, pero merecen una
  pasada propia.

## Los tres accesos de la home, y `/mercados`

La home abre con **tres tarjetas con foto** —NOSOTROS, MERCADOS, PRODUCTOS—
pegadas al hero, que es la misma pieza que el índice de unidades de `/productos`:
`TarjetaConFoto`, foto, velo al 50 % y el nombre en mayúsculas encima. Los ids y
sus rutas viven en `src/content/accesos.ts`.

**Van arriba, no abajo**: son el índice del sitio, así que su trabajo es dejar
elegir antes de leer nada. Debajo quedan los dos bloques de producto —pescados y
carnes— y el formulario cierra, que es la única acción real de la página.

**La home quedó en cinco bloques**: hero, índice, pescados, carnes, contacto.
Salieron los dos escaparates de prosa, nosotros y cómo trabajamos, y las dos
páginas siguen enteras y listadas en el header. De los cuatro ids de `SECCIONES`
sólo `productos` y `contacto` abren ancla en la home; `nosotros` y
`como-trabajamos` son ruta y nada más, que es lo que `paginaDeSeccion` ya
resolvía. `ResumenDeNosotros` y `ResumenDeComoTrabajamos` quedaron sin
consumidor y **no se borraron**, junto con `home.nosotros.*` y
`home.comoTrabajamos.*`: es copia del cliente y el repo no tiene historial.

**El bloque de nosotros salió de la home para que entraran.** Era titular, una
línea y un botón —"Quién responde por la operación"— y lo que decía sigue entero
en `/nosotros`, a un clic de la primera tarjeta. El componente
`ResumenDeNosotros` y las claves `home.nosotros.*` **quedaron sin consumidor y
no se borraron**: es copia del cliente y el repo no tiene historial. Están en la
misma lista de huérfanos que lo que dejó el catálogo compacto.

**`SECCIONES` no cambió y eso es deliberado.** `nosotros` sigue siendo sección
del sitio —el header y el pie la listan— y `paginaDeSeccion` ya la resolvía como
ruta, así que sacarle el bloque a la home no rompe ningún enlace: lo que
desapareció es el ancla `#nosotros`, que no la usaba nadie. Lo que sí deja de
ser cierto al pie de la letra es que `SECCIONES` sea "el orden de la home":
`nosotros` está en la lista y ya no es un bloque. Es orden de navegación.

**Las dos grillas miden lo mismo desde el 23/09**: tres columnas desde `md`, 12 px de aire y tarjetas de 355 x 443 —4:5—, medidas a 1280 en las dos páginas. Fueron distintas mientras el índice de productos eran dos tarjetas de media pantalla, 3:2 y 20 px de aire; con tres entradas esa diferencia ya no decía nada y las dos piezas que hacen lo mismo se ven iguales. La proporción es un prop de `TarjetaConFoto`
(`forma`), con las dos clases literales adentro del componente porque Tailwind
lee el código fuente y no resuelve una clase armada por quien la consume. **En el
teléfono vuelven a 3:2**: las tres se apilan, y una atrás de otra en vertical
convertiría el índice en tres pantallas de scroll justo donde el visitante acaba
de bajar del hero.

**Las tres tarjetas y la navegación son la misma lista.** Tuvieron listas
separadas —`ACCESOS`, con su propio espacio de nombres en i18n— mientras decían
cosas distintas: la barra listaba productos, nosotros y cómo trabajamos, y las
tarjetas nosotros, mercados y productos. Cuando Franco pidió que la barra fuera
esas tres mismas, mantener dos listas paralelas era garantizar que se desfasaran,
así que `ACCESOS` y `home.accesos.*` se borraron y el índice recorre
`SECCIONES_NAVEGABLES` con las etiquetas de `secciones.<id>`. Se agrega una
sección en un solo lugar.

Para que eso entrara, `como-trabajamos` **salió de la navegación** —el header, el
menú y el pie— y su página sigue en pie: se llega por el sitemap y por donde se
la enlace a mano. Con el id fuera de `SECCIONES`, `ResumenDeComoTrabajamos` dejó
de compilar —usaba `id` y `seccion` tipados contra esa lista— y **se borró**; ya
estaba huérfano desde que salió de la home. La copia quedó en el scratchpad de la
sesión.

**El destino de cada tarjeta lo resuelve `EnlaceDeSeccion`**, no la tarjeta. Por
eso `TarjetaConFoto` dejó de recibir una `href` y recibe una función que envuelve
su contenido: el índice de la home pasa por `EnlaceDeSeccion`, que es el único
que sabe si una sección es ruta o ancla, y el de unidades por el `Link` tipado,
porque una unidad de negocio no es una sección y no tiene esa ambigüedad.

### Por qué `/mercados` existe

Porque una tarjeta que dice MERCADOS tiene que caer en una página de mercados. El
bloque de alcance —las dos puntas de la operación, con los cuatro mercados de
destino— cerraba `/nosotros` desde la Fase 7, y con él ahí dos de las tres
tarjetas terminaban en la misma URL. Así que pasó a ruta propia: `/mercados` y
`/markets`, séptima ruta y URLs trece y catorce, las dos prerenderizadas y en el
sitemap.

El contenido no se reescribió, se mudó: `nosotros.alcance.*` pasó a `mercados.*`
—con `metaTitle`, `metaDescription` y su propio `contacto` nuevos— y el titular,
que ya decía "Del puerto de Mar del Plata a cuatro mercados", pasó de `h2` a
`h1`. `ListaDeMercados` cambió de espacio de nombres y nada más. `/nosotros` bajó
de cuatro bloques a tres.

> **La página no está en el header.** Se llega por la tarjeta de la home y por el
> sitemap, y nada más. Sumarla a `SECCIONES` es una línea, pero deja la
> navegación en cuatro entradas; **es una decisión pendiente de Franco**, no un
> olvido.

### Las fotos de las tarjetas

Cuatro fotos para cinco tarjetas: `productos` comparte archivo con la unidad de
pescados, a propósito —las dos llevan al mismo lugar y la foto repetida es la
pista de que es el mismo destino—, y no se ven juntas porque viven en páginas
distintas. `nosotros.jpg` y `mercados.jpg` entraron con este bloque.

**Toda foto que entre a una tarjeta tiene que pasar la cuenta del velo**, que
está escrita en `TarjetaConFoto`: negro al 50 % sobre el píxel más claro de la
foto, y el nombre en crema tiene que quedar por encima de 3:1. Las dos nuevas dan
3,39:1 y 3,40:1. **Si el nombre alguna vez achica, el velo vuelve a 58 %.**

Se descartaron tres candidatas por llevar marcas legibles —navieras en el casco o
en los contenedores, rótulos de terminal—, que es lo que `FUENTES.md` viene
diciendo que ninguna foto del sitio tiene.

## `/nosotros`, rehecha

Fue tres bloques de prosa y ahora se apoya en datos y en fotos. Lo que había era
un manifiesto de tres párrafos —rol, misión y responsable, 546 caracteres
seguidos—, el elefante con otro párrafo largo y tres valores con bajadas de dos
renglones. Todo cierto y todo texto: la página se leía como un documento y no
como una presentación. **El texto bajó de unos 1280 caracteres a unos 900 sin
perder un solo dato**; lo que se fue es la envoltura.

Son cuatro tramos y ninguno se lee igual que el anterior, que es lo único que se
conservó del planteo viejo.

**1. La apertura es un hero con foto**, como el de la home: la misma foto que la
tarjeta NOSOTROS —esa tarjeta es la puerta a esta página— con el mismo velo negro
al 58 %, y el titular y una línea centrados en crema encima. **No copia el
titular en mayúsculas y a 800**, que sigue siendo del hero de la home y de ningún
otro, ni el sangrado bajo el header: ahí la barra va sobre el video porque
`usePathname` la pone en tinta sólo en la home.

El 58 % está calculado contra blanco puro, así que **vale para cualquier foto**
—no hay que medirle el píxel más claro a ésta ni a la que la reemplace—. El velo
de la sección de contacto sí está medido contra su foto, porque ahí es bordó y no
negro.

**Los cuatro datos duros** quedaron en una banda propia debajo, y no dentro del
hero: sobre el velo el rótulo no puede ir en gris —`ink-inverse-muted` sobre el
peor cuadro da 3,09:1, por debajo del 4,5 que pide el texto chico— y sin ese gris
el rótulo y el valor se leen como una sola línea. Van —origen, estructura legal, red y plazo de respuesta, en
`src/content/credenciales.ts`—. Esos cuatro reemplazan a los tres párrafos:
decían exactamente eso envuelto en frases. Un dato con su rótulo se lee de un
vistazo y el que busca uno solo lo encuentra sin barrer un párrafo.

**2. La ciudad** es una tarjeta con el texto a la izquierda y la foto ocupando
entera la mitad derecha, de borde a borde y de arriba abajo, que **pasa tres
fotos de Mar del Plata sola**. Antes fueron tres fotos en fila de 355 px y se
veían como material de relleno.

**3. El elefante** se queda —es el eje de la marca— con el párrafo a la mitad.

**4. Los valores** pasan de lista apilada a tres columnas. `ValorDeMarca` dejó de
poner el término al costado en una columna de 10rem: en tres columnas, eso dejaba
la bajada en una tira de cuatro palabras de ancho.

### La tarjeta que pasa sola

- **La tarjeta mide el alto de su sección.** Esa `Section` va con
  `relleno="sin"`, que es un prop que existe por este caso: con el
  `py-seccion` puesto, la tarjeta flotaba en una franja de crema elevado que no
  hacía nada y el bloque medía el alto de la tarjeta más dos veces el aire.
  Ahora la sección y la tarjeta miden lo mismo —comprobado, 608 px a 1280—. **Va como prop y no como clase**: `clases()` es un join, así que un
  `py-0` desde afuera pelearía con `py-seccion` por orden en la hoja.
- **La sección va sin `Container`** (`contenedor={false}`, el otro prop nuevo):
  el tope de ancho del sitio vale para el texto, que es lo que se lee, y acá
  recortaría la foto. Entonces **cada mitad se alinea sola**: la foto llega al
  borde derecho porque su columna termina donde termina la pantalla, y el texto
  se pone en su sitio con el sangrado izquierdo de la grilla (`SANGRADO`), que
  repite la cuenta del contenedor —su relleno, y la mitad de lo que sobra del
  tope más el relleno cuando la pantalla lo pasa—.

  > **Dos trampas que costaron dos intentos.** La primera fue sacar la foto del
  > contenedor con `me-[calc(50%-50vw)]`: el porcentaje de un margen en una celda
  > de grilla se mide contra **la celda** y no contra el contenedor, así que del
  > lado ancho se pasaba 227 px. Por eso el sangrado va en la grilla, cuyo bloque
  > contenedor sí es la sección entera. La segunda fue dejarle `w-full` a la
  > celda de la foto: con el ancho fijo en el 100 % de su columna ningún margen
  > negativo la ensancha —sólo corre lo que viene después— y la foto quedaba
  > corta del lado derecho.
  >
  > El sangrado va en **porcentaje y no en `vw`** por la barra de
  > desplazamiento: `100vw` la incluye y el ancho del contenedor no, así que con
  > `vw` el texto de la tarjeta queda unos píxeles corrido del resto.

  Verificado en ocho anchos, de 320 a 1440: el texto arranca exactamente donde
  arranca el `h1` de la sección de arriba, la foto termina exactamente en el
  borde y no hay desborde horizontal en ninguno.
- **El alto lo pone la tarjeta, no el texto** (`ALTO`, **38rem** desde `md`). Con
  dos renglones a la izquierda, la fila mediría lo que mide el texto y la foto
  quedaría en una tira. Ese número es lo único que hay que tocar para que el
  bloque crezca o se achique: la sección mide lo que mide la tarjeta. **En el
  teléfono no lo usa**: ahí manda el 4:3 de la foto, porque un alto fijo en una
  pantalla angosta recorta el encuadre en vez de agrandarlo.
- **La tarjeta no tiene fondo propio.** Fue un `Panel` en crema base y eso la
  recortaba contra la sección; ahora deja ver el crema elevado, que es el tono más
  claro de la paleta, y lo único que la dibuja es la foto. Sacar el `Panel` no
  toca ningún color —crema y crema elevado resuelven el mismo `--fondo-texto`— y
  lo único que se pierde es el `data-fondo` propio, que ahí adentro no lo
  necesitaba nadie.
- **Son cuatro fotos, y abre la costa.** El orden va de lo general a lo
  específico —la costa con la ciudad, la flota amarrada, las lanchas del puerto,
  el buque saliendo—: la primera es la que se ve sin interactuar, así que ubica
  antes de mostrar el oficio.
- **Las cuatro fotos están montadas siempre y lo que cambia es la opacidad.** No se
  desmonta ni se cambia el `src`: así no hay salto de layout, no hay un cuadro en
  blanco mientras baja la siguiente y el cruce es un fundido y no un corte. El
  precio son tres imágenes en la primera carga.
- **Se puede parar, y hace falta que se pueda.** Una pieza que se mueve sola,
  dura más de cinco segundos y convive con texto necesita un modo de frenarla: es
  el criterio **2.2.2 de WCAG**. Hubo un botón de pausa y **se sacó por pedido**,
  así que el freno quedó repartido en gestos que no dibujan nada: al apuntar con
  el mouse, al entrar el foco por teclado y —el que cubre el criterio— **al elegir
  una foto en el indicador**, que además lo deja frenado para siempre. Quien tocó
  el indicador dijo cuál quiere mirar; seguir pasando sería desobedecerlo. A ese
  gesto se llega con mouse y con teclado, que es lo que lo hace valer.
- **Con `prefers-reduced-motion` no arranca.** Misma regla que el video del hero:
  lo que decide la preferencia es el comportamiento y no el estilo, así que no se
  resuelve desde CSS. El estado arranca en "quietud" para que el servidor y el
  primer pintado coincidan; si arrancara en falso, quien pidió quietud vería el
  pase empezar por un cuadro.
- **El bloque de texto lleva los tres gestos del sitio y antes no llevaba
  ninguno**: una hairline corta que lo ancla —sin ella el texto flota en el
  medio de una columna de 608 px y no se lee como el arranque de nada—, el
  titular con una o dos palabras en Fraunces por `Destacado`, y un tope de
  medida en el párrafo. Ese tope hace falta: la columna llega a 527 px en
  pantalla ancha y un párrafo de ese largo al lado de una foto se lee como un
  bloque de documento.
- **El indicador son tres tramos al pie de la foto que se reparten el ancho
  entero**, sin fondo detrás, y lo que los distingue es la opacidad: 30 % los
  otros dos, 90 % el vigente. Estuvo con fondo sólido en tinta y se sacó por
  pedido.

  > **La opacidad es la única señal visual y sobre una foto cualquiera eso es
  > frágil**: contra el cielo blanco de una de las tres, los tramos en crema se
  > parecen bastante. Por eso cada tramo lleva `aria-current`, que dice cuál está
  > activo sin depender de que se vea. Si alguna vez tiene que verse siempre, lo
  > que hay que traer de vuelta es el fondo propio.

- **El botón es más alto que la barra que se ve.** La barra mide 4 px y un control
  de 4 px no se puede tocar con el dedo: el relleno vertical lo lleva a 24 px, que
  es el mínimo de área de toque, y la barra va adentro como un `span`.
- **Sólo la foto visible se anuncia**; las otras dos van `aria-hidden` y con
  `alt` vacío. Un lector que leyera las tres descripciones diría que hay tres
  imágenes donde se ve una.

Verificado en el navegador: pasa solo, se frena al apuntar, los tramos saltan de
foto y elegir uno lo deja quieto, con quietud pedida no se mueve, los tres tramos
suman el ancho de la foto y cada control mide 24 px de alto.

## Formulario de contacto

Server Action, no endpoint público. **Un solo esquema de Zod** en
`src/lib/contacto-esquema.ts`, que usan cliente y servidor: los mensajes de
error no son textos sino **claves de i18n**, así el esquema no necesita saber el
idioma y el error que calcula el cliente es literalmente el mismo dato que
devuelve el servidor.

La home tiene que seguir siendo estática, así que la consulta preseleccionada se
lee con `useSearchParams` del lado del cliente, detrás de un límite de
`Suspense`. Si la leyera la página por `searchParams`, `/es` y `/en` dejarían
de prerenderizarse.

El selector ofrece tres opciones y las tres viajan por la query:
`TIPOS_DE_CONSULTA` es `compra`, `venta` y `otro`, y es lo que acepta
`enlaceDeConsulta`. `otro` no se podía enlazar mientras nada lo necesitaba; lo
enlaza la mención de carnes y otras categorías al pie de `/productos`.

### Cómo está armado

Son **cuatro campos y ningún tramo**: tipo de consulta, nombre, correo y
mensaje. Fueron siete hasta acá —empresa, teléfono y país incluidos— repartidos
en dos tramos numerados con `GrupoDeCampos`. Empresa y teléfono eran opcionales
y no hacían falta para contestar; el país lo dice el mensaje o la firma del
correo. Con cuatro campos, dos encabezados numerados encima son más estructura
que contenido, así que se fueron los tramos y con ellos `GrupoDeCampos`,
`SelectorDePais`, `src/content/paises.ts` y `src/lib/paises.ts`. La lista ISO de
países ya no se arma en el servidor ni baja por props: **el formulario no recibe
ninguna**.

El orden es **tipo, nombre, correo, mensaje**. El tipo va primero porque es la
única pregunta que se contesta sin escribir, porque el hero ya la contestó con
`?consulta=` y porque la preselección tiene que verse apenas se llega; es también
el primer control, o sea a donde vuelve el foco al escribir otra consulta.

**El mensaje va último, y estuvo al revés.** El argumento para ponerlo arriba era
que quien entra apurado dice lo que necesita antes de dar su nombre. El que ganó
es el de Franco: los tres campos cortos se contestan casi sin pensar y el
mensaje es el único que pide redactar, así que dejarlo al final hace que el
formulario arranque fácil y que el campo grande quede pegado al botón. También
ordena el dibujo: el bloque alto queda abajo en vez de partir la pieza al medio.

Cambiarlo es mover el `<Campo>` de mensaje en `FormularioDeContacto` y nada más:
el orden de `CAMPOS_DE_CONTACTO` arma el esquema de Zod pero no decide nada de
lo que se ve, y el orden de tabulación lo da el DOM —está verificado que sigue al
visual—.

### El campo, que costó tres versiones

**La primera** fue una caja con borde pleno en `ink-muted` y fondo `surface`
sobre el crema elevado del panel. Cumplía —5,2:1 de borde— pero cuatro
rectángulos apilados se leen como formulario de trámite, y encima el campo
quedaba **más oscuro que el panel**, así que lo más pesado de la pieza era la
parte vacía.

**La segunda** sacó la caja entera y dejó sólo una regla de 2 px abajo, del
mismo grosor y color que las hairlines del resto del sitio. Quedó liviana pero
sin cuerpo: un campo vacío no se veía hasta apuntarlo, y un formulario es
justamente la parte de la página donde hay que ver dónde escribir antes de
escribir.

**La tercera, que es la que está**, vuelve a la caja y arregla las dos cosas que
estaban mal en la primera:

- **El campo es el tono más claro de la paleta y el panel el de abajo.** Es la
  inversión exacta: la caja se levanta del panel en vez de hundirse. Por eso
  `Contacto` declara el panel en `crema` y no en `crema-elevado` —si se vuelve a
  tocar ese fondo, hay que mirar éste—.
- **El borde es neutro y suave, no un rectángulo de color.**
  `--fondo-separador` es tinta al 50 % y da 3,45:1: el 3:1 que pide el límite de
  un control y ni un punto más. El token existe para esto.
- **El relleno es generoso**, 16 × 14 px, y es la mitad de la sensación de
  holgura.
- **Al apuntar el borde pasa a tinta y al enfocar, a azul**, sin que nada se
  mueva. El anillo de foco del sitio ya dibuja el resto, a 3 px del borde.

- **El error suma un anillo en vez de engrosar el borde**, que es lo único que la
  primera versión tenía bien: un borde más grueso correría el campo un píxel
  justo cuando alguien lo está mirando.
- **El rótulo es el rótulo del sitio**: `text-eyebrow uppercase texto-suave`, el
  mismo de los encabezados del pie y de los extremos de alcance. Era `text-sm
  font-semibold`, que no existía en ninguna otra parte.
- **La punta del `<select>` la dibuja el sitio.** La flecha nativa viene con el
  gris del sistema operativo, que no es de ninguna de las dos paletas y cambia
  entre Windows, macOS y Android. `appearance-none` la apaga y va la misma punta
  del selector de idioma, que hereda el color del texto y no recibe puntero.
- **La línea que separaba el botón se fue.** Con los campos ya dibujados, un
  separador a ancho completo encima del envío era una raya de más. Lo que separa
  ahora es aire.

El tipo va como **`<select>`**: es el campo que se contesta eligiendo y no
escribiendo. Llegó a ser una grilla de tres cajas con el radio escondido y la
elegida invertida en `data-fondo="tinta"`; el desplegable la reemplazó, y con
ella se fue la regla `.anillo-del-hijo` de `globals.css`. Sin elegir, el texto va
en el gris de lo secundario para que el campo se lea vacío como el de al lado.

Nombre y correo son los dos campos cortos y **comparten fila desde `sm`**: uno
abajo del otro dejaban una columna de cuatro controles sueltos en un panel que a
partir de ahí es ancho. Los cuatro son obligatorios, así que la
clave `opcional` salió de los catálogos; el prop de `Campo` que la consumía
sigue existiendo y es lo que marca `required` en el DOM.

La aclaración de un campo (`nota` en `Campo`) va **debajo del control**, no
entre la etiqueta y el campo: ahí empujaba el control hacia abajo y se leía como
un párrafo de la página. En `aria-describedby` el error va primero, que es lo
accionable.

El encuadre de la izquierda se acortó cuando entraron los canales: el titular
pasó de "Contanos qué necesitás y de qué lado estás" a **"Contanos qué
necesitás"** y la bajada, de enumerar las dos puntas a nombrar los tres caminos.
La promesa de 24 a 48 horas salió de la bajada porque ya está debajo del botón,
en `respuesta`, y decirla dos veces en la misma pantalla no la hace más cierta.

El envío es el botón `grande`, de ancho completo mientras la pantalla es
angosta, separado por una línea y acompañado de una sola línea gris que dice por
dónde llega la respuesta. Es la única acción real de la página y con el tamaño
normal quedaba flojo abajo de un panel ancho.

`Campo` marca `required` en el DOM a partir de la ausencia de `opcional`: un
solo dato decide el rótulo visible y lo que anuncia el lector de pantalla, y no
pueden contradecirse. El formulario sigue con `noValidate`, así que el atributo
no dispara ninguna validación del navegador.

### Defensas y de qué depende cada una

- Validación en servidor sobre la `FormData` cruda, sin confiar en nada.
- Topes de longitud en el esquema, no sólo en el `maxlength` del input.
- Sin CRLF ni controles en los campos de una línea, limpiado dos veces: al
  validar y otra vez en `contacto-mail.ts`, que es el borde por donde el dato
  sale del sistema. Un nombre con un salto de línea no puede abrir una cabecera
  nueva en el mail.
- Escapado HTML de todo lo que entra en la plantilla del mail.
- Cupo de 5 envíos cada 10 minutos por IP. **Es por instancia del proceso**: si
  esto se escala horizontalmente deja de servir y hay que mover el contador a un
  almacén compartido.
- La IP sale de `x-forwarded-for` leyendo **desde la derecha**, que es la
  entrada que escribe el proxy; la primera la controla el cliente. **Supone
  exactamente un proxy de confianza adelante** (`CONTACTO_PROXIES_DE_CONFIANZA`
  lo ajusta). Si la app queda expuesta directo a internet, el límite se burla
  cambiando una cabecera.
- Campo señuelo y tiempo mínimo entre pintado y envío. El límite de envíos se
  evalúa **antes** que la trampa, para que un robot que la pisa no pueda
  insistir para siempre.
- Credenciales sólo por entorno, leídas dentro de la función y no en el módulo,
  para que no queden congeladas en el build. Sin valores por defecto.
- Al visitante se le devuelve un error genérico; el detalle va al log.

**Sin `RESEND_API_KEY` la acción no falla**: arma y sanitiza el mail igual que en
producción, lo escribe al log marcado como envío simulado y devuelve
confirmación. Así se prueba el flujo entero sin cuenta.

## Productos

La palabra visible es **"productos"** (en inglés, *products*): "rubro" no se
usa. "Unidad de negocio" sí vuelve a usarse, pero **sólo en el código y en la
copia de la página**, no como nombre de ruta: el dominio se nombra `productos` en
i18n y `RUTA_DE_PRODUCTOS` en `src/content/secciones.ts`, y las **tres** unidades
son `UNIDADES` en `src/content/unidades.ts`. Hoy no hay rutas por unidad: cada
una es un ancla dentro de `/productos`.

**Pollo es unidad desde el 23/09, y antes era parte de carnes.** El despiece del
ave ya existía pero colgado del bloque de carnes, al lado de la media res:
apuntaba a que el pollo fuera un subproducto de la vacuna, y no lo es —otro
frigorífico, otra habilitación, otro comprador—. Ahora son tres tarjetas en el
índice y **tres anclas**, y **eso cierra la tensión que el hero tenía anotada**:
ahí se muestran tres rubros desde que salió la copa de vino, y el sitio tenía dos
unidades.

**Los dos despieces volvieron a compartir bloque**, por pedido: la res y el ave
van lado a lado desde `lg` y apiladas abajo, bajo un titular común, **CARNES Y
POLLO** (`productos.despieces.titulo`), con una bajada debajo
(`.entrada`). Eso **no vuelve a subordinar el pollo**, que es lo que había
motivado separarlos: el titular nombra las dos unidades y de él cuelgan los dos
nombres, cada uno en un `h3` invisible junto a su dibujo. Antes el único
encabezado era el `h2` de carnes y el ave colgaba de ahí. Cada uno conserva
además su propia ancla, así que para la navegación siguen siendo dos destinos.

> **Este bloque lleva titular a la vista y el de pescados no**, y la asimetría es
> a propósito. Allá el titular sería el nombre de la unidad y debajo hay un
> catálogo que se explica solo; acá hay dos dibujos, y un dibujo sin una línea
> que diga qué es se lee como ilustración. La bajada además dice **lo que el
> dibujo no puede decir**: que la especificación se define por operación, que es
> la razón de que no haya ficha por corte.

> **El ancla dejó de ponerla `Section`.** El prop `ancla` admite una y la sección
> tiene dos destinos de salto, así que los ids viven en las dos celdas, cada una
> con `scroll-mt-ancla`, que es exactamente lo que la sección les daba.

> **Las dos celdas no se reparten igual, y es a propósito.** La res lleva su
> medida en `basis` —35rem— y el ave **se queda con todo lo que sobra**,
> centrando el dibujo adentro con su tope de 17,5rem. Así la res queda pegada al
> borde izquierdo del contenido y el ave, centrada en el lado derecho, sin que
> nadie tenga que calcular cuánto vale ese lado. El reparto no se rompe a ningún
> ancho donde la fila sea fila: desde `lg` el contenido mide 960 px o más y las
> dos medidas más el aire suman 880, así que la res nunca llega a achicarse.
>
> Medido a 1280: la res va de **91 a 651**, que es exactamente donde arranca la
> primera ficha del catálogo de especies y donde arranca el titular del bloque;
> la celda del ave va de 691 a 1179 y el dibujo, de **795 a 1075, con 104 px de
> aire a cada lado**. Estuvo centrada la fila entera y así la res arrancaba
> 104 px adentro del borde, sangrada respecto del resto de la página. Desde 900
> para abajo se apilan y cada uno vuelve a su tope; a 375 la res mide 335 y el
> ave 280, centrada. Sin desborde horizontal en ninguno de los anchos probados.

> **El ave volvió a la mitad de la res.** Ésa fue su proporción mientras
> compartieron bloque la primera vez —26 % contra 52 % del contenido—; creció a
> 26rem cuando tuvo sección propia, porque sin la res al lado la restricción se
> caía y más ancho sólo mejoraba la puntería, y volvió a 17,5rem al volver a ser
> vecinas. A 1280 son **280 px**, y su región más chica, el muslo, queda en
> **48 × 43 px**. La res sigue con el osobuco en 15 px de ancho, que es de antes.
>
> **Ese 48 × 43 es el número a mirar antes de achicarla más**: el área de toque
> mínima es 24 px, así que el ave ya se comió la mitad del margen que tenía.

### El dibujo del ave, que es el segundo

**La lámina de despiece de pollo que había se descartó por pedido**: al tamaño
que mide el ave en la página no se leía como un ave. Antes de llegar acá se
probaron dos caminos más y los dos enseñan lo mismo que enseñó la vaca: **buscar
un vector mejor** —no hay ninguno con cortes argentinos— y **dibujarla a mano**
con las proporciones medidas de una lámina de referencia, que se abandonó
después de cuatro pasadas por el mismo motivo que la vaca dibujada a mano, que
es la anatomía.

Lo que está hoy es **una silueta maciza de pollo faenado visto desde arriba**,
que aportó Franco, vectorizada. Origen y licencia, en `src/imagenes/FUENTES.md`.

**Que sea una silueta y no una lámina parte el trabajo en dos, y sólo la primera
mitad sale de la imagen.** De la imagen sale **el dibujo entero**: el contorno de
afuera —umbral a 128, el componente conexo más grande, contorno por vecindad de
Moore y Douglas-Peucker a 1,2— y las **tres ranuras blancas** de adentro: el
pliegue del ala, la curva del cuello y la quilla que baja por el medio del
cuerpo. Las ranuras salen aparte, como agujeros: el fondo que **no** se alcanza
inundando desde el borde es interior. Son 166 puntos de contorno más tres
ranuras de 23, 21 y 14, en un lienzo de **1000 × 916**, más ancho que alto; la
lámina vieja era 1792 × 1381. Adentro no hay ninguna división que extraer, así
que **las seis se escriben a mano** como polilíneas, se queman sobre un ráster a
triple resolución, y de ahí es lo mismo que en la res: etiquetar, descartar
semillas por debajo de 2000 px, recrecer contra la máscara sin partir y trazar.
Cero píxeles sin dueño.

> **No se cierra nada, y ésa fue la corrección.** El primer intento pasaba un
> **cierre morfológico de radio 16** para que el contorno de afuera no se metiera
> por las ranuras, y de paso **redondeó todas las esquinas cóncavas**: las alas
> dejaron de ser aletas en punta, las muescas entre ala y cuerpo se rellenaron y
> las tres ranuras desaparecieron. Parecía bien hasta que se midió. Con
> `verificar-ave.mjs` —que es a la silueta lo que `verificar.mjs` a la res—
> aquello dibujaba un **2,51 % de más** y esto, **0,19 %**, con 0,46 % sin
> dibujar: el mapa de diferencias es una línea de un píxel en todo el perímetro y
> ningún manchón. **Eyeballear no alcanzó**: las dos siluetas se parecían.

**Las ranuras son dibujo y no división**, así que no son regiones: no se apuntan,
no se tabulan y no tienen nombre. Van en `DETALLES_DEL_DIBUJO` y el componente
las pinta **al final, en el color del fondo**, de modo que sobreviven al resalte
—al apuntar un corte su región pasa a bordó y la ranura se sigue viendo—. No van
como agujeros de su región porque habría que emitir subtrazados con `evenodd` y,
sobre todo, porque **la quilla cruza el límite entre pechuga y rabadilla**: no
pertenece a ninguna de las dos. `Despiece` las recibe en `detalles`, que es
opcional; la res no manda ninguna.

**Acá se curva todo y en la res casi nada.** La res emite polilínea salvo en
cinco óvalos, porque sus divisiones son rectas y curvarlas las deja onduladas;
el ave no tiene una sola recta y su contorno sale de una grilla, así que las
ocho regiones pasan por Chaikin de dos vueltas sobre el anillo entero. Eso se
puede hacer porque las regiones se recrecen contra una máscara común: las dos
caras de una división son la misma arista y Chaikin las mueve igual.

**Cuatro de las seis divisiones apoyan sus dos extremos en una muesca de la
silueta**, o sea en un vértice cóncavo, que es donde el dibujo ya pide un
límite. Las otras dos son decisión y una costó una pasada: **la rodilla va
baja**, a la altura donde la cadera termina de angostarse, porque más arriba el
contramuslo salía como una medialuna fina y el muslo se llevaba media pata.

> **La vista se lleva cuatro cortes.** Un ave entera desde arriba no muestra
> **cabeza, cuello, espinazo ni pecho**: viene sin cabeza ni cuello, el espinazo
> queda del otro lado y el pecho, debajo de la pechuga. De los nueve quedan
> cinco en ocho regiones —pechuga, ala, contramuslo, muslo y rabadilla, con las
> tres del medio de los dos lados—. Los cuatro que salen **no dejan de
> comercializarse**: pasaron a `OTROS_DE_POLLO` y sus nombres siguen en los dos
> catálogos. `OTROS_DE_POLLO` ya estaba sin consumidor —lo que lo mostraba era
> la línea de menudencias, que se sacó por pedido—, así que hoy esos ocho
> productos no aparecen en ninguna parte del sitio.

> **El tinte de profundidad no llegó.** Se había pedido para el dibujo a mano,
> donde las alas iban plegadas bajo el cuerpo y la cola por debajo de las patas.
> En una vista cenital nada queda detrás de nada, así que no tiene a qué
> referirse; además el componente pinta la silueta maciza debajo de todo, de
> modo que un `fill-opacity` no clarearía sobre el crema sino sobre la tinta.

> **En inglés la unidad se llama "Chicken" y no "Poultry"**, que es el término de
> comercio. Es el pedido de Franco de que "poultry" y "beef" no aparezcan; por lo
> mismo los tres iconos del hero pasaron a decir Seafood, Meat y Chicken, que
> ahora es exactamente lo que dicen las tres tarjetas. Siguen diciendo "beef" la
> etiqueta del diagrama de la res —*beef side* es el término para media res— y el
> nombre del corte *roast beef*.

**Los catálogos de i18n siguieron a la estructura**: todo lo que estaba bajo
`productos.*` pasó a `productos.pescados.*`, y `productos.*` quedó para el
índice, con `productos.unidades.<id>` para las dos tarjetas y
`productos.carnes.*` para la hoja nueva.

**El nivel intermedio fue y volvió.** Hasta la Fase 10 existió como
`/unidades-de-negocio` con dos hojas; la Fase 11 lo colapsó porque con carnes
fuera del menú quedaba un índice de una sola tarjeta, que no es un índice, y la
hoja de pescados subió a ser `/productos`. La Fase 12 lo rearmó bajo el nombre
nuevo, con carnes de vuelta como unidad: `/productos` es el índice de dos
tarjetas, `/productos/pescados` es el catálogo y `/productos/carnes` la unidad
secundaria.

Lo que se borró en la 11 se reescribió, no se recuperó —el repo no tenía
historial—, y con nombres más cortos: `UNIDADES` y `RUTA_DE_UNIDAD` en
`src/content/unidades.ts`, `FOTO_DE_UNIDAD` en
`src/components/productos/fotos-de-unidad.ts`, y `TarjetaDeUnidad` e
`IndiceDeUnidades` como componentes. No volvió `VolverAUnidades`: la navegación
de vuelta la hace el header, que marca `Productos` como ruta activa en las tres
páginas.

**La tarjeta es la foto, el velo y el nombre, y nada más**: el índice tiene dos
entradas y lo único que hay que decidir es cuál. El nombre va en **mayúsculas**,
como el titular del hero, que es el único otro lugar del sitio donde una
mayúscula ocupa ese cuerpo. **El salto de "Pescados y mariscos" vive en el
catálogo**, no en el componente: dónde corta un nombre es parte del nombre y no
algo que se adivine del ancho, así que va como salto de línea en el JSON y lo
respeta `whitespace-pre-line`. El inglés no lleva salto porque "Seafood" es una
palabra. La tarjeta entera es el enlace,
no un botón adentro —el destino es uno solo y el área de toque de un teléfono es
la tarjeta—, y el `alt` de la foto va vacío porque el nombre que va encima es su
descripción.

**El velo es negro al 50 % y el número no es de gusto.** El peor píxel de las dos
fotos es casi blanco puro —la de carnes llega a (255, 255, 253)—, así que la
cuenta se hace contra blanco igual que en el hero. Al 50 % el compuesto queda en
L = 0,2140 y el nombre en crema, en **3,39:1**: es lo que pide el texto grande, y
el nombre va en 30 px semibold, bien por encima de los 18,66 px que marcan ese
umbral. El hero necesita 58 % porque su texto es chico y el piso ahí es 4,5:1;
acá subir a 58 % sería embarrar la foto por un contraste que el tamaño del nombre
no exige. **Si el nombre achica, el velo vuelve a 58 %.**

**El índice no lleva llamada a contacto.** Es un paso de dos opciones y su único
trabajo es dejar elegir; el CTA vive en cada unidad, que es donde quien llegó ya
sabe de qué quiere hablar.

**El CTA del carrusel de la home apunta a `/productos/pescados`, no al índice.**
Ese bloque acaba de mostrar especies y prometer "el catálogo completo" para caer
en dos tarjetas es una promesa rota. Al índice se llega por el nombre de la
sección y por la navegación.

De las once, hay régimen y ventana de **cuatro**: merluza por cuota anual y
disponible todo el año; corvina, calamar y langostino por zafra. El sitio publica
**el régimen** —que es lo estable— más una ventana orientativa, marcada como
sujeta a las vedas y resoluciones vigentes. **No se publican fechas exactas,
números de resolución ni toneladas de cuota.**

De las siete restantes **no hay régimen ni ventana**, así que su ficha se queda
sin esa línea antes que inventarla: `REGIMEN_DE_ESPECIE` es
`Partial<Record<Especie, Regimen>>` a propósito. Nueve de las once llevan
**formatos** —presentaciones de comercialización: HG, HGT, filet, entero, colas,
vaina, medallones—, que es el dato que vino por especie. **Raya y mero no traen
formatos** y por eso tampoco llevan ese bloque: los dos bloques del pie de la
ficha aparecen sólo si hay dato, y el mero llegó suelto, sin lista de
presentaciones detrás.

### La ficha de especie no creció, y el bloque de condiciones sí

Formatos, talla, calibre, rendimiento, packing, Incoterms y cumplimiento **sí
son dato real** desde la Fase 11, pero el cliente los dio como **menú general**
—lo que puede llevar una operación— y no especie por especie. Repartirlos por
especie sería inventar qué formato corresponde a cuál, así que van en un bloque
propio al pie de `/productos` (`CondicionesDeOperacion`, tres columnas:
formatos, condiciones comerciales, cumplimiento) y la ficha se queda donde
estaba: nombre, nombre científico, descripción, régimen y ventana.

Ese mismo bloque cierra con la **mención de carnes** y de las otras categorías,
más el enlace a `?consulta=otro`. Es todo lo que queda de carnes en el sitio y
es una decisión, no una omisión.

### Catálogo de especies

**Formato compacto, en grilla densa.** Once fichas de dos a cuatro columnas, cada
una con recorte, nombre, nombre científico y las dos líneas de dato que deciden
una compra: cuándo hay y en qué formato sale. Fue dos columnas de fichas grandes
—con descripción y dos bloques rotulados al pie— mientras las especies eran
cuatro; a once, esa página se leía como un informe y no como un catálogo.

Las dos líneas van **sin rótulo propio**: "Zafra de abril a septiembre" y "HG,
HGT y filet" se explican solas, y un título encima de cada una era la mitad del
alto de la ficha.

> **Lo que quedó sin usar al compactar**, y hay que decidir si se borra: las
> descripciones de las once especies (`especies.<id>.descripcion`, en los dos
> catálogos), `disponibilidadTitulo` y `formatosTitulo`, el componente
> `EtiquetaDeTemporada`, y con él `REGIMENES` y `REGIMEN_DE_ESPECIE` en
> `src/content/especies.ts` más las claves `regimenes.cuota` y `regimenes.zafra`.
> No se borró nada todavía: son copia del cliente y dato de dominio, y el repo no
> tiene historial del que recuperarlos. **La píldora de zafra salió porque su dato
> ya está en la línea de disponibilidad**, que para esas especies empieza
> justamente por "Zafra".


La lista de especies de `/productos` **es** el catálogo: tiene el hueco de imagen
y nada más. No hay un bloque nuevo al lado, porque el contenido de una ficha
—nombre, nombre científico, régimen, ventana— es exactamente el que ya estaba
publicado y repetirlo en la misma página sería decir dos veces lo mismo.

La home lleva un adelanto (`ResumenDeProductos`), y desde la Fase 11 **ese
adelanto es la sección `productos` de la home**: hasta entonces eran dos bloques
—la vidriera de unidades de negocio y el carrusel de especies— que apuntaban al
mismo lugar.

**Va sin rótulo ni bajada**: titular, carrusel y salida al catálogo, nada más.
El de cómo trabajamos sigue con los tres. La asimetría es a propósito: acá el
rótulo decía exactamente lo mismo que dice ahora el titular, y la bajada
enumeraba cuatro especies que están justo debajo, con foto. El titular va en
mayúsculas, como el de las tarjetas de unidad. Lleva el carrusel de especies y
una sola salida al catálogo, y abre el ancla `#productos`.

**Dejó de ir pegado al hero** cuando las tres tarjetas se pusieron en el medio:
es el segundo bloque y va en crema base, porque el elevado se lo lleva el índice.

### El CTA de carnes en la home

`ResumenDeCarnes` es **titular, una línea y una salida a los despieces**, y nada
más. No es un adelanto de catálogo, y ahí está el cambio.

**Llevaba un carrusel de cortes con foto y se sacó por pedido.** Tenía la misma
forma que el de pescados —titular, carrusel, salida— y ése era el problema: dos
pistas de fotos al hilo prometían dos catálogos del mismo peso, que es justo lo
que la unidad de carnes se ocupa de desmentir. Carnes no tiene catálogo
publicado y no lo va a tener mientras la especificación se arme contra el pedido;
lo que sí tiene es el despiece, que es dato real y está dibujado. El bloque dejó
de mostrar producto y pasó a invitar a ir a verlo.

**Ahora es texto de un lado y las dos fotos del otro.** Fueron sólo texto un
rato y así era el bloque más flaco de la home. Las fotos son **las mismas que
identifican a carnes y a pollo en el índice de `/productos`**, que es a donde el
botón lleva: llegar y reencontrarlas confirma que se llegó a donde se quería,
igual que la apertura de `/nosotros` repite la foto de su tarjeta. Van **sin velo
y sin nombre encima**, a diferencia de `TarjetaConFoto` —el titular de al lado ya
las nombra y sin texto encima el velo no tiene qué proteger—, y por eso tampoco
hay que medirles el píxel más claro.

**Van apiladas, sin aire entre las dos y tomando el alto entero de la columna.**
Desde `lg` la fila no centra sus celdas, así que la columna de fotos mide lo que
mide la de texto y las dos se reparten ese alto: medido a 1280, **672 × 173 cada
una** dentro de una columna de 346, que es exactamente el alto del texto. **El
alto del bloque lo sigue poniendo el texto**: las fotos lo llenan, no lo estiran.
Por debajo de `lg` no hay alto del que repartirse, así que cada una vuelve a su
3:2 y se apilan.

> **Las fotos van después del texto en el DOM y antes en pantalla**, por `order`.
> Leído en orden primero está de qué se habla; mirado, la vista entra por la
> imagen. No desordena la tabulación porque el único control del bloque es el
> botón.

**La línea es propia (`home.carnes.texto`) y reemplazó a una del cliente.** Acá
estuvo `productos.carnes.entrada` —"No es nuestro foco y no lo disimulamos…"—,
que explicaba bien por qué no hay catálogo pero **se leía como una disculpa**: en
un CTA, abrir por lo que no se hace suena a que no se sabe del tema. La que está
dice lo mismo por el lado del oficio —a pedido, con el frigorífico habilitado que
pide cada mercado— y remata apuntando al despiece. `productos.carnes.entrada`
volvió a quedar sin consumidor y no se borró.

**El botón apunta a `#carnes`**, que desde que la res y el ave comparten bloque
muestra los dos despieces. Sigue siendo el de borde y no el sólido: el sólido es
del CTA de contacto, que es la única acción real de la home.

**No abre ancla y no entra en `SECCIONES`.** La navegación lleva a `Productos`,
que es el índice de las tres unidades: sumar una entrada al header por un bloque
de la home sería contar dos veces la misma estructura. Por eso su `Section` va
sin `id`.

> **Lo que quedó huérfano al sacar el carrusel**, y hay que decidir si se borra:
> el componente `AdelantoDeCortes`, y con él **toda la cadena de fotos de corte**
> —`ImagenDeCorte`, `IMAGEN_DE_CORTE` y `CORTES_CON_RECORTE` en
> `imagenes-de-corte.ts`, y los cuatro PNG de `src/imagenes/cortes`—, más las
> claves `home.carnes.carrusel.*` de los dos catálogos. **Los cuatro PNG dejaron
> de servirse en todo el sitio**: la tarjeta del despiece ya no muestra foto
> —quedó sólo con el nombre— y ése era el otro consumidor. No se borró nada: son
> material del cliente y el repo no tiene historial. Volver atrás es devolverle
> el `<AdelantoDeCortes>` al bloque.

#### La pista, y el hueco, son de los dos

La mecánica del carrusel —scroll nativo con anclaje, arrastre con mouse, flechas
que aparecen sólo si no entran todos— vive en `Carrusel`, que consumen los dos
adelantos. El ancho del ítem (`PASO`) está ahí y no en cada bloque **porque es la
medida la que decide si hay carrusel**: a 288 px la pista pide 1212 contra los
1088 que da el contenido a 1280, así que cuatro no entran nunca. Cambiarla en un
solo bloque lo convertiría en una grilla.

El hueco 4:3 con la marca de agua al 7 % vive en `HuecoDeImagen`, y lo usan la
ficha de especie y los dos adelantos. **La tarjeta del diagrama lo usó y ya no**:
se quedó sólo con el nombre. `ImagenDeEspecie` e `ImagenDeCorte` son lo que queda
de propio de cada dominio: buscar el archivo en su mapa. `anchoDeMarcaGrande`
quedó **sin consumidor** al salir la tarjeta —era el que pedía una medida fija de
marca en una caja de medida fija— y no se borró.

#### El hueco de imagen, y qué se publica

Hay cuatro PNG en `src/imagenes/especies`, con el nombre de la especie en inglés
(`hake`, `croaker`, `squid`, `shrimp`) y la clave del mapa en castellano.
`imagenes-de-especie.ts` es el mapa de especie a import estático: el import
estático le da a `next/image` el ancho y el alto sin declararlos a mano, que es
lo que evita el salto de layout; una ruta suelta en `public` los perdería.

**El catálogo recorre `ESPECIES` y el adelanto de la home,
`ESPECIES_DEL_ADELANTO`.** El catálogo es la lista completa de lo que se
comercializa, y ahí una ficha sin recorte sigue diciendo nombre, científico y
formatos, que es información. El adelanto es una **selección editorial de seis**,
en `src/content/especies.ts`.

**Fue la lista de las que tienen recorte** —`ESPECIES_CON_RECORTE`, que ya no
existe— con el argumento de que una marca de agua entre fotos reales se lee como
imagen rota. Franco pidió dos especies más sabiendo eso, así que la lista pasó a
ser explícita y **pescadilla y besugo van con la marca de agua** hasta que
lleguen sus PNG. El hueco las deja del mismo alto que las otras, así que
enchufarlas después no mueve nada.

Faltan siete recortes —pescadilla, besugo, pez palo, mero, pollo de mar, raya y
rebozado—: dejar el PNG, importarlo y descomentar su línea en el mapa. El mapa
sigue siendo `Partial<Record<…>>`, así que sacar uno no rompe la página.

La `metaDescription` de `/productos`, su `entrada` y el texto de la sección
`productos` de la home se actualizaron al pasar a diez. **El `metaTitle` sigue
nombrando las cuatro de mayor volumen a propósito**: son los términos que se
buscan, y enumerar diez en un título lo vuelve ilegible. La `entrada` avisa que
las especies sin ventana publicada se consultan por operación, que es lo que
explica las fichas con el pie más corto.

Lo que hay que pedir para reemplazar uno está en `src/imagenes/FUENTES.md`: **PNG
con alfa, lienzo 4:3 apaisado, 1200 px de ancho como mínimo**, sujeto centrado y
sin sombra ni fondo horneados. **La proporción no es de gusto**: el hueco más
chico que produce el layout es la celda del adelanto a 320 px de viewport, que
mide 130 px de ancho, y adentro tiene que entrar el isotipo de la marca de agua
a su mínimo del manual —50 px de arte más su área de seguridad, 88 × 91 px de
huella—. A 2:1 esa celda da 65 px de alto y a 3:2, 87: en las dos la marca se
sale. A 4:3 da 101 y entra.

Cuando falta un recorte, el hueco lleva **el isotipo al 7 %** sobre el crema, que
es uno de los usos que el manual le da al isotipo suelto. Se probó dejarlo vacío
y es peor: cuatro nombres flotando bajo un vacío sin explicar se leen como
imágenes rotas. La marca va `aria-hidden` —es decorativa— y en dos medidas, una
hasta `lg` y otra de ahí en adelante, cada una en su envoltorio porque `hidden`
contra el `inline-flex` del logo es justo el conflicto que `clases()` no
resuelve. El `alt` del recorte va vacío: muestra la especie que el nombre de al
lado ya dice.

`BotonSaberMas` acepta una `seccion` o una `href`. Las secciones siguen pasando
por `EnlaceDeSeccion`, que es el único que sabe si son ancla o ruta; una página
que no es sección no tiene esa ambigüedad y va derecho. Hoy los tres bloques de
la home usan `seccion`: la `href` quedó sin consumidor cuando el adelanto del
catálogo pasó a ser la propia sección `productos`.

El hero pregunta de qué lado está quien entra y lleva la respuesta al formulario
en la query: `/es?consulta=compra#contacto` o `?consulta=venta`. El contrato vive
en `src/content/consulta.ts` (`TIPOS_DE_CONSULTA`, `PARAMETRO_CONSULTA`,
`esTipoDeConsulta`, `enlaceDeConsulta`). El formulario tiene que leerlo del lado
del cliente (`useSearchParams`): si lo leyera la página por `searchParams`,
`/es` y `/en` dejarían de prerenderizarse.
