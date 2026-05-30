// Dynamic Progress Ring Logic (Responsive Friendly)
const circle = document.querySelector('.progress-ring__circle');
let radius = circle.r.baseVal.value;
let circumference = radius * 2 * Math.PI;

function updateCircumference() {
    radius = circle.r.baseVal.value;
    circumference = radius * 2 * Math.PI;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
}

// Pehle size calculate karein
updateCircumference();

function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
}

// Window resize hone par ring fix karein
window.addEventListener('resize', () => {
    updateCircumference();
    // Re-calculate current progress on resize
    const percentPercentage = (totalSeconds / initialSeconds) * 100;
    setProgress(percentPercentage);
});

// Timer Countdown Functionality
let totalSeconds = 24 * 60 + 59; 
const initialSeconds = 25 * 60; 
const timerDisplay = document.getElementById('timer-countdown');

function updateTimer() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    const percentPercentage = (totalSeconds / initialSeconds) * 100;
    setProgress(percentPercentage);

    if (totalSeconds > 0) {
        totalSeconds--;
    } else {
        clearInterval(timerInterval);
    }
}

const timerInterval = setInterval(updateTimer, 1000);
updateTimer();