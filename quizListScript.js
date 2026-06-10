const header = `
<header>
    <div class="logo">Quisori</div>

    <nav>
        <a href="index.html">ホーム</a>
    </nav>
</header>
`; // <a href="index.html?common">クイズ記事</a> <a href="#">お問い合わせ</a>
document.getElementById("header").innerHTML = header;

const links = document.querySelectorAll("nav a");

if (location.pathname === "/Quisori/") {
    links[0].classList.add("currentPage");
}
else {
    links.forEach(link => {
        if (window.location.href.includes(link.href)) {
            link.classList.add("currentPage");
        }
    });
}

import { genreNameList } from './commonQuizData.js';
import { commonQuizzes } from './commonQuizData.js';
import { schoolUnitQuizzes } from './schoolUnitQuizData.js';

const quizList = document.getElementById("quiz-list");

const params = new URLSearchParams(location.search);
const displayGenre = params.get("genre");

schoolUnitQuizzes.forEach(index => {
    const indexGenre = index.genres;

    if (displayGenre === null || indexGenre.includes(displayGenre)) {
        const quizItem = document.createElement("div");

        const genresHtml = index.genres
            .map(genresItem => `<a class="genre" href="index.html?genre=${genresItem}">#${genreNameList[genresItem]}</a>`)
            .join(" , ");

        quizItem.innerHTML = `
            <h2 class="title">${index.title}</h2>
            <div class="genre-list">${genresHtml}</div>
            <p class="desc" style="display:none;">${index.description}</p>
            `;

        quizItem.onclick = () => {
            location.href = `quiz.html?id=${index.id}`;
        };

        quizList.appendChild(quizItem);
    }
});

// index.htmlにdiv追加で非学校単元用のリンクを作る。
// 学校単元・非学校単元のリストが別々になっているので、quizzesに合体して偶奇で区別するか、別のリストとしてifで分岐させる。