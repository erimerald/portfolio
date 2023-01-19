const micBtn = document.getElementById("microphone");
const panelsData = document.getElementById("panels-data");
const transcript = document.getElementById("transcript");
const screen = document.getElementById("screen");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

const commands = ["eat", "sleep", "dance"];

function onStartListening() {
  recognition.start();
  panelsData.classList.add("talking");
}

function onResult(event) {
  panelsData.classList.remove("talking");
  console.log("You said something into the microphone!");
  const text = event.results[0][0].transcript;

  transcript.innerText = "You said: " + text;

  // Hae sallitut komennot
  // Käy läpi puhe
  // Tarkista löytyy sallittu komento puheesta
  const action = commands.find(function (command) {
    return text.toLowerCase().includes(command);
  });

  // Jos löytyy, muuta hahmon (CSS)
  if (action) {
    screen.classList.add("codigotchi-screen_" + action);
  } else {
    // Jos ei löydy, ilmoita
    transcript.textContent += " - Invalid command!";
  }

  setTimeout(function () {
    screen.classList.remove("codigotchi-screen_" + action);
    transcript.innerText = "";
  }, 3000);
}

micBtn.addEventListener("click", onStartListening);
recognition.addEventListener("result", onResult);
