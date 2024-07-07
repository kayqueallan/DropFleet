document.addEventListener('DOMContentLoaded', function() {
    var userLogado = JSON.parse(sessionStorage.getItem('userLogado'));
    if (userLogado && userLogado.nome) {
        var primeiroNome = userLogado.nome.split(' ')[0]; // SUBSTITUI O NOME COMPLETO, POR APENAS O PRIMEIRO NOME
        var saudacaoElemento = document.getElementById('saudacao');
        var logado = document.querySelector('#logado');
        logado.innerHTML = `<h1>Olá, <span class="text-primary">${primeiroNome}!</span></h1>`;
        // CASO QUEIRA DEIXAR EM AZUL E PRETO logado.innerHTML = `<h1><span class="text-primary">Olá,</span> ${primeiroNome}!</h1>`;
        // CASO QUEIRA DEIXAR EM PRETO E AZUL logado.innerHTML = `<h1>Olá, <span class="text-primary">${primeiroNome}</span></h1>`;    
        // CASO QUEIRA DEIXAR TUDO EM AZUL: logado.classList.add('logado-text'); // Adiciona a classe para estilizar
    } else {
        alert('Erro ao carregar dados do usuário.');
        window.location.href = './assets/pages/login.html';
    }
});

// EXECUTAR FUNCAO QUANDO USUARIO FOR SAIR
function sair(){
    localStorage.removeItem('token');
    sessionStorage.removeItem('userLogado');
    window.location.href = './assets/pages/login.html';
}
