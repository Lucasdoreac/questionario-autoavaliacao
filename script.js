document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const introSection = document.getElementById('intro');
    const questionnaireSection = document.getElementById('questionnaire');
    const resultsSection = document.getElementById('results');
    const startBtn = document.getElementById('start-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const questionContainer = document.getElementById('question-container');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const restartBtn = document.getElementById('restart-btn');
    const gaugeFill = document.getElementById('gauge-fill');
    const overallFeedback = document.getElementById('overall-feedback');
    const categoryResults = document.getElementById('category-results');
    const recommendationContent = document.getElementById('recommendation-content');

    // Estado da aplicação
    let currentQuestionIndex = 0;
    let userAnswers = [];

    // Categorias de perguntas
    const categories = [
        { id: 'mindset', name: 'Mentalidade e Atitudes', description: 'Como seus pensamentos e crenças afetam suas ações' },
        { id: 'habits', name: 'Hábitos e Comportamentos', description: 'Padrões diários que influenciam seus resultados' },
        { id: 'relationships', name: 'Relacionamentos e Redes', description: 'Como suas interações sociais impactam suas oportunidades' },
        { id: 'skills', name: 'Habilidades e Conhecimentos', description: 'Seu desenvolvimento de competências relevantes' },
        { id: 'organization', name: 'Organização e Gestão de Tempo', description: 'Como você organiza seus recursos e prioridades' },
        { id: 'resilience', name: 'Resiliência e Resposta a Falhas', description: 'Como você lida com desafios e recupera-se de contratempos' },
        { id: 'communication', name: 'Comunicação', description: 'Sua capacidade de expressar ideias e ouvir os outros' },
        { id: 'decisions', name: 'Tomada de Decisão', description: 'Como você avalia opções e escolhe caminhos' }
    ];

    // Perguntas do questionário
    const questions = [
        // Mentalidade e Atitudes
        {
            id: 1,
            category: 'mindset',
            text: 'Com que frequência você se pega pensando que não merece sucesso ou reconhecimento?',
            options: [
                { value: 1, text: 'Raramente ou nunca' },
                { value: 2, text: 'Ocasionalmente' },
                { value: 3, text: 'Com frequência moderada' },
                { value: 4, text: 'Frequentemente' },
                { value: 5, text: 'Quase sempre' }
            ],
            negativeScoring: true
        },
        {
            id: 2,
            category: 'mindset',
            text: 'Quando enfrenta um desafio difícil, qual é sua primeira reação?',
            options: [
                { value: 1, text: 'Vejo como uma oportunidade de crescimento e aprendizado' },
                { value: 2, text: 'Analiso o problema e busco soluções' },
                { value: 3, text: 'Fico ansioso, mas tento lidar com a situação' },
                { value: 4, text: 'Penso que provavelmente não conseguirei resolver' },
                { value: 5, text: 'Evito o desafio ou procrastino ao máximo' }
            ],
            negativeScoring: true
        },
        {
            id: 3,
            category: 'mindset',
            text: 'Como você vê seus próprios erros e falhas?',
            options: [
                { value: 1, text: 'Como valiosas experiências de aprendizado' },
                { value: 2, text: 'Como feedback útil para melhorar' },
                { value: 3, text: 'Com alguma frustração, mas sigo em frente' },
                { value: 4, text: 'Como evidências de minhas limitações' },
                { value: 5, text: 'Como confirmação de que não sou bom o suficiente' }
            ],
            negativeScoring: true
        },
        {
            id: 4,
            category: 'mindset',
            text: 'Com que frequência você se compara negativamente com outras pessoas?',
            options: [
                { value: 1, text: 'Raramente ou nunca' },
                { value: 2, text: 'Ocasionalmente' },
                { value: 3, text: 'Com frequência moderada' },
                { value: 4, text: 'Frequentemente' },
                { value: 5, text: 'Quase sempre' }
            ],
            negativeScoring: true
        },
        {
            id: 5,
            category: 'mindset',
            text: 'Você acredita que suas habilidades e inteligência são principalmente:',
            options: [
                { value: 1, text: 'Desenvolvíveis através de esforço e aprendizado' },
                { value: 2, text: 'Majoritariamente desenvolvíveis, com alguns fatores fixos' },
                { value: 3, text: 'Parcialmente fixas e parcialmente desenvolvíveis' },
                { value: 4, text: 'Majoritariamente fixas desde o nascimento' },
                { value: 5, text: 'Completamente determinadas geneticamente' }
            ],
            negativeScoring: true
        },
        
        // Hábitos e Comportamentos
        {
            id: 6,
            category: 'habits',
            text: 'Com que frequência você procrastina tarefas importantes?',
            options: [
                { value: 1, text: 'Raramente ou nunca' },
                { value: 2, text: 'Ocasionalmente' },
                { value: 3, text: 'Com frequência moderada' },
                { value: 4, text: 'Frequentemente' },
                { value: 5, text: 'Quase sempre' }
            ],
            negativeScoring: true
        },
        {
            id: 7,
            category: 'habits',
            text: 'Quanto tempo você dedica diariamente ao desenvolvimento pessoal e aprendizado?',
            options: [
                { value: 1, text: 'Mais de uma hora por dia' },
                { value: 2, text: '30 minutos a uma hora por dia' },
                { value: 3, text: '15 a 30 minutos por dia' },
                { value: 4, text: 'Apenas ocasionalmente' },
                { value: 5, text: 'Raramente ou nunca' }
            ],
            negativeScoring: true
        },
        {
            id: 8,
            category: 'habits',
            text: 'Como você lida com distrações enquanto trabalha em algo importante?',
            options: [
                { value: 1, text: 'Elimino ativamente as distrações e mantenho foco total' },
                { value: 2, text: 'Geralmente consigo manter o foco com poucas distrações' },
                { value: 3, text: 'Alterno entre foco e distração' },
                { value: 4, text: 'Frequentemente me distraio e perco tempo' },
                { value: 5, text: 'Constantemente distraído e com dificuldade para retomar' }
            ],
            negativeScoring: true
        },
        {
            id: 9,
            category: 'habits',
            text: 'Com que frequência você estabelece metas claras e mensuráveis?',
            options: [
                { value: 1, text: 'Sempre, para todos os projetos importantes' },
                { value: 2, text: 'Frequentemente' },
                { value: 3, text: 'Às vezes' },
                { value: 4, text: 'Raramente' },
                { value: 5, text: 'Nunca ou quase nunca' }
            ],
            negativeScoring: true
        },
        {
            id: 10,
            category: 'habits',
            text: 'Quanto tempo você passa em atividades que não contribuem para seus objetivos (scrolling em redes sociais, maratonas de séries, etc.)?',
            options: [
                { value: 1, text: 'Menos de 30 minutos por dia' },
                { value: 2, text: '30 minutos a 1 hora por dia' },
                { value: 3, text: '1 a 2 horas por dia' },
                { value: 4, text: '2 a 4 horas por dia' },
                { value: 5, text: 'Mais de 4 horas por dia' }
            ],
            negativeScoring: true
        },
        
        // Relacionamentos e Redes
        {
            id: 11,
            category: 'relationships',
            text: 'Com que frequência você se conecta com pessoas que poderiam ajudar em sua carreira ou objetivos?',
            options: [
                { value: 1, text: 'Regularmente, como parte de minha rotina' },
                { value: 2, text: 'Frequentemente' },
                { value: 3, text: 'Ocasionalmente' },
                { value: 4, text: 'Raramente' },
                { value: 5, text: 'Nunca ou quase nunca' }
            ],
            negativeScoring: true
        },
        {
            id: 12,
            category: 'relationships',
            text: 'Como você lida com críticas construtivas?',
            options: [
                { value: 1, text: 'Agradeço e aplico para melhorar' },
                { value: 2, text: 'Ouço com atenção e considero seriamente' },
                { value: 3, text: 'Escuto, mas às vezes fico defensivo' },
                { value: 4, text: 'Frequentemente me sinto atacado' },
                { value: 5, text: 'Evito situações onde posso ser criticado' }
            ],
            negativeScoring: true
        },
        {
            id: 13,
            category: 'relationships',
            text: 'Como você se sente ao pedir ajuda quando precisa?',
            options: [
                { value: 1, text: 'Totalmente confortável, vejo como colaboração natural' },
                { value: 2, text: 'Geralmente confortável' },
                { value: 3, text: 'Um pouco desconfortável, mas faço quando necessário' },
                { value: 4, text: 'Muito desconfortável, evito sempre que possível' },
                { value: 5, text: 'Prefiro falhar sozinho do que pedir ajuda' }
            ],
            negativeScoring: true
        },
        {
            id: 14,
            category: 'relationships',
            text: 'Você mantém contato com sua rede profissional quando não precisa de nada específico?',
            options: [
                { value: 1, text: 'Sim, regularmente mantenho contato genuíno' },
                { value: 2, text: 'Frequentemente, mesmo sem necessidade imediata' },
                { value: 3, text: 'Às vezes' },
                { value: 4, text: 'Raramente, geralmente só quando preciso de algo' },
                { value: 5, text: 'Nunca ou quase nunca' }
            ],
            negativeScoring: true
        },
        {
            id: 15,
            category: 'relationships',
            text: 'Como você reage quando alguém recebe reconhecimento ou sucesso em sua área?',
            options: [
                { value: 1, text: 'Celebro genuinamente e busco aprender com eles' },
                { value: 2, text: 'Fico feliz por eles e um pouco inspirado' },
                { value: 3, text: 'Tenho sentimentos mistos de admiração e inveja' },
                { value: 4, text: 'Principalmente inveja ou ressentimento' },
                { value: 5, text: 'Desvalorizo suas conquistas ou atribuo a fatores externos' }
            ],
            negativeScoring: true
        },
        
        // Habilidades e Conhecimentos
        {
            id: 16,
            category: 'skills',
            text: 'Com que frequência você investe no aprendizado de novas habilidades relevantes para sua área?',
            options: [
                { value: 1, text: 'Constantemente, como parte da minha rotina' },
                { value: 2, text: 'Regularmente' },
                { value: 3, text: 'Ocasionalmente' },
                { value: 4, text: 'Raramente' },
                { value: 5, text: 'Nunca ou quase nunca' }
            ],
            negativeScoring: true
        },
        {
            id: 17,
            category: 'skills',
            text: 'Como você avalia seu conhecimento das tendências e desenvolvimentos atuais em sua área?',
            options: [
                { value: 1, text: 'Estou sempre à frente das tendências' },
                { value: 2, text: 'Bem informado sobre a maioria dos desenvolvimentos' },
                { value: 3, text: 'Razoavelmente atualizado' },
                { value: 4, text: 'Um pouco desatualizado' },
                { value: 5, text: 'Significativamente desatualizado' }
            ],
            negativeScoring: true
        },
        {
            id: 18,
            category: 'skills',
            text: 'Quando percebe uma lacuna em suas habilidades, o que você geralmente faz?',
            options: [
                { value: 1, text: 'Imediatamente crio um plano para desenvolver essa habilidade' },
                { value: 2, text: 'Busco oportunidades de aprendizado no curto prazo' },
                { value: 3, text: 'Reconheço a lacuna, mas demoro para agir' },
                { value: 4, text: 'Tento evitar situações que exijam essa habilidade' },
                { value: 5, text: 'Ignoro ou nego a importância dessa habilidade' }
            ],
            negativeScoring: true
        },
        {
            id: 19,
            category: 'skills',
            text: 'Com que frequência você busca feedback sobre seu desempenho para identificar áreas de melhoria?',
            options: [
                { value: 1, text: 'Constantemente, de múltiplas fontes' },
                { value: 2, text: 'Regularmente' },
                { value: 3, text: 'Ocasionalmente' },
                { value: 4, text: 'Raramente' },
                { value: 5, text: 'Nunca ou quase nunca' }
            ],
            negativeScoring: true
        },
        {
            id: 20,
            category: 'skills',
            text: 'Como você encara tarefas ou projetos que estão fora da sua zona de conforto?',
            options: [
                { value: 1, text: 'Abraço entusiasticamente como oportunidades de crescimento' },
                { value: 2, text: 'Aceito com disposição para aprender' },
                { value: 3, text: 'Aceito com alguma hesitação' },
                { value: 4, text: 'Evito sempre que possível' },
                { value: 5, text: 'Recuso ou saboto conscientemente' }
            ],
            negativeScoring: true
        },
        
        // Organização e Gestão de Tempo
        {
            id: 21,
            category: 'organization',
            text: 'Como você prioriza suas tarefas diárias?',
            options: [
                { value: 1, text: 'Usando um sistema claro baseado em importância e urgência' },
                { value: 2, text: 'Com um plano estruturado, mas flexível' },
                { value: 3, text: 'Com alguma organização, mas nem sempre consistente' },
                { value: 4, text: 'De forma bastante aleatória' },
                { value: 5, text: 'Geralmente reajo às demandas conforme surgem' }
            ],
            negativeScoring: true
        },
        {
            id: 22,
            category: 'organization',
            text: 'Com que frequência você estabelece prazos pessoais antes dos prazos oficiais?',
            options: [
                { value: 1, text: 'Sempre, com tempo suficiente para revisões' },
                { value: 2, text: 'Frequentemente' },
                { value: 3, text: 'Às vezes' },
                { value: 4, text: 'Raramente' },
                { value: 5, text: 'Nunca, geralmente cumpro prazos no último minuto' }
            ],
            negativeScoring: true
        },
        {
            id: 23,
            category: 'organization',
            text: 'Como você gerencia múltiplos projetos simultaneamente?',
            options: [
                { value: 1, text: 'Com um sistema eficaz de planejamento e acompanhamento' },
                { value: 2, text: 'Bem, com organização e revisões regulares' },
                { value: 3, text: 'Razoavelmente, mas às vezes me sinto sobrecarregado' },
                { value: 4, text: 'Com dificuldade, frequentemente atrasando alguns projetos' },
                { value: 5, text: 'Mal, frequentemente perdendo prazos ou detalhes importantes' }
            ],
            negativeScoring: true
        },
        {
            id: 24,
            category: 'organization',
            text: 'Quanto tempo você perde diariamente procurando informações, arquivos ou objetos que você precisa?',
            options: [
                { value: 1, text: 'Quase nada, tudo está bem organizado' },
                { value: 2, text: 'Menos de 15 minutos' },
                { value: 3, text: '15-30 minutos' },
                { value: 4, text: '30-60 minutos' },
                { value: 5, text: 'Mais de uma hora' }
            ],
            negativeScoring: true
        },
        {
            id: 25,
            category: 'organization',
            text: 'Como você lida com interrupções durante tarefas importantes?',
            options: [
                { value: 1, text: 'Tenho sistemas para minimizar interrupções e manter foco' },
                { value: 2, text: 'Geralmente consigo administrar interrupções eficientemente' },
                { value: 3, text: 'Lido razoavelmente, mas perco algum tempo para retomar' },
                { value: 4, text: 'Tenho dificuldade para retomar após interrupções' },
                { value: 5, text: 'Interrupções frequentemente descarrilam completamente meu dia' }
            ],
            negativeScoring: true
        },
        
        // Resiliência e Resposta a Falhas
        {
            id: 26,
            category: 'resilience',
            text: 'Quanto tempo você geralmente leva para se recuperar emocionalmente após um fracasso significativo?',
            options: [
                { value: 1, text: 'Rapidamente, horas ou um dia' },
                { value: 2, text: 'Alguns dias' },
                { value: 3, text: 'Uma semana' },
                { value: 4, text: 'Várias semanas' },
                { value: 5, text: 'Meses ou mais, alguns fracassos me afetam por muito tempo' }
            ],
            negativeScoring: true
        },
        {
            id: 27,
            category: 'resilience',
            text: 'Após uma rejeição ou falha, qual é geralmente sua próxima ação?',
            options: [
                { value: 1, text: 'Analiso o ocorrido, aprendo e tento novamente com ajustes' },
                { value: 2, text: 'Busco feedback e planejo um novo approach' },
                { value: 3, text: 'Dou-me um tempo para processar antes de tentar novamente' },
                { value: 4, text: 'Espero muito tempo antes de tentar algo similar' },
                { value: 5, text: 'Evito situações semelhantes no futuro' }
            ],
            negativeScoring: true
        },
        {
            id: 28,
            category: 'resilience',
            text: 'Como você lida com críticas duras ao seu trabalho?',
            options: [
                { value: 1, text: 'Vejo como valiosa informação para melhorar' },
                { value: 2, text: 'Separo o útil do desnecessário e aprendo com isso' },
                { value: 3, text: 'Inicialmente fico na defensiva, mas depois considero' },
                { value: 4, text: 'Tenho dificuldade em não levar para o lado pessoal' },
                { value: 5, text: 'Vejo como ataques pessoais e rejeito completamente' }
            ],
            negativeScoring: true
        },
        {
            id: 29,
            category: 'resilience',
            text: 'Como você reage quando um projeto importante não sai como planejado?',
            options: [
                { value: 1, text: 'Adapto-me rapidamente, encontro soluções e sigo em frente' },
                { value: 2, text: 'Aceito a situação, reavaliando e ajusto meus planos' },
                { value: 3, text: 'Sinto frustração, mas eventualmente me adapto' },
                { value: 4, text: 'Desanimo significativamente e tenho dificuldade para ajustar' },
                { value: 5, text: 'Fico paralisado ou abandono completamente o projeto' }
            ],
            negativeScoring: true
        },
        {
            id: 30,
            category: 'resilience',
            text: 'Como você lida com múltiplos fracassos seguidos?',
            options: [
                { value: 1, text: 'Mantenho a determinação e busco padrões para aprender' },
                { value: 2, text: 'Reavaliação e ajustes, mantendo a persistência' },
                { value: 3, text: 'Questiono minha abordagem, mas continuo tentando' },
                { value: 4, text: 'Começo a duvidar seriamente de minha capacidade' },
                { value: 5, text: 'Desisto e concluo que não sou capaz' }
            ],
            negativeScoring: true
        },
        
        // Comunicação
        {
            id: 31,
            category: 'communication',
            text: 'Como você avalia sua capacidade de expressar ideias complexas de forma clara?',
            options: [
                { value: 1, text: 'Excelente, consigo tornar conceitos complexos acessíveis' },
                { value: 2, text: 'Boa, geralmente me faço entender bem' },
                { value: 3, text: 'Razoável, às vezes as pessoas não entendem completamente' },
                { value: 4, text: 'Abaixo da média, frequentemente há mal-entendidos' },
                { value: 5, text: 'Fraca, regularmente encontro dificuldades em me expressar' }
            ],
            negativeScoring: true
        },
        {
            id: 32,
            category: 'communication',
            text: 'Como você se sente ao apresentar suas ideias em público ou em reuniões?',
            options: [
                { value: 1, text: 'Muito confortável, aproveito a oportunidade' },
                { value: 2, text: 'Geralmente confiante' },
                { value: 3, text: 'Um pouco nervoso, mas consigo me expressar' },
                { value: 4, text: 'Bastante ansioso, tento minimizar minha participação' },
                { value: 5, text: 'Extremamente desconfortável, evito sempre que possível' }
            ],
            negativeScoring: true
        },
        {
            id: 33,
            category: 'communication',
            text: 'Com que frequência você verifica se suas mensagens foram compreendidas corretamente?',
            options: [
                { value: 1, text: 'Sempre, peço confirmação ou feedback' },
                { value: 2, text: 'Frequentemente' },
                { value: 3, text: 'Às vezes' },
                { value: 4, text: 'Raramente' },
                { value: 5, text: 'Nunca, pressuponho que fui compreendido' }
            ],
            negativeScoring: true
        },
        {
            id: 34,
            category: 'communication',
            text: 'Como você lida com conversas difíceis ou conflitos?',
            options: [
                { value: 1, text: 'Enfrento diretamente com empatia e foco em soluções' },
                { value: 2, text: 'Geralmente abordo de forma construtiva' },
                { value: 3, text: 'Com alguma hesitação, mas eventualmente enfrento' },
                { value: 4, text: 'Tento evitar ao máximo' },
                { value: 5, text: 'Evito completamente ou me torno agressivo/passivo' }
            ],
            negativeScoring: true
        },
        {
            id: 35,
            category: 'communication',
            text: 'Quanto você se prepara antes de comunicações importantes (reuniões, apresentações, e-mails críticos)?',
            options: [
                { value: 1, text: 'Extensivamente, com pontos-chave e possíveis cenários' },
                { value: 2, text: 'Bem preparado na maioria das vezes' },
                { value: 3, text: 'Preparação moderada' },
                { value: 4, text: 'Preparação mínima' },
                { value: 5, text: 'Nenhuma preparação, improviso no momento' }
            ],
            negativeScoring: true
        },
        
        // Tomada de Decisão
        {
            id: 36,
            category: 'decisions',
            text: 'Como você geralmente toma decisões importantes?',
            options: [
                { value: 1, text: 'Processo estruturado com análise de prós/contras e possíveis resultados' },
                { value: 2, text: 'Consideração cuidadosa de opções com alguma análise' },
                { value: 3, text: 'Mistura de análise e intuição' },
                { value: 4, text: 'Principalmente baseado em emoções ou intuição' },
                { value: 5, text: 'Procrastino até que a decisão seja tomada por mim ou por circunstâncias' }
            ],
            negativeScoring: true
        },
        {
            id: 37,
            category: 'decisions',
            text: 'Quando confrontado com múltiplas oportunidades, como você escolhe em qual focar?',
            options: [
                { value: 1, text: 'Avalio cuidadosamente o alinhamento com meus objetivos de longo prazo' },
                { value: 2, text: 'Comparo benefícios e custos de cada opção' },
                { value: 3, text: 'Considero alguns fatores, mas também sigo intuição' },
                { value: 4, text: 'Geralmente escolho o que parece mais fácil ou imediato' },
                { value: 5, text: 'Tendo a me sobrecarregar tentando fazer tudo ou paraliso' }
            ],
            negativeScoring: true
        },
        {
            id: 38,
            category: 'decisions',
            text: 'Com que frequência você reavalia decisões passadas para aprender com elas?',
            options: [
                { value: 1, text: 'Regularmente, como parte do meu processo de melhoria' },
                { value: 2, text: 'Frequentemente' },
                { value: 3, text: 'Ocasionalmente' },
                { value: 4, text: 'Raramente' },
                { value: 5, text: 'Nunca, prefiro não olhar para trás' }
            ],
            negativeScoring: true
        },
        {
            id: 39,
            category: 'decisions',
            text: 'Como você lida com a pressão de tomar decisões rápidas?',
            options: [
                { value: 1, text: 'Mantenho a calma e aplico um processo rápido mas eficaz' },
                { value: 2, text: 'Geralmente bem, com foco nas informações essenciais' },
                { value: 3, text: 'Razoavelmente, mas com alguma ansiedade' },
                { value: 4, text: 'Com bastante dificuldade e estresse' },
                { value: 5, text: 'Paraliso ou delego para outros decidirem' }
            ],
            negativeScoring: true
        },
        {
            id: 40,
            category: 'decisions',
            text: 'Após tomar uma decisão difícil, quanto tempo você gasta questionando se fez a escolha certa?',
            options: [
                { value: 1, text: 'Pouco ou nenhum, confio no meu processo de decisão' },
                { value: 2, text: 'Algum tempo inicial, mas sigo em frente' },
                { value: 3, text: 'Tempo moderado, às vezes volto a pensar no assunto' },
                { value: 4, text: 'Bastante tempo, frequentemente me questiono' },
                { value: 5, text: 'Constantemente, tenho grande dificuldade em seguir em frente' }
            ],
            negativeScoring: true
        }
    ];

    // Recomendações baseadas em categorias
    const recommendations = {
        mindset: [
            'Pratique mindfulness e autorreflexão diária para identificar pensamentos limitantes.',
            'Leia livros sobre mentalidade de crescimento, como "Mindset" de Carol Dweck.',
            'Mantenha um diário de sucessos, mesmo pequenos, para reconhecer seu progresso.',
            'Substitua autocrítica destrutiva por feedback construtivo para si mesmo.',
            'Cerque-se de pessoas com mentalidade positiva e orientada para o crescimento.'
        ],
        habits: [
            'Implemente a técnica Pomodoro para combater a procrastinação (25 min de foco, 5 min de pausa).',
            'Crie rotinas matinais e noturnas que apoiem seus objetivos.',
            'Use aplicativos de bloqueio de distrações durante períodos de trabalho focado.',
            'Aplique a regra dos "2 minutos" - se leva menos de 2 minutos, faça imediatamente.',
            'Revise semanalmente seus hábitos e ajuste conforme necessário.'
        ],
        relationships: [
            'Agende tempo para networking genuíno regularmente em sua agenda.',
            'Pratique escuta ativa em suas conversas, fazendo perguntas aprofundadas.',
            'Ofereça ajuda sem esperar retorno imediato para construir relacionamentos sólidos.',
            'Aprenda a pedir feedback e ajuda de forma clara e direta.',
            'Celebre genuinamente o sucesso dos outros e aprenda com eles.'
        ],
        skills: [
            'Identifique as 3-5 habilidades mais valorizadas em sua área e crie um plano de desenvolvimento.',
            'Dedique tempo consistente para aprendizado, mesmo que apenas 20 minutos diários.',
            'Busque projetos que o desafiem e exijam desenvolvimento de novas competências.',
            'Encontre mentores ou comunidades onde possa aprender com os mais experientes.',
            'Ensine o que está aprendendo para outras pessoas, solidificando seu conhecimento.'
        ],
        organization: [
            'Utilize um sistema de gestão de tarefas digital ou físico que funcione para você.',
            'Pratique a matriz de Eisenhower para priorizar tarefas (Urgente x Importante).',
            'Implemente limites de tempo para tarefas para evitar perfeccionismo paralisante.',
            'Crie sistemas para informações recorrentes e automatize tarefas quando possível.',
            'Planeje seu dia na noite anterior e revise suas prioridades pela manhã.'
        ],
        resilience: [
            'Reformule fracassos como experimentos e oportunidades de aprendizado.',
            'Desenvolva uma prática de autocuidado para momentos de estresse ou decepção.',
            'Mantenha perspectiva, questionando se um problema atual importará em um mês ou um ano.',
            'Cultive gratidão diária para equilibrar foco em problemas ou falhas.',
            'Busque exemplos de pessoas que superaram fracassos semelhantes aos seus.'
        ],
        communication: [
            'Pratique explicar conceitos complexos de forma simples e objetiva.',
            'Busque oportunidades para falar em público, mesmo em pequenos grupos.',
            'Solicite feedback específico sobre sua comunicação escrita e verbal.',
            'Aprenda técnicas de comunicação não-violenta para conversas difíceis.',
            'Prepare-se antecipadamente para comunicações importantes com pontos-chave.'
        ],
        decisions: [
            'Crie um processo de tomada de decisão pessoal para decisões importantes.',
            'Pratique a visualização de cenários futuros para diferentes opções.',
            'Implemente revisões periódicas de decisões passadas para identificar padrões.',
            'Para decisões complexas, consulte pessoas com diferentes perspectivas.',
            'Aprenda a distinguir entre decisões reversíveis e irreversíveis, e ajuste o tempo de análise.'
        ]
    };

    // Níveis de resultado por categoria
    const resultLevels = [
        { min: 1, max: 1.8, label: 'Excelente', description: 'Você demonstra comportamentos altamente eficazes nesta área.' },
        { min: 1.81, max: 2.6, label: 'Bom', description: 'Você tem práticas positivas, com algumas oportunidades de melhoria.' },
        { min: 2.61, max: 3.4, label: 'Moderado', description: 'Existem aspectos que podem estar limitando seu potencial.' },
        { min: 3.41, max: 4.2, label: 'Preocupante', description: 'Esta área representa um obstáculo significativo para seu sucesso.' },
        { min: 4.21, max: 5, label: 'Crítico', description: 'Padrões nesta área estão seriamente comprometendo suas chances.' }
    ];

    // Feedback geral com base na pontuação média
    const overallFeedbacks = [
        { min: 1, max: 1.8, text: 'Sua autoavaliação indica que você possui mentalidade e comportamentos que favorecem fortemente o sucesso. Continue aprimorando suas estratégias e sirva como exemplo para outros.' },
        { min: 1.81, max: 2.6, text: 'Você demonstra muitas atitudes positivas para o sucesso, com algumas áreas específicas que merecem atenção. Concentre-se nessas oportunidades de melhoria.' },
        { min: 2.61, max: 3.4, text: 'Sua autoavaliação revela uma mistura de práticas eficazes e ineficazes. Trabalhe para fortalecer áreas positivas enquanto aborda comportamentos limitantes.' },
        { min: 3.41, max: 4.2, text: 'Existem padrões significativos de autossabotagem em várias áreas de sua vida. Abordar esses comportamentos é crucial para desbloquear seu potencial.' },
        { min: 4.21, max: 5, text: 'Sua autoavaliação indica padrões críticos de autolimitação. Recomenda-se uma reestruturação significativa de comportamentos e crenças, possivelmente com ajuda profissional.' }
    ];

    // Iniciar o questionário
    startBtn.addEventListener('click', function() {
        introSection.classList.add('hidden');
        questionnaireSection.classList.remove('hidden');
        renderQuestion(0);
        updateProgress();
    });

    // Navegar para a próxima pergunta
    nextBtn.addEventListener('click', function() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            renderQuestion(currentQuestionIndex);
            updateProgress();
        } else {
            showResults();
        }

        if (currentQuestionIndex > 0) {
            prevBtn.disabled = false;
        }

        if (currentQuestionIndex === questions.length - 1) {
            nextBtn.textContent = 'Ver Resultados';
        }
    });

    // Navegar para a pergunta anterior
    prevBtn.addEventListener('click', function() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            renderQuestion(currentQuestionIndex);
            updateProgress();
        }

        if (currentQuestionIndex === 0) {
            prevBtn.disabled = true;
        }

        nextBtn.textContent = 'Próxima';
    });

    // Reiniciar o questionário
    restartBtn.addEventListener('click', function() {
        resultsSection.classList.add('hidden');
        introSection.classList.remove('hidden');
        currentQuestionIndex = 0;
        userAnswers = [];
        nextBtn.textContent = 'Próxima';
    });

    // Função para renderizar a pergunta atual
    function renderQuestion(index) {
        const question = questions[index];
        questionContainer.innerHTML = '';
        
        const questionElement = document.createElement('div');
        questionElement.className = 'question';
        questionElement.innerHTML = `<h3>${question.text}</h3>`;
        
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options';
        
        question.options.forEach((option, optionIndex) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            if (userAnswers[index] === optionIndex) {
                optionElement.classList.add('selected');
            }
            
            optionElement.innerHTML = `
                <input type="radio" id="option-${optionIndex}" name="question-${index}" value="${option.value}" ${userAnswers[index] === optionIndex ? 'checked' : ''}>
                <label for="option-${optionIndex}">${option.text}</label>
            `;
            
            optionElement.addEventListener('click', function() {
                document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                userAnswers[index] = optionIndex;
            });
            
            optionsContainer.appendChild(optionElement);
        });
        
        questionElement.appendChild(optionsContainer);
        questionContainer.appendChild(questionElement);
    }

    // Atualizar a barra de progresso
    function updateProgress() {
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}%`;
    }

    // Calcular os resultados e exibir
    function showResults() {
        questionnaireSection.classList.add('hidden');
        resultsSection.classList.remove('hidden');

        // Calcular pontuações por categoria
        const categoryScores = {};
        const categoryQuestionCounts = {};

        categories.forEach(category => {
            categoryScores[category.id] = 0;
            categoryQuestionCounts[category.id] = 0;
        });

        userAnswers.forEach((answerIndex, questionIndex) => {
            const question = questions[questionIndex];
            const score = question.options[answerIndex].value;
            const categoryId = question.category;
            
            // Para perguntas com pontuação invertida (maior = pior)
            const adjustedScore = question.negativeScoring ? score : (6 - score);
            
            categoryScores[categoryId] += adjustedScore;
            categoryQuestionCounts[categoryId]++;
        });

        // Calcular médias por categoria
        const categoryAverages = {};
        let totalScore = 0;
        let answeredQuestions = 0;

        Object.keys(categoryScores).forEach(categoryId => {
            if (categoryQuestionCounts[categoryId] > 0) {
                categoryAverages[categoryId] = categoryScores[categoryId] / categoryQuestionCounts[categoryId];
                totalScore += categoryScores[categoryId];
                answeredQuestions += categoryQuestionCounts[categoryId];
            } else {
                categoryAverages[categoryId] = 0;
            }
        });

        // Calcular pontuação geral (média de todas as respostas)
        const overallAverage = answeredQuestions > 0 ? totalScore / answeredQuestions : 0;

        // Atualizar visualização da pontuação geral
        const overallScorePercentage = ((5 - overallAverage) / 4) * 100;
        gaugeFill.style.width = `${overallScorePercentage}%`;

        // Encontrar feedback geral apropriado
        const appropriateFeedback = overallFeedbacks.find(feedback => 
            overallAverage >= feedback.min && overallAverage <= feedback.max
        );

        overallFeedback.textContent = appropriateFeedback ? appropriateFeedback.text : 'Não foi possível determinar um feedback geral.';

        // Renderizar resultados por categoria
        categoryResults.innerHTML = '';
        categories.forEach(category => {
            const average = categoryAverages[category.id];
            if (average > 0) {
                const resultLevel = resultLevels.find(level => 
                    average >= level.min && average <= level.max
                );

                const categoryScorePercentage = ((5 - average) / 4) * 100;
                const categoryColors = {
                    'Excelente': '#27ae60',
                    'Bom': '#2ecc71',
                    'Moderado': '#f39c12',
                    'Preocupante': '#e67e22',
                    'Crítico': '#e74c3c'
                };

                const categoryElement = document.createElement('div');
                categoryElement.className = 'category-score';
                categoryElement.innerHTML = `
                    <div class="category-title">
                        <span>${category.name}</span>
                        <span>${resultLevel.label} (${average.toFixed(1)})</span>
                    </div>
                    <div class="category-bar">
                        <div class="category-fill" style="width: ${categoryScorePercentage}%; background-color: ${categoryColors[resultLevel.label]}"></div>
                    </div>
                    <div class="category-feedback">${resultLevel.description} <em>${category.description}.</em></div>
                `;

                categoryResults.appendChild(categoryElement);
            }
        });

        // Gerar recomendações personalizadas
        recommendationContent.innerHTML = '';
        
        // Identificar as categorias mais problemáticas (maiores médias para negativeScoring)
        const sortedCategories = Object.keys(categoryAverages)
            .filter(categoryId => categoryAverages[categoryId] > 0)
            .sort((a, b) => categoryAverages[b] - categoryAverages[a]);
        
        // Pegar as 3 categorias mais problemáticas
        const topCategories = sortedCategories.slice(0, 3);
        
        // Gerar recomendações para essas categorias
        topCategories.forEach(categoryId => {
            const category = categories.find(cat => cat.id === categoryId);
            const categoryRecommendations = recommendations[categoryId];
            
            if (category && categoryRecommendations) {
                const categoryElement = document.createElement('div');
                categoryElement.innerHTML = `<h4>${category.name}</h4>`;
                
                const recList = document.createElement('ul');
                categoryRecommendations.forEach(rec => {
                    const recItem = document.createElement('li');
                    recItem.className = 'recommendation';
                    recItem.textContent = rec;
                    recList.appendChild(recItem);
                });
                
                categoryElement.appendChild(recList);
                recommendationContent.appendChild(categoryElement);
            }
        });
    }
});