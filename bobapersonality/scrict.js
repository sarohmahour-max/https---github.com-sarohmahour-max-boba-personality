


const personalities = {
    strawberry: {
        name: "The Strawberry Sweetheart",
        emoji: "🍓",
        traits: "Sweet • Caring • Dreamy",
        description:
            "You're the comforting friend who makes ordinary moments feel special. You care deeply and bring warmth wherever you go.",
        flavor: "Strawberry Milk Boba"
    },

    taro: {
        name: "The Taro Enigma",
        emoji: "🧋",
        traits: "Creative • Mysterious • Unique",
        description:
            "You see the world differently. You're imaginative, thoughtful, and full of unexpected ideas. Your vibe is impossible to copy.",
        flavor: "Taro Milk Tea"
    },

    matcha: {
        name: "The Matcha Main Character",
        emoji: "🍵",
        traits: "Independent • Curious • Cool",
        description:
            "You're curious, independent, and always exploring something new. You like doing things your own way.",
        flavor: "Matcha Boba"
    },

    brownSugar: {
        name: "The Brown Sugar Boss",
        emoji: "🤎",
        traits: "Confident • Ambitious • Bold",
        description:
            "You bring determination and big energy. When you have a goal, you love finding a way to make it happen.",
        flavor: "Brown Sugar Boba"
    },

    blueberry: {
        name: "The Blueberry Chaos",
        emoji: "🫐",
        traits: "Funny • Spontaneous • Unpredictable",
        description:
            "You're the plot twist in every group chat. You bring laughter, spontaneous ideas, and memorable moments.",
        flavor: "Blueberry Boba"
    }
};




const questions = [
    {
        question: "Your perfect weekend looks like...",
        options: [
            ["A cosy day with my favourite people", "strawberry"],
            ["Making art or exploring ideas", "taro"],
            ["Learning or trying something new", "matcha"],
            ["Working towards my next big goal", "brownSugar"],
            ["Going wherever the day takes me", "blueberry"]
        ]
    },

    {
        question: "Pick your dream aesthetic.",
        options: [
            ["Pink, flowers and soft lights", "strawberry"],
            ["Purple skies and mysterious vibes", "taro"],
            ["Green tones and clean spaces", "matcha"],
            ["Rich colours and luxury details", "brownSugar"],
            ["Colourful chaos and fun stickers", "blueberry"]
        ]
    },

    {
        question: "Your friends would describe you as...",
        options: [
            ["The caring one", "strawberry"],
            ["The creative thinker", "taro"],
            ["The independent one", "matcha"],
            ["The confident leader", "brownSugar"],
            ["The funny wildcard", "blueberry"]
        ]
    },

    {
        question: "Choose a superpower.",
        options: [
            ["Making everyone feel loved", "strawberry"],
            ["Turning imagination into reality", "taro"],
            ["Learning anything quickly", "matcha"],
            ["Achieving every goal I set", "brownSugar"],
            ["Making any situation fun", "blueberry"]
        ]
    },

    {
        question: "When plans suddenly change, you...",
        options: [
            ["Check that everyone is okay", "strawberry"],
            ["Find a creative alternative", "taro"],
            ["Adapt and keep moving", "matcha"],
            ["Take charge and make a new plan", "brownSugar"],
            ["Say, 'Let's see what happens!'", "blueberry"]
        ]
    },

    {
        question: "Pick your ideal evening.",
        options: [
            ["A movie and snacks with friends", "strawberry"],
            ["Music, art and daydreaming", "taro"],
            ["A new hobby or documentary", "matcha"],
            ["Planning my next big move", "brownSugar"],
            ["Games, jokes and random adventures", "blueberry"]
        ]
    },

    {
        question: "What's your biggest strength?",
        options: [
            ["Empathy", "strawberry"],
            ["Imagination", "taro"],
            ["Curiosity", "matcha"],
            ["Determination", "brownSugar"],
            ["Humour", "blueberry"]
        ]
    },

    {
        question: "Choose the vibe that feels most like you.",
        options: [
            ["A warm hug", "strawberry"],
            ["A beautiful mystery", "taro"],
            ["Quiet confidence", "matcha"],
            ["Unstoppable energy", "brownSugar"],
            ["Unexpected fun", "blueberry"]
        ]
    }
];


const quizContainer = document.getElementById("quiz-container");

let currentQuestion = 0;
let scores = {};
let selectedAnswers = [];

function resetScores() {
    scores = {
        strawberry: 0,
        taro: 0,
        matcha: 0,
        brownSugar: 0,
        blueberry: 0
    };
}




function renderQuestion() {
    const item = questions[currentQuestion];
    const progress = (currentQuestion / questions.length) * 100;

    quizContainer.innerHTML = `
        <div class="quiz-card">

            <p class="eyebrow">
                QUESTION ${currentQuestion + 1} OF ${questions.length}
            </p>

            <div
                class="quiz-progress"
                role="progressbar"
                aria-label="Quiz progress"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow="${Math.round(progress)}"
            >
                <div
                    class="quiz-progress-fill"
                    style="width: ${progress}%"
                ></div>
            </div>

            <h3 class="quiz-question">
                ${item.question}
            </h3>

            <div id="quiz-options">
                ${item.options.map((option, index) => `
                    <button
                        type="button"
                        class="quiz-option"
                        data-index="${index}"
                        aria-pressed="${selectedAnswers[currentQuestion] === index}"
                    >
                        ${option[0]}
                        ${selectedAnswers[currentQuestion] === index ? " ✓" : ""}
                    </button>
                `).join("")}
            </div>

            <div class="quiz-controls">
                <button
                    type="button"
                    id="previous-question"
                    ${currentQuestion === 0 ? "disabled" : ""}
                >
                    ← Back
                </button>

                <button
                    type="button"
                    id="next-question"
                    ${selectedAnswers[currentQuestion] === undefined ? "disabled" : ""}
                >
                    ${currentQuestion === questions.length - 1
                        ? "Reveal My Boba ✨"
                        : "Next →"}
                </button>
            </div>

        </div>
    `;

    quizContainer.querySelectorAll(".quiz-option").forEach(button => {
        button.addEventListener("click", () => {
            selectedAnswers[currentQuestion] =
                Number(button.dataset.index);

            renderQuestion();
        });
    });

    document
        .getElementById("previous-question")
        .addEventListener("click", () => {
            if (currentQuestion > 0) {
                currentQuestion--;
                renderQuestion();
            }
        });

    document
        .getElementById("next-question")
        .addEventListener("click", () => {
            if (selectedAnswers[currentQuestion] === undefined) {
                return;
            }

            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                renderQuestion();
            } else {
                calculateResult();
            }
        });
}




function calculateResult() {
    resetScores();

    selectedAnswers.forEach((answerIndex, questionIndex) => {
        const chosenOption =
            questions[questionIndex].options[answerIndex];

        if (chosenOption) {
            scores[chosenOption[1]]++;
        }
    });

    const highestScore = Math.max(...Object.values(scores));

    const winners = Object.keys(scores).filter(
        key => scores[key] === highestScore
    );

    // If there is a tie, select randomly among tied results.
    const winner = winners[
        Math.floor(Math.random() * winners.length)
    ];

    showResult(winner);
}


function showResult(type) {
    const result = personalities[type];

    quizContainer.innerHTML = `
        <div class="quiz-card quiz-result">

            <p class="eyebrow">YOUR BOBA PERSONALITY IS...</p>

            <div class="result-emoji">${result.emoji}</div>

            <h3>${result.name}</h3>

            <p><strong>${result.traits}</strong></p>

            <p>${result.description}</p>

            <p>
                <strong>Your flavour:</strong> ${result.flavor}
            </p>

            <button
                type="button"
                class="primary-button"
                id="restart-quiz"
            >
                Take the Quiz Again ↻
            </button>

        </div>
    `;

    document
        .getElementById("restart-quiz")
        .addEventListener("click", startQuiz);

    quizContainer.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}




function startQuiz() {
    currentQuestion = 0;
    selectedAnswers = [];
    resetScores();
    renderQuestion();
}




const compatibilityButton =
    document.getElementById("compatibility-button");

if (compatibilityButton) {
    compatibilityButton.addEventListener("click", () => {
        const types = Object.values(personalities);

        const first = types[
            Math.floor(Math.random() * types.length)
        ];

        let second = types[
            Math.floor(Math.random() * types.length)
        ];

        // Make sure the two randomly chosen types differ.
        while (second.name === first.name) {
            second = types[
                Math.floor(Math.random() * types.length)
            ];
        }

        const match = Math.floor(Math.random() * 31) + 70;

        document.getElementById("compatibility-result").textContent =
            `${first.emoji} ${first.name} + ${second.emoji} ` +
            `${second.name} = ${match}% vibe match!`;
    });
}


/* INITIALISE WEBSITE */

resetScores();
startQuiz();
