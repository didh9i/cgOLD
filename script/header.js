//
//  Logo
//

console.log("Hello World");

const logo	= document.querySelector(".hLogo");

console.log(logo);

logo.addEventListener("mouseenter", function( event ) {
    // highlight the mouseenter target
    event.target.style.color = "purple";

    // reset the color after a short delay
    setTimeout(function() {
        event.target.style.color = "";
    }, 500);
}, false);