const categories = ['Car Models', 'Disney Movies', 'Famous Lakes', 'Mount Rushmore Presidents'];

let words = [
    // Category 1: Car Models
    'Odyssey', 'Forester', 'Tahoe', 'Impala',
    // Category 2: Disney Movies
    'Soul', 'Cars', 'Luca', 'Up',
    // Category 3: Famous Lakes
    'Eerie', 'Superior', 'Como', 'Victoria',
    // Category 4: Mount Rushmore Presidents
    'George', 'Abraham', 'Thomas', 'Theodore'
    // Add more words as needed
];

let selectedWords = [];
let correctGuesses = [];

function startGame() {
    selectedWords = [];
    correctGuesses = [];
    displayWords();
}

function displayWords() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';

    // Shuffle the array of words
    const shuffledWords = shuffleArray(words);

    shuffledWords.forEach((word, index) => {
        const square = document.createElement('div');
        square.classList.add('square');
        square.textContent = word;
        square.addEventListener('click', () => handleWordClick(index));
        gameContainer.appendChild(square);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function handleWordClick(index) {
    const word = words[index];

    // Toggle the selection of the word
    if (selectedWords.includes(word)) {
        // Word is already selected, unselect it
        selectedWords = selectedWords.filter(selectedWord => selectedWord !== word);
    } else {
        // Word is not selected, select it
        selectedWords.push(word);
    }

    // Visual feedback: Highlight selected words
    updateWordHighlights();
}

function updateWordHighlights() {
    const squares = document.querySelectorAll('.square');
    squares.forEach((square, index) => {
        const word = words[index];
        if (selectedWords.includes(word)) {
            square.classList.add('selected');
        } else {
            square.classList.remove('selected');
        }
    });
}

function checkGuess() {
    // Visual feedback: Highlight selected words
    updateWordHighlights();

    // Use a setTimeout to ensure the visual update occurs before checking the length
    setTimeout(() => {
        // Filter out already guessed words from the selectedWords array
        const visibleSelectedWords = selectedWords.filter(word => words.includes(word));

        if (visibleSelectedWords.length === 4) {
            // Check if the selected words match the same category
            const selectedCategories = visibleSelectedWords.map(word => getCategoryForWord(word));
            const uniqueCategories = [...new Set(selectedCategories)];

            if (uniqueCategories.length === 1) {
                const correctCategory = uniqueCategories[0];
                
                alert(`Correct! Category: ${correctCategory}`);
                correctGuesses.push(...visibleSelectedWords);

                // Remove selected words
                removeSelectedWords();

                // Display the remaining words for the next category
                displayWords();
            } else {
                alert('Incorrect. Try again!');
                // Reset selected words for the incorrect guess
                selectedWords = [];
                updateWordHighlights();
            }
        } else {
            alert('Please select 4 words before guessing.');
        }
    }, 0); // Using a very short timeout (0 milliseconds) to let the visual update occur
}

function getCategoryForWord(word) {
    // Find the category to which the word belongs
    for (const category of categories) {
        if (wordsByCategory[category].includes(word)) {
            return category;
        }
    }
    return null;
}

// ...

const wordsByCategory = {
    'Car Models': ['Odyssey', 'Forester', 'Tahoe', 'Impala'],
    'Disney Movies': ['Soul', 'Cars', 'Luca', 'Up'],
    'Famous Lakes': ['Eerie', 'Superior', 'Como', 'Victoria'],
    'Mount Rushmore Presidents': ['George', 'Abraham', 'Thomas', 'Theodore']
    // Add more categories and words as needed
};

function removeSelectedWords() {
    // Remove selected words from the array
    words = words.filter(word => !selectedWords.includes(word));
}

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', startGame);















