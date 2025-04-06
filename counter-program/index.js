const  incrisebtn = document.getElementById("incrisebtn");
const  decrisebtn = document.getElementById("decrisebtn");
const  resetbtn = document.getElementById("resetbtn");
const  countlabel = document.getElementById("countlabel");
let count = 0;
incrisebtn.onclick = () => {
    count ++ ;
    countlabel.textContent = count;

}
resetbtn.onclick = () => {
    count = 0;
    countlabel.textContent = count;
}

decrisebtn.onclick = () => {
    count -- ;
    countlabel.textContent = count;
}

