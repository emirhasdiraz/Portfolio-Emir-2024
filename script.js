
// Function to load the website, hide loading message, and show content
function loadWebsite() {
    document.getElementById('content').style.display = 'block';
    document.getElementById('loadingMessage').style.display = 'none';
    document.body.style.overflow = 'hidden'; // Disable scrolling during animations

    // Run matrix falling effect every 33 milliseconds
    setInterval(matrixEffect, 33);

    // Animation duration
    setTimeout(function () {
        document.body.style.overflow = 'auto'; // Enable scrolling after animation
        document.body.classList.add('scrollable');
    }, 12000); // Adjust duration time until you can scroll
}

// Matrix effect variables and initialization
var q = document.getElementById('matrix'),
    s = window.screen,
    w = q.width = s.width,
    h = q.height = s.height,
    p = Array(256).join(1).split(''),
    c = q.getContext('2d'),
    m = Math,
    duration = 8000,  // Set the duration in milliseconds (8 seconds)
    frontPageDuration = 5000,  // Set the duration for showing the front page in milliseconds (5 seconds)
    startTime = Date.now(),
    matrixTextShown = false,
    frontPageShown = false,
    welcomeMessageTyped = false;

var defaultMatrixText = "Loading...";
var currentMatrixText = defaultMatrixText;

function updateMatrixText() {
    const matrixTextElement = document.getElementById('matrixText');
    const matrixInput = document.getElementById('matrixInput');

    const newText = matrixInput.value || defaultMatrixText;
    matrixTextElement.innerHTML = newText;

    currentMatrixText = newText;

    matrixInput.value = '';
}

// Main matrix falling effect function
function matrixEffect() {
    var currentTime = Date.now() - startTime;

    if (currentTime >= duration + frontPageDuration && !frontPageShown) {
        // After loading effect, clear canvas and show your actual front page
        c.clearRect(0, 0, w, h);
        showFrontPage();
        frontPageShown = true;
    } else if (currentTime >= duration && !matrixTextShown) {
        // After the matrix effect runs for 8 seconds, clear the canvas
        c.clearRect(0, 0, w, h);

        // Display matrix text typing effect for the welcome message
        if (!welcomeMessageTyped) {
            welcomeMessageTyped = true;
            const welcomeMessage = "Welcome.";
            typeMatrixText(welcomeMessage, document.getElementById('loadingMessage'), 50);
        } else {
            // Display matrix text
            const matrixTextElement = document.getElementById('matrixText');
            matrixTextElement.innerHTML = currentMatrixText;
            matrixTextShown = true;
        }
    } else {
        // Matrix falling effect
        c.fillStyle = 'rgba(0, 0, 0, 0.05)';
        c.fillRect(0, 0, w, h);
        c.fillStyle = 'rgba(0, 0, 255, ' + (1 - currentTime / duration) + ')';
        p = p.map(function (v, i) {
            r = m.random();
            var str = String.fromCharCode(2720 + m.floor(r * 33));
            c.fillText(str, i * 10, v);
            v += 10;
            var ret = v > 768 + r * 1e4 ? 0 : v;
            return ret;
        });
    }
}

// Function to show the front page
function showFrontPage() {
    // Display mainpage
    document.getElementById('content').style.display = 'none';  
    document.querySelector('.mainpage').style.display = 'block';  // Show the main page content
}


