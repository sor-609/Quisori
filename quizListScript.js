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

let isThereIsTopQuiz = false;
const params = new URLSearchParams(location.search);

schoolUnitQuizzes.forEach(index => {

    const quizItem = document.createElement("div");
    quizItem.classList.add("quiz-item");

    if (isThereIsTopQuiz === false) {
        quizItem.classList.add("top-quiz");
        isThereIsTopQuiz = true;
    }

    quizItem.innerHTML = `
        <h2 class="quiz-list-title">${index.title}</h2>
        `;

    quizItem.onclick = () => {
        location.href = `quiz.html?id=${index.id}`;
    };

    quizList.appendChild(quizItem);
});

// index.htmlにdiv追加で非学校単元用のリンクを作る。