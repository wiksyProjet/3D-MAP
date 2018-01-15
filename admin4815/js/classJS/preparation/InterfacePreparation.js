
var InterfacePreparation = {

    afficheAllCommandes : function(data){

    for(var com in data){

      var row = "<tr class = 'ligCommande'><td>"+data[com].refCommande+"</td>";
      row += "<td>"+data[com].livraison.nom+" "+data[com].livraison.prenom+"</td>";
      row += "<td>"+data[com].livraison.adresse+"</td>";

      var prixTotal = 0;
      var refs = [];  //refs et qté sont des variables pour la suite (le cadre avec l'image)
      var qte = [];   //ca évite de parcourir de nouveau pour récupérer les infos

      for(prod in data[com].commande){
        prixTotal +=parseFloat(data[com].commande[prod].prixTTC);
        refs.push(data[com].commande[prod].ref);
        qte.push(data[com].commande[prod].quantite);
      }
      row += "<td>"+prixTotal.toFixed(2)+"</td></tr>";
      document.getElementById("preparationCommandes").innerHTML += row;

      var order = "<tr><td id='cadreCommande' colspan=4><span id = 'numCommande'>"+data[com].ID+"</span></br>";

      for(i in refs){
        order += "<div class='produitCommande'><img src='"+refs[i]+".jpg' alt='photo carte' width='110' height='200'>";
        order += "<span> Réference : "+refs[i]+"</span>";
        order += "<span> (X "+qte[i]+")</span></div>";
      }
      order += "<span><button class='boutonsCommande' id='boutonExpedition'>Expédier</button>";
      order += "<button class='boutonsCommande' id='boutonFacture'>Imprimer facture</button>"
      order += "<button class='boutonsCommande' id='boutonBon'>Imprimer bon de livraison</button>"
      order += "</span></td></tr>";

      document.getElementById("preparationCommandes").innerHTML += order;

    }
  },

  afficheCommande : function(data) {

      var row = "<tr class = 'ligCommande'><td>"+data.refCommande+"</td>";
      row += "<td>"+data.livraison.nom+" "+data.livraison.prenom+"</td>";
      row += "<td>"+data.livraison.adresse+"</td>";

      var prixTotal = 0;
      for(prod in data.commande){
        prixTotal +=parseFloat(data.commande[prod].prixTTC);
      }
      row += "<td>"+prixTotal.toFixed(2)+"</td></tr>";

      document.getElementById("preparationCommandes").innerHTML += row;

  },

  alertMessage : function(msg) {

    document.getElementById("panels-8").innerHTML += "<p>"+msg+"</p>";
    var message = document.querySelector("#panels-8 > p");
    message.setAttribute("id","alert");

  },

  effaceCommande : function(data){

  }

};
