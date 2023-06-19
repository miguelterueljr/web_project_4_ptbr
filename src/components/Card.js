import { PopupWithImage } from "./PopupWithImage";

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
    //curtir card
    this._element.querySelector('.element__button_image').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__button_active');
      //aqui posso botar uma funcao para enviar o click para meu api e adicionar meus dados ao likes e assim aumentar seu length
      console.log(evt)
      this.addLike();
      
    });

    this._element.querySelector('.element__delete').addEventListener('click', () => {
      
      modalDelete.classList.add('modal_delete');
      page.classList.add('page_opacity');
      confirmButton.addEventListener('click', () => {
        this._handleDelete()
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
    this._element.querySelector('.element__delete').dataset.cardId = this._owner._id; // Adiciona o ID como atributo de dados
    
    //aqui eu colquei um parametro chamado idCard ao meu element__delete e atribui o valor de _id a ele. para saber qual deletar
    this._element.querySelector('.element__delete').dataset.idCard = this._id
    //pego numero de curtidas
    this._element.querySelector('.element__number').textContent = this._likesCount
    
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

  


  //metodo para deletar o card da api
  deleteCardFromServer() {
    const cardId = this._element.querySelector('.element__delete').dataset.idCard; // ID do card específico
  
    fetch(`https://around.nomoreparties.co/v1/web_ptbr_04/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: "85c06b76-d1bb-40cc-b9fa-fda6b61002da"
      }
    })
    .then(response => {
      if (response.ok) {
        // A exclusão foi bem-sucedida
        console.log('Card deleted from server.');
        this._element.remove(); // Remova o elemento do DOM
      } else {
        // A exclusão falhou
        console.error('Failed to delete card from server.');
      }
    })
    .catch(error => {
      // Handle any errors that occur during the request
      console.error('Error:', error);
    });
  }

  addLike() {
    
    fetch('https://around.nomoreparties.co/v1/web_ptbr_04/cards/likes/', {
      method: 'PUT',
      headers: {
        authorization: "85c06b76-d1bb-40cc-b9fa-fda6b61002da"
      }
    })
    .then(response => {
      if (response.ok) {
        // A exclusão foi bem-sucedida
        console.log('Card deleted from server.');
        this._element.remove(); // Remova o elemento do DOM
      } else {
        // A exclusão falhou
        console.error('Failed to delete card from server.');
      }
    })
    .catch(error => {
      // Handle any errors that occur during the request
      console.error('Error:', error);
    });
  }
}

//preciso alterar a propriedade likes da api adicionando meus dados que estao na requisicao da linha 25 do index.js
//com isso automaticamente sera adicionado e aumentara minha length
//com essa logica tenho q tomar cuidado pq quando desclicar eu preciso fazer uma solicitacao delete para remover meus dados e alterar a length diminuindo.
//eu coloquei meus dados numa variavel chamada myId onde seu conteudo obtive atraves de uma solicitação feita na api
//porem essa variavel esta no arquivo index.js tenho q fazer sua importação aqui
