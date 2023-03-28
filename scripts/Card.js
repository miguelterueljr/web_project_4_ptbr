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

/*
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
  
  
  images.forEach(function (item) {
    item.addEventListener('click', function() {
      const srcVal = item.getAttribute('src');
      modalImgElement.setAttribute('src', srcVal);
      modalImage.classList.add('modal-image__active');
      page.classList.add('page_opacity'); // adiciona opacidade ao fundo
      const imgAlt = item.getAttribute('alt'); //muda atributo alt
      modalImgElement.setAttribute('alt', imgAlt);

      //aqui pego o titulo da imagem e retorno seu conetudo 
      const imageTitle = item.parentNode.querySelector('.element__title').textContent;
      modalTitle.textContent = imageTitle;
      
    })
  })

  btnClose.addEventListener('click', function () {
    modalImage.classList.remove('modal-image__active');
    page.classList.remove('page_opacity'); //remove opacidade do fundo
    
    
  });
  
}
*/

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

  generateCard() {
    //armazena marcacao no campo privado _element, para que tds os outros possam acessa-lo
    this._element = this._getTemplate();

    //adiciona dados
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
