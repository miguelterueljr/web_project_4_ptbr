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

//essa funcao esta duplicada, ou exportar ou deletar do index.js
function removeCard () {
  const removeCard = document.querySelectorAll('.element__delete');

  removeCard.forEach((element)=> {
    function deleteACard(evt) {
      evt.target.parentElement.parentElement.remove();
    }
    element.addEventListener('click', deleteACard)
  })
}

class Card {
  constructor (imageLink, imageTitle) {
    this._imageLink = imageLink;
    this._imageTitle = imageTitle;
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

  



}

initialCards.forEach((item) => {
  //cria instancia do cartao
  const card = new Card (item.link, item.name);

  //preenche cartão e retorna
  const cardElement = card.generateCard();

  //Adiciona ao dom
  document.querySelector('.elements').prepend(cardElement);


})
