console.log("Script version 9.0 loaded!");

document.addEventListener('DOMContentLoaded', () => {
    // --- Global Elements ---
    const calendarGrid = document.getElementById('calendar-grid');
    const giftContent = document.getElementById('gift-content');
    const backToCalendarButton = document.getElementById('back-to-calendar');

    console.log("Calendar grid element:", calendarGrid);
    console.log("Back button element:", backToCalendarButton);

    const highlightNameSpans = document.querySelectorAll('.highlight-name');

    // --- Configuration Variables ---
    const friendName = "Ryan";
    const totalDays = 28;
    const birthdayYear = 2025;
    const birthdayMonth = 8;
    const birthdayDay = 8;

    highlightNameSpans.forEach(span => {
        span.textContent = friendName;
    });

    // --- Main Page Logic & Functions ---
    function isDayAccessible(dayNumber) {
        return true;
    }

    function loadDayContent(dayNumber) {
        // A mapping of day numbers to their setup functions
        const giftFunctions = {
            1: setupDay1Gift,
            2: setupDay2Gift,
            3: setupDay3Gift,
            4: setupDay4Gift,
            5: setupDay5Gift,
            6: setupDay6Gift,
            7: setupDay7Gift,
            8: setupDay8Gift,
            9: setupDay9Gift,
            10: setupDay10Gift,
            11: setupDay11Gift,
            12: setupDay12Gift,
            13: setupDay13Gift,
            14: setupDay14Gift,
            15: setupDay15Gift,
            16: setupDay16Gift,
            17: setupDay17Gift, 
            18: setupDay18Gift,
            19: setupDay19Gift,
            20: setupDay20Gift,
            21: setupDay21Gift,
            22: setupDay22Gift,
            23: setupDay23Gift,
            24: setupDay24Gift,
            25: setupDay25Gift,
            26: setupDay26Gift,
            27: setupDay27Gift,
            28: setupDay28Gift,
            // Add new gifts here as you create them
        };

        backToCalendarButton.style.display = 'block';
        calendarGrid.style.display = 'none';
        giftContent.innerHTML = '';

        const giftPage = `gifts/day${dayNumber}.html`;

        fetch(giftPage)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Gift for Day ${dayNumber} not found.`);
                }
                return response.text();
            })
            .then(html => {
                giftContent.innerHTML = html;
                giftContent.style.display = 'block';

                // Check if a setup function exists for the day and call it
                if (giftFunctions[dayNumber]) {
                    giftFunctions[dayNumber]();
                } else {
                    console.error(`No setup function found for Day ${dayNumber}.`);
                }
            })
            .catch(error => {
                console.error(error);
                giftContent.innerHTML = `<p>Sorry, the gift for Day ${dayNumber} is not ready yet.</p>`;
                giftContent.style.display = 'block';
            });
    }

    function updateCalendar() {
        calendarGrid.innerHTML = '';
        const startDate = new Date(birthdayYear, birthdayMonth - 1, birthdayDay);
        for (let i = 0; i < totalDays; i++) {
            const dayNumber = i + 1;
            const dayBox = document.createElement('div');
            dayBox.classList.add('day-box');
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            const options = { month: 'short', day: 'numeric' };
            dayBox.textContent = currentDate.toLocaleDateString('en-US', options);
            dayBox.dataset.day = dayNumber;

            if (isDayAccessible(dayNumber)) {
                dayBox.classList.add('unlocked');
                dayBox.addEventListener('click', () => loadDayContent(dayNumber));
            } else {
                dayBox.classList.add('locked');
            }
            calendarGrid.appendChild(dayBox);
        }
    }

    updateCalendar();

    backToCalendarButton.addEventListener('click', () => {
        giftContent.style.display = 'none';
        calendarGrid.style.display = 'grid';
        backToCalendarButton.style.display = 'none';
        giftContent.innerHTML = '';
    });

    // --- Day 1 Gift Logic ---
    function setupDay1Gift() {
        const introSection = document.getElementById('day1-intro-section');
        const startQuizBtn = document.getElementById('start-quiz-btn');
        const quizSection = document.getElementById('day1-quiz-section');
        const quizSubmitBtn = document.getElementById('quiz-submit-btn');
        const quizResult = document.getElementById('quiz-result');
        const webtoonSection = document.getElementById('day1-webtoon-section');
        const webtoonNextBtn = document.getElementById('webtoon-next-btn');
        const letterSection = document.getElementById('day1-letter-section');

        if (startQuizBtn) {
            startQuizBtn.addEventListener('click', () => {
                if (introSection) introSection.style.display = 'none';
                if (quizSection) quizSection.style.display = 'block';
            });
        }

        if (quizSubmitBtn) {
            quizSubmitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const selectedOption = document.querySelector('input[name="first-meeting"]:checked');

                if (selectedOption) {
                    const answer = selectedOption.value;
                    if (answer === 'b') {
                        quizResult.textContent = 'Correct! You remembered!';
                        quizResult.style.color = '#4caf50';
                        setTimeout(() => {
                            quizSection.style.display = 'none';
                            webtoonSection.style.display = 'block';
                        }, 1500);
                    } else {
                        quizResult.textContent = 'Sorry, that\'s not it. Try again!';
                        quizResult.style.color = '#ff6347';
                    }
                } else {
                    quizResult.textContent = 'Please select an option!';
                    quizResult.style.color = '#ff6347';
                }
            });
        }

        if (webtoonNextBtn) {
            webtoonNextBtn.addEventListener('click', () => {
                webtoonSection.style.display = 'none';
                letterSection.style.display = 'block';
            });
        }
    }

    // --- Day 2 Gift Logic (Memory Match Game) ---
    function setupDay2Gift() {
        const gameBoard = document.getElementById('game-board');
        const successMessage = document.getElementById('success-message');

        const cardImages = [
            'Bro (Ryan) is a model! .png', 'Election day.png', 'Day 1!!- LAST DAY OF SCHOOL.jpg', 'Day 6!!- playing egyptian rat slap!!.jpg',
            'Bro and sis! Siblings.png', 'Astoria park carnival .jpg', 'Yooans 13th birthday- bro and mekot.png', 'Sunset- bro and braiden.jpg'
        ];

        let gameCards = [];
        let firstCard = null;
        let secondCard = null;
        let lockBoard = false;

        const allCards = [...cardImages, ...cardImages].sort(() => 0.5 - Math.random());

        allCards.forEach(imageName => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">?</div>
                    <div class="card-back">
                        <img src="images/day2images/${imageName}" alt="Card image">
                    </div>
                </div>
            `;
            card.addEventListener('click', () => flipCard(card));
            gameCards.push(card);
            gameBoard.appendChild(card);
        });

        function flipCard(card) {
            if (lockBoard || card === firstCard) return;
            card.classList.add('flipped');
            if (!firstCard) {
                firstCard = card;
                return;
            }
            secondCard = card;
            lockBoard = true;
            checkForMatch();
        }
        function checkForMatch() {
            const isMatch = firstCard.querySelector('img').src === secondCard.querySelector('img').src;
            isMatch ? disableCards() : unflipCards();
        }
        function disableCards() {
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            resetBoard();
            checkGameWin();
        }
        function unflipCards() {
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                resetBoard();
            }, 1000);
        }
        function resetBoard() {
            [firstCard, secondCard, lockBoard] = [null, null, false];
        }
        function checkGameWin() {
            const matchedCards = document.querySelectorAll('.card.matched');
            if (matchedCards.length === allCards.length) {
                gameBoard.style.display = 'none';
                successMessage.style.display = 'block';
            }
        }
    }

    // --- Day 3 Gift Logic (Fill-in-the-Blank Story) ---
    function setupDay3Gift() {
        const storyGame = document.getElementById('story-game');
        const storySubmitBtn = document.getElementById('story-submit-btn');
        const storyResult = document.getElementById('story-result');
        const successMessage = document.getElementById('success-message');
        storySubmitBtn.addEventListener('click', () => {
            const inputs = document.querySelectorAll('#story-game input[type="text"]');
            let allCorrect = true;
            inputs.forEach(input => {
                const userAnswer = input.value.trim().toLowerCase();
                const correctAnswer = input.getAttribute('data-answer').toLowerCase();
                if (userAnswer !== correctAnswer) {
                    allCorrect = false;
                }
            });
            if (allCorrect) {
                storyResult.textContent = 'Correct! That\'s exactly how I remember it!';
                storyResult.style.color = '#4caf50';
                setTimeout(() => {
                    storyGame.style.display = 'none';
                    successMessage.style.display = 'block';
                }, 1500);
            } else {
                storyResult.textContent = 'Hmm, that\'s not quite right. Try again!';
                storyResult.style.color = '#ff6347';
            }
        });
    }

    // --- Day 4 Gift Logic (Guess the Song) ---
    function setupDay4Gift() {
        const songSubmitBtn = document.getElementById('song-submit-btn');
        const songGuessInput = document.getElementById('song-guess');
        const songResult = document.getElementById('song-result');
        const songQuiz = document.getElementById('day4-container');
        const songGiftContent = document.getElementById('song-gift-content');
        const fullSongTitleElement = document.getElementById('full-song-title');
        const songLyricsElement = document.getElementById('song-lyrics');
        const snippetAudio = document.getElementById('snippet-audio');
        const fullSongAudio = document.getElementById('full-song-audio');
        const toggleFullSongBtn = document.getElementById('toggle-full-song-btn');

        const correctSongTitle = "tum hi ho";
        const fullSongTitle = "Tum Hi Ho (From 'Aashiqui 2')";
        const songLyrics = "This is a placeholder for the lyrics.\nPlease paste your lyrics here to make them appear on the page.";

        if (fullSongAudio) {
            fullSongAudio.pause();
            fullSongAudio.currentTime = 0;
        }

        const formElement = songSubmitBtn.closest('form');
        if (formElement) {
            formElement.addEventListener('submit', (e) => {
                e.preventDefault();
                handleSongQuizLogic();
            });
        } else {
            songSubmitBtn.addEventListener('click', () => {
                handleSongQuizLogic();
            });
        }

        if (toggleFullSongBtn) {
            toggleFullSongBtn.addEventListener('click', () => {
                if (fullSongAudio.paused) {
                    fullSongAudio.play();
                    toggleFullSongBtn.textContent = 'Pause Full Song';
                } else {
                    fullSongAudio.pause();
                    toggleFullSongBtn.textContent = 'Play Full Song';
                }
            });
        }

        function handleSongQuizLogic() {
            const userAnswer = songGuessInput.value.trim().toLowerCase();
            const correctAnswer = correctSongTitle.toLowerCase();
            if (userAnswer === correctAnswer) {
                songResult.textContent = 'You got it!';
                songResult.style.color = '#4caf50';
                if (snippetAudio) {
                    snippetAudio.pause();
                    snippetAudio.currentTime = 0;
                }

                setTimeout(() => {
                    if (songQuiz) songQuiz.style.display = 'none';
                    if (fullSongTitleElement) fullSongTitleElement.textContent = fullSongTitle;
                    if (songLyricsElement) songLyricsElement.textContent = songLyrics;
                    if (songGiftContent) songGiftContent.style.display = 'block';
                    if (fullSongAudio) {
                        fullSongAudio.play();
                        toggleFullSongBtn.textContent = 'Pause Full Song';
                    }
                }, 1500);
            } else {
                songResult.textContent = 'Hmm, that\'s not it. Try again!';
                songResult.style.color = '#ff6347';
            }
        }
    }

    // --- Day 5 Gift Logic (Hangman Game) ---
    function setupDay5Gift() {
        const secretPhrase = "god bless america"; // Change this to your secret phrase
        const maxWrongGuesses = 6;
        let wrongGuesses = 0;
        let guessedLetters = [];

        const wordDisplay = document.getElementById('word-display');
        const guessesLeftSpan = document.getElementById('guesses-left').querySelector('span');
        const letterInput = document.getElementById('letter-input');
        const guessBtn = document.getElementById('guess-btn');
        const gameMessage = document.getElementById('game-message');
        const guessedLettersDisplay = document.getElementById('guessed-letters');
        const hangmanParts = ['head', 'body', 'arms', 'legs'];
        const playAgainBtn = document.getElementById('play-again-btn');

        function updateWordDisplay() {
            let displayWord = '';
            for (const char of secretPhrase) {
                if (char === ' ') {
                    displayWord += '&nbsp;';
                } else if (guessedLetters.includes(char)) {
                    displayWord += char;
                } else {
                    displayWord += '_';
                }
                displayWord += '&nbsp;'; // Add spacing for letters and underscores
            }
            wordDisplay.innerHTML = displayWord;

            if (!displayWord.includes('_')) {
                endGame(true);
            }
        }

        function initializeGame() {
            wrongGuesses = 0;
            guessedLetters = [];
            guessesLeftSpan.textContent = maxWrongGuesses;
            gameMessage.textContent = '';
            guessedLettersDisplay.textContent = 'Guessed: ';

            hangmanParts.forEach(partId => {
                const part = document.getElementById(partId);
                if (part) {
                    part.style.display = 'none';
                }
            });

            guessBtn.disabled = false;
            letterInput.disabled = false;
            playAgainBtn.style.display = 'none';

            updateWordDisplay();
        }

        function checkGuess() {
            const guess = letterInput.value.toLowerCase().trim();
            letterInput.value = '';
            letterInput.focus();

            if (!guess || guess.length !== 1 || !guess.match(/[a-z]/)) {
                gameMessage.textContent = 'Invalid guess. Enter a single letter.';
                return;
            }
            if (guessedLetters.includes(guess)) {
                gameMessage.textContent = `You already guessed "${guess}".`;
                return;
            }

            guessedLetters.push(guess);
            guessedLettersDisplay.textContent = `Guessed: ${guessedLetters.sort().join(', ')}`;

            if (secretPhrase.includes(guess)) {
                gameMessage.textContent = 'Correct guess!';
                updateWordDisplay();
            } else {
                wrongGuesses++;
                gameMessage.textContent = 'Wrong guess!';
                if (wrongGuesses <= hangmanParts.length) {
                    const part = document.getElementById(hangmanParts[wrongGuesses - 1]);
                    if (part) {
                        part.style.display = 'block';
                    }
                }
                guessesLeftSpan.textContent = maxWrongGuesses - wrongGuesses;
                if (wrongGuesses >= maxWrongGuesses) {
                    endGame(false);
                }
            }
        }

        function endGame(won) {
            guessBtn.disabled = true;
            letterInput.disabled = true;
            playAgainBtn.style.display = 'block';

            if (won) {
                gameMessage.textContent = 'You won!';
            } else {
                wordDisplay.innerHTML = secretPhrase.split('').map(char => char === ' ' ? '&nbsp;' : char).join('&nbsp;');
                gameMessage.textContent = `Game over! The phrase was "${secretPhrase}".`;
            }
        }

        guessBtn.addEventListener('click', checkGuess);
        letterInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkGuess();
            }
        });
        playAgainBtn.addEventListener('click', initializeGame);

        initializeGame();
    }

    // --- Day 6 Gift Logic (Interactive Scrapbook) ---
    function setupDay6Gift() {
        const memories = [
            { type: 'photo', file: 'halloween.png', caption: "Remember this photo, who would've known the world was so small cuz you knew berin too!" },
            { type: 'video', file: 'mannat_impression.mp4', caption: "the iconic mannat impression, only one that could be almost close to doing it as good as you would probably be pranay, but you definitely do it best" },
            { type: 'photo', file: 'class.png', caption: "the iconic 503, nothing can top it" },
            { type: 'video', file: 'last_day_school.mp4', caption: "remember this gym, that day felt so normal but crazy to think that was our last time in that school, cant believe you said you wouldn't miss it" },
            { type: 'photo', file: 'giant_log.jpg', caption: "idek how I still have this but hey looks cool" },
            { type: 'photo', file: 'last_day_school_selfie.jpg', caption: "that classroom really did have a good amount of crazy memories, last day though would've been better if it was in 503" },
            { type: 'photo', file: 'njhs_ceremony.jpg', caption: "omg remember when you said arigato to yooan's mom, bro the warnings you got from the rest of us that day" },
            { type: 'video', file: 'scaring_adwaito.mp4', caption: "cant remember if u sent this but it was funny" },
            { type: 'video', file: 'day2_video.mp4', caption: "Irish dancing with our favorite teacher!" },
            { type: 'photo', file: 'graduation.jpg', caption: "you're too tall man smh" },
            { type: 'video', file: 'bro_at_park.mp4', caption: "reginaa and her vlog!" },
            { type: 'video', file: 'bro_griddy.mp4', caption: "you did this a lot tbh" },
            { type: 'photo', file: 'park.jpg', caption: "you took one of the best blackmail pics yourself, this was just funny" }
        ];

        let currentMemoryIndex = 0;
        const nextBtn = document.getElementById('next-memory-btn');
        const imageElement = document.getElementById('scrapbook-image');
        const videoElement = document.getElementById('scrapbook-video');
        const captionElement = document.getElementById('caption');

        function showMemory(index) {
            // Reset and hide both elements
            imageElement.style.display = 'none';
            videoElement.style.display = 'none';
            videoElement.pause();

            const memory = memories[index];
            captionElement.textContent = memory.caption;

            if (memory.type === 'photo') {
                // Corrected path: removed the '../'
                imageElement.src = `images/day6images/${memory.file}`;
                imageElement.style.display = 'block';
            } else if (memory.type === 'video') {
                // Corrected path: removed the '../'
                videoElement.src = `images/day6images/${memory.file}`;
                videoElement.style.display = 'block';
                videoElement.play();
            }
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentMemoryIndex = (currentMemoryIndex + 1) % memories.length;
                showMemory(currentMemoryIndex);
            });
        }

        // Show the first memory when the gift is opened
        showMemory(currentMemoryIndex);
    }

    // --- Day 7 Gift Logic (Penalty Kick) ---
    function setupDay7Gift() {
        const canvas = document.getElementById('penalty-kick-canvas');
        const ctx = canvas.getContext('2d');
        const turnIndicator = document.getElementById('turn-indicator');
        const playerGoalsCountSpan = document.getElementById('player-goals-count');
        const robotGoalsCountSpan = document.getElementById('robot-goals-count');
        const mathPopup = document.getElementById('math-challenge-popup');
        const mathQuestionElement = document.getElementById('math-question');
        const mathAnswerInput = document.getElementById('math-answer-input');
        const submitBtn = document.getElementById('submit-answer-btn');
        const gameMessage = document.getElementById('game-message');

        let playerGoals = 0;
        let robotGoals = 0;
        let turn = 'player';
        let isKicking = false;
        let isPenalty = false;
        let ballTrajectory = { dx: 0, dy: 0 };
        let mathAnswer = 0;

        const ball = { x: canvas.width / 2, y: canvas.height - 50, radius: 10, color: 'white' };
        const goal = { x: canvas.width / 2 - 50, y: 30, width: 100, height: 20, color: '#333' };
        const goalie = { x: canvas.width / 2, y: 50, width: 50, height: 50, color: 'red', speed: 2, direction: 1 };

        function showMessage(text) {
            gameMessage.textContent = text;
            gameMessage.style.display = 'block';
            setTimeout(() => {
                gameMessage.style.display = 'none';
            }, 1000);
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = goal.color;
            ctx.fillRect(goal.x, goal.y, goal.width, goal.height);

            ctx.fillStyle = goalie.color;
            ctx.fillRect(goalie.x - goalie.width / 2, goalie.y - goalie.height / 2, goalie.width, goalie.height);

            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fillStyle = ball.color;
            ctx.fill();
            ctx.closePath();
        }

        function generateMathQuestion() {
            const num1 = Math.floor(Math.random() * 10) + 1;
            const num2 = Math.floor(Math.random() * 10) + 1;
            mathQuestionElement.textContent = `${num1} + ${num2} = ?`;
            mathAnswer = num1 + num2;
            mathPopup.classList.remove('hidden-popup');
        }

        function checkPenalty(isPlayerTurn) {
            if (isPenalty) return;
            isPenalty = true;

            generateMathQuestion();
            submitBtn.onclick = () => {
                if (parseInt(mathAnswerInput.value) === mathAnswer) {
                    showMessage('Correct! No penalty.');
                } else {
                    showMessage('Incorrect! Robot gets a goal.');
                    if (isPlayerTurn) {
                        robotGoals++;
                        robotGoalsCountSpan.textContent = robotGoals;
                    } else {
                        playerGoals++;
                        playerGoalsCountSpan.textContent = playerGoals;
                    }
                }
                mathPopup.classList.add('hidden-popup');
                mathAnswerInput.value = '';
                endTurn();
            };
        }

        function resetBall() {
            ball.x = canvas.width / 2;
            ball.y = canvas.height - 50;
            ballTrajectory = { dx: 0, dy: 0 };
            isKicking = false;
        }

        function endTurn() {
            resetBall();
            isPenalty = false;
            turn = (turn === 'player') ? 'robot' : 'player';
            turnIndicator.textContent = (turn === 'player') ? 'Your Turn!' : 'Robot\'s Turn!';
            if (turn === 'robot') {
                setTimeout(robotKick, 1500);
            }
        }

        function update() {
            if (isPenalty) return;

            goalie.x += goalie.speed * goalie.direction;
            if (goalie.x > canvas.width - goalie.width / 2 || goalie.x < goalie.width / 2) {
                goalie.direction *= -1;
            }

            if (isKicking) {
                ball.x += ballTrajectory.dx;
                ball.y += ballTrajectory.dy;
            }

            if (ball.y < goalie.y && isKicking) {
                if (ball.x > goalie.x - goalie.width / 2 && ball.x < goalie.x + goalie.width / 2) {
                    if (turn === 'player') {
                        showMessage('Saved!');
                        endTurn();
                    } else {
                        showMessage('You saved it! Penalty for the robot!');
                        checkPenalty(false);
                    }
                } else if (ball.x > goal.x && ball.x < goal.x + goal.width) {
                    if (turn === 'player') {
                        showMessage('GOAL!');
                        playerGoals++;
                        playerGoalsCountSpan.textContent = playerGoals;
                        endTurn();
                    } else {
                        showMessage('Robot Scores!');
                        robotGoals++;
                        robotGoalsCountSpan.textContent = robotGoals;
                        endTurn();
                    }
                } else {
                    if (turn === 'player') {
                        showMessage('Missed!');
                        endTurn();
                    } else {
                        showMessage('Robot missed! Penalty for you!');
                        checkPenalty(true);
                    }
                }
            }
            draw();
        }

        function playerKick(e) {
            if (turn === 'player' && !isKicking && !isPenalty) {
                const rect = canvas.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const clickY = e.clientY - rect.top;

                const speed = 10;
                const angle = Math.atan2(clickY - ball.y, clickX - ball.x);

                ballTrajectory.dx = speed * Math.cos(angle);
                ballTrajectory.dy = speed * Math.sin(angle);
                isKicking = true;
            }
        }

        function robotKick() {
            if (turn === 'robot' && !isKicking && !isPenalty) {
                const targetX = goal.x + Math.random() * goal.width;
                const targetY = goal.y + Math.random() * (canvas.height / 3);

                const speed = 8;
                const angle = Math.atan2(targetY - ball.y, targetX - ball.x);

                ballTrajectory.dx = speed * Math.cos(angle);
                ballTrajectory.dy = speed * Math.sin(angle);
                isKicking = true;
            }
        }

        canvas.addEventListener('click', playerKick);
        setInterval(update, 1000 / 60);
        draw();
    }

    // --- Day 8 Gift Logic (Lego Builder) ---
    function setupDay8Gift() {
        const palette = document.getElementById('lego-palette');
        const canvas = document.getElementById('lego-canvas');
        const clearBtn = document.getElementById('clear-btn');

        let currentColor = 'red';

        palette.addEventListener('click', (e) => {
            if (e.target.classList.contains('color-brick')) {
                document.querySelectorAll('.color-brick').forEach(brick => {
                    brick.classList.remove('active');
                });
                e.target.classList.add('active');
                currentColor = e.target.getAttribute('data-color');
            }
        });

        canvas.addEventListener('click', (e) => {
            const newBrick = document.createElement('div');
            newBrick.classList.add('placed-brick');
            newBrick.style.backgroundColor = currentColor;

            const rect = canvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;

            const gridX = Math.floor(clickX / 40) * 40;
            const gridY = Math.floor(clickY / 40) * 40;

            newBrick.style.left = `${gridX}px`;
            newBrick.style.top = `${gridY}px`;

            canvas.appendChild(newBrick);
        });

        clearBtn.addEventListener('click', () => {
            canvas.innerHTML = '';
        });
    }

    // --- Day 9 Gift Logic (Ronaldo Free Kick) ---
    function setupDay9Gift() {
        console.log("Attempting to set up Day 9 gift.");

        const canvas = document.getElementById('free-kick-canvas');
        const ctx = canvas.getContext('2d');
        const kickBtn = document.getElementById('kick-btn');
        const powerMeterContainer = document.getElementById('power-meter-container');
        const powerMeter = document.getElementById('power-meter');
        const gameMessage = document.getElementById('game-message');
        const siuuuAudio = document.getElementById('siuuu-audio');

        // This is a new check to see if the button exists
        if (!kickBtn) {
            console.error("Error: The 'kick-btn' element was not found in the HTML.");
            return; // Stop the function if the button doesn't exist
        }
        console.log("Kick button found successfully!");

        let kickState = 'ready'; // 'ready', 'aiming', 'kicking'
        let power = 0;
        let powerDirection = 1;
        let ballTrajectory = { dx: 0, dy: 0 };

        const ball = { x: canvas.width / 2, y: canvas.height - 50, radius: 10, color: 'white' };
        const goal = { x: canvas.width / 2 - 50, y: 30, width: 100, height: 20, color: '#333' };
        const goalie = { x: canvas.width / 2, y: 50, width: 50, height: 50, color: 'red', speed: 2, direction: 1 };

        function showMessage(text) {
            gameMessage.textContent = text;
            gameMessage.style.display = 'block';
            setTimeout(() => {
                gameMessage.style.display = 'none';
            }, 1500);
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Draw field
            ctx.fillStyle = '#4CAF50';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw goal
            ctx.fillStyle = goal.color;
            ctx.fillRect(goal.x, goal.y, goal.width, goal.height);

            // Draw goalkeeper
            ctx.fillStyle = goalie.color;
            ctx.fillRect(goalie.x - goalie.width / 2, goalie.y - goalie.height / 2, goalie.width, goalie.height);

            // Draw ball
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fillStyle = ball.color;
            ctx.fill();
            ctx.closePath();
        }

        function resetGame() {
            ball.x = canvas.width / 2;
            ball.y = canvas.height - 50;
            kickState = 'ready';
            power = 0;
            ballTrajectory = { dx: 0, dy: 0 };
            powerMeter.style.height = '0%';
            kickBtn.textContent = 'Take Your Shot!';
            powerMeterContainer.style.display = 'none';
        }

        function update() {
            requestAnimationFrame(update);
            draw();

            // Animate goalkeeper
            goalie.x += goalie.speed * goalie.direction;
            if (goalie.x > canvas.width - goalie.width / 2 - 20 || goalie.x < goalie.width / 2 + 20) {
                goalie.direction *= -1;
            }

            if (kickState === 'aiming') {
                power += 2 * powerDirection;
                if (power > 100 || power < 0) {
                    powerDirection *= -1;
                }
                powerMeter.style.height = `${power}%`;
            } else if (kickState === 'kicking') {
                ball.x += ballTrajectory.dx;
                ball.y += ballTrajectory.dy;

                // Check for collision with goal/goalkeeper
                if (ball.y < goalie.y && ball.y > goal.y) {
                    if (ball.x > goalie.x - goalie.width / 2 && ball.x < goalie.x + goalie.width / 2) {
                        showMessage('Saved!');
                        setTimeout(resetGame, 2000);
                        kickState = 'ready';
                    } else if (ball.x > goal.x && ball.x < goal.x + goal.width) {
                        showMessage('GOAL! SIUUU!');
                        if (siuuuAudio) siuuuAudio.play();
                        setTimeout(resetGame, 2000);
                        kickState = 'ready';
                    } else {
                        showMessage('Missed!');
                        setTimeout(resetGame, 2000);
                        kickState = 'ready';
                    }
                } else if (ball.y < goal.y) {
                    showMessage('Missed!');
                    setTimeout(resetGame, 2000);
                    kickState = 'ready';
                }
            }
        }

        kickBtn.addEventListener('click', () => {
            console.log("Button was clicked!"); // New log to confirm the click
            if (kickState === 'ready') {
                kickState = 'aiming';
                powerMeterContainer.style.display = 'block';
                kickBtn.textContent = 'Kick!';
            } else if (kickState === 'aiming') {
                kickState = 'kicking';
                powerMeterContainer.style.display = 'none';
                kickBtn.textContent = 'Take Your Shot!';

                const speed = 10 * (power / 100);
                const targetX = canvas.width / 2 + (Math.random() - 0.5) * 100 * (1 - power / 100);
                const angle = Math.atan2(goal.y - ball.y, targetX - ball.x);

                ballTrajectory.dx = speed * Math.cos(angle);
                ballTrajectory.dy = speed * Math.sin(angle);
            }
        });

        resetGame();
        update();
    }
    // --- Day 10 Whack-a-Mole Gift Logic ---
    function setupDay10Gift() {
        console.log("Setting up Day 10 Whack-a-Mole game.");

        const gameBoard = document.getElementById('game-board');
        const startButton = document.getElementById('start-btn');
        const scoreDisplay = document.getElementById('score');
        const timeLeftDisplay = document.getElementById('time-left');

        let score = 0;
        let timeLeft = 30;
        let lastHole;
        let gameTimerId;
        let moleTimerId;

        // Create the holes for the game board
        for (let i = 0; i < 9; i++) {
            const hole = document.createElement('div');
            hole.classList.add('hole');
            const mole = document.createElement('div');
            mole.classList.add('mole');
            hole.appendChild(mole);
            gameBoard.appendChild(hole);
        }
        const holes = document.querySelectorAll('.hole');

        function randomHole() {
            const randomIndex = Math.floor(Math.random() * holes.length);
            const hole = holes[randomIndex];
            if (hole === lastHole) {
                return randomHole();
            }
            lastHole = hole;
            return hole;
        }

        function moveMole() {
            moleTimerId = setInterval(() => {
                holes.forEach(hole => hole.classList.remove('up'));
                const hole = randomHole();
                hole.classList.add('up');
            }, 800); // Moles appear every 0.8 seconds
        }

        function whack(event) {
            if (!event.isTrusted) return; // Prevent fake clicks
            if (event.target.classList.contains('mole')) {
                score++;
                scoreDisplay.textContent = `Score: ${score}`;
                event.target.parentElement.classList.remove('up');
            }
        }

        function countDown() {
            timeLeft--;
            timeLeftDisplay.textContent = `Time: ${timeLeft}`;
            if (timeLeft === 0) {
                clearInterval(gameTimerId);
                clearInterval(moleTimerId);
                gameBoard.removeEventListener('mousedown', whack);
                startButton.style.display = 'block';
                alert(`Game Over! Your final score is ${score}`);
            }
        }

        function startGame() {
            score = 0;
            timeLeft = 30;
            scoreDisplay.textContent = `Score: 0`;
            timeLeftDisplay.textContent = `Time: 30`;
            startButton.style.display = 'none';

            gameBoard.addEventListener('mousedown', whack);
            moveMole();
            gameTimerId = setInterval(countDown, 1000);
        }

        startButton.addEventListener('click', startGame);
    }
    // --- Day 11 Jersey Creator Gift Logic ---
    function setupDay11Gift() {
        console.log("Setting up Day 11 Jersey Creator.");
        const canvas = document.getElementById('jersey-canvas');
        const ctx = canvas.getContext('2d');

        const colorPicker = document.getElementById('base-color-picker');
        const patternOptions = document.getElementById('pattern-options');
        const nameInput = document.getElementById('name-input');
        const numberInput = document.getElementById('number-input');
        const clearBtn = document.getElementById('clear-btn');

        let baseColor = colorPicker.value;
        let pattern = 'solid';
        let jerseyName = '';
        let jerseyNumber = '';

        function drawJerseyShape() {
            ctx.beginPath();
            // Neck
            ctx.moveTo(150, 50);
            ctx.bezierCurveTo(150, 40, 250, 40, 250, 50);
            // Right shoulder and sleeve
            ctx.lineTo(300, 50);
            ctx.bezierCurveTo(370, 70, 380, 110, 380, 150);
            ctx.lineTo(380, 200);
            ctx.bezierCurveTo(340, 210, 300, 210, 300, 200);
            // Body
            ctx.lineTo(300, 320);
            ctx.bezierCurveTo(300, 360, 100, 360, 100, 320);
            ctx.lineTo(100, 200);
            // Left shoulder and sleeve
            ctx.bezierCurveTo(60, 210, 20, 210, 20, 200);
            ctx.lineTo(20, 150);
            ctx.bezierCurveTo(20, 110, 30, 70, 100, 50);
            ctx.closePath();
        }

        function drawJersey() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw background color
            drawJerseyShape();
            ctx.fillStyle = baseColor;
            ctx.fill();

            // Save context and clip to the jersey shape
            ctx.save();
            drawJerseyShape();
            ctx.clip();

            // Draw patterns within the clipped shape
            if (pattern === 'stripes') {
                ctx.fillStyle = '#000000';
                for (let i = 0; i < canvas.height; i += 30) {
                    ctx.fillRect(0, i, canvas.width, 15);
                }
            } else if (pattern === 'diagonal') {
                ctx.fillStyle = '#000000';
                for (let i = -canvas.width; i < canvas.width * 2; i += 20) {
                    ctx.fillRect(i, 0, 10, canvas.height);
                }
            } else if (pattern === 'real-madrid') {
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                // Draw purple and black stripes/trim
                ctx.fillStyle = '#6f00ff'; // Purple
                ctx.fillRect(0, 150, canvas.width, 10);
                ctx.fillRect(0, 200, canvas.width, 10);
            } else if (pattern === 'gradient') {
                const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                gradient.addColorStop(0, 'yellow');
                gradient.addColorStop(0.5, 'blue');
                gradient.addColorStop(1, 'green');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            ctx.restore(); // Restore clipping to draw text over the top

            // Draw text
            ctx.fillStyle = '#000000'; // Change text to black for better contrast
            ctx.font = '30px Arial';
            ctx.textAlign = 'center';
            if (jerseyName) {
                ctx.fillText(jerseyName.toUpperCase(), canvas.width / 2, 120);
            }
            if (jerseyNumber) {
                ctx.fillText(jerseyNumber, canvas.width / 2, 160);
            }
        }

        colorPicker.addEventListener('input', (e) => {
            baseColor = e.target.value;
            drawJersey();
        });

        patternOptions.addEventListener('click', (e) => {
            if (e.target.classList.contains('pattern-btn')) {
                pattern = e.target.dataset.pattern;
                drawJersey();
            }
        });

        nameInput.addEventListener('input', (e) => {
            jerseyName = e.target.value;
            drawJersey();
        });

        numberInput.addEventListener('input', (e) => {
            jerseyNumber = e.target.value;
            drawJersey();
        });

        clearBtn.addEventListener('click', () => {
            baseColor = '#ffffff';
            pattern = 'solid';
            jerseyName = '';
            jerseyNumber = '';
            nameInput.value = '';
            numberInput.value = '';
            colorPicker.value = '#ffffff';
            drawJersey();
        });

        drawJersey(); // Initial draw
    }
    // --- Day 12 "How Well Do You Know Me?" Quiz Logic ---
    function setupDay12Gift() {
        console.log("Setting up Day 12 Quiz.");

        const quizData = [
            {
                question: "How many birthmarks do I have on my face?",
                choices: ["1", "2", "3", "0", "I have 2 scars"],
                answer: "I have 2 scars",
                note: "I have 2 scars on my face, not birthmarks."
            },
            {
                question: "What's a more ideal day in my opinion?",
                choices: ["Beach day", "Karaoke night drive", "Movie day"],
                answer: "Karaoke night drive"
            },
            {
                question: "How many languages do I know (not counting English or Spanish)?",
                choices: ["1", "2", "3", "4", "5"],
                answer: "5"
            },
            {
                question: "How long does that mood swing week last?",
                choices: ["1 week", "2 weeks", "3 weeks", "all month"],
                answer: "1 week"
            },
            {
                question: "What fruit/vegetable do I hate?",
                choices: ["tomato and eggplant", "tomato and cauliflower", "eggplant and squash", "trick question"],
                answer: "tomato and eggplant"
            },
            {
                question: "True or false: My ballroom dancing partner was Sayan.",
                choices: ["True", "False"],
                answer: "True",
                note: "It's true! Cayan is my cousin, but Sayan was my friend."
            },
            {
                question: "What do I prefer: sentimental or material gifts, or both?",
                choices: ["sentimental", "material", "both", "neither"],
                answer: "both",
                note: "Both just means I perfer sentimental more but if the gift is like an object then it has to have some sort of sentimental meaning or memory behind it."
            },
            {
                question: "What's my favorite animal?",
                choices: ["Bengal tiger", "peacock", "cat", "arctic fox"],
                answer: "Bengal tiger"
            },
            {
                question: "Based off my favorite animal, which team do I usually end up supporting more in CRICKET: India or Bangladesh?",
                choices: ["Bangladesh all the way", "India Virat Kholi the GOAT", "Pakistan", "None of the above"],
                answer: "India Virat Kholi the GOAT",
                note: "I'm loyal to Bangladesh first, but when they're out, it's India all the way!"
            },
            {
                question: "What's my favorite C-Drama?",
                choices: ["Wounded Love", "The Love Equations", "Time and Him Are Just Right"],
                answer: "Time and Him Are Just Right"
            }
        ];

        let currentQuestionIndex = 0;
        let score = 0;

        const questionText = document.getElementById('question-text');
        const choicesContainer = document.getElementById('choices-container');
        const nextButton = document.getElementById('next-btn');
        const quizGame = document.getElementById('quiz-game');
        const quizResults = document.getElementById('quiz-results');
        const finalScore = document.getElementById('final-score');
        const restartButton = document.getElementById('restart-btn');
        const feedbackMessage = document.getElementById('feedback-message');

        function showQuestion() {
            if (currentQuestionIndex >= quizData.length) {
                showResults();
                return;
            }

            const currentQuestion = quizData[currentQuestionIndex];
            questionText.textContent = currentQuestion.question;
            choicesContainer.innerHTML = ''; // Clear previous choices
            feedbackMessage.textContent = ''; // Clear previous notes
            nextButton.classList.add('hidden');

            currentQuestion.choices.forEach(choice => {
                const button = document.createElement('button');
                button.classList.add('choice-btn');
                button.textContent = choice;
                button.addEventListener('click', () => selectAnswer(choice));
                choicesContainer.appendChild(button);
            });
        }

        function selectAnswer(selectedChoice) {
            const currentQuestion = quizData[currentQuestionIndex];
            const allButtons = choicesContainer.querySelectorAll('.choice-btn');
            let isCorrect = false;

            allButtons.forEach(button => {
                if (button.textContent === currentQuestion.answer) {
                    button.classList.add('correct');
                    if (selectedChoice === currentQuestion.answer) {
                        isCorrect = true;
                    }
                    if (currentQuestion.note) {
                        feedbackMessage.textContent = currentQuestion.note;
                    }
                } else {
                    if (button.textContent === selectedChoice) {
                        button.classList.add('incorrect');
                    }
                }
                button.disabled = true; // Disable all buttons after one is selected
            });

            if (isCorrect) {
                score++;
            }

            nextButton.classList.remove('hidden');
        }

        nextButton.addEventListener('click', () => {
            currentQuestionIndex++;
            showQuestion();
        });

        restartButton.addEventListener('click', () => {
            currentQuestionIndex = 0;
            score = 0;
            quizGame.classList.remove('hidden');
            quizResults.classList.add('hidden');
            showQuestion();
        });

        function showResults() {
            quizGame.classList.add('hidden');
            quizResults.classList.remove('hidden');
            finalScore.textContent = score;
        }

        showQuestion(); // Start the quiz
    }
    // --- Day 13 Birthday Video Logic ---
    function setupDay13Gift() {
        console.log("Setting up Day 13 Birthday Video.");
        // No specific logic needed for this simple display, but the function is part of the structure.
    }
    // --- Day 14 Jigsaw Puzzle Logic ---
    function setupDay14Gift() {
        console.log("Setting up Day 14 Jigsaw Puzzle.");

        const puzzleBoard = document.getElementById('puzzle-board');
        const shuffleBtn = document.getElementById('shuffle-btn');
        const puzzleMessage = document.getElementById('puzzle-message');
        const newPuzzleBtn = document.getElementById('new-puzzle-btn');

        const imageURL = 'images/day14images/ronaldo.jpg';
        const rows = 4;
        const cols = 4;
        const puzzlePieces = [];

        let draggedPiece = null;

        // Create and shuffle pieces
        function createPieces() {
            puzzleBoard.innerHTML = ''; // Clear board
            puzzlePieces.length = 0;
            for (let i = 0; i < rows * cols; i++) {
                const piece = document.createElement('div');
                piece.classList.add('puzzle-piece');
                piece.setAttribute('data-position', i);
                piece.style.backgroundImage = `url(${imageURL})`;

                const x = -(i % cols) * 100;
                const y = -Math.floor(i / cols) * 100;
                piece.style.backgroundPosition = `${x}px ${y}px`;

                piece.draggable = true;
                puzzlePieces.push(piece);
            }
        }

        function shufflePieces() {
            for (let i = puzzlePieces.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [puzzlePieces[i], puzzlePieces[j]] = [puzzlePieces[j], puzzlePieces[i]];
            }
            puzzlePieces.forEach(piece => puzzleBoard.appendChild(piece));
            puzzleMessage.classList.add('hidden');
        }

        // Drag and drop handlers
        puzzleBoard.addEventListener('dragstart', (e) => {
            draggedPiece = e.target;
            setTimeout(() => e.target.classList.add('dragging'), 0);
        });

        puzzleBoard.addEventListener('dragover', (e) => {
            e.preventDefault();
            const target = e.target;
            if (target.classList.contains('puzzle-piece') && target !== draggedPiece) {
                target.classList.add('over');
            }
        });

        puzzleBoard.addEventListener('dragleave', (e) => {
            e.target.classList.remove('over');
        });

        puzzleBoard.addEventListener('drop', (e) => {
            e.preventDefault();
            const target = e.target;
            if (target.classList.contains('puzzle-piece') && target !== draggedPiece) {
                const temp = document.createElement('div');
                puzzleBoard.replaceChild(temp, draggedPiece);
                puzzleBoard.replaceChild(draggedPiece, target);
                puzzleBoard.replaceChild(target, temp);
            }
            target.classList.remove('over');
            checkWin();
        });

        puzzleBoard.addEventListener('dragend', (e) => {
            e.target.classList.remove('dragging');
        });

        function checkWin() {
            const currentOrder = Array.from(puzzleBoard.children).map(piece => piece.getAttribute('data-position'));
            const solvedOrder = Array.from({ length: rows * cols }, (_, i) => i.toString());

            if (JSON.stringify(currentOrder) === JSON.stringify(solvedOrder)) {
                puzzleMessage.classList.remove('hidden');
                shuffleBtn.classList.add('hidden');
            }
        }

        shuffleBtn.addEventListener('click', shufflePieces);
        newPuzzleBtn.addEventListener('click', () => {
            createPieces();
            shufflePieces();
            shuffleBtn.classList.remove('hidden');
        });

        createPieces();
        shufflePieces();
    }
    // --- Day 15 "Guess the Player" Logic ---
    function setupDay15Gift() {
        console.log("Setting up Day 15 Guess the Player.");

        const players = [
            { name: "Vinícius Júnior", image: "images/day15images/vini.jpg" },
            { name: "Harry Kane", image: "images/day15images/harry.jpg" },
            { name: "Toni Kroos", image: "images/day15images/kroos.jpg" },
            { name: "Robert Lewandowski", image: "images/day15images/rob.jpg" },
            { name: "Luka Modrić", image: "images/day15images/luka.jpg" },
            { name: "Zlatan Ibrahimovic ", image: "images/day15images/ibra.jpg" },
            { name: "Kylian Mbappé", image: "images/day15images/kylian.jpg" },
            { name: "Cristiano Ronaldo", image: "images/day15images/cr7.jpg" },
            { name: "Lionel Messi", image: "images/day15images/messi.jpg" },
            { name: "Neymar Jr.", image: "images/day15images/neymar.jpg" },
            { name: "Sergio Ramos", image: "images/day15images/ramos.jpg" },
            { name: "Jude Bellingham", image: "images/day15images/jude.jpg" }
        ];

        const playerImage = document.getElementById('player-image');
        const playerGuessInput = document.getElementById('player-guess');
        const guessBtn = document.getElementById('guess-btn');
        const feedbackMessage = document.getElementById('feedback-message');
        const nextPlayerBtn = document.getElementById('next-player-btn');

        let currentPlayers = [...players];
        let currentPlayer = null;
        let pixelationLevel = 10;
        const pixelationDecrement = 1.5;

        function applyPixelation() {
            playerImage.style.filter = `blur(${pixelationLevel}px) grayscale(100%)`; // Using blur as a more reliable alternative
        }

        function startGame() {
            if (currentPlayers.length === 0) {
                feedbackMessage.textContent = "You've guessed all the players!";
                guessBtn.disabled = true;
                return;
            }

            const randomIndex = Math.floor(Math.random() * currentPlayers.length);
            currentPlayer = currentPlayers[randomIndex];
            currentPlayers.splice(randomIndex, 1);

            pixelationLevel = 10; // Reset pixelation for a new game
            playerImage.src = currentPlayer.image;
            applyPixelation();

            playerGuessInput.value = '';
            feedbackMessage.textContent = '';
            guessBtn.disabled = false;
            nextPlayerBtn.classList.add('hidden');
        }

        function checkGuess() {
            const userGuess = playerGuessInput.value.trim().toLowerCase();
            const correctName = currentPlayer.name.trim().toLowerCase();
            const simplifiedUserGuess = userGuess.replace(/\s+/g, '');
            const simplifiedCorrectName = correctName.replace(/\s+/g, '');

            if (simplifiedUserGuess === simplifiedCorrectName || simplifiedCorrectName.includes(simplifiedUserGuess)) {
                feedbackMessage.textContent = `Correct! It was ${currentPlayer.name}!`;
                playerImage.style.filter = 'none'; // Remove pixelation completely
                guessBtn.disabled = true;
                nextPlayerBtn.classList.remove('hidden');
            } else {
                pixelationLevel -= pixelationDecrement;
                if (pixelationLevel < 1) {
                    playerImage.style.filter = 'none';
                    feedbackMessage.textContent = `Not quite right! The correct answer was ${currentPlayer.name}.`;
                    guessBtn.disabled = true;
                    nextPlayerBtn.classList.remove('hidden');
                } else {
                    applyPixelation();
                    feedbackMessage.textContent = "That's not it. Try again!";
                }
            }
        }

        guessBtn.addEventListener('click', checkGuess);
        nextPlayerBtn.addEventListener('click', startGame);

        startGame();
    }
    // --- Day 16 Gift Logic (Quote Generator) ---
    function setupDay16Gift() {
        console.log("Setting up Day 16 gift: Quote Generator.");

        const quoteText = document.getElementById('quote-text');
        const generateBtn = document.getElementById('generate-quote-btn');

        const quotes = [
            "The best way to predict the future is to create it.",
            "Maybe they hate me because I'm too good.",
            "Your only limit is your imagination.",
            "Your love makes me strong, your hate makes me unstoppable.",
            "The journey of a thousand miles begins with a single step.",
            "I'm not going to change for anyone.",
            "The best time to plant a tree was 20 years ago. The second best time is now.",
            "I am not a perfectionist, but I like to do things well.",
            "Believe you can and you're halfway there.",
            "Talent without working hard is nothing.",
            "Happiness is not something ready-made. It comes from your own actions.",
            "The mind is everything. What you think you become.",
            "Life is what happens when you're busy making other plans.",
            "The only impossible journey is the one you never begin.",
            "Your time is limited, don't waste it living someone else's life.",
            "Fear has killed more dreams then failure",
            "Confidence is the one thing you're born with so don't lost it if you have it because it's always with you for a reason"
        ];

        function getRandomQuote() {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            return quotes[randomIndex];
        }

        function displayNewQuote() {
            quoteText.textContent = getRandomQuote();
        }

        // Set up event listeners
        generateBtn.addEventListener('click', displayNewQuote);

        // Display the first quote when the gift is opened
        displayNewQuote();

        // Cleanup function (optional but good practice)
        return function cleanup() {
            generateBtn.removeEventListener('click', displayNewQuote);
            quoteText.textContent = 'Quote generator is ready...';
        };
    }
    // --- Day 17 Gift Logic ---
    function setupDay17Gift() {
        console.log("Setting up Day 17 gift: 8th Grade Basketball Game.");
        // This gift is a simple iframe, so no complex logic is needed.
        // The HTML file does all the work.
    }
    // --- Day 18 Gift Logic (Memories List) ---
    function setupDay18Gift() {
        console.log("Setting up Day 18 gift: 8th Grade Memories.");
    }

    // --- Day 19 Gift Logic (Memories List) ---
    function setupDay19Gift() {
        console.log("Setting up Day 19 gift: High School Memories.");
    }

    // --- Day 20 Gift Logic (Memories List) ---
    function setupDay20Gift() {
        console.log("Setting up Day 20 gift: Recent Jokes/Memories.");
    }
    // --- Day 21 Gift Logic ---
    function setupDay21Gift() {
        console.log("Setting up Day 21 gift: A Conversation Through Time.");
    }
    // --- Day 22 Gift Logic (Custom Playlist) ---
    function setupDay22Gift() {
        console.log("Setting up Day 22 gift: Custom Playlist.");

        // The array of songs to be displayed.
        // **YOU MUST CUSTOMIZE THIS ARRAY WITH YOUR SONGS**
        const songs = [
            {
                title: "Standing By You",
                artist: "Nish",
                caption: "You definitely don't remember this but remember that one time I got a really bad fever in like 8th grade (12/15/22). I remember listening to this song specifically while talking to you. Brought this song back because I remember very specifically that you ended up texting [if you need anything lmk] exactly when the song played those exact lyrics in the bangla part [tai judi kichu chaow amaki janiye]. I told you about it too. It was such a random moment but memorable.",
                file: "audio/audio/nish_new.mp3" // Updated file path
            },
            {
                title: "Riptide",
                artist: "Vance Joy",
                caption: "I mean this song was quite literally the theme song for 7th grade.",
                file: "audio/audio/riptide.mp3"
            },
            {
                title: "Love Nwantiti",
                artist: "Ckay",
                caption: "I just remember that one time where you said you really liked this song.",
                file: "audio/audio/love.mp3"
            },
            {
                title: "Love Story",
                artist: "Indila",
                caption: "Remember how you and the guys would listen to those french songs during Ms.Harvey's class. I don't know if this is one of those songs but hey its french.",
                file: "audio/audio/french_new.mp3" // Updated file path
            }
        ];

        const playlistContainer = document.getElementById('custom-playlist');
        playlistContainer.innerHTML = ''; // Clear previous content

        songs.forEach(song => {
            // Create the main container for each song item
            const songItem = document.createElement('div');
            songItem.classList.add('song-item');

            // Create the div for song info (title, artist)
            const songInfo = document.createElement('div');
            songInfo.classList.add('song-info');
            songInfo.innerHTML = `<div class="song-title">${song.title}</div><div class="song-artist">${song.artist}</div>`;

            // Create the div for the caption
            const captionDiv = document.createElement('div');
            captionDiv.classList.add('song-caption');
            captionDiv.textContent = song.caption;

            // Create the audio player element
            const audioPlayer = document.createElement('audio');
            audioPlayer.controls = true;
            audioPlayer.src = song.file;

            // Add an event listener to catch any loading errors
            audioPlayer.onerror = function() {
                console.error(`Error loading audio file: ${song.file}`);
                const errorElement = document.createElement('div');
                errorElement.textContent = `Error: Could not load "${song.title}". Please check the file path.`;
                errorElement.style.color = 'red';
                errorElement.style.marginTop = '10px';
                songItem.appendChild(errorElement);
            };

            // Append everything to the song item
            songItem.appendChild(songInfo);
            songItem.appendChild(captionDiv);
            songItem.appendChild(audioPlayer);

            // Append the completed song item to the main playlist container
            playlistContainer.appendChild(songItem);
        });
    }
    // --- Day 23 Gift Logic ---
    async function setupDay23Gift() {
        console.log("Setting up Day 23 gift from file.");
        const giftContainer = document.getElementById('gift-container-23');
        try {
            const response = await fetch('gifts/day23.html');
            const content = await response.text();
            giftContainer.innerHTML = content;
        } catch (error) {
            console.error("Error loading Day 23 gift:", error);
            giftContainer.innerHTML = `<p>Error loading gift for Day 23.</p>`;
        }
    }

    // --- Day 24 Gift Logic (A Personalized Riddle) ---
    async function setupDay24Gift() {
        console.log("Setting up Day 24 gift from file with interactive elements.");

        const giftContainer = document.getElementById('gift-content'); // Updated ID
        try {
            const response = await fetch('gifts/day24.html');
            const content = await response.text();
            giftContainer.innerHTML = content;

            // --- All the interactive logic is now here ---
            const checkBtn = document.getElementById('riddle-check-btn');
            const giveUpBtn = document.getElementById('riddle-give-up-btn');
            const giveUpContainer = document.getElementById('riddle-give-up-container');
            const input = document.getElementById('riddle-input');
            const feedback = document.getElementById('riddle-feedback');
            const answerContent = document.getElementById('riddle-answer-content');

            // This is the correct answer.
            const correctAnswer = "I'm not like Aki."; 
            let incorrectAttempts = 0;
            const maxAttempts = 3;

            // Function to check the user's answer
            if (checkBtn) { // Safety check to ensure button exists
                checkBtn.addEventListener('click', () => {
                    const userAnswer = input.value.trim();

                    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
                        feedback.textContent = "You got it! 🎉";
                        feedback.style.color = '#28a745'; // Green for correct
                        answerContent.style.display = 'block'; // Show the final answer content
                        giveUpContainer.style.display = 'none'; // Hide the give up button
                        checkBtn.disabled = true; // Disable the check button
                        input.disabled = true; // Disable the input
                    } else {
                        incorrectAttempts++;
                        feedback.textContent = "Oops, that's not it. Try again!";
                        feedback.style.color = '#dc3545'; // Red for incorrect
                        answerContent.style.display = 'none'; // Keep the answer hidden

                        if (incorrectAttempts >= maxAttempts) {
                            giveUpContainer.style.display = 'block'; // Show the give up button after max attempts
                            checkBtn.disabled = true; // Disable the check button
                            input.disabled = true; // Disable the input
                        }
                    }
                });
            }

            // Function to reveal the answer if the user gives up
            if (giveUpBtn) { // Safety check
                giveUpBtn.addEventListener('click', () => {
                    feedback.textContent = `Don't worry! The answer was right there all along.`;
                    feedback.style.color = '#333';
                    answerContent.style.display = 'block';
                    giveUpContainer.style.display = 'none';
                });
            }

        } catch (error) {
            console.error("Error loading Day 24 gift:", error);
            giftContainer.innerHTML = `<p>Error loading gift for Day 24.</p>`;
        }
    }

    // --- Day 25 Gift Logic ---
    async function setupDay25Gift() {
        console.log("Setting up Day 25 gift from file.");
        const giftContainer = document.getElementById('gift-container-25');
        try {
            const response = await fetch('gifts/day25.html');
            const content = await response.text();
            giftContainer.innerHTML = content;
        } catch (error) {
            console.error("Error loading Day 25 gift:", error);
            giftContainer.innerHTML = `<p>Error loading gift for Day 25.</p>`;
        }
    }

    // --- Day 26 Gift Logic ---
    async function setupDay26Gift() {
        console.log("Setting up Day 26 gift from file.");
        const giftContainer = document.getElementById('gift-container-26');
        try {
            const response = await fetch('gifts/day26.html');
            const content = await response.text();
            giftContainer.innerHTML = content;
        } catch (error) {
            console.error("Error loading Day 26 gift:", error);
            giftContainer.innerHTML = `<p>Error loading gift for Day 26.</p>`;
        }
    }

    // --- Day 27 Gift Logic ---
    async function setupDay27Gift() {
        console.log("Setting up Day 27 gift from file.");
        const giftContainer = document.getElementById('gift-container-27');
        try {
            const response = await fetch('gifts/day27.html');
            const content = await response.text();
            giftContainer.innerHTML = content;
        } catch (error) {
            console.error("Error loading Day 27 gift:", error);
            giftContainer.innerHTML = `<p>Error loading gift for Day 27.</p>`;
        }
    }
    // --- Day 28 Gift Logic ---
    async function setupDay28Gift() {
        console.log("Setting up Day 28 gift from file.");
        const giftContainer = document.getElementById('gift-container-27');
        try {
            const response = await fetch('gifts/day28.html');
            const content = await response.text();
            giftContainer.innerHTML = content;
        } catch (error) {
            console.error("Error loading Day 28 gift:", error);
            giftContainer.innerHTML = `<p>Error loading gift for Day 28.</p>`;
        }
    }


    });