
//Função para fazer a pagina ficar opaca quando o modal for aberto.
export function togglePageOpacity (page) {
  page.classList.toggle('page_opacity');
}

/*Funcao para adicior ou remover o modal*/
export function toggleModal(modal) {
  
  modal.classList.toggle('modal_opened');
  
}

/*Funcao mostra modal do adicionar card e tira*/
export function toggleModalAdd(modalAdd) {
  modalAdd.classList.toggle('modal_opened');
}

//funcao para botao salbar do modal edit
export function handleProfileFormSubmit(evt) {
  //linha abaixo previne que o botao envie o formulario da forma padrao
  evt.preventDefault();
  
  /*variaveis abaixo eu pego os respectivos inputs do formulário*/
  const nameInput = document.querySelector('.modal__input_name');
  const jobInput = document.querySelector('.modal__input_job');

  /*variaveis que vao receber os valores digitados nos inputs respectivamente*/
  const addName = nameInput.value; 
  const addJob = jobInput.value;

  /*Faz os placeholders terem os campos digitados*/
  nameInput.placeholder = addName;
  jobInput.placeholder = addJob;
  
  /*variaveis que pegam os locais do html aonde serão alterados meus valores */
  const nameField = document.querySelector('.profile__name');
  const jobField = document.querySelector('.profile__about');
  
  /*Altero valores dos campos com o textContent*/
  nameField.textContent = addName;
  jobField.textContent = addJob;
  
}