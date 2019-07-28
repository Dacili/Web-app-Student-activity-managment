

var Validacija=(function(){
	//lokalne variable idu ovdje
var regi;
var konstruktor=function(divElement){
	//var div=document.getElementById(divElement); tugyy plakyyy
	var div=divElement;

	return{
	ime:function(inputElement){
		
		regi=/(((([A-Z][a-z][a-z]*)|([A-Z'][a-z][a-z']*)|([A-Z'][a-z'][a-z']*)|([A-Z][a-z'][a-z']*)| ([A-Z'][a-z'][a-z]*)|([A-Z][a-z][a-z']*)|([A-Z][a-z'][a-z]*)|([A-Z'][a-z][a-z]*))(-| )){0,3}(([A-Z][a-z][a-z]*)|([A-Z'][a-z][a-z']*)|([A-Z'][a-z'][a-z']*)|([A-Z][a-z'][a-z']*)| ([A-Z'][a-z'][a-z]*)|([A-Z][a-z][a-z']*)|([A-Z][a-z'][a-z]*)|([A-Z'][a-z][a-z]*)))|(([A-Z][a-z][a-z]*)|([A-Z'][a-z][a-z']*)|([A-Z'][a-z'][a-z']*)|([A-Z][a-z'][a-z']*)| ([A-Z'][a-z'][a-z]*)|([A-Z][a-z][a-z']*)|([A-Z][a-z'][a-z]*)|([A-Z'][a-z][a-z]*))/;
		//haha moglo je jednostavnije
		//regi=/((([A-Z'][a-z'][a-z']*)(-| )){0,3}[A-Z'][a-z'][a-z']*)|([A-Z'][a-z'][a-z']*)/;
		if(regi.test(inputElement)){
			//provjeravamo da nema negdje dvostruki '
			div.style.display="none";
							
			for(var u=0; u<inputElement.length-1; u++){
				if(inputElement[u]=='\''){
					if(u<inputElement.length-2){
						if(inputElement[u+1]=='\''){
							div.style.display="block";
							
							return "ime";

							 //ima dupli navodnik
						}
						else{
							div.style.display="none";
							return "";
						}
					}
				}
			}
			
		}
		else{
		div.style.display="block";
		return "ime";
						
					}
	},
	godina:function(inputElement){
		regi=/20\d\d\/20\d\d/;
		if(regi.test(inputElement)){
			var prva=inputElement.substring(0,4);
			//console.log(prva);
			var druga=inputElement.substring(6,4);
			//console.log(druga);
			if(parseInt(prva)+1==parseInt(druga)){
				//proso 
				return "";
			}
			else return "godina";

		}
		 return "godina";

	},
	repozitorij:function(inputElement,regex){
		if(regex.test(inputElement)){
			return "";
		}
		
		return "repozitorij";

	},
	index:function(inputElement){
		regi=/(1[4-9]|2[0])\d\d\d/;
		if(regi.test(inputElement)){
			return "";
		}
		return "indeks";
		
	},
	naziv:function(inputElement){
		regi=/(([a-z]|[A-Z])([a-z]|[A-Z]|\d|[\/-“‘!?:;,]){1,}(\d|[a-z]))/;
		if(regi.test(inputElement)){
			div.style.display="none";
			return "";		}
		else {
			div.style.display="block";
			return "naziv";
		}

	},
	password:function(inputElement){
		regi=/(((?=.*(\d){2})(?=.*([a-z]){2}))|((?=.*([a-z]){2})(?=.*([A-Z]{2})))|((?=.*(\d){2})(?=.*([A-Z]{2}))))[0-9a-zA-Z]{8,}$/;
		if(regi.test(inputElement)){
			div.style.display="none";
			//div.innerHTML="Pw ispravan";
			return "";
		}
		div.style.display="block";
		return "password";
							
	
	},
	url:function(inputElement){
		regi=/((http|https|ftp|ssh)(\:\/\/)(\w*\.)*\w*)((\/(\w*\/)*\w*)?((\?([a-z0-9-]*\=[a-z0-9-]*\&)?)*([a-z0-9-]+\=[a-z0-9-]+))?)?/;
		if(regi.test(inputElement)){
			var potrefilo=inputElement.match(regi);
				var adresa=potrefilo[0];
				var upitnik=adresa.indexOf('?'); //indexOf vraca -1, ako nije nasao
				//trazim indeks ?,i provjerim da nije poslije njega, ili na kraju-->ako jest, nije ispravno
				if(upitnik!=-1)
				if(adresa[upitnik+1]!='-' && adresa[adresa.length-1]!='-'){

				// alert("odjeee");
				div.style.display="none";

				 return "";
				}
				else{div.style.display="block";
				return "url";
}
				 

		}
		else{
		//alert("ovdje");
	div.style.display="none";
	return "url";
	
}
	}
}
}
return konstruktor;
}());