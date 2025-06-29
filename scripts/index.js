//Edit Modal Variables
const editButton = document.querySelector(".profile__edit-btn");
const editModal = document.querySelector("#edit-modal");
const editCloseButton = editModal.querySelector(".modal__close-btn");

//Elements displaying profile info
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

//Input fields inside the modal
const editProfileNameInput = document.querySelector("#profile-name-input");
const editProfileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const editProfileForm = editModal.querySelector(".modal__form");

//Add Modal Variables
const addButton = document.querySelector(".profile__new-post-btn");
const addModal = document.querySelector("#add-modal");
const addCloseButton = addModal.querySelector(".modal__close-btn");

//new post modal
const addPostForm = addModal.querySelector(".modal__form");
const postImageInput = document.querySelector("#profile-new-img-link");
const postCaptionInput = document.querySelector("#profile-img-caption");
const cardsList = document.querySelector(".cards__list");

//opens edit profile modal
editButton.addEventListener("click", () => {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  editModal.classList.add("modal_is-opened");
});

//closes edit profile modal
editCloseButton.addEventListener("click", () =>
  editModal.classList.remove("modal_is-opened")
);

//opens new post modal
addButton.addEventListener("click", () =>
  addModal.classList.add("modal_is-opened")
);

//closes new post modal

addCloseButton.addEventListener("click", () =>
  addModal.classList.remove("modal_is-opened")
);

//handleEditProfileSubmit
function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  editModal.classList.remove("modal_is-opened");
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

//handleAddPostsubmit
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const imageLink = console.log("imagelink");
  const caption = console.log("img photo");
  addModal.classList.remove("modal_is-opened");
}

addPostForm.addEventListener("submit", handleAddCardSubmit);
