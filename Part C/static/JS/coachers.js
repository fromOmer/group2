//Take a values from information json for coach //
'use strict';

document.addEventListener('DOMContentLoaded', function() {
  function getData() {

const CoachContainer = document.getElementById("Coach-container");
fetch("../Static/JSON/information.json")
  .then(response => response.json())
  .then(data => {
    const Coach = data.Coach;
    for (let i = 0; i < Coach.length; i++) {
      const Coachh = Coach[i];

    const CoachElement = document.createElement("div");
      CoachElement.classList.add("Coachh");

      const nameElement = document.createElement("h2");
      nameElement.textContent = Coachh.Name;
      CoachElement.appendChild(nameElement);

      const photoElement = document.createElement("img");
      photoElement.alt = Coachh.Name;
      photoElement.src = Coachh.photo;
      CoachElement.appendChild(photoElement);

      const descriptionElement = document.createElement("p");
      descriptionElement.textContent = Coachh.description;
      CoachElement.appendChild(descriptionElement);

      CoachContainer.appendChild(CoachElement);
    }
  })
  }
  getData();
});