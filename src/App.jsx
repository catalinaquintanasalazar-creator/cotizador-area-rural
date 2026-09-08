import React, { useState, useMemo } from "react";

// ---------------------------------------------------------------------------
// Catálogo real de APUs de Área Rural S.A.S. (extraído de tu Excel de enero
// 2026, 16 capítulos, 252 actividades con precio unitario ya calculado).
// Más adelante esto puede leerse en vivo de tu Google Sheet en vez de venir
// embebido aquí.
// ---------------------------------------------------------------------------
const CATALOGO = [{"id": 1, "capitulo": "Preeliminares", "item": "1.1", "actividad": "CERRAMIENTO PROVISIONAL", "unidad": "ML", "precio_unitario": 25800.0}, {"id": 2, "capitulo": "Preeliminares", "item": "1.2", "actividad": "CAMPAMENTO PROVISONAL", "unidad": "GL", "precio_unitario": 8103859}, {"id": 3, "capitulo": "Preeliminares", "item": "1.3", "actividad": "RED ELECTRICA PROVISIONAL", "unidad": "GL", "precio_unitario": 18669900}, {"id": 4, "capitulo": "Preeliminares", "item": "1.4", "actividad": "RED DE AGUA PROVISIONAL", "unidad": "GL", "precio_unitario": 4000000}, {"id": 5, "capitulo": "Mov. De Tierra", "item": "2.1", "actividad": "EXCAVACION MECANICA (RETRO EXCAVADORA)", "unidad": "HORA", "precio_unitario": 150000}, {"id": 6, "capitulo": "Mov. De Tierra", "item": "2.2", "actividad": "CARGUE Y RETIRO DE MATERIAL", "unidad": "DIA", "precio_unitario": 400000}, {"id": 7, "capitulo": "Mov. De Tierra", "item": "2.3", "actividad": "RELLENO EN RECEBO (EXTENDIDO Y COMPACTADO)", "unidad": "M3", "precio_unitario": 208274.0}, {"id": 8, "capitulo": "Mov. De Tierra", "item": "2.4", "actividad": "FILTRO EN GRAVA Y GEOTEXTIL", "unidad": "ML", "precio_unitario": 146482.0}, {"id": 9, "capitulo": "Mov. De Tierra", "item": "2.5", "actividad": "EXCAVACION MANUAL (ARCILLA)", "unidad": "M3", "precio_unitario": 60448.0}, {"id": 10, "capitulo": "Mov. De Tierra", "item": "2.5", "actividad": "EXCAVACION MANUAL (ARCILLA)", "unidad": "ML", "precio_unitario": 19089}, {"id": 11, "capitulo": "Mov. De Tierra", "item": "2.5", "actividad": "EXCAVACION MANUAL (COMÚN TIERRA)", "unidad": "M3", "precio_unitario": 39451.0}, {"id": 12, "capitulo": "Mov. De Tierra", "item": "2.5", "actividad": "EXCAVACION MANUAL (ROCOSA)", "unidad": "M3", "precio_unitario": 75402.0}, {"id": 13, "capitulo": "Mov. De Tierra", "item": "2.6", "actividad": "CONTROL DE EXCAVACION (CON EQUIPOS)", "unidad": "DIA", "precio_unitario": 412400}, {"id": 14, "capitulo": "Mov. De Tierra", "item": "2.7", "actividad": "RETIRO SOBRANTES DE TIERRA", "unidad": "M3", "precio_unitario": 15812.0}, {"id": 15, "capitulo": "Cimentacion", "item": "3.1", "actividad": "EXCAVACION MANUAL (ARCILLA) ZAPATAS", "unidad": "M3", "precio_unitario": 60448.0}, {"id": 16, "capitulo": "Cimentacion", "item": "3.2", "actividad": "CIMENTACION CICLOPEA (70% CONCRETO - 30% PIEDRA)", "unidad": "M3", "precio_unitario": 690845.0}, {"id": 17, "capitulo": "Cimentacion", "item": "3.3", "actividad": "ZAPATA EN CONCRETO COMUN 3000 PSI (SIN HIERRO)", "unidad": "M3", "precio_unitario": 212816.0}, {"id": 18, "capitulo": "Cimentacion", "item": "3.3", "actividad": "ZAPATA EN CONCRETO COMUN 3500 PSI (SIN HIERRO)", "unidad": "M3", "precio_unitario": 1107494.0}, {"id": 19, "capitulo": "Cimentacion", "item": "3.4", "actividad": "CONCRETO DE LIMPIEZA", "unidad": "M3", "precio_unitario": 687462.0}, {"id": 20, "capitulo": "Cimentacion", "item": "3.4", "actividad": "CONCRETO DE LIMPIEZA", "unidad": "ML", "precio_unitario": 27948}, {"id": 21, "capitulo": "Cimentacion", "item": "3.5", "actividad": "VIGAS DE CIMENTACION - CONCRETO 3000 PSI", "unidad": "M3", "precio_unitario": 1294816.0}, {"id": 22, "capitulo": "Cimentacion", "item": "3.5", "actividad": "VIGAS DE CIMENTACION - CONCRETO 3500 PSI", "unidad": "M3", "precio_unitario": 1338230.0}, {"id": 23, "capitulo": "Cimentacion", "item": "3.5", "actividad": "VIGAS DE CIMENTACION - CONCRETO 3000 PSI", "unidad": "ML", "precio_unitario": 186481.0}, {"id": 24, "capitulo": "Cimentacion", "item": "3.6", "actividad": "RETIRO SOBRANTES DE TIERRA", "unidad": "M3", "precio_unitario": 15812.0}, {"id": 25, "capitulo": "Cimentacion", "item": "3.7", "actividad": "PLACA DE CONTRA PISO - CONCRETO 3000 PSI - ESP: 10CM", "unidad": "M2", "precio_unitario": 139984.0}, {"id": 26, "capitulo": "Cimentacion", "item": "3.7", "actividad": "FORMALETA PLACA DE CONTRA PISO", "unidad": "M2", "precio_unitario": 133365.0}, {"id": 27, "capitulo": "Cimentacion", "item": "3.7", "actividad": "FORMALETA PLACA DE CONTRA PISO", "unidad": "M2", "precio_unitario": 84997.0}, {"id": 28, "capitulo": "Cimentacion", "item": "3.8", "actividad": "REPLANTEO - PRIMER NIVEL", "unidad": "M2", "precio_unitario": 4454.0}, {"id": 29, "capitulo": "Cimentacion", "item": "3.9", "actividad": "ALQUILER DE EQUIPO", "unidad": "DIA", "precio_unitario": 200000.0}, {"id": 30, "capitulo": "Estru. En Concreto", "item": "4.1", "actividad": "REPLANTEO -SEGUNDO NIVEL", "unidad": "M2", "precio_unitario": 4454.0}, {"id": 31, "capitulo": "Estru. En Concreto", "item": "4.2", "actividad": "COLUMNAS EN CONCRETO - 3500 PSI", "unidad": "M3", "precio_unitario": 1391446.0}, {"id": 32, "capitulo": "Estru. En Concreto", "item": "4.2", "actividad": "COLUMNAS EN CONCRETO - 3000 PSI", "unidad": "M3", "precio_unitario": 1354458.0}, {"id": 33, "capitulo": "Estru. En Concreto", "item": "4.2", "actividad": "COLUMNAS EN CONCRETO - 3000 PSI", "unidad": "ML", "precio_unitario": 148701.0}, {"id": 34, "capitulo": "Estru. En Concreto", "item": "4.3", "actividad": "PLACA DE ENTREPISO - CASETON EN ICOPOR ESP: 12 CM - CONCRETO 3000 PSI", "unidad": "M2", "precio_unitario": 235883.0}, {"id": 35, "capitulo": "Estru. En Concreto", "item": "4.3", "actividad": "PLACA DE ENTREPISO MACIZA  ESP: 15 CM - CONCRETO 3000 PSI", "unidad": "M2", "precio_unitario": 261815.0}, {"id": 36, "capitulo": "Estru. En Concreto", "item": "4.3", "actividad": "PLACA DE ENTREPISO - METALDECK 2 ESP: 10 CM - CONCRETO 3000 PSI", "unidad": "M2", "precio_unitario": 209706.0}, {"id": 37, "capitulo": "Estru. En Concreto", "item": "4.4", "actividad": "PLACA FACIL BLOQUELON", "unidad": "M2", "precio_unitario": 198948.0}, {"id": 38, "capitulo": "Estru. En Concreto", "item": "4.4", "actividad": "VIGAS DE ENTREPISO - 3000 PSI", "unidad": "M3", "precio_unitario": 1277994.0}, {"id": 39, "capitulo": "Estru. En Concreto", "item": "4.4", "actividad": "VIGAS DE ENTREPISO - 3500 PSI", "unidad": "M3", "precio_unitario": 1194278.0}, {"id": 40, "capitulo": "Estru. En Concreto", "item": "4.4", "actividad": "VIGAS DE ENTREPISO", "unidad": "ML", "precio_unitario": 207967.0}, {"id": 41, "capitulo": "Estru. En Concreto", "item": "4.5", "actividad": "PLACA DE CUBIERTA - CASETON EN ICOPOR ESP: 10 CM - CONCRETO 3000 PSI", "unidad": "M2", "precio_unitario": 233525.0}, {"id": 42, "capitulo": "Estru. En Concreto", "item": "4.5", "actividad": "PLACA DE CUBIERTA - CASETON EN ICOPOR ESP: 10 CM - CONCRETO 3500 PSI", "unidad": "M2", "precio_unitario": 224541.0}, {"id": 43, "capitulo": "Estru. En Concreto", "item": "4.5", "actividad": "PLACA DE CUBIERTA MACIZA  ESP: 15 CM - CONCRETO 3000 PSI", "unidad": "M2", "precio_unitario": 269901.0}, {"id": 44, "capitulo": "Estru. En Concreto", "item": "4.5", "actividad": "PLACA DE CUBIERTA - METALDECK 2 ESP: 10 CM - CONCRETO 3000 PSI", "unidad": "M2", "precio_unitario": 236116.0}, {"id": 45, "capitulo": "Estru. En Concreto", "item": "4.6", "actividad": "VIGAS DE CUBIERTA - CONCRETO 3000 PSI", "unidad": "M3", "precio_unitario": 1284114.0}, {"id": 46, "capitulo": "Estru. En Concreto", "item": "4.6", "actividad": "VIGAS DE CUBIERTA - CONCRETO 3500 PSI", "unidad": "M3", "precio_unitario": 1326946.0}, {"id": 47, "capitulo": "Estru. En Concreto", "item": "4.6", "actividad": "VIGAS DE CUBIERTA - CONCRETO 3000 PSI", "unidad": "ML", "precio_unitario": 207967.0}, {"id": 48, "capitulo": "Estru. En Concreto", "item": "4.7", "actividad": "MUROS EN CONCRETO 3000 PSI - ESP: 10 CM", "unidad": "M2", "precio_unitario": 266979.0}, {"id": 49, "capitulo": "Estru. En Concreto", "item": "4.7", "actividad": "MUROS EN CONCRETO 3000 PSI - ESP: 10 CM", "unidad": "M3", "precio_unitario": 1281417.0}, {"id": 50, "capitulo": "Estru. En Concreto", "item": "4.8", "actividad": "TRASIEGO - MANEJO DE FORMALETA", "unidad": "M2 - ML", "precio_unitario": 24240.0}, {"id": 51, "capitulo": "Estru. En Concreto", "item": "4.9", "actividad": "ALQUILER DE EQUIPO", "unidad": "DIA", "precio_unitario": 400000.0}, {"id": 52, "capitulo": "Estru. En Concreto", "item": "4.10", "actividad": "MURO EN CONCRETO ESP. 10CM", "unidad": "ML", "precio_unitario": 222043.0}, {"id": 53, "capitulo": "Mamposteria", "item": "5.1", "actividad": "MURO EN LADRILLO ESTRUCTURAL - GRAN FORMATO -  5CM", "unidad": "M2", "precio_unitario": 218295.0}, {"id": 54, "capitulo": "Mamposteria", "item": "5.1", "actividad": "MURO EN LADRILLO ESTRUCTURAL - GRAN FORMATO - 3CM", "unidad": "M2", "precio_unitario": 355188.0}, {"id": 55, "capitulo": "Mamposteria", "item": "5.1", "actividad": "MURO EN LADRILLO ESTRUCTURAL - GRAN FORMATO - 6CM", "unidad": "M2", "precio_unitario": 201662.0}, {"id": 56, "capitulo": "Mamposteria", "item": "5.2", "actividad": "MURO EN LADRILLO ESTRUCTURAL - GRAN FORMATO - 5CM", "unidad": "ML", "precio_unitario": 132774.0}, {"id": 57, "capitulo": "Mamposteria", "item": "5.2", "actividad": "MURO EN LADRILLO ESTRUCTURAL - GRAN FORMATO- 3CM", "unidad": "ML", "precio_unitario": 208010.0}, {"id": 58, "capitulo": "Mamposteria", "item": "5.1", "actividad": "MURO EN LADRILLO ESTRUCTURAL - GRAN FORMATO - 6CM", "unidad": "ML", "precio_unitario": 153530.0}, {"id": 59, "capitulo": "Mamposteria", "item": "5.2", "actividad": "MURO EN LADRILLO TOLETE COMÚN", "unidad": "M2", "precio_unitario": 147470.0}, {"id": 60, "capitulo": "Mamposteria", "item": "5.3", "actividad": "ENCHAPE EN LADRILLO ESTRUCTURAL - GRAN FORMATO - 5CM", "unidad": "ML", "precio_unitario": 110607.0}, {"id": 61, "capitulo": "Mamposteria", "item": "5.3", "actividad": "ENCHAPE EN LADRILLO ESTRUCTURAL - GRAN FORMATO - 5CM", "unidad": "M2", "precio_unitario": 202125.0}, {"id": 62, "capitulo": "Mamposteria", "item": "5.3", "actividad": "ENCHAPE EN LADRILLO ESTRUCTURAL - GRAN FORMATO- 3CM", "unidad": "ML", "precio_unitario": 167028.0}, {"id": 63, "capitulo": "Mamposteria", "item": "5.3", "actividad": "ENCHAPE EN LADRILLO ESTRUCTURAL - GRAN FORMATO - 3CM", "unidad": "M2", "precio_unitario": 297174.0}, {"id": 64, "capitulo": "Mamposteria", "item": "5.3", "actividad": "ENCHAPE  EN LADRILLO ESTRUCTURAL - GRAN FORMATO - 6CM", "unidad": "ML", "precio_unitario": 115148.0}, {"id": 65, "capitulo": "Mamposteria", "item": "5.4", "actividad": "MURO EN BLOQUE Nº 5", "unidad": "M2", "precio_unitario": 56112.0}, {"id": 66, "capitulo": "Mamposteria", "item": "5.4", "actividad": "MURO EN BLOQUE Nº 4", "unidad": "M2", "precio_unitario": 56112.0}, {"id": 67, "capitulo": "Mamposteria", "item": "5.4", "actividad": "MURO EN BLOQUE ESTRUCTURAL - PARED DOBLE 33 X 23 X 12", "unidad": "M2", "precio_unitario": 81291.0}, {"id": 68, "capitulo": "Mamposteria", "item": "5.5", "actividad": "MURO EN BLOQUE Nº 5", "unidad": "ML", "precio_unitario": 41175.0}, {"id": 69, "capitulo": "Mamposteria", "item": "5.5", "actividad": "MURO EN BLOQUE Nº 4", "unidad": "ML", "precio_unitario": 40094.0}, {"id": 70, "capitulo": "Mamposteria", "item": "5.5", "actividad": "MURO EN BLOQUE ESTRUCTURAL - PARED DOBLE 33 X 23 X 12", "unidad": "ML", "precio_unitario": 58868.0}, {"id": 71, "capitulo": "Mamposteria", "item": "5.6", "actividad": "MUROS EN PIEDRA LABOR", "unidad": "M2", "precio_unitario": 209181.0}, {"id": 72, "capitulo": "Mamposteria", "item": "5.7", "actividad": "LIMPIEZA DE LADRILLO", "unidad": "M2", "precio_unitario": 16929.0}, {"id": 73, "capitulo": "Mamposteria", "item": "5.8", "actividad": "HIDROFUGO PARA FACHADA", "unidad": "M2", "precio_unitario": 26684.0}, {"id": 74, "capitulo": "Mamposteria", "item": "5.9", "actividad": "DINTELES (LADRILLO)", "unidad": "ML", "precio_unitario": 101182.0}, {"id": 75, "capitulo": "Mamposteria", "item": "5.9", "actividad": "MESONES EN COCNCRETO QUEDAMO - 60 CM", "unidad": "ML", "precio_unitario": 425954.0}, {"id": 76, "capitulo": "Mamposteria", "item": "5.9", "actividad": "DINTELES (BLOQUE)", "unidad": "ML", "precio_unitario": 73381.0}, {"id": 77, "capitulo": "Mamposteria", "item": "5.10", "actividad": "TRASIEGO DE MAMPOSTERIA", "unidad": "JORNAL", "precio_unitario": 95525.0}, {"id": 78, "capitulo": "Mamposteria", "item": "5.11", "actividad": "DOVELAS", "unidad": "ML", "precio_unitario": 19421.0}, {"id": 79, "capitulo": "Mamposteria", "item": "5.11", "actividad": "COLUMNETAS", "unidad": "ML", "precio_unitario": 41285.0}, {"id": 80, "capitulo": "Mamposteria", "item": "5.12", "actividad": "ANCLAJES", "unidad": "UN", "precio_unitario": 21785.0}, {"id": 81, "capitulo": "Mamposteria", "item": "5.13", "actividad": "CORTADA DE LADRILLO", "unidad": "MES", "precio_unitario": 3141379.0}, {"id": 82, "capitulo": "Mamposteria", "item": "5.14", "actividad": "ALQUILER DE EQUIPOS", "unidad": "MES", "precio_unitario": 4450000.0}, {"id": 83, "capitulo": "Mamposteria", "item": "5.15", "actividad": "ALFAJIAS EN LADRILLO GRAN FORMATO - 5CM", "unidad": "ML", "precio_unitario": 103826.0}, {"id": 84, "capitulo": "Mamposteria", "item": "5.15", "actividad": "ALFAJIAS EN LADRILLO GRAN FORMATO - 3CM", "unidad": "ML", "precio_unitario": 150141.0}, {"id": 85, "capitulo": "Mamposteria", "item": "5.15", "actividad": "ALFAJIAS LADRILLO ESTRUCTURAL - GRAN FORMATO - 6CM", "unidad": "ML", "precio_unitario": 102193.0}, {"id": 86, "capitulo": "Pañetes", "item": "6.1", "actividad": "PAÑETE LISO SOBRE MUROS 1:4 - INTERIOR", "unidad": "M2", "precio_unitario": 38003.0}, {"id": 87, "capitulo": "Pañetes", "item": "6.2", "actividad": "PAÑETE LISO SOBRE MUROS 1:4 IMPERMEABILIZADO- EXTERIOR", "unidad": "M2", "precio_unitario": 38990.0}, {"id": 88, "capitulo": "Pañetes", "item": "6.3", "actividad": "PAÑETE LISO SOBRE MUROS 1:4 - INTERIOR", "unidad": "ML", "precio_unitario": 28529.0}, {"id": 89, "capitulo": "Pañetes", "item": "6.4", "actividad": "PAÑETE LISO SOBRE MUROS 1:4 IMPERMEABILIZADO- EXTERIOR", "unidad": "ML", "precio_unitario": 29516.0}, {"id": 90, "capitulo": "Pañetes", "item": "6.1", "actividad": "PAÑETE LISO SOBRE MUROS 1:4 - INTERIOR - PREMEZCLADO", "unidad": "M2", "precio_unitario": 40871.0}, {"id": 91, "capitulo": "Pañetes", "item": "6.2", "actividad": "PAÑETE LISO SOBRE MUROS 1:4 IMPERMEABILIZADO- EXTERIOR - PREMEZCLADO", "unidad": "M2", "precio_unitario": 41858.0}, {"id": 92, "capitulo": "Pañetes", "item": "6.3", "actividad": "PAÑETE LISO SOBRE MUROS 1:4 - INTERIOR - PREMEZCLADO", "unidad": "ML", "precio_unitario": 31791.0}, {"id": 93, "capitulo": "Pañetes", "item": "6.4", "actividad": "PAÑETE LISO SOBRE MUROS 1:4 IMPERMEABILIZADO- EXTERIOR - PREMEZCLADO", "unidad": "ML", "precio_unitario": 32778.0}, {"id": 94, "capitulo": "Pañetes", "item": "6.5", "actividad": "FILOS Y DILATACIONES", "unidad": "ML", "precio_unitario": 16457.0}, {"id": 95, "capitulo": "Pañetes", "item": "6.6", "actividad": "ALISTADO DE PISO 2CM", "unidad": "M2", "precio_unitario": 33722.0}, {"id": 96, "capitulo": "Pañetes", "item": "6.6", "actividad": "ALISTADO DE PISO 4CM", "unidad": "M2", "precio_unitario": 60762.0}, {"id": 97, "capitulo": "Pañetes", "item": "6.6", "actividad": "ALISTADO DE PISO 8 CM", "unidad": "M2", "precio_unitario": 93527.0}, {"id": 98, "capitulo": "Pañetes", "item": "6.7", "actividad": "ALISTADO DE PISO 4 CM - CONCRETO", "unidad": "M2", "precio_unitario": 64081.0}, {"id": 99, "capitulo": "Red De Gas", "item": "7.1", "actividad": "Instalación, tubería y accesorios", "unidad": "UN", "precio_unitario": 292451.0}, {"id": 100, "capitulo": "Red Sanitaria", "item": "8.1.1", "actividad": "SALIDA SANITARIA LAVAMANOS 2\"", "unidad": "UN", "precio_unitario": 146912.0}, {"id": 101, "capitulo": "Red Sanitaria", "item": "8.1.2", "actividad": "SALIDA SANITARIA LAVAPLATOS 2\"", "unidad": "UN", "precio_unitario": 118512.0}, {"id": 102, "capitulo": "Red Sanitaria", "item": "8.1.3", "actividad": "SALIDA SANITARIA SIFON DE PISO 2\"", "unidad": "UN", "precio_unitario": 155626.0}, {"id": 103, "capitulo": "Red Sanitaria", "item": "8.1.4", "actividad": "SALIDA SANITARIA SIFON DE PISO DESCOLGADO 2\"", "unidad": "UN", "precio_unitario": 154569.0}, {"id": 104, "capitulo": "Red Sanitaria", "item": "8.1.5", "actividad": "SALIDA SANITARIA DUCHAS 2\"", "unidad": "UN", "precio_unitario": 154569.0}, {"id": 105, "capitulo": "Red Sanitaria", "item": "8.1.6", "actividad": "SALIDA SANITARIA LAVADERO 2\"", "unidad": "UN", "precio_unitario": 188827.0}, {"id": 106, "capitulo": "Red Sanitaria", "item": "8.1.7", "actividad": "SALIDA SANITARIA LAVADORA 2\"", "unidad": "UN", "precio_unitario": 173023.0}, {"id": 107, "capitulo": "Red Sanitaria", "item": "8.2.1", "actividad": "SALIDA SANITARIA INODORO 4\"", "unidad": "UN", "precio_unitario": 200881.0}, {"id": 108, "capitulo": "Red Sanitaria", "item": "8.3.1", "actividad": "SALIDA SANITARIA AGUAS LLUVIA 4\"", "unidad": "UN", "precio_unitario": 164528.0}, {"id": 109, "capitulo": "Red Sanitaria", "item": "8.4", "actividad": "TAPA Y MARCO CAJA INSPECCIÓN", "unidad": "UN", "precio_unitario": 171498}, {"id": 110, "capitulo": "Red Sanitaria", "item": "8.4", "actividad": "CAJAS DE INSPECCION 60 x 60 cm", "unidad": "UN", "precio_unitario": 749745.0}, {"id": 111, "capitulo": "Red Sanitaria", "item": "8.5", "actividad": "RED PRINCIPAL AGUAS GRISES 2\" - PRIMER NIVEL", "unidad": "ML", "precio_unitario": 33519.0}, {"id": 112, "capitulo": "Red Sanitaria", "item": "8.5", "actividad": "RED PRINCIPAL AGUAS GRISES 3\" - PRIMER NIVEL", "unidad": "ML", "precio_unitario": 69462.0}, {"id": 113, "capitulo": "Red Sanitaria", "item": "8.5", "actividad": "RED PRINCIPAL AGUAS GRISES 2\" - DESCOLGADO", "unidad": "ML", "precio_unitario": 68122.0}, {"id": 114, "capitulo": "Red Sanitaria", "item": "8.6", "actividad": "RED PRINCIPAL AGUAS GRISES 4\" - PRIMER NIVEL", "unidad": "ML", "precio_unitario": 65699.0}, {"id": 115, "capitulo": "Red Sanitaria", "item": "8.6", "actividad": "RED PRINCIPAL AGUAS NEGRAS 4\" - PRIMER NIVEL", "unidad": "ML", "precio_unitario": 65699.0}, {"id": 116, "capitulo": "Red Sanitaria", "item": "8.6", "actividad": "RED PRINCIPAL AGUAS NEGRAS 4\" - DESCOLGADO", "unidad": "ML", "precio_unitario": 100303.0}, {"id": 117, "capitulo": "Red Sanitaria", "item": "8.6", "actividad": "RED PRINCIPAL AGUAS NEGRAS 6\"", "unidad": "ML", "precio_unitario": 155659.0}, {"id": 118, "capitulo": "Red Sanitaria", "item": "8.7", "actividad": "RED PRINCIPAL AGUAS LLUVIAS 4\" - PRIMER NIVEL", "unidad": "ML", "precio_unitario": 56595.0}, {"id": 119, "capitulo": "Red Sanitaria", "item": "8.7", "actividad": "RED PRINCIPAL AGUAS LLUVIAS  4\" - DESCOLGADO", "unidad": "ML", "precio_unitario": 91198.0}, {"id": 120, "capitulo": "Red Sanitaria", "item": "8.7", "actividad": "RED PRINCIPAL AGUAS LLUVIAS  6\"", "unidad": "ML", "precio_unitario": 146078.0}, {"id": 121, "capitulo": "Red Sanitaria", "item": "8.8", "actividad": "RED DE VENTILACION 2\"", "unidad": "ML", "precio_unitario": 43356.0}, {"id": 122, "capitulo": "Red Sanitaria", "item": "8.9", "actividad": "SISTEMA SEPTICO", "unidad": "UN", "precio_unitario": 5161547.0}, {"id": 123, "capitulo": "Red Sanitaria", "item": "8.10", "actividad": "SISTEMA DE AGUAS JABONOSAS", "unidad": "UN", "precio_unitario": 5808803}, {"id": 124, "capitulo": "Red Sanitaria", "item": "8.11", "actividad": "TRAMPA DE GRASAS", "unidad": "UN", "precio_unitario": 732532.0}, {"id": 125, "capitulo": "Red Sanitaria", "item": "8.12", "actividad": "EXCAVACION MANUAL COMUN (TIERRA)", "unidad": "ML", "precio_unitario": 20680.0}, {"id": 126, "capitulo": "Red Hidraulica", "item": "9.1.1", "actividad": "PUNTO AGUA FRIA - LAVAMANOS", "unidad": "UN", "precio_unitario": 113128.0}, {"id": 127, "capitulo": "Red Hidraulica", "item": "9.1.2", "actividad": "PUNTO AGUA FRIA - LAVAPLATOS", "unidad": "UN", "precio_unitario": 113128.0}, {"id": 128, "capitulo": "Red Hidraulica", "item": "9.1.3", "actividad": "PUNTO AGUA FRIA - LLAVE MANGUERA EXTERIOR", "unidad": "UN", "precio_unitario": 165141.0}, {"id": 129, "capitulo": "Red Hidraulica", "item": "9.1.4", "actividad": "PUNTO AGUA FRIA - NEVERA", "unidad": "UN", "precio_unitario": 112988.0}, {"id": 130, "capitulo": "Red Hidraulica", "item": "9.1.5", "actividad": "PUNTO AGUA FRIA - INODORO", "unidad": "UN", "precio_unitario": 111620.0}, {"id": 131, "capitulo": "Red Hidraulica", "item": "9.1.6", "actividad": "PUNTO AGUA FRIA - DUCHA", "unidad": "UN", "precio_unitario": 118351.0}, {"id": 132, "capitulo": "Red Hidraulica", "item": "9.1.7", "actividad": "PUNTO AGUA FRIA - LAVADORA", "unidad": "UN", "precio_unitario": 109377.0}, {"id": 133, "capitulo": "Red Hidraulica", "item": "9.1.8", "actividad": "PUNTO AGUA FRIA - LAVADERO", "unidad": "UN", "precio_unitario": 112988.0}, {"id": 134, "capitulo": "Red Hidraulica", "item": "9.1.9", "actividad": "PUNTO AGUA FRIA - CALENTADOR", "unidad": "UN", "precio_unitario": 171924.0}, {"id": 135, "capitulo": "Red Hidraulica", "item": "9.2.1", "actividad": "PUNTO AGUA CALIENTE - LAVAMANOS", "unidad": "UN", "precio_unitario": 113863.0}, {"id": 136, "capitulo": "Red Hidraulica", "item": "9.2.2", "actividad": "PUNTO AGUA CALIENTE - LAVAPLATOS", "unidad": "UN", "precio_unitario": 114793.0}, {"id": 137, "capitulo": "Red Hidraulica", "item": "9.2.3", "actividad": "PUNTO AGUA CALIENTE - DUCHA", "unidad": "UN", "precio_unitario": 116695.0}, {"id": 138, "capitulo": "Red Hidraulica", "item": "9.2.4", "actividad": "PUNTO AGUA CALIENTE - LAVADORA", "unidad": "UN", "precio_unitario": 119041.0}, {"id": 139, "capitulo": "Red Hidraulica", "item": "9.3.1", "actividad": "RED HIDRAULICA PVCP 1\"", "unidad": "ML", "precio_unitario": 21333.0}, {"id": 140, "capitulo": "Red Hidraulica", "item": "9.3.1", "actividad": "RED HIDRAULICA PEAD POLIETILENO DE ALTA DENSIDAD", "unidad": "ML", "precio_unitario": 17354.0}, {"id": 141, "capitulo": "Red Hidraulica", "item": "9.3.2", "actividad": "RED HIDRAULICA PVCP 3/4\"", "unidad": "ML", "precio_unitario": 15536.0}, {"id": 142, "capitulo": "Red Hidraulica", "item": "9.3.4", "actividad": "RED HIDRAULICA PVCP 1/2\"", "unidad": "ML", "precio_unitario": 14233.0}, {"id": 143, "capitulo": "Red Hidraulica", "item": "9.4.1", "actividad": "RED HIDRAULICA CPVC 3/4\"", "unidad": "ML", "precio_unitario": 28537.0}, {"id": 144, "capitulo": "Red Hidraulica", "item": "9.4.1", "actividad": "RED HIDRAULICA CPVC 1/2\"", "unidad": "ML", "precio_unitario": 21276.0}, {"id": 145, "capitulo": "Red Hidraulica", "item": "9.5", "actividad": "SISTEMA DE ALMACENAMIENTO Y PRESION", "unidad": "UN", "precio_unitario": 11027381.0}, {"id": 146, "capitulo": "Red Hidraulica", "item": "9.6", "actividad": "REGISTRO POR ESPACIO", "unidad": "UN", "precio_unitario": 106223.0}, {"id": 147, "capitulo": "Red Hidraulica", "item": "9.7", "actividad": "EXCAVACION MANUAL COMUN (TIERRA)", "unidad": "M3", "precio_unitario": 27361.0}, {"id": 148, "capitulo": "Red Hidraulica", "item": "9.8", "actividad": "RETIRO SOBRANTES DE TIERRA", "unidad": "M3", "precio_unitario": 11006.0}, {"id": 149, "capitulo": "Red Electrica", "item": "10.1", "actividad": "SALIDA TOMACORRIENTE DOBLE EN MURO - MONOFASICO", "unidad": "UN", "precio_unitario": 160015.0}, {"id": 150, "capitulo": "Red Electrica", "item": "10.2", "actividad": "SALIDA TOMACORRIENTE DOBLE EN MURO - BIFASICO", "unidad": "UN", "precio_unitario": 185123.0}, {"id": 151, "capitulo": "Red Electrica", "item": "10.3", "actividad": "SALIDA LUMINARIA EN TECHO", "unidad": "UN", "precio_unitario": 185123.0}, {"id": 152, "capitulo": "Cubierta", "item": "11.1", "actividad": "SOBREPISO - PLACA DE CUBIERTAS - ESP: 8CM", "unidad": "M2", "precio_unitario": 101203.0}, {"id": 153, "capitulo": "Cubierta", "item": "11.2", "actividad": "MEDIA CAÑA - PLACA CUBIERTA", "unidad": "ML", "precio_unitario": 14635.0}, {"id": 154, "capitulo": "Cubierta", "item": "11.3", "actividad": "IMPERMEABILIZACION - CORONA", "unidad": "M2", "precio_unitario": 41891.0}, {"id": 155, "capitulo": "Cubierta", "item": "11.3", "actividad": "IMPERMEABILIZACION CUBIERTA PLANA (SIKAFill dos manos)", "unidad": "M2", "precio_unitario": 50470.0}, {"id": 156, "capitulo": "Cubierta", "item": "11.3", "actividad": "IMPERMEABILIZACION CUBIERTA PLANA (MANTO ASFALTICO - MONO CAPA)", "unidad": "M2", "precio_unitario": 58319}, {"id": 157, "capitulo": "Cubierta", "item": "11.3", "actividad": "IMPERMEABILIZACION CUBIERTA PLANA (MANTO ASFALTICO -  BICAPA)", "unidad": "M2", "precio_unitario": 105824}, {"id": 158, "capitulo": "Cubierta", "item": "11.3", "actividad": "IMPERMEABILIZACION CUBIERTA PLANA (POLIURETANO)", "unidad": "M2", "precio_unitario": 129470}, {"id": 159, "capitulo": "Cubierta", "item": "11.3", "actividad": "REGATA PERIMETRAL - 15 CM DE ALTURA", "unidad": "M2", "precio_unitario": 23269}, {"id": 160, "capitulo": "Cubierta", "item": "11.4", "actividad": "CUBIERTAS INCLINADAS - TEJA SHINGLE", "unidad": "M2", "precio_unitario": 255327.0}, {"id": 161, "capitulo": "Cubierta", "item": "11.4", "actividad": "CUBIERTAS INCLINADAS - TEJA PLANA ENGOBADO - COCOA", "unidad": "M2", "precio_unitario": 276069.0}, {"id": 162, "capitulo": "Cubierta", "item": "11.4", "actividad": "CUBIERTAS INCLINADAS - TEJA TIPO S", "unidad": "M2", "precio_unitario": 173865.0}, {"id": 163, "capitulo": "Cubierta", "item": "11.4", "actividad": "CUBIERTAS INCLINADAS - TEJA ARQUITECTONICA", "unidad": "M2", "precio_unitario": 66155.0}, {"id": 164, "capitulo": "Cubierta", "item": "11.5", "actividad": "CABALLETE", "unidad": "ML", "precio_unitario": 63806.0}, {"id": 165, "capitulo": "Cubierta", "item": "11.6", "actividad": "CUBIERTAS INCLINADAS - POLICARBONATO MACIZO - CRISTAL", "unidad": "M2", "precio_unitario": 332301.0}, {"id": 166, "capitulo": "Cubierta", "item": "11.4", "actividad": "CUBIERTAS INCLINADAS - TEJA ETERNIT numero 6", "unidad": "M2", "precio_unitario": 113368.0}, {"id": 167, "capitulo": "Cubierta", "item": "11.4", "actividad": "CUBIERTAS INCLINADAS - TEJA ETERNIT numero 6", "unidad": "M2", "precio_unitario": 86068.0}, {"id": 168, "capitulo": "Cubierta", "item": "11.4", "actividad": "CUBIERTAS INCLINADAS - teja cartabon", "unidad": "M2", "precio_unitario": 113091.0}, {"id": 169, "capitulo": "Cubierta", "item": "11.5", "actividad": "CABALLETE eternit y cartabon", "unidad": "ML", "precio_unitario": 113268.0}, {"id": 170, "capitulo": "Cubierta", "item": "11.5", "actividad": "CUBIERTA INCLINADA O PLANA - SUPER BOARD", "unidad": "M2", "precio_unitario": 97182.0}, {"id": 171, "capitulo": "Cubierta", "item": "11.6", "actividad": "CUBIERTAS INCLINADAS - POLICARBONATO ALvEOLAR  - CRISTAL", "unidad": "M2", "precio_unitario": 99014.0}, {"id": 172, "capitulo": "Cielos Rasos", "item": "12.1", "actividad": "CIELORASO DRYWALL 15 MM", "unidad": "M2", "precio_unitario": 85800}, {"id": 173, "capitulo": "Cielos Rasos", "item": "12.2", "actividad": "CIELO RASO DRYWALL 15 MM", "unidad": "ML", "precio_unitario": 51480}, {"id": 174, "capitulo": "Cielos Rasos", "item": "12.3", "actividad": "CIELO RASO DRYWALL - RH - 15 MM", "unidad": "M2", "precio_unitario": 91300}, {"id": 175, "capitulo": "Cielos Rasos", "item": "12.4", "actividad": "CIELO RASO DRYWALL - RH - 15 MM", "unidad": "ML", "precio_unitario": 54780}, {"id": 176, "capitulo": "Cielos Rasos", "item": "12.5", "actividad": "DILATACION - Z - PLASTICA", "unidad": "ML", "precio_unitario": 15000}, {"id": 177, "capitulo": "Cielos Rasos", "item": "12.6", "actividad": "CIELO RASO - SUPER BOARD", "unidad": "M2", "precio_unitario": 96800}, {"id": 178, "capitulo": "Cielos Rasos", "item": "12.7", "actividad": "CIELO RASO - SUPER BOARD", "unidad": "ML", "precio_unitario": 58080}, {"id": 179, "capitulo": "Cielos Rasos", "item": "12.8", "actividad": "CIELO RASO - DENSGLASS", "unidad": "M2", "precio_unitario": 132000}, {"id": 180, "capitulo": "Cielos Rasos", "item": "12.9", "actividad": "CIELO RASO - DENSGLASS", "unidad": "ML", "precio_unitario": 79200}, {"id": 181, "capitulo": "Cielos Rasos", "item": "12.1", "actividad": "CIELO RASO - PVC", "unidad": "M2", "precio_unitario": 60500}, {"id": 182, "capitulo": "Cielos Rasos", "item": "12.11", "actividad": "Machimbre", "unidad": "M2", "precio_unitario": 119932.0}, {"id": 183, "capitulo": "Cielos Rasos", "item": "12.12", "actividad": "Cilo razo en madera - cumaru", "unidad": "M2", "precio_unitario": 547409.0}, {"id": 184, "capitulo": "Cielos Rasos", "item": "12.13", "actividad": "Machimbre - sapan", "unidad": "M2", "precio_unitario": 172839.0}, {"id": 185, "capitulo": "Cielos Rasos", "item": "12.14", "actividad": "Bambulina", "unidad": "M2", "precio_unitario": 46548.0}, {"id": 186, "capitulo": "Cielos Rasos", "item": "12.15", "actividad": "Arkowood H:50-30", "unidad": "M2", "precio_unitario": 382806.0}, {"id": 187, "capitulo": "Pinturas", "item": "14.1", "actividad": "VINILO SOBRE PAÑETE - DOS MANOS", "unidad": "M2", "precio_unitario": 18664.0}, {"id": 188, "capitulo": "Pinturas", "item": "14.2", "actividad": "VINILO SOBRE PAÑETE - DOS MANOS - BAÑOS Y COCINA", "unidad": "M2", "precio_unitario": 21915.0}, {"id": 189, "capitulo": "Urbanismo", "item": "15.1", "actividad": "SUB BASE GRANULAR PIEDRA RAJON ESP:15 CM", "unidad": "M3", "precio_unitario": 149500.0}, {"id": 190, "capitulo": "Urbanismo", "item": "15.2", "actividad": "RELLENO EN RECEBO (EXTENDIDO Y COMPACTADO)", "unidad": "M3", "precio_unitario": 207968.0}, {"id": 191, "capitulo": "Urbanismo", "item": "15.3", "actividad": "BORDILLO 10 X 20 - FUNDIDO EN SITIO", "unidad": "ML", "precio_unitario": 77888.0}, {"id": 192, "capitulo": "Urbanismo", "item": "15.4", "actividad": "CAÑUELA CONCRETO 0,2 X 0,12 M", "unidad": "ML", "precio_unitario": 74216.0}, {"id": 193, "capitulo": "Urbanismo", "item": "15.5", "actividad": "ADOQUÍN", "unidad": "M2", "precio_unitario": 107503.0}, {"id": 194, "capitulo": "Urbanismo", "item": "15.6", "actividad": "SALADOS EN CONCRETO", "unidad": "M2", "precio_unitario": 217867.0}, {"id": 195, "capitulo": "Urbanismo", "item": "15.7", "actividad": "LADRILLO RUSTICO OSCURO", "unidad": "M2", "precio_unitario": 102454.0}, {"id": 196, "capitulo": "Urbanismo", "item": "15.8", "actividad": "GAVIONES EN PIEDRA RAJON", "unidad": "UN", "precio_unitario": 899905.0}, {"id": 197, "capitulo": "Urbanismo", "item": "15.9", "actividad": "EXTENDIDA DE GRAVILLA MANUAL", "unidad": "M2", "precio_unitario": 34660.0}, {"id": 198, "capitulo": "Acabados", "item": "1.1", "actividad": "ENCHAPE EN PORCELANATO, CERAMICA (CON MATERIALES)", "unidad": "M2", "precio_unitario": 88616.0}, {"id": 199, "capitulo": "Acabados", "item": "1.2", "actividad": "ENCHAPE EN PORCELANATO, CERAMICA (SIN MATERIALES)", "unidad": "M2", "precio_unitario": 60448.0}, {"id": 200, "capitulo": "Acabados", "item": "1.3", "actividad": "ENCHAPE EN PORCELANATO, CERAMICA (CON MATERIALES)", "unidad": "ML", "precio_unitario": 64440.0}, {"id": 201, "capitulo": "Acabados", "item": "1.4", "actividad": "ENCHAPE EN PORCELANATO, CERAMICA (SIN MATERIALES)", "unidad": "ML", "precio_unitario": 44541}, {"id": 202, "capitulo": "Acabados", "item": "1.5", "actividad": "Biselado en enchape", "unidad": "ML", "precio_unitario": 34996.0}, {"id": 203, "capitulo": "Acabados", "item": "1.6", "actividad": "TABLETA ARTESANAL 50 X 50 X 3- TONO CLARO", "unidad": "M2", "precio_unitario": 135408.0}, {"id": 204, "capitulo": "Acabados", "item": "1.7", "actividad": "APLICACION GAVILLA LAVADA", "unidad": "M2", "precio_unitario": 113648.0}, {"id": 205, "capitulo": "Acabados", "item": "1.7", "actividad": "Guarda escobas en pino", "unidad": "M2", "precio_unitario": 36859.0}, {"id": 206, "capitulo": "Acabados", "item": "1.7", "actividad": "Guarda escobas en pino", "unidad": "M2", "precio_unitario": 39600}, {"id": 207, "capitulo": "Acabados", "item": "2.1", "actividad": "Instalacion - Sanitario", "unidad": "UN", "precio_unitario": 193148.0}, {"id": 208, "capitulo": "Acabados", "item": "2.2", "actividad": "Instalacion - Lavamanos", "unidad": "UN", "precio_unitario": 273052.0}, {"id": 209, "capitulo": "Acabados", "item": "2.3", "actividad": "Instalacion - Lavaplatos", "unidad": "UN", "precio_unitario": 273052.0}, {"id": 210, "capitulo": "Acabados", "item": "2.4", "actividad": "Instalacion - Duchas ( pomas) con proyeccion de red", "unidad": "UN", "precio_unitario": 318156.0}, {"id": 211, "capitulo": "Acabados", "item": "2.5", "actividad": "Instalacion - Accesorios baño", "unidad": "UN", "precio_unitario": 124351.0}, {"id": 212, "capitulo": "Acabados", "item": "2.6", "actividad": "Instalaciones servicios Lavadero", "unidad": "UN", "precio_unitario": 249322.0}, {"id": 213, "capitulo": "Acabados", "item": "2.7", "actividad": "Instalaciones calentadores con registros (Con materiales)", "unidad": "UN", "precio_unitario": 413595}, {"id": 214, "capitulo": "Acabados", "item": "2.8", "actividad": "Sifon de piso", "unidad": "UN", "precio_unitario": 109909.0}, {"id": 215, "capitulo": "Acabados", "item": "2.9", "actividad": "Tapas de registro", "unidad": "UN", "precio_unitario": 54254.0}, {"id": 216, "capitulo": "Acabados", "item": "2.10", "actividad": "Rejillas de ventilación", "unidad": "UN", "precio_unitario": 63693}, {"id": 217, "capitulo": "Acabados", "item": "2.11", "actividad": "Rejillas tipo mazorca", "unidad": "UN", "precio_unitario": 85759.0}, {"id": 218, "capitulo": "Acabados", "item": "2.12", "actividad": "llave de jardin con machon en concreto", "unidad": "UN", "precio_unitario": 189941.0}, {"id": 219, "capitulo": "Acabados", "item": "2.13", "actividad": "Instalacion lavadora", "unidad": "UN", "precio_unitario": 306442.0}, {"id": 220, "capitulo": "Acabados", "item": "3.1", "actividad": "Instalacion secadora", "unidad": "UN", "precio_unitario": 347340}, {"id": 221, "capitulo": "Acabados", "item": "3.2", "actividad": "Instalaciones aparatos electricos", "unidad": "UN", "precio_unitario": 300000}, {"id": 222, "capitulo": "Acabados", "item": "3.3", "actividad": "Instalaciones tomas corrientes, datos, tv, GFCI, sonido", "unidad": "UN", "precio_unitario": 13892.0}, {"id": 223, "capitulo": "Acabados", "item": "3.3", "actividad": "Instalaciones tomas corrientes de piso", "unidad": "UN", "precio_unitario": 37044}, {"id": 224, "capitulo": "Acabados", "item": "3.4", "actividad": "Instalaciones interruptores", "unidad": "UN", "precio_unitario": 18522}, {"id": 225, "capitulo": "Acabados", "item": "3.5", "actividad": "Instalaciones  interruptores dimer y sensor", "unidad": "UN", "precio_unitario": 25468.0}, {"id": 226, "capitulo": "Acabados", "item": "3.6", "actividad": "Perforaciones de cielos rasos", "unidad": "UN", "precio_unitario": 9261}, {"id": 227, "capitulo": "Acabados", "item": "3.7", "actividad": "Instalacion luminaria - bala de embeber", "unidad": "UN", "precio_unitario": 16207.0}, {"id": 228, "capitulo": "Acabados", "item": "3.8", "actividad": "Instalacion luminaria - descolgada", "unidad": "UN", "precio_unitario": 46305}, {"id": 229, "capitulo": "Acabados", "item": "3.9", "actividad": "Instalacion luminaria - aplique  interno", "unidad": "UN", "precio_unitario": 18522}, {"id": 230, "capitulo": "Acabados", "item": "3.10", "actividad": "Instalacion aplique exterior", "unidad": "UN", "precio_unitario": 46305}, {"id": 231, "capitulo": "Acabados", "item": "3.11", "actividad": "Instalacion - cinta led", "unidad": "ML", "precio_unitario": 23152.0}, {"id": 232, "capitulo": "Acabados", "item": "3.12", "actividad": "Instalacion luminaria - reflector exterior", "unidad": "UN", "precio_unitario": 39359.0}, {"id": 233, "capitulo": "Acabados", "item": "3.13", "actividad": "Instalacion luminaria - Balas de piso o pared embebidas", "unidad": "UN", "precio_unitario": 46305}, {"id": 234, "capitulo": "Acabados", "item": "3.14", "actividad": "Instalacion luminaria - poste de iluminacion", "unidad": "UN", "precio_unitario": 50936.0}, {"id": 235, "capitulo": "Acabados", "item": "4.1", "actividad": "Pintura terminado exterior", "unidad": "M2", "precio_unitario": 18131.0}, {"id": 236, "capitulo": "Acabados", "item": "4.2", "actividad": "Sellante machimbre", "unidad": "M2", "precio_unitario": 27070.0}, {"id": 237, "capitulo": "Acabados", "item": "4.2", "actividad": "Sellante vigas de madera", "unidad": "M2", "precio_unitario": 27070.0}, {"id": 238, "capitulo": "Acabados", "item": "4.3", "actividad": "Impermeabilizacion de vigas de cimientos", "unidad": "M2", "precio_unitario": 16283.0}, {"id": 239, "capitulo": "Acabados", "item": "5.1", "actividad": "Chimeneas - buitron y campana", "unidad": "M2", "precio_unitario": 436384.0}, {"id": 240, "capitulo": "Acabados", "item": "5.2", "actividad": "Flanches - cubiertas inclinadas", "unidad": "ML", "precio_unitario": 57642.0}, {"id": 241, "capitulo": "Acabados", "item": "5.2", "actividad": "Puertas calentadores", "unidad": "M2", "precio_unitario": 1579.0}, {"id": 242, "capitulo": "Acabados", "item": "6.1", "actividad": "Jornales de aseo y limpieza  (2021)", "unidad": "DIA", "precio_unitario": 110000}, {"id": 243, "capitulo": "Acabados", "item": "6.2", "actividad": "Jornales de aseo y limpieza  (2022)", "unidad": "DIA", "precio_unitario": 125000}, {"id": 244, "capitulo": "Acabados", "item": "6.3", "actividad": "Manejo de escombro", "unidad": "M2", "precio_unitario": 280000}, {"id": 245, "capitulo": "Acabados", "item": "7.1", "actividad": "Cárcamo en concreto", "unidad": "ML", "precio_unitario": 197815.0}, {"id": 246, "capitulo": "Acabados", "item": "7.2", "actividad": "Impermeabilización", "unidad": "ML", "precio_unitario": 38734.0}, {"id": 247, "capitulo": "Acabados", "item": "7.3", "actividad": "Rejilla c6 x 4 aluminio cúpula", "unidad": "ML", "precio_unitario": 83669.0}, {"id": 248, "capitulo": "Acabados", "item": "15.6", "actividad": "ADOQUÍN", "unidad": "M2", "precio_unitario": 129440.0}, {"id": 249, "capitulo": "Acabados Especiales", "item": "7.1", "actividad": "Cárcamo en concreto", "unidad": "ML", "precio_unitario": 191100.0}, {"id": 250, "capitulo": "Acabados Especiales", "item": "15.3", "actividad": "RELLENO EN RECEBO (EXTENDIDO Y COMPACTADO)", "unidad": "M3", "precio_unitario": 210120}, {"id": 251, "capitulo": "Acabados Especiales", "item": "5.9", "actividad": "MESONES EN COCNCRETO QUEDAMO - 60 CM", "unidad": "ML", "precio_unitario": 461638.0}, {"id": 252, "capitulo": "Acabados Especiales", "item": "5.9", "actividad": "MESONES EN COCNCRETO QUEDAMO - 60 CM", "unidad": "M2", "precio_unitario": 571470.0}];

const COP = (n) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(
    Math.round(n || 0)
  );

export default function CotizadorAgente() {
  const [proyecto, setProyecto] = useState({
    tipo: "Casa campestre nueva",
    m2: 220,
    ubicacion: "Sopó, Cundinamarca",
    notas: "",
  });
  const [items, setItems] = useState([]); // {id, capitulo, actividad, unidad, precio_unitario, cantidad}
  const [notaPresentacion, setNotaPresentacion] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [capituloFiltro, setCapituloFiltro] = useState("Todos");
  const [estado, setEstado] = useState("idle"); // idle | cargando | error
  const [errorMsg, setErrorMsg] = useState("");

  const capitulos = useMemo(() => ["Todos", ...Array.from(new Set(CATALOGO.map((c) => c.capitulo))).sort()], []);

  const catalogoFiltrado = useMemo(() => {
    return CATALOGO.filter((c) => {
      const matchCap = capituloFiltro === "Todos" || c.capitulo === capituloFiltro;
      const matchBusqueda = c.actividad.toLowerCase().includes(busqueda.toLowerCase());
      return matchCap && matchBusqueda;
    });
  }, [busqueda, capituloFiltro]);

  const agregarItem = (catItem) => {
    setItems((prev) => {
      if (prev.some((p) => p.id === catItem.id)) return prev;
      return [...prev, { ...catItem, cantidad: 1 }];
    });
  };

  const actualizarCantidad = (id, valor) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, cantidad: Number(valor) || 0 } : it)));
  };

  const quitarItem = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const { subtotal, imprevistos, total } = useMemo(() => {
    const sub = items.reduce((acc, it) => acc + it.cantidad * it.precio_unitario, 0);
    const imp = sub * 0.08;
    return { subtotal: sub, imprevistos: imp, total: sub + imp };
  }, [items]);

  const sugerirConIA = async () => {
    setEstado("cargando");
    setErrorMsg("");
    try {
      const catalogoLigero = CATALOGO.map((c) => ({ id: c.id, capitulo: c.capitulo, actividad: c.actividad, unidad: c.unidad }));

      const systemPrompt = `Eres el agente de cotización de obra de Área Rural S.A.S., firma de desarrollo inmobiliario campestre en Cundinamarca, Colombia. Recibes un catálogo de actividades de construcción (id, capítulo, actividad, unidad) y una descripción de un proyecto. Tu trabajo es seleccionar cuáles actividades del catálogo aplican a ese proyecto y estimar una cantidad razonable para cada una (a partir del área construida y la descripción, como lo haría un presupuestador de obra experimentado). Devuelve ÚNICAMENTE un objeto JSON (sin texto adicional, sin markdown, sin backticks) con esta forma exacta:
{
  "sugerencias": [
    {"id": number, "cantidad_estimada": number}
  ],
  "nota_presentacion": string
}
Reglas:
- Usa solo ids que existen en el catálogo que te doy.
- No incluyas actividades que claramente no apliquen al alcance descrito (ej. no incluyas red de gas si el proyecto no la menciona ni es típica en el municipio, no dupliques variantes de un mismo acabado si no se especifica cuál).
- Las cantidades son un estimado inicial sujeto a revisión con cantidades de obra reales (metrados); estímalas de forma razonable y conservadora.
- "nota_presentacion": un párrafo corto (máximo 4 frases), profesional y cálido, en español, dirigido al cliente, presentando esta propuesta de alcance para su proyecto específico. Aclara en una frase que las cantidades son un estimado preliminar sujeto a revisión de metrados. Sin frases genéricas de IA, sin emojis.`;

      const userPrompt = `Datos del proyecto:
- Tipo: ${proyecto.tipo}
- Área construida: ${proyecto.m2} m2
- Ubicación: ${proyecto.ubicacion}
- Notas / alcance: ${proyecto.notas || "No especificado, asume un alcance estándar de casa campestre nueva"}

Catálogo disponible:
${JSON.stringify(catalogoLigero)}

Selecciona las actividades aplicables y estima cantidades, en el formato JSON indicado.`;

           const response = await fetch("/api/sugerir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
  systemPrompt,
  userPrompt,
}),
      });

     const data = await response.json();
const clean = data.texto.replace(/```json|```/g, "").trim();
const parsed = JSON.parse(clean);

      const nuevosItems = parsed.sugerencias
        .map((s) => {
          const catItem = CATALOGO.find((c) => c.id === s.id);
          if (!catItem) return null;
          return { ...catItem, cantidad: Number(s.cantidad_estimada) || 0 };
        })
        .filter(Boolean);

      setItems(nuevosItems);
      setNotaPresentacion(parsed.nota_presentacion || "");
      setEstado("idle");
    } catch (err) {
      console.error(err);
      setErrorMsg("No se pudo generar la sugerencia. Intenta de nuevo.");
      setEstado("error");
    }
  };

  const descargarTxt = () => {
    let out = `COTIZACIÓN — ÁREA RURAL S.A.S.\n`;
    out += `Proyecto: ${proyecto.tipo}\nUbicación: ${proyecto.ubicacion}\nÁrea: ${proyecto.m2} m2\n\n`;
    if (notaPresentacion) out += notaPresentacion + "\n\n";
    items.forEach((it) => {
      out += `${it.actividad.padEnd(45)} ${String(it.cantidad).padStart(8)} ${it.unidad.padEnd(6)} ${COP(it.precio_unitario).padStart(14)} ${COP(it.cantidad * it.precio_unitario).padStart(16)}\n`;
    });
    out += `\nSubtotal: ${COP(subtotal)}\n`;
    out += `Imprevistos (8%): ${COP(imprevistos)}\n`;
    out += `TOTAL: ${COP(total)}\n`;
    const blob = new Blob([out], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cotizacion-${proyecto.tipo.replace(/\s+/g, "-").toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ "--ink": "#2B2823", "--paper": "#EFEAE1", "--clay": "#8B4A2E", "--slate": "#4A5A5C", "--line": "#D9D2C2" }} className="min-h-screen w-full">
      <div className="w-full min-h-screen" style={{ background: "var(--paper)", color: "var(--ink)" }}>
        <div className="max-w-7xl mx-auto px-6 py-10">
          <header className="mb-8 border-b pb-6" style={{ borderColor: "var(--line)" }}>
            <p className="text-xs tracking-wide" style={{ color: "var(--slate)" }}>Área Rural S.A.S. — Prototipo interno · Catálogo real de APUs (ene. 2026)</p>
            <h1 className="text-3xl mt-1" style={{ fontFamily: "Georgia, \'Times New Roman\', serif" }}>Agente de cotización de obra</h1>
            <p className="mt-2 text-sm max-w-2xl" style={{ color: "var(--slate)" }}>
              252 actividades reales de tus 16 capítulos de APU. Describe el proyecto y deja que el agente proponga el alcance, o arma la cotización a mano desde el catálogo.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Columna izquierda: proyecto + catálogo */}
            <div className="space-y-6">
              <section className="border rounded p-4 bg-white" style={{ borderColor: "var(--line)" }}>
                <h2 className="text-sm uppercase tracking-wide mb-3" style={{ color: "var(--clay)" }}>Datos del proyecto</h2>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <label className="block text-sm">
                      Tipo de proyecto
                      <input
                        className="mt-1 w-full border rounded px-3 py-2 text-sm"
                        style={{ borderColor: "var(--line)" }}
                        value={proyecto.tipo}
                        onChange={(e) => setProyecto({ ...proyecto, tipo: e.target.value })}
                      />
                    </label>
                    <label className="block text-sm">
                      Área construida (m2)
                      <input
                        type="number"
                        className="mt-1 w-full border rounded px-3 py-2 text-sm"
                        style={{ borderColor: "var(--line)" }}
                        value={proyecto.m2}
                        onChange={(e) => setProyecto({ ...proyecto, m2: Number(e.target.value) || 0 })}
                      />
                    </label>
                  </div>
                  <label className="block text-sm">
                    Ubicación
                    <input
                      className="mt-1 w-full border rounded px-3 py-2 text-sm"
                      style={{ borderColor: "var(--line)" }}
                      value={proyecto.ubicacion}
                      onChange={(e) => setProyecto({ ...proyecto, ubicacion: e.target.value })}
                    />
                  </label>
                  <label className="block text-sm">
                    Alcance / notas (qué incluye, qué acabados, qué NO incluir)
                    <textarea
                      className="mt-1 w-full border rounded px-3 py-2 text-sm"
                      style={{ borderColor: "var(--line)" }}
                      rows={3}
                      value={proyecto.notas}
                      onChange={(e) => setProyecto({ ...proyecto, notas: e.target.value })}
                    />
                  </label>
                </div>
                <button
                  onClick={sugerirConIA}
                  disabled={estado === "cargando"}
                  className="w-full mt-4 py-2.5 rounded text-sm font-medium"
                  style={{ background: "var(--clay)", color: "var(--paper)", opacity: estado === "cargando" ? 0.6 : 1 }}
                >
                  {estado === "cargando" ? "Analizando alcance…" : "Sugerir actividades con IA"}
                </button>
                {estado === "error" && <p className="text-sm mt-2" style={{ color: "#B3413C" }}>{errorMsg}</p>}
              </section>

              <section className="border rounded bg-white" style={{ borderColor: "var(--line)" }}>
                <div className="p-4 pb-3">
                  <h2 className="text-sm uppercase tracking-wide mb-3" style={{ color: "var(--clay)" }}>Catálogo de APUs</h2>
                  <div className="flex gap-2">
                    <input
                      className="flex-1 border rounded px-3 py-2 text-sm"
                      style={{ borderColor: "var(--line)" }}
                      placeholder="Buscar actividad…"
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <select
                      className="border rounded px-2 py-2 text-sm"
                      style={{ borderColor: "var(--line)" }}
                      value={capituloFiltro}
                      onChange={(e) => setCapituloFiltro(e.target.value)}
                    >
                      {capitulos.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="max-h-[28rem] overflow-y-auto border-t" style={{ borderColor: "var(--line)" }}>
                  {catalogoFiltrado.map((c) => {
                    const yaAgregado = items.some((it) => it.id === c.id);
                    return (
                      <div key={c.id} className="flex items-center justify-between gap-3 px-4 py-2 border-b text-sm" style={{ borderColor: "var(--line)" }}>
                        <div className="min-w-0">
                          <p className="truncate">{c.actividad}</p>
                          <p className="text-xs" style={{ color: "var(--slate)" }}>{c.capitulo} · {c.unidad} · {COP(c.precio_unitario)}</p>
                        </div>
                        <button
                          onClick={() => agregarItem(c)}
                          disabled={yaAgregado}
                          className="shrink-0 text-xs px-2.5 py-1.5 rounded border"
                          style={{ borderColor: "var(--line)", color: yaAgregado ? "var(--slate)" : "var(--clay)" }}
                        >
                          {yaAgregado ? "Agregada" : "+ Agregar"}
                        </button>
                      </div>
                    );
                  })}
                  {catalogoFiltrado.length === 0 && (
                    <p className="p-4 text-sm text-center" style={{ color: "var(--slate)" }}>Sin resultados.</p>
                  )}
                </div>
              </section>
            </div>

            {/* Columna derecha: cotización actual */}
            <div className="border rounded bg-white" style={{ borderColor: "var(--line)" }}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4 pb-4 border-b" style={{ borderColor: "var(--line)" }}>
                  <div>
                    <p className="text-xs uppercase tracking-wide" style={{ color: "var(--clay)" }}>Cotización</p>
                    <h3 className="text-xl mt-1" style={{ fontFamily: "Georgia, \'Times New Roman\', serif" }}>{proyecto.tipo}</h3>
                    <p className="text-sm" style={{ color: "var(--slate)" }}>{proyecto.ubicacion} · {proyecto.m2} m2</p>
                  </div>
                  <button onClick={descargarTxt} disabled={items.length === 0} className="text-xs px-3 py-2 border rounded shrink-0" style={{ borderColor: "var(--line)" }}>
                    Descargar
                  </button>
                </div>

                {notaPresentacion && <p className="text-sm mb-5 leading-relaxed">{notaPresentacion}</p>}

                {items.length === 0 ? (
                  <p className="text-sm text-center py-10" style={{ color: "var(--slate)" }}>
                    Agrega actividades del catálogo o usa "Sugerir actividades con IA".
                  </p>
                ) : (
                  <>
                    <table className="w-full text-sm mb-4">
                      <thead>
                        <tr className="text-left border-b" style={{ borderColor: "var(--line)" }}>
                          <th className="py-1 font-normal" style={{ color: "var(--slate)" }}>Actividad</th>
                          <th className="py-1 font-normal text-right w-20" style={{ color: "var(--slate)" }}>Cant.</th>
                          <th className="py-1 font-normal text-right" style={{ color: "var(--slate)" }}>V. unitario</th>
                          <th className="py-1 font-normal text-right" style={{ color: "var(--slate)" }}>Subtotal</th>
                          <th className="py-1 w-6"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((it) => (
                          <tr key={it.id} className="border-b" style={{ borderColor: "var(--line)" }}>
                            <td className="py-1.5 pr-2">{it.actividad} <span style={{ color: "var(--slate)" }}>({it.unidad})</span></td>
                            <td className="py-1.5">
                              <input
                                type="number"
                                className="w-full bg-transparent outline-none text-right tabular-nums"
                                value={it.cantidad}
                                onChange={(e) => actualizarCantidad(it.id, e.target.value)}
                              />
                            </td>
                            <td className="py-1.5 text-right tabular-nums">{COP(it.precio_unitario)}</td>
                            <td className="py-1.5 text-right tabular-nums">{COP(it.cantidad * it.precio_unitario)}</td>
                            <td className="py-1.5 text-right">
                              <button onClick={() => quitarItem(it.id)} style={{ color: "var(--slate)" }}>✕</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="flex flex-col items-end gap-1 text-sm">
                      <div className="flex gap-8"><span style={{ color: "var(--slate)" }}>Subtotal</span><span className="tabular-nums w-32 text-right">{COP(subtotal)}</span></div>
                      <div className="flex gap-8"><span style={{ color: "var(--slate)" }}>Imprevistos (8%)</span><span className="tabular-nums w-32 text-right">{COP(imprevistos)}</span></div>
                      <div className="flex gap-8 text-base mt-1 pt-2 border-t" style={{ borderColor: "var(--line)" }}><span>Total</span><span className="tabular-nums w-32 text-right font-medium">{COP(total)}</span></div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
