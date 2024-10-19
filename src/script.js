const score = document.querySelector(".score");
const quiz = document.querySelector("#quiz");
const answer = document.querySelector("#user-answer");
const btn = document.querySelector(".submit");
const sumery = document.querySelector(".sumery");
const start = document.querySelector(".start");
const card = document.querySelector(".card");
let corentScore = 0;
let corentQuiz = 0;

const generateQuiz = async function () {
  try {
    const data = await (
      await fetch("https://opentdb.com/api.php?amount=5")
    ).json();

    const quizData = data.results;

    console.log(quizData);

    quiz.innerHTML = quizData[corentQuiz].question;

    btn.addEventListener("click", function (e) {
      e.preventDefault();

      ans = answer.value.trim();
      if (ans) {
        sumery.textContent = "";

        if (
          ans.toLowerCase() ===
          quizData[corentQuiz].correct_answer.toLowerCase()
        ) {
          score.textContent = `score = ${(corentScore += 1)}`;
        }

        if (corentQuiz === quizData.length - 1) {
          quiz.textContent = "finish";
          answer.style.display = "none";
          btn.disabled = true;
        }
        corentQuiz += 1;
        quiz.innerHTML = quizData[corentQuiz].question;
      } else {
        sumery.textContent = "Please Enter valid value";
        sumery.style.color = "red";
      }

      answer.value = "";
    });
  } catch (error) {
    console.error(error.message);
  }
};

start.addEventListener("click", function () {
  card.style.opacity = "1";
  generateQuiz();
});
