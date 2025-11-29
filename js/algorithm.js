// ==========================================
// ALGORITMO DE MATCHING IKIGAI
// ==========================================

// Normalizar respuestas a escala 0-100
function normalizarRespuesta(valor) {
    // Escala 1-5 → 0-100
    return ((valor - 1) / 4) * 100;
}

// Construir perfil del usuario desde las respuestas
function construirPerfilUsuario(respuestas) {
    const perfil = {
        pasion: {
            palabras_clave: {},
            actividades: {},
            ambientes: {},
            creatividad: 0
        },
        vocacion: {
            materias: {
                matematicas: 0,
                fisica: 0,
                quimica: 0,
                biologia: 0,
                expresion: 0
            },
            competencias: {}
        },
        profesion: {
            salario_importante: 0,
            estabilidad: 0,
            sectores: {},
            emprendimiento: 0,
            demanda: 0
        },
        mision: {
            problemas: {},
            impacto_social: 0
        }
    };

    // Procesar cada pregunta y respuesta
    questions.forEach(pregunta => {
        const respuesta = respuestas[pregunta.id];
        if (!respuesta) return;

        const valorNormalizado = normalizarRespuesta(respuesta);

        // PASIÓN
        if (pregunta.categoria === 'pasion') {
            if (pregunta.palabras_clave) {
                pregunta.palabras_clave.forEach(palabra => {
                    perfil.pasion.palabras_clave[palabra] = 
                        (perfil.pasion.palabras_clave[palabra] || 0) + valorNormalizado;
                });
            }
            if (pregunta.actividad) {
                perfil.pasion.actividades[pregunta.actividad] = valorNormalizado;
            }
            if (pregunta.ambiente) {
                perfil.pasion.ambientes[pregunta.ambiente] = valorNormalizado;
            }
            if (pregunta.atributo === 'creatividad') {
                perfil.pasion.creatividad = respuesta * 2; // Convertir 1-5 a escala 1-10
            }
        }

        // VOCACIÓN
        if (pregunta.categoria === 'vocacion') {
            if (pregunta.materia) {
                perfil.vocacion.materias[pregunta.materia] = respuesta * 2; // Escala 1-10
            }
            if (pregunta.competencia) {
                perfil.vocacion.competencias[pregunta.competencia] = valorNormalizado;
            }
        }

        // PROFESIÓN
        if (pregunta.categoria === 'profesion') {
            if (pregunta.aspecto === 'salario_alto') {
                perfil.profesion.salario_importante = valorNormalizado;
            }
            if (pregunta.aspecto === 'estabilidad') {
                perfil.profesion.estabilidad = valorNormalizado;
            }
            if (pregunta.aspecto === 'emprendimiento') {
                perfil.profesion.emprendimiento = respuesta * 2;
            }
            if (pregunta.aspecto === 'demanda') {
                perfil.profesion.demanda = valorNormalizado;
            }
            if (pregunta.sector) {
                perfil.profesion.sectores[pregunta.sector] = valorNormalizado;
            }
        }

        // MISIÓN
        if (pregunta.categoria === 'mision') {
            if (pregunta.problema) {
                perfil.mision.problemas[pregunta.problema] = valorNormalizado;
            }
            if (pregunta.aspecto === 'impacto_social') {
                perfil.mision.impacto_social = respuesta * 2;
            }
        }
    });

    return perfil;
}

// Calcular similitud entre dos valores (escala 1-10)
function calcularSimilitud(valor1, valor2) {
    const diferencia = Math.abs(valor1 - valor2);
    const maxDiferencia = 9;
    return 1 - (diferencia / maxDiferencia);
}

// Calcular compatibilidad PASIÓN
function calcularCompatibilidadPasion(perfilUsuario, carrera) {
    let scorePalabras = 0;
    let countPalabras = 0;

    // Palabras clave
    carrera.pasion.palabras_clave.forEach(palabra => {
        if (perfilUsuario.pasion.palabras_clave[palabra]) {
            scorePalabras += perfilUsuario.pasion.palabras_clave[palabra];
            countPalabras++;
        }
    });

    scorePalabras = countPalabras > 0 ? scorePalabras / countPalabras : 0;
    scorePalabras = Math.min(scorePalabras, 100);

    // Actividades
    let scoreActividades = 0;
    let countActividades = 0;

    carrera.pasion.actividades.forEach(actividad => {
        if (perfilUsuario.pasion.actividades[actividad]) {
            scoreActividades += perfilUsuario.pasion.actividades[actividad];
            countActividades++;
        }
    });

    scoreActividades = countActividades > 0 ? scoreActividades / countActividades : 0;
    scoreActividades = Math.min(scoreActividades, 100);

    // Creatividad
    const scoreCreatividad = calcularSimilitud(
        perfilUsuario.pasion.creatividad,
        carrera.pasion.nivel_creatividad
    ) * 100;

    // Ambiente
    let scoreAmbiente = 0;
    let countAmbiente = 0;

    carrera.pasion.ambientes.forEach(ambiente => {
        if (perfilUsuario.pasion.ambientes[ambiente]) {
            scoreAmbiente += perfilUsuario.pasion.ambientes[ambiente];
            countAmbiente++;
        }
    });

    scoreAmbiente = countAmbiente > 0 ? scoreAmbiente / countAmbiente : 50;

    // Promedio ponderado
    const scoreFinal = (
        scorePalabras * 0.40 +
        scoreActividades * 0.30 +
        scoreCreatividad * 0.15 +
        scoreAmbiente * 0.15
    );

    return Math.round(scoreFinal);
}

// Calcular compatibilidad VOCACIÓN
function calcularCompatibilidadVocacion(perfilUsuario, carrera) {
    let scoreAcademico = 0;
    let sumaImportancias = 0;

    // Materias académicas
    Object.keys(carrera.vocacion.materias).forEach(materia => {
        const importanciaCarrera = carrera.vocacion.materias[materia];
        const habilidadUsuario = perfilUsuario.vocacion.materias[materia];

        const diferencia = importanciaCarrera - habilidadUsuario;

        let ajuste;
        if (diferencia > 0) {
            // Carrera requiere MÁS de lo que usuario tiene
            ajuste = Math.max(0, habilidadUsuario - diferencia * 0.5);
        } else {
            // Usuario tiene MÁS de lo que carrera requiere
            ajuste = habilidadUsuario;
        }

        scoreAcademico += ajuste * importanciaCarrera;
        sumaImportancias += importanciaCarrera;
    });

    scoreAcademico = sumaImportancias > 0 ? (scoreAcademico / sumaImportancias) * 10 : 50;

    // Habilidades blandas
    let scoreBlandas = 0;
    let countBlandas = 0;

    carrera.vocacion.habilidades_blandas.forEach(competencia => {
        if (perfilUsuario.vocacion.competencias[competencia]) {
            scoreBlandas += perfilUsuario.vocacion.competencias[competencia];
            countBlandas++;
        }
    });

    scoreBlandas = countBlandas > 0 ? scoreBlandas / countBlandas : 50;

    // Promedio ponderado
    const scoreFinal = (
        scoreAcademico * 0.70 +
        scoreBlandas * 0.30
    );

    return Math.round(scoreFinal);
}

// Calcular compatibilidad PROFESIÓN
function calcularCompatibilidadProfesion(perfilUsuario, carrera) {
    // Salario
    let scoreSalario = 50;
    if (perfilUsuario.profesion.salario_importante > 70) {
        // Usuario prioriza salario alto
        if (carrera.profesion.salario_inicial >= 20000) {
            scoreSalario = 100;
        } else if (carrera.profesion.salario_inicial >= 15000) {
            scoreSalario = 75;
        } else {
            scoreSalario = 40;
        }
    } else {
        scoreSalario = 70; // No es prioridad, score neutral-positivo
    }

    // Empleabilidad
    const scoreEmpleabilidad = carrera.profesion.empleabilidad;

    // Demanda laboral
    const mapaDemanda = {
        "Baja": 25,
        "Media": 50,
        "Alta": 75,
        "Muy Alta": 100
    };
    let scoreDemanda = mapaDemanda[carrera.profesion.demanda] || 50;

    // Bonus si usuario prioriza estabilidad
    if (perfilUsuario.profesion.estabilidad > 70) {
        scoreDemanda *= 1.2;
    }
    scoreDemanda = Math.min(scoreDemanda, 100);

    // Sectores
    let scoreSectores = 0;
    let countSectores = 0;

    carrera.profesion.sectores.forEach(sector => {
        if (perfilUsuario.profesion.sectores[sector]) {
            scoreSectores += perfilUsuario.profesion.sectores[sector];
            countSectores++;
        }
    });

    scoreSectores = countSectores > 0 ? scoreSectores / countSectores : 50;

    // Emprendimiento
    const scoreEmprendimiento = calcularSimilitud(
        perfilUsuario.profesion.emprendimiento,
        carrera.profesion.emprendimiento
    ) * 100;

    // Promedio ponderado
    const scoreFinal = (
        scoreSalario * 0.35 +
        scoreEmpleabilidad * 0.25 +
        scoreDemanda * 0.20 +
        scoreSectores * 0.10 +
        scoreEmprendimiento * 0.10
    );

    return Math.round(scoreFinal);
}

// Calcular compatibilidad MISIÓN
function calcularCompatibilidadMision(perfilUsuario, carrera) {
    // Problemas que resuelve
    let scoreProblemas = 0;
    let countProblemas = 0;

    carrera.mision.problemas.forEach(problema => {
        if (perfilUsuario.mision.problemas[problema]) {
            scoreProblemas += perfilUsuario.mision.problemas[problema];
            countProblemas++;
        }
    });

    scoreProblemas = countProblemas > 0 ? scoreProblemas / countProblemas : 50;

    // Impacto social
    const scoreImpacto = calcularSimilitud(
        perfilUsuario.mision.impacto_social,
        carrera.mision.impacto_social
    ) * 100;

    // Promedio ponderado
    const scoreFinal = (
        scoreProblemas * 0.70 +
        scoreImpacto * 0.30
    );

    return Math.round(scoreFinal);
}

// Calcular IKIGAI Score final
function calcularIkigaiScore(scores) {
    const scoreBase = (
        scores.pasion * 0.25 +
        scores.vocacion * 0.25 +
        scores.profesion * 0.25 +
        scores.mision * 0.25
    );

    // Bonus por balance
    const minScore = Math.min(scores.pasion, scores.vocacion, scores.profesion, scores.mision);
    let bonusBalance = 0;

    if (minScore >= 80) {
        bonusBalance = 10;
    } else if (minScore >= 70) {
        bonusBalance = 5;
    }

    // Penalización por desbalance
    const maxScore = Math.max(scores.pasion, scores.vocacion, scores.profesion, scores.mision);
const diferenciaMaxMin = maxScore - minScore;
let penalizacion = 0;

if (diferenciaMaxMin > 40) {
    penalizacion = -5;
}

const ikigaiScore = Math.max(0, Math.min(100, scoreBase + bonusBalance + penalizacion));

return Math.round(ikigaiScore);
}

// Identificar zona de Ikigai
function identificarZonaIkigai(scores) {
const P = scores.pasion >= 70;
const V = scores.vocacion >= 70;
const PR = scores.profesion >= 70;
const M = scores.mision >= 70;
if (P && V && PR && M) return "IKIGAI_PERFECTO";
if (P && V && PR) return "PROFESION_IDEAL";
if (V && PR && M) return "VOCACION_CLARA";
if (PR && M && P) return "PROPOSITO_FUERTE";
if (M && P && V) return "MISION_INSPIRADORA";
if (P && V) return "PASION_Y_TALENTO";
if (V && PR) return "CARRERA_SOLIDA";
if (PR && M) return "IMPACTO_RENTABLE";
if (P && M) return "SUEÑO_IDEALISTA";
return "EXPLORAR_MAS";
}
// Generar explicación personalizada
function generarExplicacion(resultado) {
const scores = resultado.scores;
const zona = resultado.zona_ikigai;
const explicacion = {
    fortalezas: [],
    areas_desarrollo: [],
    consejo: ""
};

// Fortalezas
if (scores.pasion > 75) {
    explicacion.fortalezas.push("Esta carrera se alinea muy bien con tus intereses y pasiones");
}
if (scores.vocacion > 75) {
    explicacion.fortalezas.push("Tus habilidades actuales son ideales para esta carrera");
}
if (scores.profesion > 75) {
    explicacion.fortalezas.push("Ofrece excelentes oportunidades laborales y cumple tus expectativas económicas");
}
if (scores.mision > 75) {
    explicacion.fortalezas.push("Te permitirá trabajar en los problemas que te importan");
}

// Áreas de desarrollo
if (scores.pasion < 60) {
    explicacion.areas_desarrollo.push("Considera explorar más sobre los temas de esta carrera para desarrollar mayor interés");
}
if (scores.vocacion < 60) {
    explicacion.areas_desarrollo.push("Podrías necesitar fortalecer algunas habilidades académicas o técnicas");
}
if (scores.profesion < 60) {
    explicacion.areas_desarrollo.push("Las expectativas salariales o de empleabilidad podrían no cumplirse completamente");
}
if (scores.mision < 60) {
    explicacion.areas_desarrollo.push("El impacto social podría no ser tan directo como deseas");
}

// Consejo según zona
const mapaConsejos = {
    "IKIGAI_PERFECTO": "¡Excelente match! Esta carrera equilibra perfectamente todos los aspectos de tu Ikigai.",
    "PROFESION_IDEAL": "Gran opción profesional. Considera cómo puedes agregar propósito social a tu futura carrera.",
    "VOCACION_CLARA": "Tienes las habilidades y hay demanda. Busca proyectos que conecten con tus valores.",
    "PROPOSITO_FUERTE": "Tu pasión y misión están claras. Enfócate en desarrollar las habilidades técnicas necesarias.",
    "MISION_INSPIRADORA": "Tus valores y talento se alinean. Investiga las oportunidades económicas reales.",
    "PASION_Y_TALENTO": "Amas y puedes hacer esto. Asegúrate de que sea rentable y tenga impacto.",
    "CARRERA_SOLIDA": "Carrera estable y bien remunerada. Busca formas de conectarla con tus intereses.",
    "IMPACTO_RENTABLE": "Útil y rentable. Evalúa si puedes desarrollar pasión por estos temas.",
    "SUEÑO_IDEALISTA": "Tu corazón está en el lugar correcto. Desarrolla habilidades para hacerlo realidad.",
    "EXPLORAR_MAS": "Esta carrera podría funcionar, pero explora más opciones antes de decidir."
};

explicacion.consejo = mapaConsejos[zona];

return explicacion;
}
// Calcular resultados completos
function calcularResultadosCompletos(respuestas) {
const perfilUsuario = construirPerfilUsuario(respuestas);
const resultados = [];
careers.forEach(carrera => {
    const scores = {
        pasion: calcularCompatibilidadPasion(perfilUsuario, carrera),
        vocacion: calcularCompatibilidadVocacion(perfilUsuario, carrera),
        profesion: calcularCompatibilidadProfesion(perfilUsuario, carrera),
        mision: calcularCompatibilidadMision(perfilUsuario, carrera)
    };

    const ikigaiScore = calcularIkigaiScore(scores);
    const zonaIkigai = identificarZonaIkigai(scores);
    const explicacion = generarExplicacion({ scores, zona_ikigai: zonaIkigai });

    resultados.push({
        carrera: carrera,
        scores: scores,
        ikigai_score: ikigaiScore,
        zona_ikigai: zonaIkigai,
        explicacion: explicacion
    });
});

// Ordenar por Ikigai score descendente
resultados.sort((a, b) => b.ikigai_score - a.ikigai_score);

return {
    perfil_usuario: perfilUsuario,
    resultados: resultados,
    top_5: resultados.slice(0, 5)
};
}