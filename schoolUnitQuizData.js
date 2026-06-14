// 上から、ID、タイトル、問題情報（問題形式、問題文、選択肢、答え、解説）。 追加する際は同じフォーマットで下に書く。
/* コピペ用：
    {
        id: ,
        title: "",
        genres: [""],
        questions: [
            {
                type: "",
                question: "",
                choices: [""],
                correct: ,
                explanation: ""
            }
        ]
    }
*/
const schoolUnitQuizzes = [
    {
        id: 1,
        title: "式の展開",
        genres: ["math","JHMath"],
        questions: [
            {
                type: "select",
                question: "2x×(4x+3)=?",
                choices: ["8x+6","8x²+3","8x²+6x"],
                correct: 2,
                explanation: "2x×(4x+3)\n=2x×4x+2x×3\n=8x²+6x"
            }
        ]
    }
];

export { schoolUnitQuizzes };