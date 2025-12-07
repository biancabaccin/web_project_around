import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector(
      ".delete-popup__submit-button"
    );
  }

  setAction(action) {
    this._handleConfirmClick = action;
  }

  renderLoading(isLoading, loadingText = "Deletando...") {
    const submitButton = this._confirmButton;

    if (isLoading) {
      if (!submitButton.getAttribute("data-original-text")) {
        submitButton.setAttribute(
          "data-original-text",
          submitButton.textContent
        );
      }
      submitButton.textContent = loadingText;
      submitButton.disabled = true;
    } else {
      submitButton.textContent =
        submitButton.getAttribute("data-original-text");
      submitButton.disabled = false;
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._confirmButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleConfirmClick();
    });
  }
}
