//Take a values from information json for trainings //
'use strict';
document.addEventListener('DOMContentLoaded', function() {
  function getData() {
    const usersContainer = document.getElementById("users-container");
        fetch("../JSON/information.json")
          .then(response => response.json())
          .then(data => {
            const Trainings = data.Trainings;
            for (let i = 0; i < Trainings.length; i++) {
              const Training = Trainings[i];

            const userElement = document.createElement("div");
              userElement.classList.add("Training");

              const nameElement = document.createElement("h2");
              nameElement.textContent = Training.Name;
              userElement.appendChild(nameElement);

              const photoElement = document.createElement("img");
              photoElement.alt = Training.Name;
              photoElement.src = Training.photo;
              userElement.appendChild(photoElement);

              const descriptionElement = document.createElement("p");
              descriptionElement.textContent = Training.description;
              userElement.appendChild(descriptionElement);

              usersContainer.appendChild(userElement);
            }
          })
        }

    getData();
  });
