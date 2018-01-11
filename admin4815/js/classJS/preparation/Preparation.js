alert("prep.js");

var Preparation = {
	donnees : [],

	RechercheExpeditions : function(){
		JNTP.execute(["getExpedition", {"filter" :{}}], function(j){
			if(typeof(j.body.length) != 0){
				this.donnees = j.body;
			//	document.getElementById("preparationCommandes").innerHTML += "<Jss dans RechercheExpeditions</p>";
				console.log(this.donnees);
				InterfacePreparation.afficheCommandes(this.donnees);
				//document.getElementById("preparationCommandes").innerHTML += "</table>"
				//return j.body;
			} else document.getElementById("preparationCommandes").innerHTML += "Aucune expedition prévue";
		})
	}

};

$("#preparationPanel").click(Preparation.RechercheExpeditions());


/*Preparation.client = "Anna";
console.log(Preparation.client);
Preparation.expedition();
console.log(Preparation);*/


function value(){

Preparation.RechercheExpeditions();
//console.log(typeof(Preparation.id));
console.log(Preparation);

}

alert("fin prep.js");
