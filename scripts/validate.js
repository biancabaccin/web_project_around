const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    const inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      config.submitButtonSelector
    );
    toggleButtonState(inputList, buttonElement, config);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement, config);
        toggleButtonState(inputList, buttonElement, config);
      });
    });
  });
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

//Profile Valitation - A função config chama essas classes.

enableValidation({
  formSelector: ".profile-popup__form",
  inputSelector: ".profile-popup__input",
  submitButtonSelector: ".profile-popup__submit-button",
  inactiveButtonClass: "profile-popup__submit-button_inactive",
  inputErrorClass: "profile-popup__input_type_error",
  errorClass: "profile-popup__input-error_active",
});

//Cards Validation - A função config chama essas classes.

enableValidation({
  formSelector: ".cards-popup__form",
  inputSelector: ".cards-popup__input",
  submitButtonSelector: ".cards-popup__add-button",
  inactiveButtonClass: "cards-popup__add-button_inactive",
  inputErrorClass: "cards-popup__input_type_error",
  errorClass: "cards-popup__input-error_active",
});

//Fecha Pop-up clicando na Sobreposição

const closePopupOnOverlayClick = (popupSelector, closePopupFunction) => {
  const popup = document.querySelector(popupSelector);
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closePopupFunction();
    }
  });

  //Fecha pop-up com Esc
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape" || evt.key === "Esc") {
      closePopupFunction();
    }
  });
};

//Pop-ups:

closePopupOnOverlayClick(".profile-popup", closeProfilePopup);
closePopupOnOverlayClick(".cards-popup", closeCardsPopup);
closePopupOnOverlayClick(".photo-popup", closePhotoPopup);
