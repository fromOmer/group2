//invalid values in the registration //
const form = document.querySelector('.form-container');
// Get references to the form and the inputs
    const customerID = document.querySelector("#ID");
    const customerEmail = document.querySelector("#Email");
    console.log(customerID)
console.log(customerEmail)
   form.addEventListener("submit",function(event) {
    event.preventDefault();

    const ID = customerID.value;
    const email= customerEmail.value;
    Valid_user(ID, email)
        .then(result => {
            if (result) {
                alert("Your request has been saved. Thank you!" +
                    " Redirected to home page.");
                Go_to_Home_Page();
            } else {
                alert("Invalid details, Please check again your ID and Email");
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

async function Valid_user(ID, email) {
    const response = await fetch("../Static/JSON/information.json");
    console.log(response)
    const data =await response.json();
    const found = data.trainers.find(trainer => trainer.ID === ID && trainer.email === email);
    console.log('Customer found:', found);
    return found !== undefined;

}