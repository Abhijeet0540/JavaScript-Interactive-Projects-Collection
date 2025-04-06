let genrateOtpBtn = document.getElementById('genrateotp');
let otpVerify = document.getElementById('otpverify');
// let otperror = document.getElementById('otperror');
let genratetext = document.getElementById('genratetext');
let seconds = document.getElementById('seconds');
let genrateotp = document.getElementById('otpsend');


function genrateOtp() {
    let currentOtp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
    localStorage.setItem('currentOtp', currentOtp);
    genratetext.innerText = `OTP sent successfully: ${currentOtp}`;

}

genrateOtpBtn.addEventListener('click', () => {
    let count = 30; // countdown time to 30 seconds
    genrateOtpBtn.innerText = `RESEND OTP`;
    genrateOtpBtn.disabled = true;

    let timer = setInterval(() => {
        count--;
        if (count >= 10) {
            seconds.innerText = `Resend OTP in 00:${count}`;
            seconds.style.display = 'center';
            otpverify.style.color = 'white';
            otpverify.style.backgroundColor = 'green';
        } else {
            seconds.innerText = `Resend OTP in 00:0${count}`;
        }
        if (count === 0) {
            clearInterval(timer);
            genrateOtpBtn.innerText = 'RESEND OTP';
            genrateOtpBtn.disabled = false; // Enable the button 
            genrateOtpBtn.style.color = 'white';
            seconds.innerText = '';
        }
    }, 1000);
    // Call the function 
    genrateOtp();
});
otpVerify.addEventListener('click', () => {
    let currentOtp = localStorage.getItem('currentOtp');
    let enteredOtp = document.getElementById('otp').value;
    let otperror = document.getElementById('otperror');

    if (currentOtp === enteredOtp) {
        otperror.innerText = 'OTP verified successfully!';
        genrateOtpBtn.innerText = 'GENERATE OTP';
        genrateOtpBtn.disabled = true; // Disable button after verification
        window.location.href = 'index1.html';
    } else {
        otperror.textContent = 'Invalid OTP. Please try again.';
        otperror.style.color = 'red';
    }
});
reload.onclick = function() {
    window.location.reload();
    otperror.innerText = '';
}