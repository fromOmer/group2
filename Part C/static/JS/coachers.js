//Take a values from information json for coach //
'use strict';
//const express = require('express');
//const app =express();
//const path = require('path');

//app.use(express.static(path.join(__dirname, "static"))); // find the folder static

document.addEventListener('DOMContentLoaded', function() {
  function getData() {
    const CoachContainer = document.getElementById("Coach-container");
    fetch("../../DB/coachers.csv")
      .then(response => response.text())
      .then(data => {
        const rows = data.split('\n').slice(1); // Split data into rows and remove header row
        rows.forEach(row => {
          const [id ,name, description] = row.split(','); // Split each row into columns

          const CoachElement = document.createElement("div");
          CoachElement.classList.add("Coachh");

          const nameElement = document.createElement("h2");
          nameElement.textContent = name;
          CoachElement.appendChild(nameElement);


          const descriptionElement = document.createElement("p");
          descriptionElement.textContent = description;
          CoachElement.appendChild(descriptionElement);

          CoachContainer.appendChild(CoachElement);
        });
      });
  }

  getData();
});
