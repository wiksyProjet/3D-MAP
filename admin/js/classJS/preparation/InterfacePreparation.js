document.getElementById("commande").style.visibility = "hidden";

/*var test = document.getElementById("commande");
alert(test);*/

function expedition(){
	alert('On expedie le colis');
}

function impressionFacture(){
	alert('On imprime la facture');
}

function impressionBon(){
	alert('On imprime le bon de livraison');
}

function afficheCommande(nb){
  document.getElementById("commande").style.visibility = "visible";
  var commande = "commande"+nb;
  document.getElementById(commande).style.transitionDuration = "0.4s";
  document.getElementById(commande).style.backgroundColor = "#138fef";
  //alert("Commande "+nb);
}
//document.getElementById("commandeUn");
