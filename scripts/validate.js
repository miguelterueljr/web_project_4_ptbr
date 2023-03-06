const form = document.querySelector('.modal__form');
const formInput = form.querySelector('.modal__input');

const formError = form.querySelector(`.${formInput.id}-error`)

//Função que mostra elemento de erro
const showInputError = (form, inputElement, errorMessage) => {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add('modal__input_type_error');

  errorElement.textContent = errorMessage;
  errorElement.classList.add('modal__input-error_active');
};

//Função que oculda elemento de erro
const hideInputError = (form, inputElement) => {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove('modal__input_type_error');

  errorElement.classList.remove('modal__input-error_active');
  errorElement.textContent = '';
};

//Função verifica se o campo é valido
const isValid = (form, inputElement) => {
  if(!inputElement.validity.valid) {
    showInputError(form, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(form, inputElement);
  };
};

//adiconar escutados de eventos a todos os campos de input
const setEventListeners = (form) => {
  //encontro todo campos do formulario e crio um array deles
  const inputList = Array.from(form.querySelectorAll('.modal__input'));

  const buttonElement = form.querySelector('.modal__button');
  
  //to chamando essa funcao aqui pra botao ficar inativo antes de ouvir os eventos
  toggleButtonState(inputList, buttonElement);
  //itero sobre array
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(form, inputElement);
      //chamo funcao do botao e passo pra ele um vetor de campos e o botao
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//faz a validacao em todos meus formulario
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.modal__form'));

  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault()
    });

    setEventListeners(form);
  })
}

//funcao verifica se todos os inputs estao validos. retorna true se um campo for invalido
//me sinalizara se for true pra botao ficar invalido
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//funcao para ativar o desativar meu botao dependendo da valdiacao do formulario
const toggleButtonState = (inputList, buttonElement) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add('button__inactive');
  } else {
    buttonElement.classList.remove('button__inactive');
  }
};

enableValidation();

