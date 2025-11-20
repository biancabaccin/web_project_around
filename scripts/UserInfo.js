class UserInfo {
  constructor({ userName, userJob }) {
    this._userNameElement = document.querySelector(userName);
    this._userJobElement = document.querySelector(userJob);
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userJob: this._userJobElement.textContent,
    };
  }

  setUserInfo(userData) {
    this._userNameElement.textContent = userData.userName;
    this._userJobElement.textContent = userData.userJob;
  }
}
