var tabela;

function pocetna_fja(br) {
var hrkljus=document.getElementById("greska");
	var testic=new Validacija(hrkljus);
	if(br==1){
	var br_zad=parseInt(document.getElementById("br_zad").value);
	//PARSEEEEEEEEEEEEEEEEEEEEEEE INTTTTTTTTTTTTTTTTTTTTTT!!!!!!!!!!!!!!!!!!!!!
	//ELHAMDULILLAH

	var divic= document.getElementById("mojDiv");
	
	  tabela= new CommitTabela(divic,br_zad);
	 //alert(tabela.rows.length);
	 
	 //alert(getElementById("tabelica").rows.length);
	}

else if(br==2){
 
	if(document.getElementById("dodaj").checked) {
		
		
 	var rbz=document.getElementById("redni_br_zad_dodaj").value;

 	var adr=document.getElementById("url_dodaj").value;
 	var provjera=testic.url(adr);
 	if(provjera!="url"){
 	if(rbz>=0){
//alert('poziva fju');

 		tabela.dodajCommit(parseInt(rbz),adr);


}
}
else {
	
	hrkljus.innerHTML="Neispravan url!";
	hrkljus.style.display="block";
}
}
else if(document.getElementById('edituj').checked) {
	 rbz=parseInt(document.getElementById("redni_br_zad_dodaj").value);
 	
 	 rbc=parseInt(document.getElementById("redni_br_comm_edituj").value);
 	 
 	 adr=document.getElementById("url_dodaj").value;
 	var provjera=testic.url(adr);
 	if(provjera!="url"){
 	 if(rbz>=0&& rbc>=0)
 	 	tabela.editujCommit(rbz,rbc,adr);


}
else{hrkljus.innerHTML="Neispravan url!";
	
}}

else if(document.getElementById('izbrisi').checked) {
	rbz=parseInt(document.getElementById("redni_br_zad_dodaj").value);
 	rbc=parseInt(document.getElementById("redni_br_comm_edituj").value);
 	if(rbz>=0&& rbc>=0)
 	tabela.obrisiCommit(rbz,rbc);


}
}




}




var CommitTabela=(function(){
//lokalne odje




var konstruktor=function(divElement,brojZadataka){

	var tabela=document.createElement("table");
	tabela.setAttribute("id", "tabelica");
	divElement.appendChild(tabela);

//dodavanje prvog fiksnog reda
	var prvi_red=tabela.insertRow(0);
	prvi_red.insertCell(0).innerHTML="Naziv zadatka";
	prvi_red.cells[0].style.width = '150px';
	prvi_red.cells[0].style.borderRight="1pt solid black";
	var druga_kol=prvi_red.insertCell(1);
	prvi_red.cells[1].style.width = '200px';
	druga_kol.innerHTML="Commiti";
	druga_kol.setAttribute("colspan", 1);
	druga_kol.setAttribute("id", "druga_kol");

//dodavanje prve  kolone sa rednim br zad, br_redova=br_zad
		var red;
	for (var i=1; i<=brojZadataka; i++){

		
		var link=document.createElement("a");
	link.setAttribute("href","https://docs.google.com/document/d/1ZjkBwWG_gsRokjp7oGwDpFm40qXM1tB9AwcV5_Qv8W8/edit");
		var linkText = document.createTextNode("Zadatak "+i);
		link.appendChild(linkText);
		//red.insertCell(0).appendChild(link);
		tabela.insertRow(i).insertCell(0).appendChild(link);
		tabela.rows[i].cells[0].style.borderRight="1pt solid black";
		//tabela.rows[i].insertCell(1);
		//tabela.rows[i].cells[1].innerHTML="";

	}







	return{
		dodajCommit:function(rbZadatka,url){
			
			rbZadatka=rbZadatka+1;
			
			if(rbZadatka>brojZadataka) return -1;
		
			var trazeni_red=tabela.rows[rbZadatka];
			
			var duzina_trazenog_reda=trazeni_red.cells.length; 
			
			for(var k=1; k<=duzina_trazenog_reda; k++){
			
				if(trazeni_red.cells[k]==undefined){
				
					//ima mjesta u redu, samo doda u prvu praznu celiju
				 link=document.createElement("a");
					link.setAttribute("href",url);
						 linkText = document.createTextNode(k);
						link.appendChild(linkText);
						
						trazeni_red.insertCell(k).appendChild(link);
						trazeni_red.cells[k].style.borderRight="1pt solid black";
						var cols=druga_kol.getAttribute("colspan");
						druga_kol.setAttribute("colspan", cols+1);
					break;
				}

			}
			if(k==duzina_trazenog_reda+1){ 
			//sve kolone popunjene, sirimo sve redove za 1 kolonu
				for(var j=1; j<brojZadataka; j++){
					var duzina_reda=tabela.rows[j].cells.length;
					var vrij_colspan=tabela.rows[j].cells[duzina_reda-1].getAttribute("colspan");
					tabela.rows[j].setAttribute("colspan", vrij_colspan+1);
				}
				//i dodamo el
				trazeni_red.cells[duzina_trazenog_reda+1].setAttribute("href", url);
			}
			return 1;
		},

		editujCommit:function(rbZadatka,rbCommita,url){
			
			rbCommita=rbCommita+1;
			rbZadatka=rbZadatka+1;
			if(rbZadatka>brojZadataka) return -1;
			 trazeni_red=tabela.rows[rbZadatka];
			 duzina_trazenog_reda=trazeni_red.cells.length; 
			 if(duzina_trazenog_reda<rbCommita) return -1;

			 trazeni_red.deleteCell(rbCommita);


		link=document.createElement("a");
					link.setAttribute("href",url);
						 linkText = document.createTextNode(rbCommita);
						link.appendChild(linkText);
						
						trazeni_red.insertCell(rbCommita).appendChild(link);
						trazeni_red.cells[rbCommita].style.borderRight="1pt solid black";
						return 1;


		},
		obrisiCommit:function(rbZadatka,rbCommita){
			rbCommita=rbCommita+1;
			rbZadatka=rbZadatka+1;
			if(rbZadatka>brojZadataka) return -1;
			 trazeni_red=tabela.rows[rbZadatka];
			 duzina_trazenog_reda=trazeni_red.cells.length; 
			 if(duzina_trazenog_reda<rbCommita) return -1;

			 trazeni_red.deleteCell(rbCommita);


			 return 1;
			
		}
	}
}
return konstruktor;


}());

