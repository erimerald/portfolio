// Ohjeet:
// Toteuta kiinteistönvälittäjälle ohjelma, jolla hän voi lisätä myytäviä asuntoja ja hakea niiden tietoja.
// Kunkin asunnon tiedot tallennetaan asunto -nimiseen olioon. Olion ominaisuuksia ovat kohdenumero, osoite, hinta ja pinta-ala.
// Toteuta ohjelma käyttäen constructoria. Toteuta myös metodi nimeltä laskeNelioHinta() asunnon neliöhinnan laskemista varten.
// Tee ohjelmaan käyttöliittymä, jolla käyttäjä voi lisätä asuntoja. Lisätyt asunto-oliot tallennetaan taulukkoon (array), jonka nimi on asunnot.
// Tee ohjelmaan myös hakutoiminto eli kiinteistön kohdenumerolla pitäisi voida hakea asunnon tiedot. Ohjelman pitäisi laskea myös haetun asunnon neliöhinta ja tulostaa se.

// Hakutoiminto elokuvatehtävässä kaipaa pientä tarkennusta.
// Tulet tarvitsemaan tätä viimeisessä osiossa, joten kertaa vielä se, miten saat ohjelman tulostamaan "Ei löydy". Tätä voit pohtia lisähaasteena.


// Sijoittaa kursorin input-laatikkoon ja muuttaa sen arvon tyhjäksi
function alusta() {
  // Tyhjentää input-kenttien arvon
  document.getElementById("inputKohdenumero").value = "";
  document.getElementById("inputOsoite").value = "";
  document.getElementById("inputHinta").value = "";
  document.getElementById("inputPintaAla").value = "";
  document.getElementById("inputHaeKohdenumero").value = "";
  // Vie hiiren ylimpään input-kenttään
  document.getElementById("inputKohdenumero").focus();
;}

//luo asunnot-nimisen arrayn, johon asunto-objektit tallennetaan
let asunnot = [];

//TODO
// clean up all evidence of previous laskeNeliohinta print attempts
// restyle css

  //konstructori, joka luo asunto-nimisen objektin, joka tallentaa tiedot nimipaikoilleen 
  // parseInt:in käyttö ei tässä kohtaa taida olla tarpeellista, mutta en ole varma joten käytin niitä tässäkin
function asunto(kohdenumero, osoite, hinta, pintaAla, laskeNelioHinta) {
  this.kohdenumero = parseInt(kohdenumero);
  this.osoite = osoite;
  this.hinta = parseInt(hinta);
  this.pintaAla = parseInt(pintaAla);
  // metodi laskee asunnon neliöhinnan
  this.laskeNelioHinta = function(){
    return hinta / pintaAla;}
  }

  // luo asuntokohteen input-kenttien tiedoilla uuteen asunto-objektiin ja lisää nämä tiedot asunnot-arrayhin, kun asunnon tiedot on lisätty lomakkeelle
  // kutsutaan Lisää asunto-nappia painettaessa
function lisaaAsunto(){
  // hakee muuttujat input-kentistä ja muuttaa numerot int-muotoon, luo myös laskeNeliöhinnalle oman paikan muuttujien listalla 
  let kohdenumero = parseInt(document.getElementById("inputKohdenumero").value);
  let osoite = document.getElementById("inputOsoite").value;
  let hinta = parseInt(document.getElementById("inputHinta").value);
  let pintaAla = parseInt(document.getElementById("inputPintaAla").value);
  let laskeNelioHinta = "";

   // tarkistaa ovatko kohteen lisäyskentät tyhjiä
  if (!(kohdenumero > 0 && osoite.length > 0 && hinta > 0 && pintaAla > 0)) {
    tulostus = "Täytä kohteen tiedot!"}

    else if(asunnot.some(asunto => asunto.kohdenumero == kohdenumero)){
    tulostus = "Kohde löytyy jo tietokannasta"
    }

else{
    // luo uuden asunto-objektin 
let uusiAsunto = new asunto(kohdenumero, osoite, hinta, pintaAla, laskeNelioHinta);
    // lisää uuden asunto-objektin asunnot-massiiviin
asunnot.push(uusiAsunto);
    // kertoo käyttäjälle, onnistuiko lisäys 
tulostus = "Asunto on lisätty listaan!";
    // tulostaa yksittäisen asunto-objektin ja asunnot-massiivin tiedot konsoliin
console.log(asunto);
console.log(asunnot);
}
    // muuttaa tulostusAlueen arvon tulostuksen arvoksi.
document.getElementById("tulostusAlue").innerHTML = tulostus;
    // tyhjentää input-kenttien arvot
alusta();
}

    // hakee asunto-objktia asunnot massiivista kohdenumerolla, jonka käyttäjä lisää kohdenumeron inputtiin
function haeAsunto(){
    // tarkistaa toimiiko haku
  console.log("Haetaan kohdetta!");
  let haeKohdenumero = document.getElementById("inputHaeKohdenumero").value;
    // lisää inputin kohdenumeron konsoliin tarkistusta varten 
  console.log(haeKohdenumero);
    // tarkistaa onko kohdenumeron kenttä tyhjä
  if (haeKohdenumero.length == 0) {
    tulostus = "Kirjoita kohdenumero!"
  }
    // jos kohdenumeron kenttä ei ole tyhjä, tarkistaa löytyykö asunto-objektia asunnot-massiivista objektin kohdenumero-arvolla 
else if(asunnot.some(asunto => asunto.kohdenumero == haeKohdenumero)){
    // jos kohdenumero löytyi, hakee asunnot-massiivista kohdenumeron
let haetunKohteenNumero = asunnot.find(item => item.kohdenumero == haeKohdenumero);
    // tulostaa löydetyn objektin kohdenumeron ja kutsuu objektin laskeNeliöhinta-metodia
tulostus = "Haetun kohteen numero on " +haetunKohteenNumero.kohdenumero+", ja sen neliöhinta on " + haetunKohteenNumero.laskeNelioHinta() + " € / m2";
    // tyhjentää input-kentät
alusta()}
    // jos hakukohdetta ei löytynyt, antaa ilmoituksen virheestä
   else
  {
      tulostus = "Kohdetta ei löytynyt";
    }
    // muuttaa tulostusAlueen arvon tulostuksen arvoksi.
    document.getElementById("tulostusAlue").innerHTML = tulostus;
  }

