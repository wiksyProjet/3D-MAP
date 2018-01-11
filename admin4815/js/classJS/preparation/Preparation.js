alert("prep.js");

var Preparation = {
	donnees : [],

	RechercheAllExpeditions : function(){
		JNTP.execute(["getExpedition", {"filter" :{}}], function(j){
			if(typeof(j.body.length) != 0){
				this.donnees = j.body;
			//	document.getElementById("preparationCommandes").innerHTML += "<Jss dans RechercheExpeditions</p>";
				//console.log(this.donnees);
				InterfacePreparation.afficheAllCommandes(this.donnees);
				//document.getElementById("preparationCommandes").innerHTML += "</table>"
				//return j.body;
			} else document.getElementById("preparationCommandes").innerHTML += "<p>Aucune expedition prévue</p>";
		})
	},

	RechercheExpedition : function(id){
		JNTP.execute(["getExpedition", {"filter" :{"ID" : id}}], function(j){
			if(typeof(j.body.length) != 0){
				this.donnees = j.body;
				InterfacePreparation.afficheCommande(this.donnees);
			} else document.getElementById("preparationCommandes").innerHTML += "<p>Aucune expedition prévue pour la commande d'ID : "+id+"</p>";
		})
	}

};

$("#preparationPanel").click(Preparation.RechercheAllExpeditions());
//$("#preparationPanel").click(Preparation.RechercheExpedition(284));


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
