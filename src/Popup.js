import { page } from "./index.js";

//classe responsavel para fazer abrir os modais
export class Popup {
  //um parametro que é o seletor css
  constructor(selector) {
    this.selector = document.querySelector(selector);
  }

  open() {
    this.selector.classList.add('modal-opened');
  }

  close () {
    this.selector.classList.remove('modal-opened');
  }

  //fecha modal qnd aperto esc
  _handleEscClose () {
    this.close()
    
    page.classList.remove('page_opacity');
    
  }

  //fecha o modal quando clicar fora dele
  setEventListeners () {
    this.close();
    page.classList.remove('page_opacity');
    
  }

}