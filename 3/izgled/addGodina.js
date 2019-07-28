function validiraj(){
	ispis=document.getElementById("greska");
	
	var v =new Validacija(ispis);
	var imee=document.getElementById("naziV").value;
	var repo1=document.getElementById("rep1").value;
	var repo2=document.getElementById("rep2").value;




	var poruka=	v.naziv(imee);
	var por_rep1=v.repozitorij(repo1, /\w{3,}/g);
	var por_rep2=v.repozitorij(repo2, /\w{3,}/g);
	var ispis;
	
	
	ispis.innerHTML="Sljedeca polja nisu validna: ";


	if(poruka!="" && (por_rep1!="" || por_rep2!="")){
		var sve=ispis.innerHTML;
		sve=sve+poruka+", "+por_rep1+"!";
		ispis.innerHTML=sve;
	}
	else if(poruka!=""){
		var sve=ispis.innerHTML;
		sve=sve+poruka+"!";
		ispis.innerHTML=sve;
		ispis.style.display="block";

	}
	else if(por_rep1!="" || por_rep2!=""){
		var sve=ispis.innerHTML;
		sve=sve+"repozitorij"+"!";
		ispis.innerHTML=sve;
		ispis.style.display="block";
	}
}


	function Pozovi(){
	var divic=document.getElementById("glavniSadrzaj");

var v =new GodineAjax(divic);



}
