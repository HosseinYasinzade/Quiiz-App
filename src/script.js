const score = document.querySelector(".score");
const quiz = document.querySelector("#quiz");
const answer = document.querySelector("#user-answer");
const btn = document.querySelector(".submit");
const sumery = document.querySelector(".sumery");
const start = document.querySelector(".start");
const card = document.querySelector(".card");
let corent_score = 0;
let corent_quiz = 0;

const generateQuiz = async function () {
  try {
    const data = await (
      await fetch("https://opentdb.com/api.php?amount=5")
    ).json();

    const quizData = data.results;

    console.log(quizData);

    quiz.textContent = quizData[corent_quiz].question;

    btn.addEventListener("click", function (e) {
      e.preventDefault();

      ans = answer.value.trim();
      if (ans) {
        sumery.textContent = "";

        if (
          ans.toLowerCase() ===
          quizData[corent_quiz].incorrect_answers[0].toLowerCase()
        ) {
          score.textContent = `score = ${(corent_score += 1)}`;
        }

        if (corent_quiz === quizData.length - 1) {
          quiz.textContent = "finish";
          answer.style.display = "none";
          btn.disabled = true;
        }
        corent_quiz += 1;
        quiz.textContent = quizData[corent_quiz].question;
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
