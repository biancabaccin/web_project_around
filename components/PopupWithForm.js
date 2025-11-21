import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector("form");
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

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();

      const formData = this._getInputValues();
      this._handleFormSubmit(formData);

      this.close();
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
