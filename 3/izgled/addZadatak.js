function validiraj(){
	ispis=document.getElementById("greska");
	var v =new Validacija(ispis);
	var imee=document.getElementById("ime_pasa").value;



	var poruka=	v.naziv(imee);
	var ispis;
	
	if(poruka!=""){
		
		ispis.innerHTML="Sljedeca polja nisu validna: "+poruka+"!";
		
		
		//ispis.concat("!");
	}

}