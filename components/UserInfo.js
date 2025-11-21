export default class UserInfo {
  constructor({ userName, userJob }) {
    this._userNameElement = document.querySelector(userName);
    this._userJobElement = document.querySelector(userJob);
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
}
