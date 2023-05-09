//Take a values from information json for sign in //

    const form_sign = document.querySelector('.sign-in-form');
    const customerID = document.querySelector("#ID");
    const customerPassword = document.querySelector("#password");
    form_sign.addEventListener ("submit",function(event) {
    event.preventDefault();
        const ID = customerID.value;
        const password= customerPassword.value;
        Valid_user(ID, password)
            .then(result => {
                if (result) {
                    alert("You are now logged in and redirected to home page.");
                    Go_to_Home_Page();
                } else {
                    alert("Invalid details, Please check again your ID and password");
                }
            })
                .catch(error => {
                // alert("Please try again later");
                console.error(error);
            });
    });

    function Go_to_Home_Page() {
    window.location.href = "Home-page.html";
}

async function Valid_user(ID, password) {
    const response = await fetch("../public/JSON/information.json");
    console.log(response)
    const data =await response.json();
    const found = data.trainers.find(trainer => trainer.ID === ID && trainer.password === password);
    console.log('Customer found:', found);
    return found !== undefined;

}