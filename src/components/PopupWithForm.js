import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit = null) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector("form");

    const submitButton = this._formElement.querySelector('[type="submit"]');
    if (submitButton && !submitButton.getAttribute("data-original-text")) {
      submitButton.setAttribute("data-original-text", submitButton.textContent);
    }
  }

  _getInputValues() {
    const inputList = Array.from(this._formElement.querySelectorAll("input"));
    const formValues = {};

    inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  setInputValues(data) {
    const inputs = this._formElement.querySelectorAll("input");
    inputs.forEach((input) => {
      if (data[input.name]) {
        input.value = data[input.name];
      }
    });
  }

  setSubmitHandler(handler) {
    this._handleFormSubmit = handler;
  }

  renderLoading(isLoading, loadingText = "Salvando...") {
    const submitButton = this._formElement.querySelector('[type="submit"]');

    if (isLoading) {
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

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();

      const formData = this._getInputValues();
      this._handleFormSubmit(formData);
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
