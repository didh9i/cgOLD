export default function hide (button, header) {
    let state = {
      hidden: false
    };

    console.log("Hello");

    button.addEventListener("click", (event) => {
        if (state.hidden === true)
            state.hidden = false;
        else
            state.hidden = true;

        if (state.hidden === true) {
            header.style.height = "0";
            header.style.transform = "translateY(-98px)";
            button.style.border = "#323232 solid 1px"
            button.style.display = "fixed";
            button.style.transform = "translate(1px, 49px)";
            button.style.borderRadius = "0";
            button.firstChild.style.transform = "rotate(-180deg)";
        }
        else {
            header.style.height = "97px";
            header.style.transform = "translateY(0px)";
            button.style.border = "none"
            button.style.display = "fixed";
            button.style.transform = "translate(0, 0)";
            button.style.borderRadius = "8px";
            button.firstChild.style.transform = "rotate(0deg)";
        }
    });
}