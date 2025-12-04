// import { initialCards } from "./utils.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";

//API

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "5539db1e-c173-456f-82b8-5cc813b2c1c7",
    "Content-Type": "application/json",
  },
});

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData);
  })
  .catch((err) => {
    console.log("Error", err);
  });

let cardSection;

api
  .getInitialCards()
  .then((cardsData) => {
    console.log(cardsData);

    cardSection = new Section(
      {
        items: cardsData,
        renderer: (cardData) => {
          return createCard(cardData);
        },
      },
      ".elements"
    );

    cardSection.renderItems();
  })
  .catch((err) => {
    console.log("Error, cards not found", err);
  });

// UserInfo

const userInfo = new UserInfo({
  userName: ".profile__name",
  userJob: ".profile__description",
});

const imagePopup = new PopupWithImage(".photo-popup");

// Create-Card

function createCard(cardData) {
  const card = new Card(cardData, ".elements__template", (link, name) => {
    imagePopup.open(link, name);
  });
  return card.generateCard();
}

// Form Popups

const editProfilePopup = new PopupWithForm(".profile-popup", (inputData) => {
  userInfo.setUserInfo(inputData);
});

const addCardPopup = new PopupWithForm(".cards-popup", (inputData) => {
  const cardElement = createCard(inputData);
  cardSection.addItem(cardElement);
});

// Profile Buttons

document.querySelectorAll(".profile__edit-button").forEach((btn) =>
  btn.addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    editProfilePopup.setInputValues(userData);
    editProfilePopup.open();
  })
);

document.querySelectorAll(".profile__add-button").forEach((btn) =>
  btn.addEventListener("click", () => {
    addCardPopup.open();
  })
);

// Popups event listeners

editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();

// Validator

const profileFormValidator = new FormValidator(
  {
    formSelector: ".profile-popup__form",
    inputSelector: ".profile-popup__input",
    submitButtonSelector: ".profile-popup__submit-button",
    inactiveButtonClass: "profile-popup__submit-button_inactive",
    inputErrorClass: "profile-popup__input_type_error",
    errorClass: "profile-popup__input-error_active",
  },
  document.querySelector(".profile-popup__form")
);

const cardsFormValidator = new FormValidator(
  {
    formSelector: ".cards-popup__form",
    inputSelector: ".cards-popup__input",
    submitButtonSelector: ".cards-popup__add-button",
    inactiveButtonClass: "cards-popup__add-button_inactive",
    inputErrorClass: "cards-popup__input_type_error",
    errorClass: "cards-popup__input-error_active",
  },
  document.querySelector(".cards-popup__form")
);

profileFormValidator.enableValidation();
cardsFormValidator.enableValidation();
