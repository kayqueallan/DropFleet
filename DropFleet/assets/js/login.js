let btn = document.querySelector(".fa-eye");

btn.addEventListener("click", () => {
  let inputSenha = document.querySelector("#senha");

  if (inputSenha.getAttribute("type") == "password") {
    inputSenha.setAttribute("type", "text");
  } else {
    inputSenha.setAttribute("type", "password");
  }
});

function entrar(event) {
  event.preventDefault(); // Impede o envio do formulário para evitar o recarregamento da página
  var cpfEmail = document.querySelector("#cpfEmail");
  var cpfEmailLabel = document.querySelector("#cpfEmailLabel");
  var senha = document.querySelector("#senha").value; // Obtém o valor da senha
  var senhaLabelEmail = document.querySelector("#senhaLabelEmail");
  var msgErro = document.querySelector("#msgErro");
  var listaUsuario = [];
  var userValid = {
    nome: null,
    cpf: null,
    email: null,
    senha: null,
  };

  listaUsuario = JSON.parse(localStorage.getItem("listaUsuario")) || [];

  listaUsuario.forEach((item) => {
    if ((cpfEmail.value == item.emailCad || cpfEmail.value == item.cpfCad) && senha == item.senhaCad) { // Verifica se o CPF/Email e senha coincidem
      userValid = {
        nome: item.nomeCad,
        cpf: item.cpfCad,
        email: item.emailCad,
        senha: item.senhaCad,
      };
    }
  });

  if (userValid.nome && (cpfEmail.value == userValid.email || cpfEmail.value == userValid.cpf) && senha == userValid.senha) { // Verifica se userValid contém valores não nulos
    var token = Math.random().toString(16).substr(2); // GERAR UM TOKEN QUANDO USUARIO ENTRAR NO SITE
    localStorage.setItem("token", token); // ARMAZENA O TOKEN NO LOCALSTORAGE

    sessionStorage.setItem("userLogado", JSON.stringify(userValid)); // ARMAZENA OS DADOS DO USUÁRIO NO SESSION STORAGE
    sessionStorage.setItem("token", token); // ARMAZENAR O TOKEN NO SESSIONSTORAGE
    setTimeout(() => {
        window.location.href = "../pages/inicio.html"; // QUANDO O USUARIO LOGAR SERÁ ENVIADO PRA ESSA TELA
    }, 3000); // APÓS 3 SEGUNDOS ABRI-RÁ A TELA PRINCIPAL
  } else {
    cpfEmailLabel.setAttribute("style", "color:red");
    cpfEmail.setAttribute("style", "border-color:red");
    senhaLabelEmail.setAttribute("style", "color:red"); // Alterado para senhaLabelEmail
    msgErro.setAttribute("style", "display: block");
    msgErro.innerHTML = "CPF/Email ou senha incorreto.";
  }
}

/* 
---- COMANDO PARA PEGAR A LISTA ORDENADA DE TODOS OS USUARIOS E SEUS DADOS NO CONSOLE ----
    var listaUsuario = JSON.parse(localStorage.getItem('listaUsuario') || '[]');
    console.log(listaUsuario);
---- COMANDO PARA PEGAR A LISTA ORDENADA DE TODOS OS USUARIOS E SEUS DADOS NO CONSOLE ----
*/
