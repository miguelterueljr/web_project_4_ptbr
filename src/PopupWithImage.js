import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }
  //alterei o metodo open do pai para apenas substituir a classe
  open() {
    this.selector.classList.add('modal-image__active');  
  }

}

