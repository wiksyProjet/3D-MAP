<<<<<<< HEAD
//alert("prep.js");
=======
>>>>>>> 83c9f12a637b4a1f9f96f1a4fdeb73ab84f8685e

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
			} else InterfacePreparation.alertMessage("Aucune expedition prévue pour le moment");
			//document.getElementById("preparationCommandes").innerHTML += "<p>Aucune expedition prévue</p>";
		})
	},

	RechercheExpedition : function(id){
		JNTP.execute(["getExpedition", {"filter" :{"ID" : id}}], function(j){
			//alert(j.body.length);
			if(j.body.length != 0){
				//alert("ici");
				this.donnees = j.body;
				InterfacePreparation.afficheCommande(this.donnees[0]);
			} else InterfacePreparation.alertMessage("Aucune expedition prévue pour la commande d'ID : "+id);
			//document.getElementById("preparationCommandes").innerHTML += "<p>Aucune expedition prévue pour la commande d'ID : "+id+"</p>";
		})

	},

<<<<<<< HEAD
	ExpedierCommande : function(IDdeLaCommande) {
		JNTP.execute(["setExpedition", {"expedier" : IDdeLaCommande}],function(j){
			if(j.body.length != 0){
				this.donnees = j.body;
				j.expedition = true; //je crois, faut que je demande à Athmane
=======
	ExpedierCommande : function(IDdeLaCommande) {	//comme la requête ne fonctionne pas, c'est encore expérimental
		JNTP.execute(["setExpedition", {"expedier" : IDdeLaCommande}],function(j){
			if(j.body.length != 0){
				this.donnees = j.body;
				j.expedition = true;
>>>>>>> 83c9f12a637b4a1f9f96f1a4fdeb73ab84f8685e
				InterfacePreparation.effaceCommande(this.donnees);
			}
			else InterfacePreparation.alertMessage("La commande d'ID : "+ IDdeLaCommande +" ne peut être expédiée");

		})
<<<<<<< HEAD
=======
	},

	ImprimerFacture : function(IDdeLaCommande) {
		JNTP.execute(["getMedias", {"facture" : IDdeLaCommande}], function(j){
			if(j.body.length != 0){
				print(j);
			}
			else InterfacePreparation.alertMessage("Impossible d'imprimer la facture pour la commande d'ID : "+ IDdeLaCommande);
		})
	},

	ImprimerBon : function(IDdeLaCommande) {
		JNTP.execute(["getMedias", {"bon" : IDdeLaCommande}], function(j){
			if(j.body.length != 0){
				print(j);
			}
			else InterfacePreparation.alertMessage("Impossible d'imprimer le bon de livraison pour la commande d'ID : "+ IDdeLaCommande);
		})
>>>>>>> 83c9f12a637b4a1f9f96f1a4fdeb73ab84f8685e
	}


};

$("#preparationPanel").click(Preparation.RechercheAllExpeditions());
<<<<<<< HEAD
//$("#preparationPanel").click(Preparation.RechercheExpedition(28));
=======
>>>>>>> 83c9f12a637b4a1f9f96f1a4fdeb73ab84f8685e
