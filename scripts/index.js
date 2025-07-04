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
