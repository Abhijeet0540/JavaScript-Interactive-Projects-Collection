// // task 3
// let name = document.getElementById("name");
// let button = document.getElementById("button");
// const userName = document.getElementById('userName');
// function showName(text) {
//     console.log("text", text)

//     //  const userName = document.getElementById('userName');   
//     document.getElementById("name").innerHTML = text
// }
// // console.log(typeof userName)
// // button.addEventListener("click", showName);
// document.getElementById('button').addEventListener("click", () => {
//     showName(userName.value)
// })
let Name = document.getElementById("Name");
let userName = document.getElementById("userName");
let clear = document.getElementById("clear");

function show(Text) {
    Name.innerHTML = Text
    console.log("Text:", Text);
}
button.addEventListener("click", () => {
    show(userName.value)
})
clear.addEventListener("click", () => {
    userName.value = ''
    Name.innerHTML = ""
})
function realtime() {
    // console.log("", userName.value);
    Name.innerText = "" + userName.value;
}
realtime()

















