function validiraj(){
	var v =new Validacija("greska");
	var imee=document.getElementById("tbox").value;
	var indekss=document.getElementById("indeX").value;




	var poruka=	v.naziv(imee);
	var ispis;
	ispis=document.getElementById("greska");
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