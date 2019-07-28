function validiraj(){
	var v =new Validacija("greska");
	var imee=document.getElementById("tbox").value;




	var poruka=	v.ime(imee);
	var ispis;
	
	if(poruka!=""){
		ispis=document.getElementById("greska");
		ispis.innerHTML="Sljedeca polja nisu validna: "+poruka+"!";
		
		
		//ispis.concat("!");
	}
}