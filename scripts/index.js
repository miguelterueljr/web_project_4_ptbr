const editButton = document.querySelector('.button-edit'); 
const modal = document.querySelector('.modal'); 
const closeButton = document.querySelector('.modal__button-close'); 
const saveButton = document.querySelector('.modal__button-save');
const makePageBlur = document.querySelector('.page')

//Função para fazer a pagina ficar opaca quando o modal for aberto.
function togglePageOpacity () {
  makePageBlur.classList.toggle('page_opacity');
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
  
  /*variaveis que pegam os locais do html aonde serão alterados meus valores */
  const nameField = document.querySelector('.profile__name');
  const jobField = document.querySelector('.profile__about');
  
  /*Altero valores dos campos com o textContent*/
  nameField.textContent = addName;
  jobField.textContent = addJob;
  
  
  toggleModal();
  formElement.reset(); //reset os inputs do formulario apos o submit, se fechar o modal nao
  
}

formElement.addEventListener('submit', handleProfileFormSubmit);

//Array com cards Iniciais
const initialCards = [
  {
    name: "Grand Kanyon",
    link: "./images/grand-canyon.jpg"
  },
  {
    name: "Dallas Airport",
    link: "./images/dallas-airport.jpg"
  },
  {
    name: "Golden Gate",
    link: "./images/golden-gate.png"
  },
  {
    name: "Miami",
    link: "./images/miami.jpg"
  },
  {
    name: "Statue of Liberty",
    link: "./images/statue-of-liberty.jpg"
  },
  {
    name: "Lake Tahoe",
    link: "./images/tahoe-lake.webp"
  }
]

//Função adicionar Cards
function addCard(imageLink, imageTitle) {
  const elements = document.querySelector('.elements');
  const userTemplate = document.querySelector('#element').content; // variavel que pega o conteudo da id do template
  const itemElement = userTemplate.querySelector('.element').cloneNode(true); //clona todo conteudo 


  itemElement.querySelector('.element__image').src = imageLink //o src da imagem é igual ao parametro imageLink
  itemElement.querySelector('.element__title').textContent = imageTitle 

  elements.append(itemElement); // adiciono o conteudo dinamicamenta na pagina
  
}

//Método de repeticao onde vou iterar sobre cada item do array, chamando a função para adicionar o card na pagina. Pode ser feito tb com laço for.
initialCards.forEach(function (item) {
  addCard(item.link, item.name)
})
