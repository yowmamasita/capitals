const capitals = [
    { country: "🇮🇸 Island", capital: "Reykjavik", code: "is" },
    { country: "🇳🇴 Norwegen", capital: "Oslo", code: "no" },
    { country: "🇸🇪 Schweden", capital: "Stockholm", code: "se" },
    { country: "🇫🇮 Finnland", capital: "Helsinki", code: "fi" },
    { country: "🇷🇺 Russland", capital: "Moskau", code: "ru" },
    { country: "🇩🇰 Dänemark", capital: "Kopenhagen", code: "dk" },
    { country: "🇩🇪 Deutschland", capital: "Berlin", code: "de" },
    { country: "🇵🇱 Polen", capital: "Warschau", code: "pl" },
    { country: "🇨🇭 Schweiz", capital: "Bern", code: "ch" },
    { country: "🇦🇹 Österreich", capital: "Wien", code: "at" },
    { country: "🇫🇷 Frankreich", capital: "Paris", code: "fr" },
    { country: "🇮🇪 Irland", capital: "Dublin", code: "ie" },
    { country: "🇬🇧 Vereinigtes Königreich", capital: "London", code: "gb" },
    { country: "🇪🇸 Spanien", capital: "Madrid", code: "es" },
    { country: "🇵🇹 Portugal", capital: "Lissabon", code: "pt" },
    { country: "🇮🇹 Italien", capital: "Rom", code: "it" },
    { country: "🇪🇪 Estland", capital: "Tallinn", code: "ee" },
    { country: "🇱🇻 Lettland", capital: "Riga", code: "lv" },
    { country: "🇱🇹 Litauen", capital: "Vilnius", code: "lt" },
    { country: "🇧🇾 Weißrussland", capital: "Minsk", code: "by" },
    { country: "🇺🇦 Ukraine", capital: "Kyjiw", code: "ua" },
    { country: "🇨🇿 Tschechien", capital: "Prag", code: "cz" },
    { country: "🇸🇰 Slowakei", capital: "Bratislava", code: "sk" },
    { country: "🇭🇺 Ungarn", capital: "Budapest", code: "hu" },
    { country: "🇷🇴 Rumänien", capital: "Bukarest", code: "ro" },
    { country: "🇸🇮 Slowenien", capital: "Ljubljana", code: "si" },
    { country: "🇭🇷 Kroatien", capital: "Zagreb", code: "hr" },
    { country: "🇷🇸 Serbien", capital: "Belgrad", code: "rs" },
    { country: "🇧🇦 Bosnien und Herzegowina", capital: "Sarajevo", code: "ba" },
    { country: "🇧🇬 Bulgarien", capital: "Sofia", code: "bg" },
    { country: "🇲🇪 Montenegro", capital: "Podgorica", code: "me" },
    { country: "🇦🇱 Albanien", capital: "Tirana", code: "al" },
    { country: "🇬🇷 Griechenland", capital: "Athen", code: "gr" },
    { country: "🇹🇷 Türkei", capital: "Ankara", code: "tr" },
    { country: "🇲🇩 Moldawien", capital: "Chisinau", code: "md" },
    { country: "🇲🇰 Mazedonien", capital: "Skopje", code: "mk" },
    { country: "🇳🇱 Niederlande", capital: "Amsterdam", code: "nl" },
    { country: "🇧🇪 Belgien", capital: "Brüssel", code: "be" },
    { country: "🇱🇺 Luxemburg", capital: "Luxemburg", code: "lu" }
];

let currentCardIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let timer;
let timeLeft = 7;
let isShowingAnswer = false;
let shuffledCapitals = [];
let timerDuration = 7; // Default to "Schnell"
let quizMode = 'classic'; // 'classic' or 'multiple' or 'shape'
let mcTimerInterval;
let mcTimeLeft = 10;
let currentChoices = [];
let QUIZ_LENGTH = 10; // Default quiz length
let autoProgressTimer; // Timer for auto-progression
let autoProgressSeconds = 5; // Seconds before auto-progression
let shapeTimerInterval;
let shapeTimeLeft = 10;
let currentShapeAnswer = null;

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
const shapeMode = document.getElementById('shape-mode');
const shapeDisplay = document.getElementById('shape-display');
const shapeTimerDisplay = document.getElementById('shape-timer');
const countryInput = document.getElementById('country-input');
const capitalInput = document.getElementById('capital-input');
const submitAnswerBtn = document.getElementById('submit-answer');
const shapeFeedback = document.getElementById('shape-feedback');
const feedbackText = document.getElementById('feedback-text');
const shapeNextBtn = document.getElementById('shape-next');

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
        shapeMode.style.display = 'none';
        showNextCard();
    } else if (quizMode === 'multiple') {
        classicMode.style.display = 'none';
        multipleChoiceMode.style.display = 'block';
        shapeMode.style.display = 'none';
        showNextMultipleChoice();
    } else if (quizMode === 'shape') {
        classicMode.style.display = 'none';
        multipleChoiceMode.style.display = 'none';
        shapeMode.style.display = 'block';
        showNextShape();
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
        clearInterval(shapeTimerInterval);
        clearInterval(autoProgressTimer);
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

// Shape mode event listeners
submitAnswerBtn.addEventListener('click', () => {
    submitShapeAnswer();
});

// Allow Enter key to submit answer
countryInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (capitalInput.value.trim()) {
            submitShapeAnswer();
        } else {
            capitalInput.focus();
        }
    }
});

capitalInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        submitShapeAnswer();
    }
});

shapeNextBtn.addEventListener('click', () => {
    clearInterval(autoProgressTimer);
    shapeNextBtn.classList.remove('auto-progress');
    currentCardIndex++;
    showNextShape();
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
    shapeMode.style.display = 'none';
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

// Shape Mode Functions
function showNextShape() {
    if (currentCardIndex >= shuffledCapitals.length) {
        showQuizComplete();
        return;
    }
    
    currentShapeAnswer = shuffledCapitals[currentCardIndex];
    
    // Clear previous inputs and feedback
    countryInput.value = '';
    capitalInput.value = '';
    shapeFeedback.style.display = 'none';
    shapeFeedback.classList.remove('correct', 'incorrect');
    submitAnswerBtn.style.display = 'block';
    shapeNextBtn.style.display = 'none';
    
    // Display country shape using mapsicon
    shapeDisplay.innerHTML = `<span class="map-icon map-icon-${currentShapeAnswer.code}"></span>`;
    
    updateProgress();
    startShapeTimer();
}

function startShapeTimer() {
    shapeTimeLeft = 10;
    shapeTimerDisplay.textContent = shapeTimeLeft;
    
    shapeTimerInterval = setInterval(() => {
        shapeTimeLeft--;
        shapeTimerDisplay.textContent = shapeTimeLeft;
        
        if (shapeTimeLeft === 0) {
            clearInterval(shapeTimerInterval);
            submitShapeAnswer();
        }
    }, 1000);
}

function submitShapeAnswer() {
    clearInterval(shapeTimerInterval);
    
    const countryGuess = countryInput.value.trim().toLowerCase();
    const capitalGuess = capitalInput.value.trim().toLowerCase();
    
    // Remove emoji and trim the country name for comparison
    const correctCountry = currentShapeAnswer.country.split(' ').slice(1).join(' ').toLowerCase();
    const correctCapital = currentShapeAnswer.capital.toLowerCase();
    
    const countryCorrect = countryGuess === correctCountry || 
                          countryGuess === correctCountry.replace('ä', 'ae')
                                                      .replace('ö', 'oe')
                                                      .replace('ü', 'ue')
                                                      .replace('ß', 'ss');
    
    const capitalCorrect = capitalGuess === correctCapital || 
                          capitalGuess === correctCapital.replace('ä', 'ae')
                                                        .replace('ö', 'oe')
                                                        .replace('ü', 'ue')
                                                        .replace('ß', 'ss');
    
    if (countryCorrect && capitalCorrect) {
        correctCount++;
        shapeFeedback.classList.add('correct');
        feedbackText.textContent = `Richtig! ${currentShapeAnswer.country} - ${currentShapeAnswer.capital}`;
    } else {
        wrongCount++;
        shapeFeedback.classList.add('incorrect');
        if (!countryCorrect && !capitalCorrect) {
            feedbackText.textContent = `Falsch! Es war ${currentShapeAnswer.country} - ${currentShapeAnswer.capital}`;
        } else if (countryCorrect) {
            feedbackText.textContent = `Teilweise richtig! Land: ✓ ${currentShapeAnswer.country}, Hauptstadt: ✗ ${currentShapeAnswer.capital}`;
        } else {
            feedbackText.textContent = `Teilweise richtig! Land: ✗ ${currentShapeAnswer.country}, Hauptstadt: ✓ ${currentShapeAnswer.capital}`;
        }
    }
    
    updateScores();
    shapeFeedback.style.display = 'block';
    submitAnswerBtn.style.display = 'none';
    shapeNextBtn.style.display = 'block';
    startAutoProgressShape();
}

function startAutoProgressShape() {
    let secondsLeft = autoProgressSeconds;
    updateButtonText(shapeNextBtn, 'Nächste Frage', secondsLeft);
    shapeNextBtn.classList.add('auto-progress');
    
    autoProgressTimer = setInterval(() => {
        secondsLeft--;
        updateButtonText(shapeNextBtn, 'Nächste Frage', secondsLeft);
        
        if (secondsLeft === 0) {
            clearInterval(autoProgressTimer);
            shapeNextBtn.classList.remove('auto-progress');
            currentCardIndex++;
            showNextShape();
        }
    }, 1000);
}