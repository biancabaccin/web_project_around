import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector("form");
  }

  _getInputValues() {
    const inputValues = this._popup.querySelectorAll("input");
    const formValues = {};

    inputValues.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
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
