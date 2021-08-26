//
//  Logo
//

const logo = document.querySelector(".hLogo");
const logoImg = document.querySelector(".hLogoImg")
const logoImg1 = document.querySelector(".hLogoImg1");

setTimeout( () => {
    logo.addEventListener("click", moveMainPage);
    console.log("Done");
}, 1000);

function moveMainPage () {
    logo.style.position = "absolute";
    logo.style.width = "100vw";
    logo.style.height = "100vh";
    logoImg.style.opacity = "0";
    logoImg1.style.opacity = "1";
    logoImg1.style.height = "210px";
    logoImg1.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
    logoImg1.style.transform = "translateX(0px)";
    setTimeout(() => {window.location.href = "./index.html"},  250);
}