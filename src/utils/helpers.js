export function setButtonText(
  submitbtn,
  isLoading,
  defaultText = "Save",
  loadingText = "Saving..."
) {
  if (isLoading) {
    submitbtn.textContent = loadingText;
  } else {
    submitbtn.textContent = defaultText;
  }
}

//TODO -- IMPLEMENT LOADING TEXT FOR ALL OTHER FORM SUBMISSIONS
