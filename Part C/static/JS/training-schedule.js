function checkCookie2() {
    var user = document.cookie;
    var greetingButton = document.getElementById("greeting-button");
    var signInButton = document.getElementById("sign-in-button");
    var buttonRegistrate= document.getElementById("registrate");
    if (document.cookie != "") {
        console.log("cookie:", document.cookie);
        greetingButton.style.display = "inline-block";
        signInButton.style.display = "none";
        buttonRegistrate.disable = false;
    } else {
        console.log("no cookie");
        greetingButton.style.display = "none";
        signInButton.style.display = "inline-block";
        buttonRegistrate.disabled = true;
    }
}
checkCookie2();