const game_div = document.getElementById("game");

//Boton Clickeameee
const clicker = document.createElement("button");
clicker.classList.add("clicker");
clicker.innerHTML = "Click ME!";

//Contador de clicks + localstorage
let counter = localStorage.getItem("count") ? localStorage.getItem("count") : 0;
const counter_div = document.createElement("div");
counter_div.innerHTML = counter;

//logica del Hold
let holdClickInterval;
let hold = false;

//barra de tiempo
const barCont = document.createElement("div");
let dayCount = localStorage.getItem("days") ? localStorage.getItem("days") : 1;
const barText = document.createElement("p");
barText.textContent = `Day ${dayCount}`;
barCont.style.width = "40%";
barCont.style.textAlign = "center";
const myProgress_div = document.createElement("div");

myProgress_div.classList.add("myProgress");
const myBar_div = document.createElement("div");
myBar_div.classList.add("myBar");
barCont.appendChild(barText);
myProgress_div.appendChild(myBar_div);
barCont.appendChild(myProgress_div);

function moveBar() {
  var elem = document.querySelector(".myBar");
  var width = 1;
  setInterval(frame, 1000);
  function frame() {
    if (width >= 100) {
      width = 1;
      dayCount++;
      localStorage.setItem("count", counter);
      localStorage.setItem("days", dayCount);

      barText.textContent = `Day ${dayCount}`;
    } else {
      width++;
      elem.style.width = width + "%";
    }
  }
}

clicker.addEventListener("click", () => {
  if (!hold) {
    counter++;
  }
  hold = false;
});

clicker.addEventListener("mousedown", () => {
  holdClickInterval = setInterval(function () {
    hold = true;
    counter++;
  }, 600);
});
window.addEventListener("mouseup", () => {
  clearInterval(holdClickInterval);
});

function createBtn() {
  game_div.appendChild(barCont);

  game_div.appendChild(counter_div);

  game_div.appendChild(clicker);

  moveBar();

  let actualCounter = counter;
  setInterval(() => {
    if (actualCounter !== counter) {
      counter_div.innerHTML = counter;
      actualCounter = counter;
    } else null;
  }, 30);
}
createBtn();
