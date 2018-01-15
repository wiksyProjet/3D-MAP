var InterfaceFacture = {
	modif : true,
	ordreTri : true,

	tri : function(col){

		if(col=="montant"){
			Facture.list.sort(function (a, b) {
				if(this.ordreTri){
					return a.paiement.prixHT - b.paiement.prixHT > 0;
				}
				else{
					return a.paiement.prixHT - b.paiement.prixHT < 0;
				}
			}.bind(this));
		}

		if(col=="numFacture"){
			Facture.list.sort(function (a, b) {
				if(this.ordreTri)
					return a.refFacture.localeCompare(b.refFacture);	
				else	
					return b.refFacture.localeCompare(a.refFacture);	
			}.bind(this));
		}

		if(col=="nomClient"){
			Facture.list.sort(function (a, b) {
				if(this.ordreTri)
					return a.client.entreprise.localeCompare(b.client.entreprise);
				else
					return b.client.entreprise.localeCompare(a.client.entreprise);
			}.bind(this));
		}

		if(col=="livraison"){
			Facture.list.sort(function (a, b) {
				if(this.ordreTri)
					return a.livraison.recept;
				else
					return !a.livraison.recept;
			}.bind(this));
		}

		if(col=="paiement"){
			Facture.list.sort(function (a, b) {
				if(this.ordreTri)
					return a.paiement.paye;
				else
					return !a.paiement.paye;
			}.bind(this));
		}

		if(col=="dateEcheance"){
			Facture.list.sort(function (a, b) {

				if(this.ordreTri){
					return a.paiement.datePaiement.localeCompare(b.paiement.datePaiement);
				}
				else{
					return b.paiement.datePaiement.localeCompare(a.paiement.datePaiement);
				}
			}.bind(this));
		}

		if(col=="dateFacture"){
			//true = swap
			//false = rien
			Facture.list.sort(function (a, b) {
				var first = "";
				var second = "";
				if(a.dateFacture)
					fist = a.dateFacture;
				if(b.dateFacture)
					second = b.dateFacture;
				console.log("?", first,second);
				if(this.ordreTri){
					return first.localeCompare(second);
				}
				else{
					return second.localeCompare(first);
				}
			}.bind(this));
		}

		$(".ligne").remove();
		this.displayListFacture();

		this.ordreTri = !this.ordreTri;
	},

	resetForm : function(){
		$("#expeditionColis").fadeOut("slow");
		$("#deleteFacture").prop("disabled", true);
		Client.value = {};
		$(".lineProduct").remove();
		$(".reduction").remove();
		$(".frais").remove();
		$("#prixHT").val(0);
		$("#tva").val(0);


		Facture.value = [];
		this.displayListProduct();
		this.initPile();

		$("#livraison").find("input").each(function(elem){
			$(this).val("");
		});

		$("#total").find("input").each(function(elem){
			$(this).val("");
		});

		$(".result").find(".containResult").each(function(elem){
			$(this).remove();
		});

		$("#delai").val("30 jours");
		$("#datePaiement").val("");
		$("#moyenPaiement").val("cheque");
		$("#commentairePaiement").val("");
		$("#commentaireLivraison").val("");
		$("#etatLivraison").prop('checked', false);

		$("#valueRecherche").val("");

		var t = new Date().getTime();
		t += (parseInt(30 * 24 * 3600 * 1000));
		var date = new Date(t);

		$("#dateCommande").val(new Date().toISOString().split('T')[0]);

		this.alterLineColor();
		$(".selected").removeClass("selected");
	},

	resetFacture :  function(){
		$(".ligne").remove();
		Facture.getThread( {}, function(j){
			InterfaceFacture.displayListFacture();
			$('.ligne').off("click").click(function() {
				var ID = parseInt($(this).find(".numFacture").find(".cell").attr("data-id"));
				pointer = $(this);
				Facture.get({"ID":ID}, function(){
					$("#deleteFacture").prop("disabled", false);
					InterfaceFacture.modif = true;
					InterfaceFacture.factureToForm();
					InterfaceFacture.clientToForm();
					$("#validation").text("Mettre à jour la commande");
				})
				$("#btnFacture").show();
			});
		});

		this.resetForm();
	},

	totalFacture : function(){
		var sommePrixHT = 0;
		var sommeTVA = 0;

		/*ON BOUCLE SUR LES PRODUITS*/
		$(".lineProduct").each(function(line){
			var prix = parseFloat($(this).find(".prix").val());
			var quantite = parseInt($(this).find(".quantite").val());
			var taux_tva = parseFloat($(this).find(".refProduct option:selected").attr("data-tva"));
			///console.log(prix, quantite, tva);
			if(!isNaN(prix) && !isNaN(quantite) && !isNaN(taux_tva)){
				sommePrixHT += (prix*quantite);
				sommeTVA += ((prix * taux_tva / 100) *quantite);
			}
		});


		/*ON BOUCLE SUR LES REDUCTIONS*/
		$(".reduction").each(function(line){
			var montant = parseFloat($(this).find(".montant").val());
			if(!isNaN(montant)){
				sommePrixHT -= montant;
				sommeTVA -= montant * 20 / 100;
			}
		});

		/*ON BOUCLE SUR LES FRAIS*/
		$(".frais").each(function(line){
			var montant = parseFloat($(this).find(".montant").val());
			if(!isNaN(montant)){
				sommePrixHT += montant;
				sommeTVA += montant * 20 / 100;

			}
		});

		$("#prixTTC").val(	(sommePrixHT + sommeTVA).toFixed(2) );
		$("#prixHT").val(sommePrixHT.toFixed(2));
		$("#tva").val(sommeTVA.toFixed(2));
	},

	/*
	* 	Ajout d'une couleur : une ligne sur deux dans la liste des factures.
	*/
	alterLineColor: function(){
		$(".ligne").each(function(i) {
			if(i%2) {
				$(this).css("background-color", "#daf3f9");
			}
		})
	},

	factureToForm : function() {
		Product.get({}, function(){
			InterfaceFacture.fillCommande();
			InterfaceFacture.fillPaiement();
			InterfaceFacture.fillLivraison();
			InterfaceFacture.totalFacture();
		});
		if(Facture.value.refFacture.length > 0){
			$("#btnFacture").hide();
			$("#numFacture").show().val(Facture.value.refFacture);
			$("#dateFacture").show();
			$("#dateFacture").val(Facture.value.dateFacture);
		}
		else{
			$("#dateFacture").val("");
			$("#numFacture").hide();
			$("#btnFacture").show();
		}

		$("#numComm").val(Facture.value.refCommande);
		$("#dateCommande").val(Facture.value.dateCommande);

		if(!Facture.value.livraison.recept){
			if(Facture.value.expedition){
				$("#expeditionColis").fadeIn("slow").css("background-color", "rgb(255, 78, 78)").text("Annuler l'expédition");
			}else{
				$("#expeditionColis").fadeIn("slow").text("A expédier").css("background-color", "white");
			}
		}else{
			$("#expeditionColis").fadeOut("slow");
		}
	},

	/*
	* 	Suppresion de la ligne product avec vérification
	*/
	deleteProduct : function(obj){
		if($(".lineProduct").length > 1){
			$("#"+$(obj).attr('data-id')).remove();
		}else{
			$('#dialog-content').html( "Impossible de supprimer" );
			$( "#dialog" ).dialog({
				active : true,
				autoOpen: true,
				width: 300,
			});
		}
	},

	/*
	* 	Suppression de la ligne frais/reduction avec vérifications
	*/
	deletePile : function(obj){
		$("."+$(obj).attr("class")).unbind("click");
		if($("."+$(obj).attr("data-type")).length > 1){
			$(obj).parent().parent().remove();
		}
		else{
			$('#dialog-content').html( "Vous ne pouvez supprimer cette pile" );
			$( "#dialog" ).dialog({
				active : true,
				autoOpen: true,
				width: 450,
			});
		}
	},

	/*
	* 	Rempli la liste des factures
	*/
	displayListFacture : function(callback) {
		Facture.list.forEach(function(facture, index){
			var factureID = "";

			var factureID;
			if(facture["refFacture"].length < 1){
				var factureID = '<span style="color : #ff8921">Non générée</span>';
			}
			else{
				factureID = facture["refFacture"];
			}

			var etat = '<span class="glyphicon glyphicon-remove"></span>';
			if(facture["paiement"]["datePaiement"])
				etat = '<span class="glyphicon glyphicon-ok"></span>';

			var etatLivraison = '<span class="glyphicon glyphicon-remove"></span>';
			if(facture["livraison"]["recept"])
				etatLivraison = '<span class="glyphicon glyphicon-ok"></span>';

			var dateFacture = '<span style="color : #FF6666" class="glyphicon glyphicon-remove"></span>';
			if(facture["dateFacture"])
				dateFacture = facture["dateFacture"];

			var dateEcheance = '<span style="color : #FF6666" class="glyphicon glyphicon-remove"></span>';
			if(facture["paiement"]["dateEcheance"])
				dateEcheance = facture["paiement"]["dateEcheance"];


			var client = (facture["paiement"]["moyenPaiement"] == "payline") ? facture["client"]["nom"] : facture["client"]["entreprise"];
			$("#list table").append(
				InterfaceFacture.cloneDOM('modelLine', {
					".numFacture" : '<div data-id="'+facture["ID"]+'" class="cell">' + factureID + '</div>',
					".nomPayeur" : '<div class="cell">' + client + "</div>",
					".prixFacture" :  '<div class="cell">' + facture["paiement"]["prixHT"]+"</div>",
					".dateFactureTD" : '<div class="cell">' + dateFacture +"</div>",
					".dateEcheanceTD" : '<div class="cell">' + dateEcheance +"</div>",
					".statutLivraison" :  '<div class="cell">' + etatLivraison +"</div>",
					".statut": '<div class="cell">'+etat+' </div>'
				})
			);
		});
		this.alterLineColor();
		if (callback) callback();
	},

	/*
	* 	Ajout d'une ligne product avec vérifications
	*/
	displayListProduct : function(){
		var doIt = true;
		$(".lineProduct").each(function(elem){
			var className = $(this).find(".refProduct").find("option:selected").hasClass("disable");
			var prix = $(this).find(".prix").val();
			var qt = $(this).find(".quantite").val();
			if( (!prix || !qt || prix==0 || qt==0 || className) && Facture.list.length > 0){
				$('#dialog-content').html( "Validez les produits" );
				$( "#dialog" ).dialog({
					active : true,
					autoOpen: true,
					width: 300,
				});
				doIt = false;
				return;
			}
		});

		if(doIt){
			
			Product.value.forEach(function(product){
				$("#modelProduct").find(".refProduct")
				.append('<option data-titre="'+product.titre+'" data-tva="'+product.tauxTVA+'" data-prix="'+product.prixPublic+'" value="'+product.ref+'">'+ product.ref + ' ' + product.titre + ' (' + product.dimension +  ')</option>');
			});
			//Pour modelProduct : 
			var uniqId = Math.round(new Date().getTime() + (Math.random() * 100));
			var copy = $("#modelProduct").clone().removeAttr('id').show().attr("id", uniqId).attr("class", "lineProduct");
			$(copy).find("select").attr('data-id', uniqId);
			$(copy).find(".quantite").attr('id', "qt-"+uniqId);
			$(copy).find(".prix").attr('id', "prix-"+uniqId);
			$(copy).find(".deleteProduct").attr('data-id', uniqId);
			$("#listeProduct").append(copy);

			//Réinitialise le model produit : 
			$("#modelProduct").find(".refProduct").empty();
			$("#modelProduct").find(".refProduct").append('<option class="disable"> Sélectionner un produit</option>');
		}

	},

	fillCommande : function(){

		$(".lineProduct").remove();
		$(".reduction").remove();
		$(".frais").remove();

		Facture.value.commande.forEach(function(produit){
			Product.value.forEach(function(product){
				$("#modelProduct").find(".refProduct")
				.append('<option data-titre="'+product.titre+'" data-tva="'+product.tauxTVA+'" data-prix="'+product.prixPublic+'" value="'+product.ref+'">'+ product.ref + ' ' + product.titre + ' (' + product.dimension +  ')</option>');
			});

			//Pour modelProduct : 
			var uniqId = Math.round(new Date().getTime() + (Math.random() * 100));
			var copy = $("#modelProduct").clone().removeAttr('id').show().attr("id", uniqId).attr("class", "lineProduct");
			//Affectation du val() du select
			$(copy).find("select").attr('data-id', uniqId).val(produit["ref"]);
			$(copy).find(".quantite").attr('id', "qt-"+uniqId).val(produit["quantite"]);
			$(copy).find(".prix").attr('id', "prix-"+uniqId).val(produit["prix"]);
			$(copy).find(".deleteProduct").attr('data-id', uniqId);
			$("#listeProduct").append(copy);

			//Réinitialise le model produit : 
			$("#modelProduct").find(".refProduct").empty();
			$("#modelProduct").find(".refProduct").append('<option class="disable"> Sélectionner un produit</option>');
		});

		if(Facture.value.paiement.reduction.length > 0){
			Facture.value.paiement.reduction.forEach(function(reduction){
				var uniqId = Math.round(new Date().getTime() + (Math.random() * 100));
				var copy = $("#modelReduc").clone().removeAttr('id').addClass("reduction").show();
				$(copy).find("select").attr("data-id", "reduc-"+uniqId).val(reduction["type"]);
				$(copy).find(".montant").addClass("reduc-"+uniqId).val(reduction["montant"]);
				$(copy).find(".commentaire").val(reduction["comment"]);
				$("#listeReduc").append(copy);
			});
		}
		else{
			var uniqId = Math.round(new Date().getTime() + (Math.random() * 100));
			copy = $("#modelReduc").clone().removeAttr('id').addClass("reduction").show();
			$(copy).find("select").attr("data-id", "reduc-"+uniqId);
			$(copy).find(".montant").addClass("reduc-"+uniqId);
			$("#modelReduc").removeAttr("class");
			$("#listeReduc").append(copy);
		}

		if(Facture.value.paiement.frais.length > 0){
			Facture.value.paiement.frais.forEach(function(frais){
				var uniqId = Math.round(new Date().getTime() + (Math.random() * 100));
				var copy = $("#modelFrais").clone().removeAttr('id').addClass("frais").show();
				$(copy).find("select").attr("data-id", "frais-"+uniqId).val(frais["type"]);
				$(copy).find(".montant").addClass("frais-"+uniqId).val(frais["montant"]);
				$(copy).find(".commentaire").val(frais["comment"]);
				$("#listeFrais").append(copy);
			});
		}
		else{
			var uniqId = Math.round(new Date().getTime() + (Math.random() * 100));
			copy = $("#modelFrais").clone().removeAttr('id').addClass("frais").show();
			$(copy).find("select").attr("data-id", "frais-"+uniqId);
			$(copy).find(".montant").addClass("frais-"+uniqId);
			$("#modelFrais").removeAttr("class");
			$("#listeFrais").append(copy);
		}
	},

	clientToForm : function(){
		if(Facture.value.paiement.moyenPaiement != "payline"){
			$(document).on("mouseenter", ".containResult", function(){
				$(this).css("cursor", "default");
			});
			Client.setValue(Facture.value.client.ID);
			$(".result").empty();
			$(".result").append(
				'<div class="containResult" data-id="'+Facture.value.client.ID+'">'+
					'<div class="rowResult">'+
						'<label>ID_Client : </label>'+
						'<div class="valueResult">'+Facture.value.client.ID+'</div>'+
					'</div>'+
					'<div class="rowResult">'+
						'<label>Nom : </label>'+
						'<div class="valueResult">'+Client.value.general.entreprise +'</div>'+
					'</div>'+
					'<div class="rowResult">'+
						'<label>commentaire : </label>'+
						'<div class="valueResult">'+Client.value["general"]["commentaire"]+'</div>'+
					'</div>'+
					'<div class="rowResult">'+
						'<label>email : </label>'+
						'<div class="valueResult">'+Client.value["general"]["email"]+'</div>'+
					'</div>'+
					'<div class="rowResult">'+
						'<label>Téléphone : </label>'+
						'<div class="valueResult">'+Client.value["general"]["tel"]+'</div>'+
					'</div>'+
					'<div class="rowResult">'+
						'<label>Adresse : </label>'+ 
						'<div class="valueResult">'+ Client.value["general"]["adresse"] + ' ' + Client.value["general"]["codePostal"] + ' ' + Client.value["general"]["ville"] + '</div>'+
					'</div>'+
				'</div>'
			);
		}
	},

	deleteNonSelectClient : function(){
		Facture.updateValue();
		$(".containResult").remove();
		this.clientToForm();
		$(".containResult").css("border", "2px solid green");
		$(".containResult").find(".containInteraction").remove();
	},

	fillPaiement : function(){
		$("#delai").val(Facture.value.paiement.delaiPaiement);
		$("#datePaiement").val(Facture.value.paiement.datePaiement);
		if(Facture.value.paiement.dateEcheance){
			$("#dateEcheance").val(Facture.value.paiement.dateEcheance);
		}
		$("#moyenPaiement").val(Facture.value.paiement.moyenPaiement);
		$("#commentairePaiement").val(Facture.value.paiement.comment);
	},


	fillLivraison : function(){
		if(Facture.value.paiement.moyenPaiement == "payline")
		{
			$("#dateLivraison").val(Facture.value.livraison.dateExpedition);
			$("#suivi").val(Facture.value.livraison.suivi);
			$("#etatLivraison").prop('checked', Facture.value.livraison.recept);
			$("#commentaireLivraison").val(Facture.value.livraison.comment);

			$("#livraisonNom").val(Facture.value.livraison.nom);
			$("#livraisonAdresse").val(Facture.value.livraison.adresse);
			$("#livraisonCP").val(Facture.value.livraison.codePostal);
			$("#livraisonVille").val(Facture.value.livraison.ville);

			$("#contactNom").val(Facture.value.livraison.contact.nom);
			$("#contactMail").val(Facture.value.livraison.contact.email);
			$("#contactTel").val(Facture.value.livraison.contact.tel);

			$("#etatLivraison").prop("checked", Facture.value.livraison.recept);
			$("#suivi").val(Facture.value.livraison.suivi);
			$("#dateLivraison").val(Facture.value.livraison.dateExpedition);
		}
		else
		{
			$("#dateLivraison").val(Facture.value.livraison.dateExpedition);
			$("#suivi").val(Facture.value.livraison.suivi);
			$("#etatLivraison").prop('checked', Facture.value.livraison.recept);

			$("#commentaireLivraison").val(Facture.value.livraison.comment);
		}
	},

	/*
	*	Remplit le json avec la facture.
	*/
	fillSource : function(){
		Facture.updateValue();
		$('#dialog-content').jsonViewer( Facture.value );
		$( "#dialog" ).dialog({
			active : true,
			autoOpen: true,
			width: "85%",
			show: {
				effect: "fadeIn",
				duration: 650
			},
			hide: {
				effect: "fadeOut",
				duration: 650
			}
		});

	},

	/*
	*	Copy d'un élément du dom et la renvoie
	*/
	cloneDOM : function(modelID, json){
		var content = $("#"+modelID).clone().removeAttr('id').addClass("ligne").show();
		for (key in json) {
			$(content).find( key ).html( json[key] );
		}
		return content;
	},

	addPile : function(obj){
		var doIt = true;

		$("."+$(obj).attr("data-class")).each(function(elem){
			var montant = $(this).find(".montant").val();
		
			if(!montant){
				$('#dialog-content').html( "Champs montant manquant" );
				$( "#dialog" ).dialog({
					active : true,
					autoOpen: true,
					width: 300,
				});
				doIt = false;
				return;
			}
		});

		if(doIt){
			var uniqId = Math.round(new Date().getTime() + (Math.random() * 100));
			var copy = $("#" + $(obj).attr("data-model")).clone().removeAttr('id').addClass($(obj).attr("data-class")).show();
			$(copy).find("select").attr("data-id",  $(obj).attr("data-class")+"-"+uniqId);
			$(copy).find(".montant").addClass($(obj).attr("data-class")+"-"+uniqId);
			$("#"+$(obj).attr("data-model")).removeAttr("class");
			$("#"+$(obj).attr("data-list")).append(copy);
		}
	},

	initPile : function(){
		var uniqId = Math.round(new Date().getTime() + (Math.random() * 100));
		copy = $("#modelFrais").clone().removeAttr('id').addClass("frais").show();
		$(copy).find("select").attr("data-id", "frais-"+uniqId);
		$(copy).find(".montant").addClass("frais-"+uniqId);
		$("#modelFrais").removeAttr("class");
		$("#listeFrais").append(copy);

		var copy = $("#modelReduc").clone().removeAttr('id').addClass("reduction").show();
		$(copy).find("select").attr("data-id", "reduc-"+uniqId);
		$(copy).find(".montant").addClass("reduc-"+uniqId);
		$("#modelReduc").removeAttr("class");
		$("#listeReduc").append(copy);
	},

	editFacture : function(dataType){
		JNTP.execute(["crypt", {"data" : Facture.value.ID}], function(j){
			window.open(publicSite+'?page=facture&ID='+encodeURIComponent(j.body),'_blank');
		});
	}
};