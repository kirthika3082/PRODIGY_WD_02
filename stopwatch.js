let isRunning = false;
let interval;
let seconds = 0;
let minutes = 0;
let hours = 0;
let lapTimes = [];
let lapId = 1;

function startStop() {
  if (isRunning) {
    clearInterval(interval);
    document.getElementById('startStop').innerText = 'Start';
  } else {
    interval = setInterval(updateDisplay, 1000);
    document.getElementById('startStop').innerText = 'Stop';
  }
  isRunning = !isRunning;
}

function lap() {
  if (isRunning) {
    lapTimes.push({ id: lapId++, time: getTimeString() });
    displayLapTimes();
  }
}

function displayLapTimes() {
  const lapTimesDiv = document.getElementById('lapTimes');
  lapTimesDiv.innerHTML = '';
  lapTimes.forEach((lap) => {
    const lapItem = document.createElement('div');
    lapItem.innerText = `Lap ${lap.id}: ${lap.time}`;
    lapTimesDiv.appendChild(lapItem);
  });
}

function reset() {
  clearInterval(interval);
  isRunning = false;
  seconds = 0;
  minutes = 0;
  hours = 0;
  lapTimes = [];
  lapId = 0;
  updateDisplay();
  displayLapTimes();
  document.getElementById('startStop').innerText = 'Start';
}

function updateDisplay() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }
  const display = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  document.getElementById('display').innerText = display;
}

function pad(value) {
  return value < 10 ? `0${value}` : value;
}

function getTimeString() {
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
