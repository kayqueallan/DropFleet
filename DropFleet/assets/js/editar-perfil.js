document.addEventListener('DOMContentLoaded', function() {
    // Recuperar dados do usuário logado do sessionStorage
    var userLogado = JSON.parse(sessionStorage.getItem('userLogado'));
  
    // Verificar se o usuário está logado
    if (userLogado && userLogado.email) {
        // Preencher campos de email e senha com os dados do usuário
        var emailInput = document.getElementById('email');
        emailInput.value = userLogado.email;
  
        var senhaInput = document.getElementById('senha');
        senhaInput.value = userLogado.senha;
  
        // Adicionar evento de clique ao botão de salvar
        var btnSalvar = document.getElementById('btnSalvar');
        btnSalvar.addEventListener('click', function() {
            // Obter novos valores de email e senha
            var novoEmail = emailInput.value;
            var novaSenha = senhaInput.value;
  
            // Atualizar dados do usuário no localStorage
            var listaUsuario = JSON.parse(localStorage.getItem('listaUsuario') || '[]');
            listaUsuario.forEach(function(usuario) {
                if (usuario.emailCad === userLogado.email) {
                    usuario.emailCad = novoEmail;
                    usuario.senhaCad = novaSenha;
                }
            });
            localStorage.setItem('listaUsuario', JSON.stringify(listaUsuario));
  
            // Atualizar dados do usuário no sessionStorage
            userLogado.email = novoEmail;
            userLogado.senha = novaSenha;
            sessionStorage.setItem('userLogado', JSON.stringify(userLogado));
  
            alert('Dados atualizados com sucesso!');
        });
  
        // Adicionar evento de clique ao ícone do olho para alternar a visibilidade da senha
        var verSenhaIcon = document.getElementById('verSenha');
        verSenhaIcon.addEventListener('click', function() {
            if (senhaInput.getAttribute('type') === 'password') {
                senhaInput.setAttribute('type', 'text');
            } else {
                senhaInput.setAttribute('type', 'password');
            }
        });
    } else {
        alert('Erro ao carregar dados do usuário.');
        window.location.href = './login.html';
    }
  });
  
  // Função para sair (logout) do usuário
  function sair(){
    localStorage.removeItem('token');
    sessionStorage.removeItem('userLogado');
    window.location.href = './login.html';
  }
  
  function excluirConta() {
    // Confirmar se o usuário realmente deseja excluir sua conta
    var confirmacao = confirm("Tem certeza de que deseja excluir sua conta? Esta ação é irreversível.");
  
    if (confirmacao) {
        // Obter o email do usuário atualmente logado
        var userLogado = JSON.parse(sessionStorage.getItem('userLogado'));
        var emailUsuarioLogado = userLogado.email;
  
        // Obter a lista de usuários do localStorage
        var listaUsuario = JSON.parse(localStorage.getItem('listaUsuario')) || [];
  
        // Encontrar o índice do usuário atual na lista de usuários
        var indexUsuario = listaUsuario.findIndex(function(usuario) {
            return usuario.emailCad === emailUsuarioLogado;
        });
  
        // Remover o usuário atual da lista de usuários, se encontrado
        if (indexUsuario !== -1) {
            listaUsuario.splice(indexUsuario, 1); // Remover o usuário encontrado
            localStorage.setItem('listaUsuario', JSON.stringify(listaUsuario)); // Atualizar localStorage
        }
  
        // Remover dados do usuário do sessionStorage
        sessionStorage.removeItem('userLogado');
  
        // Redirecionar o usuário para a página de login
        window.location.href = './login.html';
    }
  }
  