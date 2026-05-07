import { quizzes } from './quizData.js';

const quizList = document.getElementById("quiz-list");

quizzes.forEach(index => {
    const item = document.createElement("div");

    item.innerHTML = `
        <h2>${index.title}</h2>
        <p>${index.description}</p> 
    `;

    item.onclick = () => {
        location.href = `quiz.html?id=${index.id}`;
    };

    quizList.appendChild(item);
});