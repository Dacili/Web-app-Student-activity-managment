function validiraj(){
	ispis=document.getElementById("greska");
	var v =new Validacija(ispis);
	var imee=document.getElementById("tbox").value;
	var indekss=document.getElementById("indeX").value;




	var poruka=	v.naziv(imee);
	var ispis;
	
	ispis.innerHTML="Sljedeca polja nisu validna: ";
	var poruka2=v.index(indekss);

	if(poruka!="" && poruka2!=""){
		var sve=ispis.innerHTML;
		sve=sve+poruka+", "+poruka2+"!";
		ispis.innerHTML=sve;
	}
	else if(poruka!=""){
		var sve=ispis.innerHTML;
		sve=sve+poruka+"!";
		ispis.innerHTML=sve;
		ispis.style.display="block";

	}
	else if(poruka2!=""){
		var sve=ispis.innerHTML;
		sve=sve+poruka2+"!";
		ispis.innerHTML=sve;
		ispis.style.display="block";
	}
}



function popuni_godine(){
var xhr_za_godine=new XMLHttpRequest();

xhr_za_godine.onload=function() {
	if(xhr_za_godine.status==200){
		//alert(xhr_za_godine.responseText);
		var response=JSON.parse(xhr_za_godine.responseText);

		var sVjezbe=document.getElementsByName("sGodina")[0];
		for(var i=0; i<response.length; i++){
			var opcija=document.createElement("option");
			opcija.value=response[i].id;
			opcija.innerText=response[i].nazivGod;
			sVjezbe.appendChild(opcija);
		}
		
		
	}
}
xhr_za_godine.open("GET", "http://localhost:8080/daj_godine", true);
xhr_za_godine.send();


}



function ucitaj(){
	

var bitbucket_instanca=new BitBucket("","");
var lista_studenata=bitbucket_instanca.ucitaj("","","");
var dodaj=document.getElementsByName('dodaj')[0];
dodaj.disabled=false;
//alert('prosao');

dodaj.onclick=function (){
	
	var xhr=new XMLHttpRequest();
	xhr.onload=function(){
		//alert('odg');
		if(xhr.status==200){
		
		alert(JSON.parse(JSON.stringify(xhr.responseText)));
		
	
		}
	}


	var godina=document.getElementsByName('sGodina')[0].value;
		
	xhr.open("POST", "http://localhost:8080/student", true);

	xhr.setRequestHeader("Content-Type","application/json");

	xhr.send(JSON.stringify({
		"godina":godina,
		"studenti":lista_studenata
	}));
	//alert('poslao');

};
}