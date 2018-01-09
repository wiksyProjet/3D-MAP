var Recherche = {

	rechercheFacture : function(){
		var filter = {};
		if($("#factureClient").val().length > 0){
			filter["client.entreprise"] = {'$regex' : "^"+$("#factureClient").val(), '$options': 'i'};
		}

		if($("#factureCommande").val().length > 0){
			filter.refCommande = {'$regex' :  "^"+$("#factureCommande").val(), '$options': 'i'};
		}

		if($("#facturePaye").is(':checked')){
			filter["paiement.datePaiement"] = "";
		}

		if($("#factureLivre").is(':checked')){
			filter["livraison.recept"] = false;
		}

		if($("#factureFacturee").is(':checked')){
			filter.facture = "";
		}
		else{
			if($("#factureNumFacture").val().length > 0){
				filter.refFacture = {'$regex' : "^"+$("#factureNumFacture").val(), '$options': 'i'};
			}
		}

		if($("#searchMontant").val().length > 0){
			switch($("#typeMontant").val()){
				case "0" :
					 filter["paiement.prixHT"] = parseFloat($("#searchMontant").val());
					break;
				case "1" :
					filter["paiement.prixHT"] = {'$gt': parseFloat($("#searchMontant").val())};
					break;
				case "2" : 
					filter["paiement.prixHT"] = {'$lt': parseFloat($("#searchMontant").val())};
					break;
				default : 
					break;
			}
		}
		
		JNTP.execute(["get", {"collection" : "facture",  filter}], function(j){
			if(j.body.length){
				Facture.list = j.body;
				$(".ligne").remove();
				InterfaceFacture.displayListFacture();
				$('.ligne').off("click").click(function() {
					var ID = parseInt($(this).find(".numFacture").find(".cell").attr("data-id"));
					pointer = $(this);
					Facture.get({"ID":ID}, function(){
						$("#validation").prop({
						  disabled: true
						});
						$("#debloque").show();
						InterfaceFacture.modif = true;
						InterfaceFacture.colorLine(pointer);
						InterfaceFacture.factureToForm();
						InterfaceFacture.clientToForm();
						$("#validation").text("Mettre à jour la commande");
					})
					$("#btnFacture").show();
				});

				InterfaceFacture.resetForm();
			}
			else{
				$("#erreurRechercheFacture").slideDown("normal");
				setTimeout(function(){ 
					$("#erreurRechercheFacture").slideUp("normal");
				}, 2000);
			}
		});
	},

	rechercheClient : function(){
		var filter = {};
		if($("#clientRecherche").val().length > 0){
			filter["general.entreprise"] = {'$regex' : "^"+$("#clientRecherche").val(), '$options': 'i'};
		}

		if($("#cpRecherche").val().length > 0){
			filter["general.codePostal"] = {'$regex' : "^"+$("#cpRecherche").val(), '$options': 'i'};
		}

		if($("#villeRecherche").val().length > 0){
			filter["general.ville"] = {'$regex' : "^"+$("#villeRecherche").val(), '$options': 'i'};
		}

		JNTP.execute(["get", {"collection" : "client",  filter}], function(j){
			if(j.body.length){
				Client.list = j.body;
				$(".ligneClient").remove();
				InterfaceClient.displayListClient();
				$('.ligneClient').off("click").click(function() {
					initMap();
					InterfaceClient.modif = true;
					$("#deleteClient").prop("disabled", false);
					var ID = parseInt($(this).find(".nomClient").find(".cell").attr("data-id"));
					$(".selected").removeClass("selected");
					$(this).find("td").addClass("selected");
					Client.get({"ID" : ID}, function(){
						InterfaceClient.clientToForm();	
						$("#ValidationClient").text("Mettre à jour le client");
					});
				});
				InterfaceClient.reinitClient();
			}
			else{
				$("#erreurRechercheFacture").slideDown("normal");
				setTimeout(function(){ 
					$("#erreurRechercheFacture").slideUp("normal");
				}, 2000);
			}
		});
	},

	rechercheUser : function(){
		var filter = {};
		if($("#userRecherche").val().length > 0){
			filter["nom"] = {'$regex' : "^"+$("#userRecherche").val(), '$options': 'i'};
		}

		if($("#mailRecherche").val().length > 0){
			filter["email"] = {'$regex' : "^"+$("#mailRecherche").val(), '$options': 'i'};
		}

		if($("#privilege").val().length > 0){
			filter["privilege"] = {'$regex' : "^"+$("#privilege").val(), '$options': 'i'};
		}

		JNTP.execute(["get", {"collection" : "user",  filter}], function(j){
			if(j.body.length){
				User.list = j.body;
				$(".ligneUser").remove();
				InterfaceUser.displayListUser();
			}
			else{
				InterfaceUser.alertMsg("Aucun client trouvé");
			}
		});
	},

	rechercheMedia : function(){
		var filter = {};
		if($("#nomMediaRecherche").val().length > 0){
			filter["nom"] = {'$regex' : "^"+$("#nomMediaRecherche").val(), '$options': 'i'};
		}

		if($("#typeMediaRecherche").val().length > 0){
			filter["type"] = {'$regex' : "^"+$("#typeMediaRecherche").val(), '$options': 'i'};
		}

		if($("#tagMediaRecherche").val().length > 0){
			filter["tags"] = {'$in' : $("#tagMediaRecherche").val().split(",")};
		}

		JNTP.execute(["get", {"collection" : "media",  filter}], function(j){
			if(j.body.length){
				Media.list = j.body;
				$(".ligneMedia").remove();
				InterfaceMedia.displayListMedia();
			}
			else{
				InterfaceUser.alertMsg("Aucun média trouvé");
			}
		});
	},

	rechercheProduct : function(){
		var filter = {};
		$("#searchProduct").find("input").each(function(index, elem){
			if($(elem).val().length > 0){
				if($(elem).attr("name")=="prixPublic"){
					if($("#searchMontantProduct").val().length > 0){
						switch($("#typeMontantProduct").val()){
							case "0" :
								 filter[$(elem).attr("name")] = parseFloat($(elem).val());
								break;
							case "1" :
								filter[$(elem).attr("name")] = {'$gt': parseFloat($(elem).val())};
								break;
							case "2" : 
								filter[$(elem).attr("name")] = {'$lt': parseFloat($(elem).val())};
								break;
							default : 
								break;
						}
					}
				}
				else{
					filter[$(elem).attr("name")] = {'$regex' : "^"+$(elem).val(), '$options': 'i'};
				}
			}
		});

		console.log(filter);

		JNTP.execute(["get", {"collection" : "product",  filter}], function(j){
			if(j.body.length){
				Product.value = j.body;
				$(".ligneProduct").remove();
				InterfaceProduct.displayListProduct();
			}
			else{
				InterfaceUser.alertMsg("Aucun résultat");
			}
		});
	}
};