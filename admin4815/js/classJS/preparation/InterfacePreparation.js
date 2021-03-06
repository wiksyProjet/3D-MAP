
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

      var order = "<tr><td id ='"+data[com].ID+"' class='cadreCommande' colspan=4><span id = 'numCommande'>"+data[com].ID+"</span></br>";

      for(i in refs){
        order += "<div class='produitCommande'><img src='"+refs[i]+".jpg' alt='photo carte' width='300px' height='400px' style='padding-bottom:10px;'>";
        order += "<span style='font-size:20px;padding-left:10px;'> Réference : "+refs[i]+"</span>";
        order += "<span style='color:#DC143C;padding-left:10px;font-size:20px;'>(Quantite = "+qte[i]+")</span>";
        order +="<img style='padding-left:20px;' src='img/loader_2.gif' alt='logo encours' width='130px' height='130px' /></div>";
        }
      order += "<span><button class='boutonsCommande' id='boutonExpedition'><img src='img/expedition.png' alt='logo expedition' width='40px' height='20px+' />Expédier</button>";
      order += "<button class='boutonsCommande' id='boutonFacture'><img src='img/impression.png' alt='logo impression' width='30px' height='20px' />Imprimer facture</button>"
      order += "<button class='boutonsCommande' id='boutonBon'><img src='img/impression.png' alt='logo impression' width='30px' height='20px' />Imprimer bon de livraison</button>"
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

      var order = "<tr><td id ='"+data[com].ID+"' class='cadreCommande' colspan=4><span id = 'numCommande'></span></br>";

      for(i in refs){
        order += "<div class='produitCommande'><img src='"+refs[i]+".jpg' alt='photo carte' width='300px' height='400px' style='padding-bottom:10px;'>";
        order += "<span style='font-size:20px;padding-left:50px;'> Réference : "+refs[i]+"</span>";
        order += "<span style='color:#DC143C;padding-left:50px;'>(Quantite = "+qte[i]+")</span></div>";
      }
      order += "<span><button class='boutonsCommande' id='boutonExpedition'><img src='img/expedition.png' alt='logo expedition' width='40px' height='20px+' />Expédier</button>";
      order += "<button class='boutonsCommande' id='boutonFacture'><img src='img/impression.png' alt='logo impression' width='30px' height='20px' />Imprimer facture</button>"
      order += "<button class='boutonsCommande' id='boutonBon'><img src='img/impression.png' alt='logo impression' width='30px' height='20px' />Imprimer bon de livraison</button>"
      order += "</span></td></tr>";

      document.getElementById("preparationCommandes").innerHTML += order;

  },

  alertMessage : function(msg) {

    document.getElementById("panels-8").innerHTML += "<p>"+msg+"</p>";
    var message = document.querySelector("#panels-8 > p");
    message.setAttribute("id","alert");

  },

  effaceCommande : function(data){

  }

};
