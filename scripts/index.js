//Edit Modal Variables
const editButton = document.querySelector(".profile__edit-btn");
const editModal = document.querySelector("#edit-modal");
const editCloseButton = editModal.querySelector(".modal__close-btn");

//Add Modal Variables
const addButton = document.querySelector(".profile__new-post-btn");
const addModal = document.querySelector("#add-modal");
const addCloseButton = addModal.querySelector(".modal__close-btn");

//opens edit profile modal
editButton.addEventListener("click", () =>
  editModal.classList.add("modal_is-opened")
);

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
