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

  // Função que mostra elemento de erro
  _showInputError(inputElement, errorMessage) {
    const errorElement = this.form.querySelector(`.${inputElement.id}-error`); 

    inputElement.classList.add('modal__input_type_error'); 

    errorElement.textContent = errorMessage; 
    errorElement.classList.add('modal__input-error_active'); 
  }

  // Função que oculda elemento de erro
  _hideInputError(inputElement) {
    const errorElement = this.form.querySelector(`.${inputElement.id}-error`); 

    inputElement.classList.remove('modal__input_type_error'); 

    errorElement.classList.remove('modal__input-error_active'); 
    errorElement.textContent = ''; 
  }

  // Função verifica se o campo é valido
  _isValid(inputElement) {
    if (!inputElement.validity.valid) { 
      const errorMessage = Object.keys(this.errorMessages).find(errorKey => inputElement.validity[errorKey]);
      this._showInputError(inputElement, errorMessage ? this.errorMessages[errorMessage] : 'Erro desconhecido.');
    } else { 
      this._hideInputError(inputElement); 
    }
  }

  // Função para ativar o desativar meu botao dependendo da valdiacao do formulario
  _toggleButtonState() {
    if(this._hasInvalidInput()) {
      this.buttonElement.classList.add('button__inactive');
    } else {
      this.buttonElement.classList.remove('button__inactive');
    }
  }

  // Função verifica se todos os inputs estão validos. retorna true se um campo for invalido
  // me sinalizara se for true pra botao ficar invalido
  _hasInvalidInput() {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // Método para adiconar escutados de eventos a todos os campos de input
  _setEventListeners() {
    this._toggleButtonState();

    // Itera sobre array
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // Método para habilitar validação do formulário
  enableValidation() {
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault()
    });

    this._setEventListeners();
  }

  //método que faz o formulario resetar sua validação
  resetValidation() {
    this.inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }
}


