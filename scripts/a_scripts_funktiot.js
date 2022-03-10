// <!-- Project Setup info-->
// <!-- Ohjeet:
// Tee funktio, joka saa parametrina henkilötunnuksen. Funktion pitäisi palauttaa tieto, onko henkilö syntynyt 2000 -luvulla.
// Tee myös funktion kutsu ja testitulostus. Katso henkilötunnuksen rakenne täältä: https://fi.wikipedia.org/wiki/Henkil%C3%B6tunnus -->

// Sijoittaa kursorin henkilotunnus-laatikkoon ja muuttaa sen arvon tyhjäksi
function alusta() {
  // Tyhjentää henkilotunnus-kentän arvon
  document.getElementById("henkilotunnus").value = "";
  // Vie hiiren henkilotunnus-kenttään
  document.getElementById("henkilotunnus").focus();
}

// tarkistaa henkilötunnuksen vuosisatamerkin, ja kertoo onko tunnuksen omaava henkilö syntynyt 2000-luvulla vai ei
function tarkistaVuosisata() {
  let tulostus = "";
  //luo dokumenttiin tulostusAlueen tyhjällä arvolla
  document.getElementById("tulostusAlue").innerHTML = "";
  // säilyttää inputtiin annetun merkkijonon dokumenttiin IDllä vuosisadanTunnus (value), ja muuttaa sen isoiksi kirjaimiksi
  let henkilotunnus = document
    .getElementById("henkilotunnus")
    .value.toUpperCase();
  console.log = "henkilotunnus";
  //tarkistaa henkilötunnuksen merkin seitsemännestä kohdasta inputtia
  let vuosisadanTunnus = henkilotunnus.charAt(6);
  console.log = "vuosisadanTunnus";

  //tarkistaa onko henkilö syntynyt 1900- tai 1800-luvuilla
  if (vuosisadanTunnus == "+" || vuosisadanTunnus == "-") {
    tulostus = "Henkilö ei ole syntynyt 2000-luvulla";
  }
  // tarkistaa onko henkilö syntynyt 2000-luvulla
  else if (vuosisadanTunnus == "A" && henkilotunnus.length == 11) {
    tulostus = "Henkilö on syntynyt 2000-luvulla.";
  }
  //ohjeteksti, jos annettu merkki on aiempien on parametrien ulkopuolella
  else {
    tulostus = "Anna henkilötunnus oikeassa muodossa!";
  }

  // asettaa tulostusAlueen arvoksi tulostus-arvon muuttujan tekstin
  document.getElementById("tulostusAlue").innerHTML = tulostus;
  // siirtää kursorin automaattisesti henkilötunnus-kenttään!
  document.getElementById("henkilotunnus").focus();
  // tyhjentää henkilötunnus-kentän arvon
  document.getElementById("henkilotunnus").value = "";
}
