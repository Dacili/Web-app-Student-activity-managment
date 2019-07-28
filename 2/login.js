




function validiraj(){
	var v =new Validacija("greska");
	var sifra=document.getElementById("pw").value;

	var poruka=v.password(sifra);
	var ispis;
	
	if(poruka!=""){
		ispis=document.getElementById("greska");
		ispis.innerHTML="Sljedeca polja nisu validna: "+poruka+"!";
		
		
		//ispis.concat("!");
	}

}