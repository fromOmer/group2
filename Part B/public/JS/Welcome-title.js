//For the top bar //

function welcomingTitle() {
    console.log("Welcome");
    var date = new Date();
    var hours = date.getUTCHours();
    if (5 < hours && hours < 11) {
        document.querySelector('.topBar').innerHTML = "Welcome, Good Morning";
    }
    else if (11 < hours && hours < 18) {
        document.querySelector('.topBar').innerHTML = "Welcome, Good Afternoon";
    }
    else if (18 < hours && hours < 21) {
        document.querySelector('.topBar').innerHTML = "Welcome, Good Evening";
    }
    else {
        document.querySelector('.topBar').innerHTML = "Welcome, Good Night";
    }
}