// task1
let currMode = "Light"; //dark
function mode() {
    if (currMode === "Light") {
        currMode = "Dark";
        document.querySelector("body").classList.add("dark");
        document.querySelector("#mode").classList.add("white");
        document.querySelector("body").classList.remove("light");
        document.querySelector("#mode").classList.remove("dark");
    }
    else {
        currMode = "Light";
        document.querySelector("body").classList.add("light");
        document.querySelector("#mode").classList.add("dark");
        document.querySelector("#mode").classList.remove("white");
    }
    document.querySelector("body").classList.remove("gray");
    document.querySelector("body").classList.remove("yellow");
    document.querySelector("body").classList.remove("blue");
    document.querySelector("body").classList.remove("green");
    console.log(currMode);
}