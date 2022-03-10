// <!-- b) TEHTÄVÄNANTO Array (taulukko):
// Tee ohjelma, jolla käyttäjä voi syöttää ja hakea katsomiensa elokuvien nimiä. Elokuvia voi olla niin monta kuin käyttäjä haluaa.
//  Ohjelman pitäisi tallentaa nimet arrayhin. (Arrayssa tiedot ovat ohjelman työmuistissa, joten ne katoavat viimeistään, kun ohjelman suoritus lopuu).
// Ohjelman pitäisi lisäksi tulostaa kaikkien elokuvien nimet alekkain aakkosjärjestyksessä, jos käyttäjä klikkaa tulosta -nappia.
// Tee ohjelmaan myös haku-toiminto. Käyttäjä antaa elokuvan nimen ja ohjelma ilmoittaa, onko kyseinen elokuva katsottujen listalla.  -->

//TODO
//1. Estä tyhjien nimien tallentaminen
//2. Muuta teksin haku insensitiiviseksi
//3. Lisää tulostus isolla alkukirjaimella

// Sijoittaa kursorin input-laatikkoon ja muuttaa sen arvon tyhjäksi
function alusta() {
  // Tyhjentää input-kentän arvon
  document.getElementById("input").value = "";
  // Vie hiiren input-kenttään
  document.getElementById("input").focus();
}

// Luo massiivin
let elokuvat = [];
// Asettaa katsottu-booleanin epätodeksi
let katsottu = false;

function tallenna() {
  // luo muuttujan input, ja asettaa arvoksi lomakkeen inputin arvo
  let input = document.getElementById("input").value;
  hae();
  // Näyttää massiivin konsolissa
  console.log(elokuvat);
  // Jos kentän tietoa ei ole lisätty listaan aiemmin, lisätään inputin sisältö listalle
  if (katsottu == false) {
    elokuvat.push(input);
    tulostus = "Elokuva on lisätty listaan!";
  }
  // Jos tieto on jo lisätty kenttään, pyydä uuden lisäämistä
  else {
    tulostus = "Lisää uusi elokuva!";
  }
  katsottu = false;
  // Tulostaa tulostusalueen arvon
  document.getElementById("tulostusAlue").innerHTML = tulostus;
}

function tuoLista() {
  // Asettaa tulostuksen arvon tyhjäksi
  let tulostus = "";
  // Järjestää massiivin
  elokuvat.sort();
  // Käy massiivin läpi, ja tulostaa sen riveittäin
  for (let i = 0; i < elokuvat.length; i++) {
    tulostus += elokuvat[i] + "<br/>";
  }
  // Tulostaa tulostusalueen arvon
  document.getElementById("tulostusAlue").innerHTML = tulostus;
}

// Tarkistaa löytyykö tieto jo taulukosta
function hae() {
  let input = document.getElementById("input").value;
  // Nollaa tulostusAlueen arvon
  let tulostus = "";
  // Kirjaa konsoliin inputin arvon
  console.log(input);
  //
  if (input == "") {
    tulostus = "Kirjoita elokuvan nimi!";
  } else {
    for (i = 0; i < elokuvat.length; i++) {
      if (input == elokuvat[i]) {
        katsottu = true;
      }
    }
    if (katsottu == true) {
      tulostus = "Elokuva löytyi jo!";
      alusta();
    } else {
      tulostus = "Elokuva on uusi!";
      katsottu = false;
      alusta();
    }
  }
  // Tulostaa tulostusalueen arvon
  document.getElementById("tulostusAlue").innerHTML = tulostus;
}
