//invalid values in the sign_up //


// Get references to the form and the inputs
const form = document.querySelector('.sign-in-form');
const passwordInput = document.querySelector('#password');
const firstNameInput = document.querySelector('#FirstName');
const lastNameInput = document.querySelector('#LastName');
const emailInput = document.querySelector('#Email');
const idInput = document.querySelector('#ID');
//const healthinput = document.getElementById('Healthlevel');
const healthinput = document.querySelector('#Healthlevel');
// Define regular expressions for validation
var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
var nameRegex = /^[a-zA-Z]+$/;
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


// Add event listeners for form submission
form.addEventListener('submit', function(event) {
  // Prevent the form from submitting if validation fails
  event.preventDefault();

  const password = passwordInput.value.trim();
  const firstname = firstNameInput.value.trim();
  const lastname = lastNameInput.value.trim();
  const email = emailInput.value.trim();
  const id = idInput.value.trim();
const health  = healthinput.options[healthinput.selectedIndex].value;


  if (!validateID() || !validateFirstName() || !validateLastName() || !validateEmail() || !validatePassword()) {
    return;
    }
   // Form a user data object
  const userData = {
    ID: id,
    Email: email,
    password: password,
    FirstName: firstname,
    LastName: lastname,
    Health: health
  };

  // Send data to server
  fetch("/createNewCustomer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => res.json())
    .then((data) => {
 //     console.log("Response received from /Sign_up");
      console.log(data);


      alert(
        "Your account has been created "
      );
      window.location.href = "/";
      passwordInput.value = "";
      firstNameInput.value = "";
      lastNameInput.value = "";
      emailInput.value = "";
      idInput.value = "";
      healthinput.value = "";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
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

