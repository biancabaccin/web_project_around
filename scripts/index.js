const editButton = document.querySelectorAll(".profile__edit-button");
const closeButton = document.querySelectorAll(".popup__close-button");
const nameInput = document.querySelector("#name");
const aboutInput = document.querySelector("#about");

const popup = document.querySelector(".popup");

function openPopup() {
  const currentName = document.querySelector(".profile__name").textContent;
  const currentAbout = document.querySelector(
    ".profile__description"
  ).textContent;

  nameInput.value = currentName;
  aboutInput.value = currentAbout;

  popup.classList.add("popup__opened");
}

function closePopup() {
  popup.classList.remove("popup__opened");
}

editButton.forEach((button) => {
  button.addEventListener("click", openPopup);
});

closeButton.forEach((button) => {
  button.addEventListener("click", closePopup);
});

// Submit

const formElement = document.querySelector(".popup__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = document.querySelector("#name");
  const aboutInput = document.querySelector("#about");

  const valueName = nameInput.value;
  const valueAbout = aboutInput.value;

  const profileName = document.querySelector(".profile__name");
  const profileAbout = document.querySelector(".profile__description");

  profileName.textContent = valueName;
  profileAbout.textContent = valueAbout;

  closePopup();
}

formElement.addEventListener("submit", handleProfileFormSubmit);
