function validiraj(){
	ispis=document.getElementById("greska");
	var v =new Validacija(ispis);
	var imee=document.getElementById("tbox").value;




	var poruka=	v.naziv(imee);
	var ispis;
	
	if(poruka!=""){
		
		ispis.innerHTML="Sljedeca polja nisu validna: "+poruka+"!";
		
		
		//ispis.concat("!");
	}
}


function pokupi_podatke_iz_baze(){

var xhr=new XMLHttpRequest();
xhr.onload=function() {
	if(xhr.status==200){
		//alert(xhr.responseText);
		var response=JSON.parse(xhr.responseText);
		var sVjezbe=document.getElementsByName("sVjezbe")[0];
		for(var i=0; i<response.length; i++){
			var opcija=document.createElement("option");
			opcija.value=response[i].id;
			opcija.innerText=response[i].naziv;
			sVjezbe.appendChild(opcija);
		}
	}
}
xhr.open("GET", "http://localhost:8080/vjezba", true);
xhr.send();






var xhr_za_godine=new XMLHttpRequest();

xhr_za_godine.onload=function() {
	if(xhr_za_godine.status==200){
		//alert(xhr_za_godine.responseText);
		var response=JSON.parse(xhr_za_godine.responseText);

		var sVjezbe=document.getElementsByName("sGodine")[0];
		//sVjezbe.options.length=0;
		for(var i=0; i<response.length; i++){
			var opcija=document.createElement("option");
			opcija.value=response[i].id;
			opcija.innerText=response[i].nazivGod;
			sVjezbe.appendChild(opcija);
		}
		var sVjezbe_dole=document.getElementsByName("sGodine")[1];
		for(var i=0; i<response.length; i++){
			var opcija=document.createElement("option");
			opcija.value=response[i].id;
			opcija.innerText=response[i].nazivGod;
			sVjezbe_dole.appendChild(opcija);
		}
	}
}
xhr_za_godine.open("GET", "http://localhost:8080/daj_godine", true);
xhr_za_godine.send();




var xhr_za_zadaci=new XMLHttpRequest();

xhr_za_zadaci.onload=function() {
	if(xhr_za_zadaci.status==200){
		//alert(xhr_za_godine.responseText);
		var response=JSON.parse(xhr_za_zadaci.responseText);

		
		var sVjezbe_dole=document.getElementsByName("sZadatak")[0];
		sVjezbe_dole.options.length=0;
		for(var i=0; i<response.length; i++){
			var opcija=document.createElement("option");
			opcija.value=response[i].id;
			opcija.innerText=response[i].naziv;
			sVjezbe_dole.appendChild(opcija);
		}
	}
}

var koja_godina_selektovana=document.getElementsByName("sGodine")[1];
//console.log(koja_godina_selektovana);
xhr_za_zadaci.open("GET", "http://localhost:8080/daj_zadatke", true);
xhr_za_zadaci.send();




var xhr_vjezbe_dole=new XMLHttpRequest();
xhr_vjezbe_dole.onload=function() {
	if(xhr_vjezbe_dole.status==200){
		//alert(xhr.responseText);
		var response=JSON.parse(xhr_vjezbe_dole.responseText);
		var sVjezbe=document.getElementsByName("sVjezbe")[1];
		for(var i=0; i<response.length; i++){
			var opcija=document.createElement("option");
			opcija.value=response[i].id;
			opcija.innerText=response[i].naziv;
			sVjezbe.appendChild(opcija);
		}
	}
}
xhr_vjezbe_dole.open("GET", "http://localhost:8080/vjezba_dole", true);
xhr_vjezbe_dole.send();

}
function promijeni_action_link(){
	var idVjezbe=document.getElementsByName('sVjezbe')[1].value;
	var linkic="http://localhost:8080/vjezba/"+idVjezbe.toString()+"/zadatak";
	var formica=document.getElementsByName('fPoveziZadatak')[0];
	formica.action=linkic;

//azuriraj_zadatke();
	//formica.action="http://localhost:8080/addVjezba.html";
}

function azuriraj_zadatke(){
	


	var xhr_za_zadaci2=new XMLHttpRequest();
	xhr_za_zadaci2.onload=function() {
	if(xhr_za_zadaci2.status==200){
//iz nekog razloga console.log nece da radi, idemo preko alert
		var response=JSON.parse(xhr_za_zadaci2.responseText);
	//	alert('primio nazad'+response);
		
		var sVjezbe_dole=document.getElementsByName("sZadatak")[0];
			//brise sve prijasnje opcije
sVjezbe_dole.options.length=0;


//alert('sada ima opcija'+sVjezbe_dole.options.length);
//dodaje nove opcije za odgovarajucu vjezbu
		for(var i=0; i<response.length; i++){
			var opcija=document.createElement("option");
			opcija.value=response[i].id;
			opcija.innerText=response[i].naziv;
			sVjezbe_dole.appendChild(opcija);
		}
	}
}

var koja_vjezba_selektovana=document.getElementsByName("sVjezbe")[1];
koja_vjezba_selektovana=  koja_vjezba_selektovana.options[koja_vjezba_selektovana.selectedIndex].value;
xhr_za_zadaci2.open("GET", "http://localhost:8080/daj_zadatke/"+koja_vjezba_selektovana, true);
xhr_za_zadaci2.send();



}
