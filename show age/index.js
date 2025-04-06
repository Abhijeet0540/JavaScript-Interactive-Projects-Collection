const myinput = document.getElementById("myinput");
const mybutton = document.getElementById("mybutton")
const result = document.getElementById("result");
let age;


mybutton.onclick = () => {
    age = myinput.value;
    age = Number(age);
    if (age >= 0) {
        result.textContent = `you are TOO OLD to enter this site`
    }
    else if (age == 0) {
        result.textContent = `you can't enter this site`
        console.log(age);
    }
    else if (age >= 18) {
        result.textContent = `you are old enough to enter this site`
        console.log(age);
    }
    else if (age < 0) {
        result.textContent = `your age can't be bellow 0`
        console.log(age);
    }
    else {
        result.textContent = `you must be 18+ to enter this site`

    }
}