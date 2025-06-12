const capitals = [
    { country: "🇮🇸 Island", capital: "Reykjavik" },
    { country: "🇳🇴 Norwegen", capital: "Oslo" },
    { country: "🇸🇪 Schweden", capital: "Stockholm" },
    { country: "🇫🇮 Finnland", capital: "Helsinki" },
    { country: "🇷🇺 Russland", capital: "Moskau" },
    { country: "🇩🇰 Dänemark", capital: "Kopenhagen" },
    { country: "🇩🇪 Deutschland", capital: "Berlin" },
    { country: "🇵🇱 Polen", capital: "Warschau" },
    { country: "🇨🇭 Schweiz", capital: "Bern" },
    { country: "🇦🇹 Österreich", capital: "Wien" },
    { country: "🇫🇷 Frankreich", capital: "Paris" },
    { country: "🇮🇪 Irland", capital: "Dublin" },
    { country: "🇬🇧 Vereinigtes Königreich", capital: "London" },
    { country: "🇪🇸 Spanien", capital: "Madrid" },
    { country: "🇵🇹 Portugal", capital: "Lissabon" },
    { country: "🇮🇹 Italien", capital: "Rom" },
    { country: "🇪🇪 Estland", capital: "Tallinn" },
    { country: "🇱🇻 Lettland", capital: "Riga" },
    { country: "🇱🇹 Litauen", capital: "Vilnius" },
    { country: "🇧🇾 Weißrussland", capital: "Minsk" },
    { country: "🇺🇦 Ukraine", capital: "Kyjiw" },
    { country: "🇨🇿 Tschechien", capital: "Prag" },
    { country: "🇸🇰 Slowakei", capital: "Bratislava" },
    { country: "🇭🇺 Ungarn", capital: "Budapest" },
    { country: "🇷🇴 Rumänien", capital: "Bukarest" },
    { country: "🇸🇮 Slowenien", capital: "Ljubljana" },
    { country: "🇭🇷 Kroatien", capital: "Zagreb" },
    { country: "🇷🇸 Serbien", capital: "Belgrad" },
    { country: "🇧🇦 Bosnien und Herzegowina", capital: "Sarajevo" },
    { country: "🇧🇬 Bulgarien", capital: "Sofia" },
    { country: "🇲🇪 Montenegro", capital: "Podgorica" },
    { country: "🇦🇱 Albanien", capital: "Tirana" },
    { country: "🇬🇷 Griechenland", capital: "Athen" },
    { country: "🇹🇷 Türkei", capital: "Ankara" },
    { country: "🇲🇩 Moldawien", capital: "Chisinau" },
    { country: "🇲🇰 Mazedonien", capital: "Skopje" },
    { country: "🇳🇱 Niederlande", capital: "Amsterdam" },
    { country: "🇧🇪 Belgien", capital: "Brüssel" },
    { country: "🇱🇺 Luxemburg", capital: "Luxemburg" }
];

let currentCardIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let timer;
let timeLeft = 7;
let isShowingAnswer = false;
let shuffledCapitals = [];
let timerDuration = 7; // Default to "Schnell"
let quizMode = 'classic'; // 'classic' or 'multiple'
let mcTimerInterval;
let mcTimeLeft = 10;
let currentChoices = [];
let QUIZ_LENGTH = 10; // Default quiz length
let autoProgressTimer; // Timer for auto-progression
let autoProgressSeconds = 5; // Seconds before auto-progression

const flashCard = document.getElementById('flash-card');
const countryName = document.getElementById('country-name');
const capitalName = document.getElementById('capital-name');
const timerDisplay = document.getElementById('timer');
const showAnswerBtn = document.getElementById('show-answer');
const answerButtons = document.getElementById('answer-buttons');
const correctBtn = document.getElementById('correct-btn');
const wrongBtn = document.getElementById('wrong-btn');
const nextCardBtn = document.getElementById('next-card');
const correctScore = document.getElementById('correct-score');
const wrongScore = document.getElementById('wrong-score');
const totalScore = document.getElementById('total-score');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const resetBtn = document.getElementById('reset-btn');
const startBtn = document.getElementById('start-quiz');
const startScreen = document.getElementById('start-screen');
const quizContent = document.getElementById('quiz-content');
const classicMode = document.getElementById('classic-mode');
const multipleChoiceMode = document.getElementById('multiple-choice-mode');
const mcCountry = document.getElementById('mc-country');
const mcTimerDisplay = document.getElementById('mc-timer');
const choicesGrid = document.getElementById('choices-grid');
const mcNextBtn = document.getElementById('mc-next');
const resultsScreen = document.getElementById('results-screen');
const resultsCorrect = document.getElementById('results-correct');
const resultsWrong = document.getElementById('results-wrong');
const resultsPercentage = document.getElementById('results-percentage');
const resultsMessage = document.getElementById('results-message');
const playAgainBtn = document.getElementById('play-again');
const confettiCanvas = document.getElementById('confetti-canvas');

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function initializeQuiz() {
    shuffledCapitals = shuffleArray(capitals).slice(0, QUIZ_LENGTH); // Take only selected number of questions
    currentCardIndex = 0;
    correctCount = 0;
    wrongCount = 0;
    updateScores();
    startScreen.style.display = 'none';
    quizContent.style.display = 'block';
    progressContainer.style.display = 'block';
    resetBtn.style.display = 'block';
    
    if (quizMode === 'classic') {
        classicMode.style.display = 'block';
        multipleChoiceMode.style.display = 'none';
        showNextCard();
    } else {
        classicMode.style.display = 'none';
        multipleChoiceMode.style.display = 'block';
        showNextMultipleChoice();
    }
}

function startTimer() {
    timeLeft = timerDuration;
    timerDisplay.textContent = timeLeft;
    timerDisplay.classList.remove('warning');
    
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        
        if (timeLeft <= 2) {
            timerDisplay.classList.add('warning');
        }
        
        if (timeLeft === 0) {
            clearInterval(timer);
            showAnswer();
        }
    }, 1000);
}

function showAnswer() {
    clearInterval(timer);
    flashCard.classList.add('flipped');
    showAnswerBtn.style.display = 'none';
    answerButtons.style.display = 'flex';
    isShowingAnswer = true;
}

function showNextCard() {
    if (currentCardIndex >= shuffledCapitals.length) {
        showQuizComplete();
        return;
    }
    
    // First remove the flipped class to start the flip back animation
    flashCard.classList.remove('flipped');
    
    // Wait for the flip animation to complete before updating content
    setTimeout(() => {
        const currentCard = shuffledCapitals[currentCardIndex];
        countryName.textContent = currentCard.country;
        capitalName.textContent = currentCard.capital;
        
        showAnswerBtn.style.display = 'block';
        answerButtons.style.display = 'none';
        nextCardBtn.style.display = 'none';
        isShowingAnswer = false;
        
        updateProgress();
        startTimer();
    }, 300); // Wait 300ms for flip animation to reach halfway point
}

function handleAnswer(isCorrect) {
    if (isCorrect) {
        correctCount++;
    } else {
        wrongCount++;
    }
    
    updateScores();
    answerButtons.style.display = 'none';
    nextCardBtn.style.display = 'block';
    startAutoProgress();
}

function updateScores() {
    correctScore.textContent = correctCount;
    wrongScore.textContent = wrongCount;
    totalScore.textContent = correctCount + wrongCount;
}

function updateProgress() {
    const progress = ((currentCardIndex + 1) / shuffledCapitals.length) * 100;
    progressBar.style.width = `${progress}%`;
}

showAnswerBtn.addEventListener('click', showAnswer);

correctBtn.addEventListener('click', () => {
    handleAnswer(true);
});

wrongBtn.addEventListener('click', () => {
    handleAnswer(false);
});

nextCardBtn.addEventListener('click', () => {
    clearInterval(autoProgressTimer);
    nextCardBtn.classList.remove('auto-progress');
    currentCardIndex++;
    showNextCard();
});

resetBtn.addEventListener('click', () => {
    if (confirm('Möchten Sie das Quiz wirklich zurücksetzen?')) {
        clearInterval(timer);
        clearInterval(mcTimerInterval);
        startScreen.style.display = 'block';
        quizContent.style.display = 'none';
        progressContainer.style.display = 'none';
        resetBtn.style.display = 'none';
        correctCount = 0;
        wrongCount = 0;
        updateScores();
        progressBar.style.width = '0%';
    }
});

startBtn.addEventListener('click', () => {
    initializeQuiz();
});

// Mode selection
document.querySelectorAll('.mode-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const clickedButton = e.currentTarget;
        
        // Don't do anything if already selected
        if (clickedButton.classList.contains('active')) return;
        
        // Remove active class from all buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button immediately
        clickedButton.classList.add('active');
        
        // Update quiz mode
        quizMode = clickedButton.dataset.mode;
        
        // Visual feedback
        clickedButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            clickedButton.style.transform = '';
        }, 150);
    });
});

document.addEventListener('keydown', (e) => {
    // Only handle keyboard shortcuts when quiz is active
    if (quizContent.style.display === 'none') return;
    
    if (quizMode === 'classic') {
        if (e.key === ' ' && !isShowingAnswer) {
            e.preventDefault();
            showAnswer();
        } else if (e.key === 'ArrowRight' && nextCardBtn.style.display !== 'none') {
            currentCardIndex++;
            showNextCard();
        } else if (e.key === 'ArrowUp' && answerButtons.style.display !== 'none') {
            handleAnswer(true);
        } else if (e.key === 'ArrowDown' && answerButtons.style.display !== 'none') {
            handleAnswer(false);
        }
    }
});

// Timer speed options
document.querySelectorAll('.timer-option').forEach(button => {
    button.addEventListener('click', (e) => {
        // Remove active class from all buttons
        document.querySelectorAll('.timer-option').forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        e.target.classList.add('active');
        // Update timer duration
        timerDuration = parseInt(e.target.dataset.speed);
    });
});

// Question count options
document.querySelectorAll('.question-count-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        // Remove active class from all buttons
        document.querySelectorAll('.question-count-btn').forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        e.target.classList.add('active');
        // Update quiz length
        QUIZ_LENGTH = parseInt(e.target.dataset.count);
    });
});

// Multiple Choice Functions
function getRandomCapitals(exclude, count) {
    const available = capitals.filter(c => c.capital !== exclude);
    const shuffled = shuffleArray(available);
    return shuffled.slice(0, count).map(c => c.capital);
}

function showNextMultipleChoice() {
    if (currentCardIndex >= shuffledCapitals.length) {
        showQuizComplete();
        return;
    }
    
    const currentCard = shuffledCapitals[currentCardIndex];
    mcCountry.textContent = currentCard.country;
    
    // Generate choices
    const wrongChoices = getRandomCapitals(currentCard.capital, 3);
    currentChoices = [currentCard.capital, ...wrongChoices];
    currentChoices = shuffleArray(currentChoices);
    
    // Clear and populate choices grid
    choicesGrid.innerHTML = '';
    currentChoices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = choice;
        button.onclick = () => handleMultipleChoice(choice, currentCard.capital);
        choicesGrid.appendChild(button);
    });
    
    mcNextBtn.style.display = 'none';
    updateProgress();
    startMCTimer();
}

function startMCTimer() {
    mcTimeLeft = timerDuration;
    mcTimerDisplay.textContent = mcTimeLeft;
    mcTimerDisplay.classList.remove('warning');
    
    mcTimerInterval = setInterval(() => {
        mcTimeLeft--;
        mcTimerDisplay.textContent = mcTimeLeft;
        
        if (mcTimeLeft <= Math.ceil(timerDuration * 0.3)) {
            mcTimerDisplay.classList.add('warning');
        }
        
        if (mcTimeLeft === 0) {
            clearInterval(mcTimerInterval);
            handleMultipleChoice(null, shuffledCapitals[currentCardIndex].capital);
        }
    }, 1000);
}

function handleMultipleChoice(selected, correct) {
    clearInterval(mcTimerInterval);
    
    // Show correct/wrong answers
    const buttons = choicesGrid.querySelectorAll('.choice-btn');
    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correct) {
            btn.classList.add('correct');
        } else if (btn.textContent === selected) {
            btn.classList.add('wrong');
        }
    });
    
    if (selected === correct) {
        correctCount++;
    } else {
        wrongCount++;
    }
    
    updateScores();
    mcNextBtn.style.display = 'block';
    startAutoProgressMC();
}

mcNextBtn.addEventListener('click', () => {
    clearInterval(autoProgressTimer);
    mcNextBtn.classList.remove('auto-progress');
    currentCardIndex++;
    showNextMultipleChoice();
});

playAgainBtn.addEventListener('click', () => {
    // Reset everything and go back to start screen
    resultsScreen.style.display = 'none';
    startScreen.style.display = 'block';
    quizContent.style.display = 'none';
    progressContainer.style.display = 'none';
    resetBtn.style.display = 'none';
    correctCount = 0;
    wrongCount = 0;
    updateScores();
    progressBar.style.width = '0%';
});

// Confetti Animation
function createConfetti() {
    const canvas = confettiCanvas;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiPieces = [];
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#ffd700'];
    
    // Create confetti pieces
    for (let i = 0; i < 150; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 10 + 5,
            h: Math.random() * 5 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 3 + 2,
            rotate: Math.random() * 360,
            rotateSpeed: Math.random() * 10 - 5
        });
    }
    
    let animationId;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confettiPieces.forEach((piece, index) => {
            piece.y += piece.speed;
            piece.rotate += piece.rotateSpeed;
            
            ctx.save();
            ctx.translate(piece.x + piece.w / 2, piece.y + piece.h / 2);
            ctx.rotate(piece.rotate * Math.PI / 180);
            ctx.fillStyle = piece.color;
            ctx.fillRect(-piece.w / 2, -piece.h / 2, piece.w, piece.h);
            ctx.restore();
            
            if (piece.y > canvas.height) {
                confettiPieces.splice(index, 1);
            }
        });
        
        if (confettiPieces.length > 0) {
            animationId = requestAnimationFrame(animate);
        }
    }
    
    animate();
    
    // Stop animation after 5 seconds
    setTimeout(() => {
        cancelAnimationFrame(animationId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 5000);
}

// Rain Animation for lower scores
function createRainAnimation() {
    const canvas = confettiCanvas;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const raindrops = [];
    const colors = ['#a0aec0', '#718096', '#4a5568', '#2d3748'];
    
    // Create raindrops
    for (let i = 0; i < 100; i++) {
        raindrops.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            length: Math.random() * 20 + 10,
            opacity: Math.random() * 0.5 + 0.3,
            speed: Math.random() * 5 + 5,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }
    
    let animationId;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        raindrops.forEach((drop, index) => {
            drop.y += drop.speed;
            
            ctx.beginPath();
            ctx.moveTo(drop.x, drop.y);
            ctx.lineTo(drop.x, drop.y + drop.length);
            ctx.strokeStyle = drop.color;
            ctx.lineWidth = 2;
            ctx.globalAlpha = drop.opacity;
            ctx.stroke();
            ctx.globalAlpha = 1;
            
            // Create splash effect when hitting bottom
            if (drop.y > canvas.height - 50) {
                ctx.beginPath();
                ctx.arc(drop.x, canvas.height - 40, (drop.y - (canvas.height - 50)) * 0.5, 0, Math.PI * 2);
                ctx.strokeStyle = drop.color;
                ctx.globalAlpha = drop.opacity * 0.5;
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
            
            if (drop.y > canvas.height) {
                // Reset raindrop to top
                drop.y = -drop.length;
                drop.x = Math.random() * canvas.width;
            }
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
    
    // Stop animation after 5 seconds
    setTimeout(() => {
        cancelAnimationFrame(animationId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 5000);
}

// Function to show quiz completion
function showQuizComplete() {
    clearInterval(timer);
    clearInterval(mcTimerInterval);
    
    const percentage = Math.round((correctCount / QUIZ_LENGTH) * 100);
    
    // Update results screen
    resultsCorrect.textContent = correctCount;
    resultsWrong.textContent = wrongCount;
    resultsPercentage.textContent = percentage;
    
    let message = '';
    if (percentage >= 90) {
        message = 'Ausgezeichnet! 🌟';
    } else if (percentage >= 70) {
        message = 'Sehr gut! 👏';
    } else if (percentage >= 50) {
        message = 'Gut gemacht! 👍';
    } else {
        message = 'Weiter üben! 💪';
    }
    resultsMessage.textContent = message;
    
    // Hide game modes and show results
    classicMode.style.display = 'none';
    multipleChoiceMode.style.display = 'none';
    resultsScreen.style.display = 'block';
    progressContainer.style.display = 'none';
    resetBtn.style.display = 'none';
    
    // Start animation based on score
    if (percentage >= 70) {
        createConfetti();
    } else {
        createRainAnimation();
    }
}

// Auto-progress functions
function startAutoProgress() {
    let secondsLeft = autoProgressSeconds;
    updateButtonText(nextCardBtn, 'Nächste Karte', secondsLeft);
    nextCardBtn.classList.add('auto-progress');
    
    autoProgressTimer = setInterval(() => {
        secondsLeft--;
        updateButtonText(nextCardBtn, 'Nächste Karte', secondsLeft);
        
        if (secondsLeft === 0) {
            clearInterval(autoProgressTimer);
            nextCardBtn.classList.remove('auto-progress');
            currentCardIndex++;
            showNextCard();
        }
    }, 1000);
}

function startAutoProgressMC() {
    let secondsLeft = autoProgressSeconds;
    updateButtonText(mcNextBtn, 'Nächste Frage', secondsLeft);
    mcNextBtn.classList.add('auto-progress');
    
    autoProgressTimer = setInterval(() => {
        secondsLeft--;
        updateButtonText(mcNextBtn, 'Nächste Frage', secondsLeft);
        
        if (secondsLeft === 0) {
            clearInterval(autoProgressTimer);
            mcNextBtn.classList.remove('auto-progress');
            currentCardIndex++;
            showNextMultipleChoice();
        }
    }, 1000);
}

function updateButtonText(button, baseText, seconds) {
    button.textContent = `${baseText} (${seconds})`;
}