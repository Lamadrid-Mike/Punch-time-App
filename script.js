const displayTime = document.querySelector(".current-time");
const nameInput = document.querySelector(".input-name");
const idInput = document.querySelector(".input-id");
const clockInBtn = document.querySelector(".clock-in-btn");
const displayUsername = document.querySelector(".display-user-name");
const displayWorkingTime = document.querySelector(".working-time");
const workSummary = document.querySelector(".summary");

let timeCard = [];

class TimeStamp {
  constructor(name, id, workedTime, date) {
    this.name = name;
    this.id = id;
    this.workedTime = workedTime;
    this.date = date;
  }
}

class App {
  username;
  idNumber;
  clockInTime;
  clockOutTime;
  date;
  clock;
  minutes = 0;
  seconds = 0;
  intervalState;
  constructor() {
    setInterval(this.displayTime, 1000);
    nameInput.addEventListener("change", this.inputData.bind(this));
    idInput.addEventListener("change", this.inputData.bind(this));
    clockInBtn.addEventListener("click", this.btnFunction.bind(this));
  }

  inputData() {
    let name = nameInput.value;
    let firstLetter = name.charAt(0).toUpperCase();
    this.username = firstLetter + name.slice(1);
    this.idNumber = idInput.value;
    this.username
      ? clockInBtn.classList.add("clock-in-true")
      : clockInBtn.classList.remove("clock-in-true");
  }

  workingTime = () => {
    this.seconds++;
    if (this.seconds <= 9) {
      displayWorkingTime.innerHTML = `0${this.minutes}:0${this.seconds}`;
    } else {
      displayWorkingTime.innerHTML = `0${this.minutes}:${this.seconds}`;
    }
    if (this.seconds == 60) {
      this.minutes++;
      this.seconds = 0;
    }
  };

  workingTimeClass() {
    displayWorkingTime.classList.add("display-working-time");
  }

  clearInputs() {
    nameInput.value = "";
    idInput.value = "";
    this.username = undefined;
    this.minutes = 0;
    this.seconds = 0;
  }

  hideInputs() {
    nameInput.style.display = "none";
    idInput.style.display = "none";
  }

  unHideInputs() {
    nameInput.style.display = "block";
    idInput.style.display = "block";
  }

  clockInClasses() {
    clockInBtn.classList.remove("clock-in-true");
    clockInBtn.classList.add("clock-in-false");
    clockInBtn.setAttribute("state", "true");
    clockInBtn.innerHTML = "Clock Out";
    displayUsername.style.display = "block";
    displayWorkingTime.style.display = "block";
    displayTime.style.display = "none";
  }

  clockOutClasses() {
    clockInBtn.classList.remove("clock-in-false");
    clockInBtn.setAttribute("state", "false");
    displayUsername.innerHTML = "";
    clockInBtn.innerHTML = "Clock In";
    displayUsername.style.display = "none";
    displayWorkingTime.style.display = "none";
    displayTime.style.display = "block";
  }

  displayTime() {
    this.date = new Date();
    let localDate = date.toLocaleDateString();
    this.clock = this.date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    displayTime.innerHTML = this.clock;
    return localDate;
  }

  btnFunction() {
    if (clockInBtn.getAttribute("state") === "false") {
      this.clockIn();
    } else {
      this.clockOut();
    }
  }

  clockIn() {
    if (this.username === undefined) return;
    this.intervalState = setInterval(this.workingTime, 1000);
    this.workingTimeClass();
    this.hideInputs();
    this.inputData();
    this.clockInClasses();
    displayUsername.innerHTML = `Hello,  ${this.username}`;
  }

  removeSummary() {
    setTimeout(() => {
      workSummary.classList.add("fade-out-summary");
    }, 5000);
    setTimeout(() => {
      workSummary.innerHTML = "";
      workSummary.classList.remove("fade-out-summary");
    }, 6000);
  }

  clockOut() {
    workSummary.innerHTML = `${this.username} you worked ${this.seconds} seconds today👍🏽`;
    timeCard.push(
      new TimeStamp(
        this.username,
        this.idNumber,
        this.seconds,
        this.displayTime()
      )
    );
    clearInterval(this.intervalState);
    this.clearInputs();
    this.unHideInputs();
    this.clockOutClasses();
    this.displayTime();
    this.removeSummary();
    console.log(timeCard);
  }
}

let app = new App();
