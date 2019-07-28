

var GodineAjax = (function () {

  var konstruktor = function (divSadrzaj) {

    var xhttp = new XMLHttpRequest();

    xhttp.onload = function () {
      //da li je status code == OK

      if (xhttp.status == 200) {
        for (; ;) {
          //brisemo sve iz diva
          if (divSadrzaj.firstChild == true) divSadrzaj.removeChild(divSadrzaj.firstChild);
          else break;
        }


        //odgovor servera bit ce json, svih dodanih godina 
        var odgovor_servera_json = xhttp.responseText;

        //json -> objekat
        var objekat = JSON.parse(odgovor_servera_json);

        var i = 0;
        while (i < objekat.length) {

          var blok = document.createElement("div");
          blok.setAttribute("class", "godina");
          var Naziv = document.createElement("p");
          Naziv.innerHTML = objekat[i].nazivGod;
          var NazivRepVje = document.createElement("p");
          NazivRepVje.innerHTML = objekat[i].nazivRepVje;
          var NazivRepSpi = document.createElement("p");
          NazivRepSpi.innerHTML = objekat[i].nazivRepSpi;
          blok.appendChild(Naziv);
          blok.appendChild(NazivRepVje);
          blok.appendChild(NazivRepSpi);
          divSadrzaj.appendChild(blok);
          //dodajemo info za 1 po 1 godinu
          i++;
        }
      }
    }


    //saljemo zahtjev
    xhttp.open("GET", "http://localhost:8080/godine", true);
    xhttp.setRequestHeader('Accept', 'application/json');
    xhttp.send(null);

    return {
      osvjezi: function () {
        var xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
          if (xhttp.status == 200) {
            for (; ;) {
              //brisemo sve iz diva
              if (divSadrzaj.firstChild == true) divSadrzaj.removeChild(divSadrzaj.firstChild);
              else break;
            }


            var i = 0;
            while (i < objekat.length) {

              var blok = document.createElement("div");
              blok.setAttribute("class", "godina");
              var Naziv = document.createElement("p");
              Naziv.innerHTML = objekat[i].nazivGod;
              var NazivRepVje = document.createElement("p");
              NazivRepVje.innerHTML = objekat[i].nazivRepVje;
              var NazivRepSpi = document.createElement("p");
              NazivRepSpi.innerHTML = objekat[i].nazivRepSpi;
              blok.appendChild(Naziv);
              blok.appendChild(NazivRepVje);
              blok.appendChild(NazivRepSpi);
              divSadrzaj.appendChild(blok);
              //dodajemo info za 1 po 1 godinu
              i++;
            }
          }
        }


        //saljemo zahtjev
        xhttp.open("GET", "http://localhost:8080/godine", true);
        xhttp.setRequestHeader('Accept', 'application/json');
        xhttp.send(null);
      }
    }
  }
  return konstruktor;
}());
module.exports = GodineAjax;


