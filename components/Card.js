export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick,
    currentUserId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._isLiked = data.isLiked;
    this._ownerId = data.owner;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._currentUserId = currentUserId;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__element")
      .cloneNode(true);

    return cardTemplate;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });

    this._imageButton.addEventListener("click", () => {
      this._handleImageClick(this._link, this._name);
    });
  }

  _updateLikeButton() {
    if (this._isLiked) {
      this._likeButton.classList.add("elements__like-button_active");
    } else {
      this._likeButton.classList.remove("elements__like-button_active");
    }
  }

  updateLikeStatus(isLiked) {
    this._isLiked = isLiked;
    this._updateLikeButton();
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

    this._updateLikeButton();

    if (this._ownerId !== this._currentUserId) {
      this._deleteButton.style.display = "none";
    }

    return this._element;
  }
}
