let jogadorAtual = "X";
let tabuleiro = ["", "", "", "", "", "", "", "", ""];
let jogoAtivo = true;
let jogador1, jogador2;

// Inicia jogo
function iniciarJogo() {
    jogador1 = document.getElementById("jogador1").value;
    jogador2 = document.getElementById("jogador2").value;

    if (jogador1 === "" || jogador2 === "") {
        alert("Insira o nome dos jogadores.");
        return;
    }

    document.getElementById("jogadorForm").style.display = "none";
    document.getElementById("tabuleiroJogo").style.display = "block";
    atualizarMensagem();
}

// Atualiza a mensagem: jogador atual
function atualizarMensagem() {
    let nomeJogador = jogadorAtual === "X" ? jogador1 : jogador2;
    document.getElementById("mensagem").innerText = "Vez de " + nomeJogador + " (" + jogadorAtual + ")";
}

// Verifica se há um vencedor ou empate após cada jogada
function verificarVitoria() {
    const combinacoesVencedoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
        [0, 4, 8], [2, 4, 6]             // Diagonais
    ];

    for (let i = 0; i < combinacoesVencedoras.length; i++) {
        const [a, b, c] = combinacoesVencedoras[i];
        if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
            jogoAtivo = false;
            let vencedor = jogadorAtual === "X" ? jogador1 : jogador2;
            document.getElementById("mensagem").innerText = "Parabéns, " + vencedor + " venceu!";
            return true;
        }
    }

    // Verificar empate
    if (!tabuleiro.includes("")) {
        document.getElementById("mensagem").innerText = "O jogo terminou em empate!";
        jogoAtivo = false;
        return true;
    }

    return false;
}

// Faz jogada e alterna o turno
function fazerJogada(celula, indice) {
    if (!jogoAtivo || tabuleiro[indice] !== "") return;

    tabuleiro[indice] = jogadorAtual;
    celula.innerText = jogadorAtual;

    if (!verificarVitoria()) {
        jogadorAtual = jogadorAtual === "X" ? "O" : "X";
        atualizarMensagem();
    }
}

// Reinicia jogo
function reiniciarJogo() {
    tabuleiro = ["", "", "", "", "", "", "", "", ""];
    jogoAtivo = true;
    jogadorAtual = "X";
    document.querySelectorAll("td").forEach(celula => celula.innerText = "");
    atualizarMensagem();
}
