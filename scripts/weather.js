console.log("heyo!");

const weatherIcon = document.querySelector(`.weather-icon`);
const weatherLocation = document.querySelector(`.weather-location`);
const weatherTemperature = document.querySelector(`.weather-temperature`);
const descriptionElement = document.querySelector(".description");
const htmlElement = document.documentElement;

navigator.geolocation.getCurrentPosition(onSuccess, onError);

function onSuccess(data) {
  console.log(data);

  const lon = data.coords.longitude;
  const lat = data.coords.latitude;
  const locationName = data.name;

  const units = "metric";
  const lang = "eng";
  const appid = "5728f34643befa0d9cc117a200141288";
  //   const appid = "a502b1e1e878fa96b40360656ee6becc";

  const endpoint = "https://api.openweathermap.org/data/2.5/weather";
  const url = `${endpoint}?lat=${lat}&lon=${lon}&appid=${appid}&units=${units}&lang=${lang}`;

  // Lähetä sijainti API:lle

  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      // Kun sijainnin data saadaan takaisin, kerää sopivat ja päivitä sivusto
      const temperature = Math.floor(data.main.temp);
      const iconCode = data.weather[0].icon;
      const description = data.weather[0].description;
      // Valitse sopia kuva perustuen sijainnin dataan

      weatherIcon.src = `images/${iconCode}.png`;
      weatherIcon.alt = description;

      weatherLocation.innerText = locationName;

      // Valitse sopiva kuvausteksti perustuen sijainnin dataan

      // Näytä lämpötila

      weatherTemperature.innerText = `${temperature}°`;
      descriptionElement.innerText = getDescription(iconCode);

      //   remove the opacity
      HTMLElement.classList.remove("js-loading");
    });
}

function onError(error) {
  weatherLocation.innerText =
    "You must permit your browser to access your current location";
  console.error(error);
}

const description = {
  "01d": "Remember to apply suncream!",
  "01n": "Good night!",
  "02d": "Variable...",
  "02n": "Beware werewolves...",
  "03d": "Perfect lighting for photos!",
  "03n": "Sleep well :)",
  "04d": "Today: a case of the classic British overcast sky :)",
  "04n": "So cloudy, you won't even see the moon!",
  "09d": "You might need a brolly.",
  "09n": "Cover up well today",
  "10d": "You'll need two umbrellas",
  "10n": "Don't expose bare skin to the sun!",
  "11d": "Wear rubber boots!",
  "11n": "Might be one or two sparks in the sky",
  "13d": "Weather for snow-men and snow-angels.",
  "13n": "Perfect night to be under the stars outside!",
  "50d": "Fog lights should be on!",
  "50n": "Drive carefully!",
};
