import Card from "./Card.js";

//Profile-popup

const editButton = document.querySelectorAll(".profile__edit-button");
const profileCloseButton = document.querySelectorAll(
  ".profile-popup__close-button"
);
const nameInput = document.querySelector("#name");
const aboutInput = document.querySelector("#about");

const profilePopup = document.querySelector(".profile-popup");

function openProfilePopup() {
  const currentName = document.querySelector(".profile__name").textContent;
  const currentAbout = document.querySelector(
    ".profile__description"
  ).textContent;

  nameInput.value = currentName;
  aboutInput.value = currentAbout;

  profilePopup.classList.add("profile-popup__opened");
}

function closeProfilePopup() {
  profilePopup.classList.remove("profile-popup__opened");
}

editButton.forEach((button) => {
  button.addEventListener("click", openProfilePopup);
});

profileCloseButton.forEach((button) => {
  button.addEventListener("click", closeProfilePopup);
});

// Submit

const formElement = document.querySelector(".profile-popup__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const valueName = nameInput.value;
  const valueAbout = aboutInput.value;

  const profileName = document.querySelector(".profile__name");
  const profileAbout = document.querySelector(".profile__description");

  profileName.textContent = valueName;
  profileAbout.textContent = valueAbout;

  closeProfilePopup();
}

formElement.addEventListener("submit", handleProfileFormSubmit);

//Cards-popup

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
  addCard(cardData.name, cardData.link);
});

const addButtons = document.querySelectorAll(".profile__add-button");
const cardsPopup = document.querySelector(".cards-popup");
const cardsCloseButtons = document.querySelectorAll(
  ".cards-popup__close-button"
);

function openCardsPopup() {
  cardsPopup.classList.add("cards-popup__opened");
}

function closeCardsPopup() {
  cardsPopup.classList.remove("cards-popup__opened");
}

addButtons.forEach((button) => {
  button.addEventListener("click", openCardsPopup);
});

cardsCloseButtons.forEach((button) => {
  button.addEventListener("click", closeCardsPopup);
});

//Create-Card

const popupImage = document.querySelector(".photo-popup__image");
const popupName = document.querySelector(".photo-popup__name");
const photoPopup = document.querySelector(".photo-popup");
const photoCloseButton = document.querySelector(".photo-popup__close-button");

function openPhotoPopup(imageSrc, imageName) {
  popupImage.src = imageSrc;
  popupImage.alt = imageName;
  popupName.textContent = imageName;

  photoPopup.classList.add("photo-popup__opened");
}

function closePhotoPopup() {
  photoPopup.classList.remove("photo-popup__opened");
}

function addCard(name, link) {
  const card = new Card({ name, link }, ".elements__template", openPhotoPopup);
  const cardElement = card.generateCard();
  document.querySelector(".elements").prepend(cardElement);
}

photoCloseButton.addEventListener("click", closePhotoPopup);

// //Add-Card

const addCardForm = document.querySelector(".cards-popup__form");

addCardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const cardnameInput = document.querySelector("#cards-title");
  const linkInput = document.querySelector("#cards-link");

  addCard(cardnameInput.value, linkInput.value);

  addCardForm.reset();

  closeCardsPopup();
});

//Photo-popup

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
