const container = document.querySelector(".mPage");

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
    if (!graph.img)                     // Исключаем ошибки не существующих данных
        graph.img = null;
    if (!graph.branches)
        graph.branches = [];
    if (!graph.link)
        graph.link = "./index.html";
                                        // Создаем Контейнер и Картинку внутри него
    const newNode = document.createElement("button");
    const newNodeImg = document.createElement("img");

    newNode.transitionX = 0;
    newNode.transitionY = 0;
    newNode.addEventListener("mousedown", () => {window.location.href = graph.link});
    newNode.constTransitionX = newNode.transitionX;
    newNode.constTransitionY = newNode.transitionY;
    newNodeImg.src = graph.img;         // Передаем расположение иконки
    newNode.appendChild(newNodeImg);    // Вписываем картиркинку в контейнер
    newNode.id = "mainNode";                // Id

    container.appendChild(newNode);     // Вписываем Контейнер в страничку

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
        let x = Math.sin(startAngle + a * i) * l;
        let y = Math.cos(startAngle + a * i) * l;

        //console.log("x: " + x);
        //console.log("y: " + y);
        // Создаем Контейнер и Картинку внутри него
        const newNode = document.createElement("div");
        const newNodeImg = document.createElement("img");

        newNode.transitionX = x;
        newNode.transitionY = y;
        newNode.constTransitionX = newNode.transitionX;
        newNode.constTransitionY = newNode.transitionY;

        newNode.addEventListener("mousedown", () => {window.location.href = branch.link});
        newNodeImg.src = "assets/icoCode.svg";//Передаем расположение иконки
        newNode.appendChild(newNodeImg);    // Вписываем картиркинку в контейнер
        newNode.id = "node";                // Id
        newNode.style.transform = "translate(" + x + "px," + y + "px)";

        //console.log(newNode.style.transform);
        container.appendChild(newNode);     // Вписываем Контейнер в страничку
        i++;
    }
}

let mouseStartX = 0;
let mouseStartY = 0;

container.addEventListener("touchstart", function(event) {
    mouseStartX = (event.pageX === undefined) ? event.targetTouches[0].pageX : event.pageX;
    mouseStartY = (event.pageY === undefined) ? event.targetTouches[0].pageY : event.pageY;

    //console.log(event);
    container.addEventListener("touchmove", MouseMoveHandler);
    container.addEventListener("touchend", disableMoveHandler);
    container.addEventListener("mouseleave", disableMoveHandler);
    //console.log("Touch Start");
});

container.addEventListener("mousedown", function(event) {
    mouseStartX = (event.pageX === undefined) ? event.targetTouches[0].pageX : event.pageX;
    mouseStartY = (event.pageY === undefined) ? event.targetTouches[0].pageY : event.pageY;
    container.addEventListener("mousemove", MouseMoveHandler);
    container.addEventListener("mouseup", disableMoveHandler);
    container.addEventListener("mouseleave", disableMoveHandler);
    //console.log("MouseDown");
});

container.addEventListener("wheel", function (event) {
    console.log("Scroll...");
    console.log(event.deltaY);
    if (event.deltaY === -100)
        container.style.transform = "scale(2)";
    else
        container.style.transform = "scale(1)";
})

function disableMoveHandler(event) {
    let mouseOffsetX = ((event.pageX === undefined) ? event.changedTouches[0].pageX : event.pageX) - mouseStartX;
    let mouseOffsetY = ((event.pageY === undefined) ? event.changedTouches[0].pageY : event.pageY) - mouseStartY;

    for (const element of container.children) {
        element.transitionX = mouseOffsetX + element.transitionX;
        element.transitionY = mouseOffsetY + element.transitionY;
        //console.log(element.transitionX + " : " + element.transitionY);
        //console.log(transform);
        //console.log(transformX);
        //console.log(transformY);
    }
    container.removeEventListener("touchmove", MouseMoveHandler);
    container.removeEventListener("touchend", disableMoveHandler);
    container.removeEventListener("mousemove", MouseMoveHandler);
    container.removeEventListener("mouseup", disableMoveHandler);
    container.removeEventListener("mouseleave", disableMoveHandler);
    //console.log("MouseLeave");
}

function MouseMoveHandler (event) {
    let mouseOffsetX = ((event.pageX === undefined) ? event.targetTouches[0].pageX : event.pageX) - mouseStartX;
    let mouseOffsetY = ((event.pageY === undefined) ? event.targetTouches[0].pageY : event.pageY) - mouseStartY;

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
    container.removeEventListener("touchmove", MouseMoveHandler);
    container.removeEventListener("touchend", disableMoveHandler);
    container.removeEventListener("mousemove", MouseMoveHandler);
    container.removeEventListener("mouseup", disableMoveHandler);
    container.removeEventListener("mouseleave", disableMoveHandler);
    for (const element of container.children) {
        element.transitionX = element.constTransitionX;
        element.transitionY = element.constTransitionY;
    }
});