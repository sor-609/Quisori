import { quizzes } from './quizData.js';

const quizTitleElement = document.getElementById("quiz-title");
const quizDisplayElement = document.getElementById("quiz-display");
const nextBtn = document.getElementById("next-btn");

let currentQuestion = 0;
let score = 0;

const params = new URLSearchParams(window.location.search);
const quizId = Number(params.get("id"));

const quiz = quizzes[a => a.id === quizId];
console.log(quiz);
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
    p.textContent = `Q${currentQuestion + 1}: ${q.question}`;
    quizDisplayElement.appendChild(p);

    // 選択肢ボタン
    if (q.type === "select") {
        selecting();
    }

    const explanation = document.createElement("p");
    explanation.classList.add("explanation");
    quizDisplayElement.appendChild(explanation);

    // 「select」方式
    function selecting() {
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

    quizDisplayElement.innerHTML = `
        <div class="result-box">
            <h2>結果</h2>
            <p class="score">${score} / ${questionsData.length}</p>
            <p class="message">${getMessage()}</p>
            <br>
            <button onclick="location.reload()">もう一回</button>
            <button onclick="window.location.href='index.html'">クイズ一覧に戻る</button>
        </div>
    `;
}

// 結果メッセージ
function getMessage() {
    if (score === questionsData.length) return "満点！　評価：エベレスト級";
    if (score === questionsData.length - 1) return "もう一息！　評価：Ｋ２級";
    if (score >= questionsData.length / 2) return "いい感じ！　評価：富士山級";
    if (score >= questionsData.length + 1) return "ギリＯＫ！　評価：ウィチプルーフ山級";
    return "残念！もう一度挑戦しよう！　評価：マリアナ海溝級";
}