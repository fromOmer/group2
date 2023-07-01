// Function to validate email
function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

// Event listener for form submission
document.querySelector("form").addEventListener("submit", function (event) {
  // Prevent the form from submitting
  event.preventDefault();

  // Get input values
  const usernameInput = document.querySelector(
    'input[type="text"][placeholder="ID"]'
  );
  const emailInput = document.querySelector(
    'input[type="text"][placeholder="Email"]'
  );
  const passwordInput = document.querySelector(
    'input[type="password"][placeholder="Password"]'
  );
  const passwordVerifyInput = document.querySelector(
    'input[type="password"][placeholder="Password Verification"]'
  );
  const phoneInput = document.querySelector(
    'input[type="text"][placeholder="Phone number"]'
  );

  // Trim the values to remove any white space
  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const passwordVerify = passwordVerifyInput.value.trim();
  const phoneNumber = phoneInput.value.trim();

  // Check if any of the fields are empty
  if (!username || !email || !password || !passwordVerify || !phoneNumber) {
    alert("Please fill in all the required fields");
    return;
  }

  // Validate email
  if (!validateEmail(email)) {
    alert("Invalid email address");
    return;
  }

  // Validate password match
  if (password !== passwordVerify) {
    alert("Password and password verification do not match");
    return;
  }

  // Check password length
  if (password.length < 6) {
    alert("Password must be at least 6 characters long");
    return;
  }

  // Check password contains at least one uppercase letter, one lowercase letter, and one numeric digit
  if (
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/\d/.test(password)
  ) {
    alert(
      "Password must contain at least one uppercase letter, one lowercase letter, and one numeric digit"
    );
    return;
  }

  // Check username length
  if (username.length < 6) {
    alert("User Name must be at least 6 characters long");
    return;
  }

  // Check phone number is at least 10 digits
  if (!/^\d{10,}$/.test(phoneNumber)) {
    alert("Phone number must be at least 10 digits");
    return;
  }

  // Form a user data object
  const userData = {
    username: username,
    email: email,
    password: password,
    phone: phoneNumber,
  };

  // Send data to server
  fetch("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Response received from /signup");
      console.log(data);

      // Display success message and reset form if all validations are passed
      alert(
        "🎉 Yayyy! Your account has been created successfully! 🥳✨🎊 Notice that you got 5 free credits. Use them wisely and get social, get studying, get ahead! 🆓💰📚🚀"
      );
      window.location.href = "/"; // redirect to login page = root page
      usernameInput.value = "";
      emailInput.value = "";
      passwordInput.value = "";
      passwordVerifyInput.value = "";
      phoneInput.value = "";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});