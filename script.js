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

const quizTitleElement = document.getElementById("quiz-title");
const quizDisplayElement = document.getElementById("quiz-display");
const nextBtn = document.getElementById("next-btn");

let currentQuestionNumber = 0;
let score = 0;

const params = new URLSearchParams(location.search);
const quizId = Number(params.get("id"));

const quiz = schoolUnitQuizzes.find(a => a.id === quizId);
const questionsData = quiz.questions;

quizTitleElement.textContent = quiz.title;
quizTitleElement.classList.add("quiz-title");
document.title = `Quisori ❘ クイズサイト ❘ ${quiz.title}`;
// quizId:URLの最後のid（クイズid） quiz:そのクイズの情報すべて titleData:そのクイズのタイトル questionsData:そのクイズの問題情報すべて

showQuiz();

// 1問分の処理
function showQuiz() {
    quizDisplayElement.innerHTML = "";
    nextBtn.style.display = "none";
    if (currentQuestionNumber === questionsData.length - 1) {
        nextBtn.textContent = "結果を表示する";
        nextBtn.classList.add("next-btn--display-result");
    }

    const currentQuetionData = questionsData[currentQuestionNumber];

    // 問題文
    const currentQuestion = document.createElement("p");
    currentQuestion.textContent = `${currentQuetionData.question}`;
    MathJax.typesetPromise([currentQuestion]);
    quizDisplayElement.appendChild(currentQuestion);
    currentQuestion.classList.add("current-question-text");

    // 選択肢ボタン
    if (currentQuetionData.type === "select") {
        select();
    }

    const explanation = document.createElement("p");
    explanation.classList.add("explanation");
    quizDisplayElement.appendChild(explanation);

    // 「select」形式
    function select() {
        currentQuetionData.choices.forEach(choice => {
            const btn = document.createElement("button");
            btn.textContent = choice;
            MathJax.typesetPromise([btn]);
            btn.classList.add("select-btn")

            btn.onclick = () => {
                const buttons = quizDisplayElement.querySelectorAll("button");

                buttons.forEach((b, index) => {
                    b.disabled = true; // ボタンを押せなくする

                    // 押したボタンを緑or赤にする
                    if (b === btn) {
                        if (choice === currentQuetionData.choices[currentQuetionData.correct]) {
                            b.classList.add("correct");
                            score++;
                        } else {
                            b.classList.add("wrong");
                        }
                    }

                    // 正解のボタンを緑にする
                    if (index === currentQuetionData.correct) {
                        b.classList.add("correct");
                    }
                })

                explanation.textContent = currentQuetionData.explanation;
                MathJax.typesetPromise([explanation]);
                explanation.classList.add("show");

                nextBtn.style.display = "block";
            }

            quizDisplayElement.appendChild(btn);
        })
    }
}

// 「次へ」ボタン
nextBtn.onclick = () => {
    currentQuestionNumber++;

    if (currentQuestionNumber < questionsData.length) {
        showQuiz();
    } else {
        showResult();
    }
}

// 結果表示
function showResult() {
    nextBtn.style.display = "none";

    const rank = getRank();

    quizDisplayElement.innerHTML = `
        <div class="result-box">
            <h2 class="result__text--kekka">結果</h2>
            <p class="result__score">${score} / ${questionsData.length}</p>

            <h2 class="result__text--hyouka">評価</h2>
            <p class="result__rank rank-${rank}">${rank}</p>

            <button onclick="location.reload()">もう一回</button>
            <button onclick="window.location.href='index.html'">問題一覧に戻る</button>
        </div>
    `;
}

// 評価表示
function getRank() {
    if (score === questionsData.length) return "S";
    if (score >= questionsData.length * 0.8) return "A";
    if (score >= questionsData.length / 2) return "B";
    return "C";
}