// Início do arquivo inicio-pj.js
document.addEventListener('DOMContentLoaded', function() {
    var empresaLogada = JSON.parse(sessionStorage.getItem('empresaLogada'));
    if (empresaLogada && empresaLogada.nomeEmpresa) {
        var nomeEmpresa = empresaLogada.nomeEmpresa.split(' ')[0]; // Extrai o primeiro nome da empresa
        var saudacaoElemento = document.getElementById('saudacao');
        var logado = document.querySelector('#logado');
        logado.innerHTML = `<h1>Olá, <span class="text-primary">${nomeEmpresa}!</span></h1>`;
        // Adicione aqui qualquer outro processamento necessário para a página de início da empresa
    } else {
        alert('Erro ao carregar dados da empresa.');
        window.location.href = './assets/pages/login-pj.html';
    }
});

// Função para sair da sessão da empresa
function sair(){
    localStorage.removeItem('token');
    sessionStorage.removeItem('empresaLogada');
    window.location.href = './assets/pages/login-pj.html';
}
