
// Function to populate the select element with available trainings
function populateSelect(trainings) {
  var selectElement = document.getElementById("training-selected");

  // Clear the select element
  selectElement.innerHTML = "";

  // Add options to the select element for each training
  trainings.forEach(function (training) {
    var option = document.createElement("option");
    option.value = training.time_training + " " + training.day_training + " " + training.Coacher_name + " " + training.training;
    option.textContent = training.time_training + " - " + training.day_training + " - " + training.Coacher_name + " - " + training.training;
    selectElement.appendChild(option);
  });
}

// Function to handle the form submission
function handleSubmit(event) {
  event.preventDefault();
    alert('The review submitted! thank you.'); // Show an alert to the client
  // Get the selected training value
  var selectElement = document.getElementById("training-selected");
  var selectedTraining = selectElement.value;
const score_select = document.querySelector('#score');
const scoree  = score_select.options[score_select.selectedIndex].value;

  // Make an AJAX request to the server to register the training
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/review_training", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      console.log(response.message);
      // Handle success response
      // Handle success response
    }
  };
  const values = selectedTraining.split(" ");
  const time_training = values[0];
  const day_training = values[1];
  const Coacher_name = values[2];
  const training_name = values[4];
  // Prepare the data to send to the server
  var data = {
    time_training: time_training,
    day_training: day_training,
    Coacher_name: Coacher_name,
    training: training_name,
    score: scoree
  };
  xhr.send(JSON.stringify(data))
  .then((res) => res.json())
    .then((data) => {
 //     console.log("Response received from /my-profile");
    console.log(data);
    alert ("the user successfully wrote a review ");
      window.location.href = "/my-profile";
      time_training.value = "";
      day_training.value = "";
      Coacher_name.value = "";
      training.value = "";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Make an AJAX request to the server to fetch the trainings
var xhr = new XMLHttpRequest();
xhr.open("GET", "/mytrainings_review", true);
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var response = JSON.parse(xhr.responseText);
    var trainings = response.trainings;
    populateSelect(trainings);
  }
};
xhr.send();

// Add event listener to the submit button
var submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", handleSubmit);
