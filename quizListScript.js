import { genreNames } from './quizData.js';
import { quizzes } from './quizData.js';

const quizList = document.getElementById("quiz-list");

quizzes.forEach(index => {
    const item = document.createElement("div");

    const genresName = index.genres.map(name => genreNames[name]);
    console.log(genresName);

    item.innerHTML = `
        <h2 id="title">${index.title}</h2>
        <p id="desc">${index.description}</p>
        <a id="genres" href="index.html?genres=${genresName}></a>
    `;

    item.onclick = () => {
        location.href = `quiz.html?id=${index.id}`;
    };

    quizList.appendChild(item);
});