const modalImage = document.querySelector('.modal-image');
const modalImgElement = document.querySelector('.modal-image__image');
const btnClose = document.querySelector('.modal-image__button');
const modalTitle = document.querySelector('.modal-image__title');
const page = document.querySelector('.page')


export class Card {
  constructor(imageLink, imageTitle, modalImage, modalImgElement, modalTitle, page) {
    this._imageLink = imageLink;
    this._imageTitle = imageTitle;
    this._modalImage = modalImage;
    this._modalImgElement = modalImgElement;
    this._modalTitle = modalTitle;
    this._page = page;
  }

  //pega bloco template do html
  _getTemplate() {
    const cardElement = document
    .querySelector('.card-template')
    .content 
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  //metodo para abrir iamgem e seu titulo em zoom
  handleClick() {
    const srcVal = this._element.querySelector('.element__image').getAttribute('src');
    modalImgElement.setAttribute('src', srcVal);
    modalImage.classList.add('modal-image__active');
    page.classList.add('page_opacity');
    const imgAlt = this._element.querySelector('.element__image').getAttribute('alt');
    modalImgElement.setAttribute('alt', imgAlt);
    const imageTitle = this._element.querySelector('.element__title').textContent;
    modalTitle.textContent = imageTitle;
  }


 // escutadores de eventos p/ botao curtir e deletar
  _setEventListeners() {
    //botao curtir
    this._element.querySelector('.element__button').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__button_active');
    });

    //botao deletar
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._element.remove();
    });

    //evento ao clicar na imagem
    this._element.querySelector('.element__image').addEventListener('click', this.handleClick.bind(this));


    //fechar o modal quando a imagem estiver clicada e em foco
    btnClose.addEventListener('click', function () {
      modalImage.classList.remove('modal-image__active');
      page.classList.remove('page_opacity'); //remove opacidade do fundo
    });
  };

  generateCard() {
    //armazena marcacao no campo privado _element, para que tds os outros possam acessa-lo
    this._element = this._getTemplate();
    this._setEventListeners();

    //adiciona dados, alt src e titulo
    this._element.querySelector('.element__image').alt = `Card contendo a foto e o titulo de ${this._imageTitle}`;
    this._element.querySelector('.element__image').src = this._imageLink;
    this._element.querySelector('.element__title').textContent = this._imageTitle;

    //retorna elemento
    return this._element;
  }

};



