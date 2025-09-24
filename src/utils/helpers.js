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

// _checkResponse(res) {
// .then((res) => {
//       if (res.ok) return res.json();
//       return Promise.reject(`Error: ${res.status}`);
//     });
// }
