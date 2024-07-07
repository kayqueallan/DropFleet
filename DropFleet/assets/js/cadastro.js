var btn = document.querySelector('#verSenha')
var btnConfirm = document.querySelector('#verconfirmSenha')

// INICIO DO ARMAZENAMENTO DAS VARIAVEIS

var nome = document.querySelector('#nome')
var labelNome = document.querySelector('#labelNome')
var validNome = false

var cpf = document.querySelector('#cpf'); 
var labelCpf = document.querySelector('#labelCpf'); 
var validCpf = false;

var email = document.querySelector('#email')
var labelEmail = document.querySelector('#labelEmail')
var validEmail = false

var senha = document.querySelector('#senha')
var labelSenha = document.querySelector('#labelSenha')
var validSenha = false

var confirmSenha = document.querySelector('#confirmSenha')
var labelConfirmSenha = document.querySelector('#labelConfirmSenha')
var validConfirmSenha = false

// MENSAGENS PARA MOSTRAR SE O CADASTRO FOI FEITO OU NÃO 
var msgErro = document.querySelector('#msgErro') // MENSAGEM DE ERRO
var msgSucesso = document.querySelector('#msgSucesso') // MENSAGEM DE SUCESSO

// EVENTOS NOS CAMPOS DE MENSAGEM
nome.addEventListener('keyup', () => {
    if(nome.value.length <= 2) {
        labelNome.setAttribute('style', 'color: red')
        labelNome.innerHTML = '<strong>Nome *Insira no mínimo 3 caracteres</strong>'
        validNome = false
    } else {
        labelNome.setAttribute('style', 'color: #272262')
        labelNome.innerHTML = 'Nome'
        nome.setAttribute('style', 'border-color: #272262')
        validNome = true
    }
})

cpf.addEventListener('keyup', () => { // Novo campo CPF
    var cpfValue = cpf.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    cpfValue = cpfValue.replace(/^(\d{3})(\d)/, '$1.$2'); // Adiciona ponto após os 3 primeiros dígitos
    cpfValue = cpfValue.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3'); // Adiciona ponto após os 6 primeiros dígitos
    cpfValue = cpfValue.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, '$1.$2.$3-$4'); // Adiciona traço após os 9 primeiros dígitos
    cpf.value = cpfValue;
    if (cpfValue.length !== 14) { // Verifica se o CPF está completo (com os pontos e traço)
        labelCpf.setAttribute('style', 'color: red');
        labelCpf.innerHTML = '<strong>CPF *CPF deve ter 11 dígitos</strong>';
        cpf.setAttribute('style', 'border-color: red');
        validCpf = false;
    } else {
        labelCpf.setAttribute('style', 'color: #272262');
        labelCpf.innerHTML = 'CPF';
        cpf.setAttribute('style', 'border-color: #272262');
        validCpf = true;
    }
});

email.addEventListener('keyup', () => {
    if(email.value.length <= 4) {
        labelEmail.setAttribute('style', 'color: red')
        labelEmail.innerHTML = '<strong>Email *Insira no mínimo 5 caracteres</strong>'
        email.setAttribute('style', 'border-color: red')
        validEmail = false
    } else {
        labelEmail.setAttribute('style', 'color: #272262')
        labelEmail.innerHTML = 'Email'
        email.setAttribute('style', 'border-color: #272262')
        validEmail = true
    }
})

senha.addEventListener('keyup', () => {
    if(senha.value.length <= 5) {
        labelSenha.setAttribute('style', 'color: red')
        labelSenha.innerHTML = '<strong>Senha *Insira no mínimo 6 caracteres</strong>'
        senha.setAttribute('style', 'border-color: red')
        validSenha = false
    } else {
        labelSenha.setAttribute('style', 'color: #272262')
        labelSenha.innerHTML = 'Senha'
        senha.setAttribute('style', 'border-color: #272262')
        validSenha = true
    }
});


confirmSenha.addEventListener('keyup', () => {
    if(senha.value != confirmSenha.value) {
        labelConfirmSenha.setAttribute('style', 'color: red')
        labelConfirmSenha.innerHTML = '<strong>Confirmar Senha *As senhas não conferem</strong>'
        confirmSenha.setAttribute('style', 'border-color: red')
        validConfirmSenha = false
    } else {
        labelConfirmSenha.setAttribute('style', 'color: #272262')
        labelConfirmSenha.innerHTML = 'Confirmar Senha'
        confirmSenha.setAttribute('style', 'border-color: #272262')
        validConfirmSenha = true
    }
});

// FUNCAO DO BOTAO CADASTRAR
function cadastrar(){
    if(validNome && validCpf && validEmail && validSenha && validConfirmSenha) {
        // ARMAZENANDO OS DADOS DO USUARIO NO LOCAL STORAGE
        var listaUsuario = JSON.parse(localStorage.getItem('listaUsuario') || '[]')

        listaUsuario.push(
        {
            nomeCad: nome.value,
            cpfCad: cpf.value.replace(/\D/g, ''),
            emailCad: email.value,
            senhaCad: senha.value
        }
        )
        // CONVERTENDO O JSON PARA STRING NO LOCAL STORAGE E ARMAZENANDO NO LOCALSTORAGE
        localStorage.setItem('listaUsuario', JSON.stringify(listaUsuario))
        // ARMAZENANDO OS DADOS NA SESSION STORAGE
        sessionStorage.setItem('nome', nome.value)
        sessionStorage.setItem('cpf', cpf.value.replace(/\D/g, ''))
        sessionStorage.setItem('email', email.value)
        sessionStorage.setItem('senha', senha.value)

        alert('Campos preenchidos!')
        msgSucesso.setAttribute('style', 'display: block')
        msgSucesso.innerHTML = '<strong>Cadastrando usuário...</strong>' // APARECER MSG NA TELA QUANDO DA CERTO
        msgErro.setAttribute('style', 'display: none')
        msgErro.innerHTML = ''

        // DEPOIS DE CADASTRAR VAI REDIRECIONAR PARA A TELA DE LOGIN
        setTimeout(() => {
            window.location.href = 'login.html' // REDIRECIONACÃO
        }, 3000) // TEMPO PARA REDIRECIONAR = 3 SEGUNDOS

    } else {
        alert('Campos obrigatórios não preenchidos!')
        msgErro.setAttribute('style', 'display: block')
        msgErro.innerHTML = '<strong>Preencha todos os campos corretamente!</strong>' // APARECER MSG NA TELA QUANDO DA ERRO
        msgSucesso.setAttribute('style', 'display: none')
        msgSucesso.innerHTML = ''
    }
}

// ACÃO PARA ESCONDER E APARECER SENHA
btn.addEventListener('click', () => {

    let inputSenha = document.querySelector('#senha')

    if(inputSenha.getAttribute('type') == 'password'){
        inputSenha.setAttribute('type', 'text')
    } else {
        inputSenha.setAttribute('type', 'password')
    }
})

// ACÃO PARA ESCONDER E APARECER SENHA NO MOMENTO DE CONFIRMAR
btnConfirm.addEventListener('click', () => {

    let inputSenha = document.querySelector('#confirmSenha')

    if(inputSenha.getAttribute('type') == 'password'){
        inputSenha.setAttribute('type', 'text')
    } else {
        inputSenha.setAttribute('type', 'password')
    }
})

/* 
---- COMANDO PARA PEGAR A LISTA ORDENADA DE TODOS OS USUARIOS E SEUS DADOS NO CONSOLE ----
    var listaUsuario = JSON.parse(localStorage.getItem('listaUsuario') || '[]');
    console.log(listaUsuario);
---- COMANDO PARA PEGAR A LISTA ORDENADA DE TODOS OS USUARIOS E SEUS DADOS NO CONSOLE ----
*/