//invalid values in the sign_up //

// Get references to the form and the inputs
const form = document.querySelector('.sign-in-form');
const passwordInput = document.querySelector('#password');
const firstNameInput = document.querySelector('#First-Name');
const lastNameInput = document.querySelector('#Last-Name');
const emailInput = document.querySelector('#Email');

// Define regular expressions for validation
var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
var nameRegex = /^[a-zA-Z]+$/;
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Add event listeners for form submission
form.addEventListener('submit', function(event) {
  // Prevent the form from submitting if validation fails
  event.preventDefault();

  if (validateID() && validateFirstName() && validateLastName() && validateEmail() && validatePassword()) {
    setTimeout(function () {
      alert("You are now registered and redirected to sign in page");
      window.location.href = "SignIn.html";
    }, 500);
  }
  else{
    alert("Invalid details, Please check again your details");
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
    alert("ID must be 8 digits long.");
    return false;
  }
  return true;
}