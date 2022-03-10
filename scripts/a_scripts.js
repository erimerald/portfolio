// <!-- a)  Valintarakenne (if-lause)     kts nopeustutka.jpg

// Tee liikennettä valvovalle poliisille avuksi ohjelma, jolle syötetään ohi ajavan auton nopeus ja
//  tiellä sallittu suurin nopeus eli nopeusrajoitus.
//  Ohjelman pitäisi tulostaa poliisille toimintaohje.

// Mikäli ylinopeutta ei ole, niin ohjelma tulostaa ”Toivota hyvää matkaa!”

// Jos ylinopeutta on yli 20 kilometriä tunnissa, niin ohjelma tulostaa
// ”Kysy tulot ja laske päiväsakko”.

// Mikäli ylinopeutta on  1– 20 kilometriä tunnissa, niin ohjelma tulostaa
// ”Määrää liikennevirhemaksu!”.

// Lisäksi ohjelma tulostaa tarvittaessa liikennavirhemaksun määrän. Maksu määräytyy seuraavalla tavalla:

// Nopeusrajoituksen rikkominen enintään 60 km/h alueella:

//     ylinopeus 1 - 10 km/h 100 euroa
//     ylinopeus 11 - 15  km/h 170 euroa
//     ylinopeus 16 - 20  km/h 200 euroa

// Nopeusrajoituksen rikkominen yli 60 km/h alueella:

//     ylinopeus 1 - 10 km/h 70 euroa
//     ylinopeus 11 - 15  km/h 140 euroa
//     ylinopeus 16 - 20  km/h 170 euroa -->

//asettaa kursorin input-laatikkoon kun sivu ladataan
function alusta() {
  document.getElementById("autonNopeus").focus();
}

// Onko tien nopeusrajoitus 60 km / h vai ei
let isoTie = false;
// Onko nopeus ylitetty yli 20 km / h vai ei
let virhemaksu = false;
// Ohittavan auton nopeus laskurin inputista (autonNopeus)
let nopeus = 0;
// Tien nopeusrajoitus laskurin inputista (tienRajoitus)
let rajoitus = 0;
// Arvo, jonka perusteella virhemaksun suuruuskategoria määritellään
let maksu = "";

// tarkistaa onko nopeus alle 20 km/h yli rajoituksen
function liikennevirhemaksu() {
  if (nopeus <= rajoitus + 21) virhemaksu = true;
}

// laskee ylinopeuden määrän, tarjoaa kolme eri nopeuskategoriaa maksuluokkien mukaan
function nopeudenYlitys() {
  let ylinopeus = nopeus - rajoitus;
  if (ylinopeus < 11) {
    maksu = "a";
  } else if (ylinopeus < 16) {
    maksu = "b";
  } else {
    maksu = "c";
  }
}

// arvioi ajaako auto ylinopeutta, ja kuinka paljon
function tutkiYlitys() {
  isoTie = false;
  virhemaksu = false;
  let tulostus = "";
  maksu = "";
  //luo dokumenttiin tulostusAlueen tyhjällä arvolla
  document.getElementById("tulostusAlue").innerHTML = "";
  // säilyttää inputtiin annetun arvon dokumenttiin omilla ID:illään (value)
  nopeus = parseInt(document.getElementById("autonNopeus").value);
  rajoitus = parseInt(document.getElementById("tienRajoitus").value);
  console.log(nopeus, rajoitus);
  liikennevirhemaksu();

  //tarkistaa ajoiko auto ylinopeutta
  if (
    nopeus <= rajoitus &&
    document.getElementById("autonNopeus").value.length != 0 //nopeus != 0
  ) {
    tulostus = "Toivota hyvää makaa!";
  }
  //tarkistaa onko alueen nopeusrajoitus max 60 km/h
  else if (rajoitus > 60) {
    isoTie = true;
    console.log("Ollaan isolla tiellä.");
  }
  //ohjeteksti, jos annetut arvot ovat parametrien ulkopuolella
  else {
    tulostus = "Anna nopeus väliltä 0 - 300.";
  }

  //tarkistaa onko rajoitus ylitetty, onko rajoitus yli 60 km / hour ja tulostaa sopivan virhemaksun
  if (nopeus > rajoitus && isoTie == true && virhemaksu === true) {
    nopeudenYlitys();
    tulostus = "Määrää liikennevirhemaksu! ";
    if (maksu == "a") {
      tulostus += "70 €";
    } else if (maksu == "b") {
      tulostus += "140 €";
    } else {
      tulostus += "170 €";
    }
  }

  //tarkistaa onko rajoitus ylitetty, onko rajoitus alle 60 km / hour ja tulostaa sopivan virhemaksun
  if (nopeus > rajoitus && !isoTie && virhemaksu === true) {
    nopeudenYlitys();
    tulostus = "Määrää liikennevirhemaksu! ";
    if (maksu == "a") {
      tulostus += "100 €";
    } else if (maksu == "b") {
      tulostus += "170 €";
    } else {
      tulostus += "200 €";
    }
  }

  //tarkistaa onko rajoitus ylitetty, onko rajoitus yli 60 km / hour ja tulostaa sopivan päiväsakon
  if (nopeus > rajoitus && !virhemaksu) {
    tulostus = "Kysy tulot ja laske päiväsakko.";
  }

  // asettaa tulostusAlueen arvoksi tulostus-arvon muuttujan tekstin
  document.getElementById("tulostusAlue").innerHTML = tulostus;
  // siirtää kursorin automaattisesti autonNopeus-kenttään!
  document.getElementById("autonNopeus").focus();
  // säilyttää kenttien arvot
  document.getElementById("autonNopeus").value = "";
  document.getElementById("tienRajoitus").value = "";
  // return;
}
