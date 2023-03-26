const displayTime = document.querySelector(".current-time");
const nameInput = document.querySelector(".input-name");
const idInput = document.querySelector(".input-id");
const clockInBtn = document.querySelector(".clock-in-btn");
const displayUsername = document.querySelector(".display-user-name");

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
  constructor() {
    setInterval(this.displayTime, 1000);
    nameInput.addEventListener("change", this.inputData.bind(this));
    idInput.addEventListener("change", this.inputData.bind(this));
    clockInBtn.addEventListener("click", this.btnFunction.bind(this));
  }

  inputData() {
    this.username = nameInput.value;
    this.idNumber = idInput.value;
    this.username
      ? clockInBtn.classList.add("clock-in-true")
      : clockInBtn.classList.remove("clock-in-true");
  }

  workingTime() {
    this.seconds++;
    console.log(this.seconds);
  }

  hideInputs() {
    nameInput.style.display = "none";
    idInput.style.display = "none";
  }

  unHideInputs() {
    nameInput.style.display = "block";
    idInput.style.display = "block";
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
    this.hideInputs();
    this.inputData();
    displayUsername.innerHTML = `Hello, ${this.username}`;
    clockInBtn.classList.remove("clock-in-true");
    clockInBtn.classList.add("clock-in-false");
    clockInBtn.innerHTML = "Clock Out";
    clockInBtn.setAttribute("state", "true");
  }

  clockOut() {
    this.unHideInputs();
    displayUsername.innerHTML = "";
    this.clockOutTime = this.displayTime();
    clockInBtn.innerHTML = "Clock In";
    clockInBtn.classList.remove("clock-in-false");
    clockInBtn.setAttribute("state", "false");
  }
}

let app = new App();
