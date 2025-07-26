//config
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input", //inputEl??
  submitButtonSelector: ".modal__save-btn",
  inactiveButtonClass: "modal__save-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
//show error msg
const showInputError = (formEl, inputEl, errorMsg, config) => {
  const errorMsgID = `#${inputEl.id}-error`;
  const errorMsgEl = formEl.querySelector(errorMsgID);
  errorMsgEl.textContent = errorMsg;
  inputEl.classList.add(config.inputErrorClass);
  inputEl.classList.add(config.errorClass);
};
//hides individual inputs
const hideInputError = (formEl, inputEl, config) => {
  const errorMsgID = `#${inputEl.id}-error`;
  const errorMsgEl = formEl.querySelector(errorMsgID);
  errorMsgEl.textContent = "";
  inputEl.classList.remove(config.inputErrorClass);
  inputEl.classList.remove(config.inputErrorClass);
};
//validates input and show/hide accordingly
const checkInputValidity = (formEl, inputEl, config) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
};
//checks validity
const hasInvalidInput = (inputList) => {
  return inputList.some((inputEl) => {
    return !inputEl.validity.valid;
  });
};

//enable or disable submit btn
const toggleButtonState = (inputList, buttonEl, config) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonEl, config);
  } else {
    enableButton(buttonEl, config);
  }
};

//disable submit for styling
const disableButton = (buttonEl, config) => {
  buttonEl.classList.add(config.inactiveButtonClass);
  buttonEl.disabled = true;
};

//enable submit
const enableButton = (buttonEl, config) => {
  buttonEl.classList.remove(config.inactiveButtonClass);
  buttonEl.disabled = false;
};

//removes error msgs when we re0pen modal
function resetValidation(formEl, config) {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonEl = formEl.querySelector(config.submitButtonSelector);

  inputList.forEach((inputEl) => {
    hideInputError(formEl, inputEl, config);
  });

  toggleButtonState(inputList, buttonEl, config);
}
//add validation logic to inputs
const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonElement = formEl.querySelector(config.submitButtonSelector);
  //innitial btn state
  toggleButtonState(inputList, buttonElement, config);
  //real-time validation
  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

//initializes validation on all forms

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};

//activates form validation
enableValidation(settings);

// close modal with Esc
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_is-opened");
    if (openModal) {
      closeModal(openModal);
    }
  }
});

// close modal by clicking outside modal container
document.addEventListener("mousedown", (evt) => {
  if (
    evt.target.classList.contains("modal") &&
    evt.target.classList.contains("modal_is-opened")
  ) {
    closeModal(evt.target);
  }
});
