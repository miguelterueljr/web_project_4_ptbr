import { Api } from "./Api";
import { PopupWithImage } from "./PopupWithImage";
import { showDeleteButton } from "../pages";

const api = new Api();
const modalImage = document.querySelector('.modal-image');
const modalImgElement = document.querySelector('.modal-image__image');
const btnClose = document.querySelector('.modal-image__button');
const modalTitle = document.querySelector('.modal-image__title');
const page = document.querySelector('.page');
const popupWithImage = new PopupWithImage('.modal-image');
const modalDelete = document.querySelector('.modal-delete');
const closeButton = document.querySelector('.modal__button-close_close');
const confirmButton = document.querySelector('.modal__button_confirm');

export class Card {
  constructor(imageLink, imageTitle, owner, idCard, numberOfLikes) {
    this._imageLink = imageLink;
    this._imageTitle = imageTitle;
    this._element = this._getTemplate();
    this._setEventListeners();
    this._owner = owner;
    this._id = idCard;
    this._likesCount = numberOfLikes;
    this._isLiked = false;
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

      if (evt.target.classList.contains('element__button_active')) {
        this.addLike();
      } else {
        this.removeLike();
      }
    });

    this._element.querySelector('.element__delete').addEventListener('click', () => {
      modalDelete.classList.add('modal_delete');
      page.classList.add('page_opacity');
      confirmButton.addEventListener('click', () => {
        this._handleDelete();
        this.deleteCardFromServer();
      })
    });

    this._element.querySelector('.element__image').addEventListener('click', this.handleClick.bind(this));

    btnClose.addEventListener('click', function () {
      modalImage.classList.remove('modal-image__active');
      page.classList.remove('page_opacity');
    });

    closeButton.addEventListener('click', () => {
      modalDelete.classList.remove('modal_delete');
      page.classList.remove('page_opacity');
      confirmButton.removeEventListener('click', this._handleDelete);
    });
  }

  _handleDelete = () => {
    this._element.remove();
    modalDelete.classList.remove('modal_delete');
    page.classList.remove('page_opacity');
    confirmButton.removeEventListener('click', this._handleDelete);
  }

  generateCard() {
    this._element.querySelector('.element__image').alt = `Card contendo a foto e o titulo de ${this._imageTitle}`;
    this._element.querySelector('.element__image').src = this._imageLink;
    this._element.querySelector('.element__title').textContent = this._imageTitle;
    this._element.querySelector('.element__delete').dataset.cardId = this._owner._id;
    this._element.querySelector('.element__delete').dataset.idCard = this._id;
    this._element.querySelector('.element__number').textContent = this._likesCount;

    return this._element;
  }

  addCardToServer() {
    const cardData = {
      name: this._imageTitle,
      link: this._imageLink
    };
  
    api.addCard(cardData)
      .then((createdCard) => {
        console.log('Card added to server:', createdCard);
        // Atualiza os dados do card com os dados retornados do servidor
        this._id = createdCard.id;
        this._likesCount = createdCard.likes.length;
        this._element.querySelector('.element__number').textContent = this._likesCount;
        showDeleteButton();
      })
      .catch((error) => {
        console.error('Failed to add card to server:', error);
      });
  }

  deleteCardFromServer() {
    const cardId = this._element.querySelector('.element__delete').dataset.idCard;
  
    api.deleteCard(cardId)
      .then(response => {
        if (response.ok) {
          console.log('Card deleted from server.');
          this._element.remove();
        } else {
          console.error('Failed to delete card from server:', response.status, response.statusText);
        }
        confirmButton.removeEventListener('click', this._handleDelete);
      })
      .catch((error) => {
        console.error('Failed to delete card from server:', error);
      });
  }

  addLike() {
    api.addLikeToCard(this._id)
      .then(data => {
        this._likesCount = data.likes.length;
        this._updateLikesCount();
      })
      .catch((error) => {
        console.error('Failed to add like to card:', error);
      });
  }
  
  removeLike() {
    api.removeLikeFromCard(this._id)
      .then(data => {
        this._likesCount = data.likes.length;
        this._updateLikesCount();
      })
      .catch((error) => {
        console.error('Failed to remove like from card:', error);
      });
  }
  
  _updateLikesCount() {
    this._element.querySelector('.element__number').textContent = this._likesCount;
  }
}
