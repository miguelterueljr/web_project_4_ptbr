import { Api } from "./Api.js";
import { nameInput, jobInput, nameField, jobField, profilePhotoField, profilePhotoInput } from "../utils/utils.js";

export class UserInfo {
  constructor() {
    this.api = new Api();
  }

  getUserInfo() {
    return {
      name: nameInput.value,
      job: jobInput.value,
      photo: profilePhotoInput.value
      
    };
  }

  setUserInfo(name, job, photo) {
    nameField.textContent = name;
    jobField.textContent = job;
    profilePhotoField.src = photo;
  }

  updateProfile(data) {
    this.api.updateProfile(data)
      .then(updatedResult => {
        console.log("Dados de perfil atualizados:", updatedResult);
      })
      .catch(error => {
        console.error("Erro ao atualizar o perfil:", error);
      });
  }

  initializePage() {
    this.api.getProfile()
      .then(data => {
        const { name, about, avatar } = data;
        this.setUserInfo(name, about, avatar);
      })
      .catch(error => {
        console.error("Erro ao carregar as informações do perfil:", error);
      });
  }
}

export function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const userInfo = new UserInfo();
  const userInfoData = userInfo.getUserInfo();
  userInfo.setUserInfo(userInfoData.name, userInfoData.job, userInfoData.photo);
  userInfo.updateProfile({
    name: userInfoData.name,
    about: userInfoData.job
  });
}

export function initializePage() {
  const userInfo = new UserInfo();
  userInfo.initializePage();
}
