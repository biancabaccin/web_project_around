// // import {
// //   // openProfilePopup,
// //   // closeProfilePopup,
// //   // openCardsPopup,
// //   // closeCardsPopup,
// //   // openPhotoPopup,
// //   // closePhotoPopup,
// //   // closePopupOnOverlayClick,
// //   // addCard,
// //   initialCards,
// // } from "./utils.js";
// import { initialCards } from "./utils.js";
// import Card from "../components/Card.js";
// import FormValidator from "../components/FormValidator.js";
// // import Popup from "../components/Popup.js";
// import PopupWithForm from "../components/PopupWithForm.js";
// import PopupWithImage from "../components/PopupWithImage.js";
// import Section from "../components/Section.js";
// import UserInfo from "../components/UserInfo.js";

// // const initialCards = [
// //   initialCards.reverse().forEach((cardData) => {
// //   addCard(cardData.name, cardData.link, Card, ".elements", openPhotoPopup);
// // });
// // ];

// // Instâncias das classes

// const cardSection = new Section(
//   {
//     items: initialCards,
//     renderer: (cardData) => {
//       const card = new Card(cardData, "#card-template", (name, link) => {
//         imagePopup.open(name, link);
//       });
//       const cardElement = card.generateCard();
//       cardSection.addItem(cardElement);
//     },
//   },
//   ".elements"
// );

// const addCardPopup = new PopupWithForm(".cards-popup", (inputData) => {
//   const card = new Card(inputData, "#card-template", (name, link) => {
//     imagePopup.open(name, link);
//   });
//   cardSection.addItem(card.generateCard()); // ← Agora funciona!
// });

// const userInfo = new UserInfo({
//   userName: ".profile__name",
//   userJob: ".profile__description",
// });

// const imagePopup = new PopupWithImage(".photo-popup");

// const editProfilePopup = new PopupWithForm(".profile-popup", (inputData) => {
//   userInfo.setUserInfo(inputData);
// });

// // Event listeners
// document
//   .querySelector(".profile__edit-button")
//   .addEventListener("click", () => {
//     const userData = userInfo.getUserInfo();
//     editProfilePopup.open();
//     editProfilePopup.setInputValues(userData);
//   });

// document.querySelector(".profile__add-button").addEventListener("click", () => {
//   addCardPopup.open();
// });

// // Renderizar cards iniciais
// cardSection.renderItems();

// // Profile-popup

// // const editButton = document.querySelectorAll(".profile__edit-button");
// // const profileCloseButton = document.querySelectorAll(
// //   ".profile-popup__close-button"
// // );
// // const nameInput = document.querySelector("#name");
// // const aboutInput = document.querySelector("#about");

// // const profilePopup = document.querySelector(".profile-popup");

// // editButton.forEach((button) => {
// //   button.addEventListener("click", () =>
// //     openProfilePopup(nameInput, aboutInput, profilePopup)
// //   );
// // });

// // profileCloseButton.forEach((button) => {
// //   button.addEventListener("click", () => closeProfilePopup(profilePopup));
// // });

// // // Submit Profile Form

// // const formElement = document.querySelector(".profile-popup__form");

// // function handleProfileFormSubmit(evt) {
// //   evt.preventDefault();

// //   const valueName = nameInput.value;
// //   const valueAbout = aboutInput.value;

// //   const profileName = document.querySelector(".profile__name");
// //   const profileAbout = document.querySelector(".profile__description");

// //   profileName.textContent = valueName;
// //   profileAbout.textContent = valueAbout;

// //   closeProfilePopup(profilePopup);
// // }

// // formElement.addEventListener("submit", handleProfileFormSubmit);

// // // Cards-popup

// // initialCards.reverse().forEach((cardData) => {
// //   addCard(cardData.name, cardData.link, Card, ".elements", openPhotoPopup);
// // });

// // const addButtons = document.querySelectorAll(".profile__add-button");
// // const cardsPopup = document.querySelector(".cards-popup");
// // const cardsCloseButtons = document.querySelectorAll(
// //   ".cards-popup__close-button"
// // );

// // addButtons.forEach((button) => {
// //   button.addEventListener("click", () => openCardsPopup(cardsPopup));
// // });

// // cardsCloseButtons.forEach((button) => {
// //   button.addEventListener("click", () => closeCardsPopup(cardsPopup));
// // });

// // // Create-Card

// // const photoPopup = document.querySelector(".photo-popup");
// // const photoCloseButton = document.querySelector(".photo-popup__close-button");

// // photoCloseButton.addEventListener("click", () => closePhotoPopup(photoPopup));

// // // Add-Card

// // const addCardForm = document.querySelector(".cards-popup__form");

// // addCardForm.addEventListener("submit", function (evt) {
// //   evt.preventDefault();

// //   const cardnameInput = document.querySelector("#cards-title");
// //   const linkInput = document.querySelector("#cards-link");

// //   addCard(
// //     cardnameInput.value,
// //     linkInput.value,
// //     Card,
// //     ".elements",
// //     openPhotoPopup
// //   );

// //   addCardForm.reset();

// //   closeCardsPopup(cardsPopup);
// // });

// // // Fecha Photo-popup clicando fora da imagem
// // closePopupOnOverlayClick(".profile-popup", () =>
// //   closeProfilePopup(profilePopup)
// // );
// // closePopupOnOverlayClick(".cards-popup", () => closeCardsPopup(cardsPopup));
// // closePopupOnOverlayClick(".photo-popup", () => closePhotoPopup(photoPopup));

// // Validator

// const profileFormValidator = new FormValidator(
//   {
//     formSelector: ".profile-popup__form",
//     inputSelector: ".profile-popup__input",
//     submitButtonSelector: ".profile-popup__submit-button",
//     inactiveButtonClass: "profile-popup__submit-button_inactive",
//     inputErrorClass: "profile-popup__input_type_error",
//     errorClass: "profile-popup__input-error_active",
//   },
//   document.querySelector(".profile-popup__form")
// );

// profileFormValidator.enableValidation();

// const cardsFormValidator = new FormValidator(
//   {
//     formSelector: ".cards-popup__form",
//     inputSelector: ".cards-popup__input",
//     submitButtonSelector: ".cards-popup__add-button",
//     inactiveButtonClass: "cards-popup__add-button_inactive",
//     inputErrorClass: "cards-popup__input_type_error",
//     errorClass: "cards-popup__input-error_active",
//   },
//   document.querySelector(".cards-popup__form")
// );

// cardsFormValidator.enableValidation();

import { initialCards } from "./utils.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";

const userInfo = new UserInfo({
  userName: ".profile__name",
  userJob: ".profile__description",
});

const imagePopup = new PopupWithImage(".photo-popup");

// Create-Card

function createCard(cardData) {
  console.log("Dados do card:", cardData);
  const card = new Card(cardData, ".elements__template", (link, name) => {
    imagePopup.open(link, name);
  });
  return card.generateCard();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      return createCard(cardData);
    },
  },
  ".elements"
);

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

cardSection.renderItems();

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
