// import { initialCards } from "./utils.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/Api.js";

// Form Popups

const editProfilePopup = new PopupWithForm(".profile-popup");

const addCardPopup = new PopupWithForm(".cards-popup", (inputData) => {
  handleCardSubmit(inputData);
});

const avatarPopup = new PopupWithForm(".photo-profile-popup");

//API

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "5539db1e-c173-456f-82b8-5cc813b2c1c7",
    "Content-Type": "application/json",
  },
});

let cardSection;

let currentUserId = null;

api
  .getUserAndCards()
  .then(({ userData, cardsData }) => {
    userInfo.setUserInfo(userData);
    currentUserId = userData._id;

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
    console.log("Error:", err);
  });

const handleProfileFormSubmit = (formData) => {
  editProfilePopup.renderLoading(true, "Salvando...");

  api
    .updateUserInfo({
      name: formData.name,
      about: formData.about,
    })
    .then((updatedUser) => {
      userInfo.setUserInfo(updatedUser);
      editProfilePopup.close();
    })
    .catch((err) => {
      console.log("Error updating user info:", err);
    })
    .finally(() => {
      editProfilePopup.renderLoading(false);
    });
};

editProfilePopup.setSubmitHandler(handleProfileFormSubmit);

const handleCardSubmit = (cardData) => {
  addCardPopup.renderLoading(true, "Salvando...");

  api
    .addCard({
      name: cardData.name,
      link: cardData.link,
    })
    .then((newCard) => {
      const cardElement = createCard(newCard);
      cardSection.addItem(cardElement);
      addCardPopup.close();
    })
    .catch((err) => {
      console.log("Error adding a new card:", err);
    })
    .finally(() => {
      addCardPopup.renderLoading(false);
    });
};

//Like and unLike Cards

const handleLikeClick = (card) => {
  if (card._isLiked) {
    api
      .unlikeCard(card._cardId)
      .then((updatedCard) => {
        card.updateLikeStatus(updatedCard.isLiked);
      })
      .catch((error) => {
        console.error("Error unliking the card:", error);
      });
  } else {
    api
      .likeCard(card._cardId)
      .then((updatedCard) => {
        card.updateLikeStatus(updatedCard.isLiked);
      })
      .catch((error) => {
        console.error("Error liking the card:", error);
      });
  }
};

const handleAvatarSubmit = (formData) => {
  avatarPopup.renderLoading(true, "Salvando...");
  api
    .updateUserAvatar({
      avatar: formData.link,
    })
    .then((response) => response.json())
    .then((updatedUser) => {
      userInfo.setUserInfo(updatedUser);
      avatarPopup.close();
    })
    .catch((err) => {
      console.log("Error updating avatar:", err);
    })
    .finally(() => {
      avatarPopup.renderLoading(false);
    });
};

avatarPopup.setSubmitHandler(handleAvatarSubmit);

// Delete-Card

const deleteConfirmationPopup = new PopupWithConfirmation(".delete-popup");

deleteConfirmationPopup.setEventListeners();

const handleDeleteClick = (card) => {
  deleteConfirmationPopup.setAction(() => {
    deleteConfirmationPopup.renderLoading(true, "Salvando...");
    api
      .deleteCard(card._cardId)
      .then(() => {
        card._element.remove();
        deleteConfirmationPopup.close();
      })
      .catch((error) => {
        console.error("Error deleting the card:", error);
      })
      .finally(() => {
        deleteConfirmationPopup.renderLoading(false);
      });
  });

  deleteConfirmationPopup.open();
};

const handleImageClick = (link, name) => {
  imagePopup.open(link, name);
};

// UserInfo

const userInfo = new UserInfo({
  userName: ".profile__name",
  userJob: ".profile__description",
  userAvatar: ".profile__image",
});

const imagePopup = new PopupWithImage(".photo-popup");

// Create - Card

const createCard = (cardData) => {
  const card = new Card(
    cardData,
    ".elements__template",
    handleImageClick,
    handleDeleteClick,
    handleLikeClick,
    currentUserId
  );
  return card.generateCard();
};

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

document
  .querySelector(".profile__image-button")
  .addEventListener("click", () => {
    avatarPopup.open();
  });

// Popups event listeners

editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();
avatarPopup.setEventListeners();

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

const avatarFormValidator = new FormValidator(
  {
    formSelector: ".photo-profile-popup__form",
    inputSelector: ".photo-profile-popup__input",
    submitButtonSelector: ".photo-profile-popup__submit-button",
    inactiveButtonClass: "photo-profile-popup__submit-button_inactive",
    inputErrorClass: "photo-profile-popup__input_type_error",
    errorClass: "photo-profile-popup__input-error_active",
  },
  document.querySelector(".photo-profile-popup__form")
);

profileFormValidator.enableValidation();
cardsFormValidator.enableValidation();
avatarFormValidator.enableValidation();
