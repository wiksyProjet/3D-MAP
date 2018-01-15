document.getElementById("commande").style.visibility = "hidden"; //display : none;

/*var test = document.getElementById("commande");
alert(test);*/

function expedition(){
	alert('On expedie le colis');
}

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

$("#expeditio").click(function(){
	Facture.expedition();
})
//document.getElementById("commandeUn");
