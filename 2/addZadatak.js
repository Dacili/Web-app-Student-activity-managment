function validiraj(){
	var v =new Validacija("greska");
	var imee=document.getElementById("ime_pasa").value;



	var poruka=	v.naziv(imee);
	var ispis;
	
	if(poruka!=""){
		ispis=document.getElementById("greska");
		ispis.innerHTML="Sljedeca polja nisu validna: "+poruka+"!";
		
		
		//ispis.concat("!");
	}

}