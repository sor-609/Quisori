// 上から、クイズID、タイトル、問題情報（問題文、選択肢、答え、解説）。 追加する際は同じフォーマットで下に書く。
// コピペ用：id: ,title: "",genres: [""],questions: [{type: "",question: "",choices: [""],correct: ,explanation: ""}]
const schoolUnitQuizzes = [
    {
        id: 1,
        title: "式の計算",
        genres: ["math","HMath"],
        questions: [
            {
                type: "select",
                question: "4^0",
                choices: ["0","1","2"],
                correct: 1,
                explanation: "a^0=1である。"
            }
        ]
    }
];

export { schoolUnitQuizzes };