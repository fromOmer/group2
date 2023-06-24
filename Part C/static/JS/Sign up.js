//invalid values in the sign_up //


// Get references to the form and the inputs
const form = document.querySelector('.sign-in-form');
const passwordInput = document.querySelector('#password');
const firstNameInput = document.querySelector('#FirstName');
const lastNameInput = document.querySelector('#LastName');
const emailInput = document.querySelector('#Email');
const idInput = document.querySelector('#ID');

// Define regular expressions for validation
var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
var nameRegex = /^[a-zA-Z]+$/;
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Define error messages
var id_error = document.getElementById('id_error');
var email_error = document.getElementById('email_error');
var pass_error = document.getElementById('pass_error');
var fName_error = document.getElementById('fName_error');
var lName_error = document.getElementById('lName_error');




// Add event listeners for form submission
form.addEventListener('submit', function(event) {
  // Prevent the form from submitting if validation fails
  event.preventDefault();

  if (validateID() && validateFirstName() && validateLastName() && validateEmail() && validatePassword()) {
    setTimeout(function () {
      alert("You are now registered and redirected to sign in page");
    //  window.location.href = "/";

    }, 500);
  }
  else{
  }
});

// Validate password input
function validatePassword() {
  const passwordValue = passwordInput.value;
  if (!passwordRegex.test(passwordValue)) {
    alert('Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.');
    passwordInput.focus();
    return false;
  }
  return true;
}

// Validate name inputs
function validateFirstName() {
  const nameValue = firstNameInput.value;
  if (!nameRegex.test(nameValue)) {
    alert('Please enter a valid first name using only letters.');
    firstNameInput.focus();
    return false;
  }
  return true;
}

function validateLastName() {
  const nameValue = lastNameInput.value;
  if (!nameRegex.test(nameValue)) {
    alert('Please enter a valid last name using only letters.');
    lastNameInput.focus();
    return false;
  }
  return true;
}

// Validate email input
function validateEmail() {
  const emailValue = emailInput.value;
  if (!emailRegex.test(emailValue)) {
    alert('Please enter a valid email address.');
    emailInput.focus();
    return false;
  }
  return true;
}

function validateID() {
  //const id = document.getElementById("ID").value;
  const id = document.querySelector('#ID').value;
  const regexID = /\b\d{8}\b/;
  if (!regexID.test(id)) {
        alert('Please enter a valid ID');

    return false;
  }
  return true;
}