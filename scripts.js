let countdown;
const timeDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

function timer(seconds) {
  clearInterval(countdown); //If there is existing countdown, stop it

  const now = Date.now(); //get the number of milliseconds(1000 = 1s)
  const then = now + seconds * 1000; //now + timer that you set (  milliseconds (1000 = 1s) )
  displayTimeLeft(seconds);
  displayEndTime(then); //then = now + timer that you set

  countdown = setInterval(() => {
    //The setInterval() method calls a function every milliseconds(1000).
    const secondsLeft = Math.round((then - Date.now()) / 1000); // then - every second (second left)
    if (secondsLeft < 0) {
      clearInterval(countdown); //Count until 0
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60); //Remaining minutes
  const remainderSeconds = seconds % 60; //Remaining seconds
  const display = `${minutes < 10 ? "0" : ""}${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;
  timeDisplay.textContent = display; //Display time left
  console.log({ minutes, remainderSeconds });
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be back at ${hour > 12 ? hour - 12 : hour}:${
    minutes < 10 ? "0" : ""
  }${minutes}`; //Display time you are back
}

//Click button and set timer
function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach((button) => button.addEventListener("click", startTimer));

//Submit number of time and set timer
document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
this.reset();
timer(mins)
});
