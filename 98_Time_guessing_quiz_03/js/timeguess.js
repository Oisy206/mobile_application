"use strict";

let currentAudio = null;

let buttonSound = [
  "./sound/start.mp3",
  "./sound/stop1.mp3",
  "./sound/reset.mp3",
  "./sound/stop2.mp3",
];

const timer =
  document.getElementById("timer") || document.getElementById("time");
const btn_start = document.getElementById("btn_start");
const btn_stop = document.getElementById("btn_stop");
const btn_reset = document.getElementById("btn_reset");

let startTime;
let timeoutid;
let stopTime = 0;

setButtonStateInitial();
btn_start.addEventListener(
  "click",
  function () {
    soundControl(buttonSound[0]);
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  },
  false
);

btn_stop.addEventListener(
  "click",
  function () {
    setButtonStateStopped();
    clearTimeout(timeoutid);
    stopTime = Date.now() - startTime;

    if (stopTime >= 10000 && stopTime < 11000) {
      document.body.style.backgroundImage = "url('img/fireworks.gif')";

      document.body.style.backgroundSize = "cover";

      document.body.style.backgroundRepeat = "no-repeat";

      document.body.style.backgroundPosition = "center center";

      document.body.style.backgroundColor = "rgba(0, 0, 0, 0)";

      soundControl(buttonSound[3]);
    } else {
      soundControl(buttonSound[1]);
    }
  },
  false
);

btn_reset.addEventListener(
  "click",
  function () {
    soundControl(buttonSound[2]);
    setButtonStateInitial();
    timer.textContent = "00:00.000";
    stopTime = 0;
    document.body.style.backgroundImage = "";
    document.body.style.backgroundColor = "";
  },
  false
);

function countUp() {
  const d = new Date(Date.now() - startTime + stopTime);
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  const ms = String(d.getMilliseconds()).padStart(3, "0");
  timer.textContent = `${m}:${s}.${ms}`;

  timeoutid = setTimeout(() => {
    countUp();
  }, 10);
}

function setButtonStateInitial() {
  btn_start.classList.remove("js-inactive");
  btn_stop.classList.add("js-inactive");
  btn_reset.classList.add("js-inactive");
  btn_start.classList.remove("js-unclickable");
  btn_stop.classList.add("js-unclickable");
  btn_reset.classList.add("js-unclickable");
}

function setButtonStateRunning() {
  timer.classList.add("timer-fontColor_hidden");
  btn_start.classList.add("js-inactive");
  btn_stop.classList.remove("js-inactive");
  btn_reset.classList.add("js-inactive");
  btn_start.classList.add("js-unclickable");
  btn_stop.classList.remove("js-unclickable");
  btn_reset.classList.add("js-unclickable");
}

function setButtonStateStopped() {
  timer.classList.remove("timer-fontColor_hidden");
  timer.classList.add("timer_appear");
  btn_start.classList.add("js-inactive");
  btn_stop.classList.add("js-inactive");
  btn_reset.classList.remove("js-inactive");
  btn_start.classList.add("js-unclickable");
  btn_stop.classList.add("js-unclickable");
  btn_reset.classList.remove("js-unclickable");
}

function soundControl(src) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  const newAudio = new Audio(src);
  newAudio.play().catch(function (err) {
    console.warn("Audio playback failed:", err);
  });
  currentAudio = newAudio;
}
