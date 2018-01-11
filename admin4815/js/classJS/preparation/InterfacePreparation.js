alert("interfprep");
//document.getElementById("commande").style.visibility = "hidden"; //display : none;

/*unction afficheCommandes(){
  //console.log("Dans la fonction affiche commande");
  alert(Preparation.RechercheExpeditions());
  //alert(document.getElementById("panels-8").innerHTML);
}*/

var test = ["Naruto","Sasuke","Kakashi","Obito"];

var InterfacePreparation = {

    afficheCommandes : function(data){

    for(var com in data){

      var row = "<tr><td>"+data[com].refCommande+"</td>";
      row += "<td>"+data[com].livraison.nom+" "+data[com].livraison.prenom+"</td>";
      row += "<td>"+data[com].livraison.adresse+"</td>";
      //document.getElementById("preparationCommandes").innerHTML += "<tr><td>"+data[com].refCommande+"</td>";
      //document.getElementById("preparationCommandes").innerHTML += "<td>"+data[com].livraison.nom+" "+data[com].livraison.prenom+"</td>";
      //document.getElementById("preparationCommandes").innerHTML += "<td>"+data[com].livraison.adresse+"</td>";

      var prixTotal = 0;
      for(prod in data[com].commande){
        prixTotal +=parseFloat(data[com].commande[prod].prixTTC);
        //console.log(data[com].ID +"  "+data[com].commande[prod].ref+"  "+prixTotal);
      }
      row += "<td>"+prixTotal.toFixed(2)+"</td></tr>";
      //document.getElementById("preparationCommandes").innerHTML += "<td>"+prixTotal+"</td></tr>";
      document.getElementById("preparationCommandes").innerHTML += row;
    }

  }

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
