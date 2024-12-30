// ./js/scripts.js

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true
    });

    // Audio Controls
    const audio = document.getElementById('background-audio');
    let isPlaying = false;

    function togglePlayPause() {
        const playPauseBtn = document.getElementById('playPauseBtn');
        if (isPlaying) {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i> Play Music';
        } else {
            audio.play().catch(function (error) {
                console.log('Autoplay was prevented.');
            });
            playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i> Pause Music';
        }
        isPlaying = !isPlaying;
    }

    document.getElementById('playPauseBtn').addEventListener('click', togglePlayPause);

    // Handle Start Music Button in Overlay
    const startMusicBtn = document.getElementById('start-music-btn');
    if (startMusicBtn) {
        startMusicBtn.addEventListener('click', () => {
            audio.play().then(() => {
                isPlaying = true;
                document.getElementById('playPauseBtn').innerHTML = '<i class="bi bi-pause-fill"></i> Pause Music';
                // Hide the overlay
                const audioOverlay = document.getElementById('audio-overlay');
                if (audioOverlay) {
                    audioOverlay.style.display = 'none';
                }
            }).catch((error) => {
                console.log('Autoplay was prevented:', error);
            });
        });
    }

    // Attempt to Autoplay Audio on Load (Requires User Interaction)
    window.onload = function () {
        // Audio will attempt to play after a short delay
        setTimeout(() => {
            audio.play().then(() => {
                isPlaying = true;
                document.getElementById('playPauseBtn').innerHTML = '<i class="bi bi-pause-fill"></i> Pause Music';
                // Hide the audio overlay if present
                const audioOverlay = document.getElementById('audio-overlay');
                if (audioOverlay) {
                    audioOverlay.style.display = 'none';
                }
            }).catch(function (error) {
                console.log('Autoplay was prevented.');
                // Show the audio overlay to prompt user interaction
                const audioOverlay = document.getElementById('audio-overlay');
                if (audioOverlay) {
                    audioOverlay.style.display = 'flex';
                }
            });
        }, 1000); // 1-second delay
    };

    // Countdown Timer
    function countdown() {
        const birthdayDate = new Date('2025-01-01T00:00:00').getTime(); // Set your birthday date and time
        const now = new Date().getTime();
        const distance = birthdayDate - now;

        if (distance < 0) {
            document.getElementById('timer').innerHTML = "It's your special day!";
            clearInterval(interval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days;
        document.getElementById('hours').innerText = hours;
        document.getElementById('minutes').innerText = minutes;
        document.getElementById('seconds').innerText = seconds;
    }

    const interval = setInterval(countdown, 1000);
    countdown(); // Initial call

    // Reveal Birthday with Confetti Animation and Show Animated Text
    function revealBirthday() {
        // Display the birthday reveal section
        var birthdayReveal = document.getElementById('birthday-reveal');
        birthdayReveal.style.display = 'block';

        // Trigger Confetti
        confetti({
            particleCount: 500,
            spread: 70,
            origin: { y: 0.6 }
        });

        // Refresh AOS to animate the revealed section
        AOS.refresh();

        // Remove cursor after typing animation completes
        var typingElements = document.querySelectorAll('.typing');

        typingElements.forEach(function (element, index) {
            // Calculate the total delay (typing duration + animation delay)
            var totalDelay = 2000 + (index * 2000); // 2s typing duration + 2s per message

            // Remove the cursor after the typing animation
            setTimeout(function () {
                element.style.borderRight = 'none';
                element.style.whiteSpace = 'normal'; // Allow wrapping if needed
            }, totalDelay); // Milliseconds
        });

        // Show the Reveal Button after all typing animations
        var totalMessages = typingElements.length;
        var totalTime = 2000 + (totalMessages * 2000) + 1000; // 2s + (messages * 2s) + 1s buffer

        setTimeout(() => {
            document.getElementById('revealBtnContainer').classList.remove('hidden');
            document.getElementById('revealBtnContainer').classList.add('visible');
        }, totalTime); // Adjust as needed
    }

    // Reveal Button Functionality
    function revealAdditionalMessages() {
        // Display additional messages or animations
        // For example, show another confetti burst
        confetti({
            particleCount: 500,
            spread: 70,
            origin: { y: 0.6 }
        });

        // Optionally, display more messages or perform other actions
        // alert("Thank you for celebrating with us!");
    }

    // Event Listener for "Click Me" Button
    const clickMeBtn = document.getElementById('clickMeBtn');
    clickMeBtn.addEventListener('click', () => {
        // Trigger the birthday reveal
        revealBirthday();
        // Hide the "Click Me" button after clicking
        clickMeBtn.style.display = 'none';
    });

    // Event Listener for "Reveal" Button
    const revealBtn = document.getElementById('revealBtn');
    revealBtn.addEventListener('click', () => {
        revealAdditionalMessages();
        // Hide the "Reveal" button after clicking
        revealBtn.parentElement.classList.add('hidden');
    });
});
