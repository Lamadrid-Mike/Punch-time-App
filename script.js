const displayTime = document.querySelector(".current-time");
const nameInput = document.querySelector(".input-name");
const idInput = document.querySelector(".input-id");
const clockInBtn = document.querySelector(".clock-in-btn");
const displayUsername = document.querySelector(".display-user-name");
const displayWorkingTime = document.querySelector(".working-time");

class TimeStamp {
  constructor(name, id, time, date) {
    this.name = name;
    this.id = id;
    this.time = time;
    this.date = date;
  }
}

class App {
  username;
  idNumber;
  clockInTime;
  clockOutTime;
  date;
  time;
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
    if (this.seconds === 60) {
      this.minutes++;
      this.seconds = 0;
    }
    displayWorkingTime.innerHTML = this.seconds;
  };

  clearInputs() {
    nameInput.value = "";
    idInput.value = "";
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
    this.time = this.date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    displayTime.innerHTML = this.time;
    return this.date;
  }

  btnFunction() {
    if (clockInBtn.getAttribute("state") === "false") {
      this.clockIn();
    } else {
      this.clockOut();
    }
  }

  clockIn() {
    this.intervalState = setInterval(this.workingTime, 1000);
    this.hideInputs();
    this.inputData();
    this.clockInClasses();
    displayUsername.innerHTML = `Hello,  ${this.username}`;
  }

  clockOut() {
    clearInterval(this.intervalState);
    this.clearInputs();
    this.unHideInputs();
    this.clockOutClasses();
  }
}

let app = new App();
