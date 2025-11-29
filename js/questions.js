const questions = [
    // PASIÓN (10 preguntas)
    {
        id: 1,
        pilar: 'PASIÓN',
        texto: '¿Cuánto te interesan los temas relacionados con tecnología y programación?',
        tipo: 'likert_5',
        categoria: 'pasion',
        palabras_clave: ['Programación', 'Software', 'Algoritmos', 'Datos', 'Inteligencia Artificial']
    },
    {
        id: 2,
        pilar: 'PASIÓN',
        texto: '¿Qué tanto disfrutas trabajar en proyectos relacionados con salud y medicina?',
        tipo: 'likert_5',
        categoria: 'pasion',
        palabras_clave: ['Salud', 'Medicina', 'Diagnóstico', 'Terapéutica', 'Biomedicina']
    },
    {
        id: 3,
        pilar: 'PASIÓN',
        texto: '¿Te apasionan los temas de construcción, infraestructura y urbanismo?',
        tipo: 'likert_5',
        categoria: 'pasion',
        palabras_clave: ['Construcción', 'Infraestructura', 'Arquitectura', 'Estructuras']
    },
    {
        id: 4,
        pilar: 'PASIÓN',
        texto: '¿Cuánto te interesa el mundo de los negocios, finanzas y emprendimiento?',
        tipo: 'likert_5',
        categoria: 'pasion',
        palabras_clave: ['Negocios', 'Finanzas', 'Emprendimiento', 'Marketing', 'Administración']
    },
    {
        id: 5,
        pilar: 'PASIÓN',
        texto: '¿Qué tanto te atrae trabajar con procesos químicos, farmacéuticos o biotecnológicos?',
        tipo: 'likert_5',
        categoria: 'pasion',
        palabras_clave: ['Química', 'Farmacéutica', 'Biotecnología', 'Procesos químicos']
    },
    {
        id: 6,
        pilar: 'PASIÓN',
        texto: '¿Te gustaría trabajar principalmente en un laboratorio realizando experimentos e investigación?',
        tipo: 'likert_5',
        categoria: 'pasion',
        actividad: 'Investigar y experimentar'
    },
    {
        id: 7,
        pilar: 'PASIÓN',
        texto: '¿Prefieres actividades de diseño, creación visual o desarrollo de productos?',
        tipo: 'likert_5',
        categoria: 'pasion',
        actividad: 'Diseñar productos'
    },
    {
        id: 8,
        pilar: 'PASIÓN',
        texto: '¿Disfrutas analizar grandes cantidades de datos y encontrar patrones?',
        tipo: 'likert_5',
        categoria: 'pasion',
        actividad: 'Analizar datos'
    },
    {
        id: 9,
        pilar: 'PASIÓN',
        texto: '¿Te atrae la idea de trabajar al aire libre o en contacto con la naturaleza?',
        tipo: 'likert_5',
        categoria: 'pasion',
        ambiente: 'Áreas naturales'
    },
    {
        id: 10,
        pilar: 'PASIÓN',
        texto: '¿Qué tan importante es para ti que tu trabajo involucre alta creatividad e innovación?',
        tipo: 'likert_5',
        categoria: 'pasion',
        atributo: 'creatividad'
    },

    // VOCACIÓN (10 preguntas)
    {
        id: 11,
        pilar: 'VOCACIÓN',
        texto: '¿Cómo calificarías tus habilidades en matemáticas?',
        tipo: 'likert_5',
        categoria: 'vocacion',
        materia: 'matematicas'
    },
    {
        id: 12,
        pilar: 'VOCACIÓN',
        texto: '¿Qué tan bueno eres en física?',
        tipo: 'likert_5',
        categoria: 'vocacion',
        materia: 'fisica'
    },
    {
        id: 13,
        pilar: 'VOCACIÓN',
        texto: '¿Cómo evaluarías tu desempeño en química?',
        tipo: 'likert_5',
        categoria: 'vocacion',
        materia: 'quimica'
    },
    {
        id: 14,
        pilar: 'VOCACIÓN',
        texto: '¿Qué tan fuerte es tu habilidad en biología y ciencias de la vida?',
        tipo: 'likert_5',
        categoria: 'vocacion',
        materia: 'biologia'
    },
    {
        id: 15,
        pilar: 'VOCACIÓN',
        texto: '¿Cómo calificas tu capacidad de expresión oral y escrita?',
        tipo: 'likert_5',
        categoria: 'vocacion',
        materia: 'expresion'
    },
    {
        id: 16,
        pilar: 'VOCACIÓN',
        texto: '¿Qué tan desarrollada está tu capacidad de pensamiento crítico y análisis?',
        tipo: 'likert_5',
        categoria: 'vocacion',
        competencia: 'Pensamiento crítico'
    },
    {
        id: 17,
        pilar: 'VOCACIÓN',
        texto: '¿Cómo calificarías tu habilidad para trabajar en equipo?',
        tipo: 'likert_5',
        categoria: 'vocacion',
        competencia: 'Trabajo en equipo'
    },
    {
        id: 18,
        pilar: 'VOCACIÓN',
        texto: '¿Qué tan bueno eres resolviendo problemas complejos?',
        tipo: 'likert_5',
        categoria: 'vocacion',
        competencia: 'Resolución de problemas'
    },
    {
        id: 19,
        pilar: 'VOCACIÓN',
        texto: '¿Cómo evaluarías tu capacidad de liderazgo?',
        tipo: 'likert_5',
        categoria: 'vocacion',
        competencia: 'Liderazgo'
    },
    {
        id: 20,
        pilar: 'VOCACIÓN',
        texto: '¿Qué tan desarrollada está tu creatividad e innovación?',
        tipo: 'likert_5',
        categoria: 'vocacion',
        competencia: 'Creatividad'
    },

    // PROFESIÓN (10 preguntas)
    {
        id: 21,
        pilar: 'PROFESIÓN',
        texto: '¿Qué tan importante es para ti tener un salario inicial alto (arriba de $20,000)?',
        tipo: 'likert_5',
        categoria: 'profesion',
        aspecto: 'salario_alto'
    },
    {
        id: 22,
        pilar: 'PROFESIÓN',
        texto: '¿Qué tan relevante es para ti la estabilidad laboral?',
        tipo: 'likert_5',
        categoria: 'profesion',
        aspecto: 'estabilidad'
    },
    {
        id: 23,
        pilar: 'PROFESIÓN',
        texto: '¿Te interesa trabajar en empresas tecnológicas o startups?',
        tipo: 'likert_5',
        categoria: 'profesion',
        sector: 'Tecnología de la información'
    },
    {
        id: 24,
        pilar: 'PROFESIÓN',
        texto: '¿Te gustaría trabajar en el sector salud (hospitales, clínicas, farmacéuticas)?',
        tipo: 'likert_5',
        categoria: 'profesion',
        sector: 'Salud (hospitales, clínicas)'
    },
    {
        id: 25,
        pilar: 'PROFESIÓN',
        texto: '¿Qué tanto te atrae la idea de trabajar en gobierno o sector público?',
        tipo: 'likert_5',
        categoria: 'profesion',
        sector: 'Gobierno y sector público'
    },
    {
        id: 26,
        pilar: 'PROFESIÓN',
        texto: '¿Te interesa la industria manufacturera o automotriz?',
        tipo: 'likert_5',
        categoria: 'profesion',
        sector: 'Industria manufacturera'
    },
    {
        id: 27,
        pilar: 'PROFESIÓN',
        texto: '¿Qué tan importante es para ti tener oportunidades de emprender tu propio negocio?',
        tipo: 'likert_5',
        categoria: 'profesion',
        aspecto: 'emprendimiento'
    },
    {
        id: 28,
        pilar: 'PROFESIÓN',
        texto: '¿Priorizas una carrera con muy alta demanda laboral aunque no sea tu principal interés?',
        tipo: 'likert_5',
        categoria: 'profesion',
        aspecto: 'demanda'
    },
    {
        id: 29,
        pilar: 'PROFESIÓN',
        texto: '¿Te gustaría trabajar en el sector energético o petrolero?',
        tipo: 'likert_5',
        categoria: 'profesion',
        sector: 'Energía y petróleo'
    },
    {
        id: 30,
        pilar: 'PROFESIÓN',
        texto: '¿Qué tan importante es para ti que la carrera ofrezca oportunidades de crecimiento rápido?',
        tipo: 'likert_5',
        categoria: 'profesion',
        aspecto: 'crecimiento'
    },

    // MISIÓN (10 preguntas)
    {
        id: 31,
        pilar: 'MISIÓN',
        texto: '¿Qué tan importante es para ti contribuir a resolver problemas ambientales?',
        tipo: 'likert_5',
        categoria: 'mision',
        problema: 'Contaminación ambiental'
    },
    {
        id: 32,
        pilar: 'MISIÓN',
        texto: '¿Te gustaría trabajar en soluciones para mejorar la salud pública?',
        tipo: 'likert_5',
        categoria: 'mision',
        problema: 'Problemas de salud y enfermedades'
    },
    {
        id: 33,
        pilar: 'MISIÓN',
        texto: '¿Qué tanto te interesa contribuir al desarrollo tecnológico del país?',
        tipo: 'likert_5',
        categoria: 'mision',
        problema: 'Desarrollo tecnológico'
    },
    {
        id: 34,
        pilar: 'MISIÓN',
        texto: '¿Te motiva trabajar en proyectos de infraestructura que mejoren comunidades?',
        tipo: 'likert_5',
        categoria: 'mision',
        problema: 'Infraestructura y construcción de obras'
    },
    {
        id: 35,
        pilar: 'MISIÓN',
        texto: '¿Qué tan importante es para ti combatir la desigualdad social?',
        tipo: 'likert_5',
        categoria: 'mision',
        problema: 'Desigualdad social'
    },
    {
        id: 36,
        pilar: 'MISIÓN',
        texto: '¿Te interesa contribuir a la investigación científica y generación de conocimiento?',
        tipo: 'likert_5',
        categoria: 'mision',
        problema: 'Investigación científica'
    },
    {
        id: 37,
        pilar: 'MISIÓN',
        texto: '¿Qué tanto te motiva trabajar en soluciones contra el cambio climático?',
        tipo: 'likert_5',
        categoria: 'mision',
        problema: 'Cambio climático'
    },
    {
        id: 38,
        pilar: 'MISIÓN',
        texto: '¿Te gustaría contribuir a la innovación en procesos industriales?',
        tipo: 'likert_5',
        categoria: 'mision',
        problema: 'Innovación en procesos'
    },
    {
        id: 39,
        pilar: 'MISIÓN',
        texto: '¿Qué tan importante es para ti que tu trabajo tenga un alto impacto social visible?',
        tipo: 'likert_5',
        categoria: 'mision',
        aspecto: 'impacto_social'
    },
    {
        id: 40,
        pilar: 'MISIÓN',
        texto: '¿Te motiva contribuir al desarrollo económico y competitividad del país?',
        tipo: 'likert_5',
        categoria: 'mision',
        problema: 'Problemas financieros y económicos'
    }
];