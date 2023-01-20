console.log("heyo!");

navigator.geolocation.getCurrentPosition(function (data) {
  console.log(data);
});

function onSuccess(data) {
  console.log(data);

  const lon = data.coords.longitude;
  const lat = data.coords.latitude;
  const units = "metric";
  const lang = "eng";
  const appid = "a502b1e1e878fa96b40360656ee6becc";

  const endpoint = "https://api.openweathermap.org/data/2.5/weather";

  const url = `${ENDPOINT}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${UNITS}&lang=${LANGUAGE}`;

  // Lähetä sijainti API:lle

  fetch(url)
    .then(function (data) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      // Kun sijainnin data saadaan takaisin, kerää sopivat ja päivitä sivusto

      // Valitse sopia kuva perustuen sijainnin dataan

      // Valitse sopiva kuvausteksti perustuen sijainnin dataan

      // Näytä lämpötila
    });
}

function onError(error) {
  console.error(error);
}
