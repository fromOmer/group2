function checkCookie() {
    var user = document.cookie;
    var greetingButton = document.getElementById("greeting-button");
    var signInButton = document.getElementById("sign-in-button");

    if (document.cookie != "") {
        console.log("cookie:", document.cookie);
        greetingButton.style.display = "inline-block";
        signInButton.style.display = "none";
    } else {
        console.log("no cookie");
        greetingButton.style.display = "none";
        signInButton.style.display = "inline-block";
    }
}

checkCookie();
