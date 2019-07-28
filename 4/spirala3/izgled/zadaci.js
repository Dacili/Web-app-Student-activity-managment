function validiraj(){
	ispis=document.getElementById("greska");
	var v =new Validacija(ispis);
	var imee=document.getElementById("tbox").value;




	var poruka=	v.ime(imee);
	var ispis;
	
	if(poruka!=""){
		;
		ispis.innerHTML="Sljedeca polja nisu validna: "+poruka+"!";
		
		
		//ispis.concat("!");
	}
}