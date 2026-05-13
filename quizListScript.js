import { genreNameList } from './quizData.js';
import { quizzes } from './quizData.js';

const quizList = document.getElementById("quiz-list");

const params = new URLSearchParams(location.search);
const displayGenre = params.get("genre");

quizzes.forEach(index => {
    if (index.includes(displayGenre)) {
        const quizItem = document.createElement("div");

        const genresHtml = index.genres
            .map(genresItem => `<a class="genre" href="index.html?genre=${genresItem}">#${genreNameList[genresItem]}</a>`)
            .join(" , ");

        quizItem.innerHTML = `
            <h2 class="title">${index.title}</h2>
            <div class="genre-list">${genresHtml}</div>
            <p class="desc">${index.description}</p>
            `;

        quizItem.onclick = () => {
            location.href = `quiz.html?id=${index.id}`;
        };

        quizList.appendChild(quizItem);
    }
});