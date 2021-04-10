var respostas = ["Naruto",
                 "Sasuke",
                 "Sakura",
                 "Kakashi",
                 "Hinata",
                 "Ino",
                 "Shikamaru",
                 "Choji",
                 "Kiba",
                 "Shino",
                 "Tenten",
                 "Rock Lee",
                 "Neji",
                 "Guy",
                 "Sai",
                 "Yamato",
                 "Tsunade"]
var cloneRespostas = clonaArray(respostas)
var perguntas = ["Qual o nome do personagem principal da série?",
                 "Qual personagem deu o primeiro beijo em Naruto?",
                 "Qual personagem é apaixonada por Sasuke?",
                 "Qual personagem teve como um grande mistério por muito tempo a aparência do seu rosto?",
                 "Qual personagem costuma ficar com vergonha na presença de Naruto?",
                 "Qual personagem transfere sua consciência para o alvo?",
                 "Qual personagem costuma jogar 'shogi' na série?",
                 "Qual personagem costuma aparecer na série sempre comendo?",
                 "Qual personagem tem um cão como parceiro?",
                 "Qual personagem usa técnicas de luta com insetos?",
                 "Qual personagem utiliza somente armas ou ferramentas ninjas em combate?",
                 "Qual personagem é incapaz de utilizar ninjutsu e genjutsu?",
                 "Qual personagem é conhecido como um prodígio do clã Hyuga?",
                 "Qual personagem é auto declarado como o maior rival de Kakashi?",
                 "Qual personagem é conhecido por não demonstrar sentimentos?",
                 "Qual personagem é usuário da técnica 'Mokuton', que lhe permite manipular madeira?",
                 "Qual personagem tem 106cm de busto?"]

var victoryMessage = "PARABÉNS, VOCÊ PROVOU QUE PERDEU MUITO TEMPO DE VIDA ASSISTINDO NARUTO!";
var defeatMessage = "Você não entende nada de Naruto, volte a assistir Sessão da Tarde.";
var botoes = document.querySelectorAll(".botao");
var tagPergunta = document.querySelector('#pergunta');
var totalDePerguntas = perguntas.length;
var opcaoSelecionada = "";
var respostaCorreta = "";
var quantidadeDeErros = 0;
var perguntaNumero = 0 ;

imprime()

function analisarRespostas() {
  if ((perguntaNumero <= totalDePerguntas) && (quantidadeDeErros < 3)) {
    var respostaSelecionada = document.getElementById(opcaoSelecionada).innerHTML
    opcaoSelecionada = ""

    if (respostaCorreta != respostaSelecionada) {
      pintaBotao(respostaSelecionada, "wrong")
      quantidadeDeErros++
    } 
    pintaBotao(respostaCorreta, "correct")

    setTimeout(() => {
      if (quantidadeDeErros < 3) {
        // Pinta todos os botões de branco para uma nova pergunta
        paintSelectedOption()

        if (perguntaNumero == totalDePerguntas) {
          tagPergunta.innerHTML = victoryMessage
        }
      } else {
        tagPergunta.innerHTML = defeatMessage
      }

      imprime()

    }, 1500)
  }
}

function indicarOpcao(that) {
  opcaoSelecionada = that.id;
  paintSelectedOption(that.id);
}

function paintSelectedOption(selected) {
  var selectedButton = document.querySelector("#" + selected)

  for (botao of botoes) {
    botao.classList.remove("selected-button");
  }

  if (selected) {
    selectedButton.classList.add("selected-button");
  }
}

function imprime() {
  // Chamada da função sem parâmetros para limpar os botões
  pintaBotao()

  if ((perguntaNumero < totalDePerguntas) && (quantidadeDeErros < 3)) {
    numeroPergunta = selecionaNumeroPergunta()

    var alternativas = montaAlternativas(numeroPergunta)
    var ordemRespostas = embaralhador(4)

    tagPergunta.innerHTML = obtemPergunta(numeroPergunta)

    for (var x = 0; x < botoes.length; x++) {
      botoes[x].innerHTML = alternativas[ordemRespostas[x]]
    }

  } else {
    for (botao of botoes) {
      botao.innerHTML = ""
    }
  }

  perguntaNumero++
}

function pintaBotao(texto, status) {
  var arrayTextoDosBotoes = []

  if (status) {
    for (var x = 0; x < botoes.length; x++) {
      arrayTextoDosBotoes.push(botoes[x].innerHTML);

      if (texto == arrayTextoDosBotoes[x]) {
        if (status == "wrong") {
          botoes[x].classList.add("wrong-button");
        } else if (status == "correct") {
          botoes[x].classList.add("correct-button");
        }
        return
      }
    }
  } else {
    for (botao of botoes) {
      // Altera a classe de todos os botões para "botao"
      botao.className = "botao"
    }
  }
}

function selecionaNumeroPergunta() {
  var quantPerguntas = perguntas.length
  var numeroPergunta = getRandomInteger(quantPerguntas)
  return numeroPergunta
}

function obtemPergunta(numeroPergunta) {
  var pergunta = perguntas[numeroPergunta]
  perguntas.splice(numeroPergunta, 1)
  return pergunta
}

function obtemResposta(numeroResposta) {
  var resposta = respostas[numeroResposta]
  respostas.splice(numeroResposta, 1)
  return resposta
}

function embaralhador(tamanhoDoArray) {
  var array = [], m, t, i

  m = tamanhoDoArray
  while (m) {
    array.push(--m)
  }

  m = tamanhoDoArray
  while (m) {
    i = Math.floor(Math.random() * m--)
    t = array[m]
    array[m] = array[i]
    array[i] = t
  }

  return array
}

function clonaArray(array) {
  var arrayClone = []

  for (i = 0; i < array.length; i++) {
    arrayClone[i] = array[i]
  }

  return arrayClone
}

function getRandomInteger(total) {
  return parseInt(Math.random() * total)
}

function montaAlternativas(numeroPergunta) {
  var alternativas = []
  respostaCorreta = obtemResposta(numeroPergunta)
  alternativas.push(respostaCorreta) //adiciona a resposta correta

  for (var x = 0; x < 3; x++) {
    var posicaoRespostaAleatoria = getRandomInteger(cloneRespostas.length)
    var respostaAleatoria = cloneRespostas[posicaoRespostaAleatoria]
    var jaUsado = false

    for (var y = 0; y < alternativas.length; y++) {
      if (alternativas[y] == respostaAleatoria) {
        jaUsado = true
        break
      } 
    }

    if (!jaUsado) {
      alternativas.push(respostaAleatoria)
    } else {
      x--
    }
    jaUsado = false
  }

  return alternativas
}