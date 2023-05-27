import "./index.css"

import dallas from "../images/dallas-airport.jpg";
import golden from "../images/golden-gate.png"
import grandCanyon from "../images/grand-canyon.jpg"
import miami from "../images/miami.jpg"
import statueOfLiberty from "../images/statue-of-liberty.jpg";
import tahoeLake from "../images/tahoe-lake.webp";
import { Card } from "../Card.js"
import { togglePageOpacity } from "../utils.js";
import { handleProfileFormSubmit } from "../UserInfo";
import { FormValidator } from "../FormValidator.js";
import { Section } from "../Section.js";
import { PopupWithForm } from "../PopupWithForm.js";
import { PopupWithImage } from "../PopupWithImage";

const editButton = document.querySelector('.button-edit');
const closeButton = document.querySelector('.modal__button-close');
export const page = document.querySelector('.page');
const openModal = new PopupWithForm('.modal', handleProfileFormSubmit);
const openModalAdd = new PopupWithForm('.modal-add', handleProfileFormSubmit);
const openModalImage = new PopupWithImage('.modal-image');

editButton.addEventListener('click', () => {
  togglePageOpacity(page);
  openModal.open();
});

closeButton.addEventListener('click', () => {
  togglePageOpacity(page);
  openModal.close();
});

const addButton = document.querySelector('.button-add');
const buttonCloseAdd = document.querySelector('.button-close');

addButton.addEventListener('click', () => {
  togglePageOpacity(page);
  openModalAdd.open();
});

buttonCloseAdd.addEventListener('click', () => {
  togglePageOpacity(page);
  openModalAdd.close();
});

const formElement = document.querySelector('.modal__form');

formElement.addEventListener('submit', (evt) => {
  handleProfileFormSubmit(evt);
  openModal.close();
  togglePageOpacity(page);
});

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

cardList.render();

const modalFormAdd = document.querySelector('.modal-add');
const formAddImage = document.querySelector('.modal__form_add');

modalFormAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const imageName = document.querySelector('.modal__input_title');
  const imageLink = document.querySelector('.modal__input_link');
  const card = new Card(imageLink.value, imageName.value);
  const cardElement = card.generateCard();
  document.querySelector('.elements').prepend(cardElement);
  openModalAdd.close();
  togglePageOpacity(page);

  formAddImage.reset()
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === "Escape") {
    openModal._handleEscClose();
    openModalAdd._handleEscClose();
    openModalImage.close();
  }
});

page.addEventListener('mouseup', (evt) => {
  openModal.setEventListeners();
  openModalAdd.setEventListeners();
  openModalImage.close();
});

const removeEventListeners = () => {
  editButton.removeEventListener('click', () => {
    togglePageOpacity(page);
    openModal.open();
  });

  closeButton.removeEventListener('click', () => {
    togglePageOpacity(page);
    openModal.close();
  });

  addButton.removeEventListener('click', () => {
    togglePageOpacity(page);
    openModalAdd.open();
  });

  buttonCloseAdd.removeEventListener('click', () => {
    togglePageOpacity(page);
    openModalAdd.close();
  });

  formElement.removeEventListener('submit', (evt) => {
    handleProfileFormSubmit(evt);
    openModal.close();
    togglePageOpacity(page);
  });

  modalFormAdd.removeEventListener('submit', (evt) => {
    evt.preventDefault();
    const imageName = document.querySelector('.modal__input_title');
    const imageLink = document.querySelector('.modal__input_link');
    const card = new Card(imageLink.value, imageName.value);
    const cardElement = card.generateCard();
    document.querySelector('.elements').prepend(cardElement);
    openModalAdd.close();
    togglePageOpacity(page);

    formAddImage.reset();
  });

  document.removeEventListener('keydown', (evt) => {
    if (evt.key === "Escape") {
      openModal._handleEscClose();
      openModalAdd._handleEscClose();
      openModalImage.close();
    }
  });

  page.removeEventListener('mouseup', (evt) => {
    openModal.setEventListeners();
    openModalAdd.setEventListeners();
    openModalImage.close();
  });
};

removeEventListeners();

// Instancia a classe FormValidator para cada formulário encontrado na página
const formList = Array.from(document.querySelectorAll('.modal__form'));

formList.forEach((form) => {
  const validator = new FormValidator(form);
  validator.enableValidation();
});
