export class Api {
  constructor(options) {
    // corpo do construtor
  }

  getInitialCards() {
    fetch("https://around.nomoreparties.co/v1/web_ptbr_04/users/me", {
      headers: {
      authorization: "85c06b76-d1bb-40cc-b9fa-fda6b61002da"
      }
    })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
    }); 
  }

  // outros métodos para trabalhar com a API
}


