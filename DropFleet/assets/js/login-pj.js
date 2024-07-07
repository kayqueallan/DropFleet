document.addEventListener("DOMContentLoaded", function() {
  let btnEntrar = document.querySelector("#botao-entrar");
  let btnEye = document.querySelector("#verSenha");

  btnEntrar.addEventListener("click", entrar);

  btnEye.addEventListener("click", function() {
      let inputSenha = document.querySelector("#senha");

      if (inputSenha.getAttribute("type") == "password") {
          inputSenha.setAttribute("type", "text");
      } else {
          inputSenha.setAttribute("type", "password");
      }
  });
});

function entrar(event) {
  event.preventDefault(); // Evita que o formulário seja enviado por padrão

  var cnpjEmail = document.querySelector("#cnpjEmail").value;
  var senha = document.querySelector("#senha").value;
  var cnpjEmailLabel = document.querySelector("#cnpjEmailLabel");
  var senhaLabel = document.querySelector("#senhaLabel");
  var msgErro = document.querySelector("#msgErro");
  var listaEmpresas = [];

  listaEmpresas = JSON.parse(localStorage.getItem("listaEmpresas")) || [];

  var userValid = listaEmpresas.find((item) => {
      return (item.emailCad === cnpjEmail || item.cnpj === cnpjEmail) && item.senhaCad === senha;
  });

  if (userValid) {
      var token = Math.random().toString(16).substr(2); // GERAR UM TOKEN QUANDO USUARIO ENTRAR NO SITE
      localStorage.setItem("token", token); // ARMAZENA O TOKEN NO LOCALSTORAGE

      sessionStorage.setItem("empresaLogada", JSON.stringify(userValid)); // ARMAZENA OS DADOS DA EMPRESA NO SESSION STORAGE
      sessionStorage.setItem("token", token); // ARMAZENAR O TOKEN NO SESSIONSTORAGE

      setTimeout(() => {
          window.location.href = "inicio-pj.html"; // QUANDO O USUARIO LOGAR SERÁ ENVIADO PRA ESSA TELA
      }, 3000); // APÓS 3 SEGUNDOS ABRI-RÁ A TELA PRINCIPAL
  } else {
      cnpjEmailLabel.style.color = "red";
      senhaLabel.style.color = "red";
      msgErro.style.display = "block";
      msgErro.innerHTML = "CNPJ/E-mail ou senha incorreto.";
  }
}
