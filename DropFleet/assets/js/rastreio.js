document.addEventListener("DOMContentLoaded", function () {
  const rastreiosElement = document.getElementById("rastreios");
  const formContainer = document.querySelector(".modal-container");

 
  function checkLoggedIn() {
    const token = sessionStorage.getItem("token"); 
  
    if (!token) {
      alert("Você não está logado. Faça o login para acessar esta página.");
      window.location.href = "../pages/login.html"; 
    } else {
    
function handleLogin(token) {
  sessionStorage.setItem("token", token);
}

    }
  }

 
  function calculateProgress(status) {
    const progressMap = {
      "Aguardando liberação": 10,
      "Postado": 25,
      "Em transito": 50,
      "Aguardando retirada": 75,
      "Entregue": 100
    };
    return progressMap[status] || 0;
  }

  // Função para criar a barra de progresso
  function createProgressBar(progressPercentage) {
    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");

    const progress = document.createElement("div");
    progress.classList.add("progress");
    progress.style.width = `${progressPercentage}%`;

    const colorMap = {
      10: "#00CED1",
      25: "#ff4500",
      50: "#ffa500",
      75: "#ffd700",
      100: "#32cd32"
    };

    progress.style.backgroundColor = colorMap[progressPercentage] || "#808080";
    progressBar.appendChild(progress);

    return progressBar;
  }

  // Função para criar informações do objeto de rastreio
  function createObjectInfo(object) {
    const info = document.createElement("div");
    info.classList.add("info");

    const id = document.createElement("p");
    id.textContent = `ID de rastreio: ${object.id}`;

    const empresaId = document.createElement("p");
    empresaId.textContent = `ID da empresa: ${object.empresaId}`;

    const postDate = document.createElement("p");
    postDate.textContent = `Postagem: ${object.postDate}`;

    const deliveryDate = document.createElement("p");
    deliveryDate.textContent = `Entregue: ${object.deliveryDate}`;

    info.append(id, empresaId, postDate, deliveryDate);

    return info;
  }

  // Função para criar o seletor de status
  function createStatusSelect(currentStatus, onChange) {
    const select = document.createElement("select");
    select.classList.add("status-select");

    const statuses = ["Aguardando liberação", "Postado", "Em transito", "Aguardando retirada", "Entregue"];
    statuses.forEach(status => {
      const option = document.createElement("option");
      option.value = status;
      option.textContent = status;
      if (status === currentStatus) {
        option.selected = true;
      }
      select.appendChild(option);
    });

    select.addEventListener("change", function (event) {
      const newStatus = event.target.value;
      onChange(newStatus);
    });

    return select;
  }

  // Função para criar notificações
  function createNotification(message) {
    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("show");
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }, 100);
  }

  // Função para adicionar objeto de rastreio à lista
  function addObjectToList(object) {
    const li = document.createElement("li");
    li.classList.add("object");

    const img = document.createElement("img");
    img.src = "../img/image48.png";
    img.classList.add("truck");

    const info = createObjectInfo(object);
    const progressBar = createProgressBar(calculateProgress(object.status));
    const select = createStatusSelect(object.status, function (newStatus) {
      object.status = newStatus;

      saveDataToLocalStorage(initialData); // Salva os dados atualizados no localStorage
      displayData(initialData);
      createNotification(`Status do rastreio ${object.id} alterado para ${newStatus}`);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.title = "Excluir";
    deleteButton.addEventListener("click", function () {
      const index = initialData.findIndex(item => item.id === object.id);
      if (index !== -1) {
        initialData.splice(index, 1);

        saveDataToLocalStorage(initialData); // Salva os dados atualizados no localStorage
        displayData(initialData);
        createNotification(`Rastreio ${object.id} excluído com sucesso`);
      }
    });

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "../img/remove.png";
    deleteIcon.alt = "Lixeira";
    deleteButton.appendChild(deleteIcon);

    info.appendChild(select);
    li.append(img, info, progressBar, deleteButton);
    rastreiosElement.appendChild(li);
  }

  // Função para exibir os dados na página
  function displayData(dataArray) {
    rastreiosElement.innerHTML = "";
    dataArray.forEach(addObjectToList);
  }

  // Função para obter os dados de rastreios do localStorage
  function getDataFromLocalStorage() {
    const user = JSON.parse(sessionStorage.getItem('userLogado'));
    return user ? JSON.parse(localStorage.getItem(`rastreios_${user.email || user.cpf}`)) || [] : [];
  }

  // Função para salvar os dados de rastreios no localStorage
  function saveDataToLocalStorage(data) {
    const user = JSON.parse(sessionStorage.getItem('userLogado'));
    if (user) {
      localStorage.setItem(`rastreios_${user.email || user.cpf}`, JSON.stringify(data));
    }
  }

  // Verifica se o usuário está logado antes de carregar os dados
  checkLoggedIn();

  const initialData = getDataFromLocalStorage();

  displayData(initialData);

  document.getElementById('add-tracking').addEventListener('submit', function (e) {
    e.preventDefault();

    const id = document.getElementById('add-id').value;
    const empresaId = document.getElementById('add-company').value;
    const deliveryDate = document.getElementById('add-delivery').value;
    const postDate = document.getElementById('add-post').value;
    const status = document.getElementById('statusFilter').value;

    const rastreio = { id, empresaId, postDate, deliveryDate, status };

    initialData.push(rastreio);

    saveDataToLocalStorage(initialData);
    displayData(initialData);

    this.reset();
    formContainer.style.display = 'none';

    createNotification(`Rastreio ${id} adicionado com sucesso`);
  });

  document.querySelector("#searchInput").addEventListener("keyup", (e) => {
    const search = initialData.filter(i =>
      i.id.toLowerCase().includes(e.target.value.toLowerCase())
    );
    displayData(search);
  });

  document.querySelector("#statusFilter").addEventListener("change", (e) => {
    const status = e.target.value;
    const filteredData = status
      ? initialData.filter(item => item.status === status)
      : initialData;
    displayData(filteredData);
  });

  document.getElementById("add-button").addEventListener("click", () => {
    formContainer.style.display = formContainer.style.display === "flex" ? "none" : "flex";
  });

  document.getElementById("close").addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.style.display = "none";
  });
});
