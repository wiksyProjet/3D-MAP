0//alert("interfprep");
//document.getElementById("commande").style.visibility = "hidden"; //display : none;

/*unction afficheCommandes(){
  //console.log("Dans la fonction affiche commande");
  alert(Preparation.RechercheExpeditions());
  //alert(document.getElementById("panels-8").innerHTML);
}*/

//var test = ["Naruto","Sasuke","Kakashi","Obito"];

var InterfacePreparation = {

    afficheAllCommandes : function(data){

    for(var com in data){

      var row = "<tr class = 'ligCommande'><td>"+data[com].refCommande+"</td>";
      row += "<td>"+data[com].livraison.nom+" "+data[com].livraison.prenom+"</td>";
      row += "<td>"+data[com].livraison.adresse+"</td>";
      //document.getElementById("preparationCommandes").innerHTML += "<tr><td>"+data[com].refCommande+"</td>";
      //document.getElementById("preparationCommandes").innerHTML += "<td>"+data[com].livraison.nom+" "+data[com].livraison.prenom+"</td>";
      //document.getElementById("preparationCommandes").innerHTML += "<td>"+data[com].livraison.adresse+"</td>";

      var prixTotal = 0;
      var refs = [];  //maps et qté sont des variables pour la suite (le cadre avec l'image)
      var qte = [];   //ca évite de parcourir de nouveau pour récupérer les infos
      for(prod in data[com].commande){
        prixTotal +=parseFloat(data[com].commande[prod].prixTTC);
        refs.push(data[com].commande[prod].ref);
        qte.push(data[com].commande[prod].quantite);
        //console.log(data[com].ID +"  "+data[com].commande[prod].ref+"  "+prixTotal);
      }
      row += "<td>"+prixTotal.toFixed(2)+"</td></tr>";
      //document.getElementById("preparationCommandes").innerHTML += "<td>"+prixTotal+"</td></tr>";
      document.getElementById("preparationCommandes").innerHTML += row;

      var order = "<tr><td id='cadreCommande' colspan=4><span id = 'numCommande'>"+data[com].ID+"</span></br>";

      for(i in refs){
        order += "<div class='produitCommande'><img src='"+refs[i]+".jpg' alt='photo carte' width='110' height='200'>";
        order += "<span> Réference : "+refs[i]+"</span>";
        order += "<span> (X "+qte[i]+")</span></div>";
      }
      order += "</td></tr>";

      document.getElementById("preparationCommandes").innerHTML += order;

    }

    //var ligs = document.querySelector("#preparationCommandes > td");
    //ligs.setAttribute("class","ligCommande");
    //alert(document.getElementsByClassName("ligCommande"));

  },

  afficheCommande : function(data) {

      var row = "<tr class = 'ligCommande'><td>"+data[0].refCommande+"</td>";
      row += "<td>"+data[0].livraison.nom+" "+data[0].livraison.prenom+"</td>";
      row += "<td>"+data[0].livraison.adresse+"</td>";

      var prixTotal = 0;
      for(prod in data[0].commande){
        prixTotal +=parseFloat(data[0].commande[prod].prixTTC);
      }
      row += "<td>"+prixTotal.toFixed(2)+"</td></tr>";

      document.getElementById("preparationCommandes").innerHTML += row;


    /*var ligs = document.querySelector("#preparationCommandes > table > td");
    ligs.setAttribute("class","ligCommande");
    alert(document.getElementsByClassName("ligCommande"));*/

},

  alertMessage : function(msg) {
    //alert(msg);
    document.getElementById("panels-8").innerHTML += "<p>"+msg+"</p>";
    var message = document.querySelector("#panels-8 > p");
    message.setAttribute("id","alert");
  }

};



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
