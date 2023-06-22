export class Api {
  constructor() {
    this.authorization = "85c06b76-d1bb-40cc-b9fa-fda6b61002da";
    this.baseUrl = "https://around.nomoreparties.co/v1/web_ptbr_04";
  }

  fetchInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.authorization
      }
    })
      .then(res => res.json())
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.error("Erro ao buscar os cards iniciais:", error);
        return [];
      });
  }

  updateProfilePicture(imageUrl) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this.authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        avatar: imageUrl
      })
    })
      .then(res => res.json())
      .then((updatedResult) => {
        return updatedResult.avatar;
      })
      .catch((error) => {
        console.error("Erro ao atualizar o avatar:", error);
        throw error;
      });
  }

  updateProfile(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then((updatedResult) => {
        return updatedResult;
      })
      .catch((error) => {
        console.error("Erro ao atualizar o perfil:", error);
        throw error;
      });
  }

  getProfile() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.authorization
      }
    })
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error("Erro ao carregar as informações do perfil:", error);
        throw error;
      });
  }

  addCard(cardData) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this.authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cardData)
    })
      .then(res => res.json())
      .then((createdCard) => {
        return createdCard;
      })
      .catch((error) => {
        console.error("Erro ao adicionar o card:", error);
        throw error;
      });
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this.authorization
      }
    })
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error("Erro ao excluir o card:", error);
        throw error;
      });
  }

  
}
