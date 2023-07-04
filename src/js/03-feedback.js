import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = 'feedback-form-state';

function saveFormState() {
  const formState = {
    email: form.elements.email.value,
    message: form.elements.message.value,
  };
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formState));
  console.log('Zapisano formularz:', formState);
}
const throttleSaveFormState = throttle(saveFormState, 500);

form.elements.email.addEventListener('input', throttleSaveFormState);
form.elements.message.addEventListener('input', throttleSaveFormState);

function loadFormState() {
  const savedFormState = localStorage.getItem(LOCALSTORAGE_KEY);

  if (savedFormState) {
    const formState = JSON.parse(savedFormState);

    form.elements.email.value = formState.email;
    form.elements.message.value = formState.message;
  }
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const savedFormState = localStorage.getItem(LOCALSTORAGE_KEY);
  if (savedFormState) {
    console.log('Dane formularza zostały wysłane:', JSON.parse(savedFormState));
  }
  localStorage.removeItem(LOCALSTORAGE_KEY);
  form.reset();
});
