const editButton = document.querySelector('.button-edit'); 
const modal = document.querySelector('.modal'); 
const closeButton = document.querySelector('.modal__button-close'); 
const saveButton = document.querySelector('.modal__button-save');
const makePageBlur = document.querySelector('.page')
const buttonCreateCard = document.querySelector('.modal__button-create');

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

  //preciso adicionar o alt das imagens
  itemElement.querySelector('.element__image').alt = `Card contendo o titulo e a foto de ${imageTitle}`;
  itemElement.querySelector('.element__image').src = imageLink; //o src da imagem é igual ao parametro imageLink
  itemElement.querySelector('.element__title').textContent = imageTitle; 

  //botao curtir
  itemElement.querySelector('.element__button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__button_active');
  });
  
  elements.prepend(itemElement); // adiciono o conteudo dinamicamenta na pagina
  
  const removeCardButton = document.querySelector('.element__delete');
  removeCardButton.addEventListener('click', removeCard);
 
//codigo para abrir o modal de imagens
  const images = document.querySelectorAll('.element__image');
  const modalImage = document.querySelector('.modal-image');
  const modalImgElement = document.querySelector('.modal-image__image');
  const btnClose = document.querySelector('.modal-image__button');
  const modalTitle = document.querySelector('.modal-image__title');
  const getModalTitle = document.querySelectorAll('.element__title')
  
  images.forEach(function (item) {
    item.addEventListener('click', function() {
      const srcVal = item.getAttribute('src');
      modalImgElement.setAttribute('src', srcVal);
      modalImage.classList.add('modal-image__active');
      makePageBlur.classList.add('page_opacity'); // adiciona opacidade ao fundo

      //aqui pego o titulo da imagem e retorno seu conetudo 
      const imageTitle = item.parentNode.querySelector('.element__title').textContent;
      modalTitle.textContent = imageTitle;
    })  
  })

  
  
  btnClose.addEventListener('click', function () {
    modalImage.classList.remove('modal-image__active');
    makePageBlur.classList.remove('page_opacity'); //remove opacidade do fundo
    
  });
  
}

//itero sobre cada item e chamo funcao para adicionar card
initialCards.forEach(function (item) {
  addCard(item.link, item.name)
})

//Adiciona um novo card
const modalFormAdd = document.querySelector('.modal-add')
modalFormAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const imageName = document.querySelector('.modal__input_title');
  const imageLink = document.querySelector('.modal__input_link');
  addCard(imageLink.value, imageName.value); 
  toggleModalAdd();
  
  //codigo abaixo faz o formulario ter os campos d eimput limpos apos submit
  imageName.value = ''; 
  imageLink.value = '';
  
})

//deleta card
function removeCard () {
  const removeCard = document.querySelectorAll('.element__delete');

  removeCard.forEach((element)=> {
    function deleteACard(evt) {
      evt.target.parentElement.parentElement.remove();
    }
    element.addEventListener('click', deleteACard)
  })
}



  
