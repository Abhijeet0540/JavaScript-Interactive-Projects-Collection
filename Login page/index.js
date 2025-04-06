let userName = document.getElementById("username");
let password = document.getElementById("password");
let error = document.getElementById("error");
let user = document.getElementById("user");
let pass = document.getElementById("pass");
let signin = document.getElementById("signin");
error.style.display = "none";

let submit = document.getElementById("submit");

let uNmae = 'abhishek@111';
let passWord = 'abhi@111';

submit.addEventListener("click", function () {
    

    if (userName.value === "") {
        showError("Sorry, username is required while signing in");
        return false;
    }
    if (password.value === "") {
        showError("Sorry, password is required while signing in");
        return false;
    }
    if (password.value.length < 8) {
        showError("Password must be at least 8 characters long");
        return false;
    }
    if (userName.value !== uNmae || password.value !== passWord) {
        showError("Sorry, we couldn't find your account ");
        return false;
    }
    else {
        error.innerHTML = "";
        var now = new Date();
        var minutes = 1;
        now.setTime(now.getTime() + (minutes * 60 * 100));
        document.cookie = `Username=${userName.value}; expires=${now.toGMTString()}`;
        document.cookie = `Password=${password.value}; expires=${now.toGMTString()}`;
        setTimeout(() => {
            closePopup(); 
        }, minutes * 60 * 100);
        readCookie();
        popup();
    }
});

function popup() {
    document.getElementById("popup").style.display = "flex";
    document.getElementById("signin").style.display = "none";
}

function closePopup() {
    userName.value = "";
    password.value = "";

    document.getElementById("popup").style.display = "none";
    document.getElementById("signin").style.display = "block";
}


function readCookie() {
    const cookieData = document.cookie.split("; ");
    const userName = cookieData[0].split(" ");
    const password = cookieData[1].split(" ");
    user.innerHTML = userName;
    pass.innerHTML = password;
    console.log(document.cookie);
}
function showError(message) {
    error.style.display = "block";
    error.innerHTML = message;
    setTimeout(() => {
        error.style.display = "none";
    }, 1900);
}

userName.oninput = function () {
    error.innerHTML = "";
    error.style.display = "none";
};

password.oninput = function () {
    error.innerHTML = "";
    error.style.display = "none";
};


