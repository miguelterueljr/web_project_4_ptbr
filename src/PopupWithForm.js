import { Popup } from "./Popup.js";
import { FormValidator } from "./FormValidator.js";

export class PopupWithForm extends Popup {
  constructor(selector, submitCallback) {
    super(selector);
    this.submitCallback = submitCallback;
    this.form = this.selector.querySelector('.modal__form');
    this.closeButton = this.selector.querySelector('.modal__button-close');
    this.formValidator = new FormValidator(this.form);
  }

  _getInputValues() {
    const inputList = this.form.querySelectorAll('.modal__input');
    const formValues = {};
    inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  open() {
    super.open();
    this.formValidator.resetValidation(); //metodo que faz com que toda vez que abrir o modal eu resetar a validação
  }

  setEventListeners() {
    super.setEventListeners();
    this.closeButton.addEventListener('click', () => {
      this.close();
    });
  }

  close() {
    super.close();
    this.form.reset();
  }
}
