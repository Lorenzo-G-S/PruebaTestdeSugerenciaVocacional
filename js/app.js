// ==========================================
// GESTIÓN DE LA APLICACIÓN
// ==========================================

let currentQuestionIndex = 0;
let userAnswers = {};
let testResults = null;

// Iniciar el test
function startTest() {
    document.getElementById('welcomeScreen').classList.add('hidden');
    document.getElementById('testScreen').classList.remove('hidden');
    currentQuestionIndex = 0;
    userAnswers = {};
    mostrarPregunta();
}

// Mostrar pregunta actual
function mostrarPregunta() {
    const pregunta = questions[currentQuestionIndex];
    
    // Actualizar texto de la pregunta
    document.getElementById('questionText').textContent = pregunta.texto;
    
    // Actualizar indicador de pilar
    document.getElementById('pilarIndicator').textContent = pregunta.pilar;
    
    // Actualizar contador de preguntas
    document.getElementById('questionCounter').textContent = 
        `Pregunta ${currentQuestionIndex + 1} de ${questions.length}`;
    
    // Actualizar barra de progreso
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    
    // Limpiar selección anterior
    const options = document.querySelectorAll('.likert-option');
    options.forEach(option => option.classList.remove('selected'));
    
    // Si ya hay respuesta guardada, mostrarla
    if (userAnswers[pregunta.id]) {
        const savedAnswer = userAnswers[pregunta.id];
        options[savedAnswer - 1].classList.add('selected');
        document.getElementById('nextButton').disabled = false;
    } else {
        document.getElementById('nextButton').disabled = true;
    }
    
    // Actualizar botón "Anterior"
    document.getElementById('prevButton').disabled = currentQuestionIndex === 0;
    
    // Actualizar texto del botón "Siguiente"
    const nextButtonText = document.getElementById('nextButtonText');
    if (currentQuestionIndex === questions.length - 1) {
        nextButtonText.textContent = 'Ver Resultados';
    } else {
        nextButtonText.textContent = 'Continuar';
    }
}

// Seleccionar respuesta
function selectAnswer(value) {
    const pregunta = questions[currentQuestionIndex];
    userAnswers[pregunta.id] = value;
    
    // Actualizar visualización
    const options = document.querySelectorAll('.likert-option');
    options.forEach((option, index) => {
        if (index === value - 1) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
    
    // Habilitar botón siguiente
    document.getElementById('nextButton').disabled = false;
}

// Ir a pregunta anterior
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        mostrarPregunta();
    }
}

// Ir a siguiente pregunta o mostrar resultados
function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        mostrarPregunta();
    } else {
        // Calcular y mostrar resultados
        mostrarResultados();
    }
}

// Mostrar resultados
function mostrarResultados() {
    // Ocultar pantalla de test
    document.getElementById('testScreen').classList.add('hidden');
    
    // Mostrar pantalla de resultados
    document.getElementById('resultsScreen').classList.remove('hidden');
    
    // Calcular resultados
    testResults = calcularResultadosCompletos(userAnswers);
    
    // Renderizar resultados
    renderizarResultados();
}

// Renderizar resultados en HTML
function renderizarResultados() {
    const container = document.getElementById('resultsContainer');
    
    // Limpiar contenedor
    container.innerHTML = '';
    
    // Resumen de scores del usuario
    const perfilScores = calcularScoresPromedio();
    
    const summaryHTML = `
        <div class="ikigai-summary">
            <h2 style="color: #6B1B3D; margin-bottom: 16px;">Tu Perfil Ikigai</h2>
            <p style="color: #6B7280; margin-bottom: 24px;">
                Estos son tus puntajes promedio en cada dimensión del Ikigai basados en tus respuestas:
            </p>
            <div class="ikigai-scores">
                <div class="score-card pasion">
                    <h3>Pasión</h3>
                    <div class="score-value">${perfilScores.pasion}</div>
                </div>
                <div class="score-card vocacion">
                    <h3>Vocación</h3>
                    <div class="score-value">${perfilScores.vocacion}</div>
                </div>
                <div class="score-card profesion">
                    <h3>Profesión</h3>
                    <div class="score-value">${perfilScores.profesion}</div>
                </div>
                <div class="score-card mision">
                    <h3>Misión</h3>
                    <div class="score-value">${perfilScores.mision}</div>
                </div>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', summaryHTML);
    
    // Título de recomendaciones
    const titleHTML = `
        <h2 style="color: #1f2937; font-size: 28px; margin: 48px 0 24px 0;">
            Tus Top 5 Carreras Recomendadas
        </h2>
    `;
    
    container.insertAdjacentHTML('beforeend', titleHTML);
    
    // Generar tarjetas de carreras
    testResults.top_5.forEach((resultado, index) => {
        const carreraHTML = generarTarjetaCarrera(resultado, index + 1);
        container.insertAdjacentHTML('beforeend', carreraHTML);
    });
}

// Calcular scores promedio del perfil del usuario
function calcularScoresPromedio() {
    const top5 = testResults.top_5;
    
    return {
        pasion: Math.round(top5.reduce((sum, r) => sum + r.scores.pasion, 0) / 5),
        vocacion: Math.round(top5.reduce((sum, r) => sum + r.scores.vocacion, 0) / 5),
        profesion: Math.round(top5.reduce((sum, r) => sum + r.scores.profesion, 0) / 5),
        mision: Math.round(top5.reduce((sum, r) => sum + r.scores.mision, 0) / 5)
    };
}

// Generar HTML de tarjeta de carrera
function generarTarjetaCarrera(resultado, ranking) {
    const carrera = resultado.carrera;
    const scores = resultado.scores;
    const explicacion = resultado.explicacion;
    
    // Formatear salarios
    const salarioInicial = `$${carrera.profesion.salario_inicial.toLocaleString()}`;
    const salarioExperiencia = `$${carrera.profesion.salario_experiencia.toLocaleString()}`;
    
    // Generar lista de fortalezas
    const fortalezasHTML = explicacion.fortalezas.length > 0 
        ? `<ul>${explicacion.fortalezas.map(f => `<li>${f}</li>`).join('')}</ul>`
        : '<p style="color: #6B7280;">No hay fortalezas destacadas específicas.</p>';
    
    // Generar lista de áreas de desarrollo
    const desarrolloHTML = explicacion.areas_desarrollo.length > 0
        ? `<ul>${explicacion.areas_desarrollo.map(a => `<li>${a}</li>`).join('')}</ul>`
        : '<p style="color: #6B7280;">No hay áreas de desarrollo prioritarias.</p>';
    
    return `
        <div class="career-card">
            <div class="career-header">
                <div class="career-rank">${ranking}</div>
                <div class="career-info">
                    <h3 class="career-name">${carrera.nombre}</h3>
                    <p class="career-school">${carrera.unidades.join(', ')}</p>
                    <span class="career-area">${carrera.area}</span>
                </div>
                <div class="ikigai-score-large">
                    <div class="score-number">${resultado.ikigai_score}</div>
                    <div class="score-label">Ikigai Score</div>
                </div>
            </div>
            
            <div class="career-details">
                <div class="detail-item">
                    <div class="detail-label">Pasión</div>
                    <div class="detail-value">${scores.pasion}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Vocación</div>
                    <div class="detail-value">${scores.vocacion}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Profesión</div>
                    <div class="detail-value">${scores.profesion}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Misión</div>
                    <div class="detail-value">${scores.mision}</div>
                </div>
            </div>
            
            <div class="career-explanation">
                <h4>¿Por qué esta carrera?</h4>
                <p>${explicacion.consejo}</p>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 24px;">
                    <div class="strengths">
                        <h5>✓ Fortalezas</h5>
                        ${fortalezasHTML}
                    </div>
                    
                    <div class="development-areas">
                        <h5>→ Áreas a considerar</h5>
                        ${desarrolloHTML}
                    </div>
                </div>
                
                <div style="margin-top: 24px; padding: 16px; background-color: #f9fafb; border-radius: 8px;">
                    <h5 style="font-size: 14px; font-weight: 600; color: #1f2937; margin-bottom: 12px;">
                        Información adicional
                    </h5>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; font-size: 14px;">
                        <div>
                            <strong style="color: #6B1B3D;">Empleabilidad:</strong> 
                            <span style="color: #374151;">${carrera.profesion.empleabilidad}%</span>
                        </div>
                        <div>
                            <strong style="color: #6B1B3D;">Salario inicial:</strong> 
                            <span style="color: #374151;">${salarioInicial}</span>
                        </div>
                        <div>
                            <strong style="color: #6B1B3D;">Con experiencia:</strong> 
                            <span style="color: #374151;">${salarioExperiencia}</span>
                        </div>
                        <div style="grid-column: 1 / -1;">
                            <strong style="color: #6B1B3D;">Demanda laboral:</strong> 
                            <span style="color: #374151;">${carrera.profesion.demanda}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Inicializar la aplicación cuando cargue la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Aplicación Rumbo - Test Ikigai IPN cargada correctamente');
    console.log(`Preguntas cargadas: ${questions.length}`);
    console.log(`Carreras cargadas: ${careers.length}`);
});