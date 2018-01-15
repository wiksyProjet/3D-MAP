alert("prep.js");

var Preparation = {
	id : "",
	client : "",
	adresse : "",
	montant : "",
	commande : "",


	RechercheExpeditions : function(idCommande){
		JNTP.execute(["getExpedition", {"filter" :{"ID" : idCommande}}], function(j){
			if(typeof(j.id) != "undefined"){
				this.id = j.refCommande;
				this.client = j.client.nom + j.client.prenom;
				this.adresse = j.client.adresse;
				this.paiement = j.paiement.prixTTC;
				this.commande = j.commande;
				//value["id"] = j.commande.ref;
		} else {
			alert("Pas d'expedition prévue pour commande");
		}
	})

}

};



/*Preparation.client = "Anna";
console.log(Preparation.client);
Preparation.expedition();
console.log(Preparation);*/


function value(){

Preparation.RechercheExpeditions(378);
//console.log(typeof(Preparation.id));
console.log(Preparation);

}

alert("fin prep.js");
