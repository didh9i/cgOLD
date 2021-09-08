export default function appLinks (buttons) {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("mousedown", (event) => {
            console.log(event);
        });
    }
}
