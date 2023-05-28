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
}