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

const addButton = document.querySelectorAll(".profile__add-button");
const cardsCloseButton = document.querySelectorAll(
  ".cards-popup__close-button"
);

const cardsPopup = document.querySelector(".cards-popup");

function openCardsPopup() {
  cardsPopup.classList.add("cards-popup__opened");
}

function closeCardsPopup() {
  cardsPopup.classList.remove("cards-popup__opened");
}

addButton.forEach((button) => {
  button.addEventListener("click", openCardsPopup);
});

cardsCloseButton.forEach((button) => {
  button.addEventListener("click", closeCardsPopup);
});

//Create-Card

function createCard(name, link) {
  const cardTemplate = document.querySelector(".card__template").content;

  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;
  cardElement.querySelector(".card__name").textContent = name;

  return cardElement;
}

//Add-Card

function addCard(name, link) {
  const newCard = createCard(name, link);

  const cardsContainer = document.querySelector(".elements");
  cardsContainer.prepend(newCard);
}

const addCardForm = document.querySelector(".cards-popup__form");

addCardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const cardnameInput = document.querySelector("#title");
  const linkInput = document.querySelector("#link");

  addCard(cardnameInput.value, linkInput.value);

  addCardForm.reset();

  closeCardsPopup();
});

// // Submit

// const formElement = document.querySelector(".profile-popup__form");

// function handleProfileFormSubmit(evt) {
//   evt.preventDefault();

//   const valueName = nameInput.value;
//   const valueAbout = aboutInput.value;

//   const profileName = document.querySelector(".profile__name");
//   const profileAbout = document.querySelector(".profile__description");

//   profileName.textContent = valueName;
//   profileAbout.textContent = valueAbout;

//   closePopup();
// }

// formElement.addEventListener("submit", handleProfileFormSubmit);

//Cards

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
