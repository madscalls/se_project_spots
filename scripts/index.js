//photo array
const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest in dubai, very scary view",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];
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
//get card function
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");
  cardLikeBtnEl.addEventListener("click", () => {
    cardLikeBtnEl.classList.toggle("card__like-btn_active");
  });

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtnEl.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    handleImageClick(data);
  });

  return cardElement;
}

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

//handles edit profile submit
function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  closeModal(editModal);
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

//handleAddPostsubmit
function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const inputValues = {
    name: postCaptionInput.value,
    link: postImageInput.value,
  };

  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);

  addPostForm.reset();
  //disableButton(cardSubmitBtn); //added*****************
  closeModal(addModal);
}

addPostForm.addEventListener("submit", handleAddCardSubmit);

//looping through cards
initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});

modalPreviewClose.addEventListener("click", () => {
  closeModal(modalPreview);
});
