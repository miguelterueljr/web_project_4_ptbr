import { PopupWithImage } from "./PopupWithImage";

const modalImage = document.querySelector('.modal-image');
const modalImgElement = document.querySelector('.modal-image__image');
const btnClose = document.querySelector('.modal-image__button');
const modalTitle = document.querySelector('.modal-image__title');
const page = document.querySelector('.page');
const popupWithImage = new PopupWithImage('.modal-image');
const modalDelete = document.querySelector('.modal-delete');
const deleteButton = document.querySelector('.element__delete');

export class Card {
  constructor(imageLink, imageTitle) {
    this._imageLink = imageLink;
    this._imageTitle = imageTitle;
    this._element = this._getTemplate();
    this._setEventListeners();
  }

  _getTemplate() {
    const cardElement = document
      .querySelector('.card-template')
      .content 
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  handleClick() {
    const srcVal = this._element.querySelector('.element__image').getAttribute('src');
    modalImgElement.setAttribute('src', srcVal);
    const imgAlt = this._element.querySelector('.element__image').getAttribute('alt');
    modalImgElement.setAttribute('alt', imgAlt);
    const imageTitle = this._element.querySelector('.element__title').textContent;
    modalTitle.textContent = imageTitle;

    popupWithImage.open();
    page.classList.add('page_opacity');
  }

  _setEventListeners() {
    this._element.querySelector('.element__button_image').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__button_active');
      

      
    });

    this._element.querySelector('.element__delete').addEventListener('click', () => {
      modalDelete.classList.add('modal_delete')
      page.classList.add('page_opacity')
      //this._element.remove(); // aqui removia o card quando clicava no botao de delete, pensar nessa funcao
    });

    this._element.querySelector('.element__image').addEventListener('click', this.handleClick.bind(this));

    btnClose.addEventListener('click', function () {
      modalImage.classList.remove('modal-image__active');
      page.classList.remove('page_opacity');
    });
  }

  generateCard() {
    this._element.querySelector('.element__image').alt = `Card contendo a foto e o titulo de ${this._imageTitle}`;
    this._element.querySelector('.element__image').src = this._imageLink;
    this._element.querySelector('.element__title').textContent = this._imageTitle;

    return this._element;
  }

  addCardToServer() {
    const cardData = {
      name: this._imageTitle,
      link: this._imageLink
    };
  
    fetch('https://around.nomoreparties.co/v1/web_ptbr_04/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: "85c06b76-d1bb-40cc-b9fa-fda6b61002da"
      },
      body: JSON.stringify(cardData)
    })
    .then(response => response.json())
    .then(newCard => {
      // Handle the response and do something with the new card data
      console.log(newCard);
    })
    .catch(error => {
      // Handle any errors that occur during the request
      console.error('Error:', error);
    });
  }
}


