let button = document.getElementById("mybutton");
const pi = 3.14159;
let radius;
let circumference;

function mybtn() {
    radius = document.getElementById("mytext").value;
    radius = Number(radius);
    circumference = 2 * pi * radius;
    document.getElementById("myh2").textContent = `the circumference is ${circumference}`
    console.log(circumference);
}