let startBtn = document.querySelector(".start");
let score = document.querySelector(".score");
let timeLine = document.querySelector(".time");
let nextBtn = document.querySelector(".next");
let infoBtn = document.querySelector(".info");
let wordInput = document.querySelector(".word_input");
let infoText = document.querySelector(".info_text");
let wordBtn = document.querySelectorAll(".words div");

let written_text = "";

let word = {};
let scoreNumber = 10;
let time = 30;
let timeInterval;
let data = [
  { name: "lebron", about: "Most famous basketball player" },
  { name: "hamilton", about: "Most famous F1 racer" },
  { name: "english", about: "Most used language" },
  { name: "roma", about: "The capital of the Italy" },
  { name: "china", about: "The most populous country in the world" },
];


startBtn.addEventListener("click", () => {
  if (typeof word.name == "undefined") {
    timeInterval = setInterval(() => {
      time--;
      timeLine.innerHTML = time;
      if (time < 15 && time > 0) {
        timeLine.classList.add("bg-red-500");
      } else if (time == 0) {
        timeLine.classList.remove("bg-red-500");
        timeLine.classList.add("bg-green-500");
        timeLine.innerHTML = 30;
        wordInput.innerHTML = `<div class=" boxes w-full h-[30px] bg-gray-400 mb-2 rounded-md"></div>
            `;
        scoreNumber = 10;
        score.innerHTML = `Score : ${scoreNumber}`;
        alert("Your time is finished");

        reloadPage();
        clearInterval(timeInterval);
      }
    }, 1000);

    checkWord();
  }

  nextBtn.addEventListener("click", () => {
    checkWord();
    reloadPage();
  });
});

const checkWord = () => {
  word = data[Math.round(Math.random() * 4)];

  wordInput.innerHTML = "";
  for (let i = 0; i < word.name.length; i++) {
    wordInput.innerHTML += `<div class="w-[40px] h-[40px] rounded-md bg-[#0EFFF2] flex items-center justify-center text-white text-[20px]"></div>`;
  }
};

infoBtn.addEventListener("mouseover", () => {
  infoText.classList.remove("hidden");
  if (typeof word.about != "undefined") {
    infoText.innerHTML = word.about;
  } else {
    infoText.innerHTML = "Please start the game";
  }
});

infoBtn.addEventListener("mouseleave", () => {
  infoText.classList.add("hidden");
});

wordBtn.forEach((item) => {
  item.addEventListener("click", (e) => {
    if (word.name.includes(e.target.innerHTML)) {
      let textAry = word.name.split("");
      let wordNumber = textAry.findIndex((item) => item == e.target.innerHTML);
      let wordInputBox = document.querySelectorAll(".word_input div");
      wordInputBox.forEach((data, index) => {
        if (index == wordNumber) {
          data.innerHTML = e.target.innerHTML;
          written_text += e.target.innerHTML;
          if (written_text.length == word.name.length) {
            setTimeout(() => {
              alert("Good Job");
              reloadPage();
              // clearInterval(timeInterval)
              checkWord();
              timeLine.classList.remove("bg-red-500");

              wordInputBox.forEach((text) => {
                text.innerHTML = "";
              });
            }, 100);
          }
          item.classList.add("bg-green-800");
          item.classList.remove("bg-[#0EFFF2]");
        }
      });
    } else {
      scoreNumber--;
      if (scoreNumber == 0) {
        alert("Finished");
        location.reload();
        clearInterval(timeInterval);
      }
      score.innerHTML = `Score : ${scoreNumber}`;
      item.classList.add("bg-red-800");
      item.classList.remove("bg-[#0EFFF2]");
    }
  });
});

const reloadPage = () => {
  scoreNumber = 10;
  time = 30;
  timeLine.innerHTML = time;
  written_text = "";
  score.innerHTML = `Total : ${scoreNumber}`;
  wordBtn.forEach((item) => {
    item.classList.remove("bg-green-800");
    item.classList.remove("bg-red-800");
    item.classList.add("bg-[#0EFFF2]");
  });
};
