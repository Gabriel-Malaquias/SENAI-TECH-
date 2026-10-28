// CONFIGURAÇÃO DE CORES CUSTOMIZADAS DO TAILWIND
tailwind.config = {
    theme: {
        extend: {
            colors: {
                senai: {
                    blue: '#0054A6',
                    dark: '#002D62',
                    light: '#EBF3FA',
                    accent: '#FF6B00'
                }
            }
        }
    }
};

// ESTADO GLOBAL DA APLICAÇÃO
let currentFontSize = 100;
let isLibrasActive = true;
let quizScore = 0;
let currentQuizIndex = 0;

// BASE DE DADOS DO QUIZ
const quizData = [
    {
        q: "1. Qual é a principal função da Memória RAM em um computador?",
        options: [
            "Armazenar arquivos permanentemente",
            "Armazenar dados temporários para acesso rápido pelo processador",
            "Exibir imagens no monitor",
            "Fornecer energia para os componentes"
        ],
        correct: 1
    },
    {
        q: "2. Na lógica de programação, para que serve a estrutura 'SE / SENÃO' (IF / ELSE)?",
        options: [
            "Para repetir um trecho de código infinitamente",
            "Para criar um banco de dados",
            "Para tomar decisões com base em uma condição",
            "Para desligar o computador"
        ],
        correct: 2
    },
    {
        q: "3. O que significa a sigla HTML no desenvolvimento web?",
        options: [
            "HyperText Markup Language",
            "High Technology Modern Language",
            "Home Tool Management Line",
            "Hardware Technical Mode Logic"
        ],
        correct: 0
    }
];

// NAVEGAÇÃO ENTRE ABAS
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.getElementById(`tab-${tabId}`).classList.remove('hidden');

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('text-senai-blue', 'text-senai-accent');
        btn.classList.add('text-gray-600');
    });
    
    const activeBtn = document.getElementById(`nav-${tabId}`);
    if (activeBtn) {
        activeBtn.classList.remove('text-gray-600');
        activeBtn.classList.add('text-senai-blue');
    }

    if (tabId === 'games') {
        initQuiz();
    }
}

// SALA DE AULA
function openLesson(type) {
    switchTab('modules');
    const titleEl = document.getElementById('lesson-title');
    if (type === 'basico') titleEl.innerText = "Aula 1.1: O que é Hardware e Software?";
    if (type === 'logica') titleEl.innerText = "Aula 2.1: Introdução a Algoritmos e Fluxogramas";
    if (type === 'dev') titleEl.innerText = "Aula 3.1: Construindo sua Primeira Página com HTML";
}

// ACESSIBILIDADE
function toggleFontSize(delta) {
    currentFontSize += delta * 10;
    if (currentFontSize < 80) currentFontSize = 80;
    if (currentFontSize > 130) currentFontSize = 130;
    document.getElementById('app-body').style.fontSize = `${currentFontSize}%`;
}

function toggleHighContrast() {
    document.getElementById('app-body').classList.toggle('high-contrast');
}

function toggleLibrasGlobal() {
    isLibrasActive = !isLibrasActive;
    const statusEl = document.getElementById('libras-status');
    const overlay = document.getElementById('libras-overlay');
    
    statusEl.innerText = isLibrasActive ? 'ON' : 'OFF';
    if (isLibrasActive) {
        overlay.classList.remove('hidden');
    } else {
        overlay.classList.add('hidden');
    }
}

function toggleLibrasOverlay() {
    const overlay = document.getElementById('libras-overlay');
    overlay.classList.toggle('hidden');
}

// DESAFIO RÁPIDO DA AULA
function checkAnswer(btn, isCorrect) {
    const feedback = document.getElementById('exercise-feedback');
    feedback.classList.remove('hidden', 'text-green-600', 'text-red-600');
    
    if (isCorrect) {
        feedback.innerText = "Correto! Memória RAM e Teclado são Hardwares físicos (+50 XP).";
        feedback.classList.add('text-green-600');
        btn.classList.add('bg-green-100', 'border-green-500');
    } else {
        feedback.innerText = "Incorreto. Tente novamente! Lembre-se: Hardware é a parte física.";
        feedback.classList.add('text-red-600');
        btn.classList.add('bg-red-100', 'border-red-500');
    }
}

// SISTEMA DE QUIZ GAMIFICADO
function initQuiz() {
    quizScore = 0;
    currentQuizIndex = 0;
    document.getElementById('quiz-score').innerText = `${quizScore} Pontos`;
    document.getElementById('quiz-screen').classList.remove('hidden');
    document.getElementById('quiz-result').classList.add('hidden');
    loadQuizQuestion();
}

function loadQuizQuestion() {
    const data = quizData[currentQuizIndex];
    document.getElementById('quiz-step').innerText = `Pergunta ${currentQuizIndex + 1} de ${quizData.length}`;
    document.getElementById('quiz-question').innerText = data.q;
    
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';

    data.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = "w-full text-left bg-gray-800 hover:bg-senai-blue text-white p-4 rounded-xl text-xs md:text-sm border border-gray-700 transition flex items-center justify-between";
        btn.innerHTML = `<span>${opt}</span> <i class="fa-solid fa-chevron-right text-xs opacity-50"></i>`;
        btn.onclick = () => handleQuizAnswer(idx);
        optionsContainer.appendChild(btn);
    });
}

function handleQuizAnswer(selectedIdx) {
    const data = quizData[currentQuizIndex];
    if (selectedIdx === data.correct) {
        quizScore += 100;
        document.getElementById('quiz-score').innerText = `${quizScore} Pontos`;
    }

    currentQuizIndex++;
    if (currentQuizIndex < quizData.length) {
        loadQuizQuestion();
    } else {
        document.getElementById('quiz-screen').classList.add('hidden');
        document.getElementById('quiz-result').classList.remove('hidden');
    }
}

function restartQuiz() {
    initQuiz();
}

// CHATBOT / GUIA VIRTUAL
function toggleChat() {
    document.getElementById('chat-box').classList.toggle('hidden');
}

function openChat() {
    document.getElementById('chat-box').classList.remove('hidden');
}

function handleChatSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    if (msg) {
        sendQuickMsg(msg);
        input.value = '';
    }
}

function sendQuickMsg(text) {
    const container = document.getElementById('chat-messages');
    
    // Mensagem Usuário
    const userDiv = document.createElement('div');
    userDiv.className = "bg-senai-blue text-white p-3 rounded-xl shadow-sm max-w-[85%] ml-auto text-right";
    userDiv.innerText = text;
    container.appendChild(userDiv);

    // Resposta Bot
    setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.className = "bg-white p-3 rounded-xl shadow-sm border border-gray-100 max-w-[85%]";
        
        let reply = "Essa é uma excelente dúvida! Posso te ajudar a explorar esse conteúdo nos nossos módulos de estudo ou através das aulas com Libras.";
        
        const lower = text.toLowerCase();
        if (lower.includes('algoritmo')) {
            reply = "Um <strong>Algoritmo</strong> é como uma receita de bolo: uma sequência lógica de passos para resolver um problema!";
        } else if (lower.includes('html')) {
            reply = "<strong>HTML</strong> é a linguagem de marcação usada para estruturar o conteúdo de todas as páginas da Web!";
        } else if (lower.includes('libras')) {
            reply = "Para ativar o intérprete de Libras, basta clicar no botão <strong>Intérprete Libras</strong> na barra superior!";
        }

        botDiv.innerHTML = reply;
        container.appendChild(botDiv);
        container.scrollTop = container.scrollHeight;
    }, 600);

    container.scrollTop = container.scrollHeight;
}