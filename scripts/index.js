import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  openProfilePopup,
  closeProfilePopup,
  openCardsPopup,
  closeCardsPopup,
  openPhotoPopup,
  closePhotoPopup,
  closePopupOnOverlayClick,
  addCard,
} from "./utils.js";

// Profile-popup

const editButton = document.querySelectorAll(".profile__edit-button");
const profileCloseButton = document.querySelectorAll(
  ".profile-popup__close-button"
);
const nameInput = document.querySelector("#name");
const aboutInput = document.querySelector("#about");

const profilePopup = document.querySelector(".profile-popup");

editButton.forEach((button) => {
  button.addEventListener("click", () =>
    openProfilePopup(nameInput, aboutInput, profilePopup)
  );
});

profileCloseButton.forEach((button) => {
  button.addEventListener("click", () => closeProfilePopup(profilePopup));
});

// Submit Profile Form

const formElement = document.querySelector(".profile-popup__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const valueName = nameInput.value;
  const valueAbout = aboutInput.value;

  const profileName = document.querySelector(".profile__name");
  const profileAbout = document.querySelector(".profile__description");

  profileName.textContent = valueName;
  profileAbout.textContent = valueAbout;

  closeProfilePopup(profilePopup);
}

formElement.addEventListener("submit", handleProfileFormSubmit);

// Cards-popup

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

initialCards.reverse().forEach((cardData) => {
  addCard(cardData.name, cardData.link, Card, ".elements", openPhotoPopup);
});

const addButtons = document.querySelectorAll(".profile__add-button");
const cardsPopup = document.querySelector(".cards-popup");
const cardsCloseButtons = document.querySelectorAll(
  ".cards-popup__close-button"
);

addButtons.forEach((button) => {
  button.addEventListener("click", () => openCardsPopup(cardsPopup));
});

cardsCloseButtons.forEach((button) => {
  button.addEventListener("click", () => closeCardsPopup(cardsPopup));
});

// Create-Card

const photoPopup = document.querySelector(".photo-popup");
const photoCloseButton = document.querySelector(".photo-popup__close-button");

photoCloseButton.addEventListener("click", () => closePhotoPopup(photoPopup));

// Add-Card

const addCardForm = document.querySelector(".cards-popup__form");

addCardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const cardnameInput = document.querySelector("#cards-title");
  const linkInput = document.querySelector("#cards-link");

  addCard(
    cardnameInput.value,
    linkInput.value,
    Card,
    ".elements",
    openPhotoPopup
  );

  addCardForm.reset();

  closeCardsPopup(cardsPopup);
});

// Fecha Photo-popup clicando fora da imagem
closePopupOnOverlayClick(".profile-popup", () =>
  closeProfilePopup(profilePopup)
);
closePopupOnOverlayClick(".cards-popup", () => closeCardsPopup(cardsPopup));
closePopupOnOverlayClick(".photo-popup", () => closePhotoPopup(photoPopup));

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

profileFormValidator.enableValidation();

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

cardsFormValidator.enableValidation();
