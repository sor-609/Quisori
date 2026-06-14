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

let currentQuestion = 0;
let score = 0;

const params = new URLSearchParams(location.search);
const quizId = Number(params.get("id"));

const quiz = schoolUnitQuizzes.find(a => a.id === quizId);
const questionsData = quiz.questions;

quizTitleElement.textContent = quiz.title;
document.title = `Quisori ❘ クイズサイト ❘ ${quiz.title}`;
// quizId:URLの最後のid（クイズid） quiz:そのクイズの情報すべて titleData:そのクイズのタイトル questionsData:そのクイズの問題情報すべて

showQuiz();

// 1問分の処理
// currentQuestion:何問目（-1された値） q:（currentQuestion）問目の問題情報 p:問題文（Q：～）
function showQuiz() {
    quizDisplayElement.innerHTML = "";
    nextBtn.style.display = "none";

    const q = questionsData[currentQuestion];

    // 問題文
    const p = document.createElement("p");
    p.textContent = `${q.question}`;
    quizDisplayElement.appendChild(p);

    // 選択肢ボタン
    if (q.type === "select") {
        select();
    }

    const explanation = document.createElement("p");
    explanation.classList.add("explanation");
    quizDisplayElement.appendChild(explanation);

    // 「select」方式
    function select() {
        q.choices.forEach(choice => {
            const btn = document.createElement("button");
            btn.textContent = choice;

            btn.onclick = () => {
                const buttons = quizDisplayElement.querySelectorAll("button");

                buttons.forEach(b => {
                    b.disabled = true; // ボタンを押せなくする
                    b.classList.add("unpressed");

                    // 押したボタンを緑or赤にする
                    if (b === btn) {
                        if (choice === q.choices[q.correct]) {
                            b.classList.add("correct");
                            score++; // 正解数カウント+1
                        } else {
                            b.classList.add("wrong");
                        }

                        b.classList.remove("unpressed");
                    }

                    // 正解のボタンを緑にする
                    if (b.textContent === q.choices[q.correct]) {
                        b.classList.add("correct");
                        b.classList.remove("unpressed");
                    }
                })

                explanation.textContent = q.explanation;
                explanation.classList.add("show");

                nextBtn.style.display = "block";
            }

            quizDisplayElement.appendChild(btn);
        })
    }
}

// 「次へ」ボタン
nextBtn.onclick = () => {
    currentQuestion++;

    if (currentQuestion < questionsData.length) {
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