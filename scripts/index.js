const editButton = document.querySelector('.button-edit'); // pego o botao de edit
const modal = document.querySelector('.modal'); //pego o modal
const closeButton = document.querySelector('.modal__button-close'); //pego o botao de fechar
const saveButton = document.querySelector('.modal__button-save');
const makePageBlur = document.querySelector('.page')

//Função para fazer a pagina ficar opaca quando o modal for aberto, aqui usei o metodo toggle que adiciona uma classe se nao tiver ela, e remove se ja tiver, para evitar ter que criar uma função para adicionar a classe e mais uma função para remover a classe.
function togglePageOpacity () {
  makePageBlur.classList.toggle('page_opacity');
}

/*Funcao para adicior ou remover o modal, mesmo raciocionio do toggle acima*/
function toggleModal() {
  togglePageOpacity();
  modal.classList.toggle('modal_opened')
}

/*Escutadores de evento ao clicar botao edit e ao clicar no botao de fechar*/
editButton.addEventListener('click', toggleModal);
closeButton.addEventListener('click', toggleModal);

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

  /*variaveis que pegam os locais do html aonde serão alterados meus valores */
  const nameField = document.querySelector('.profile__name');
  const jobField = document.querySelector('.profile__about');

  /*Altero valores dos campos com o textContent*/
  nameField.textContent = addName;
  jobField.textContent = addJob;

  /*chamo funcao para ao clicar no botao salvar fechar o formulario;*/
  toggleModal();

}

saveButton.addEventListener('click', handleProfileFormSubmit);
