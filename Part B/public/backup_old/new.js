
const form_sign = document.querySelector('.form-container');
    const inputID = document.querySelector("#ID");
 const emailInput = document.querySelector('#Email');
    form_sign.addEventListener("submit",function(event) {
        // event.preventDefault();

        form.addEventListener('submit', function (event) {
            // Prevent the form from submitting if validation fails

            if ( validateEmail() && validateID()) {
                alert("You successfully registered to the class");
            }
            else
            {
                event.preventDefault();
            }
        })
    });
    function validateID() {
 const ID = inputID.value;
const regex = /\b\d{8}\b/;
if (!regex.test(ID)) {
    alert("ID must be 8 digits.");
    return false;
  }
  return true;
}
function validateEmail() {
  const emailValue = emailInput.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailValue)) {
    alert('Please enter a valid email address.');
    emailInput.focus();
    return false;
  }
  return true;
}