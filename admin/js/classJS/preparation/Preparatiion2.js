alert("prep.js");
//document.getElementById("commande").style.display = "none"

/*expedition : function(){
	alert('On expedie le colis');
}

function impressionFacture(){
	alert('On imprime la facture');
	print();
}

function impressionBon(){
	alert('On imprime le bon de livraison');
	print();
}*/
alert("test1");

/*var Preparation = {
	//value : [],

	expedition : function(){
		alert('On expedie le colis');
	};

	affichePreparation : function(){
		JNTP.execute(["getExpedition", {"filter" : {"ID": 378}}], function(j){
			//displayListPreparation();
			alert("dans le jntp");
		};
	};
};
*/

var Preparation = {
	value : [],

	//construct
	RechercheAllExpeditions : function(){
		JNTP.execute(["getExpedition", {"filter" :{"ID": 378}}], function(j){
			if(j.body.length){
				this.value = j.body;
				displayListPreparation();
			}
			else{
				alertMsg("Aucune expedition prévue");
			}
		}//.bind(this));
};

/*var prep = new Preparation(123);
function value(){
	alert(Preparation);
}*/
	//JNTP.execute(["getExpedition", {"filter" : {"ID": 378}}], function(j){ })

	var Preparation = {
	value : [],
	RechercheAllExpeditions : function(){
	JNTP.execute(["getExpedition", {"filter" :{}}], function(j){
	if(j.body.length){
	this.value = j.body;
	InterfacePreparation.displayListPreparation();
	}
	else{
	InterfacePreparation.alertMsg("Aucune expedition prévu");
	}
	}.bind(this));
	},
	RechercheExpeditions : function(filtre){
	JNTP.execute(["getExpedition", {"filter" :{"expedition":filtre}}], function(j){
console.log(j);
	if(j.body.length)
	{
	this.value = j.body;
	displayListPreparation();
	}
	else
	{
	alert("Aucune expedition prévu");
	}
	}.bind(this));
	},
	setExpedition : function(IDdeLaCommande){
	JNTP.execute(["setExpedition", {"expedier" : IDdeLaCommande}], function(j){
	});
	},
	};

function value(){
var prep =  Preparation.RechercheExpeditions();
console.log(prep);
}
/*var val = prep.RechercheAllExpeditions(10);
function value(){
	alert("prep :");
	alert(prep);
	alert("allExp :");
	alert(val);
}*/

alert("test2");
