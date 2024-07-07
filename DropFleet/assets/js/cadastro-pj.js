var btn = document.querySelector('#verSenha');
var btnConfirm = document.querySelector('#verconfirmSenha');

// Variáveis de armazenamento dos campos
var nomeEmpresa = document.querySelector('#nomeEmpresa');
var labelNomeEmpresa = document.querySelector('#labelNomeEmpresa');
var validNomeEmpresa = false;

var cnpj = document.querySelector('#cnpj');
var labelCnpj = document.querySelector('#labelCnpj');
var validCnpj = false;

var emailEmpresa = document.querySelector('#emailEmpresa');
var labelEmailEmpresa = document.querySelector('#labelEmailEmpresa');
var validEmailEmpresa = false;

var senhaEmpresa = document.querySelector('#senhaEmpresa');
var labelSenhaEmpresa = document.querySelector('#labelSenhaEmpresa');
var validSenhaEmpresa = false;

var confirmSenhaEmpresa = document.querySelector('#confirmSenhaEmpresa');
var labelConfirmSenhaEmpresa = document.querySelector('#labelConfirmSenhaEmpresa');
var validConfirmSenhaEmpresa = false;

var msgErro = document.querySelector('#msgErro');
var msgSucesso = document.querySelector('#msgSucesso');

// Event listeners para os campos de nome da empresa e CNPJ
nomeEmpresa.addEventListener('keyup', () => {
    if (nomeEmpresa.value.length <= 2) {
        labelNomeEmpresa.setAttribute('style', 'color: red');
        labelNomeEmpresa.innerHTML = '<strong>Nome da Empresa *Insira no mínimo 3 caracteres</strong>';
        validNomeEmpresa = false;
    } else {
        labelNomeEmpresa.setAttribute('style', 'color: #272262');
        labelNomeEmpresa.innerHTML = 'Nome da Empresa';
        validNomeEmpresa = true;
    }
});

cnpj.addEventListener('keyup', () => {
    var cnpjPattern = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    if (!cnpjPattern.test(cnpj.value)) {
        labelCnpj.setAttribute('style', 'color: red');
        labelCnpj.innerHTML = '<strong>CNPJ *Insira um CNPJ válido</strong>';
        validCnpj = false;
    } else {
        labelCnpj.setAttribute('style', 'color: #272262');
        labelCnpj.innerHTML = 'CNPJ';
        validCnpj = true;
    }
});

emailEmpresa.addEventListener('keyup', () => {
    if (emailEmpresa.value.length <= 4) {
        labelEmailEmpresa.setAttribute('style', 'color: red');
        labelEmailEmpresa.innerHTML = '<strong>Email *Insira no mínimo 5 caracteres</strong>';
        emailEmpresa.setAttribute('style', 'border-color: red');
        validEmailEmpresa = false;
    } else {
        labelEmailEmpresa.setAttribute('style', 'color: #272262');
        labelEmailEmpresa.innerHTML = 'Email';
        emailEmpresa.setAttribute('style', 'border-color: #272262');
        validEmailEmpresa = true;
    }
});

senhaEmpresa.addEventListener('keyup', () => {
    if (senhaEmpresa.value.length <= 5) {
        labelSenhaEmpresa.setAttribute('style', 'color: red');
        labelSenhaEmpresa.innerHTML = '<strong>Senha *Insira no mínimo 6 caracteres</strong>';
        senhaEmpresa.setAttribute('style', 'border-color: red');
        validSenhaEmpresa = false;
    } else {
        labelSenhaEmpresa.setAttribute('style', 'color: #272262');
        labelSenhaEmpresa.innerHTML = 'Senha';
        senhaEmpresa.setAttribute('style', 'border-color: #272262');
        validSenhaEmpresa = true;
    }
});

confirmSenhaEmpresa.addEventListener('keyup', () => {
    if (senhaEmpresa.value != confirmSenhaEmpresa.value) {
        labelConfirmSenhaEmpresa.setAttribute('style', 'color: red');
        labelConfirmSenhaEmpresa.innerHTML = '<strong>Confirmar Senha *As senhas não conferem</strong>';
        confirmSenhaEmpresa.setAttribute('style', 'border-color: red');
        validConfirmSenhaEmpresa = false;
    } else {
        labelConfirmSenhaEmpresa.setAttribute('style', 'color: #272262');
        labelConfirmSenhaEmpresa.innerHTML = 'Confirmar Senha';
        confirmSenhaEmpresa.setAttribute('style', 'border-color: #272262');
        validConfirmSenhaEmpresa = true;
    }
});

function cadastrarEmpresaPJ() {
    if (validNomeEmpresa && validEmailEmpresa && validSenhaEmpresa && validConfirmSenhaEmpresa && validCnpj) {
        var listaEmpresas = JSON.parse(localStorage.getItem('listaEmpresas')) || [];

        var novaEmpresa = {
            nomeEmpresa: nomeEmpresa.value,
            cnpj: cnpj.value,
            emailCad: emailEmpresa.value,
            senhaCad: senhaEmpresa.value
        };

        listaEmpresas.push(novaEmpresa);
        localStorage.setItem('listaEmpresas', JSON.stringify(listaEmpresas));

        // Armazena os dados da empresa no sessionStorage
        sessionStorage.setItem('empresaLogada', JSON.stringify(novaEmpresa));

        msgSucesso.setAttribute('style', 'display: block');
        msgSucesso.innerHTML = '<strong>Cadastro realizado com sucesso!</strong>';
        msgErro.setAttribute('style', 'display: none');
        setTimeout(() => {
            window.location.href = 'login-pj.html';
        }, 3000);
    } else {
        msgErro.setAttribute('style', 'display: block');
        msgErro.innerHTML = '<strong>Por favor, preencha todos os campos corretamente.</strong>';
        msgSucesso.setAttribute('style', 'display: none');
    }
}

btn.addEventListener('click', () => {
    let inputSenha = document.querySelector('#senhaEmpresa');
    if (inputSenha.getAttribute('type') === 'password') {
        inputSenha.setAttribute('type', 'text');
        btn.setAttribute('class', 'fa-solid fa-eye-slash');
    } else {
        inputSenha.setAttribute('type', 'password');
        btn.setAttribute('class', 'fa-solid fa-eye');
    }
});

btnConfirm.addEventListener('click', () => {
    let inputConfirmSenha = document.querySelector('#confirmSenhaEmpresa');
    if (inputConfirmSenha.getAttribute('type') === 'password') {
        inputConfirmSenha.setAttribute('type', 'text');
        btnConfirm.setAttribute('class', 'fa-solid fa-eye-slash');
    } else {
        inputConfirmSenha.setAttribute('type', 'password');
        btnConfirm.setAttribute('class', 'fa-solid fa-eye');
    }
});
