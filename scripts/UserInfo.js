// classe UserInfo, responsável por renderizar a informação sobre o usuário na página
export class UserInfo {
  constructor(nameInput, jobInput, nameField, jobField) {
    this.nameInput = nameInput;
    this.jobInput = jobInput;
    this.nameField = nameField;
    this.jobField = jobField;
  }

  // método público que retorna um objeto com informações sobre o usuário
  getUserInfo() {
    // atualiza os placeholders dos campos de entrada e retorna um objeto com o nome e a profissão do usuário
    this.nameInput.placeholder = this.nameInput.value;
    this.jobInput.placeholder = this.jobInput.value;
    return {
      name: this.nameInput.value,
      job: this.jobInput.value
    };
  }

  // método público que pega novos dados do usuário e adiciona na página
  setUserInfo(name, job) {
    this.nameField.textContent = name;
    this.jobField.textContent = job;
  }
}
 