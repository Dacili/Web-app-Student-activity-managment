/*NAPOMENA:
OVO JE MOJAA SPIRALA, I PIŠEM ŠTA HOĆU U KOMENTARIMA, LP*/



//automatic indentation in visual code ctrl+k, ctrl+f


const express = require('express');  // klasa
var app = express(); //kreiranje instance klase express

const bodyParser = require('body-parser'); //treba mi da kazem koje tipove ocekujem, zatim req.body
const fs = require('fs'); //citanje i pisanje u imenik
const url = require('url');
const path = require('path'); //treba mi za putanju direktorija
//const multer = require('multer');
//za forme koje su tipa enctype='multipart/form-data'
//po defaultu je encoding za html : x-www-urlencoded
//da bismo mogli file-ove slati sa req


//dodala sam / after
app.use(express.static(path.join(__dirname + "/izgled/")));
//omGGG prije kad je bilo samo __dirname za static folder, doslovno uopšte nije koristio rute za 1. zad, tugyyyyyyyyy

const filehound = require('filehound');
const files = filehound.create()
  .paths('./')
  .ext('pdf')
  .find() ;





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
  const filehound = FileHound.create();
  filehound
      .glob("" + fajl + "")
      .find((err, files) => {
          if (err) throw err;

          else {
              res.download(files[0]);
          }
      })
*/

var multer  = require('multer')

 
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //cb(null, '/fajlovi/')
    cb(null, '/')
  },
  filename: function (req, file, cb) {
   // console.log(file.originalname);
    cb(null, file.originalname)
  }
})
 
var upload = multer({ storage: storage })




app.post('/addZadatak', upload.single('postavka'),(req, res) => {
  //console.log('fjaa');




  const tempPath = req.file.path;
  const targetPath = path.join(__dirname, req.body.naziv+'.pdf');

  if (path.extname(req.file.originalname).toLowerCase() === ".pdf") {
    
    var da_li_postoji_vec_pdf=false;
    //console.log(files._rejectionHandler0);
    var x;
    var naziV=req.body.naziv+'.pdf';
    if(naziV==".pdf") {
      //bila stavila greskom =

      res.sendFile(path.join(__dirname, './', '/izgled/greska.html'));
      res.end();
      return;}
    
    for(var i=0; i<files._rejectionHandler0.length; i++){
      x=files._rejectionHandler0[i];
      //console.log('x je '+files._rejectionHandler0[i]);
      //console.log(req.body.naziv+'.pdf');
      if(x==naziV){
        da_li_postoji_vec_pdf=true;
       // console.log('postoji');
        break;
      }
    }
    
    if(!da_li_postoji_vec_pdf){
    fs.rename(tempPath, targetPath, err => {
      if (err) throw err;
      res
      .status(200)
      .contentType("text/plain")
      .end('{"naziv":"'+req.body.naziv+'","postavka":"http://localhost:8080/zadatak?naziv='+req.body.naziv+'.pdf"}');
      
    });
   

    fs.writeFile(req.body.naziv+'Zad.json', '{"naziv":"'+req.body.naziv+'","postavka":"http://localhost:8080/zadatak?naziv='+req.body.naziv+'.pdf"}', function (err) {
      if (err) throw err;
      //console.log('Saved!');
    });
  } else {
    
      res.sendFile(path.join(__dirname, './', '/izgled/greska.html'));
     return;
    
  }}
  else {
    
    res.sendFile(path.join(__dirname, './', '/izgled/greska.html'));
    
  
}
  
}
);



/*sklonila writeHead , pravilo mi probleme
jer nakon writeHead NEEE MOŽEEMOOO VIŠE MIJENJATIII HEADEREE!!!!!!!!!!!!!!
SAMO MOŽEMO WRITE, I END
a setHeader je ok, možemo mijenjati 


*/




//3. zad
// ok
//omGGGGGGGGGGGGGGGG
/*
kad radim preko postman-aaa stavljam http!!!! a ne https 
nije radilooo, suzaa 
*/
app.get('/zadatak', function (request, response) {
  var url_dijelovi = url.parse(request.url, true);
  var query = url_dijelovi.query;
 // console.log(query);
  var tempFile = query.naziv ; //bez +.pdf 
 
  //console.log(tempFile);

  var tempFile = query.naziv;
  fs.readFile(tempFile, function (err, data) {
    response.contentType("application/pdf");
    response.send(data);


  });
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
  var naziv_god = tijelo.nazivGod;
  var postoji_naziv_god = false;
  //prvo provjeravamo da li u fajlu godine.csv postoji već godina sa imenom koji se nalazi u parametru requesta
  fs.readFile('godine.csv', 'utf8', function (err, podaci) {
    //console.log('cita');
    if (err) console.log('Greska: ' + err);
    var redovi = podaci.toString('utf-8').split("\n");

    for (var i = 0; i < redovi.length; i++) {
      var osoba_podaci = redovi[i];
      osoba_podaci = redovi[i].toString().split(",");
      if (osoba_podaci[0] == naziv_god) {
        //postoji vec ta godina, vraca greska.html
        res.set('Content-Type', 'text/html');
        postoji_naziv_god = true;
        res.sendFile(path.join(__dirname, './', '/izgled/greska.html'));
        return; //ovoooooo
      }
    }
    if (!postoji_naziv_god) {
      //ne postoji ta godina u dokumentu, vrši dodavanje u godine.csv

      //console.log('nije nasao');

      let novaLinija = "\n" + tijelo.nazivGod + ',' + tijelo.nazivRepVje + ',' + tijelo.nazivRepSpi;
      //console.log('ubacuje'+novaLinija);
      fs.appendFile('godine.csv', novaLinija, function (err) {
        if (err) throw err;

      });


      //ako je sve ok, vratimo addGodina.html
      res.sendFile(path.join(__dirname, './', '/izgled/addGodina.html'));

    }
  });




});


//zad 5
// ok

app.get('/godine', function (req, res) {
  fs.readFile('godine.csv', 'utf8', function (err, podaci) {
    //console.log('cita');
    if (err) console.log('Greska: ' + err);
    var redovi = podaci.toString('utf-8').split("\n");


   
    //response.headers={"content-type": "application/json"}
  
    //res.writeHead(200, {'Content-Type': 'application/json'});
    res.setHeader('Content-Type', 'application/json');
    //smanjila sam za 1 petlju jer mi ubaci na kraju ovo {"nazivGod":""} a ne treba
    res.write('[');
    var izlaz = '';
   // console.log('br redova'+redovi.length);
    //petlja ide od 2, jer zbog necega lik preskace prva 2 reda kad vrsi upis
    //ne znam zbog cega
    for (var i = 2; i < redovi.length ; i++) {
      var osoba_podaci = redovi[i];
      //console.log('red broj '+i);
      osoba_podaci = redovi[i].toString().split(",");
      var temp = {
        nazivGod: osoba_podaci[0],
        nazivRepVje: osoba_podaci[1],
        nazivRepSpi: osoba_podaci[2],

        //kad je atribut vise rijeci pod navodnike stavimo
      };

      var objekat_povratni = JSON.stringify(temp);

      objekat_povratni = objekat_povratni.replace("\\r", "");

      //console.log(objekat_povratni);
      //zasto doda r, napise frajko carrige return - cg
      //zastooooo nece da mi validira json kako treba, izbacuje greskee
      if(redovi.length>=2){
      if (i < redovi.length - 1) //ovdje bila napisala greskom -2
        res.write(objekat_povratni + ',\n');
      //zbog zareeeeeeezaaaa, mi padaaalaa validacija jsooona
      else res.write(objekat_povratni + '\n');
      }
      else res.write(objekat_povratni + '\n');
      //izlaz+=objekat_povratni;
      //izlaz+='\n';


    }
    //res.write(izlaz);
    res.write(']');
    res.end();


  });
});

//zad 6





//zad7
app.get('/zadaci', function (req, res) {
 
  fs.writeFile('zadaci.txt', '', function (err) {
    if (err) throw err;
   
  });
var x;
//ovaj files_rejectionHandler0 radi ako sačekam 3 sekunde nakon pokretanja skripte
//nekad radi nekad ne radiii tugyy
//console.log(files._rejectionHandler0);
  for(var i=0; i<files._rejectionHandler0.length; i++){
    x=files._rejectionHandler0[i];
    x=x.substring(0, x.length-4);
    //console.log(x);
    //mora \r jer je windowss samo \n ne dozivljava
    fs.appendFile('zadaci.txt', 'naziv,'+x+',postavka,https://c2.etf.unsa.ba/pluginfile.php/86187/mod_resource/content/1/Spirala%203.pdf'+'\r\n', function (err) {
      if (err) throw err;
     
    });
   
   

  }
 // console.log('uspjesno upisani zadaci');

  var poslani_formati=req.get('Accept');
var trazeni_formati=[ 'application/json', 'application/xml', 'text/xml' , 'text/csv'];
var nasao_bar_jedno=false;
for(var i=0; i<4; i++){
  if(poslani_formati.includes(trazeni_formati[i])){
    nasao_bar_jedno=true;
   //json
    if(i==0){
      //console.log('usao');
     // res.writeHead(200, {'Content-Type': 'application/json'});
     res.setHeader('Content-Type', 'application/json');
      fs.readFile('zadaci.txt', 'utf8', function (err, podaci) {
        if (err) console.log('Greska: ' + err);
        var redovi = podaci.toString('utf-8').split("\n");
    //console.log(redovi);
        //smanjila sam za 1 petlju jer mi ubaci na kraju ovo {"nazivGod":""} a ne treba
        res.write('[');
        var izlaz = '';
        for (var i = 0; i < redovi.length - 1; i++) {
          var osoba_podaci = redovi[i];
          osoba_podaci = redovi[i].toString().split(",");
          var temp = {
            naziv: osoba_podaci[1],
        
            postavka: osoba_podaci[3]
    
            //kad je atribut vise rijeci pod navodnike stavimo
          };
    
          var objekat_povratni = JSON.stringify(temp);
    
          objekat_povratni = objekat_povratni.replace("\\r", "");
    
         // console.log(objekat_povratni);
          //zasto doda r, napise frajko carrige return - cg
          //zastooooo nece da mi validira json kako treba, izbacuje greskee
    
          if(redovi.length>=2){
            if (i < redovi.length - 1) //ovdje bila napisala greskom -2
              res.write(objekat_povratni + ',\n');
            //zbog zareeeeeeezaaaa, mi padaaalaa validacija jsooona
            else res.write(objekat_povratni + '\n');
            }
            else res.write(objekat_povratni + '\n');
          //izlaz+=objekat_povratni;
          //izlaz+='\n';
    
    
        }
        //res.write(izlaz);
        res.write(']');
        res.end();
   

      });  return;
      
    }
    //xml
    else if(i==1 || i==2){
      
     if(i==1)  //res.writeHead(200, {'Content-Type': 'application/xml'});
     res.setHeader('Content-Type', 'application/xml');
     //res.setHeader('content-type', 'application/xml');
     else //res.writeHead(200, {'Content-Type': 'text/xml'});
     res.setHeader('Content-Type', 'text/xml');
      //res.setHeader('content-type',  'text/xml');
      fs.readFile('zadaci.txt', 'utf8', function (err, podaci) {
        if (err) console.log('Greska: ' + err);
        var redovi = podaci.toString('utf-8').split("\n");
    
        //smanjila sam za 1 petlju jer mi ubaci na kraju ovo {"nazivGod":""} a ne treba
       // res.write('<?xml version="1.0" encoding="UTF-8"?>\n<zadaci>\n');
        var izlaz = '<?xml version="1.0" encoding="UTF-8"?>\n<zadaci>\n';
        for (var i = 0; i < redovi.length - 1; i++) {
          var osoba_podaci = redovi[i];
          osoba_podaci = redovi[i].toString().split(",");
         objekat_povratni='\t<zadatak>\n\t\t<naziv>'+osoba_podaci[1]+'</naziv>\n\t\t<postavka>'+osoba_podaci[3]+'</postavka>\n\t</zadatak>'
          
          izlaz+=objekat_povratni;
    
         
         // console.log(objekat_povratni);
          //zasto doda r, napise frajko carrige return - cg
          //zastooooo nece da mi validira json kako treba, izbacuje greskee
    
          
          //res.write(objekat_povratni);
    
          //izlaz+=objekat_povratni;
          //izlaz+='\n';
    
    
        }
        //res.write(izlaz);
        izlaz+='</zadaci>';
        res.write(izlaz);
        res.end();
        

      });
return;
      
 
}
  
    //csv
    else {
      //res.setHeader('content-type', 'text/csv');
      //res.writeHead(200, {'Content-Type': 'text/csv'});
      res.setHeader('Content-Type', 'text/csv');
      fs.readFile('zadaci.txt', 'utf8', function (err, podaci) {
        if (err) console.log('Greska: ' + err);
        var redovi = podaci.toString('utf-8').split("\n");
    
        //smanjila sam za 1 petlju jer mi ubaci na kraju ovo {"nazivGod":""} a ne treba
        
        var izlaz = '';
        for (var i = 0; i < redovi.length - 1; i++) {
          var osoba_podaci = redovi[i];
          osoba_podaci = redovi[i].toString().split(",");
        
    
         objekat_povratni=osoba_podaci[1]+',/'+osoba_podaci[3];
    
          
    
         
          res.write(objekat_povratni + '\n');
         
          
    
    
        }
       
        res.end();
     return;

      });

    }
  }
}
//nije nasao nijedan
if(!nasao_bar_jedno)  res.sendFile(path.join(__dirname, './', '/izgled/addGodina.html'));

});




//zad8



app.listen(8080);