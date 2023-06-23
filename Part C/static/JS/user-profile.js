fetch("../Static/JSON/users.json")
  .then(response => response.json())
  .then(data => {
    const user = data.Users[0]; // Get the first user from the array
    const firstName = user.firstname;
    const lastName = user.lastname;
    const fullName = `${firstName} ${lastName}`; // Get the user's full name
    const id = user.id; // Get the user's id
    const dob = new Date(user.dob); // Get the user's dob
    const hLevel = user.healthLevel; // Get the user's health level
    const lessonsList = user.lessons; // Get the user's list of lessons
      // show user's values on html
    document.getElementById('userTitle').textContent = `Welcome back, ${firstName}!`;
    document.getElementById('name-label').textContent = `Name: ${fullName}`;
    document.getElementById('health-level').textContent = `Health level: ${hLevel}`;
    document.getElementById('birthdate').textContent = `Birthday: ${dob.toLocaleDateString()}`;
    const list= document.querySelector('.lessons');
    for (let i=0; i<lessonsList.length; i++){
        const li = document.createElement('li');
        const lessonText = `${lessonsList[i][1]} - ${lessonsList[i][0]}`;
        li.appendChild(document.createTextNode(lessonText));
        list.appendChild(li);
    }
  })
  .catch(error => console.error(error));

// adding buttons href
const buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const url = button.dataset.url;
    window.open(url,'_blank', 'width=600,height=1000');
  });
});