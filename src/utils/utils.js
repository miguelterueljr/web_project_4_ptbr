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