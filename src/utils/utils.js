/*variaveis abaixo eu pego os respectivos inputs do formulário*/
export const nameInput = document.querySelector('.modal__input_name');
export const jobInput = document.querySelector('.modal__input_job');
export const profilePhotoInput = document.querySelector('.modal__input_save-photo');

/*variaveis que pegam os locais do html aonde serao salvos os dados do edit profile*/
export const nameField = document.querySelector('.profile__name');
export const jobField = document.querySelector('.profile__about');
export const profilePhotoField = document.querySelector('.profile__image');

//Função para fazer a pagina ficar opaca quando o modal for aberto.
export function togglePageOpacity (page) {
  page.classList.toggle('page_opacity');
}

//variaveis para uso na Api
export const authorizationCode = "85c06b76-d1bb-40cc-b9fa-fda6b61002da";
export const urlApi = "https://around.nomoreparties.co/v1/web_ptbr_04";
export const myUserId = "436e74c115dfe006750ac205";

export const page = document.querySelector('.page');