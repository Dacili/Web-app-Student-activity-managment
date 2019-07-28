/*NAPOMENA:
OVO JE MOJAA SPIRALA, I PIŠEM ŠTA HOĆU U KOMENTARIMA, LP*/



//automatic indentation in visual code ctrl+k, ctrl+f

const db = require('../db');
//db.sequel.sync({force:true}).then(console.log('ok'));
//sync briše sve iz modela, ostavlja samo prazne tabelee

const express = require('express');
// klasa
var app = express();
//kreiranje instance klase express

const bodyParser = require('body-parser');
//treba mi da kazem koje tipove ocekujem, zatim req.body

const fs = require('fs'); //citanje i pisanje u imenik
const url = require('url');
const path = require('path'); //treba mi za putanju direktorija
//const multer = require('multer');
//za forme koje su tipa enctype='multipart/form-data'
//po defaultu je encoding za html : x-www-urlencoded
//da bismo mogli file-ove slati sa req


//dodala sam / after
app.use(express.static(path.join(__dirname + "/izgled/")));
//omGGG prije kad je bilo samo __dirname za static folder, doslovno uopšte nije koristio rute za 1. zad




//1. zad
// ok

//ne valja preko parametara sa :,  ništa ostalo mi ne radi jer upada u ovaj get
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//idemo preko 8 ruta

app.get('/login.html', function (req, res) {
  var spoji = path.join(__dirname + "/izgled/login.html");
  res.sendFile(spoji);
});

app.get('/addGodina.html', function (req, res) {

  var spoji = path.join(__dirname + "/izgled/addGodina.html");
  res.sendFile(spoji);

});

app.get('/addStudent.html', function (req, res) {
  var spoji = path.join(__dirname + "/izgled/addStudent.html");
  res.sendFile(spoji);
});

//ubaceno da se ucita iz baze
app.get('/addVjezba.html', function (req, res) {
  var spoji = path.join(__dirname + "/izgled/addVjezba.html");

  res.sendFile(spoji);


});


app.get('/addZadatak.html', function (req, res) {
  console.log('opaa');
  var spoji = path.join(__dirname + "/izgled/addZadatak.html");
  res.sendFile(spoji);
});

app.get('/commiti.html', function (req, res) {
  var spoji = path.join(__dirname + "/izgled/commiti.html");
  res.sendFile(spoji);
});

app.get('/studenti.html', function (req, res) {
  var spoji = path.join(__dirname + "/izgled/studenti.html");
  res.sendFile(spoji);
});


app.get('/zadaci.html', function (req, res) {
  var spoji = path.join(__dirname + "/izgled/zadaci.html");
  res.sendFile(spoji);
});




//2. zad


/*
NAPOMENA:
ZBOG MULTERA, I NJEGOVOG ZAPISA NA C:, POTREBNO JE KOMANDU POKRENUTI KAO ADMIN 
DA NE BI BACALO ERROR:  EPERM: operation not permitted
-ne treba vise he he
*/

var multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './')
    //TAČKAAA!!! prije kad je bilo '/' spašavalo privremeno na C:, i zbog toga je bacalo error not permitted, sada ova tačka ispred './' znači relativno u odnosu na ovaj folder odakle sam pokrenula skriptu ovu index.js
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})



var upload = multer({ storage: storage })




app.post('/addZadatak', upload.single('postavka'), (req, res) => {

  const tempPath = req.file.path;
  const targetPath = path.join(__dirname, req.body.naziv + '.pdf');
  if (path.extname(req.file.originalname).toLowerCase() === ".pdf") {
    //console.log(files._rejectionHandler0);
    var x;
    var naziV = req.body.naziv + '.pdf';
    if (naziV == ".pdf") {

      res.sendFile(path.join(__dirname, './', '/izgled/greska.html'));
      return;
    }

    db.zadatak.count({ where: { naziv: req.body.naziv + '.pdf' } }).then(
      koliko => {
        if (koliko == 0) {
          //problem sada, ako pokusa da unese isti naziv koji vec ima, opet baca error
          fs.rename(tempPath, targetPath, err => {
            if (err) res.sendFile(path.join(__dirname, './', '/izgled/greska.html'));
            //umjesto da baci error, vraca stranicu he he

            res
              .status(200)
              .contentType("text/plain")
              .end('{"naziv":"' + req.body.naziv + '","postavka":"http://localhost:8080/zadatak?naziv=' + req.body.naziv + '.pdf"}');

          });

          //ubaci u tabelu
          db.zadatak.create(
            {
              naziv: req.body.naziv + '.pdf',
              postavka: "http://localhost:8080/zadatak?naziv=" + req.body.naziv + ".pdf"
            }).error();



        }
        else {
          res.sendFile(path.join(__dirname, './', '/izgled/greska.html'));
        }
      }).error();

  }
  else {
    res.sendFile(path.join(__dirname, './', '/izgled/greska.html'));
  }
});









//3. zad
// ok

//NAPOMENA: u parametar u urlu unosimo naziv.pdf, dakle i ekstenzijuu, tako je na forumu receno

app.get('/zadatak', function (request, response) {
  var url_dijelovi = url.parse(request.url, true);
  var query = url_dijelovi.query;
  var tempFile = query.naziv; //bez +.pdf, u parametru se proslijedi .pdf

  //broji koliko ima u bazi podataka s tim imenom, logi bice 1, jer u 2. zad nismo dali da unese vise njih s istim imenom

  db.zadatak.count({ where: { naziv: tempFile } }).then(nesta => {
    if (nesta == 1) {
      fs.readFile(tempFile, function (err, data) {
        response.contentType("application/pdf");
        response.send(data);
      });
    }
    else {
      response.sendFile(path.join(__dirname, './', '/izgled/greska.html'));
    }
  }
  ).error();
});



//zad 4
// ok
/*
CSV - comma separated values - jednostavan format za skladištenje tabelarnih podataka
npr baze podataka ili neke tabele
npr vrijednosti po kolonama za 1 red:
Jeff Smith,2018,Prescott House,17-D,3.20
*/



app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(bodyParser.json());


app.post('/addGodina', function (req, res) {

  var tijelo = req.body;
  //bila stavila tijelo.naziv weee
  //he he bacaloo error: Unhandled rejection SequelizeUniqueConstraintError: Validation error
  db.godina.count({ where: { nazivGod: tijelo.nazivGod } }).then(
    nasao => {
      var ok = false;
      //nesto mi stopa validacija u formi, znam da ne treba ovdje, al nemam vakta da popravljam tamo
      var inputElement = tijelo.nazivGod;
      regi = /20\d\d\/20\d\d/;
      if (regi.test(inputElement)) {
        var prva = inputElement.substring(0, 4);
        //	console.log(prva);
        var druga = inputElement.substring(5, 9);
        //	console.log(druga);
        if (parseInt(prva) + 1 == parseInt(druga)) { ok = true; }
        //console.log(nasao);
        if (nasao != 0 || ok == false) //ne smije biti neki red sa istim nazivom
          res.sendFile(path.join(__dirname, './', '/izgled/greska.html'));

        else if (ok == true) {
          db.godina.create(
            {
              nazivGod: tijelo.nazivGod,
              nazivRepSpi: tijelo.nazivRepSpi,
              nazivRepVje: tijelo.nazivRepVje
            }

          );

          res.sendFile(path.join(__dirname, './', '/izgled/addGodina.html'));
        }
        else res.sendFile(path.join(__dirname, './', '/izgled/addGodina.html'));



      }
    }



  ).error();

});


//zad 5
// ok

app.get('/godine', function (req, res) {
  var izlaz = '[';

  //findAll vraca sve slogove kao NIZ!! iz baze, iz tabele godina (db.____.findAll), i kolone koje smo naveli u []

  db.godina.findAll({ attributes: ['nazivGod', 'nazivRepSpi', 'nazivRepVje'] }).then(red => {
    // console.log(red.length);
    res.setHeader('Content-Type', 'application/json');

    for (var i = 0; i < red.length; i++) {
      //kreiramo objekat
      var objekat_povratni = {
        //posto je vracen niz, indeksiramo ono sto je vraceno
        nazivGod: red[i].nazivGod,
        nazivRepVje: red[i].nazivRepVje,
        nazivRepSpi: red[i].nazivRepSpi
      };

      //objekat u json
      objekat_povratni = JSON.stringify(objekat_povratni);

      //da skloni r
      objekat_povratni = objekat_povratni.replace("\\r", "");

      //ako nije zadnji json objekat, dodaje ,\n
      if (i < red.length - 1)
        izlaz += (objekat_povratni + ',\n');

      //ako jeste  zadnji objekat ne dodaje nista
      else
        izlaz += (objekat_povratni);

    }
    izlaz += ']';
    res.write(izlaz);
    res.end();
  }).error();

});



/*
zasto ne radiii kad ovdje stavim...
promise ako koristim varijablu izvan njega, tretira je kaooo lokalnuuuuuuuuuuuuuuuu
wooooooow
-kada imam ugniježdene promise, unutrašnji zna za ove s vana, 
vanjski ne znaju za unutrašnje koji su bili 
he he he
 
res.write(izlaz);
res.end();
*/
//promise ignorise sve izvan sebe ? hmmm
//very confusingg









/*res.write(']', function(err){
  res.end();
});*/


//netSocket.write(messages, function(err) { netSocket.end(); });








//zad8





/*na spirali 3  sam radila logikom da u zadaci.csv ubaci sve fajlove koji se nalaze u folderu, ovdje sam isto pokušala da iz baze pročita pa ubaci u fajl
međutim promise je pravio problemeee,
nije htio finoo da čita fajl nakon što se kreira, nekad pročita sve redove, nekad 1, nekad 2... itd random ponašanje skroz

sada nema više zadaci.csv
*/

/*sa 2 promise 1 u drugom sam sebi malo zakomplikovala život,
  ugl skontali smo sljedeće:
  -promise-i su asinhrone fje, tako da će najverovatnije biti odrađeno ovo okolo što nije promise prije njih, 
  -ako imamo promise unutar promise-a, prvo se vanjski odradi, pa tek onda u unutrašnji se ide
  */


app.get('/zadaci', function (req, res) {



  db.zadatak.findAll({ attributes: ['naziv', 'postavka'] }).then(red => {




    var poslani_formati = req.get('Accept');
    var trazeni_formati = ['application/json', 'application/xml', 'text/xml', 'text/csv'];
    var nasao_bar_jedno = false;
    for (var i = 0; i < 4; i++) {
      if (poslani_formati.includes(trazeni_formati[i])) {
        nasao_bar_jedno = true;
        //json
        if (i == 0) {
          res.setHeader('Content-Type', 'application/json');
          res.write('[');
          for (var i = 0; i < red.length; i++) {
            var temp = {
              naziv: red[i].naziv,

              postavka: red[i].postavka

              //kad je atribut vise rijeci pod navodnike stavimo
            };

            var objekat_povratni = JSON.stringify(temp);

            objekat_povratni = objekat_povratni.replace("\\r", "");


            if (red.length >= 2) {
              if (i < red.length - 1) //ovdje bila napisala greskom -2
                res.write(objekat_povratni + ',\n');
              //zbog zareeeeeeezaaaa, mi padaaalaa validacija jsooona
              else res.write(objekat_povratni + '\n');
            }
            else res.write(objekat_povratni + '\n');


          }

          res.write(']');
          res.end();


          return;

        }
        //xml
        else if (i == 1 || i == 2) {


          if (i == 1)
            res.setHeader('Content-Type', 'application/xml');

          else
            res.setHeader('Content-Type', 'text/xml');

          var izlaz = '<?xml version="1.0" encoding="UTF-8"?>\n<zadaci>\n';
          //console.log('cita ' + red.length);


          for (var i = 0; i < red.length; i++) {



            var temp = {
              naziv: red[i].naziv,

              postavka: red[i].postavka

              //kad je atribut vise rijeci pod navodnike stavimo
            };

            objekat_povratni = '\t<zadatak>\n\t\t<naziv>' + red[i].naziv + '</naziv>\n\t\t<postavka>' + red[i].postavka + '</postavka>\n\t</zadatak>'

            izlaz += objekat_povratni;

          }

          izlaz += '</zadaci>';
          res.write(izlaz);
          res.end();

          return;


        }

        //csv
        else {

          res.setHeader('Content-Type', 'text/csv');

          var izlaz = '';
          for (var i = 0; i < red.length; i++) {

            objekat_povratni = red[i].naziv + ',/' + red[i].postavka;
            res.write(objekat_povratni + '\n');

          }

          res.end();
          return;



        }
      }
    }
    //nije nasao nijedan
    if (!nasao_bar_jedno) res.sendFile(path.join(__dirname, './', '/izgled/addGodina.html'));


  }).error();
});


app.listen(8080);


/*
spirala 4
 */

//zad 2a
app.post('/addVjezba', function (req, res) {

  var tijelo = req.body;
  var tijelo_u_string = JSON.stringify(tijelo);
  //zad 2a

  if (tijelo_u_string.includes('sVjezbe') && tijelo_u_string.includes('sGodine')) {
    db.godina.findAll({
      where: { id: req.body.sGodine }
    }).then(
      nasao_godinu => {
        if (nasao_godinu.length == 0) {
          res.sendFile(path.join(__dirname, './', '/izgled/addGodina.html'));
        }

        //console.log(nasao_godinu);
        else {
          db.vjezba.findOne({ where: { id: req.body.sVjezbe } }).then(
            povezi => {
              // console.log(nasao_godinu);
              // nasao_godinu[0].getVjezbe().then(vjezbe=>{
              //iz nekog razloga nece da doda ako vec postoji veza weee
              //console.log(vjezbe);

              nasao_godinu[0].addVjezbe([povezi]);
            }
          )
        }
      }
    );
    // console.log('1');
  }


  //zad 2b
  else if (tijelo_u_string.includes('naziv') && tijelo_u_string.includes('sGodine')) {
    // console.log(tijelo_u_string);
    var checkbox_checkiran = false;
    //ako je checkiran, onda ce doci u bodyu spirala:on, ako nije checkiran, nema ga nikako u bodyu
    if (tijelo_u_string.includes('spirala')) checkbox_checkiran = true;

    //console.log(tijelo);
    //console.log('2');
    //kreiranje nove vjezbe
    db.vjezba.count({ where: { naziv: tijelo.naziv } }).then(
      godine => {
        if (godine != 0) {

          //  console.log('ima vec u bazi');

          // res.sendFile(path.join(__dirname, './', '/izgled/greska.html'));
        }
        else {
          db.vjezba.create({
            // id:tijelo.sGodine,
            naziv: tijelo.naziv,
            spirala: checkbox_checkiran
          }
          ).then(
            vjezbaa => {
              //console.log(nasao_godinu);
              db.godina.findOne({ where: { id: req.body.sGodine } }).then(
                godinaa => {
                  // console.log(nasao_godinu);
                  godinaa.addVjezbe([vjezbaa]);
                  //console.log('veza dodana');
                }
              )

            }
          );
        }
      }
    );

  }

  res.sendFile(path.join(__dirname, './', '/izgled/addVjezba.html'));
});

app.get("/vjezba", function (req, res) {
  db.vjezba.findAll().then(sve_vjezbe => {
    res.send(sve_vjezbe);
  })
});



app.get("/vjezba_dole", function (req, res) {
  db.vjezba.findAll().then(sve_vjezbe => {
    res.send(sve_vjezbe);
  })
});


app.get("/daj_godine", function (req, res) {
  db.godina.findAll().then(sve_godine => {
    res.send(sve_godine);
  });
});


app.get("/daj_zadatke", function (req, res) {
  db.zadatak.findAll().then(svi_zadaci => {
    res.send(svi_zadaci);
  });
});

app.get("/daj_zadatke/:koja_vjezba", function (req, res) {

  // console.log('promjenaa liste, parametar vjezba id je :'+req.params.koja_vjezba);
  db.vjezba.findOne({ where: { id: req.params.koja_vjezba } }).then(function (trazena_vjezba) {
    //console.log(trazena_vjezba);
    trazena_vjezba.getZadaci().then(
      zadaci => {
      //  console.log('spojeno je ' + zadaci.length);
        if (zadaci.length != 0) {
          var povezani_id=[];
          for(var i=0; i<zadaci.length; i++){
            //console.log(zadaci[i].id);
            povezani_id.push(zadaci[i].id);
          }
         // console.log('povezanih id ima '+povezani_id.length);
         // console.log(zadaci);
          //console.log('salje, velicina'+zadaci.length);
          db.zadatak.findAll().then(
            zadacii => {
          var sve_osim_povezanog=[];
       //   console.log('broj zad je '+zadacii.length);
          for(var j=0; j<zadacii.length; j++){
          //  console.log('poredi '+zadacii[j].id);
            //console.log(!(zadacii[j].id in povezani_id));
          /*  for(var k=0; k<povezani_id.length; k++)
          {
            if(zadacii[j].id==povezani_id[k]) break;
            else sve_osim_povezanog.push(zadacii[j]);
          }*/
          //elhamdulillaaaaaaaaaaaaaaaaaaaaaaaaaaaaah
          // napatilooo meeeee pogresno vracaaaooo kad sam koristila in fju
          if( povezani_id.includes(zadacii[j].id)) {}
          else sve_osim_povezanog.push(zadacii[j]);
           // if(!(zadacii[j].id in povezani_id)) sve_osim_povezanog.push(zadacii[j]);
          }
       // console.log('vraca '+sve_osim_povezanog.length);
              res.send(sve_osim_povezanog); //!!!! greskom vracala zadacii
            });
          }
          else {
            //console.log('nema veze, vraca sve');
            db.zadatak.findAll().then(svi => {
              res.send(svi);
            });
          }
        });
        
      });
        

        
     
  
});
// console.log(zadaci);
/* db.zadatak.findAll().then(svi_zadaci=>{
   res.send(svi_zadaci);
 });*/



app.post("/vjezba/:idVjezbe/zadatak", function (req, res) {
//console.log(req.body.sZadatak+' vjezba '+req.params.idVjezbe);
  db.vjezba.findOne({ where: { id: req.params.idVjezbe } }).then(
    vjezbica => {
      db.zadatak.findOne({ where: { id: req.body.sZadatak } }).then(
        zadacic => {
         
          vjezbica.addZadaci([zadacic]);
          res.redirect('http://localhost:8080/addVjezba.html');
          
          //res.sendFile(path.join(__dirname, './', '/izgled/addVjezba.html'));
          // res.sendFile(path.join(__dirname, './', '/izgled/addVjezba.html'));
          //vjezbica.addZadatak([zadacic]);
        }
      );

    }



  );


  //  console.log('vani');


});




//dodavanje zadatka na vjezbu
/*db.vjezba.findOne({
  where:{id:id_vjezbe}
  }).then(result=>{
  
  db.zadatak.findOne({
      where: {
          id: zadatak_id
      }
  }).then(rezultat=>{
      
      result.addZadaci(rezultat);
  })
 
  })
*/

//3a
//BitBucket.js se nalazi u spirala3/izgled/

function da_li_student_postoji(student, i) {
 return new Promise(function (resolve, reject) {
    db.student.findOne({where: { index: student.index} }).then(je_li_nasao => {
      if (je_li_nasao == null) reject(i); //ako vec postoji result=error
      //ovo i nam je redni broj u listi studenata
      else resolve(je_li_nasao); //ako ne postoji result= value
    });
  });
 
}


app.post('/student', function (req, res) {
  // console.log('wellcome');

  var br_svih_studenata = 0;

  //trazimo u tabeli godina, selektovanu godinu
  db.godina.findOne({
    where: {
      id: req.body.godina
    }
  }).then(selektovana_godina => {
    var lista_studenata = req.body.studenti;

    db.student.count().then(brojStudenata => {
      for (var i = 0; i <lista_studenata.length; i++) {

 /*fja da_li_student_postoji:
          -ako se pozvao resolve, vracena je value, i upada u then, sto je zapravo value=neki student,
          i samo ga povezemo sa godinom
          -ako se pozvao reject, baca se error, i upada se u catch, to znaci da student ne postoji u bazi, i da ga trebamo dodati, pa tek onda povezati sa godinom
          */


       da_li_student_postoji(lista_studenata[i], i).then(
         student => {
          selektovana_godina.addStudenti(student); //za svakog studenta pojedinacno dodaje vezu
         
        }).catch(redni_broj_u_listi_novog_studenta => {
          //dodavanje novog studenta
          db.student.create({
            imePrezime: lista_studenata[redni_broj_u_listi_novog_studenta].imePrezime,
            index: lista_studenata[redni_broj_u_listi_novog_studenta].index
          }).then(novo_dodani_student =>
             {
               //povezivanje sa godinom
            selektovana_godina.addStudenti(novo_dodani_student);
          });
        })
        br_svih_studenata++;
      }
      res.set("Content-Type", "application/json");

      res.send({
        "message": "Dodano je " + (br_svih_studenata - brojStudenata) + " novih studenata i upisano " + br_svih_studenata + " na godinu " + selektovana_godina.nazivGod
      });
    });

  });


});



//3b neJma