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
import { schoolUnitQuizzes } from './schoolUnitQuizData.js';

const listsContainer = document.getElementById("lists-container");
const unitList = document.getElementById("unit-list");
const quizList = document.getElementById("quiz-list");

let selectedUnitId = 0; // 0は非表示

schoolUnitQuizzes.forEach((unitIndex, index) => {

    const unitItem = document.createElement("div");
    unitItem.classList.add("unit-item");
    unitItem.dataset.id = unitIndex.id;

    unitItem.innerHTML = `
        <h2 class="unit-item-title">${unitIndex.unitName}</h2>

        <svg class="unit-item-arrow" viewBox="0 0 20 20">
            <polyline class="unit-item-arrow-line top" points="10,3 10,17" />
            <polyline class="unit-item-arrow-line bottom" points="10,3 10,17" />
        </svg>
        `;

    unitList.appendChild(unitItem);

    const unitId = unitIndex.id;
    unitItem.onclick = () => {
        quizList.classList.remove("showed");
        quizList.replaceChildren();

        if (selectedUnitId !== unitId) {
            showQuizzes();
        } else {
            selectedUnitId = 0;
        }
        
        document.querySelectorAll(".unit-item").forEach(item => {
            item.classList.remove("selected");

            const unitArrowTop = item.querySelector(".unit-item-arrow-line.top");
            unitArrowTop.setAttribute(
                "points", "10,3 10,17"
            );
            const unitArrowBottom = item.querySelector(".unit-item-arrow-line.bottom");
            unitArrowBottom.setAttribute(
                "points", "10,3 10,17"
            );
        });

        const selectedUnit = document.querySelector(`[data-id="${selectedUnitId}"]`);
        selectedUnit?.classList.add("selected");

        document.documentElement.style.setProperty(
            "--quiz-list-offset",
            `${selectedUnit.getBoundingClientRect().top - listsContainer.getBoundingClientRect().top}px`
        );

        const selectedUnitArrowTop = selectedUnit.querySelector(".unit-item-arrow-line.top");
        selectedUnitArrowTop.setAttribute(
            "points", "5,5 10,10"
        );
        const selectedUnitArrowBottom = selectedUnit.querySelector(".unit-item-arrow-line.bottom");
        selectedUnitArrowBottom.setAttribute(
            "points", "5,15 10,10"
        );
    };

    function showQuizzes() {
        unitIndex.quizzes.forEach(quizIndex => {

            const quizItem = document.createElement("div");
            quizItem.classList.add("quiz-item");

            quizItem.innerHTML = `
                <h2 class="quiz-item-title">${quizIndex.title}</h2>
                `;

            quizItem.onclick = () => {
                location.href = `quiz.html?id=${unitIndex.id}_${quizIndex.id}`;
            };

            quizList.appendChild(quizItem);
        });

        selectedUnitId = unitId;
        quizList.classList.add("showed");
    }
});

// index.htmlにdiv追加で非学校単元用のリンクを作る。