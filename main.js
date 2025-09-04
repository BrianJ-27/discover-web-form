const form = document.getElementById("form__submit");
const textBoxContainer = document.getElementById("optionalBox");
let checkBoxGroup = document.querySelector("[data-checkbox-group]");
let radioBoxChild = document.querySelector("[data-checkbox-group]");
let errorSummary = document.querySelector(".error__container");
let errorCheckbox = document.getElementById("error__checkbox");
let errorRadio = document.getElementById("error__radio");
let errorMsg = document.querySelector(".error__message");
let errorMsgRb = document.querySelector(".error__message--clr");

/**Shows / Hides Other Reason textbox */
const showTextBox = () => {
  let checkbox = document.getElementById("cb6");
  if (checkbox.checked) {
    textBoxContainer.style.display = "flex";
    checkBoxGroup.style.paddingBottom = "0rem";
    textBoxContainer.style.paddingTop = "0rem";
  } else {
    textBoxContainer.style.display = "none";
    checkBoxGroup.style.paddingBottom = "unset";
    textBoxContainer.style.paddingTop = ".75rem";
  }
};

/** Counter logic for the 100 Character textbox */
const charCounter100 = () => {
  let textArea100 = document.getElementById("optional100").value;
  let counter = document.querySelector("[data-counter-100]");
  counter.innerHTML = textArea100.length;
};

/** Counter logic for the 500 Character textbox */
const charCounter500 = () => {
  let textArea500 = document.getElementById("optional500").value;
  let counter = document.querySelector("[data-counter-500]");
  counter.innerHTML = textArea500.length;
};

/*When user types in both textboxes it will only allow letters, number
It will only allow letters, numbers and basic punctuation characters
*/
const isInputAlphaNumeric = (evt) => {
  let char = String.fromCharCode(evt.which);
  if (!/^[a-zA-Z _.,!"'-?]+$/.test(char)) {
    evt.preventDefault();
  }
};

/** After user accidentally submits blanks form,
 * this function checks whether a option was selected and
 * removes the error notifications from the form
 */
const selectionCheck = () => {
  let getSelectedValueCb = document.querySelector(
    'input[type="checkbox"]:checked'
  );
  let getSelectedValueRb = document.querySelector(
    'input[type="radio"]:checked'
  );

  if (getSelectedValueCb) {
    errorCheckbox.classList.remove("error__border");
    errorMsg.style.display = "none";
  }

  if (getSelectedValueRb) {
    errorRadio.classList.remove("error__border");
    errorMsgRb.style.display = "none";
  }

  if (!getSelectedValueCb || !getSelectedValueRb) {
    errorSummary.style.display = "none";
  } else if (getSelectedValueCb && getSelectedValueRb) {
    errorSummary.style.display = "none";
  }
};

/** If user submits a blank form upon submission or only
 * selects one of the questions this function will display
 * relavant errors messages and the error summary if both
 * questions are blank
 * Also returns a boolean value to use in the form submit listener
 */
const validate = () => {
  let getSelectedValueCb = document.querySelector(
    'input[type="checkbox"]:checked'
  );
  let getSelectedValueRb = document.querySelector(
    'input[type="radio"]:checked'
  );
  let isValid = true;

  if (getSelectedValueCb) {
    errorCheckbox.classList.remove("error__border");
    errorMsg.style.display = "none";
    // checkBoxGroup.style.paddingBottom = "1.5rem";
  } else {
    errorCheckbox.classList.add("error__border");
    errorMsg.style.display = "block";
    // checkBoxGroup.style.paddingBottom = "0rem";
    isValid = false;
  }

  if (getSelectedValueRb) {
    errorRadio.classList.remove("error__border");
    errorMsgRb.style.display = "none";
  } else {
    errorRadio.classList.add("error__border");
    errorMsgRb.style.display = "block";
    isValid = false;
  }

  if (!getSelectedValueCb && !getSelectedValueRb) {
    errorSummary.style.display = "block";
  } else {
    errorSummary.style.display = "none";
  }

  return isValid;
};

/** When the user submits the form check if form is submitted or not*/
form.addEventListener("submit", (e) => {
  const formValid = validate(form);
  console.log(formValid);
  if (!formValid) {
    // do not submit form once user submits
    e.preventDefault();
  } else {
    /**---- Handle Form Data Here: Post Call, API Call, Get Call, etc.. ----**/
    // e.preventDefault(); ** Uncomment this line to test form data below **
    const data = new FormData(form);
    for (let [name, value] of data) {
      console.log(`${name} = ${value}`);
    }
  }
});
