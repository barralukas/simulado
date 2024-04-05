document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById('start');
    const timerDisplay = document.getElementById('timer');
    const quizContainer = document.getElementById('quiz-container');
    const navigationButtons = document.getElementById('navigation-buttons');
    const closeButtons = document.getElementById('close-buttons');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const submitButton = document.getElementById('submit');
    const restartButton = document.getElementById('restart');
    const login = document.querySelector('.login');

    let score = 0;
    let time;
    let timerInterval;
    const userAnswers = new Array(40).fill(null);

    const questions = [
        { 
            question: "O trânsito sobre passeios e calçadas é permitido para",
            options: ["A) fugir de congestionamento; ", "B) cortar caminho; ", "C) apanhar passageiros; ", "D) acesso a estacionamento e/ou imóveis;", " E) desviar de buracos."],
            correct: "D) acesso a estacionamento e/ou imóveis;" 
          },
          
           { 
            question: " Quando o condutor de veículo não poderá entrar em uma  interseção mesmo que a indicação luminosa do semáforo lhe  seja favorável? ",
            options: ["A)	quando ele for realizar uma conversão; ", "B)	quando ele for realizar uma manobra de retorno. ", "C)	quando houver uma placa dê Dè a Preferência para ele; ", "quando houver uma placa de 'Parada Obrigatória para ele'; ", "E) quando houver possibilidade de ser obrigado a imobilizar o  veículo na área do cruzamento; "],
            correct: "E) quando houver possibilidade de ser obrigado a imobilizar o  veículo na área do cruzamento; " 
          },
          
          { 
            question: "André tem 25 (vinte e cinco) anos e é habilitado na Categoria 'B'  desde os 18 (dezoito) anos. Seu pai possui 3 (três) caminhões  para transporte de carga, cada um com peso bruto total superior  a 10 (dez) mil quilos. Para ajudar nos negócios do pai, André  passou a dirigir um dos caminhões. André, nesse caso: ",
            options: ["A)	comete infração de trânsito, passível de penalidade de  advertência, pois é condutor habilitado; ", "B)	comete infração grave, passível de penalidade de multa e  apreensão do veículo, além do recolhimento da CNH. ", "C)	comete infração de trânsito de natureza leve, passível de  penalidade de multa; ", "D)	não comete infração de trânsito, mas deve obter habilitação  para dirigir os caminhões do pai; ", " E) comete infração gravíssima, passível de multa e retenção do veículo;"],
            correct: " E) comete infração gravíssima, passível de multa e retenção do veículo;"
          },
          
          { 
            question: "Veículos cuja lotação não exceda 8 (oito) lugares, excluído o do  motorista, podem ser conduzidos por quem possui habilitação  de categoria: ",
            options: ["A)	'D' ", "B) Todas as alternativas estão corretas. ", "C) 'E'  ", "D) 'B' ", "E)'C' "],
            correct: "B) Todas as alternativas estão corretas. " 
          },
          { 
            question: "O ciclista será equiparado ao pedestre, em direitos e deveres,  quando ele estiver",
            options: ["A)	transitando em uma rodovia, ", "B)transitando em uma via de trânsito rápido; ", "C)transitando junto ao bordo da pista de rolamento; ", "D) desmontado empurrando a bicicleta; ", "E) transitando pela contramão de direção."],
            correct: "D) desmontado empurrando a bicicleta; " 
          },
          
          { 
            question: " Quantos pontos são computados no prontuário do condutor a  cada infração gravíssima?",
            options: ["A) 7 (sete) pontos; ", "B)	2 (dois) pontos; ", "C)	3 (três) pontos; ", "D)	5 (cinco) pontos; ", "E)	6 (seis) pontos "],
            correct: "A) 7 (sete) pontos; " 
          },
          
          { 
            question: " Poderá ser aplicada advertência por escrito nas infrações: ",
            options: [" A) médias e graves. ", " B) gravíssimas; ", "C) leves ou médias; ", "D)	leves, médias ou graves; ", "E)	graves; "],
            correct: "C) leves ou médias; " 
          },
          
          { 
            question: "Diante da placa A-3b você entende que vai encontrar: ",
            options: ["A) 2 (duas) curvas sucessivas, sendo a primeira à direita; ", "B)1 (uma) curva acentuada à esquerda. ", "C)3 (três) ou mais curvas sucessivas, sendo a primeira à  esquerda, ", "D)2 (duas) curvas sucessivas, sendo a primeira à esquerda; ", "E)3 (três) ou mais curvas sucessivas, sendo a primeira à direita; "],
            correct: "A) 2 (duas) curvas sucessivas, sendo a primeira à direita; " 
          },
          
          { 
            question: "Para que serve a sinalização horizontal denominada 'marcação  de área de conflito'? ",
            options: [" A) para indicar, aos condutores, um local onde é comum a  existência de conflitos e discussões entre os pedestres. ", " B) para indicar, aos condutores, a área da pista onde não devem parar os veículos, prejudicando a circulação; ", "C)	para indicar, aos condutores, a área da pista com alto índice  de acidentes; ", "D)	para indicar, aos condutores, um local onde é comum a  existência de conflitos e discussões entre os condutores de  veículos; ", "E)	para indicar, aos condutores e pedestres, a área da pista e da  calçada onde eles não podem circular, parar ou estacionar "],
            correct: " B) para indicar, aos condutores, a área da pista onde não devem parar os veículos, prejudicando a circulação	;" 
          },
          
          { 
            question: "Dirigir veículo sem usar lentes corretoras de visão é  considerado infração: ",
            options: ["A) gravíssima; ", "B) média;  ", "C) moderada. ", "D)grave", "E)leve; "],
            correct: "A) gravíssima; " 
          },
          { 
            question: " Quantos pontos são computados no prontuário do condutor a  cada infração gravíssima? ",
            options: ["A)	2 (dois) pontos; ", "B)	3 (três) pontos; ", "C)	5 (cinco) pontos; ", " D) 7 (sete) pontos; ", " E) 6 (seis) pontos; "],
            correct: " D) 7 (sete) pontos; " 
          },
          
          { 
            question: " O uso do farol durante o dia, nas rodovias, ajuda na identificação  da presença do veículo na pista e na identificação do seu sentido de direção. De acordo com a Lei 13.290/2016, o uso do farol durante o dia,  nas rodovias, é: ",
            options: ["A)	obrigatório apenas para os veículos registrados na categoria  'aluguel'. ", "B)	recomendável para todos os veículos; ", "C)recomendável apenas para os veículos de grande porte; ", "D)	obrigatório apenas para os veículos de grande porte; ", "E) obrigatório para todos os veículos; "],
            correct: "E) obrigatório para todos os veículos; " 
          },
          
          { 
            question: " O condutor que dirigir, sob a influência de álcool ou de qualquer  substância psicoativa que determine dependência, será  suspenso de dirigir: ",
            options: ["A)	de 1 (um) a 12 (doze) meses, a critério da Autoridade de Trânsito; ", "B)	de 12 (doze) a 24 (vinte e quatro) meses, a critério da  Autoridade de Trânsito. ", "C) por 12 (doze) meses; ", "D)por 24 (vinte e quatro) meses; ", "E)	por prazo indeterminado; "],
            correct: "C) por 12 (doze) meses; " 
          },
          
          { 
            question: " Conceder autorização para a condução de veículos de  propulsão humana e de tração animal compete: ",
            options: ["A)	aos órgãos e às entidades executivos de trânsito dos  Estados, no âmbito de sua circunscrição; ", "B)ao CONTRAN; ", "C)	todas as alternativas estão corretas. ", "D)à Polícia Rodoviária Federal; ", " E) aos órgãos e às entidades executivos de trânsito dos municípios, no âmbito de sua circunscrição;"],
            correct: " E) aos órgãos e às entidades executivos de trânsito dos municípios, no âmbito de sua circunscrição;" 
          
          },
          
          { 
            question: " Os caracteres gravados no chassi ou no monobloco do veículo  são considerados dispositivos de: ",
            options: ["A)	comunicação do veículo; ", "B)	segurança do veículo ", "C)proteção do veículo", "D) informação do veículo: ", " E) identificação do veículo; "],
            correct: " E) identificação do veículo; " 
          },
          
          { 
            question: " O veículo estacionado na contramão está sujeito a: ",
            options: ["A) multa e remoção; ", "B)	multa; ", "C)multa e retenção; ", "D)multa e apreensão; ", "E)multa e cassação da habilitação"],
            correct: "A) multa e remoção; " 
          },
          
          { 
            question: " Sobre a pontuação registrada no prontuário do condutor  infrator, é correto afirmar que:",
            options: [" A) a cada 12 (doze) meses é zerada a pontuação perdida no prontuário do infrator,", "B)	para que a CNH seja apreendida é necessário que o condutor  perca mais de 20 (vinte) pontos em seu prontuário; ", "C)	ao atingir 20 (vinte) pontos no prontuário, a permissão para  dirigir será cassada. ", "D)	ao atingir 20 (vinte) pontos no prontuário, a permissão para  dirigir será apreendida; ", "E)	após receber uma notificação por infração foi cometida, o  proprietário terá 15 (quinze) dias para apontar o verdadeiro  infrator para que ele não perca pontos em seu prontuário; 24- "],
            correct: " A) a cada 12 (doze) meses é zerada a pontuação perdida no prontuário do infrator," 
          },
          
          { 
            question: "As vias classificam-se em: ",
            options: ["A) via de trânsito rápido, arterial, coletora e local; ", "B) vias urbanas e rurais; ", "C)	via de trânsito rápido, preferencial, coletora e local; ", "D)	rodovias e estradas; ", "E)	rodovias, vias de trânsito rápido e vias de trânsito lento. "],
            correct: "B) vias urbanas e rurais; " 
          },
          
          { 
            question: "Marque a alternativa incorreta. Nos cruzamentos sem  sinalização:",
            options: ["A)	entre uma rua e uma avenida a preferência é do veículo que  estiver à direita; ", "B) entre uma via asfaltada e uma via calçada a preferência será  do veículo que transita pela via asfaltada, pois a velocidade nela  é maior;", "C)	entre um ônibus e um caminhão a preferência é de quem estiver à direita; ", "D)	a preferência é de quem estiver à direita", "E)	entre um carro e uma motocicleta a preferência é de quem  estiver à direita. "],
            correct: "B) entre uma via asfaltada e uma via calçada a preferência será  do veículo que transita pela via asfaltada, pois a velocidade nela  é maior;" 
          },
          
          { 
            question: " Sempre que o infrator atingir a contagem de 20 (vinte) pontos, no  período de 12 (doze) meses, ocorrerá a 'suspensão do direito de  dirigir' pelo prazo: ",
            options: ["A) mínimo de 1 (um) mês e máximo de 1 (um) ano; ", "B) mínimo de 3 (três) meses e máximo de 1 (um) ano. ", "C)	mínimo de 6 (seis) meses e máximo de 1 (um) ano; ", "D)	mínimo de 2 (dois) meses e máximo de 6 (seis) meses; ", "E)mínimo de 1 (um) mês e máximo de 2 (dois) anos; "],
            correct: "A) mínimo de 1 (um) mês e máximo de 1 (um) ano; " 
          
          },
          
          { 
            question: " Qual a primeira providência antes de fazer qualquer modificação  no veículo? ",
            options: [" A) pedir autorização ao prefeito da cidade; ", " B) pedir autorização ao governador do estado; ", "C)pedir autorização ao INMETRO. ", "D)	pedir autorização ao Centro de Formação de Condutores (autoescola); ", " E) pedir autorização às autoridades de trânsito; "],
            correct: " E) pedir autorização às autoridades de trânsito; " 
          },
          
          { 
            question: "A placa A-17 adverte que existe: ",
            options: [" A) lombada adiante.", "B) trecho perigoso pela irregularidade de sua superfície; ", " C) pista irregular seguida de ponte mövel; ", "D)saliência à sua frente: ",  "E)depressão na pista de rolamento; "],
            correct: "B) trecho perigoso pela irregularidade de sua superfície; " 
          },
          
          { 
            question: " Ao estacionar em uma via não sinalizada, o automóvel deve ser  posicionado: ",
            options: ["A) a 45° (quarenta e cinco graus) da guia de calçada; ", " B) paralelo ao bordo da pista de rolamento e junto à guia de calçada;", "C)todas as alternativas estão corretas. ", "D)	em sentido contrário ao fluxo de veículos; ", "E)	a 90° (noventa graus) da guia de calçada; "],
            correct: " B) paralelo ao bordo da pista de rolamento e junto à guia de calçada;" 
          },
          
          { 
            question: " Quando o condutor desobedecer às ordens emanadas da  autoridade competente de trânsito ou de seus agentes será  punido com: ",
            options: ["A)	multa e apreensão da Carteira Nacional de Habilitação; ", "B)advertência escrita pelo Diretor do DETRAN; ", "C)	multa e advertência pelo Diretor do DENATRAN ", "D) multa; ", "E) multa e advertência pelo Diretor do DETRAN; "],
            correct: "D) multa; " 
          },
    ];
    
    questions.sort(() => Math.random() - 0.5);
    let currentQuestionIndex = 0;

    startButton.addEventListener('click', startSimulado);

    function startSimulado() {
        login.style.display = 'none';
        startButton.style.display = 'none';
        timerDisplay.style.display = 'block';
        quizContainer.style.display = 'block';
        navigationButtons.style.display = 'flex';
        closeButtons.style.display = 'flex';
        restartButton.style.display = 'none';
        time = 40 * 60;
        startTimer();
        displayQuestion(currentQuestionIndex);
    }

    function startTimer() {
        function updateTimer() {
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            timerDisplay.textContent = `Tempo Restante: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            time -= 1;

            if (time < 0) {
                clearInterval(timerInterval);
                displayResult();
            }
        }

        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
    }

    function displayQuestion(index) {
        const question = questions[index];
        const questionEl = document.createElement('div');
        questionEl.classList.add('question');
        questionEl.innerHTML = `<h3>${currentQuestionIndex + 1} - ${question.question}</h3>` +
            question.options.map((option, idx) =>
                `<div class="options" data-value="${option}" id="question${index}_option${idx}">${option}</div>`
            ).join('');

        quizContainer.innerHTML = '';
        quizContainer.appendChild(questionEl);

        document.querySelectorAll('.options').forEach(option => {
            option.addEventListener('click', function() {
                checkAnswerAndProvideFeedback(index, this.getAttribute('data-value'));
            });
        });
    }

    function checkAnswerAndProvideFeedback(index, selectedOption) {
        const optionsDivs = quizContainer.querySelectorAll('.options');
        optionsDivs.forEach(div => {
            const optionValue = div.getAttribute('data-value');
            div.classList.remove('correct', 'incorrect');
            if (optionValue === questions[index].correct) {
                div.classList.add('correct');
            } else if (optionValue === selectedOption) {
                div.classList.add('incorrect');
            }
        });

        userAnswers[index] = selectedOption;
        if (questions[index].correct === selectedOption) {
            if (userAnswers[index] !== 'answered') score++;
        }
        userAnswers[index] = 'answered';
    }

    function displayResult() {
        clearInterval(timerInterval);
        const result = score >= 28 ? "Aprovado" : "Reprovado";
        alert(`Simulado Encerrado! Resultado: ${score} de 40. Você foi ${result}.`);
        restartButton.style.display = 'inline-block';
    }

    restartButton.addEventListener('click', restartSimulado);

    function restartSimulado() {
        login.style.display = 'flex';
        startButton.style.display = 'block';
        timerDisplay.style.display = 'none';
        quizContainer.style.display = 'none';
        navigationButtons.style.display = 'none';
        closeButtons.style.display = 'none';
        restartButton.style.display = 'none';
        score = 0;
        userAnswers.fill(null);
        currentQuestionIndex = 0;
        questions.sort(() => Math.random() - 0.5);
        // startSimulado();
    }

    prevButton.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion(currentQuestionIndex);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
        }
    });

    submitButton.addEventListener('click', () => {
        clearInterval(timerInterval);
        displayResult();
    });
});
