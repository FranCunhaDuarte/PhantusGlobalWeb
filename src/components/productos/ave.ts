/**
 * El ave y sus cinco cortes.
 *
 * **El dibujo cambió de origen.** Hasta acá salía de la lámina de despiece de
 * pollo que aportó el cliente, que traía nueve cortes ya dibujados como piezas
 * separadas; esa lámina se descartó por pedido —el ave no se leía como un ave— y
 * en su lugar entró una **silueta maciza** de pollo faenado visto desde arriba,
 * que también aportó él. Origen y licencia, en `src/imagenes/FUENTES.md`.
 *
 * ## La silueta se vectoriza; las divisiones, no
 *
 * De la imagen sale **el dibujo entero y nada más que el dibujo**: el contorno
 * de afuera y las tres ranuras blancas de adentro —el pliegue del ala, la curva
 * del cuello y la quilla que baja por el medio del cuerpo—. Adentro no hay
 * ninguna línea que separe un corte de otro, así que **las seis divisiones están
 * escritas a mano**. Eso es lo único recreado acá.
 *
 * ### Cómo se vectoriza
 *
 * Umbral a 128 —el histograma parte limpio—, el componente conexo más grande,
 * contorno por vecindad de Moore y Douglas-Peucker a 1,2. Las ranuras salen
 * aparte: el fondo que **no** se alcanza inundando desde el borde es interior,
 * se etiqueta y se traza igual. Salen 166 puntos de contorno y tres ranuras de
 * 23, 21 y 14 puntos, en un lienzo de 1000 x 916.
 *
 * > **No se cierra nada, y ésa fue la corrección.** El primer intento pasaba un
 * > cierre morfológico de radio 16 para que el contorno de afuera no se metiera
 * > por las ranuras, y de paso **redondeó todas las esquinas cóncavas**: las alas
 * > dejaron de ser aletas en punta, las muescas entre ala y cuerpo se rellenaron
 * > y las tres ranuras desaparecieron. Medido contra la imagen píxel a píxel,
 * > aquello dibujaba un **2,51 % de más**; esto, **0,19 %**, y el mapa de
 * > diferencias es una línea de un píxel en todo el perímetro y ningún manchón.
 * > Con `verificar-ave.mjs` del scratchpad se vuelve a medir.
 *
 * ### Cómo se divide
 *
 * Igual que la lámina de la res: las seis polilíneas se queman sobre un ráster
 * de la silueta a triple resolución para partirlo, se etiquetan componentes
 * conexos, se descartan como semilla las islas por debajo de 2000 px —los
 * jirones que deja la quema en los vértices—, **cada región crece de vuelta**
 * contra la máscara sin partir hasta que no queda un píxel sin dueño, y se traza
 * cada contorno. Verificado: cero píxeles del cuerpo sin asignar.
 *
 * Recrecer importa por lo mismo que allá. El límite entre dos vecinas queda como
 * **arista compartida**, así que el trazo de cada una la pinta desde su lado,
 * los dos se superponen y la línea mide `GROSOR_DE_LINEA` y no el doble. Sin
 * eso, en los cruces de tres regiones asoma el fondo de la página.
 *
 * **Cuatro de las seis divisiones apoyan sus dos extremos en una muesca de la
 * silueta**, o sea en un vértice cóncavo, que es donde el dibujo ya pide un
 * límite: el ala baja por el hueco entre el ala y el cuello —que en esta silueta
 * llega hasta y≈135, mucho más abajo de lo que parece— y sale por la muesca
 * donde el borde de fuga del ala toca el costado; la pata va del costado, por la
 * cadera, a la muesca entre el garrón y la cola. Las otras dos son decisión y
 * una costó una pasada: **la rodilla va baja**, a la altura donde la cadera
 * termina de angostarse, porque más arriba el contramuslo salía como una
 * medialuna fina y el muslo se llevaba media pata.
 *
 * ## Acá se curva todo, y en la res casi nada
 *
 * La res emite polilínea salvo en cinco piezas, porque sus divisiones son rectas
 * y curvarlas las deja onduladas. **El ave no tiene una sola recta**, y sus
 * regiones salen de una grilla de píxeles, así que crudas son una escalera. Las
 * ocho pasan por **corte de esquinas de Chaikin, dos vueltas**, sobre el anillo
 * entero. Se puede porque se recrecen contra una máscara común: las dos caras de
 * una división son la misma arista y Chaikin las mueve igual.
 *
 * ## La vista se lleva cuatro cortes
 *
 * Un ave entera vista desde arriba **no muestra cabeza, cuello, espinazo ni
 * pecho**: el ave viene sin cabeza ni cuello, el espinazo queda del otro lado y
 * el pecho, debajo de la pechuga. De los nueve quedan cinco, y los cuatro que
 * salen no dejan de comercializarse: pasan a `OTROS_DE_POLLO`. Sus nombres
 * siguen en los dos catálogos.
 *
 * **La rabadilla se lleva la punta que asoma entre las patas**, que en la
 * silueta es una pieza propia, y **el muslo se lleva la pata y la garra**: acá
 * no hay línea que las separe, igual que en el osobuco de la res.
 *
 * Los guiones quedaron en el scratchpad de la sesión (`trazar2.mjs`,
 * `cortes2.mjs` y `verificar-ave.mjs`).
 */

export const LIENZO = '0 0 1000 916';

/**
 * Va debajo de todo. La res la usa para lo que no es corte —cabeza, patas y
 * cola—; acá **todo el ave es corte**, así que esto no dibuja ninguna pieza
 * propia: está para que, si dos regiones vecinas dejan un pelo entre sí, ahí
 * asome tinta y no el fondo de la página.
 *
 * **No va encogida**, a diferencia de la lámina vieja. Allá cada región se
 * suavizaba con su propio paso y la silueta no podía seguirlas, así que asomaba
 * por detrás; acá las ocho salen de la misma máscara y con el mismo suavizado,
 * de modo que su unión es exactamente esto.
 */
export const SILUETA =
  'M196 0L213.2 0L230.4 6.9L239.9 13.8L252.8 29.2L262.3 48.2L269.1 69.6L276 107.5L276.9 126.4L278.6 129.8L288 110.9L304.4 86.8L313.8 75.7L333.6 57.6L349.1 47.3L368.9 37.8L386.1 32.7L406.7 29.2L436.8 29.2L454.9 31.8L475.5 37L499.6 46.4L530.5 35.3L563.2 29.2L593.3 29.2L620.8 34.4L650.9 47.3L678.4 67.9L692.2 82.5L705.1 99.7L721.4 129.8L723.1 126.4L726.6 89.4L731.7 66.2L737.7 48.2L747.2 29.2L760.1 13.8L778.2 2.6L786.8 0L809.1 0.9L826.3 6.9L845.2 17.2L867.6 32.7L887.4 49L932.9 92.9L982.8 148.8L997.4 167.7L1000 174.5L1000 187.4L996.6 196L985.4 206.4L972.5 209.8L866.7 185.7L865 187.4L864.1 213.2L859 245.1L852.1 268.3L840.9 293.2L829.8 310.4L813.4 328.5L793.6 343.1L769.6 355.1L770.4 414.4L768.7 454L762.7 503.9L754.9 534.8L756.7 536.5L773 540L791.1 547.7L804.8 557.2L816 568.4L826.3 586.4L830.6 600.2L832.3 616.5L830.6 639.7L822.9 669L809.1 698.2L788.5 726.6L733.4 784.2L714.5 807.4L699.1 834L694.8 848.7L694.8 854.7L693.9 892.5L687.9 903.7L680.1 910.6L667.2 915.7L652.6 915.7L632 907.1L626 907.1L609.6 912.3L599.3 911.4L589 906.3L581.3 897.7L577.8 888.2L577.8 875.3L590.7 840.1L599.3 810.8L604.5 782.5L606.2 767.8L605.3 763.5L585.6 786.8L559.8 810L529.7 830.6L501.3 844.4L495.3 843.5L476.4 834L440.2 810L414.4 786.8L394.7 763.5L394.7 775.6L399.8 806.5L406.7 832.3L422.2 875.3L422.2 888.2L420.5 894.2L411 906.3L400.7 911.4L390.4 912.3L377.5 908L368 907.1L347.4 915.7L328.5 914.9L316.4 908L307 895.1L305.2 889.1L305.2 848.7L300.9 834L290.6 815.1L266.6 784.2L211.5 726.6L190.9 698.2L177.1 669L169.4 639.7L167.7 616.5L172 590.7L184 568.4L199.5 553.7L220.1 542.6L243.3 536.5L245.1 534.8L237.3 503.9L231.3 454L229.6 414.4L230.4 355.1L202.1 340.5L186.6 328.5L170.2 310.4L159.1 293.2L147.9 268.3L141 245.1L135.9 213.2L135 187.4L133.3 185.7L43 207.2L26.7 209.8L16.3 207.2L6 199.5L0 187.4L0 174.5L6 162.5L47.3 114.4L104.9 55.9L132.4 32.7L154.8 17.2L173.7 6.9Z';

/**
 * Las tres ranuras blancas del dibujo: el pliegue del ala, la curva del cuello y
 * la quilla. **Son dibujo y no división**, así que no son regiones: no se
 * apuntan, no se tabulan y no tienen nombre.
 *
 * **Van pintadas encima de todo y no como agujeros de su región.** Dos motivos.
 * Como agujeros habría que emitir subtrazados y resolver el relleno con
 * `evenodd`, y sobre todo **la quilla cruza el límite entre pechuga y
 * rabadilla**, así que no pertenece a ninguna de las dos. Encima, además,
 * sobreviven al resalte: al apuntar un corte su región pasa a bordó y la ranura
 * se sigue viendo.
 */
export const DETALLES_DEL_DIBUJO: readonly string[] = [
  'M172.8 65.3L184 65.3L194.3 68.8L205.5 78.2L210.7 86L218.4 108.3L225.3 147.9L234.7 188.3L245.1 219.3L236.5 204.6L226.1 178L218.4 152.2L206.4 98L199.5 84.3L191.7 76.5L181.4 72.2L170.2 72.2L163.4 73.9L146.2 80.8L125.5 93.7L134.1 85.1L147 75.7L158.2 69.6Z',
  'M412.7 85.1L435.1 85.1L442.8 86.8L414.4 92.9L387.8 104.9L369.7 117.8L350 139.3L337.1 161.7L331 178L327.6 193.5L325 235.6L321.6 251.1L316.4 263.1L311.3 269.1L315.6 254.5L313 188.3L316.4 169.4L325 147L339.6 124.7L361.1 104.9L385.2 92Z',
  'M500.4 304.4L494.4 331.9L490.1 374.9L490.1 429.9L498.7 558.9L497 607.1L494.4 627.7L490.1 645.7L486.7 589.9L473.8 480.7L472.1 417L474.6 386.1L480.7 354.3L488.4 329.3Z'
];

/**
 * Un trazado por corte. El ala, el contramuslo y el muslo son dos regiones cada
 * uno —el ave es simétrica y cada uno de esos cortes está de los dos lados—, así
 * que apuntar uno enciende el par, que es lo correcto: el ala es esa parte de
 * las dos. La pechuga y la rabadilla son una sola.
 */
export const REGIONES_DE_CORTE: Record<string, readonly string[]> = {
  pechuga: [
    'M417.9 29.3L425.8 29.3L432.9 29.5L439.1 29.8L444.4 30.3L448.9 31L453.5 31.8L458.2 32.8L463 33.9L468 35.1L473.2 36.7L478.7 38.5L484.5 40.6L490.5 43L497 44.1L504 43.9L511.3 42.4L519 39.6L526.9 37.1L534.7 34.9L542.7 33.1L550.7 31.6L558.6 30.5L566.5 29.7L574.4 29.3L582.3 29.3L589.8 29.7L597.2 30.3L604.3 31.3L611.1 32.7L618.1 34.5L625.3 36.8L632.6 39.5L640.1 42.8L647.4 46.5L654.5 50.6L661.3 55.2L668 60.2L673.9 64.8L679 69.2L683.3 73.2L686.8 76.8L690.2 80.7L693.6 84.7L696.9 88.8L700.1 93.2L703.6 98.3L707.2 104.2L711 110.9L715 118.4L718.1 123.8L720.4 127L721.9 128L722.5 127L725.3 128.4L730.3 132.3L737.5 138.7L746.9 147.6L760.3 158L777.7 169.9L799.1 183.3L824.5 198.1L843.4 210.8L855.6 221.3L861.3 229.6L860.4 235.8L859.3 241.8L857.9 247.8L856.4 253.8L854.6 259.6L852.6 265.6L850.3 271.7L847.6 278L844.7 284.4L841.9 290.2L839.1 295.4L836.5 300L833.9 304L830.7 308.3L826.9 312.9L822.5 317.9L817.5 323.1L812.7 327.8L808.2 331.9L803.9 335.5L799.8 338.5L795.2 341.5L790.1 344.6L784.5 347.6L778.5 350.7L774 356.8L771 365.9L769.7 378L770 393L770 406.8L770 419.1L769.7 430L769.3 439.6L768.6 449.9L767.6 461L766.4 472.8L764.9 485.3L763.3 496.5L761.5 506.6L759.7 515.5L757.7 523.2L756.3 529L755.5 533.1L755.4 535.4L755.9 535.9L757.8 536.7L761 537.8L765.7 539.2L771.7 540.8L774.2 543.3L773.3 546.5L768.9 550.5L761.1 555.2L752.3 561.3L742.4 568.8L731.6 577.6L719.8 587.8L707.7 599L695.5 611.2L683.1 624.5L670.5 638.8L658.1 647.9L645.9 651.8L633.9 650.5L622.1 643.9L612.6 638.8L605.4 635.1L600.6 633L598.1 632.3L590.1 631.3L576.8 629.8L558 627.8L533.7 625.5L509.5 624.4L485.3 624.4L461.2 625.6L437.1 628L415.8 631.6L397.1 636.4L381.3 642.4L368.1 649.6L355.1 651.4L342.2 647.8L329.5 638.8L316.9 624.5L304.5 611.2L292.3 599L280.3 587.8L268.4 577.6L257.6 568.8L247.8 561.3L238.9 555.2L231.1 550.5L226.6 546.5L225.4 543.4L227.6 541.1L233.1 539.6L237.5 538.3L240.7 537.2L242.8 536.3L243.8 535.7L244.1 533.3L243.6 529.1L242.3 523.2L240.3 515.5L238.5 506.6L236.7 496.5L235.1 485.3L233.6 472.8L232.4 461L231.4 449.9L230.7 439.6L230.3 430L230 419.1L230 406.8L230 393L230.3 378L228.7 365.7L225.2 356.3L219.9 349.7L212.8 346L206.5 342.4L201 339.1L196.5 336.1L192.8 333.3L189 329.9L185 326.1L180.8 321.9L176.5 317.1L172.6 312.6L169.1 308.2L166.1 304L163.5 300L160.9 295.4L158.1 290.2L155.3 284.4L152.4 278L149.8 271.7L147.4 265.6L145.4 259.6L143.6 253.8L142.1 247.8L140.8 241.8L139.6 235.8L138.7 229.6L144.3 221.3L156.4 210.9L175.1 198.3L200.3 183.7L221.5 170.4L239 158.5L252.5 148L262.2 139L269.5 132.4L274.6 128.4L277.4 127L277.9 128L278.9 127.7L280.3 125.9L282.2 122.7L284.5 118L287.3 113L290.5 107.7L294.1 102L298.2 96L303.1 89.7L308.8 83L315.3 76L322.7 68.7L329.1 62.5L334.6 57.6L339.3 53.9L343 51.4L347.1 48.9L351.5 46.5L356.2 44L361.2 41.6L366 39.5L370.7 37.6L375.3 36L379.7 34.7L384.3 33.5L388.9 32.4L393.7 31.4L398.6 30.6L404.3 30L410.7 29.5Z'
  ],
  ala: [
    'M202.4 0L206.6 0L210.9 0.4L215.2 1.3L219.5 2.6L223.8 4.4L227.7 6.1L231 7.8L233.8 9.5L236.2 11.2L238.8 13.4L241.6 16.3L244.7 19.7L248 23.7L251.1 27.8L253.9 32.2L256.5 36.7L258.8 41.3L261 46.1L263 51.1L264.8 56.2L266.5 61.5L268.2 67.8L269.9 75.2L271.6 83.7L273.4 93.3L274.7 101.6L275.7 108.5L276.3 114.2L276.4 118.5L274.2 124L269.6 130.6L262.5 138.4L253.1 147.3L239.7 157.7L222.4 169.6L201 182.9L175.7 197.8L156.6 208.5L143.7 215.1L137 217.6L136.6 216L136.3 213.2L136 209.2L135.8 203.9L135.6 197.4L135.3 192.4L134.8 188.9L134.2 186.9L133.5 186.4L131.9 186.3L129.6 186.5L126.6 187L122.8 188L114.2 189.9L101 192.9L83 197L60.3 202L42.7 205.7L30 207.8L22.3 208.5L19.7 207.8L17.1 206.8L14.5 205.5L12 203.9L9.6 202.1L7.4 200L5.5 197.5L3.8 194.8L2.3 191.8L1.1 188.8L0.4 185.7L0 182.6L0 179.4L0.4 176.3L1.1 173.2L2.3 170.2L3.8 167.2L7.4 162L13.1 154.7L20.9 145.3L30.8 133.7L42 121.2L54.5 107.7L68.3 93.3L83.4 78L96.3 65.1L107 54.8L115.6 46.9L122 41.5L128.3 36.4L134.4 31.7L140.3 27.3L146 23.3L151.5 19.7L156.8 16.4L161.8 13.5L166.5 10.9L171.5 8.5L176.7 6.3L182 4.4L187.6 2.6L192.9 1.3L197.8 0.4Z',
    'M794.8 0.6L800.6 0.8L806 1.3L811.1 2.1L815.7 3.3L820 4.8L824.3 6.5L828.8 8.6L833.5 10.9L838.2 13.5L843.2 16.4L848.5 19.7L854 23.3L859.7 27.3L865.2 31.3L870.5 35.3L875.5 39.2L880.2 43.1L886.8 49L895.2 56.8L905.5 66.6L917.5 78.4L929.5 90.5L941.5 102.9L953.3 115.8L965 128.9L974.8 140L982.5 148.9L988.2 155.8L991.8 160.5L994.7 164.5L996.9 167.6L998.2 169.9L998.8 171.4L999.2 173.4L999.5 176L999.7 179L999.7 182.6L999.5 185.8L999.1 188.5L998.5 190.9L997.8 192.8L996.5 194.9L994.7 197.2L992.4 199.7L989.6 202.3L986.7 204.5L983.7 206.3L980.7 207.6L977.6 208.4L970.8 208L960.2 206.4L945.9 203.5L927.8 199.5L912.1 195.9L898.8 192.9L887.9 190.5L879.4 188.5L872.9 187.2L868.4 186.5L865.9 186.4L865.4 186.9L865 188.9L864.7 192.4L864.4 197.4L864.3 203.9L864 209.2L863.7 213.2L863.4 216L863 217.6L856.3 215.1L843.4 208.5L824.3 197.8L799 182.9L777.6 169.6L760.3 157.7L746.9 147.3L737.5 138.4L730.6 129.5L726.3 120.5L724.6 111.6L725.4 102.7L726.3 94.7L727.3 87.6L728.4 81.3L729.6 76L730.9 70.8L732.2 65.6L733.7 60.6L735.3 55.7L737.1 50.9L739 46.1L741.2 41.3L743.5 36.7L746.1 32.2L748.9 27.8L752 23.7L755.3 19.7L758.9 16L762.8 12.7L766.8 9.7L771.2 7L774.9 4.8L778.1 3.2L780.8 2L782.9 1.3L785.9 0.9L789.9 0.6Z'
  ],
  contramuslo: [
    'M230.9 550.6L238.8 555.4L247.9 561.8L258.3 569.8L269.8 579.3L282.5 590.4L295 602L307.1 614.1L318.9 626.8L330.4 639.9L341.6 653.9L352.4 668.7L362.8 684.3L372.9 700.7L381.6 716.2L388.9 730.7L394.8 744.3L399.3 757L401.9 765.7L402.8 770.5L401.9 771.4L399.1 768.3L397.1 767.3L395.9 768.5L395.4 771.8L395.6 777.2L392.9 781L387.3 783.2L378.6 783.7L367 782.6L353.4 780.9L337.6 778.5L319.8 775.4L299.9 771.6L283.2 768.3L269.7 765.5L259.5 763.1L252.5 761.2L245.3 757.8L238 752.8L230.5 746.3L222.8 738.3L215.8 730.6L209.4 723.1L203.7 715.8L198.6 708.8L194 701.8L189.7 694.6L185.9 687.5L182.5 680.2L179.4 673L176.8 665.8L174.5 658.6L172.5 651.4L171 644.4L169.8 637.6L169 631L168.6 624.6L168.6 618.3L168.9 612.1L169.5 606L170.5 600L172 594.1L174 588.3L176.5 582.6L179.5 577L182.7 571.9L186.2 567.3L189.9 563L193.8 559.3L197.9 555.8L202.3 552.7L206.9 549.8L211.8 547.2L217.4 546.5L223.7 547.6Z',
    'M784.3 545.2L787 546.2L789.8 547.5L792.8 549.1L795.9 551L799.1 553.3L802.3 555.8L805.5 558.4L808.6 561.3L811.7 564.4L814.6 567.8L817.4 571.5L820.1 575.6L822.6 580L824.7 584.3L826.5 588.3L828 592L829 595.6L829.9 599.5L830.6 603.7L831.2 608.3L831.5 613.1L831.6 618L831.6 622.9L831.4 628L831 633L830.2 638.6L829 644.8L827.5 651.4L825.5 658.6L823.3 665.8L820.6 673L817.5 680.2L814.1 687.5L810.3 694.6L806 701.8L801.4 708.8L796.3 715.8L790.6 723.1L784.2 730.6L777.2 738.3L769.5 746.3L762 752.8L754.7 757.8L747.5 761.2L740.5 763.1L730.3 765.5L716.8 768.3L700.1 771.6L680.2 775.4L662.4 778.5L646.6 780.9L633 782.6L621.4 783.7L612.8 783.5L607.3 782.1L604.9 779.3L605.5 775.3L605.8 772L606 769.2L606 767.1L605.7 765.6L604.8 765.3L603.3 766.1L601.1 768.1L598.3 771.3L597.3 770.4L598.3 765.4L601.1 756.4L605.9 743.3L611.9 729.5L619.2 714.9L627.8 699.7L637.6 683.7L647.8 668.4L658.5 653.8L669.6 639.9L681.1 626.8L692.9 614.1L705 602L717.5 590.4L730.2 579.3L741.7 569.8L752 561.9L761 555.5L768.7 550.8L775.2 547.5L780.4 545.6Z'
  ],
  muslo: [
    'M252.9 761.3L259.8 763.3L269.1 765.7L281.1 768.4L295.6 771.5L312.7 774.9L329.1 777.8L344.9 780.2L360.1 782.1L374.6 783.5L385.6 785.9L393.3 789.1L397.5 793.2L398.2 798.2L399.2 803.6L400.5 809.4L402 815.5L403.7 822.1L406 829.8L408.8 838.4L412.2 848.1L416.1 858.9L419 867.9L420.9 875.3L421.8 881L421.6 885L420.8 889L419.4 892.9L417.3 896.8L414.7 900.6L412 903.8L409.5 906.3L406.9 908.2L404.4 909.5L401.9 910.4L399.2 911.1L396.5 911.6L393.8 911.8L391 911.6L388 911.1L385 910.4L382 909.3L379 908.4L376.3 907.8L373.7 907.4L371.3 907.3L368.2 907.7L364.3 908.7L359.8 910.3L354.5 912.4L349.5 914L344.5 914.9L339.8 915.3L335.2 915L331.1 914.5L327.4 913.5L324.1 912.3L321.3 910.7L318.5 908.7L315.8 906.2L313.3 903.3L310.8 900L308.8 897.1L307.3 894.8L306.4 892.9L306 891.5L305.6 887.8L305.4 882L305.3 874L305.3 863.7L305.1 855.1L304.5 848.1L303.7 842.8L302.6 839.2L301.1 835.2L299.3 831L297 826.4L294.3 821.6L290.9 816.1L286.6 809.9L281.6 803.1L275.8 795.6L269.9 788.3L263.9 781.3L257.9 774.6L251.8 768.1L248.9 763.7L249.3 761.5Z',
    'M756.8 758.5L757.2 758.5L755.9 760.2L753 763.5L748.4 768.3L742.3 774.7L736.5 780.9L731.2 786.8L726.4 792.5L722 797.9L717.6 803.7L713.4 809.8L709.2 816.4L705.1 823.3L701.8 829.4L699.2 834.7L697.4 839.2L696.3 842.8L695.4 848.4L694.8 855.7L694.3 865L694 876L693.5 885L692.7 891.9L691.5 896.7L690.1 899.3L688.6 901.8L686.9 904L685.1 906L683.2 907.7L680.9 909.4L678.3 910.9L675.3 912.3L672 913.7L668.6 914.7L665.1 915.3L661.6 915.7L658 915.7L654.1 915.1L649.8 914L645 912.4L640 910.3L635.7 908.6L632.3 907.5L629.7 907L628 907L625.7 907.3L623 907.9L619.7 908.9L616 910.1L612.5 911L609.2 911.6L606.2 911.8L603.5 911.6L600.8 911.1L598.1 910.4L595.6 909.5L593.1 908.2L590.7 906.7L588.5 905L586.3 903.1L584.3 900.9L582.7 898.9L581.5 897.1L580.6 895.5L580.1 894.1L579.6 892L579.2 889.2L578.8 885.6L578.5 881.4L579.5 874.5L581.8 865.1L585.5 853L590.5 838.3L594.6 825.4L597.9 814.3L600.3 804.8L601.8 797.2L606.5 791.1L614.4 786.5L625.6 783.5L640 782.1L655.1 780.2L670.9 777.8L687.3 774.9L704.4 771.5L718.8 768.4L730.7 765.7L739.9 763.3L746.5 761.3L751.5 759.9L754.9 758.9Z'
  ],
  rabadilla: [
    'M535.5 626L560.9 628.4L583.2 632L602.5 636.8L618.8 642.8L631.9 649.9L639.4 659.2L641.1 670.7L637 684.3L627.3 700L618.8 715.3L611.4 729.9L605.3 744L600.4 757.6L596.2 768.4L592.7 776.4L590 781.5L588 783.8L584.8 787.1L580.5 791.2L575 796.2L568.3 802.1L561.6 807.8L554.7 813.1L547.7 818.3L540.6 823.1L533.6 827.5L526.6 831.6L519.8 835.3L512.9 838.7L507.3 841.1L502.9 842.8L499.8 843.5L497.9 843.5L495.3 842.8L491.9 841.5L487.9 839.7L483.1 837.3L477.3 834L470.5 829.8L462.6 824.8L453.7 818.9L445 812.6L436.6 805.9L428.5 798.8L420.5 791.3L414.4 785.4L410.1 781.3L407.7 778.8L407 777.9L406.5 777L406.1 776L405.9 774.9L405.8 773.8L404.6 770L402.4 763.5L399.2 754.5L394.8 742.8L389.1 730.1L382 716.2L373.5 701.2L363.5 685.1L359.4 671.3L361 659.6L368.3 650.1L381.4 642.9L397.2 636.8L415.8 632L437.1 628.4L461.2 626L485.6 624.8L510.4 624.8Z'
  ]
};

/**
 * Centroide de cada región: es el ancla de la tarjeta cuando el foco llega por
 * teclado y no hay puntero del que colgarse. Va uno por región y no uno por
 * corte, porque tabular pasa por las dos alas por separado.
 */
export const CENTROS_DE_CORTE: Record<
  string,
  readonly (readonly [number, number])[]
> = {
  pechuga: [[500, 335.1]],
  ala: [[152.2, 114.7], [847.8, 114.5]],
  contramuslo: [[273.3, 675.7], [726.8, 675.5]],
  muslo: [[348.9, 841.2], [651, 841.3]],
  rabadilla: [[500, 715.8]]
};
