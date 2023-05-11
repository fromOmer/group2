//For the top bar //

function welcomingTitle() {
    let date = new Date();
    let hours = date.getHours();
        console.log(date);
        console.log(hours);
    if (5 < hours && hours < 11) {
        document.querySelector('.topBar').innerHTML = "Welcome, Good Morning";
    }
    else if (11 < hours && hours < 18) {
        document.querySelector('.topBar').innerHTML = "Welcome, Good Afternoon";
    }
    else if (18 < hours && hours < 21) {
        document.querySelector('.topBar').innerHTML = "Welcome, Good Evening";
    }
    else if (21 < hours || hours < 5){
        document.querySelector('.topBar').innerHTML = "Welcome, Good Night";
    }
}