var Facture = {
	value : [],
	list : {},
	error : [],

	construct : function(){},

	setFacture : function(bool){
		alert("On entre dans la fonction");
		if($(".selected").parent().find(".nomPayeur").find(".cell").text() == "payline"){
			if(!InterfaceFacture.modif){
				alert("bug, on est pas censé pouvoir être ici...");
			}
			else{
				var dataLivraison = {
					"nom" : $("#livraisonNom").val(),
					"adresse" : $("#livraisonAdresse").val(),
					"codePostal" : $("#livraisonCP").val(),
					"ville" : $("#livraisonVille").val(),
					"contact": {
						"nom" : $("#contactNom").val(),
						"tel" : $("#contactTel").val(),
						"email" : $("#contactMail").val()
					},
					"dateExpedition" : $("#dateLivraison").val(),
					"suivi" : $("#suivi").val(),
					"recept" : $("#etatLivraison").is(":checked"),
					"comment" : $("#commentaireLivraison").val()
				};

				this.value.livraison = dataLivraison;
				
				JNTP.execute(["setFacture", {"update" : this.value, "isFacture" : bool}], function(j){
					$('#dialog-content').html( j.info );
					$( "#dialog" ).dialog({
						active : true,
						autoOpen: true,
						width: 500,
					});
					InterfaceFacture.resetFacture();
				});
			}
		}
		else{
			this.error = [];
			this.updateValue();

			if(this.value.refFacture.length > 0 && bool){
				$('#dialog-content').html( "Facture déjà générée" );
				$( "#dialog" ).dialog({
					active : true,
					autoOpen: true,
					width: 500,
				});
			}
			else{
				if(!this.isCorrectCommande(bool)){
					$('#dialog-content').html( this.getError() );
					$( "#dialog" ).dialog({
						active : true,
						autoOpen: true,
						width: 500,
					});
				}else{
					if(InterfaceFacture.modif){
						JNTP.execute(["setFacture", {"update" : this.value, "isFacture" : bool}], function(j){
							$('#dialog-content').html( j.info );
							$( "#dialog" ).dialog({
								active : true,
								autoOpen: true,
								width: 500,
							});
							InterfaceFacture.resetFacture();
						});
					}
					else{
						JNTP.execute(["setFacture", {"new" : this.value, "isFacture" : bool}], function(j){
							$('#dialog-content').html( j.info );
							$( "#dialog" ).dialog({
								active : true,
								autoOpen: true,
								width: 500,
							});
							InterfaceFacture.resetFacture();
						});
					}
				}
			}
		}
	},
	//DIALOG -> INTERFACE
	deleteFacture : function(id){
		if(id > 0 ){
			JNTP.execute(["delete", {"collection":"facture", "ID":parseInt(id)}], function(e){
				$('#dialog-content').html( e.info );
				$( "#dialog" ).dialog({
					active : true,
					autoOpen: true,
					width: 500,
				});
				$("#dialog-confirm-Delete").dialog( "close" );
				InterfaceFacture.resetFacture();
			});
		}
		else{
			$('#dialog-content').html( "Erreur dans la sélection de la commande" );
			$( "#dialog" ).dialog({
				active : true,
				autoOpen: true,
				width: 500,
			});
			$("#dialog-confirm-Delete").dialog( "close" );
		}
	},

	getError : function(){
		var s = "";

		this.error.forEach(function(elem){
			s += elem.erreur + "\n";
		});

		return s;
	},

	isCorrectCommande : function(bool){
		var correct = true;
		if(!this.value.hasOwnProperty("refCommande")){
			this.error.push(
				{
					"erreur" : "refCommande vide"
				}
			);
			correct = false;
		}

		if(!this.value.hasOwnProperty("commande")){
			this.error.push(
				{
					"erreur" : "Pas de produit"
				}
			);
			correct = false;
		}
		else{
			if(this.value.commande.length < 1){
				this.error.push(
					{
						"erreur" : "Pas de produit"
					}
				);
				correct = false;
			}
			else{
				this.value.commande.forEach(function(element){
					if(isNaN(element.prix) || isNaN(element.quantite)){
						this.error.push(
							{
								"erreur" : "Problème de quantite ou prix sur un produit"
							}
						);
						correct = false;
					}
				}.bind(this));
			}
		}

		if(!this.value.hasOwnProperty("paiement")){
			this.error.push(
				{
					"erreur" : "Pas d'objet paiement dans la source"
				}
			);
				correct = false;
		}else{
			if(bool){
				if(!this.value.paiement.hasOwnProperty("dateEcheance")){
					this.error.push(
						{
							"erreur" : "Pas de dateEcheance saisie"	
						}
					);
					correct = false;
				}
				else{
					if(this.value.paiement.dateEcheance.length == 0){
						this.error.push(
							{
								"erreur" : "Date de paiement non saisie"
							}
						);

						correct = false;
					}
				}
			}

			if(this.value.paiement.hasOwnProperty("frais")){
				this.value.paiement.frais.forEach(function(elem){
					if(isNaN(elem.montant)){
						this.erreur.push(
							{
								"erreur" : "Problème sur le montant d'un frais"
							}
						);
						correct  = false;
					}
				}.bind(this));
			}

			if(this.value.paiement.hasOwnProperty("reduction")){
				this.value.paiement.reduction.forEach(function(elem){
					if(isNaN(elem.montant)){
						this.erreur.push(
							{
								"erreur" : "Problème sur le montant d'une reduction"
							}
						);
						correct = false;
					}
				});
			}

		}

		if(!this.value.hasOwnProperty("client")){
			this.erreur.push(
				{
					"erreur" : "Pas d'objet client dans la source"
				}
			);
			correct = false;
		}else{
			if(!this.value.client.hasOwnProperty("ID")){
				this.error.push(
					{
						"erreur" : "Pas de client sélectionné"
					}
				);
				correct = false;
			}
			else{
				if(isNaN(this.value.client.ID)){
					this.error.push(
						{
							"erreur" : "Pas de client sélectionné"
						}
					);
					correct = false;
				}
			}
		}

		return correct;
	},

	getThread : function(filter, callback) {
		JNTP.execute(["get", {"filter" : filter, "collection" : "facture"}], function(j){
			this.list = j.body;
			if (callback) callback(j);
		}.bind(this));
	},

	get : function(filter, callback) {
		JNTP.execute(["get", {"filter" : filter, "collection" : "facture"}], function(j){
			this.value = j.body[0];
			if (callback) callback(j);
		}.bind(this));
	},

	updateValue : function(){
		InterfaceFacture.totalFacture();
		//On met à jour les commandes : 
		var nFacture = "";
		var nCommande = "";
		var ID = "";

		

		if(InterfaceFacture.modif){
			ID = this.value.ID;
			nFacture = this.value.refFacture;
			nCommande = this.value.refCommande;
		}
		//Préfixe-Commercial : RA {champs préfixe facture} PPAAAAMMJJ0001
		this.value = {
			"refFacture" : nFacture,
			"refCommande" : nCommande,
			"client" : {},
			"commande" : [],
			"paiement" : {
				"reduction" : [],
				"frais" : []
			},
			"livraison" : {},
			"ID" : ID
		};

		if(Client.value.general){
			this.value.client = Client.value.general;
		}
		if(Client.value.ID){
			this.value.client.ID = Client.value.ID;
		}
		this.value.dateCommande  = $("#dateCommande").val();
		
		$(".lineProduct").each(function(index, line){
			this.value.commande.push(
				{
					"ref" : $(line).find(".refProduct option:selected").val(),
					"prix" : parseFloat($(line).find(".prix").val()),
					"quantite" : parseInt($(line).find(".quantite").val()),
					"tva" : parseFloat($(line).find(".refProduct option:selected").attr("data-tva")),
					"titre" : $(line).find(".refProduct option:selected").attr("data-titre")
				}
			);
		}.bind(this));

		
		$(".reduction").each(function(index, elemReduction){
			if(!isNaN(parseFloat($(elemReduction).find(".montant").val()))){
				this.value.paiement.reduction.push(
					{
						"type" : $(elemReduction).find(".typeReduc option:selected").val(),
						"montant" : parseFloat($(elemReduction).find(".montant").val()),
						"comment" : $(elemReduction).find(".commentaire").val()
					}
				);
			}
		}.bind(this));

		
		this.value.paiement.frais = [];
		if(!this.value.paiement.hasOwnProperty("frais")){
			this.value.paiement["frais"] = [];
		}

		$(".frais").each(function(line, elemFrais){
			if(!isNaN(parseFloat($(elemFrais).find(".montant").val()))){
				this.value.paiement.frais.push(
					{
						"type" : $(elemFrais).find(".typeFrais option:selected").val(),
						"montant" : parseFloat($(elemFrais).find(".montant").val()),
						"comment" : $(elemFrais).find(".commentaire").val()
					}
				);
			}
		}.bind(this));

		this.value.paiement.prixHT = parseFloat($("#prixHT").val());
		this.value.paiement.TVA = parseFloat($("#tva").val());
		this.value.paiement.prixTTC = parseFloat($("#prixTTC").val());
		this.value.paiement.delaiPaiement = $("#delai").val();
		this.value.paiement.dateEcheance = $("#dateEcheance").val();
		this.value.paiement.datePaiement = $("#datePaiement").val();
		this.value.paiement.moyenPaiement = $("#moyenPaiement").val();
		this.value.paiement.comment = $("#commentairePaiement").val();

		var dataLivraison = {
			"nom" : $("#livraisonNom").val(),
			"adresse" : $("#livraisonAdresse").val(),
			"codePostal" : $("#livraisonCP").val(),
			"ville" : $("#livraisonVille").val(),
			"contact": {
				"nom" : $("#contactNom").val(),
				"tel" : $("#contactTel").val(),
				"email" : $("#contactMail").val()
			},
			"dateExpedition" : $("#dateLivraison").val(),
			"suivi" : $("#suivi").val(),
			"recept" : $("#etatLivraison").is(":checked"),
			"comment" : $("#commentaireLivraison").val()
		};

		this.value.livraison = dataLivraison;
	},

	expedition : function(){
		var bool = this.value.expedition;

		JNTP.execute(["setExpedition", {"expedition" : this.value.ID, "bool" : !bool}], function(j){
			InterfaceUser.alertMsg(j.info);
			InterfaceFacture.resetFacture();
		});
	}
};

