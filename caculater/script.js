// const display = document.getElementById('display');
// const operatorbtn = document.getElementById('operatorbtn');
// const result = document.getElementById('result');

function apppendtoidisplay(input) {
    display.value += input;
}
function cleardisplay() {
    display.value = "";
}
function calculate() {
    try {
        const result = eval(display.value);
        display.value = result;
        console.log(result);
    }
    catch (error) {
        display.value = "error";
    }
}

