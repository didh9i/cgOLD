//  <div className="container m-3"></div>
//

// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
//import app from './application.js';

const companies = [
    { id: 1, name: 'Hexlet', description: 'online courses' },
    { id: 2, name: 'Google', description: 'search engine' },
    { id: 3, name: 'Facebook', description: 'social network' },
];

app(companies);
/*export default*/
function app(companies) {
    const mContainer = document.querySelector(".m-3");
    const bContainer = document.createElement("div");
    const dContainer = document.createElement("div");
    mContainer.appendChild(bContainer);
    mContainer.appendChild(dContainer);
    const state = {
        companies: companies,
        toggle: -1,
    };

    console.log(mContainer);
    console.log(state);

    createButtons(); function createButtons() {
        let ptr = 0;

        while (ptr < state.companies.length) {
            const newButton = document.createElement("button");

            newButton.classList.add("btn");
            newButton.classList.add("btn-primary");
            newButton.id = state.companies[ptr].id;
            newButton.textContent = state.companies[ptr].name;
            console.log(state.companies[ptr]);
            newButton.addEventListener("click", (event) => {
                if (state.toggle !== -1) {
                    if (state.toggle === event.target.id - 1) {
                        dContainer.textContent = "";
                        state.toggle = -1;
                    }
                    else {
                        dContainer.textContent = state.companies[event.target.id - 1].description;
                        state.toggle = state.companies[event.target.id - 1].id - 1;
                    }
                }
                else {
                    dContainer.textContent = state.companies[event.target.id - 1].description;
                    state.toggle = state.companies[event.target.id - 1].id - 1;
                }
            });
            bContainer.appendChild(newButton);
            ptr++;
        }
    }
}