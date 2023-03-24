const currentTime = document.querySelector(".current-time");
const nameInput = document.querySelector(".input-name");
const idInput = document.querySelector(".input-id");
const clockInBtn = document.querySelector(".clock-in-btn");

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
  time;
  constructor() {
    setInterval(this.displayTime, 1000);
    nameInput.addEventListener("change", this.inputData.bind(this));
    idInput.addEventListener("change", this.inputData.bind(this));
  }

  inputData() {
    this.username = nameInput.value;
    this.idNumber = idInput.value;
    if (this.username) {
      clockInBtn.classList.add("clock-in-true");
    }
  }

  displayTime() {
    let date = new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let session = "AM";
    if (hour == 0) {
      hour = 12;
    }
    if (hour > 12) {
      hour = hour - 12;
      session = "PM";
    }

    hour = hour < 10 ? "0" + hour : hour;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    let time = `${hour}:${minutes}:${seconds} ${session}`;
    currentTime.innerHTML = time;
  }
}

let app = new App();
