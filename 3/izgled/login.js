




function validiraj(){
	ispis=document.getElementById("greska");
	var v =new Validacija(ispis);
	var sifra=document.getElementById("pw").value;

	var poruka=v.password(sifra);
	var ispis;
	
	if(poruka!=""){
		
		ispis.innerHTML="Sljedeca polja nisu validna: "+poruka+"!";
		
		
		//ispis.concat("!");
	}

}