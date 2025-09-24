import {
  enableValidation,
  settings,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
import "./index.css";
import Api from "../utils/Api.js";
import { setButtonText } from "../utils/helpers.js";

//profile pics
import logoSrc from "../images/Logo.svg";
import avatarSrc from "../images/avatar.jpg";
import editIconSrc from "../images/Edit-Icon.svg";
import plusIconSrc from "../images/Plus-icon.svg";
import avatarEditIconSrc from "../images/white-edit-avatar.svg";

//avatar modal
const avatarModal = document.querySelector("#avatar-modal");
const avatarBtn = document.querySelector(".profile__avatar-btn");
const avatarCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarForm = avatarModal.querySelector("#edit-avatar-form");

const avatarUrlInput = avatarForm.querySelector("#profile-avatar-input");
const profileAvatarImg = document.getElementById("profile-avatar");

document.getElementById("header-logo").src = logoSrc;
document.getElementById("profile-avatar").src = avatarSrc;
document.getElementById("edit-icon").src = editIconSrc;
document.getElementById("avatar-edit-icon").src = avatarEditIconSrc;
document.getElementById("plus-icon").src = plusIconSrc;

//Edit Modal Variables
const editButton = document.querySelector(".profile__edit-btn");
const editModal = document.querySelector("#edit-modal");
const editCloseButton = editModal.querySelector(".modal__close-btn");
const editProfileNameInput = editModal.querySelector("#profile-name-input");
const editProfileDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);
const editProfileForm = editModal.querySelector(".modal__form");

//Elements displaying profile info
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

//new post Modal Variables
const addButton = document.querySelector(".profile__new-post-btn");
const addModal = document.querySelector("#add-modal");
const cardSubmitBtn = addModal.querySelector(".modal__save-btn");
const addCloseButton = addModal.querySelector(".modal__close-btn");
const addPostForm = addModal.querySelector(".modal__form");
const postImageInput = addModal.querySelector("#profile-new-img-link");
const postCaptionInput = addModal.querySelector("#profile-img-caption");

//Avatar form element

//delete form elements
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");
const deleteCloseBtn = deleteModal.querySelector(".modal__close-btn");
const deleteCancelBtn = deleteModal.querySelector(".modal__cancel-btn");
let selectedCard, selectedCardId;

//preview modal
const modalPreview = document.querySelector("#preview-modal");

const modalPreviewClose = modalPreview.querySelector(
  ".modal__close-btn_type_preview"
);
const previewImage = modalPreview.querySelector(".modal__image");
const previewCaption = modalPreview.querySelector(".modal__caption");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const cardsList = document.querySelector(".cards__list");

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "23596b19-8bd4-432c-a85a-1ef9554d7605",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([user, cards]) => {
    profileNameEl.textContent = user.name;
    profileDescriptionEl.textContent = user.about;
    profileAvatarImg.src = user.avatar;
    cards.forEach((item) => cardsList.append(getCardElement(item)));
  })
  .catch(console.error);

//get card function
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-btn");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  if (data.isLiked) {
    cardLikeBtnEl.classList.add("card__like-btn_active");
  }

  //like toggle
  cardLikeBtnEl.addEventListener("click", () => {
    const wasLiked = cardLikeBtnEl.classList.contains("card__like-btn_active");
    api
      .changeLikeStatus(data._id, wasLiked)
      .then((updatedCard) => {
        cardLikeBtnEl.classList.toggle(
          "card__like-btn_active",
          updatedCard.isLiked
        );
      })
      .catch(console.error);
  });

  //delete open
  cardDeleteBtnEl.addEventListener("click", (evt) => {
    handleDeleteCard(cardElement, data._id);
  });

  //preview
  cardImageEl.addEventListener("click", () => {
    handleImageClick(data);
  });

  return cardElement;
}

//delete card modal
function handleDeleteSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;

  submitBtn.textContent = "Deleting...";
  submitBtn.disabled = true;

  api
    .removeCard(selectedCardId)
    .then(() => {
      selectedCard?.remove();
      closeModal(deleteModal);
      selectedCard = null;
      selectedCardId = null;
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false); //check
      submitBtn.disabled = false;
    });
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

deleteForm.addEventListener("submit", handleDeleteSubmit);
deleteCloseBtn.addEventListener("click", () => closeModal(deleteModal));
deleteCancelBtn.addEventListener("click", () => closeModal(deleteModal));

function handleImageClick(data) {
  previewImage.src = data.link;
  previewImage.alt = data.name;
  previewCaption.textContent = data.name;
  openModal(modalPreview);
}

//open modals
function openModal(modal) {
  modal.classList.add("modal_is-opened");

  // Esc key evt
  function handleEscClose(evt) {
    if (evt.key === "Escape") {
      closeModal(modal);
    }
  }

  // Click evt
  function handleOutsideClick(evt) {
    if (evt.target === modal) {
      closeModal(modal);
    }
  }

  modal._handleEscClose = handleEscClose;
  modal._handleOutsideClick = handleOutsideClick;

  document.addEventListener("keydown", handleEscClose);
  document.addEventListener("mousedown", handleOutsideClick);
}

//close modal with esc and keydown
function closeModal(modal) {
  modal.classList.remove("modal_is-opened");

  // removes listeners
  document.removeEventListener("keydown", modal._handleEscClose);
  document.removeEventListener("mousedown", modal._handleOutsideClick);
}

//opens edit profile modal
editButton.addEventListener("click", () => {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  resetValidation(editProfileForm, settings);
  openModal(editModal);
});

//closes edit profile modal
editCloseButton.addEventListener("click", () => closeModal(editModal));

//opens new post modal
addButton.addEventListener("click", () => openModal(addModal));

//closes new post modal

addCloseButton.addEventListener("click", () => closeModal(addModal));

//handles edit profile submit    ---- FIX RELOAD NAME
function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true, "Saving...");

  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((user) => {
      profileNameEl.textContent = user.name;
      profileDescriptionEl.textContent = user.about;
      closeModal(editModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

addPostForm.addEventListener("submit", handleAddCardSubmit);

//handleAddPostsubmit
function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true, "Saving...");

  const inputValues = {
    name: postCaptionInput.value,
    link: postImageInput.value,
  };

  api
    .addCard(inputValues)
    .then((newCard) => {
      cardsList.prepend(getCardElement(newCard));
      addPostForm.reset();
      resetValidation(addPostForm, settings);
      disableButton(cardSubmitBtn, settings);
      closeModal(addModal);
    })
    .catch(console.error)
    .finally(() => setButtonText(submitBtn, false));
}

// const cardElement = getCardElement(inputValues);
// cardsList.prepend(cardElement);

// addPostForm.reset();
// resetValidation(addPostForm, settings);
// disableButton(cardSubmitBtn); //added*****************
// closeModal(addModal);

//looping through cards
// initialCards.forEach(function (item) {
//   const cardElement = getCardElement(item);
//   cardsList.append(cardElement);
// });

modalPreviewClose.addEventListener("click", () => {
  closeModal(modalPreview);
});

avatarBtn.addEventListener("click", () => {
  resetValidation(avatarForm, settings);
  openModal(avatarModal);
});

avatarCloseBtn.addEventListener("click", () => closeModal(avatarModal));

avatarForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const submitBtn = e.submitter;
  const url = avatarForm.querySelector("#profile-avatar-input").value.trim();

  setButtonText(submitBtn, true, "Saving...");
  api
    .updateAvatar(url)
    .then((user) => {
      profileAvatarImg.src = user.avatar;
      avatarForm.reset();
      disableButton(submitBtn, settings); //check
      closeModal(avatarModal);
    })
    .catch(console.error)
    .finally(() => setButtonText(submitBtn, false, "Save"));
});

enableValidation(settings);
