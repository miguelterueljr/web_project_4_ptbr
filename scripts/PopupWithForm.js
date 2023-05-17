//Levar um retorno de chamada do envio do formulário para dentro do construtor e do seletor pop-up.

import { Popup } from "./Popup";

//Armazenar um método privado chamado _getInputValues() que coleta dados de todos os campos de entrada.

//Modificar o método pai setEventListeners(). O método setEventListeners() da classe PopupWithForm precisa adicionar o manipulador de eventos Enviar ao formulário e ao ouvinte de evento click para o ícone de fechamento.

//Modificar o método pai close() para redefinir o formulário assim que o pop-up for fechado.

export class PopupWithForm extends Popup {
  constructor() {
    super();
  }

  _getInputValues() {

  }
}

//aqui ainda nao sei aonde esta