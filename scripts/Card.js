class Card {
  constructor(data, templateSelector, imagePopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._imagePopupExternal = imagePopup;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__element")
      .cloneNode(true);

    return cardTemplate;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._imagePopup());
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteCard()
    );
    this._imageButton.addEventListener("click", () =>
      this._imagePopupExternal(this._link, this._name)
    );
  }

  _imagePopup() {
    this._likeButton.classList.toggle("elements__like-button_active");
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  generateCard() {
    this._element = this._getTemplate();

    this._imageElement = this._element.querySelector(".elements__image");
    this._titleElement = this._element.querySelector(".elements__name");
    this._deleteButton = this._element.querySelector(
      ".elements__delete-button"
    );
    this._likeButton = this._element.querySelector(".elements__like-button");
    this._imageButton = this._element.querySelector(".elements__image-box");

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
