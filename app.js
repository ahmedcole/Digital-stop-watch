// getting all our html selector here
const firstSecElement = document.getElementById("firstOne");
const secondSecElement = document.getElementById("secondOne");
const minuteOneElement = document.getElementById("minuteOne");
const minuteTwoElement = document.getElementById("minuteTwo");
const hourElement = document.getElementById("hour");
const startBtnElement = document.querySelector(".start");
const resetBtnElement = document.querySelector(".reset");

let clock = JSON.parse(localStorage.getItem("savedTime")) || {
  secondOne: 0,
  secondTwo: 0,
  minuteOne: 0,
  minuteTwo: 0,
  hour: 0,
};

firstSecElement.innerText = clock.secondOne;
secondSecElement.innerText = clock.secondTwo;
minuteOneElement.innerText = clock.minuteOne;
minuteTwoElement.innerText = clock.minuteTwo;
hourElement.innerText = clock.hour;

let timeCount;

let startTime = false;

function reset() {
  localStorage.removeItem("savedTime")
  clock.secondOne = 0;
  firstSecElement.innerText = clock.secondOne;
  clock.secondTwo = 0;
  secondSecElement.innerText = clock.secondTwo;
  clock.minuteOne = 0;
  minuteOneElement.innerText = clock.minuteOne;
  clock.minuteTwo = 0;
  minuteTwoElement.innerText = clock.minuteTwo;
  clock.hour = 0;
  hourElement.innerText = clock.hour;
}

function startClock() {
  if (!startTime) {
    startBtnElement.innerText = "stop";
    resetBtnElement.classList.remove("reset-on");
    timeCount = setInterval(() => {
      clock.secondOne += 1;
      firstSecElement.innerText = clock.secondOne;
      if (clock.secondOne > 9) {
        clock.secondTwo += 1;
        secondSecElement.innerText = clock.secondTwo;
        clock.secondOne = 0;
        firstSecElement.innerText = clock.secondOne;
      } else if (clock.secondTwo > 5) {
        clock.secondTwo = 0;
        secondSecElement.innerText = clock.secondTwo;
        clock.minuteOne += 1;
        minuteOneElement.innerText = clock.minuteOne;
      } else if (clock.minuteOne > 9) {
        clock.minuteOne = 0;
        minuteOneElement.innerText = clock.minuteOne;
        clock.minuteTwo += 1;
        minuteTwoElement.innerText = clock.minuteTwo;
      } else if (clock.minuteTwo > 5) {
        clock.minuteTwo = 0;
        minuteTwoElement.innerText = clock.minuteTwo;
        clock.hour += 1;
        hourElement.innerText = clock.hour;
      }

      localStorage.setItem("savedTime", JSON.stringify(clock));
    }, 1000);
    startTime = true;
  } else {
    startBtnElement.innerText = "start";
    resetBtnElement.classList.add("reset-on");
    clearInterval(timeCount);
    startTime = false;
  }
}
