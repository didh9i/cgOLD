const mPage = document.querySelector(".mPage");
const container = document.createElement("div");
container.style.width = "100%";
container.style.height = "100%";
mPage.appendChild(container);
const newCanvas = document.createElement("canvas");
// Создаем Фон

newCanvas.width = 2048;
newCanvas.height = 2048;
newCanvas.style.position = "absolute";
newCanvas.style.zIndex = -5;
newCanvas.style.left = "50%";
newCanvas.style.top = "50%";
newCanvas.style.transform = "translate(-50%, -50%)";
newCanvas.style.pointerEvents = "none";
newCanvas.style.border = "darkred solid 16px";

const ctx = newCanvas.getContext('2d');
const ctxCenter = 1024 + 48;

function readTextFile(file, callback) {
    let rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("applications/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status === 200) {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

// Использование

readTextFile("./graph/graph.json", function (text) {
    let graph = JSON.parse(text);
    generateGraph(graph);
});

function generateGraph(graph) {
    // Создаем корневой элемент:
                                        // Создаем Контейнер и Картинку внутри него
    const newNode = document.createElement("button");
    const newNodeBack = document.createElement("div");
    const newNodeImg = document.createElement("img");

    newNodeBack.style.position = "absolute";

    newNodeBack.style.width = "100%";
    newNodeBack.style.height = "100%";
    newNodeBack.style.background = "#2B2B2B";
    newNodeBack.style.zIndex = "-1";
    newNode.transitionX = -48;
    newNode.transitionY = -48;
    newNode.addEventListener("mousedown", () => {window.location.href = graph.link});
    newNode.constTransitionX = newNode.transitionX;
    newNode.constTransitionY = newNode.transitionY;
    newNode.style.border = "#434445 solid 2px";
    newNodeImg.src = graph.icon;         // Передаем расположение иконки
    newNodeImg.onerror = () => {
        this.onerror = null;
        this.src = 'assets/imgNotFound.svg';
    }
    newNode.appendChild(newNodeImg);    // Вписываем картиркинку в контейнер
    newNode.id = "mainNode";            // Id

    container.appendChild(newNode);     // Вписываем Контейнер в страничку
    newNode.appendChild(newCanvas);
    newNode.appendChild(newNodeBack);

    // Запускаем рекурсию создания веток
    generateBranches(graph, newNode);
}

function generateBranches(branch, father, angle = Math.PI * 2, startAngle = 0) {
    let i = 0;                              // Указатель
    let a = (angle / branch.branches.length); // Угол между Ветками
    let l = 96 * 1.5;                       // Растояние от родительской ноды до дочерней
    // 136
    //console.log("i: " + i);
    //console.log("a: " + a);
    //console.log("l: " + l);
    while (i < branch.branches.length) {
        let x = father.transitionX + Math.sin(startAngle + a * i) * l;
        let y = father.transitionY + Math.cos(startAngle + a * i) * l;

        //console.log("x: " + x);
        //console.log("y: " + y);
        // Создаем Контейнер и Картинку внутри него
        const newNode = document.createElement("div");
        const newNodeImg = document.createElement("img");
        // <svg><line x1="50" y1="50" x2="350" y2="350" stroke="white" stroke-width="3"></line></svg>

        ctx.moveTo(ctxCenter + father.transitionX, ctxCenter + father.transitionY);
        ctx.lineTo(ctxCenter + x, ctxCenter + y);
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();
        newNode.transitionX = x;
        newNode.transitionY = y;
        newNode.constTransitionX = newNode.transitionX;
        newNode.constTransitionY = newNode.transitionY;

        newNode.addEventListener("mousedown", () => {window.location.href = branch.link});
        newNodeImg.onerror = () => {newNodeImg.onerror = null; newNodeImg.src = "assets/imgNotFound.svg";};
        newNodeImg.src = branch.branches[i].icon;  // Передаем расположение иконки
        newNode.appendChild(newNodeImg);        // Вписываем картиркинку в контейнер
        newNode.id = "node";                    // Id
        newNode.style.transform = "translate(" + x + "px," + y + "px)";

        //console.log(newNode.style.transform);
        container.appendChild(newNode);         // Вписываем Контейнер в страничку
        console.log(newNode);
        if (branch.branches[i].branches.length >= 1)
            generateBranches(branch.branches[i], newNode, a * 2, a * i - a / 2);
        i++;
    }
}

let mouseStartX = 0;
let mouseStartY = 0;
let graphScale = 1;

mPage.addEventListener("touchstart", function(event) {
    mouseStartX = (event.pageX === undefined) ? event.targetTouches[0].pageX : event.pageX;
    mouseStartY = (event.pageY === undefined) ? event.targetTouches[0].pageY : event.pageY;

    //console.log(event);
    mPage.addEventListener("touchmove", MouseMoveHandler);
    mPage.addEventListener("touchend", disableMoveHandler);
    mPage.addEventListener("mouseleave", disableMoveHandler);
    //console.log("Touch Start");
});

mPage.addEventListener("mousedown", function(event) {
    mouseStartX = (event.pageX === undefined) ? event.targetTouches[0].pageX : event.pageX;
    mouseStartY = (event.pageY === undefined) ? event.targetTouches[0].pageY : event.pageY;

    mPage.addEventListener("mousemove", MouseMoveHandler);
    mPage.addEventListener("mouseup", disableMoveHandler);
    mPage.addEventListener("mouseleave", disableMoveHandler);
    //console.log("MouseDown");
});


mPage.addEventListener("wheel", function (event) {
    console.log("Scroll...");
    console.log(event.deltaY);
    if (event.deltaY === -100)
        graphScale *= 1.1;
    else
        graphScale /= 1.1;

    container.style.transform = "scale(" + graphScale + ")";
})

function disableMoveHandler(event) {
    let mouseOffsetX = ((event.pageX === undefined) ? event.changedTouches[0].pageX : event.pageX) - mouseStartX;
    let mouseOffsetY = ((event.pageY === undefined) ? event.changedTouches[0].pageY : event.pageY) - mouseStartY;
    mouseOffsetX /= graphScale;
    mouseOffsetY /= graphScale;

    for (const element of container.children) {
        element.transitionX = mouseOffsetX + element.transitionX;
        element.transitionY = mouseOffsetY + element.transitionY;
        //console.log(element.transitionX + " : " + element.transitionY);
        //console.log(transform);
        //console.log(transformX);
        //console.log(transformY);
    }
    mPage.removeEventListener("touchmove", MouseMoveHandler);
    mPage.removeEventListener("touchend", disableMoveHandler);
    mPage.removeEventListener("mousemove", MouseMoveHandler);
    mPage.removeEventListener("mouseup", disableMoveHandler);
    mPage.removeEventListener("mouseleave", disableMoveHandler);
    //console.log("MouseLeave");
}

function MouseMoveHandler (event) {
    let mouseOffsetX = ((event.pageX === undefined) ? event.targetTouches[0].pageX : event.pageX) - mouseStartX;
    let mouseOffsetY = ((event.pageY === undefined) ? event.targetTouches[0].pageY : event.pageY) - mouseStartY;
    mouseOffsetX /= graphScale;
    mouseOffsetY /= graphScale;

    //console.log("Move");
    //console.log(container.children);
    //container.children.forEach(element => console.log(element));
    for (const element of container.children) {
        element.style.transform = "translate(" + (mouseOffsetX + element.transitionX) + "px," + (mouseOffsetY + element.transitionY) + "px)";
        //console.log(transformX);
        //console.log(transformY);
    }
    //console.log(mouseOffsetX + ":" + mouseOffsetY);
}

window.addEventListener('resize', function () {
    mPage.removeEventListener("touchmove", MouseMoveHandler);
    mPage.removeEventListener("touchend", disableMoveHandler);
    mPage.removeEventListener("mousemove", MouseMoveHandler);
    mPage.removeEventListener("mouseup", disableMoveHandler);
    mPage.removeEventListener("mouseleave", disableMoveHandler);
    for (const element of container.children) {
        element.transitionX = element.constTransitionX;
        element.transitionY = element.constTransitionY;
    }
});