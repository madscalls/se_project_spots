//photo array
const initialCards = [
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
const addCloseButton = addModal.querySelector(".modal__close-btn");
const addPostForm = addModal.querySelector(".modal__form");
const postImageInput = addModal.querySelector("#profile-new-img-link");
const postCaptionInput = addModal.querySelector("#profile-img-caption");

//open and close modals
function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

//opens edit profile modal
editButton.addEventListener("click", () => {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  editModal.classList.add("modal_is-opened");
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
  console.log("Image Link:", postImageInput.value);
  console.log("Caption:", postCaptionInput.value);
  addModal.classList.remove("modal_is-opened");
}

addPostForm.addEventListener("submit", handleAddCardSubmit);

//looping through cards
initialCards.forEach(function (item) {
  console.log(item.name);
  console.log(item.link);
});
