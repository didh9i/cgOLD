app();
function app () {
    // Getting targets like Array[targets]
    const editable = document.querySelector(".m-3").children;
    let   ptr;

    // Errors
    if (editable === undefined) {
        return ;
    }

    // Just logs
    console.log(editable.length);
    ptr = 0; while (ptr < editable.length) {
        console.log(editable[ptr]); ptr++;
    }

    // Set default text
    ptr = 0; while (ptr < editable.length) {
        editable[ptr].defaultText = editable[ptr].getAttribute("data-editable-target"); ptr++;
    }

    // Creating event listeners for our targets
    ptr = 0; while (ptr < editable.length) {
        editable[ptr].addEventListener("click", handler); ptr++;
    }

    function handler(event) {
        // Our current Target
        console.log(event);
        let target = event.target;
        //let target = event.path[0];
        //if (event.path.length == 7) {
        //  console.log("event.path.length == 7");
        //  target = event.path[1];
        //}
        console.log(target);

        // Disable Listener
        target.removeEventListener("click", handler);

        // Create form
        const form = document.createElement("form");
        const text = document.createElement("input");
        text.type = "text";
        text.name = target.getAttribute("data-editable-target");
        const submit = document.createElement("input");
        submit.type = "submit";
        submit.value = "Save";

        // Set Value of text input
        if (target.children[0]) {
            text.value = "";
            text.setAttribute("value", "");
        }
        else {
            text.value = "";
            text.setAttribute("value", "");
        }

        // Remove Everything from our target'
        if (target.children[0]) {
            target.children[0].remove();
        }
        else {
            target.textContent = '';
        }

        // Append Form
        target.appendChild(form);
        form.appendChild(text);
        form.appendChild(submit);

        // Add listener for form
        function _handler(_event) {
            _event.preventDefault();
            form.removeEventListener("submit", _handler);

            // Set textContent of our target to default or entered
            if (text.value !== '') {
                target.textContent = text.value;
            }
            else {
                const i = document.createElement("i");
                target.appendChild(i);
                i.textContent = target.defaultText;
            }

            // Removing our form
            submit.remove();
            text.remove();
            form.remove();

            // Enabling our listener
            target.addEventListener("click", handler);
        }
        form.addEventListener("submit", _handler);
    }
}