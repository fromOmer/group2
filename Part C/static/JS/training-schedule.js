function checkCookie2() {
    var greetingButton = document.getElementById("greeting-button");
    var signInButton = document.getElementById("sign-in-button");
   var buttonRegistrate= document.getElementById("regi");
    if (document.cookie != "") {
        console.log("cookie:", document.cookie);
        greetingButton.style.display = "inline-block";
        signInButton.style.display = "none";
        buttonRegistrate.disable = false;
      document.getElementById('regi').addEventListener('click', function() {
      var url = this.getAttribute('data-url');
      window.location.href = url;
      });
    }
    else {
        console.log("no cookie");
        greetingButton.style.display = "none";
        signInButton.style.display = "inline-block";
//        buttonRegistrate.disabled = true;
    };
};
checkCookie2();