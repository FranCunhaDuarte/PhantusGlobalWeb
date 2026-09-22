/**
 * El ave y sus nueve cortes, extraídos de la lámina de despiece de pollo que
 * aportó el cliente. La licencia del original la tiene él; queda anotada en
 * `src/imagenes/FUENTES.md`.
 *
 * **La lámina vino más limpia que la de la vaca** y eso simplificó el
 * procedimiento. En la de la res las divisiones son líneas blancas sobre fondo
 * blanco, así que hubo que umbralar, rellenar los rótulos y erosionar tres
 * píxeles para despegar islas que la compresión JPEG había pegado. Acá el fondo
 * es transparente y las divisiones son huecos de ese fondo, no trazos: el gris
 * del cuerpo sale en **nueve componentes conexos, uno por corte**, sin erosionar
 * nada.
 *
 * La secuencia, por si hay que rehacerlo: umbral por alfa y por claridad,
 * etiquetado de componentes conexos, **relleno de huecos componente por
 * componente** —que es lo que se come los rótulos sin morder el borde de su
 * región—, **cierre morfológico de radio 10** para reconstruir la silueta entera
 * a partir de piezas que ya venían separadas, recrecido de cada región contra
 * esa silueta hasta que no queda un píxel sin dueño, y trazado de contornos por
 * vecindad de Moore.
 *
 * ## Por qué esto es polilínea y no Bézier
 *
 * Salió como curva de Catmull-Rom y **parecía que el ave tenía pelaje**. Dos
 * cosas lo causaban y las dos están arregladas acá.
 *
 * **La primera es que todo era curva.** La res emite 519 rectas contra 85
 * curvas —sólo los cinco óvalos van curvados— y el ave emitía 499 curvas y cero
 * rectas. Con tangentes en cada punto, un borde que debería ir derecho ondula.
 * Ahora el ave emite polilínea, igual que la res.
 *
 * **La segunda no era ruido de extracción: eran las plumas.** La cola y el ala
 * de la lámina están dibujadas con el fleco de las plumas, con entrantes de 40 a
 * 80 unidades de lienzo. Por eso ningún filtro de alta frecuencia las tocaba
 * —se probó media móvil y Taubin, y no se movían—. Lo que las borra es
 * **remuestrear el borde a paso grueso**, que es un pasabajos a la escala de la
 * pluma.
 *
 * ## Las tres reglas del suavizado, que se descubrieron rompiéndolas
 *
 * **Sólo se remuestrea el borde que da al fondo.** Un punto con un punto de otro
 * corte a menos de siete unidades está sobre una división interna y se deja como
 * estaba. Suavizando el anillo entero, cada región se encoge por su cuenta,
 * ninguna vecina coincide con la otra y entre las dos asoma el fondo de la
 * página.
 *
 * **El paso es distinto por corte y eso es a propósito.** A paso parejo de 44
 * unidades el ave perdía la cresta y los dedos de las patas, que la lámina
 * dibuja a propósito igual que la res dibuja cuernos y pezuñas. Así que la cola
 * y el ala —donde está el fleco— van a 64 y 52, y la cabeza y el muslo —donde
 * está el detalle— a 8 y 13. El 44 de referencia no es de gusto: la res tiene un
 * segmento cada 19,55 ‰ de la diagonal de su lienzo, y la diagonal del ave mide
 * 2262.
 *
 * **La silueta va encogida 14 unidades.** Como cada región se suaviza con su
 * propio paso, la silueta no puede seguirlas una por una: suavizada con un paso
 * cualquiera, asomaba por detrás de la cola y de las patas y se veía un contorno
 * fantasma por fuera del dibujo. Metiéndola hacia adentro por la bisectriz de
 * cada vértice queda garantizado que no asoma, y para lo único que está —que un
 * pelo entre dos regiones muestre tinta y no la página— los 14 no le hacen
 * falta a nadie.
 *
 * Los rótulos de la lámina **se descartaron**: estaban quemados en el dibujo.
 * Los nombres visibles salen de `productos.pollo.cortes.<id>`.
 *
 * **Las patas y las garras vienen con el muslo**, que es como las agrupa la
 * lámina: ahí no hay línea que las separe, así que ninguna extracción las va a
 * distinguir. Apuntar el muslo enciende la pata entera, igual que el osobuco
 * enciende las cuatro patas de la res.
 */

export const LIENZO = '155 26 1792 1381';

/**
 * Va debajo de todo. La res la usa para lo que no es corte —cabeza, patas y
 * cola—; acá **todo el ave es corte**, así que esto no dibuja ninguna pieza
 * propia: está para que, si dos regiones vecinas dejan un pelo entre sí, ahí
 * asome tinta y no el fondo de la página. Por eso va encogida: ver arriba.
 */
export const SILUETA =
  'M328 17L344 22L381 25L404 35L425 85L435 95L501 140L519 158L545 206L611 274L653 313L718 349L765 357L821 380L837 383L874 386L953 372L975 380L1000 400L1012 404L1092 407L1130 403L1207 388L1284 365L1324 365L1360 358L1384 360L1410 384L1396 396L1393 346L1406 320L1470 271L1515 229L1537 217L1570 218L1578 216L1605 189L1625 176L1660 167L1673 161L1703 135L1725 130L1754 133L1787 115L1810 109L1834 120L1850 151L1874 172L1888 203L1884 206L1933 191L1956 211L1956 238L1931 296L1930 305L1946 332L1949 357L1920 409L1910 445L1899 466L1858 510L1853 522L1844 560L1834 581L1819 599L1786 627L1716 667L1708 674L1708 681L1714 718L1709 742L1645 868L1611 920L1554 980L1506 1019L1436 1061L1395 1077L1369 1069L1363 1044L1379 964L1385 884L1383 867L1380 860L1387 860L1385 865L1382 882L1384 964L1379 1025L1371 1066L1357 1106L1337 1142L1300 1192L1267 1220L1232 1240L1225 1248L1223 1258L1232 1295L1239 1308L1247 1316L1302 1330L1301 1362L1245 1372L1233 1380L1201 1407L1170 1402L1172 1373L1175 1374L1167 1374L1128 1379L1114 1351L1132 1338L1172 1324L1180 1317L1182 1308L1174 1271L1166 1257L1158 1247L1104 1224L1084 1210L1060 1180L1058 1177L1055 1179L1024 1205L1003 1217L908 1247L896 1255L887 1266L874 1302L871 1319L871 1335L877 1348L901 1378L902 1405L877 1404L842 1382L832 1380L820 1386L788 1404L767 1381L760 1377L704 1376L699 1346L717 1340L798 1322L810 1315L821 1305L838 1271L841 1256L838 1245L830 1235L783 1197L768 1178L748 1141L740 1119L739 1096L745 1073L757 1052L822 973L826 964L830 969L832 970L804 996L781 1027L749 1079L725 1091L701 1087L679 1076L613 1027L527 945L428 880L395 855L364 826L339 791L302 697L275 642L264 567L268 488L253 389L260 362L289 331L292 330L299 340L265 345L244 328L229 290L221 280L206 274L166 263L150 241L160 220L188 191L194 179L203 120L215 98L244 71L290 46L302 37Z';

/**
 * Un trazado por corte. A diferencia de la res, donde el osobuco son cinco
 * regiones bajo un id, acá ninguno tiene más de una: la lámina no parte ningún
 * corte en dos. El tipo queda igual —una lista— para que el componente que los
 * dibuja sea el mismo para los dos animales.
 */
export const REGIONES_DE_CORTE: Record<string, readonly string[]> = {
  cabeza: [
    'M530 211L526 216L520 219L479 230L419 256L365 284L318 319L310 322L303 322L288 324L268 337L262 336L255 322L247 291L238 277L212 260L165 249L160 243L159 237L190 214L204 194L209 179L215 123L220 108L226 103L248 94L262 68L285 67L300 62L324 30L338 31L358 43L389 36L395 38L399 44L401 76L410 90L440 116L499 157L523 189Z'
  ],
  cuello: [
    'M535 217L637 317L716 366L715 376L704 393L682 419L653 450L606 492L583 509L557 524L549 528L537 531L519 544L510 542L500 544L422 574L393 583L357 591L307 599L290 599L282 595L279 571L280 475L267 403L269 380L278 360L311 328L311 323L313 320L328 307L403 265L500 221L520 216Z'
  ],
  espinazo: [
    'M1407 403L1414 405L1418 410L1438 449L1461 477L1461 480L1458 485L1436 497L1375 516L1262 543L1202 554L1087 567L972 591L932 602L902 612L879 623L862 639L855 640L846 639L814 627L783 611L730 581L682 556L641 533L606 502L604 492L610 481L656 445L700 389L724 368L849 395L934 394L971 399L1045 419L1088 421L1133 418L1177 410L1306 377L1346 373L1380 382Z'
  ],
  rabadilla: [
    'M1691 669L1688 674L1678 673L1659 666L1631 652L1578 619L1558 604L1547 593L1546 589L1549 581L1573 545L1580 526L1587 491L1589 468L1588 456L1584 448L1580 445L1574 444L1555 446L1485 477L1466 482L1459 478L1451 469L1427 434L1414 408L1413 403L1416 398L1423 341L1451 292L1498 255L1703 158L1753 140L1799 140L1839 158L1909 210L1930 239L1936 280L1931 332L1916 388L1893 444L1864 498L1831 551L1793 597L1745 636Z'
  ],
  pechuga: [
    'M613 498L689 552L715 572L735 584L757 595L789 606L821 618L852 634L857 641L857 647L851 655L830 678L825 690L822 703L818 741L818 785L821 806L829 829L830 843L827 856L823 859L816 859L780 839L736 809L704 781L663 740L633 707L610 679L592 653L553 589L521 551L519 545L522 542L574 516L593 499L603 496Z'
  ],
  pecho: [
    'M843 869L872 907L875 920L870 932L854 947L842 954L835 953L811 971L790 992L755 1047L736 1068L712 1074L685 1064L632 1025L541 938L435 869L386 829L366 806L350 779L300 662L290 634L285 604L289 600L294 598L332 596L393 584L425 574L500 545L510 543L517 544L525 551L540 574L583 643L605 675L634 710L677 755L729 803L774 838L795 851L809 857L813 858L824 856L828 857Z'
  ],
  ala: [
    'M1427 721L1384 763L1369 776L1361 779L1355 783L1319 818L1301 834L1264 860L1227 884L1187 908L1160 921L1150 925L1125 929L1078 948L1052 952L1018 954L979 953L953 950L927 944L896 932L878 922L863 908L835 871L830 859L830 831L822 806L820 788L819 738L824 698L832 675L845 655L864 635L885 620L905 612L936 601L1025 581L1099 567L1242 548L1322 531L1423 503L1443 495L1461 481L1470 482L1478 481L1558 447L1571 444L1579 445L1585 451L1589 464L1587 481L1581 517L1574 540L1548 580L1544 595L1524 620Z'
  ],
  contramuslo: [
    'M1694 681L1694 718L1686 755L1631 863L1610 897L1585 929L1528 985L1459 1035L1422 1054L1394 1057L1381 1040L1384 1004L1397 920L1395 880L1388 843L1383 842L1382 839L1382 801L1371 786L1369 780L1372 770L1381 756L1426 712L1494 652L1508 637L1533 602L1540 596L1546 593L1554 596L1571 615L1607 640L1631 652L1679 669L1687 674Z'
  ],
  muslo: [
    'M1378 847L1370 870L1368 1000L1360 1051L1349 1089L1325 1134L1286 1186L1257 1212L1221 1229L1212 1237L1208 1249L1209 1261L1220 1299L1232 1322L1241 1330L1253 1335L1294 1339L1302 1344L1301 1349L1292 1353L1251 1354L1239 1358L1228 1365L1188 1401L1180 1401L1179 1395L1190 1371L1189 1362L1181 1358L1168 1359L1141 1368L1128 1368L1122 1364L1124 1357L1134 1350L1174 1340L1185 1333L1193 1324L1197 1312L1196 1299L1178 1249L1162 1231L1125 1219L1091 1199L1082 1190L1064 1161L1056 1161L1045 1168L1026 1187L1005 1202L906 1232L884 1246L876 1256L863 1293L857 1331L863 1356L892 1385L897 1392L893 1397L884 1395L852 1370L840 1364L828 1364L817 1369L788 1394L785 1392L782 1371L774 1364L762 1361L707 1363L699 1360L699 1355L709 1350L788 1338L812 1330L832 1314L849 1279L855 1253L854 1241L847 1231L805 1199L780 1170L756 1124L752 1099L754 1086L766 1063L833 984L842 961L843 954L851 941L867 925L876 921L883 921L892 925L922 943L942 950L962 953L995 955L1027 955L1055 953L1078 949L1125 930L1158 923L1209 896L1256 866L1298 837L1316 822L1352 785L1364 777L1369 778L1374 782L1382 804L1384 819L1383 835L1382 842Z'
  ],
};

/**
 * Centroide de cada corte: es el ancla de la tarjeta cuando el foco llega por
 * teclado y no hay puntero del que colgarse.
 */
export const CENTROS_DE_CORTE: Record<
  string,
  readonly (readonly [number, number])[]
> = {
  cabeza: [[334, 178]],
  cuello: [[461, 408]],
  espinazo: [[1010, 481]],
  rabadilla: [[1698, 379]],
  pechuga: [[703, 664]],
  pecho: [[564, 808]],
  ala: [[1163, 713]],
  contramuslo: [[1521, 824]],
  muslo: [[1080, 1086]],
};
