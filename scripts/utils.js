// Profile-popup

export function openProfilePopup(nameInput, aboutInput, profilePopup) {
  const currentName = document.querySelector(".profile__name").textContent;
  const currentAbout = document.querySelector(
    ".profile__description"
  ).textContent;

  nameInput.value = currentName;
  aboutInput.value = currentAbout;

  profilePopup.classList.add("profile-popup__opened");
}

export function closeProfilePopup(profilePopup) {
  profilePopup.classList.remove("profile-popup__opened");
}

// Cards-popup

export function openCardsPopup(cardsPopup) {
  cardsPopup.classList.add("cards-popup__opened");
}

export function closeCardsPopup(cardsPopup) {
  cardsPopup.classList.remove("cards-popup__opened");
}

// Função para adicionar um card
export function addCard(name, link, Card, containerSelector, openPhotoPopup) {
  const card = new Card({ name, link }, ".elements__template", openPhotoPopup);
  const cardElement = card.generateCard();
  document.querySelector(containerSelector).prepend(cardElement);
}

// Photo-popup

export function openPhotoPopup(imageSrc, imageName) {
  const popupImage = document.querySelector(".photo-popup__image");
  const popupName = document.querySelector(".photo-popup__name");
  const photoPopup = document.querySelector(".photo-popup");

  popupImage.src = imageSrc;
  popupImage.alt = imageName;
  popupName.textContent = imageName;

  photoPopup.classList.add("photo-popup__opened");
}

export function closePhotoPopup(photoPopup) {
  photoPopup.classList.remove("photo-popup__opened");
}

// Fecha Photo-popup clicando fora da imagem
export function closePopupOnOverlayClick(popupSelector, closePopupFunction) {
  const popup = document.querySelector(popupSelector);
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closePopupFunction();
    }
  });

  // Fecha pop-up com a tecla Esc
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape" || evt.key === "Esc") {
      closePopupFunction();
    }
  });
}
