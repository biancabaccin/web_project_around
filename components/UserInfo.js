export default class UserInfo {
  constructor({ userName, userJob, userAvatar }) {
    this._userNameElement = document.querySelector(userName);
    this._userJobElement = document.querySelector(userJob);
    this._userAvatarElement = document.querySelector(userAvatar);
  }

  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      about: this._userJobElement.textContent,
    };
  }

  setUserInfo(userData) {
    this._userNameElement.textContent = userData.name;
    this._userJobElement.textContent = userData.about;
  }

  setUserAvatar(userData) {
    this._userAvatarElement.src = userData.avatar;
  }
}
