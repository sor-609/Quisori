// 上から、ID、タイトル、問題情報（問題形式、問題文、選択肢、答え、解説）。 追加する際は同じフォーマットで下に書く。
/* コピペ用：
    {
        id: ,
        unitName: "",
        quizzes: [
            {
                id: ,
                title: "",
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
        ]
    }
*/
const schoolUnitQuizzes = [
    {
        id: 1,
        unitName: "式の展開",
        quizzes: [
            {
                id: 1,
                title: "［基礎］式の展開（１）",
                questions: [
{
    type: "select",
    question: "次の式を計算しなさい。\n$ 2x ( 4x + 3 ) $",
    choices: ["$ 8x + 6 $","$ 8x^2 + 3 $","$ 8x^2 + 6x $"],
    correct: 2,
    explanation: "$ 2x \\times ( 4x + 3 ) $\n$ = 2x \\times 4x + 2x \\times 3 $\n$ = 8x^2 + 6x $"
},{
    type: "select",
    question: "次の式を計算しなさい。\n$ ( x + 2 ) \\times ( -4x ) $",
    choices: ["$ -7x $","$ -4x^2 - 8x $","$ -4x^2 + 2 $"],
    correct: 1,
    explanation: "$ ( x + 2 ) \\times ( -4x ) $\n$ = x \\times ( -4x ) + 2 \\times ( -4x ) $\n$ = -4x^2 - 8x $"
},{
    type: "select",
    question: "次の式を計算しなさい。\n$ -5a ( a - 6b ) $",
    choices: ["$ -5a^2 - 30ab $","$ -5a^2 - 6b $","$ -5a^2 + 30ab $"],
    correct: 2,
    explanation: "$ -5a ( a - 6b ) $\n$ = -5a \\times a - 5a \\times ( -6b ) $\n$ = -5a^2 + 30ab $"
},{
    type: "select",
    question: "次の式を計算しなさい。\n$ \\frac{1}{3}x ( -3x + y ) $",
    choices: ["$ -x^2 + y $","$ -9x^2 + 3y $","$ -x^2 + \\frac{1}{3}xy $"],
    correct: 2,
    explanation: "$ \\frac{1}{3}x ( -3x + y ) $\n$ = \\frac{1}{3}x \\times ( -3x ) + \\frac{1}{3}x \\times y $\n$ = -x^2 + \\frac{1}{3}xy $" // ここ作ったらコミットする！！
}
                ]
            },
            {
                id: 2,
                title: "［基礎］式の展開（２）",
                questions: [
{
    type: "",
    question: "",
    choices: [""],
    correct: 0,
    explanation: ""
}
                ]
            }
        ]
    },
    {
        id: 2,
        unitName: "因数分解",
        quizzes: [
            {
                id: 1,
                title: "［基礎］因数分解（１）",
                questions: [
{
    type: "",
    question: "",
    choices: [""],
    correct: 0,
    explanation: ""
}
                ]
            }
        ]
    }
];

export { schoolUnitQuizzes };