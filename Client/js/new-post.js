// read form element
const form = document.getElementById('form');
const imageInput = document.querySelector('input[type="file"]');
const title = document.getElementById("form-post-title");
const content = document.getElementById("form-post-content");

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check required fields
function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
      isRequired = true;
    } else {
      showSuccess(input);
    }
  });

  return isRequired;
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Validate form input elements
function validateForm(){
  if(!checkRequired([title, content])){
    checkLength(title, 10, 50);
    checkLength(content, 50, 5000);
  }
}

/**
 * Send form data to server
 * Info: https://stackoverflow.com/questions/4295782/how-to-process-post-data-in-node-js
 */
function sendForm(){
  const API_URL = "http://localhost:3000/api/posts";
  let data = new FormData();
  console.log(data);
  data.append('post-image', imageInput.files[0]);
  data.append('title', title.value);
  data.append('content', content.value);

  fetch(API_URL, {
    method: 'POST',
    body: data
  }).then(() => {
    window.location.href = "index.html";
  })

}

// Event listeners
form.addEventListener('submit', function(e) {
  //https://www.w3schools.com/jsref/event_preventdefault.asp
  e.preventDefault();
  //First validate form
  validateForm();
  //Send Data
  sendForm();
});