import "./index.css";
import { Card } from "../components/Card";
import { togglePageOpacity } from "../utils/utils.js";
import { handleProfileFormSubmit } from "../components/UserInfo";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage";
import { initializePage } from "../components/UserInfo";
import { Api } from "../components/Api.js";

// Chama a função de inicialização da página quando a página for carregada, responsável por carregar os dados do profile do servidor
window.addEventListener("DOMContentLoaded", () => {
  initializePage();
});

const api = new Api(); 
const initialCards = []; // Inicializa a variável initialCards como um array vazio, será preenchido pelos dados da API

// Função para pegar cards iniciais do servidor
api.fetchInitialCards()
  .then((res) => {
    initialCards.push(...res);

    res.forEach((item) => {
      if (item.owner._id === "436e74c115dfe006750ac205") {
        //coloquei tempo para atrasar a execucao da funcao, senao o card nao é renderizado no momento da execucao dessa funcao e da erro.
        setTimeout(() => showDeleteButton(), 100);
      }
    });
    cardList.render();
  });

console.log(initialCards)

function showDeleteButton() {
  const deleteButton = document.querySelectorAll('.element__delete')
  deleteButton.forEach((item) => {
    const cardId = item.dataset.cardId;
    if (cardId === "436e74c115dfe006750ac205") {
      item.classList.add('element__delete_active')
    }
  })
}

const editButton = document.querySelector('.button-edit');
const closeButton = document.querySelector('.modal__button-close');
export const page = document.querySelector('.page');
const openModal = new PopupWithForm('.modal', handleProfileFormSubmit);
const openModalAdd = new PopupWithForm('.modal-add', handleProfileFormSubmit);
const openModalImage = new PopupWithImage('.modal-image');
const modalDelete = document.querySelector('.modal_delete')


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

const cardList = new Section(
  {
    items: initialCards,
    renderer: item => {
      const card = new Card(item.link, item.name, item.owner, item._id, item.likes.length);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    }
  },
  '.elements'
);

const modalFormAdd = document.querySelector('.modal-add');
const formAddImage = document.querySelector('.modal__form_add');

modalFormAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const imageName = document.querySelector('.modal__input_title');
  const imageLink = document.querySelector('.modal__input_link');
  const ownerId = "436e74c115dfe006750ac205"; // ID do usuário atual, substitua pelo valor correto recuperado da API
  const card = new Card(imageLink.value, imageName.value, { _id: ownerId });
  card.addCardToServer();
  const cardElement = card.generateCard();
  document.querySelector('.elements').prepend(cardElement);
  openModalAdd.close();
  togglePageOpacity(page);
  formAddImage.reset();
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

//abrir modal para editar photo do perfil
const showModalEditPhoto = document.querySelector('.profile__image-overlay')
const showModalEdit = document.querySelector('.modal_photo');
showModalEditPhoto.addEventListener('click', () => {const showModalEdit = document.querySelector('.modal_photo');
  showModalEdit.classList.add('modal-photo')
  page.classList.add('page_opacity');
});

//fechar modal de editar photo do perfil
const closeModalPhoto = document.querySelector('.button-close-photo');
closeModalPhoto.addEventListener('click', () => {
  showModalEdit.classList.remove('modal-photo');
  page.classList.remove('page_opacity');
})

//muda foto do perfil na API
const profilePhoto = document.querySelector('.profile__image');
const buttonSavephoto = document.querySelector('.modal__button_save');
const inputSavePhotoField = document.querySelector('.modal__input_save-photo')
const modal__form_editPhoto = document.querySelector('.modal__form_editPhoto')
buttonSavephoto.addEventListener('click', () => {
  api.updateProfilePicture(inputSavePhotoField.value);
  profilePhoto.src = inputSavePhotoField.value;
  showModalEdit.classList.remove('modal-photo')
  page.classList.remove('page_opacity');
  modal__form_editPhoto.reset();
})
