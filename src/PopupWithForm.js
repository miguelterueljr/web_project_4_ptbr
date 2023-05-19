import { page } from "./index.js";
import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, submitCallback) {
    super(selector);
    this.submitCallback = submitCallback;
    this.form = this.selector.querySelector('.modal__form');
    this.closeButton = this.selector.querySelector('.modal__button-close');
  }

  _getInputValues() {
    const inputList = this.form.querySelectorAll('.modal__input');
    const formValues = {};
    inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.submitCallback(this._getInputValues());
      this.close();
    });
    this.closeButton.addEventListener('click', () => {
      this.close();
    });
  }

  close() {
    super.close();
    this.form.reset();
  }
}
