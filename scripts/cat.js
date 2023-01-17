const textArea = document.querySelector("textarea");
console.log(textArea);
const playButton = document.querySelector("button");
const pitchBar = document.querySelector("input");
const catFigure = document.querySelector("figure");
// Hae tekstikenttästä käyttäjän lisäämäteksti
// Laita kissa sanomaan mitä tekstilaatikossa lukee

function onButtonClick() {
  if (textArea.value.length > 0) {
    speak();
  }
}

function speak() {
  const text = textArea.value;
  const utterance = new SpeechSynthesisUtterance(text);
  const pitch = pitchBar.value;

  // Valitse arvo 0 ja 2 välillä
  utterance.pitch = pitch;

  speechSynthesis.speak(utterance);

  utterance.addEventListener("start", function () {
    // playButton.disabled = true;
    textArea.disabled = true;
    pitchBar.disabled = true;
    catFigure.classList.add("talking");
  });

  utterance.addEventListener("end", function () {
    // playButton.disabled = false;
    textArea.disabled = false;
    pitchBar.disabled = false;
    catFigure.classList.remove("talking");
  });
}

playButton.addEventListener("click", onButtonClick);
