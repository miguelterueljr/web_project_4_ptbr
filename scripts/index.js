import {Card} from "./Card.js"
import { togglePageOpacity, handleProfileFormSubmit } from "./utils.js";
import { FormValidator } from "./FormValidator.js";
import { UserInfo } from "./UserInfo.js";
import { Popup } from "./Popup.js";

const editButton = document.querySelector('.button-edit'); 
const modal = document.querySelector('.modal'); 
const closeButton = document.querySelector('.modal__button-close'); 
const saveButton = document.querySelector('.modal__button-save');
export const page = document.querySelector('.page')
const buttonCreateCard = document.querySelector('.modal__button-create');
const modalImage = document.querySelector('.modal-image');
const openModal = new Popup ('.modal')
const openModalAdd = new Popup('.modal-add')


//Faz modal do edit abrir
editButton.addEventListener('click', () => {
  togglePageOpacity(page);
  openModal.open();

});

//faz botao de close do modal fechar
closeButton.addEventListener('click', () => {
  togglePageOpacity(page);
  openModal.close();
});


/*bloco para abrir modal de adicionar card ---- Variaveis utilizadas*/
const addButton = document.querySelector('.button-add');
const modalAdd = document.querySelector('.modal-add');
const buttonCloseAdd = document.querySelector('.button-close')

addButton.addEventListener('click', () => {
  togglePageOpacity(page);
  openModalAdd.open();
});

buttonCloseAdd.addEventListener('click', () => {
  togglePageOpacity(page);
  openModalAdd.close();
});

/*Bloco de código para fazer o botão salvar*/
const formElement = document.querySelector('.modal__form');  //pego formulario

formElement.addEventListener('submit', (evt) => {
  handleProfileFormSubmit(evt);
  openModal.close();
  togglePageOpacity(page);
});

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

//Funcao para fazer loop sobre array initialCards, criando os cards iniciais.
function addInitialCards() {
  initialCards.forEach((item) => {
    //cria instancia do cartao
    const card = new Card (item.link, item.name);
  
    //preenche cartão e retorna
    const cardElement = card.generateCard();
  
    //Adiciona ao dom
    document.querySelector('.elements').prepend(cardElement);
  });
}
addInitialCards();

//Adiciona um novo card
const modalFormAdd = document.querySelector('.modal-add');
const formAddImage = document.querySelector('.modal__form_add')
modalFormAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const imageName = document.querySelector('.modal__input_title');
  const imageLink = document.querySelector('.modal__input_link');
  const card = new Card(imageLink.value, imageName.value); 
  const cardElement = card.generateCard();
  document.querySelector('.elements').prepend(cardElement);
  openModalAdd.close();
  togglePageOpacity(page);
  
  //codigo abaixo faz o formulario ter os campos de imput limpos apos submit
  formAddImage.reset()
  
});


//Escutador de eventos para fechar modal ao pressionar ESC
document.addEventListener('keydown', (evt) => {
  if(evt.key === "Escape") {
    openModal._handleEscClose();
    openModalAdd._handleEscClose();
  }
});


//escutador de eventos para fechar modal ao clicar fora do modal
page.addEventListener('mouseup', (evt) => {
  openModal.setEventListeners();
  openModalAdd.setEventListeners();
});

