const capitals = [
    { country: "Island", capital: "Reykjavik" },
    { country: "Norwegen", capital: "Oslo" },
    { country: "Schweden", capital: "Stockholm" },
    { country: "Finnland", capital: "Helsinki" },
    { country: "Russland", capital: "Moskau" },
    { country: "Dänemark", capital: "Kopenhagen" },
    { country: "Deutschland", capital: "Berlin" },
    { country: "Polen", capital: "Warschau" },
    { country: "Schweiz", capital: "Bern" },
    { country: "Österreich", capital: "Wien" },
    { country: "Frankreich", capital: "Paris" },
    { country: "Irland", capital: "Dublin" },
    { country: "Vereinigtes Königreich", capital: "London" },
    { country: "Spanien", capital: "Madrid" },
    { country: "Portugal", capital: "Lissabon" },
    { country: "Italien", capital: "Rom" },
    { country: "Estland", capital: "Tallinn" },
    { country: "Lettland", capital: "Riga" },
    { country: "Litauen", capital: "Vilnius" },
    { country: "Weißrussland", capital: "Minsk" },
    { country: "Ukraine", capital: "Kiew" },
    { country: "Tschechien", capital: "Prag" },
    { country: "Slowakei", capital: "Bratislava" },
    { country: "Ungarn", capital: "Budapest" },
    { country: "Rumänien", capital: "Bukarest" },
    { country: "Slowenien", capital: "Ljubljana" },
    { country: "Kroatien", capital: "Zagreb" },
    { country: "Serbien", capital: "Belgrad" },
    { country: "Bosnien und Herzegowina", capital: "Sarajevo" },
    { country: "Bulgarien", capital: "Sofia" },
    { country: "Montenegro", capital: "Podgorica" },
    { country: "Albanien", capital: "Tirana" },
    { country: "Griechenland", capital: "Athen" },
    { country: "Türkei", capital: "Ankara" },
    { country: "Moldawien", capital: "Chisinau" },
    { country: "Mazedonien", capital: "Skopje" },
    { country: "Niederlande", capital: "Amsterdam" },
    { country: "Belgien", capital: "Brüssel" },
    { country: "Luxemburg", capital: "Luxemburg" }
];

let currentCardIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let timer;
let timeLeft = 7;
let isShowingAnswer = false;
let shuffledCapitals = [];
let timerDuration = 7; // Default to "Schnell"

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
const resetBtn = document.getElementById('reset-btn');

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function initializeQuiz() {
    shuffledCapitals = shuffleArray(capitals);
    currentCardIndex = 0;
    correctCount = 0;
    wrongCount = 0;
    updateScores();
    showNextCard();
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
        alert(`Quiz beendet!\n\nRichtig: ${correctCount}\nFalsch: ${wrongCount}\nGesamt: ${correctCount + wrongCount}`);
        initializeQuiz();
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
    currentCardIndex++;
    showNextCard();
});

resetBtn.addEventListener('click', () => {
    if (confirm('Möchten Sie das Quiz wirklich zurücksetzen?')) {
        initializeQuiz();
    }
});

document.addEventListener('keydown', (e) => {
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

initializeQuiz();