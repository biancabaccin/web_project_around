const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");
const nameInput = document.querySelector("#name");
const aboutInput = document.querySelector("#about");

const popup = document.querySelector(".popup");

function openPopup() {
  let currentName = document.querySelector(".profile__name").textContent;
  let currentAbout = document.querySelector(
    ".profile__description"
  ).textContent;

  nameInput.value = currentName;
  aboutInput.value = currentAbout;

  popup.classList.add("popup__opened");
}

function closePopup() {
  popup.classList.remove("popup__opened");
}

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);

// Submit

let formElement = document.querySelector(".popup__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = document.querySelector("#name");
  let aboutInput = document.querySelector("#about");

  let valueName = nameInput.value;
  let valueAbout = aboutInput.value;

  let profileName = document.querySelector(".profile__name");
  let profileAbout = document.querySelector(".profile__description");

  profileName.textContent = valueName;
  profileAbout.textContent = valueAbout;

  closePopup();
}

formElement.addEventListener("submit", handleProfileFormSubmit);
