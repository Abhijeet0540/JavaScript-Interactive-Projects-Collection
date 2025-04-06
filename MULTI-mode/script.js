// task2
let graybtn = document.getElementById("gray");
function greycolore() {
    document.querySelector("body").classList.add("gray");
    document.querySelector("body").classList.remove("yellow");
    document.querySelector("body").classList.remove("blue");
    document.querySelector("body").classList.remove("green");
    console.log("Grey button is clicked ")
}
let yellowbtn = document.getElementById("yellow");
function yellowcolore() {
    document.querySelector("body").classList.add("yellow");
    document.querySelector("body").classList.remove("gray");
    document.querySelector("body").classList.remove("blue");
    document.querySelector("body").classList.remove("green");
    console.log("Yellow button is clicked")
}
let bluebtn = document.getElementById("blue");
function bluecolore() {
    document.querySelector("body").classList.add("blue");
    document.querySelector("body").classList.remove("gray");
    document.querySelector("body").classList.remove("yellow");
    document.querySelector("body").classList.remove("green");
    console.log("Blue button is clicked")
}
function greencolore() {
    document.querySelector("body").classList.add("green");
    document.querySelector("body").classList.remove("gray");
    document.querySelector("body").classList.remove("yellow");
    document.querySelector("body").classList.remove("blue");
    console.log("Green button is clicked")
}
