document.addEventListener("DOMContentLoaded", function () {
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
      question: "Qual o elemento que realiza a mistura ar—gasolina?",
      options: [
        "A) filtro de ar;",
        "B) carburador;",
        "C) bomba de gasolina;",
        "D) velas;",
        "E) cilindro."
      ],
      correct: "B) carburador;",
      subject: "Mecânica"
    },
    {
      question: "Quando se formar oxidação (um pó esverdeado, tipo mofo), nos terminais da bateria, você limpa com:",
      options: [
        "A) água detergente, escovando bastante, enxaguando e secando;",
        "B) água sanitária embebida em estopa, secando e colocando graxa;",
        "C) uma escova, passando uma solução de bicarbonato do sódio com uma estopa, e depois protegendo os terminais com vaselina;",
        "D) um pano umedecido com gasolina.",
        "E) óleo de linhaça, removendo a oxidação totalmente;"
      ],
      correct: "C) uma escova, passando uma solução de bicarbonato do sódio com uma estopa, e depois protegendo os terminais com vaselina;",
      subject: "Mecânica"
    },
    {
      question: "O sistema de lubrificação dos automóveis convencionais é composto de:",
      options: [
        "A) 3 (três) filtros;",
        "B) 5 (cinco) filtros;",
        "C) 1 (um) filtro;",
        "D) 2 (dois) filtros;",
        "E) 4 (quatro) filtros;"
      ],
      correct: "C) 1 (um) filtro;",
      subject: "Mecânica"
    },
    {
      question: "Marque a alternativa incorreta. No terceiro tempo do motor (EXPLOSÃO):",
      options: [
        "A) a vela solta uma faísca;",
        "B) a válvula de admissão permanece fechada;",
        "C) ocorre uma explosão dentro da câmara de combustão;",
        "D) o virabrequim efetua meia volta.",
        "E) a válvula de escapamento permanece aberta;"
      ],
      correct: "E) a válvula de escapamento permanece aberta;",
      subject: "Mecânica"
    },
    {
      question: "A finalidade da embreagem é:",
      options: [
        "A) evitar trancos no câmbio;",
        "B) transmitir progressivamente a potência do motor para a caixa do câmbio e rodas;",
        "C) reduzir a velocidade do veículo.",
        "D) deixar o motor morrer;",
        "E) transmitir o movimento do pedal para o engate e desengate do câmbio;"
      ],
      correct: "B) transmitir progressivamente a potência do motor para a caixa do câmbio e rodas;",
      subject: "Mecânica"
    },
    {
      question: "A finalidade principal do conjunto amortecedor e mola é:",
      options: [
        "A) evitar a quebra da suspensão;",
        "B) absorver os impactos e as ondulações mais fortes da pista;",
        "C) reduzir o impacto, em caso de acidentes;",
        "D) parar o veículo;",
        "E) reduzir a rotação do motor."
      ],
      correct: "B) absorver os impactos e as ondulações mais fortes da pista;",
      subject: "Mecânica"
    },
    {
      question: "Observando os recipientes internos da bateria do seu veículo, você constata que o nível da água está baixo. Para completá-la, você coloca água:",
      options: [
        "A) apenas nos recipientes das extremidades da bateria;",
        "B) nos recipientes de cada elemento da bateria, até que transbordem;",
        "C) nos recipientes de cada elemento da bateria, sem que transbordem;",
        "D) apenas nos recipientes centrais da bateria;",
        "E) somente em alguns recipientes de forma alternada;"
      ],
      correct: "C) nos recipientes de cada elemento da bateria, sem que transbordem;",
      subject: "Mecânica"
    },
    {
      question: "Peças que transportam a gasolina do tanque ao carburador:",
      options: [
        "A) bomba de gasolina;",
        "B) radiador;",
        "C) tubulações;",
        "D) carburador;",
        "E) tanque de gasolina;"
      ],
      correct: "A) bomba de gasolina;",
      subject: "Mecânica"
    },
    {
      question: "Qual, entre os itens a seguir, interfere na segurança do trânsito, podendo causar um acidente?",
      options: [
        "A) falta de buzina;",
        "B) sistema de direção ajustado;",
        "C) pneus calibrado;",
        "D) suspensão alinhada;",
        "E) lâmpadas e faróis em bom estado;"
      ],
      correct: "E) lâmpadas e faróis em bom estado;",
      subject: "Mecânica"
    },
    {
      question: "O motorista coloca a chave na ignição, gira para ligar o carro não acende nenhuma lâmpada no painel do veículo. Isso indica que pode ser um problema com:",
      options: [
        "A) o carburador;",
        "B) bateria;",
        "C) as juntas de vedação do motor;",
        "D) radiador;",
        "E) o amortecedor;"
      ],
      correct: "B) bateria;",
      subject: "Mecânica"
    },
    {
      question: "O cárter serve para armazenar.",
      options: [
        "A) água;",
        "B) fluído de freio;",
        "C) óleo lubrificante;",
        "D) combustível;",
        "E) pó de amianto da pastilha de freio;"
      ],
      correct: "C) óleo lubrificante;",
      subject: "Mecânica"
    },
    {
      question: "A mistura ar-combustível é feita pelo:",
      options: [
        "A) condensador;",
        "B) radiador;",
        "C) distribuidor;",
        "D) carburador ou injeção eletrônica;",
        "E) bomba de combustível;"
      ],
      correct: "D) carburador ou injeção eletrônica;",
      subject: "Mecânica"
    },
    {
      question: "Marque a alternativa correta:",
      options: ["A) o melhor local do corpo para acharmos a pulsação é o pescoço;", "B) para verificar a pulsação de uma vítima devemos usar o nosso polegar;", "C) podemos dar água a vítimas inconscientes;", "D) as luvas descartáveis são dispensáveis aos socorristas.", "E) o objetivo dos primeiros socorros é substituir o atendimento médico;"],
      correct: "A) o melhor local do corpo para acharmos a pulsação é o pescoço;",
      subject: "Primeiros socorros"
    },
    {
      question: "Seja para evitar acidentes ou para agir em casos de acidentes é extremamente importante:",
      options: ["A) ser imprudente;", "B) ser intolerante;", "C) todas as alternativas estão corretas.", "D) manter a calma;", "E) ser negligente;"],
      correct: "D) manter a calma;",
      subject: "Primeiros socorros"
    },
    {
      question: "Com o auxílio de uma 'máscara apropriada' (para evitar contrair doenças) sopre com força até perceber que os pulmões da vítima se expandem. Retire a boca e deixe a vítima expirar enquanto você inspira novamente. Essa operação deverá ser repetida:",
      options: ["A) 60 (sessenta) vezes por minuto;", "B) 3 (três) a 5 (cinco) vezes por minuto;", "C) 2 (duas) a 4 (quatro) vezes por minuto.", "D) aproximadamente 15 (quinze) vezes por minuto;", "E) 3 (três) vezes por minuto:"],
      correct: "B) 3 (três) a 5 (cinco) vezes por minuto;",
      subject: "Primeiros Socorros"
    },
    {
      question: "Não reagir por instinto ou por impulso:",
      options: ["A) é importante ao dirigir e ao prestar socorro às vítimas de acidentes;", "B) não é importante ao dirigir e nem ao prestar socorro às vítimas de acidentes;", "C) não é importante ao dirigir, mas é importante ao prestar socorro às vítimas de acidentes:", "D) é importante ao dirigir e não é importante ao prestar socorro às vítimas de acidentes;", "E) todas as alternativas estão corretas"],
      correct: "A) é importante ao dirigir e ao prestar socorro às vítimas de acidentes;",
      subject: "Primeiros Socorros"
    },
    {
      question: " Uma vítima de acidente de trânsito está gritando, com muita dor. O que fazer?",
      options: ["A) fazer compressas geladas no local da dor;", "B) passar uma pomada que contenha analgésico sobre o ferimento.", "C) dar-lhe remédio para dor;", "D) esperar a chegada do resgate;", "E) pedir pra vítima parar de gritar;"],
      correct: "D) esperar a chegada do resgate;",
      subject: "Primeiros Socorros"
    },
    {
      question: "O que não deve ser avaliado na análise primária?",
      options: ["A) temperatura;", "B) vias respiratórias.", "C) respiração;", "D) pulsação;", "E) movimentos dos membros;"],
      correct: "A) temperatura;",
      subject: "Primeiros Socorros"
    },
    {
      question: "O que se deve fazer para apagar as chamas nas roupas de uma vítima?",
      options: ["A) jogar água;", "B) abafar as chamas com toalha ou cobertor,", "C) jogar terra ou areia na vítima.", "D) apagar as chamas com extintor;", "E) abafar as chamas com uma lona plástica;"],
      correct: "A) jogar agua;",
      subject: "Primeiros Socorros"
    },
    {
      question: "Conforme a legislação de trânsito, o condutor de um veículo que, em situação de emergência, estiver imobilizado no leito viário deverá acionar de imediato as luzes de advertência (pisca-alerta) providenciando a colocação do triângulo de sinalização ou equipamento similar à distância mínima de:",
      options: ["A) 20 (vinte) metros da parte traseira do veículo.", "B) 50 (cinquenta) metros da parte traseira do veículo;", "C) 10 (dez) metros da parte traseira do veículo;", "D) 30 (trinta) metros da parte traseira do veículo;", "E) 100 (cem) metros da parte traseira do veículo;"],
      correct: "B) 50 (cinquenta) metros da parte traseira do veículo;",
      subject: "Primeiros Socorros"
    },
    {
      question: "É correto afirmar que:",
      options: ["A) alguém sempre deverá assumir a liderança do socorro;", "B) uma pessoa idosa tem ossos mais resistentes aos impactos;", "C) uma pessoa idosa tem ossos mais resistentes aos impactos;", "D) manter a calma significa não ter nenhuma pressa;", "E) mesmo quando tiver dúvidas, o socorrista deve realizar um procedimento de socorro."],
      correct: "A) alguém sempre devera assumir a liderança do socorro;",
      subject: "Primeiros Socorros"
    },
    {
      question: "O Curso de Primeiros Socorros nos acidentes não é formador de mão de obra qualificada e nem tem a intenção de ministrar curso de medicina de tráfego. Mas ajuda muito quando ensina:",
      options: ["A) verificar as condições gerais da vítima;", "B) utilizar métodos para não agravar a situação das vítimas;", "C) estacionar no acostamento e após o local do acidente;", "D) sinalizar o local do acidente;", "E) todas as alternativas são verdadeiras."],
      correct: "E) todas as alternativas são verdadeiras.",
      subject: "Primeiros Socorros"
    },
    {
      question: "Quando o condutor de um veículo não consegue enxergar o perigo ou quando uma situação perigosa não é percebida por ele:",
      options: ["A) Todas as alternativas estão corretas.", "B) as chances de acontecer um acidente não se alteram;", "C) reduzem as chances de acontecer um acidente;", "D) significa que jamais ocorrerá um acidente;", "E) aumentam as chances de acontecer um acidente;"],
      correct: "E) aumentam as chances de acontecer um acidente;",
      subject: "Primeiros Socorros"
    },
    {
      question: "Não é correto para ferimento aberto no tórax:",
      options: ["A) usar uma faixa de pano apertando bastante o ferimento;", "B) com cuidado para não prejudicar a respiração da vítima, realizando um curativo impedindo a entrada de ar.", "C) vedar o orifício rapidamente;", "D) se preciso, usar a própria mão para impedir a entrada de ar;", "E) colocar sobre o ferimento um chumaço de pano limpo;"],
      correct: "A) usar uma faixa de pano apertando bastante o ferimento;",
      subject: "Primeiros Socorros"
    },
    {
      question: "A torção de ossos de uma articulação, com ou sem rompimento dos ligamentos, é denominada:",
      options: ["A) luxação;", "B) fratura interna;", "C) fratura exposta;", "D) queimadura.", "E) entorse;"],
      correct: "E) entorse;",
      subject: "Primeiros Socorros"
    },
    {
      question: "Um dos procedimentos básicos para socorro em hemorragias externas é:",
      options: ["A) trocar o curativo várias vezes,", "B) manter a vítima sentada;", "C) aplicar a compressão manual ou digital;", "D) aplicar um torniquete.", "E) não se deve fazer nenhum procedimento;"],
      correct: "D) aplicar um torniquete.",
      subject: "Primeiros Socorros"
    },
    {
      question: "A preservação da vida e da saúde das pessoas no trânsito se dá em razão do conhecimento de técnicas de primeiros socorros e, sobretudo, pela:",
      options: ["A) Todas as alternativas estão corretas.", "B) capacitação dos motoristas para um comportamento negligente e imprudente no trânsito;", "C) capacitação dos motoristas para a prática de automatismos corretos e incorretos;", "D) capacitação dos motoristas para a prática da direção agressiva corretiva;", "E) capacitação dos motoristas para um comportamento seguro no trânsito;"],
      correct: "E) capacitação dos motoristas para um comportamento seguro no trânsito;",
      subject: "Primeiros Socorros"
    },
    {
      question: "Você somente deverá efetuar a massagem cardíaca em uma vítima de acidente:",
      options: ["A) quando a vítima apresentar fratura na coluna.", "B) quando tiver certeza de que o coração não está batendo;", "C) quando a vítima estiver com hemorragia;", "D) quando a vítima estiver com dor;", "E) quando a vítima não está respirando;"],
      correct: "B) quando tiver certeza de que o coração não está batendo;",
      subject: "Primeiros Socorros"
    },
    {
      question: "Em um acidente em que não podemos retirar o veículo do local, o triângulo deverá ser colocado:",
      options: ["A) não há necessidade de usá-lo,", "B) sobre o veículo envolvido no acidente.", "C) a pelo menos 30 m (trinta metros) do veículo envolvido no acidente;", "D) dentro do veículo em que há vítimas;", "E) a 1m (um metro) do veículo atingido:"],
      correct: "C) a pelo menos 30 m (trinta metros) do veículo envolvido no acidente;",
      subject: "Primeiros Socorros"
    },
    {
      question: "É considerado um sintoma comum de fratura interna:",
      options: ["A) sangramento interno;", "B) pupilas dilatadas;", "C) perda de consciência;", "D) salivação abundante;", "E) edema;"],
      correct: "E) edema;",
      subject: "Primeiros Socorros"
    },
    {
      question: "Dentre as condutas de primeiros socorros, podemos considerar como um 'ato de direção defensiva':",
      options: ["A) Todas as alternativas estão corretas.", "B) imobilizar membros fraturados;", "C) realizar massagem cardíaca na vítima;", "D) sinalizar o local do acidente;", "E) estancar sangramentos;"],
      correct: "A) Todas as alternativas estão corretas.",
      subject: "Primeiros Socorros"
    },
    {
      question: "Ao observar uma vítima que está sacudindo-se, ora contrai os músculos, ora relaxa, com respiração ruidosa, com secreção (espuma) pela boca, deve-se:",
      options: ["A) enfiar a mão na boca da vítima e puxar sua língua.", "B) esperar a pessoa acordar e perguntar se já teve estes sintomas antes;", "C) virar a pessoa de bruços, pois ela pode se afogar,", "D) não se aproximar, pois a secreção é contagiosa;", "E) tomar cuidado para que ela não se machuque com seus próprios movimentos;"],
      correct: "E) tomar cuidados para que ela não se machuque com seus próprios movimentos;",
      subject: "Primeiros Socorros"
    },
    {
      question: "Pulso fraco, sudorese, sede e mucosa seca e descorada são sintomas de uma:",
      options: ["A) fratura;", "B) parada cardíaca;", "C) hemorragia;", "D) luxação.", "E) parada respiratória;"],
      correct: "C) hemorragia;",
      subject: "Primeiros Socorros"
    },
    {
      question: "O número de batimentos cardíacos, por minuto, em uma pessoa adulta é de aproximadamente:",
      options: ["A) 50 (cinquenta) a 60 (sessenta) vezes;", "B) 100 (cem) a 110 (cento e dez) vezes;", "C) 120 (cento e vinte) a 140 (cento e quarenta) vezes;", "D) 20 (vinte) a 30 (trinta) vezes.", "E) 70 (setenta) a 80 (oitenta) vezes;"],
      correct: "B) 100 (cem) a 110 (cento e dez) vezes;",
      subject: "Primeiros Socorros"
    },
    {
      question: "Não é procedimento correto na aplicação de bandagem:",
      options: ["A) pedir para a vítima relaxar, antes de iniciar a aplicação da bandagem.", "B) nos membros superiores, enfaixar no sentido do braço para a mão;", "C) nos membros inferiores começar a enfaixar pelo pé em direção ao joelho;", "D) começar da extremidade para o centro;", "E) envolver (enrolar) sempre da esquerda para a direita;"],
      correct: "E) envolver (enrolar) sempre da esquerda para a direita;",
      subject: "Primeiros Socorros"
    },
    {
      question: "Se a vítima estiver com sinais claros que tem dificuldade de respirar, deve-se:",
      options: ["A) se a vítima estiver sangrando ou vomitando, virar sua cabeça para cima;", "B) deitá-la de costas e afrouxar suas roupas;", "C) realizar uma respiração boca a boca.", "D) passar álcool em seus pulsos;", "E) virá-la de bruços e tentar comprimir suas costas;"],
      correct: "C) realizar uma respiração boca a boca.",
      subject: "Primeiros Socorros"
    },
    {
      question: "Você somente deverá efetuar a massagem cardíaca em uma vítima de acidente:",
      options: ["A) quando a vítima não está respirando;", "B) quando a vítima estiver com dor,", "C) quando a vítima estiver com hemorragia;", "D) quando tiver certeza de que o coração não está batendo;", "E) quando a vítima apresentar fratura na coluna"],
      correct: "D) quando tiver certeza de que o coração não está batendo;",
      subject: "Primeiros Socorros"
    },
    {
      question: "As lesões da coluna vertebral são algumas das principais consequências dos acidentes de trânsito. O que fazer para não gravá-las?",
      options: ["A) segurar a vítima devagar para não machucá-la;", "B) colocar a vítima de lado;", "C) colocar a vítima sentada para aguardar o resgate chegar.", "D) não movimentar a vítima e aguardar o socorro profissional.", "E) ajudar a vítima a se levantar"],
      correct: "D) não movimentar a vítima e aguardar o socorro profissional.",
      subject: "Primeiros Socorros"
    },
    {
      question: "Quando ocorre um ferimento nos olhos, é necessário:",
      options: ["A) soprar bastante os olhos para tentar retirar a sujeira e cacos;", "B) colocar pomadas oftalmológicas;", "C) providenciar o fechamento do olho ferido e também do outro olho;", "D) jogar leite para limpar", "E) tentar tirar objetos cravados ou cacos;"],
      correct: "C) providenciar o fechamento do olho ferido e também do outro olho;",
      subject: "Primeiros Socorros"
    },
    {
      question: "A colisão com o veículo da frente pode causar fratura no pescoço dentre outras graves consequências. Uma das principais maneiras de evitar este tipo de colisão é:",
      options: ["A) manter a luz de ré em boas condições de uso e funcionamento;", "B) manter a luz de freio em boas condições de funcionamento;", "C) manter uma distância de segurança do veículo que transita à frente;", "D) usar os retrovisores do veículo;", "E) todas as alternativas estão corretas."],
      correct: "C) manter uma distância de segurança do veículo que transita à frente;",
      subject: "Primeiros Socorros"
    },
    {
      question: "O CONAMA e as agências ambientais do Estado e do Município têm como principais preocupações a:",
      options: ["A) fiscalização da produção de veículos;", "B) defesa da saúde e do meio ambiente;", "C) conservação dos equipamentos de segurança das estradas;", "D) orientação do fluxo de veículos nas vias urbanas;", "E) fiscalização do cumprimento das regras de trânsito;"],
      correct: "B) defesa da saúde e do meio ambiente;",
      subject: "Meio Ambiente"
    },
    {
      question: "Nas relações interpessoais que ocorrem constantemente no trânsito, cada cidadão deve zelar pela:",
      options: ["A) impulsividade;", "B) agressividade;", "C) cordialidade;", "D) todas alternativas corretas.", "E) deslealdade;"],
      correct: "C) cordialidade;",
      subject: "Meio Ambiente"
    },
    {
      question: "Um dos direitos do condutor no trânsito é:",
      options: ["A) transitar vias seguras e sinalizadas;", "B) optar pelo atendimento ou não da sinalização;", "C) definir a velocidade máxima de seu veículo numa rodovia;", "D) respeitar as regras de trânsito;", "E) não ser multado;"],
      correct: "A) transitar vias seguras e sinalizadas;",
      subject: "Meio Ambiente"
    },
    {
      question: "Realizar eficiente manutenção preventiva do veículo faz parte da direção segura e contribui com a preservação do meio ambiente. Assim, o condutor, deve saber que um dos poluentes expelidos pelos canos de escapamento dos automóveis é a fuligem, que:",
      options: ["A) pode agravar quadros alérgicos de asma;", "B) representa gotas de água lançadas no meio ambiente.", "C) é também conhecida como dióxido de enxofre;", "D) é também conhecida como óxido de nitrogênio;", "E) é composta por partículas sólidas, somente;"],
      correct: "A) pode agravar quadros alérgicos de asma;",
      subject: "Meio Ambiente"
    },
    {
      question: "Alguns cuidados que devemos ter com os veículos para reduzir a poluição do meio ambiente:",
      options: ["A) regular os carburadores ou sistema de injeção eletrônica;", "B) realizar manutenções preventivas e corretivas no sistema de escapamento do veículo;", "C) manter em bom estado de funcionamento bobina, ignição eletrônica, distribuidor e vela;", "D) todas alternativas corretas", "E) verificar e revisar qualquer ruído estranho no escapamento ( cano de descarga);"],
      correct: "D) todas alternativas corretas",
      subject: "Meio Ambiente"
    },
    {
      question: "Entre os procedimentos a seguir, apesar de correto, um não contribui com a diminuição da poluição:",
      options: ["A) consultar as especificações dos fabricantes de veículos;", "B) seguir risca os procedimentos de regulagem de motores;", "C) manter em boas condições de utilização o escapamento do veículo.", "D) correta manutenção dos veículos;", "E) rodízio de pneus;"],
      correct: "E) rodízio de pneus;",
      subject: "Meio Ambiente"
    },
    {
      question: "Todo cidadão deve:",
      options: ["A) Todas as alternativas estão corretas.", "B) impor sua opinião ao se relacionar com os demais integrantes do meio onde vive;", "C) jamais permitir, ao se relacionar com os demais integrantes da sociedade, que o seu direito dê lugar ao bom senso;", "D) respeitar seu semelhante em prol de relacionamentos interpessoais harmônicos;", "E) sempre exercer seus direitos nas relações interpessoais, custe o que custar;"],
      correct: "D) respeitar seu semelhante em prol de relacionamentos interpessoais harmônicos;",
      subject: "Meio Ambiente"
    },
    {
      question: "A má conservação e a regulagem inadequada dos veículos:",
      options: ["A) contribuem para a poluição do solo, apenas;", "B) contribuem para a poluição da água, apenas;", "C) não agridem o meio ambiente;", "D) causam somente poluição mental.", "E) contribuem, principalmente, para a poluição do ar e a poluição sonora;"],
      correct: "E) contribuem, principalmente, para a poluição do ar e a poluição sonora;",
      subject: "Meio Ambiente"
    },
    {
      question: "A chuva ácida:",
      options: ["A) aumenta a acidez das águas;", "B) Todas as alternativas estão corretas.", "C) aumenta a acidez do solo;", "D) é corrosiva;", "E) dificulta a agricultura;"],
      correct: "B) Todas as alternativas estão corretas.",
      subject: "Meio Ambiente"
    },
    {
      question: "Uma arborização urbana bem planejada irá auxiliar (ajudar) e promover um trânsito mais humanizado, pois:",
      options: ["A) não influi na saúde física e, sim, na mental dos indivíduos;", "B) influência na saúde física, mas não na mental dos indivíduos;", "C) piora o humor e o clima local;", "D) influência na saúde física e mental dos indivíduos;", "E) proporciona maior respeito à sinalização de trânsito."],
      correct: "D) influência na saúde física e mental dos indivíduos;",
      subject: "Meio Ambiente"
    },
    {
      question: "Um condutor de veículo costuma jogar lixo na via pública sem se importar com eventuais danos causados ao meio ambiente. Qual dos itens a seguir demora mais tempo para se decompor?",
      options: ["A) plástico;", "B) Toco cigarro.", "C) sanduíche de presunto;", "D) papelão;", "E) papel;"],
      correct: "A) plástico;",
      subject: "Meio Ambiente"
    },
    {
      question: "O principal gás que é expelido pelos motores dos veículos a gasolina é:",
      options: ["A) dióxidos de enxofre;", "B) aldeído.", "C) gás carbônico;", "D) gás metano;", "E) monóxido de carbono;"],
      correct: "E) monóxido de carbono;",
      subject: "Meio Ambiente"
    },
    {
      question: "Em quase toda atividade o ser humano necessita se relacionar com seus semelhantes. Por isso, no exercício da cidadania é importante que haja:",
      options: ["A) impaciência.", "B) Todas as alternativas estão corretas.", "C) bom senso;", "D) intolerância;", "E) ignorância;"],
      correct: "C) bom senso;",
      subject: "Meio Ambiente"
    },
    {
      question: "Poluição é a degradação da qualidade ambiental e altera o equilíbrio da natureza. Assinale a alternativa incorreta. A poluição é capaz de causar prejuízos:",
      options: ["A) à fauna,", "B) à flora,", "C) ao solo.", "D) aos veículos;", "E) à saúde humana;"],
      correct: "D) aos veículos;",
      subject: "Meio Ambiente"
    },
    {
      question: "Uma arborização urbana bem planejada irá auxiliar (ajudar) e promover um trânsito mais humanizado, pois:",
      options: ["A) não influi na saúde física e, sim, na mental dos indivíduos,", "B) influência na saúde física, mas não na mental dos indivíduos,", "C) piora o humor e o clima local;", "D) influência na saúde física e mental dos indivíduos,", "E) proporciona maior respeito à sinalização de trânsito."],
      correct: "D) influência na saúde física e mental dos indivíduos,",
      subject: "Meio Ambiente"
    },
    {
      question: "O condutor que vai parar o veículo no acostamento deve:",
      options: ["A) desengrenar o veículo, deixá-lo perder a velocidade e entrar no acostamento.", "B) acionar a luz indicadora de direção, reduzir a velocidade e entrar no acostamento, finalizando a manobra, acionando as luzes do pisca-alerta;", "C) acionar a luz indicadora de direção e entrar rapidamente no acostamento;", "D) acionar as luzes do pisca alerta e entrar no acostamento:", "E) aumentar a velocidade, entrar no acostamento e acionar as luzes do pisca-alerta;"],
      correct: "B) acionar a luz indicadora de direção, reduzir a velocidade e entrar no acostamento, finalizando a manobra, acionando as luzes do pisca-alerta;",
      subject: "Direção Defensiva"
    },
    {
      question: "Os preceitos da Direção Defensiva indicam que o condutor do veículo deve manter a atenção durante todo o tempo. Para respeitar o CTB, propiciar segurança aos passageiros e manter a atenção, o condutor responsável e defensivo deve saber que a forma correta de transportar bebês nos veículos é:",
      options: ["A) o bebê deve ficar no colo de um adulto sentado no banco de trás, sendo que esse adulto deve usar devidamente o cinto de segurança.", "B) o bebê deve ficar no colo de um adulto sentado no banco da frente, sendo que esse adulto deve usar devidamente o cinto de segurança.", "C) o bebê deve ficar no assento de segurança, virado para a traseira do veículo, utilizando o cinto de segurança desse tipo de assento, bem como o cinto do veículo deve manter o assento de segurança firme no banco de trás;", "D) o bebê deve ficar no banco da frente com assento de segurança;", "E) mão o bebé devem ficar no banco da frente, utilizando o mesmo cinto de segurança;"],
      correct: "C) o bebê deve ficar no assento de segurança, virado para a traseira do veículo, utilizando o cinto de segurança desse tipo de assento, bem como o cinto do veículo deve manter o assento de segurança firme no banco de trás;",
      subject: "Direção Defensiva"
    },
    {
      question: "Em uma ultrapassagem, uma das variáveis básicas envolvidas é a:",
      options: ["A) documentação e o licenciamento do veículo.", "B) distância de percepção;", "C) distância de parada;", "D) declividade da via;", "E) avaliação do risco a ser assumido durante a manobra;"],
      correct: "E) avaliação do risco a ser assumido durante a manobra;",
      subject: "Direção Defensiva"
    },
    {
      question: "Para controlar o veículo, ao aquaplanar, é necessário:",
      options: ["A) frear para que o veículo pare;", "B) colocar ponto neutro (ponto morto) e fazer movimentos no volante, para um lado e para o outro.", "C) manter firmeza no volante e não virar para os lados", "D) acelerar para que o veículo tome a direção desejada por você;", "E) virar a direção com força para que o veículo retome a aderência;"],
      correct: "C) manter firmeza no volante e não virar para os lados",
      subject: "Direção Defensiva"
    },
    {
      question: "Um condutor defensivo deve procurar forçar a sua concentração no ato de dirigir, acostumando-se a observar sempre e alternadamente os fatores abaixo, exceto:",
      options: ["A) os espelhos retrovisores;", "B) a posição de suas mãos no volante;", "C) a utilização de telefone celular através de viva-voz;", "D) a movimentação dos pedestres, em especial nas proximidades dos cruzamentos;", "E) a movimentação dos veículos não automotores."],
      correct: "C) a utilização de telefone celular através de viva-voz;",
      subject: "Direção Defensiva"
    },
    {
      question: "Qual a sequência correta do método básico de prevenção de acidentes que é usado no desenvolvimento de qualquer atividade do dia a dia, que envolva risco de morte:",
      Options: ["A) aja, veja e pense;", "B) veja, pense e não aja", "C) veja, aja e pense;", "D) veja, pense e aja;", "E) pense, veja e aja."],
      Correct: "D) veja, pense e aja;",
      subject: "Direção Defensiva"
    },
    {
      question: "A capacidade de escolher a reação mais apropriada, obtida pelo conhecimento das melhores alternativas nas situações de trânsito, a fim de evitar acidentes, relaciona-se a qual fundamento da direção defensiva preventiva?",
      Options: ["A) experiência;", "B) atenção.", "C) reflexos;", "D) prática", "E) decisão;"],
      Correct: "E) decisão;",
      subject: "Direção Defensiva"
    },
    {
      question: "O condutor de veículo que transita por vias onde há escolas ou grande movimentação de pedestres deve:",
      Options: ["A) realizar uma manobra de retorno para não passar próximo às escolas.", "B) usar a buzina para alertar os pedestres que estão passando;", "C) transitar em velocidade compatível com a segurança;", "D) conservar o veículo sempre na faixa esquerda da via;", "E) acelerar para deixar a via mais livre com menor tempo;"],
      Correct: "C) transitar em velocidade compatível com a segurança;",
      subject: "Direção Defensiva"
    },
    {
      question: "Direção defensiva é um procedimento que pode:",
      Options: ["A) aumentar os riscos e perigos a que estamos sujeitos no trânsito;", "B) levá-lo a transitar em vias com maior fluxo de veículos;", "C) reduzir acidentes de trânsito e, consequentemente, suas estatísticas;", "D) aumentar o número de infrações de trânsito.", "E) proteger o veículo dos demais usuários das vias;"],
      Correct: "C) reduzir acidentes de trânsito e, consequentemente, suas estatísticas;",
      subject: "Direção Defensiva"
    },
    {
      question: "Não interfere na distância de reação:",
      Options: ["A) a concentração do condutor,", "B) o estado do pneu do veículo;", "C) os reflexos do condutor.", "D) as condições físicas do condutor;", "E) a atenção do condutor;"],
      Correct: "B) o estado do pneu do veículo;",
      subject: "Direção Defensiva"
    },
    {
      question: "Em um cruzamento de pouco movimento e sem visibilidade, durante o dia, você:",
      Options: ["A) vai em frente confiando que está sendo visto,", "B) Realiza um retorno e não transpõe o cruzamento.", "C) reduz a velocidade, pisca os faróis e atravessa:", "D) buzina e segue em frente;", "E) para e só atravessa após ter certeza de que não vem ninguém:"],
      Correct: "E) para e só atravessa após ter certeza de que não vem ninguém:",
      subject: "Direção Defensiva"
    },
    {
      question: "Geralmente ocorre colisão de um veículo com o da frente, quando:",
      Options: ["A) não se utiliza os retrovisores.", "B) há avanço de sinal vermelho;", "C) não há sinalização;", "D) o sinal fecha;", "E) não é mantida a distância de segurança"],
      Correct: "E) não é mantida a distância de segurança",
      subject: "Direção Defensiva"
    },
    {
      question: "Não é considerado um fundamento para a prevenção de acidentes de trânsito (Direção Defensiva Preventiva) a(o):",
      Options: ["A) decisão;", "B) prática", "C) previsão.", "D) atenção;", "E) conhecimento;"],
      Correct: "B) prática",
      subject: "Direção Defensiva"
    },
    {
      question: "Cai a carga de um caminhão à sua frente. O que você faz?",
      Options: ["A) procura alcançar o caminhão e avisá-lo da queda da carga;", "B) para na pista e ajuda a remover a carga;", "C) para na pista e liga o pisca-alerta por segurança;", "D) desvia e continua o seu trajeto como se nada tivesse ocorrido.", "E) reduz a velocidade identificando o risco e sinaliza para os outros condutores;"],
      Correct: "E) reduz a velocidade identificando o risco e sinaliza para os outros condutores;",
      subject: "Direção Defensiva"
    },
    {
      question: "As estatísticas mostram que a maioria dos acidentes é causada por:",
      Options: ["A) má condição das vias;", "B) falta de freio no veículo;", "C) falha humana;", "D) falta de sinalização.", "E) fatores atmosféricos:"],
      Correct: "C) falha humana;",
      subject: "Direção Defensiva"
    },
    {
      question: "Deve-se manter a distância de segurança:",
      Options: ["A) somente em vias preferenciais;", "B) dos veículos que transitam à frente e atrás.", "C) apenas frontal;", "D) apenas lateral;", "E) lateral e frontal dos outros veículos;"],
      Correct: "E) lateral e frontal dos outros veículos;",
      subject: "Direção Defensiva"
    },
    {
      question: "Ao dirigir em uma rodovia, o condutor entra em um trecho com neblina muito intensa, praticamente impedindo a visão. Nessa situação ele deve:",
      Options: ["A) manter o veículo desengrenado e acionar o pisca-alerta.", "B) prosseguir a viagem com velocidade reduzida, acionando os faróis altos;", "C) parar no acostamento, ligando as luzes de posição do veículo;", "D) procurar um local seguro, fora da pista, para parar o veículo, sinalizar o local e aguardar a melhoria da visibilidade;", "E) manter velocidade alta, pois algum veículo pode bater na traseira do seu veículo, e acionar o pisca alerta;"],
      Correct: "D) procurar um local seguro, fora da pista, para parar o veículo, sinalizar o local e aguardar a melhoria da visibilidade;",
      subject: "Direção Defensiva"
    },
    {
      question: "Para mudar de faixa, nas paradas e nas conversões, o condutor deve:",
      options: ["A) sinalizar, parar e aguardar que os outros o mandem realizar a manobra;", "B) se preocupar apenas com os veículos que estão à sua frente, pois se alguém bater na traseira de seu veículo este alguém estará errado.", "C) sinalizar, buzinar e realizar a manobra;", "D) sinalizar e realizar a manobra sem outros cuidados, pois todos têm a obrigação de respeitá-la;", "E) sinalizar e verificar se os outros condutores notaram e entenderam a sua intenção e depois fazer a manobra;"],
      correct: "E) sinalizar e verificar se os outros condutores notaram e entenderam a sua intenção e depois fazer a manobra;",
      subject: "Direção Defensiva"
    },
    {
      question: "Os riscos de acidentes que podem ser oferecidos pelas vias estão relacionados:",
      options: ["A) às suas características;", "B) à fiscalização constante;", "C) aos pedestres;", "D) às condições do veículo.", "E) às condições ambientais;"],
      correct: "A) às suas características;",
      subject: "Direção Defensiva"
    },
    {
      question: "Em uma ultrapassagem, uma das variáveis básicas envolvidas é a:",
      options: ["A) avaliação do risco a ser assumido durante a manobra;", "B) documentação e o licenciamento do veículo.", "C) distância de percepção;", "D) declividade da via,", "E) distância de parada;"],
      correct: "A) avaliação do risco a ser assumido durante a manobra;",
      subject: "Direção Defensiva"
    },
    {
      question: "Durante a noite, em um cruzamento sem sinalização e sem visibilidade, em bairro residencial, você:",
      options: ["A) aumenta a velocidade para transpor o cruzamento o mais rápido possível.", "B) desliga as luzes por alguns momentos e, em seguida, atravessa com atenção;", "C) para e dá farol alto;", "D) diminui a velocidade e atravessa com atenção, após ter certeza que há segurança,", "E) vai em frente, confiando que está sendo visto;"],
      correct: "D) diminui a velocidade e atravessa com atenção, após ter certeza que há segurança,",
      subject: "Direção Defensiva"
    },
    {
      question: "Começou a garoar, sua visibilidade fica prejudicada. Nessa situação, você:",
      options: ["A) acende os faróis altos, mesmo durante o dia;", "B) acelera o veículo para chegar mais rápido ao seu destino,", "C) liga o pisca-alerta e transita devagar.", "D) reduz a velocidade, liga o limpador de para-brisa e o desembaçador para enxergar melhor;", "E) para o veículo e espera a garoa passar;"],
      correct: "D) reduz a velocidade, liga o limpador de para-brisa e o desembaçador para enxergar melhor;",
      subject: "Direção Defensiva"
    },
    {
      question: "Qual atitude deve ser tomada, estando conduzindo um automóvel em um semáforo que acaba de abrir (verde), porém um pedestre ainda atravessa sobre a faixa:",
      options: ["A) buzinar para que o pedestre atravesse mais rápido, pois o semáforo já abriu para você;", "B) acelerar o veículo, pois o ronco do motor irá advertir o pedestre que o semáforo dele já fechou;", "C) mostrar ao pedestre que o semáforo dele está fechado, apontando com o dedo;", "D) esperar como se o semáforo ainda estivesse fechado para você, pois deve ser dada a preferência aos pedestres que não tenham concluído a travessia;", "E) Xingar o pedestre que está sobre a faixa."],
      correct: "D) esperar como se o semáforo ainda estivesse fechado para você, pois deve ser dada a preferência aos pedestres que não tenham concluído a travessia;",
      subject: "Direção Defensiva"
    },
    {
      question: "O condutor de veículo que transita por vias onde há escolas ou grande movimentação de pedestres deve:",
      options: ["A) realizar uma manobra de retorno para não passar próximo às escolas.", "B) usar a buzina para alertar os pedestres que estão passando;", "C) acelerar para deixar a via mais livre em menor tempo;", "D) transitar em velocidade compatível com a segurança;", "E) conservar o veículo sempre na faixa esquerda da via;"],
      correct: "D) transitar em velocidade compatível com a segurança;",
      subject: "Direção Defensiva"
    },
    {
      question: "Durante o dia, sob chuva forte, o condutor deverá transitar pelo menos com o(a):",
      options: ["A) luz de ré acesa", "B) farol alto ligado;", "C) luz de freio ligada;", "D) luz de posição ligada;", "E) pisca alerta ligado;"],
      correct: "D) luz de posição ligada;",
      subject: "Direção Defensiva"
    },
    {
      question: "Como saber que o veículo saiu da aquaplanagem?",
      options: ["A) a direção fica bem leve;", "B) O freio não funciona.", "C) o veículo não obedece aos comandos do condutor;", "D) o interior do veículo fica úmido;", "E) o condutor volta a enxergar o rastro do pneu na pista por meio do retrovisor"],
      correct: "E) o condutor volta a enxergar o rastro do pneu na pista por meio do retrovisor",
      subject: "Direção Defensiva"
    },
    {
      question: "Além de obrigatório, o pisca-alerta é considerado equipamento de:",
      options: ["A) comunicação sonora;", "B) comunicação audiovisual.", "C) informação;", "D) comunicação luminosa;", "E) informação visual;"],
      correct: "D) comunicação luminosa;",
      subject: "Direção Defensiva"
    },
    {
      question: "São fundamentos da direção defensiva corretiva:",
      options: ["A) previsão, habilidade e decisão;", "B) interação, conhecimento e habilidade,", "C) todas as alternativas estão corretas.", "D) atenção, reflexos e previsão;", "E) prática, experiência e reflexos;"],
      correct: "E) prática, experiência e reflexos;",
      subject: "Direção Defensiva"
    },
    {
      question: "Marque a alternativa que completa, adequadamente, a seguinte frase: A Direção Defensiva se divide em:",
      options: ["A) Defensiva e Agressiva;", "B) Fixa e Dispersiva;", "C) Difusa e Preventiva;", "D) Difusa e Corretiva.", "E) Preventiva e Corretiva;"],
      correct: "E) Preventiva e Corretiva;",
      subject: "Direção Defensiva"
    },
    {
      question: "O uso do cinto de segurança pode evitar:",
      options: ["A) quebra do veículo;", "B) colisão com o veículo de trás.", "C) danos físicos aos passageiros do veículo em caso de acidente;", "D) capotamento do veículo;", "E) colisão dianteira;"],
      correct: "C) danos físicos aos passageiros do veículo em caso de acidente;",
      subject: "Direção Defensiva"
    },
    {
      question: "Não interfere na aderência do pneu com a pista a(o):",
      options: ["A) calibragem do pneu.", "B) velocidade impressa no veículo;", "C) marca do veículo;", "D) clima;", "E) tipo de solo onde o veículo trafega;"],
      correct: "C) marca do veículo;",
      subject: "Direção Defensiva"
    },
    {
      question: "O que não é condição adversa?",
      options: ["A) embriaguez alcoólica na direção do veículo;", "B) sinalização precária da via pública", "C) sol nascente ou poente;", "D) via pública urbana carente de iluminação;", "E) fumaça."],
      correct: "D) via pública urbana carente de iluminação;",
      subject: "Direção Defensiva"
    },
    {
      question: "Ao manter uma distância de segurança do veículo que segue à frente não é necessário considerar a(as):",
      options: ["A) condições da via onde você está.", "B) condições climáticas;", "C) velocidade que você está;", "D) condições do local onde você está;", "E) existência de agentes de trânsito na via pública;"],
      correct: "E) existência de agentes de trânsito na via pública;",
      subject: "Direção Defensiva"
    },
    {
      question: "Qual a melhor atitude do condutor em caso de ofuscamento natural?",
      options: ["A) evitar o uso de óculos de sol;", "B) fazer uso do quebra-sol e redobrar a atenção;", "C) realizar uma manobra de retorno para evitar referida situação de perigo.", "D) estacionar e aguardar que a intensidade da luz diminua;", "E) ajustar o retrovisor interno;"],
      correct: "B) fazer uso do quebra-sol e redobrar a atenção;",
      subject: "Direção Defensiva"
    },
    {
      question: "O trânsito sobre passeios e calçadas é permitido para:",
      options: ["A) fugir de congestionamento;", "B) cortar caminho;", "C) apanhar passageiros;", "D) acesso a estacionamento e/ou imóveis;", "E) desviar de buracos;"],
      correct: "D) acesso a estacionamento e/ou imóveis;",
      subject: "Legislação"
    },
    {
      question: "Quando o condutor de veículo não poderá entrar em uma interseção mesmo que a indicação luminosa do semáforo lhe seja favorável?",
      options: ["A) quando ele for realizar uma conversão;", "B) quando ele for realizar uma manobra de retorno.", "C) quando houver uma placa dê 'Dê a Preferência para ele';", "D) quando houver uma placa de 'Parada Obrigatória para ele';", "E) quando houver possibilidade de ser obrigado a imobilizar o veículo na área do cruzamento;"],
      correct: "E) quando houver possibilidade de ser obrigado a imobilizar o veículo na área do cruzamento;",
      subject: "Legislação"
    },
    {
      question: "Qual medida administrativa será aplicada ao condutor que 'parar o veículo em local proibido'?",
      options: ["A) retenção do veículo;", "B) remoção do veículo;", "C) nenhuma medida administrativa será aplicada;", "D) apreensão do veículo;", "E) suspensão do direito de dirigir."],
      correct: "B) remoção do veículo;",
      subject: "Legislação"
    },
    {
      question: "André tem 25 (vinte e cinco) anos e é habilitado na Categoria 'B' desde os 18 (dezoito) anos. Seu pai possui 3 (três) caminhões para transporte de carga, cada um com peso bruto total superior a 10 (dez) mil quilos. Para ajudar nos negócios do pai, André passou a dirigir um dos caminhões. André, nesse caso:",
      options: ["A) comete infração de trânsito, passível de penalidade de advertência, pois é condutor habilitado;", "B) comete infração grave, passível de penalidade de multa e apreensão do veículo, além do recolhimento da CNH.", "C) comete infração de trânsito de natureza leve, passível de penalidade de multa;", "D) não comete infração de trânsito, mas deve obter habilitação para dirigir os caminhões do pai;", "E) comete infração gravíssima, passível de multa e retenção do veículo;"],
      correct: "E) comete infração gravíssima, passível de multa e retenção do veículo;",
      subject: "Legislação"
    },
    {
      question: "Veículos cuja lotação não exceda 8 (oito) lugares, excluído o do motorista, podem ser conduzidos por quem possui habilitação de categoria:",
      options: ["A) 'D'", "B) Todas as alternativas estão corretas.", "C) 'E'", "D) 'B'", "E) 'C'"],
      correct: "B) Todas as alternativas estão corretas.",
      subject: "Legislação"
    },
    {
      question: "O ciclista será equiparado ao pedestre, em direitos e deveres, quando ele estiver:",
      options: ["A) transitando em uma rodovia,", "B) transitando em uma via de trânsito rápido;", "C) transitando junto ao bordo da pista de rolamento;", "D) desmontado empurrando a bicicleta;", "E) transitando pela contramão de direção."],
      correct: "D) desmontado empurrando a bicicleta;",
      subject: "Legislação"
    },
    {
      question: "Quantos pontos são computados no prontuário do condutor a cada infração gravíssima?",
      options: ["A) 7 (sete) pontos;", "B) 2 (dois) pontos;", "C) 3 (três) pontos;", "D) 5 (cinco) pontos;", "E) 6 (seis) pontos"],
      correct: "A) 7 (sete) pontos;",
      subject: "Legislação"
    },
    {
      question: "Poderá ser aplicada advertência por escrito nas infrações:",
      options: ["A) médias e graves.", "B) gravíssimas;", "C) leves ou médias;", "D) leves, médias ou graves;", "E) graves;"],
      correct: "C) leves ou médias;",
      subject: "Legislação"
    },
    {
      question: "Diante da placa A-3b você entende que vai encontrar:",
      options: ["A) 2 (duas) curvas sucessivas, sendo a primeira à direita;", "B) 1 (uma) curva acentuada à esquerda.", "C) 3 (três) ou mais curvas sucessivas, sendo a primeira à esquerda,", "D) 2 (duas) curvas sucessivas, sendo a primeira à esquerda;", "E) 3 (três) ou mais curvas sucessivas, sendo a primeira à direita;"],
      correct: "E) 3 (três) ou mais curvas sucessivas, sendo a primeira à direita;",
      subject: "Legislação/Sinalização"
    },
    {
      question: "Para que serve a sinalização horizontal denominada 'marcação de área de conflito'?",
      options: ["A) para indicar, aos condutores, um local onde é comum a existência de conflitos e discussões entre os pedestres.", "B) para indicar, aos condutores, a área da pista onde não devem parar os veículos, prejudicando a circulação;", "C) para indicar, aos condutores, a área da pista com alto índice de acidentes;", "D) para indicar, aos condutores, um local onde é comum a existência de conflitos e discussões entre os condutores de veículos;", "E) para indicar, aos condutores e pedestres, a área da pista e da calçada onde eles não podem circular, parar ou estacionar"],
      correct: "B) para indicar, aos condutores, a área da pista onde não devem parar os veículos, prejudicando a circulação;",
      subject: "Legislação"
    },
    {
      question: "Dirigir veículo sem usar lentes corretoras de visão é considerado infração:",
      options: ["A) gravíssima;", "B) média;", "C) moderada.", "D) grave;", "E) leve;"],
      correct: "A) gravíssima;",
      subject: "Legislação"
    },
    {
      question: "Qual alternativa não corresponde a uma medida administrativa, à qual fica sujeito um condutor de veículo que cometer uma infração:",
      options: ["A) advertência por escrito;", "B) realização do teste de dosagem de alcoolemia ou perícia de substância entorpecente ou que determine dependência física ou psíquica;", "C) retenção do veículo:", "D) recolhimento do Certificado de Registro de Veículo.", "E) recolhimento do Certificado de Licenciamento Anual;"],
      correct: "A) advertência por escrito;",
      subject: "Legislação"
    },
    {
      question: "Quantos pontos são computados no prontuário do condutor a cada infração gravíssima?",
      options: ["A) 2 (dois) pontos;", "B) 3 (três) pontos;", "C) 5 (cinco) pontos;", "D) 7 (sete) pontos;", "E) 6 (seis) pontos;"],
      correct: "D) 7 (sete) pontos;",
      subject: "Legislação"
    },
    {
      question: "Quando é que para fazermos uma ultrapassagem, devemos reduzir a velocidade?",
      options: ["A) ao ultrapassar sob pontes, viadutos e nas curvas.", "B) no cruzamento;", "C) ao ultrapassar uma viatura policial;", "D) ao ultrapassar um veículo de transporte coletivo, parado, efetuando embarque ou desembarque de passageiros", "E) ao ultrapassar em locais onde existe fiscalização por radar"],
      correct: "D) ao ultrapassar um veículo de transporte coletivo, parado, efetuando embarque ou desembarque de passageiros",
      subject: "Legislação"
    },
    {
      question: "Parada obrigatória é uma placa de:",
      options: ["A) regulamentação.", "B) advertências,", "C) atrativos turísticos;", "D) indicação;", "E) educação;"],
      correct: "A) regulamentação.",
      subject: "Legislação"
    },
    {
      question: "Conceder autorização para a condução de veículos de propulsão humana e de tração animal compete:",
      options: ["A) aos órgãos e às entidades executivos de trânsito dos Estados, no âmbito de sua circunscrição;", "B) ao CONTRAN;", "C) todas as alternativas estão corretas.", "D) à Polícia Rodoviária Federal;", "E) aos órgãos e às entidades executivos de trânsito dos Municípios, no âmbito de sua circunscrição;"],
      correct: "E) aos órgãos e às entidades executivos de trânsito dos Municípios, no âmbito de sua circunscrição;",
      subject: "Legislação"
    },
    {
      question: "É medida administrativa aplicada ao motociclista que conduz o veículo sem capacete de segurança:",
      options: ["A) apreensão do veículo.", "B) advertência;", "C) multa;", "D) suspensão do direito de dirigir;", "E) recolhimento do documento de habilitação:"],
      correct: "E) recolhimento do documento de habilitação:",
      subject: "Legislação"
    },
    {
      question: "Os caracteres gravados no chassi ou no monobloco do veículo são considerados dispositivos de:",
      options: ["A) comunicação do veículo;", "B) segurança do veículo", "C) proteção do veículo;", "D) informação do veículo:", "E) identificação do veículo;"],
      correct: "E) identificação do veículo;",
      subject: "Legislação"
    },
    {
      question: "O veículo estacionado na contramão está sujeito a:",
      options: ["A) multa e remoção;", "B) multa;", "C) multa e retenção;", "D) multa e apreensão;", "E) multa e cassação da habilitação."],
      correct: "A) multa e remoção;",
      subject: "Legislação"
    },
    {
      question: "Sobre a pontuação registrada no prontuário do condutor infrator, é correto afirmar que:",
      options: ["A) a cada 12 (doze) meses é zerada a pontuação perdida no prontuário do infrator,", "B) para que a CNH seja apreendida é necessário que o condutor perca mais de 20 (vinte) pontos em seu prontuário;", "C) ao atingir 20 (vinte) pontos no prontuário, a permissão para dirigir será cassada.", "D) ao atingir 20 (vinte) pontos no prontuário, a permissão para dirigir será apreendida;", "E) após receber uma notificação por infração foi cometida, o proprietário terá 15 (quinze) dias para apontar o verdadeiro infrator para que ele não perca pontos em seu prontuário;"],
      correct: "A) a cada 12 (doze) meses é zerada a pontuação perdida no prontuário do infrator,",
      subject: "Legislação"
    },
    {
      question: "As vias classificam-se em:",
      options: ["A) via de trânsito rápido, arterial, coletora e local;", "B) vias urbanas e rurais;", "C) via de trânsito rápido, preferencial, coletora e local;", "D) rodovias e estradas;", "E) rodovias, vias de trânsito rápido e vias de trânsito lento."],
      correct: "B) vias urbanas e rurais;",
      subject: "Legislação"
    },
    {
      question: "De que lado deve ser feita a manobra de ultrapassagem?",
      options: ["A) pelo lado direito, em qualquer circunstância;", "B) pelo lado direito, bastando que a via seja mão única;", "C) pelo lado que o condutor quiser.", "D) pelo acostamento;", "E) pelo lado esquerdo;"],
      correct: "E) pelo lado esquerdo;",
      subject: "Legislação"
    },
    {
      question: "Marque a alternativa incorreta. Nos cruzamentos sem sinalização:",
      options: ["A) entre uma rua e uma avenida a preferência é do veículo que estiver à direita;", "B) entre uma via asfaltada e uma via calçada a preferência será do veículo que transita pela via asfaltada, pois a velocidade nela é maior;", "C) entre um ônibus e um caminhão a preferência é de quem estiver à direita;", "D) preferência é de quem estiver à direita;", "E) entre um carro e uma motocicleta a preferência é de quem estiver à direita."],
      correct: "B) entre uma via asfaltada e uma via calçada a preferência será do veículo que transita pela via asfaltada, pois a velocidade nela é maior;",
      subject: "Legislação"
    },
    {
      question: "Sempre que o infrator atingir a contagem de 20 (vinte) pontos, no período de 12 (doze) meses, ocorrerá a 'suspensão do direito de dirigir' pelo prazo:",
      options: ["A) mínimo de 1 (um) mês e máximo de 1 (um) ano;", "B) mínimo de 3 (três) meses e máximo de 1 (um) ano.", "C) mínimo de 6 (seis) meses e máximo de 1 (um) ano;", "D) mínimo de 2 (dois) meses e máximo de 6 (seis) meses;", "E) mínimo de 1 (um) mês e máximo de 2 (dois) anos;"],
      correct: "A) mínimo de 1 (um) mês e máximo de 1 (um) ano;",
      subject: "Legislação"
    },
    {
      question: "Qual a primeira providência antes de fazer qualquer modificação no veículo?",
      options: ["A) pedir autorização ao prefeito da cidade;", "B) pedir autorização ao governador do estado;", "C) pedir autorização ao INMETRO.", "D) pedir autorização ao Centro de Formação de Condutores (autoescola);", "E) pedir autorização às autoridades de trânsito;"],
      correct: "E) pedir autorização às autoridades de trânsito;",
      subject: "Legislação"
    },
    {
      question: "O que significa a placa a seguir?",
      options: ["A) curva acentuada em 'S' à esquerda.", "B) pista sinuosa à direita;", "C) curva à direita;", "D) curva acentuada em 'S' à direita;", "E) curva em S À direita;"],
      correct: "E) curva em S À direita;",
      subject: "Legislação"
    },
    {
      question: "Observar, sinalizar (dar seta) e deslocar-se totalmente para a esquerda da pista de rolamento é um procedimento de um condutor de veículo que está em uma:",
      options: ["A) via urbana de 2 (dois) sentidos e pretende realizar uma conversão à esquerda;", "B) rodovia e pretende realizar uma conversão à esquerda.", "C) via urbana de 1 (um) sentido e pretende realizar uma conversão à direita;", "D) via urbana de 2 (dois) sentidos e pretende realizar uma conversão à direita;", "E) via urbana de 1 (um) sentido e pretende realizar uma conversão à esquerda;"],
      correct: "E) via urbana de 1 (um) sentido e pretende realizar uma conversão à esquerda;",
      subject: "Legislação"
    },
    {
      question: "A placa A-17 adverte que existe:",
      options: ["A) lombada adiante.", "B) trecho perigoso pela irregularidade de sua superfície;", "C) pista irregular seguida de ponte móvel;", "D) saliência à sua frente:", "E) depressão na pista de rolamento;"],
      correct: "B) trecho perigoso pela irregularidade de sua superfície;",
      subject: "Legislação"
    },
    {
      question: "Ao estacionar em uma via não sinalizada, o automóvel deve ser posicionado:",
      options: ["A) a 45° (quarenta e cinco graus) da guia de calçada;", "B) paralelo ao bordo da pista de rolamento e junto à guia de calçada;", "C) todas as alternativas estão corretas.", "D) em sentido contrário ao fluxo de veículos;", "E) a 90° (noventa graus) da guia de calçada;"],
      correct: "B) paralelo ao bordo da pista de rolamento e junto à guia de calçada;",
      subject: "Legislação"
    },
    {
      question: "Quando o condutor desobedecer às ordens emanadas da autoridade competente de trânsito ou de seus agentes será punido com:",
      Options: ["A) multa e apreensão da Carteira Nacional de Habilitação;", "B) advertência escrita pelo Diretor do DETRAN;", "C) multa e advertência pelo Diretor do DENATRAN", "D) multa;", "E) multa e advertência pelo Diretor do DETRAN;"],
      correct: "D) multa;",
      subject: "Legislação"
    },
    {
      question: "As placas de regulamentação têm por finalidade:",
      Options: ["A) educar os condutores;", "B) indicar sentidos de direção;", "C) advertir os condutores de veículos.", "D) advertir pedestres;", "E) informar aos usuários as condições, proibições ou restrições no uso da via;"],
      correct: "E) informar aos usuários as condições, proibições ou restrições no uso da via;",
      subject: "Legislação"
    },
    {
      question: "Dirigir veículo com Carteira Nacional de Habilitação ou Permissão para Dirigir cassada ou com suspensão do direito de dirigir é uma infração gravíssima cujas consequências são:",
      options: ["A) multa e remoção do veículo;", "B) multa e suspensão do direito de dirigir", "C) multa, recolhimento da habilitação e retenção do veículo:", "D) multa e cassação do documento de habilitação.", "E) multa e apreensão do veículo;"],
      correct: "C) multa, recolhimento da habilitação e retenção do veículo:",
      subject: "Legislação"
    },
    {
      question: "O movimento de passar à frente de outro veículo que se desloca no mesmo sentido, em menor velocidade e na mesma faixa de tráfego, necessitando sair e retornar à faixa de origem, é denominado:",
      options: ["A) retorno;", "B) ultrapassagem;", "C) retorno;", "D) conversão à esquerda.", "E) passagem;"],
      correct: "B) ultrapassagem;",
      subject: "Legislação"
    },
    {
      question: "O Patrulhamento é exercido:",
      Options: ["A) por Guardas Municipais;", "B) pela Polícia Rodoviária Federal:", "C) pelo Corpo de Bombeiro Militar.", "D) pela Polícia Civil;", "E) pela Polícia Militar,"],
      Correct: "B) pela Polícia Rodoviária Federal:",
      subject: "Legislação"
    },
    {
      question: "Quando não existir sinalização regulamentadora, qual a velocidade máxima permitida nas rodovias de pista dupla para camionetas e automóveis?",
      Options: ["A) 80 km/h (oitenta quilômetros por hora);", "B) 140 km/h (cento e quarenta quilômetros por hora);", "C) 90 km/h (noventa quilômetros por hora).", "D) 120 km/h (cento o vinto quilômetros por hora):", "E) 110 km/h (cento e doze quilômetros por hora);"],
      Correct: "E) 110 km/h (cento e doze quilômetros por hora);",
      subject: "Legislação"
    },
    {
      question: "A sinalização terá a seguinte ordem de prevalência: as ordens dos agentes sobre as normas de circulação. Marque a correta. Qual dos sinais devem ser utilizados em conjunto com os gestos dos agentes?",
      Options: ["A) o sinal regulamentar de braços;", "B) os de regulamentação;", "C) as marcas viárias.", "D) os de advertência;", "E) os sonoros;"],
      Correct: "E) os sonoros;",
      subject: "Legislação"
    },
    {
      question: "'Todo veículo em movimento deve ocupar a faixa mais à direita da pista de rolamento, não existindo faixa especial a ele destinada'. Considerando as regras de circulação do Código de Trânsito, essa afirmativa é:",
      Options: ["A) verdadeira;", "B) verdadeira, somente para veículo escolar.", "C) verdadeira, somente para veículos de passeio;", "D) falsa;", "E) verdadeira, somente para veículos de cargo:"],
      Correct: "A) verdadeira;",
      subject: "Legislação"
    },
    {
      question: "Automotor, elétrico, propulsão humana, tração animal, reboque ou semirreboque são classificações de veículos relacionadas à:",
      options: ["A) espécie;", "B) utilidade;", "C) categoria:", "D) tração;", "E) marca"],
      correct: "D) tração;",
      subject: "Legislação"
    },
    {
      question: "Marque a alternativa incorreta:",
      Options: ["A) a Permissão Para Dirigir (PPD), assim como a CNH, tem fé pública e vale como documento de identificação em todo Território Nacional;", "B) o portador da Permissão Para Dirigir (PPD) que cometer uma infração de trânsito, de natureza Média, terá a PPD cassada e deverá reiniciar todo o processo de habilitação, para que possa voltar a conduzir veículo automotor;", "C) a Permissão Para Dirigir (PPD) tem validade de 12 (doze) meses;", "D) quem possui a Permissão Para Dirigir (PPD) tem os mesmos direitos que os que possuem a CNH;", "E) os documentos de habilitação (PPD e CNH) não podem ser plastificados em plástico colante;"],
      correct: "B) o portador da Permissão Para Dirigir (PPD) que cometer uma infração de trânsito, de natureza Média, terá a PPD cassada e deverá reiniciar todo o processo de habilitação, para que possa voltar a conduzir veículo automotor;",
      subject: "Legislação"
    },
    {
      question: "É função da sinalização fornecer dados para as decisões a serem tomadas pelos condutores. A placa A-27 adverte sobre uma condição insegura adiante. Marque a alternativa correta relacionada à placa:",
      options: ["A) a mensagem transmitida tem caráter de recomendação;", "B) todas as alternativas estão corretas;", "C) seu significado é 'área com desmoronamento';", "D) sua forma padrão é quadrada;", "E) adverte a natureza do perigo;"],
      correct: "B) todas as alternativas estão corretas;",
      subject: "Legislação"
    },
    {
      question: "Conduzir ciclomotores nas vias de trânsito rápido e rodovias, salvo onde houver acostamento ou faixa a eles destinadas, acarreta:",
      options: ["A) cassação da CNH.", "B) advertência;", "C) frequência obrigatória em curso de reciclagem;", "D) recolhimento do documento de habilitação;", "E) multa;"],
      correct: "E) multa;",
      subject: "Legislação"
    },
    {
      question: "As placas de regulamentação têm por finalidade:",
      options: ["A) indicar sentidos de direção;", "B) educar os condutores;", "C) informar aos usuários as condições, proibições ou restrições no uso da via;", "D) advertir pedestres;", "E) advertir os condutores de veículos."],
      correct: "E) advertir os condutores de veículos.",
      subject: "Legislação"
    },
    {
      question: "A placa A-4a adverte que você encontrará:",
      options: ["A) adiante 1 (uma) curva à direita;", "B) adiante 1 (uma) curva à esquerda;", "C) curvas sucessivas, sendo a primeira à direita;", "D) 2 (duas) curvas acentuadas em 'S, sendo a primeira à esquerda;", "E) 1 (uma) curva acentuada à esquerda;"],
      correct: "D) 2 (duas) curvas acentuadas em 'S, sendo a primeira à esquerda;",
      subject: "Legislação"
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
      option.addEventListener('click', function () {
        checkAnswerAndProvideFeedback(index, this.getAttribute('data-value'));
      });
    });

    if (currentQuestionIndex == 40) {
      displayResult();
      restartSimulado();
    }
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
    restartSimulado();
  });
});
