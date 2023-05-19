/*variaveis abaixo eu pego os respectivos inputs do formulário*/
const nameInput = document.querySelector('.modal__input_name');
const jobInput = document.querySelector('.modal__input_job');

/*variaveis que vao receber os valores digitados nos inputs respectivamente*/
const addName = nameInput.value;
const addJob = jobInput.value;

/*variaveis que pegam os locais do html aonde serao salvos os dados do edit profile*/
const nameField = document.querySelector('.profile__name')
const jobField = document.querySelector('.profile__about')

//Função para fazer a pagina ficar opaca quando o modal for aberto.
export function togglePageOpacity (page) {
  page.classList.toggle('page_opacity');
}

import { UserInfo } from './UserInfo.js';

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
