import appLinks from './appHeader/links.js';
import appHide from './appHeader/hide.js'

const links = document.getElementById("hLinks").children;

appLinks(links);
appHide(document.getElementById("buttonHide"),
        document.getElementById("header"));