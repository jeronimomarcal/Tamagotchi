const felicidadeElement = document.getElementById('felicidade'); // Elemento HTML para exibir a felicidade
const fomeElement = document.getElementById('fome'); // Elemento HTML para exibir a fome
const emojiElement = document.getElementById('emoji'); // Elemento HTML para exibir o emoji
const emojiSelect = document.getElementById('emoji-select'); // Elemento HTML para selecionar o emoji
const consoleElement = document.getElementById('console'); // Elemento HTML para exibir mensagens no console

class Tamagotchi {
  constructor() {
    this.felicidade = 50; // Nível inicial de felicidade
    this.fome = 50; // Nível inicial de fome
    this.estaVivo = true; // Estado de vida do Tamagotchi
    this.intervalId = null; // ID do intervalo para atualização
    this.emoji = '😺'; // Emoji padrão
  }

  alimentar() {
    if (this.estaVivo) {
      this.fome -= 10; // Diminui a fome ao alimentar
      this.verificarEstado(); // Verifica se o Tamagotchi está vivo ou não
      atualizarStatus(); // Atualiza os elementos HTML de status
      exibirMensagem('Você alimentou o Tamagotchi!'); // Exibe mensagem no console
    }
  }

  acariciar() {
    if (this.estaVivo) {
      this.felicidade += 10; // Aumenta a felicidade ao acariciar
      this.verificarEstado(); // Verifica se o Tamagotchi está vivo ou não
      atualizarStatus(); // Atualiza os elementos HTML de status
      exibirMensagem('Você acariciou o Tamagotchi!'); // Exibe mensagem no console
    }
  }

  passear() {
    if (this.estaVivo) {
      this.felicidade += 20; // Aumenta a felicidade ao passear
      this.fome += 10; // Aumenta a fome ao passear
      this.verificarEstado(); // Verifica se o Tamagotchi está vivo ou não
      atualizarStatus(); // Atualiza os elementos HTML de status
      exibirMensagem('Você levou o Tamagotchi para passear!'); // Exibe mensagem no console
    }
  }

  trocarRoupa() {
    if (this.estaVivo) {
      const emojiSelecionado = emojiSelect.value; // Obtém o valor selecionado do elemento <select>
      this.felicidade += 5; // Aumenta a felicidade ao trocar de roupa
      this.emoji = emojiSelecionado; // Altera o emoji para o valor selecionado
      this.verificarEstado(); // Verifica se o Tamagotchi está vivo ou não
      atualizarStatus(); // Atualiza os elementos HTML de status
      emojiElement.textContent = this.emoji; // Atualiza o emoji exibido no elemento HTML
      exibirMensagem('Você trocou a roupa do Tamagotchi!'); // Exibe mensagem no console
    }
  }

  verificarEstado() {
    if (this.felicidade <= 0 || this.fome >= 100) {
      this.estaVivo = false; // Define o estado do Tamagotchi como morto
      this.pararAtualizacao(); // Para a atualização periódica
      exibirMensagem('Seu Tamagotchi morreu!', 'error'); // Exibe mensagem de morte no console
    } else if (this.felicidade >= 100) {
      this.felicidade = 100; // Limita a felicidade a 100
      exibirMensagem('Seu Tamagotchi está muito feliz!'); // Exibe mensagem de felicidade no console
    } else if (this.fome <= 0) {
      this.fome = 0; // Limita a fome a 0
      exibirMensagem('Seu Tamagotchi não está com fome!'); // Exibe mensagem de ausência de fome no console
    }
  }

  iniciarAtualizacao() {
    this.intervalId = setInterval(() => {
      this.felicidade -= 10; // Diminui a felicidade periodicamente
      this.fome += 10; // Aumenta a fome periodicamente
      this.verificarEstado(); // Verifica se o Tamagotchi está vivo ou não
      atualizarStatus(); // Atualiza os elementos HTML de status
    }, 10000); // Atualizar a cada 10 segundos
  }

  pararAtualizacao() {
    clearInterval(this.intervalId); // Para a atualização periódica
  }
}

const tamagotchi = new Tamagotchi(); // Instância do Tamagotchi
tamagotchi.iniciarAtualizacao(); // Inicia a atualização periódica

function alimentar() {
  tamagotchi.alimentar(); // Chama o método alimentar do Tamagotchi
}

function acariciar() {
  tamagotchi.acariciar(); // Chama o método acariciar do Tamagotchi
}

function passear() {
  tamagotchi.passear(); // Chama o método passear do Tamagotchi
}

function trocarRoupa() {
  tamagotchi.trocarRoupa(); // Chama o método trocarRoupa do Tamagotchi
}

function atualizarStatus() {
  felicidadeElement.textContent = `Felicidade: ${tamagotchi.felicidade}`; // Atualiza o texto de felicidade
  fomeElement.textContent = `Fome: ${tamagotchi.fome}`; // Atualiza o texto de fome
}

function exibirMensagem(mensagem, tipo = 'info') {
  const mensagemElement = document.createElement('h3'); // Cria um novo elemento <h3>
  mensagemElement.textContent = mensagem; // Define o texto da mensagem

  if (tipo === 'error') {
    mensagemElement.classList.add('error'); // Adiciona a classe 'error' ao elemento em caso de erro
  }

  consoleElement.appendChild(mensagemElement); // Adiciona o elemento de mensagem ao console
}

function reiniciar() {
  location.reload(); // Recarrega a página
}
