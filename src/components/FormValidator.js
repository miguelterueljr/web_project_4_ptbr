export class FormValidator {
  constructor(form) {
    this.form = form;
    this.inputList = Array.from(form.querySelectorAll('.modal__input'));
    this.buttonElement = form.querySelector('.modal__button');
    this.errorMessages = {
      valueMissing: 'Campo é obrigatório.',
      typeMismatch: 'Por favor, insira um endereço web',
      tooShort: 'Aumente esse texto para 2 caracteres ou mais.',
    };
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = inputElement.nextElementSibling; // Encontra o elemento de erro próximo ao input

    inputElement.classList.add('modal__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('modal__input-error_active');
  }

  _hideInputError(inputElement) {
    const errorElement = inputElement.nextElementSibling;

    inputElement.classList.remove('modal__input_type_error');
    errorElement.classList.remove('modal__input-error_active');
    errorElement.textContent = '';
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      const errorMessage = Object.keys(this.errorMessages).find(
        (errorKey) => inputElement.validity[errorKey]
      );
      this._showInputError(
        inputElement,
        errorMessage ? this.errorMessages[errorMessage] : 'Verifique os campos digitados.'
      );
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.buttonElement.classList.add('button__inactive');
      this.buttonElement.disabled = true; // Desabilita o botão quando há campos inválidos
    } else {
      this.buttonElement.classList.remove('button__inactive');
      this.buttonElement.disabled = false; // Habilita o botão quando todos os campos são válidos
    }
  }

  _hasInvalidInput() {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _setEventListeners() {
    this._toggleButtonState();

    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }

  resetValidation() {
    this.inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }
}
