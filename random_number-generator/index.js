// Get DOM elements
const button = document.getElementById("button");
const labels1 = document.getElementById("labels1");
const labels2 = document.getElementById("labels2");
const labels3 = document.getElementById("labels3");
const diceElements = document.querySelectorAll(".dice");

// Set dice range (1-6 for standard dice)
const min = 1;
const max = 6;

// Function to animate dice rolling
function animateDice() {
    // Disable button during animation
    button.disabled = true;

    // Add rolling animation class to dice
    diceElements.forEach(dice => {
        dice.style.transform = "rotate(" + (Math.random() * 360) + "deg)";
    });

    // Generate random numbers during animation
    let rollCount = 0;
    const maxRolls = 10;
    const rollInterval = setInterval(() => {
        // Generate random numbers
        const tempNum1 = Math.floor(Math.random() * max) + min;
        const tempNum2 = Math.floor(Math.random() * max) + min;
        const tempNum3 = Math.floor(Math.random() * max) + min;

        // Update labels
        labels1.textContent = tempNum1;
        labels2.textContent = tempNum2;
        labels3.textContent = tempNum3;

        rollCount++;

        // Stop animation after maxRolls
        if (rollCount >= maxRolls) {
            clearInterval(rollInterval);
            finalizeRoll();
        }
    }, 100);
}

// Function to finalize the roll with the actual random numbers
function finalizeRoll() {
    // Generate final random numbers
    const randemNumber1 = Math.floor(Math.random() * max) + min;
    const randemNumber2 = Math.floor(Math.random() * max) + min;
    const randemNumber3 = Math.floor(Math.random() * max) + min;

    // Update labels with final values
    labels1.textContent = randemNumber1;
    labels2.textContent = randemNumber2;
    labels3.textContent = randemNumber3;

    // Reset dice rotation
    diceElements.forEach(dice => {
        dice.style.transform = "rotate(0deg)";
    });

    // Re-enable button
    button.disabled = false;
}

// Main function to roll dice
function mybtn() {
    animateDice();
}