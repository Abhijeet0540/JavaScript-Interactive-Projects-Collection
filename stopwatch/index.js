const timerDisplay = document.getElementById('timer');
const startbtn = document.getElementById('startbtn');
const stopbtn = document.getElementById('stopbtn');
const reversebtn = document.getElementById('reversebtn');
const resetbtn = document.getElementById('resetbtn');

let seconds = 0;
let intervalId = null;
let isReversing = false; // To track if the timer is in reverse mode
let isPaused = false;    // To track if the timer is paused

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function updateTimer() {
    timerDisplay.textContent = formatTime(seconds);
}

function startTimer() {
    if (!intervalId) { // Start only if not already running
        intervalId = setInterval(() => {
            if (isReversing) {
                seconds--;
                if (seconds <= 0) {
                    stopTimer(); // Stop the timer if it reaches 0
                }
            } else {
                seconds++;
                if (seconds >= 60) {
                    stopTimer(); // Stop the timer if it reaches 60
                }
            }
            updateTimer();
        }, 10);
    }
}

function stopTimer() {
    clearInterval(intervalId);
    intervalId = null;
}

function resetTimer() {
    stopTimer();
    seconds = isReversing ? 60 : 0; // Reset to 60 if reversing, otherwise to 0
    updateTimer();
    startbtn.textContent = 'Start';
    reversebtn.textContent = 'Reverse';
    isPaused = false;
}

function togglePause() {
    if (isPaused) {
        startTimer();
        startbtn.textContent = isReversing ? 'Pause' : 'Pause';
        reversebtn.textContent = isReversing ? 'Pause' : 'Pause';
        isPaused = false;
    } else {
        stopTimer(); // Stop the interval, effectively pausing the timer
        startbtn.textContent = isReversing ? 'Resume' : 'Resume';
        reversebtn.textContent = isReversing ? 'Resume' : 'Resume';
        isPaused = true;
    }
}

startbtn.onclick = () => {
    if (isPaused) {
        togglePause(); // Resume the timer
    } else {
        isReversing = false;
        if (!intervalId) { // Only start a new timer if one is not already running
            startTimer();
        }
        startbtn.textContent = 'Pause'; // Change button text to Pause
        reversebtn.textContent = 'Reverse'; // Ensure Reverse button is correct
    }
};

reversebtn.onclick = () => {
    if (isPaused) {
        togglePause(); // Resume the timer
    } else {
        isReversing = true;
        if (!intervalId) { // Only start a new timer if one is not already running
            startTimer();
        }
        reversebtn.textContent = 'Pause'; // Change button text to Pause
        startbtn.textContent = 'Start'; // Ensure Start button is correct
    }
};

resetbtn.onclick = resetTimer;
