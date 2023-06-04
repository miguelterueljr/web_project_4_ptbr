import { nameInput, jobInput, nameField, jobField } from "../utils/utils.js";

// classe UserInfo, responsável por renderizar a informação sobre o usuário na página
export class UserInfo {
  constructor(nameInput, jobInput, nameField, jobField) {
    this.nameInput = nameInput;
    this.jobInput = jobInput;
    this.nameField = nameField;
    this.jobField = jobField;
  }

  // método público que retorna um objeto com informações sobre o usuário
  getUserInfo() {
    return {
      name: this.nameInput.value,
      job: this.jobInput.value
    };
  }

  // método público que pega novos dados do usuário e adiciona na página
  setUserInfo(name, job) {
    this.nameField.textContent = name;
    this.jobField.textContent = job;
  }
}
 
//funcao para botao salbar do modal edit
export function handleProfileFormSubmit(evt) {
  //linha abaixo previne que o botao envie o formulario da forma padrao
  evt.preventDefault();

  /*variável que recebe uma instância da classe UserInfo*/
  const userInfo = new UserInfo(nameInput, jobInput, nameField, jobField);

  /*chama o método getUserInfo da instância userInfo*/
  const userInfoData = userInfo.getUserInfo();

  /*chama o método setUserInfo da instância userInfo*/
  userInfo.setUserInfo(userInfoData.name, userInfoData.job);

  fetch("https://around.nomoreparties.co/v1/web_ptbr_04/users/me", {
    method: "PATCH",
    headers: {
      authorization: "85c06b76-d1bb-40cc-b9fa-fda6b61002da",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: userInfoData.name,
      about: userInfoData.job
    })
  })
    .then(response => response.json())
    .then(data => {
      // Retorno no console para saber se foi bem sucedido minha solicitação
      console.log("Dados de perfil atualizados:", data);
    })
    .catch(error => {
      // retorna erro no meu console quando a atualização nao for bem sucedida
      console.error("Erro ao atualizar o perfil:", error);
    });
}

// Função de inicialização da página
export function initializePage() {
  // Realiza uma solicitação GET para obter os dados do perfil do servidor
  fetch("https://around.nomoreparties.co/v1/web_ptbr_04/users/me", {
    headers: {
      authorization: "85c06b76-d1bb-40cc-b9fa-fda6b61002da"
    }
  })
    .then(response => response.json())
    .then(data => {
      // Obtém as informações de perfil do objeto de resposta
      const { name, about } = data;

      // Cria uma instância da classe UserInfo
      const userInfo = new UserInfo(nameInput, jobInput, nameField, jobField);

      // Chama o método setUserInfo para exibir as informações do perfil na página
      userInfo.setUserInfo(name, about);
    })
    .catch(error => {
      console.error("Erro ao carregar as informações do perfil:", error);
    });
}


