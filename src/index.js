import "./styles/index.css"

//definicao de variaveis com os caminhos das imagens para o webpack poder gerar elas
import dallas from "./images/dallas-airport.jpg";
import golden from "./images/golden-gate.png"
import grandCanyon from "./images/grand-canyon.jpg"
import miami from "./images/miami.jpg"
import statueOfLiberty from "./images/statue-of-liberty.jpg";
import tahoeLake from "./images/tahoe-lake.webp";

import {Card} from "./Card.js"
import { togglePageOpacity, handleProfileFormSubmit } from "./utils.js";
//aqui importo para que ocorra a validacao do meu formulario, se eu deletar para de validar
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { PopupWithForm } from "./PopupWithForm.js";

const editButton = document.querySelector('.button-edit'); 
const modal = document.querySelector('.modal'); 
const closeButton = document.querySelector('.modal__button-close'); 
const saveButton = document.querySelector('.modal__button-save');
export const page = document.querySelector('.page')
const buttonCreateCard = document.querySelector('.modal__button-create');
const modalImage = document.querySelector('.modal-image');
const openModal = new PopupWithForm('.modal', handleProfileFormSubmit);
const openModalAdd = new PopupWithForm('.modal-add', handleProfileFormSubmit);

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
    link: grandCanyon
  },
  {
    name: "Dallas Airport",
    link: dallas
  },
  {
    name: "Golden Gate",
    link: golden
  },
  {
    name: "Miami",
    link: miami
  },
  {
    name: "Statue of Liberty",
    link: statueOfLiberty
  },
  {
    name: "Lake Tahoe",
    link: tahoeLake
  }
]

// Crie uma instância da classe Section essa vai renderizar na pagina, substitiu minha antiga addInitialCards
const cardList = new Section(
  {
    items: initialCards,
    renderer: item => {
      const card = new Card(item.link, item.name);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    }
  },
  '.elements'
);

// Renderize os elementos do cartão
cardList.render();

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


// Escutador de eventos para fechar modal ao pressionar ESC
document.addEventListener('keydown', (evt) => {
  if (evt.key === "Escape") {
    openModal._handleEscClose();
    openModalAdd._handleEscClose();
  }
});

// Escutador de eventos para fechar modal ao clicar fora do modal
page.addEventListener('mouseup', (evt) => {
  openModal.setEventListeners();
  openModalAdd.setEventListeners();
});

