/**
 * El ave y sus cinco cortes.
 *
 * **El dibujo cambió de origen.** Hasta acá salía de la lámina de despiece de
 * pollo que aportó el cliente, que traía nueve cortes ya dibujados como piezas
 * separadas; esa lámina se descartó por pedido —el ave no se leía como un ave— y
 * en su lugar entró una **silueta maciza** de pollo faenado visto desde arriba,
 * que también aportó él. Origen y licencia, en `src/imagenes/FUENTES.md`.
 *
 * ## Lo que cambia al cambiar de origen: las divisiones se escriben a mano
 *
 * En la lámina vieja, y en la de la res, las divisiones venían dibujadas y el
 * trabajo era extraerlas. Acá la imagen es una mancha de un solo color: no hay
 * nada que extraer más que el borde de afuera. Así que el procedimiento se parte
 * en dos y **sólo la primera mitad sale de la imagen**.
 *
 * **Primero, la silueta.** Umbral a 128 —el histograma parte limpio, 697 mil
 * píxeles de cuerpo contra 2,97 millones de fondo—, **cierre morfológico de
 * radio 16** para tapar las ranuras blancas del dibujo —el filo de la pechuga y
 * el pliegue de cada ala— de modo que el contorno de afuera no se meta por
 * ellas, el componente conexo más grande, relleno de agujeros inundando desde el
 * borde, contorno por vecindad de Moore y Douglas-Peucker a 1,6. Salen **134
 * puntos**.
 *
 * **Después, los cortes.** Las seis divisiones se escriben a mano como
 * polilíneas contra el dibujo, se queman sobre un ráster de la silueta a triple
 * resolución para partirlo, y de ahí en adelante es lo mismo que en la res:
 * etiquetar componentes conexos, descartar como semilla las islas por debajo de
 * 2000 px —los jirones que deja la quema en los vértices—, **recrecer cada
 * región contra la máscara sin partir** hasta que no queda un píxel sin dueño, y
 * trazar cada contorno. Verificado: cero píxeles del cuerpo sin asignar.
 *
 * Recrecer importa por lo mismo que allá. El límite entre dos vecinas queda como
 * **arista compartida**, así que el trazo de cada una la pinta desde su lado,
 * los dos se superponen y la línea mide `GROSOR_DE_LINEA` y no el doble. Sin
 * eso, en los cruces de tres regiones asoma el fondo de la página.
 *
 * ## Acá se curva todo, y en la res casi nada
 *
 * La res emite polilínea salvo en cinco piezas, porque sus divisiones son rectas
 * y curvarlas las deja onduladas. **El ave no tiene una sola recta**, y su
 * contorno sale de una grilla de píxeles, así que crudo es una escalera. Las
 * ocho regiones pasan por **corte de esquinas de Chaikin, dos vueltas**, sobre
 * el anillo entero.
 *
 * Eso se puede hacer acá y no en la lámina vieja por una razón concreta: las
 * regiones se recrecen contra una máscara común, así que las dos caras de una
 * división son la misma arista y Chaikin las mueve igual. Suavizando regiones
 * extraídas por separado, cada una se encoge por su cuenta y entre las dos asoma
 * la página —que es lo que a la lámina vieja la obligaba a remuestrear el borde
 * de fuera y a dejar quieto el de adentro.
 *
 * ## La vista se lleva cuatro cortes
 *
 * Un ave entera vista desde arriba **no muestra cabeza, cuello, espinazo ni
 * pecho**: el ave viene sin cabeza ni cuello, el espinazo queda del otro lado y
 * el pecho, debajo de la pechuga. De los nueve quedan cinco, y los cuatro que
 * salen no dejan de comercializarse: pasan a `OTROS_DE_POLLO`, que es la lista
 * de lo que se vende y no es una parte del dibujo. Sus nombres siguen en los dos
 * catálogos.
 *
 * **La rabadilla se lleva la punta que asoma entre las patas**, que en la
 * silueta es una pieza propia, y **el muslo se lleva la pata y la garra**: acá
 * no hay línea que las separe, igual que en la lámina vieja y que en el osobuco
 * de la res.
 *
 * ## Las seis divisiones, y por qué van donde van
 *
 * Cuatro de las seis apoyan sus dos extremos en una **muesca de la silueta**, o
 * sea en un vértice cóncavo, que es donde el dibujo ya está pidiendo un límite:
 * el ala va del hueco del cuello a la muesca donde su borde de fuga toca el
 * cuerpo, y la pata va del costado, por la cadera, a la muesca entre el garrón y
 * la cola. Las otras dos no tienen dónde apoyarse y son decisión: la rodilla
 * —que parte la pata en contramuslo y muslo— va baja, a la altura donde la
 * cadera termina de angostarse, porque más arriba el contramuslo salía como una
 * medialuna fina y el muslo se llevaba media pata; y el alto de la rabadilla va
 * de una línea de pata a la otra, así que cierra sola y no toca la silueta.
 *
 * El guion quedó en el scratchpad de la sesión (`trazar.mjs` y `cortes.mjs`);
 * si hay que rehacerlo, lo que importa es esa secuencia y esas seis polilíneas.
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
  'M196 0L218 1L230 7L244 18L253 29L262 48L273 90L302 90L322 68L349 47L377 35L407 29L450 31L484 40L516 40L541 33L563 29L606 31L631 38L655 50L678 68L698 90L726 90L738 48L747 29L756 18L770 7L782 1L809 1L826 7L845 17L887 49L933 93L997 168L1000 175L998 193L991 203L979 209L966 209L897 193L866 193L859 245L852 268L841 293L830 310L813 328L794 343L770 354L770 439L767 473L761 509L761 537L791 548L805 557L816 568L826 586L831 600L832 617L831 640L823 669L809 698L788 727L720 801L704 824L696 845L695 889L690 900L680 911L667 916L653 916L642 911L604 912L589 906L581 898L578 888L579 872L592 835L592 807L563 807L534 828L501 844L495 844L470 831L437 807L408 807L408 835L422 875L420 894L411 906L396 912L358 911L347 916L333 916L320 911L310 900L305 889L305 849L296 824L273 791L225 742L198 709L180 676L169 640L168 624L169 600L174 586L184 568L195 557L209 548L239 537L239 509L233 473L230 439L230 354L206 343L187 328L170 310L159 293L148 268L141 245L134 193L103 193L27 210L16 207L9 203L3 196L0 187L0 175L6 163L47 114L92 68L124 40L148 21L174 7Z';

/**
 * Un trazado por corte. El ala, el contramuslo y el muslo son dos regiones cada
 * uno —el ave es simétrica y cada uno de esos cortes está de los dos lados—, así
 * que apuntar uno enciende el par, que es lo correcto: el ala es esa parte de
 * las dos. La pechuga y la rabadilla son una sola.
 */
export const REGIONES_DE_CORTE: Record<string, readonly string[]> = {
  pechuga: [
    'M423.1 29.8L433.9 30.3L444 31.2L453.5 32.6L462.4 34.4L470.6 36.6L478.9 38.3L487.3 39.4L495.8 40L504.3 40L512.1 39.6L519.4 38.7L526 37.4L532 35.6L537.9 34.1L543.6 32.7L549.3 31.5L554.8 30.5L561.6 29.9L569.7 29.6L579.1 29.8L589.9 30.3L599.5 31.1L608 32.2L615.4 33.6L621.6 35.4L627.8 37.4L633.9 39.8L640 42.5L646 45.5L651.9 48.9L657.8 52.6L663.6 56.8L669.4 61.3L674.9 66L680.3 71L685.5 76.3L690.5 81.8L696 85.9L702 88.6L708.5 90L715.5 90L721 89.3L725.1 87.8L727.6 85.6L728.7 82.7L735.2 84.9L747 92.3L764.2 104.8L786.8 122.5L806.5 139.1L823.2 154.6L837 169.1L848 182.5L855.8 195.3L860.6 207.3L862.3 218.5L861 229.1L859.6 238.5L858 246.7L856.4 253.6L854.6 259.4L852.6 265.3L850.4 271.3L847.9 277.4L845.1 283.6L842.4 289.4L839.6 294.6L836.9 299.4L834.1 303.6L831 307.9L827.5 312.3L823.6 316.8L819.4 321.3L815 325.6L810.5 329.7L805.9 333.6L801.1 337.4L796.1 340.9L790.7 344.1L785 347.1L779 349.9L774.5 357.3L771.5 369.3L770 385.9L770 407.1L769.8 425.2L769.4 440.1L768.9 451.8L768.1 460.3L767.2 468.8L766.1 477.3L764.8 485.9L763.3 494.5L762.1 502.8L761.4 510.8L761 518.5L761 525.9L762 531.8L764 536.3L767 539.3L771 540.8L772.4 542.8L771.2 545.5L767.4 548.8L761 552.6L753.1 558.1L743.7 565.2L732.8 574L720.5 584.4L708.1 596L695.6 608.7L683.1 622.6L670.5 637.7L657.9 647.3L645.3 651.3L632.7 649.8L620 642.8L610 637.5L602.7 633.9L598 632L596 631.7L588.5 630.9L575.6 629.6L557.1 627.8L533.2 625.5L509.3 624.4L485.3 624.4L461.2 625.6L437.1 628L415.8 631.6L397.1 636.4L381.3 642.4L368.1 649.6L355.1 651.2L342.2 647.2L329.5 637.7L316.9 622.6L304.4 608.7L291.9 596L279.5 584.4L267.2 574L256.3 565.2L246.9 558.1L239 552.6L232.6 548.8L228.8 545.5L227.6 542.8L229 540.8L233 539.3L236 536.3L238 531.8L239 525.9L239 518.5L238.6 510.8L237.9 502.8L236.8 494.5L235.3 485.9L233.9 477.3L232.8 468.8L231.9 460.3L231.1 451.8L230.6 440.1L230.2 425.2L230 407.1L230 385.9L228.5 369.3L225.5 357.3L221 349.9L215 347.1L209.3 344.1L203.9 340.9L198.9 337.4L194.1 333.6L189.5 329.7L185 325.6L180.6 321.3L176.4 316.8L172.5 312.3L169 307.9L165.9 303.6L163.1 299.4L160.4 294.6L157.6 289.4L154.9 283.6L152.1 277.4L149.6 271.3L147.4 265.3L145.4 259.4L143.6 253.6L142 246.7L140.4 238.5L139 229.1L137.7 218.5L139.4 207.3L144.2 195.3L152 182.5L163 169.1L176.8 154.6L193.5 139.1L213.2 122.5L235.8 104.8L252.9 92.3L264.6 84.9L270.9 82.7L271.8 85.6L274.2 87.8L278.2 89.3L283.9 90L291.1 90L297.8 88.6L303.9 85.9L309.5 81.8L314.5 76.3L319.9 70.8L325.8 65.4L332.1 60.1L338.9 54.9L345.7 50.2L352.6 46.1L359.5 42.5L366.5 39.5L373.6 36.9L380.9 34.6L388.3 32.8L395.8 31.3L404.1 30.3L413.2 29.8Z'
  ],
  ala: [
    'M204.3 0.4L209.8 0.6L214.6 1.2L218.9 2.1L222.5 3.3L225.5 4.8L228.6 6.6L231.9 8.7L235.3 11.1L238.8 13.9L241.9 16.6L244.8 19.4L247.4 22.1L249.6 24.9L251.9 28.1L254.1 31.9L256.4 36.1L258.6 40.9L260.8 46.3L262.9 52.4L264.9 59.3L266.8 66.8L262.6 76.8L252.3 89.4L235.8 104.5L213.2 122.2L193.5 138.8L176.7 154.4L162.8 168.9L151.8 182.4L143.5 191.9L137.8 197.4L134.7 198.9L134.3 196.4L132.1 194.5L128.1 193.3L122.3 192.7L114.7 192.7L107.8 193L101.4 193.5L95.7 194.4L90.6 195.6L83.4 197.2L74 199.4L62.5 202L48.8 205L38.3 207.3L30.8 208.8L26.5 209.4L25.2 209.3L23.4 208.8L21 207.9L18 206.8L14.4 205.3L11.3 203.7L8.8 202.1L6.8 200.4L5.3 198.6L3.9 196.8L2.8 194.8L1.9 192.6L1.1 190.4L0.6 187.9L0.2 185.3L0 182.5L0 179.5L0.4 176.5L1.1 173.5L2.3 170.5L3.8 167.5L7.4 162.2L13.3 154.6L21.4 144.6L31.6 132.4L42.1 120.3L52.9 108.4L63.9 96.8L75.1 85.3L87.1 73.7L99.7 62.1L113 50.4L127 38.6L139.1 28.9L149.4 21.3L157.8 15.8L164.3 12.3L170.5 9.2L176.5 6.6L182.3 4.4L187.8 2.6L193.3 1.4L198.8 0.6Z',
    'M792.1 1L798.9 1L805 1.4L810.5 2.1L815.4 3.3L819.6 4.8L824 6.5L828.5 8.5L833.1 10.8L837.9 13.3L844.1 17.1L851.7 22.4L860.8 29L871.3 37L882 45.8L893 55.3L904.3 65.5L915.8 76.5L928.4 89.4L942.1 104.3L957 121.1L973 139.9L985.2 154.3L993.5 164.5L998 170.4L998.7 172L999.1 174.3L999.2 177.4L999 181.3L998.6 186L997.9 190.1L996.8 193.7L995.4 196.8L993.6 199.3L991.6 201.5L989.3 203.4L986.8 205.1L983.9 206.5L980.9 207.6L977.6 208.3L974 208.7L970.3 208.7L965.9 208.3L960.7 207.5L954.9 206.3L948.4 204.7L940.9 202.9L932.4 200.9L922.9 198.7L912.4 196.3L902.6 194.5L893.6 193.3L885.3 192.7L877.7 192.7L871.9 193.3L867.9 194.5L865.7 196.4L865.3 198.9L862.2 197.4L856.5 191.9L848.2 182.4L837.2 168.9L823.2 154.4L806.4 138.7L786.5 122L763.8 104.3L747.3 89.1L736.9 76.5L732.8 66.5L734.9 59.1L737 52.4L739.2 46.3L741.4 40.9L743.6 36.1L745.9 31.9L748.1 28.1L750.4 24.9L752.6 22.1L755.2 19.4L758.1 16.6L761.3 13.9L764.8 11.1L768.1 8.7L771.4 6.6L774.5 4.8L777.5 3.3L781.4 2.1L786.3 1.4Z'
  ],
  contramuslo: [
    'M232.4 548.9L238.9 552.8L246.9 558.3L256.3 565.5L267.2 574.3L279.5 584.7L291.9 596.2L304.2 608.9L316.6 622.6L329 637.4L343 656.6L358.4 680.3L375.3 708.3L393.7 740.7L403 764.5L403.2 779.7L394.2 786.3L376.1 784.3L358.3 782L340.6 779.3L323.1 776.3L305.9 773L290.4 769.8L276.7 766.6L264.8 763.6L254.6 760.7L246.1 757.6L239.2 754.4L234 751L230.4 747.4L226 742.6L220.8 736.7L214.9 729.6L208.1 721.4L201.9 713.1L196.3 704.9L191.3 696.6L186.8 688.4L182.7 679.9L179.1 671.3L175.9 662.5L173.1 653.5L171.1 644.3L169.7 634.8L169 625L169 615L169.3 606.6L169.9 599.9L170.9 594.8L172.1 591.3L173.7 587.5L175.6 583.5L177.8 579.3L180.3 574.8L182.8 570.7L185.4 567.1L188.1 563.9L190.9 561.1L193.8 558.5L196.9 556L200.3 553.6L203.8 551.4L207.2 549.4L210.7 547.6L214.1 546.1L217.5 544.9L221.7 544.9L226.7 546.3Z',
    'M782.5 544.9L785.9 546.1L789.3 547.6L792.8 549.4L796.3 551.4L799.8 553.6L803.1 556L806.2 558.5L809.1 561.1L811.9 563.9L814.6 567.1L817.2 570.7L819.8 574.8L822.3 579.3L824.4 583.5L826.3 587.5L827.9 591.3L829.1 594.8L830.1 599.9L830.7 606.6L831 615L831 625L830.5 634.3L829.5 642.9L828 650.9L826 658.1L823.6 665.4L820.9 672.6L817.8 679.9L814.3 687.1L810.3 694.4L805.9 701.6L801.1 708.9L795.9 716.1L790.3 723.4L784.3 730.6L778 737.9L771.3 745.1L763.8 751.3L755.3 756.4L745.8 760.5L735.5 763.5L723.4 766.6L709.6 769.8L694.1 773L676.9 776.3L659.4 779.3L641.8 782L623.9 784.3L605.8 786.3L596.8 779.7L597 764.5L606.3 740.7L624.7 708.3L641.6 680.3L657 656.6L671 637.4L683.4 622.6L695.8 608.9L708.1 596.2L720.5 584.7L732.8 574.3L743.7 565.5L753.1 558.3L761.1 552.8L767.6 548.9L773.3 546.3L778.3 544.9Z'
  ],
  muslo: [
    'M255.4 760.6L265.3 763.7L276.8 766.8L290 770L305 773.2L321.7 776.5L338.9 779.4L356.6 782.1L374.8 784.5L393.5 786.5L408 788.8L418.2 791.1L424 793.7L425.6 796.3L426.9 798.7L427.9 800.9L428.5 802.7L428.8 804.3L427.8 805.5L425.3 806.3L421.3 806.8L416 806.9L412 808.7L409.3 812.4L408 817.8L408 824.9L408.8 832.4L410.3 840.3L412.5 848.5L415.5 857.1L417.9 863.9L419.6 868.8L420.8 871.9L421.3 873.1L421.5 875.3L421.5 878.3L421.3 882.1L420.8 886.9L419.8 891.2L418.4 895.1L416.6 898.5L414.4 901.5L411.8 904.1L408.9 906.3L405.6 908.1L402 909.5L396.9 910.6L390.2 911.2L381.9 911.4L372.1 911.3L364.1 911.4L358 911.9L353.7 912.8L351.3 913.9L348.5 914.8L345.4 915.4L341.9 915.7L338.1 915.7L334.4 915.4L331 914.8L327.7 913.9L324.6 912.8L321.7 911.2L318.9 909.2L316.3 906.9L313.8 904.1L311.6 901.4L309.7 898.6L308.1 895.9L306.9 893.1L305.9 888.5L305.3 882.1L305 873.8L305 863.6L304.4 854.4L303.3 846.3L301.6 839.1L299.4 832.9L296.3 826.2L292.3 819L287.4 811.3L281.6 803L275.3 794.8L268.4 786.7L261 778.5L253 770.5L247 764.3L242.9 759.9L240.9 757.5L240.8 756.9L243.2 757.2L248.1 758.5Z',
    'M760 756.1L760.4 756.2L758.1 759L753.2 764.6L745.6 773L735.4 784L726.7 793.8L719.6 802.2L714 809.3L710 815L706.5 820.7L703.4 826.3L700.9 831.8L698.8 837.2L697.2 844L696.1 852.2L695.4 861.7L695.3 872.6L694.8 881.5L694.1 888.3L693.1 893.1L691.9 895.9L690.3 898.6L688.4 901.4L686.3 904.1L683.8 906.9L681.1 909.2L678.3 911.2L675.4 912.8L672.3 913.9L669 914.8L665.6 915.4L661.9 915.7L658.1 915.7L654.6 915.4L651.5 914.8L648.7 913.9L646.3 912.8L642 911.9L635.9 911.4L627.9 911.3L618.1 911.4L609.8 911.2L603.1 910.6L598 909.5L594.4 908.1L591.2 906.6L588.4 904.9L586 903L584 901L582.3 898.9L580.9 896.6L579.9 894.3L579.1 891.8L578.7 888.8L578.5 885.3L578.6 881.4L579 877L580.1 871.5L581.9 864.9L584.3 857.3L587.4 848.7L589.7 840.4L591.2 832.5L592 824.9L592 817.8L590.7 812.4L588 808.7L584 806.9L578.7 806.8L574.8 806.3L572.4 805.3L571.4 803.8L571.9 801.9L572.6 799.9L573.6 797.7L574.8 795.5L576.2 793.2L582 790.9L592 788.7L606.5 786.5L625.2 784.5L643.4 782.1L661.1 779.4L678.3 776.5L695 773.2L710 770L723.2 766.8L734.8 763.7L744.6 760.6L752.1 758.3L757.2 756.8Z'
  ],
  rabadilla: [
    'M535.5 626L560.9 628.4L583.2 632L602.5 636.8L618.8 642.8L631.9 649.9L637.1 663.5L634.2 683.4L623.3 709.8L604.4 742.5L589.8 768L579.7 786.3L573.9 797.3L572.5 801L570.9 803.9L569.3 805.8L567.5 806.8L565.5 806.9L562.3 808.3L557.8 810.9L551.9 814.9L544.8 820.1L537.4 825L529.9 829.5L522.3 833.6L514.4 837.4L508 840.2L503.1 842.2L499.7 843.3L497.7 843.4L494.6 842.8L490.5 841.3L485.4 838.9L479.3 835.8L472.6 831.9L465.4 827.3L457.8 822L449.6 816L443 811.5L437.9 808.4L434.5 806.9L432.5 806.8L430.8 805.8L429.1 803.9L427.5 801L426.1 797.3L420.4 786.3L410.2 768.1L395.8 742.7L376.9 710L366.1 683.7L363.2 663.7L368.3 650.1L381.4 642.9L397.2 636.8L415.8 632L437.1 628.4L461.2 626L485.6 624.8L510.4 624.8Z'
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
  pechuga: [[500, 326.6]],
  ala: [[138.4, 107.4], [861.1, 107.4]],
  contramuslo: [[275.1, 676.3], [725, 676.3]],
  muslo: [[350.8, 839.9], [649.4, 839.8]],
  rabadilla: [[500, 715.2]]
};
