import { quizzes } from './quizData.js';

const quizList = document.getElementById("quiz-list");

quizzes.forEach(index => {
    const item = document.createElement("a");
    item.href = `quiz.html?id=${index.id}`;

    item.innerHTML = `
        <h2>${index.title}</h2>
        <p>${index.description}</p> 
    `;

    quizList.appendChild(item);
});