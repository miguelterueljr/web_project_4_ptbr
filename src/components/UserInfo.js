import { Api } from "./Api.js"; 
import { nameInput, jobInput, nameField, jobField, profilePhotoField, profilePhotoInput } from "../utils/utils.js"; 
import { updateProfile } from "../pages/index.js";
export class UserInfo { 
  constructor() { 
    this.api = new Api(); 
  } 

  getUserInfo() { 
    return { 
      name: nameInput.value, 
      job: jobInput.value, 
      
    }; 
  } 

  setUserInfo(name, job, photo) { 
    nameField.textContent = name; 
    jobField.textContent = job; 
    profilePhotoField.src = photo; 
  } 
} 

export function handleProfileFormSubmit(evt) { 
  evt.preventDefault(); 

  const userInfo = new UserInfo(); 
  const userInfoData = userInfo.getUserInfo(); 

  userInfo.setUserInfo(userInfoData.name, userInfoData.job, userInfoData.photo); 
  updateProfile({ 
    name: userInfoData.name, 
    about: userInfoData.job 
  }); 
}

export function initializePage() { 
  const userInfo = new UserInfo(); 
  userInfo.initializePage(); 
} 