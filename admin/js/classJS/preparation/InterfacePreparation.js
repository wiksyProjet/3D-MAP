alert("interfprep");
//document.getElementById("commande").style.visibility = "hidden"; //display : none;

function afficheCommandes(){
  console.log(Preparation.donnees[1]);
}


/*var test = document.getElementById("commande");
alert(test);*/

/*JNTP.execute(["getExpedition", {"filter" : {"ID": 378}}], function(j){
	displayListPreparation();
})*/

/*var Preparation = {
value : [],
RechercheAllExpeditions : function(){
JNTP.execute(["getExpedition", {"filter" :{}}], function(j){
if(j.body.length){
this.value = j.body;

}
else{
alertMsg("Aucune expedition prévu");
}
}.bind(this));
}*/

/*function expedition(){
	alert('On expedie le colis');
}

expedition();

function impressionFacture(){
	alert('On imprime la facture');
	print();
}

function impressionBon(){
	alert('On imprime le bon de livraison');
}

function afficheCommande(nb){
  document.getElementById("commande").style.visibility = "visible"; //display : initial
  var commande = "commande"+nb;
  document.getElementById(commande).style.transitionDuration = "0.4s";
  document.getElementById(commande).style.backgroundColor = "#138fef";
  document.getElementById(commande).style.color = "white";
  document.getElementById(commande).style.fontWeight = "bold";
  //alert("Commande "+nb);
}

/*$("#expedition").click(function(){
	expedition();
})*/
//document.getElementById("commandeUn");
