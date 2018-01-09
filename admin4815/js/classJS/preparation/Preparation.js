alert("prep.js");

var Preparation = {
	donnees = [],

	RechercheExpeditions : function(){
		JNTP.execute(["getExpedition", {"filter" :{}], function(j){
			if(typeof(j.body.length) != 0){
				this.donnees = j.body;
				//value["id"] = j.commande.ref;
				console.log(this);
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

Preparation.RechercheExpeditions();
//console.log(typeof(Preparation.id));
console.log(Preparation);

}

alert("fin prep.js");
