let jogadorAtual = "X";
let tabuleiro = ["", "", "", "", "", "", "", "", ""];
let jogoAtivo = true;
let jogador1, jogador2;

// Função para iniciar o jogo
function iniciarJogo() {
    jogador1 = document.getElementById("jogador1").value;
    jogador2 = document.getElementById("jogador2").value;

    if (jogador1 === "" || jogador2 === "") {
        alert("Insira o nome dos jogadores!");
        return;
    }

    document.getElementById("jogadorForm").style.display = "none";
    document.getElementById("tabuleiroJogo").style.display = "block";
    atualizarMensagem();
}

// Função para atualizar a mensagem do jogador atual
function atualizarMensagem() {
    let nomeJogador = jogadorAtual === "X" ? jogador1 : jogador2;
    document.getElementById("mensagem").innerText = "Vez de " + nomeJogador + " (" + jogadorAtual + ") :";
}

//Função para verificar se há vencedor/empate depois de cada jogada
function verificarVitoria() {
    const combinacoesVencedoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
        [0, 4, 8], [2, 4, 6]             // Diagonais
    ];

    for (let i = 0; i < combinacoesVencedoras.length; i++) {
        const [a, b, c] = combinacoesVencedoras[i];

        // Imprime mensagem em caso de vitória
        if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
            jogoAtivo = false;
            let vencedor = jogadorAtual === "X" ? jogador1 : jogador2;
            document.getElementById("mensagem").innerText = "PARABÉNS, " + vencedor + " venceu :)";
            return true;
        }
    }

    // Imprime mensagem em caso de empate
    if (!tabuleiro.includes("")) {
        document.getElementById("mensagem").innerText = "O jogo terminou em empate :/";
        jogoAtivo = false;
        return true;
    }

    return false;
}

// Função para realizar jogada e alternar jogador
function fazerJogada(celula, indice) {
    if (!jogoAtivo || tabuleiro[indice] !== "") return;

    tabuleiro[indice] = jogadorAtual;
    celula.innerText = jogadorAtual;

    if (!verificarVitoria()) {
        jogadorAtual = jogadorAtual === "X" ? "O" : "X";
        atualizarMensagem();
    }
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    tabuleiro = ["", "", "", "", "", "", "", "", ""];
    jogoAtivo = true;
    jogadorAtual = "X";
    document.querySelectorAll("td").forEach(celula => celula.innerText = "");
    atualizarMensagem();
}