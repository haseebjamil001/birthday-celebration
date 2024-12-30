  // Initialize AOS
  AOS.init({
    duration: 1000,
    once: true
});

let currentStep = 1;
const totalSteps = 5;

function updateProgressBar(step) {
    const progressBar = document.querySelector('.progress-bar');
    const percentage = (step / totalSteps) * 100;
    progressBar.style.width = percentage + '%';
    progressBar.setAttribute('aria-valuenow', percentage);
}

function updateStepIndicators(step) {
    for (let i = 1; i <= totalSteps; i++) {
        const indicator = document.getElementById('indicator-' + i);
        if (i <= step) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    }
}

function showStep(step) {
    // Hide all steps
    for (let i = 1; i <= totalSteps; i++) {
        document.getElementById('step-' + i).classList.remove('active');
    }
    // Show the current step
    document.getElementById('step-' + step).classList.add('active');
    // Update progress bar and indicators
    updateProgressBar(step);
    updateStepIndicators(step);
}

function nextStep() {
    if (currentStep < totalSteps) {
        // Validate current step before proceeding
        if (!validateStep(currentStep)) {
            return;
        }
        currentStep++;
        showStep(currentStep);
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

function completeSteps() {
    // Validate the last step
    if (!validateStep(currentStep)) {
        return;
    }

    // Capture user inputs
    const userName = document.getElementById('userName').value.trim();
    const celebrationActivity = document.getElementById('celebrationActivity').value;
    const userAge = document.getElementById('userAge').value.trim();

    // Simple validation
    if (userName === '' || celebrationActivity === '' || userAge === '') {
        alert('Please complete all fields before proceeding.');
        return;
    }

    // Store the user inputs in localStorage
    localStorage.setItem('userName', userName);
    localStorage.setItem('celebrationActivity', celebrationActivity);
    localStorage.setItem('userAge', userAge);

    // Redirect to the celebration page
    window.location.href = 'wish.html';
}

function validateStep(step) {
    if (step === 2) {
        const userName = document.getElementById('userName').value.trim();
        if (userName === '') {
            alert('Please enter your name to proceed.');
            return false;
        }
    }
    if (step === 3) {
        const celebrationActivity = document.getElementById('celebrationActivity').value;
        if (celebrationActivity === '' || celebrationActivity === 'Select an option') {
            alert('Please select a celebration activity.');
            return false;
        }
    }
    if (step === 4) {
        const userAge = document.getElementById('userAge').value.trim();
        if (userAge === '' || userAge <= 0) {
            alert('Please enter a valid age.');
            return false;
        }
    }
    return true;
}