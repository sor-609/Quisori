import { genreNameList } from './quizData.js';
import { quizzes } from './quizData.js';

const quizList = document.getElementById("quiz-list");

quizzes.forEach(index => {
    const quizItem = document.createElement("div");

    const genresHtml = index.genres
        .map(genresItem => `<a id="genres" href="index.html?genres=${genresItem}">#${genreNameList[genresItem]}</a>`)
        .join(" , ");

    quizItem.innerHTML = `
        <h2 id="title">${index.title}</h2>
        <p id="desc">${index.description}</p>
        ${genresHtml}
    `;

    quizItem.onclick = () => {
        location.href = `quiz.html?id=${index.id}`;
    };

    quizList.appendChild(quizItem);
});