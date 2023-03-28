const editButton = document.querySelector('.button-edit'); 
const modal = document.querySelector('.modal'); 
const closeButton = document.querySelector('.modal__button-close'); 
const saveButton = document.querySelector('.modal__button-save');
const page = document.querySelector('.page')
const buttonCreateCard = document.querySelector('.modal__button-create');
const modalImage = document.querySelector('.modal-image');



//Função para fazer a pagina ficar opaca quando o modal for aberto.
function togglePageOpacity () {
  page.classList.toggle('page_opacity');
}

/*Funcao para adicior ou remover o modal*/
function toggleModal() {
  togglePageOpacity();
  modal.classList.toggle('modal_opened');
  
}

editButton.addEventListener('click', toggleModal);
closeButton.addEventListener('click', toggleModal);


/*bloco para abrir modal de adicionar card*/
const addButton = document.querySelector('.button-add');
const modalAdd = document.querySelector('.modal-add');
const buttonCloseAdd = document.querySelector('.button-close')

/*Funcao mostra modal do adicionar card e tira*/
function toggleModalAdd() {
  togglePageOpacity();
  modalAdd.classList.toggle('modal_opened');
}

addButton.addEventListener('click', toggleModalAdd);
buttonCloseAdd.addEventListener('click', toggleModalAdd);



/*Bloco de código para fazer o botão salvar*/
const formElement = document.querySelector('.modal__form');  //pego formulario

function handleProfileFormSubmit(evt) {
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
  
  
  toggleModal();
  
  
}

formElement.addEventListener('submit', handleProfileFormSubmit);


//Escutador de eventos para fechar modal ao pressionar ESC
document.addEventListener('keydown', (evt) => {
  if(evt.key === "Escape") {
    modal.classList.remove('modal_opened');
    page.classList.remove('page_opacity');
    modalAdd.classList.remove('modal_opened');
    modalImage.classList.remove('modal-image__active');
  }
});


//escutador de eventos para fechar modal ao clicar fora do modal
page.addEventListener('mouseup', (evt) => {
  modal.classList.remove('modal_opened');
  page.classList.remove('page_opacity');
  modalAdd.classList.remove('modal_opened');
  modalImage.classList.remove('modal-image__active');
});

