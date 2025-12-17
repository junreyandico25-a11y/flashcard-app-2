document.addEventListener('DOMContentLoaded', () => {
    const flashcardInner = document.getElementById('flashcard-inner');
    const questionEl = document.getElementById('question');
    const choicesEl = document.getElementById('choices');
    const feedbackEl = document.getElementById('feedback');
    const resetButton = document.getElementById('reset-button');
    
    let currentCardIndex = 0;
    let score = 0;
    
    const flashcards = [
  {
    question: "1. Which programming language is known as the language of AI?",
    choices: ["C++", "Java", "Python", "PHP"],
    answer: "Python"
  },
  {
    question: "2. What does 'AI' stand for in the field of computer science?",
    choices: ["Automated Interface", "Artificial Intelligence", "Advanced Integration", "Algorithmic Index"],
    answer: "Artificial Intelligence"
  },
  {
    question: "3. In computer hardware, what is considered the 'brain' of the computer?",
    choices: ["RAM", "Hard Drive", "CPU", "GPU"],
    answer: "CPU"
  },
  {
    question: "4. Which of the following is a type of Machine Learning where the model is trained on labeled data?",
    choices: ["Unsupervised Learning", "Supervised Learning", "Reinforcement Learning", "Black Box Learning"],
    answer: "Supervised Learning"
  },
  {
    question: "5. What does HTML stand for in web development?",
    choices: ["Hyper Text Markup Language", "High Tech Machine Language", "Hyperlink and Text Management", "Home Tool Markup Language"],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "6. Which AI technology is designed to simulate human conversation through text or voice?",
    choices: ["Blockchain", "Chatbot", "Compiler", "Data Mining"],
    answer: "Chatbot"
  },
  {
    question: "7. What is the process of finding and fixing errors in a program's source code called?",
    choices: ["Compiling", "Encryption", "Debugging", "Scanning"],
    answer: "Debugging"
  },
  {
    question: "8. A 'Neural Network' is a computational model inspired by which biological organ?",
    choices: ["Heart", "Lungs", "Brain", "Liver"],
    answer: "Brain"
  },
  {
    question: "9. Which storage type is 'volatile,' meaning it loses its data when the power is turned off?",
    choices: ["SSD", "RAM", "ROM", "Flash Drive"],
    answer: "RAM"
  },
  {
    question: "10. What is the term for a set of instructions that a computer follows to solve a specific problem?",
    choices: ["Algorithm", "Variable", "Syntax", "Binary"],
    answer: "Algorithm"
  }
];
    
    const totalCards = flashcards.length;

    function loadCard(index) {
        flashcardInner.classList.remove('is-flipped');
        feedbackEl.className = 'feedback';
        
        const card = flashcards[index];
        questionEl.textContent = card.question;
        choicesEl.innerHTML = '';

        card.choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice;
            button.addEventListener('click', () => handleChoiceClick(choice, card.answer));
            choicesEl.appendChild(button);
        });
        
        resetButton.textContent = (index === totalCards - 1) ? "Finish" : "Next Question";
    }

    function handleChoiceClick(selectedChoice, correctAnswer) {
        disableChoices(); 
        
        if (selectedChoice === correctAnswer) {
            feedbackEl.textContent = "Correct!";
            feedbackEl.classList.add('correct');
            score++; 
        } else {
            feedbackEl.textContent = "Incorrect. The correct answer was " + correctAnswer + ".";
            feedbackEl.classList.add('incorrect');
        }
        
        flashcardInner.classList.add('is-flipped');
    }

    function disableChoices() {
        Array.from(choicesEl.children).forEach(button => {
            button.disabled = true;
        });
    }

    function displayFinalScore() {
        flashcardInner.classList.remove('is-flipped');

        let masteryMessage = '';
        if (score >= 8) {
            masteryMessage = '<p style="color: green; font-size: 1.5em; font-weight: bold;">Mastered!</p>';
        } else {
            masteryMessage = '<p style="color: red; font-size: 1.5em; font-weight: bold;">Unmastered.</p>';
        }

        questionEl.textContent = "Flashcard Complete!";
        choicesEl.innerHTML = `
            <h2>Score:</h2>
            <p style="font-size: 2em; font-weight: bold; color: white">${score} / ${totalCards}</p>
            ${masteryMessage}
            <button id="restart-button" style="margin-top: 20px;">Restart</button>
        `;
        
        document.querySelector('.flashcard-back').style.display = 'none';
        document.getElementById('restart-button').addEventListener('click', () => {
            currentCardIndex = 0;
            score = 0;
            document.querySelector('.flashcard-back').style.display = 'flex';
            loadCard(currentCardIndex);
        });
    }

    function goToNextCard() {
        if (currentCardIndex < totalCards - 1) {
            currentCardIndex++;
            loadCard(currentCardIndex);
        } else {
            displayFinalScore();
        }
    }

    resetButton.addEventListener('click', goToNextCard);

    loadCard(currentCardIndex);
});
