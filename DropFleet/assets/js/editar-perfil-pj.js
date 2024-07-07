document.addEventListener('DOMContentLoaded', function() {
    // Recuperar dados do usuário logado do sessionStorage
    var userLogado = JSON.parse(sessionStorage.getItem('empresaLogada'));

    // Verificar se o usuário está logado
    if (userLogado && userLogado.emailCad) {
        // Preencher campos de email e senha com os dados do usuário
        var emailInput = document.getElementById('email');
        emailInput.value = userLogado.emailCad;

        var senhaInput = document.getElementById('senha');
        senhaInput.value = userLogado.senhaCad;

        // Adicionar evento de clique ao botão de salvar
        var btnSalvar = document.getElementById('btnSalvar');
        btnSalvar.addEventListener('click', function() {
            // Obter novos valores de email e senha
            var novoEmail = emailInput.value;
            var novaSenha = senhaInput.value;

            // Atualizar dados do usuário no localStorage
            var listaEmpresas = JSON.parse(localStorage.getItem('listaEmpresas') || '[]');
            listaEmpresas.forEach(function(empresa) {
                if (empresa.emailCad === userLogado.emailCad) {
                    empresa.emailCad = novoEmail;
                    empresa.senhaCad = novaSenha;
                }
            });
            localStorage.setItem('listaEmpresas', JSON.stringify(listaEmpresas));

            // Atualizar dados do usuário no sessionStorage
            userLogado.emailCad = novoEmail;
            userLogado.senhaCad = novaSenha;
            sessionStorage.setItem('empresaLogada', JSON.stringify(userLogado));

            alert('Dados atualizados com sucesso!');
        });

        // Adicionar evento de clique ao botão de excluir conta
        var btnExcluir = document.getElementById('btnExcluir');
        btnExcluir.addEventListener('click', excluirConta);

        // Adicionar evento de clique ao ícone do olho para mostrar a senha
        var eyeIcon = document.getElementById('eye-icon');
        eyeIcon.addEventListener('click', function() {
            if (senhaInput.type === "password") {
                senhaInput.type = "text";
            } else {
                senhaInput.type = "password";
            }
        });
    } else {
        alert('Erro ao carregar dados da empresa.');
        window.location.href = './login-pj.html';
    }
});

// Função para sair (logout) da empresa
function sair(){
    localStorage.removeItem('token');
    sessionStorage.removeItem('empresaLogada');
    window.location.href = './login-pj.html';
}

// Função para excluir a conta da empresa
function excluirConta() {
    // Confirmar se a empresa realmente deseja excluir sua conta
    var confirmacao = confirm("Tem certeza de que deseja excluir sua conta? Esta ação é irreversível.");

    if (confirmacao) {
        // Obter o email da empresa atualmente logada
        var empresaLogada = JSON.parse(sessionStorage.getItem('empresaLogada'));
        var emailEmpresaLogada = empresaLogada.emailCad;

        // Obter a lista de empresas do localStorage
        var listaEmpresas = JSON.parse(localStorage.getItem('listaEmpresas')) || [];

        // Encontrar o índice da empresa atual na lista de empresas
        var indexEmpresa = listaEmpresas.findIndex(function(empresa) {
            return empresa.emailCad === emailEmpresaLogada;
        });

        // Remover a empresa atual da lista de empresas, se encontrada
        if (indexEmpresa !== -1) {
            listaEmpresas.splice(indexEmpresa, 1); // Remover a empresa encontrada
            localStorage.setItem('listaEmpresas', JSON.stringify(listaEmpresas)); // Atualizar localStorage
        }

        // Remover dados da empresa do sessionStorage
        sessionStorage.removeItem('empresaLogada');

        // Redirecionar a empresa para a página de login
        window.location.href = './login-pj.html';
    }
}
