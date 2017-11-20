var Client = {
	value : {},
	list : [],
	entrepriseTags : [],
	adresseTags : [],
	codePostalTags : [],
	villeTags : [],

	init : function(info){
		$(".ligneClient").remove();
		InterfaceClient.reinitClient();
		if(info)
			InterfaceClient.alertMsg(info);
		this.getThread({}, function(j){
			InterfaceClient.displayListClient();
			$('.ligneClient').off("click").click(function() {
				$("#deleteClient").prop("disabled", false);
				InterfaceClient.modif = true;
				var ID = parseInt($(this).find(".nomClient").find(".cell").attr("data-id"));
				$(".selected").removeClass("selected");
				$(this).find("td").addClass("selected");
				Client.get({"ID" : ID}, function(){
					InterfaceClient.clientToForm();	
					$("#ValidationClient").text("Mettre à jour le client");
				})
			});
		});
	},

	setClient : function(){
		this.formToJSON();
		if(!InterfaceClient.modif){
			JNTP.execute(["setClient", {"new" : this.value}], function(j){
				this.init(j.info);
			}.bind(this));
		}
		else{
			JNTP.execute(["setClient", {"update" : this.value}], function(j){
				this.init(j.info);
			}.bind(this));
		}
	},

	setCoordonnees : function(adresse){
		geocoder = new google.maps.Geocoder();
		geocoder.geocode( { 'address' : adresse}, function( results, status ) {
			if( status == google.maps.GeocoderStatus.OK ) {
				var varLat = results[0].geometry.location.lat().toFixed(4);
				var varLng = results[0].geometry.location.lng().toFixed(4);
				$("#coordonnees").val("[" + varLat + ", " + varLng + "]");
				$("#coordonnees").attr("data-lat", varLat).attr("data-lng", varLng);
				map.panTo(results[0].geometry.location);
				var marker = new google.maps.Marker({
					position: results[0].geometry.location,
					map: map,
					title: 'Localisation du client!',
					draggable: false,
					animation: google.maps.Animation.DROP,
				});
			} else {
				InterfaceClient.alertMsg("Veuillez ajouter une adresse" );
				$("#coordonnees").val("");
			}
		}.bind(this));
	},

	deleteClient : function(){
		if(InterfaceClient.modif){
			var ID = parseInt($(".selected").parent().find(".nomClient ").find(".cell").attr("data-id"));
			JNTP.execute( [ "delete", { "collection":"client", "ID": ID } ], function(e) {
				this.init(e.info);
				$("#dialog-confirm-deleteClient").dialog( "close" );
			}.bind(this));
		}
	},

	formToJSON : function(){
		var lng = isNaN($("#coordonnees").attr("data-lng")) ? "" : parseFloat($("#coordonnees").attr("data-lng"));
		var lat = isNaN($("#coordonnees").attr("data-lat")) ? "" : parseFloat($("#coordonnees").attr("data-lat"));
		if(this.value.hasOwnProperty("livraison")){
			$("#livraisonNom").val(this.value.livraison.entreprise);
			$("#livraisonAdresse").val(this.value.livraison.adresse);
			$("#livraisonCP").val(this.value.livraison.codePostal);
			$("#livraisonVille").val(this.value.livraison.ville);
		}
		if(this.value.hasOwnProperty("contact")){
			$("#contactTel").val(this.value.contact.tel);
			$("#contactMail").val(this.value.contact.email);
			$("#contactNom").val(this.value.contact.nom);
		}
		this.value = {
			"general" : {
				"commentaire" : $("#inputCom").val(),
				"adresse" : $("#inputAdresse").val(),
				"codePostal" : $("#inputCP").val(),
				"email" : $("#inputMail").val(),
				"entreprise" : $("#inputNom").val(),
				"tel" : $("#inputTel").val(),
				"ville" : $("#inputVille").val(),
				"coord" : 
				[ 
					lng,
					lat
				]
			},
			"livraison" : {
				"nom" : $("#clientLivraisonNom").val(),
				"adresse" : $("#clientLivraisonAdresse").val(),
				"codePostal" : $("#clientLivraisonCP").val(),
				"ville" : $("#clientLivraisonVille").val(),
				"commentaire" : $("#inputComLivraison").val()
			},
			"contact" : {
				"tel" : $("#clientContactTel").val(),
				"email" : $("#clientContactMail").val(),
				"nom" : $("#clientContactNom").val()
			}
		};

		if(InterfaceClient.modif){
			this.value.ID = parseInt($(".selected").parent().find(".nomClient ").find(".cell").attr("data-id"));
		}
	},

	getThread : function(filter, callback) {
		var tmp = new Array();
		Client.entrepriseTags = [];
		Client.adresseTags = [];
		Client.codePostal = [];
		Client.villeTags = [];
		JNTP.execute(["get", {"filter" : filter, "collection" : "client"}], function(j){
			this.list = j.body;
			this.list.forEach(function(elem){
				Client.entrepriseTags.push(elem["general"]["entreprise"]);
				Client.adresseTags.push(elem["general"]["adresse"]);
				Client.codePostalTags.push(elem["general"]["codePostal"]);
				Client.villeTags.push(elem["general"]["ville"]);
			});
			if (callback) callback(j);
		}.bind(this));
	},

	get : function(filter, callback) {
		JNTP.execute(["get", {"filter" : filter, "collection" : "client"}], function(j){
			this.value = j.body[0];
			if (callback) callback(j);
		}.bind(this));
	},

	fillResult : function(type, value){
		$(".result").empty();
		this.list.forEach(function(elem){
			if(elem["general"][type] == value){
				$(".result").append(
					'<div class="containResult" data-id="'+elem["ID"]+'">'+
						'<div class="containInteraction">'+
							'<div class="interaction">'+
								'<button class="ajoutClient">Sélectionner</button>'+
							'</div>'+
						'</div>'+
						'<div class="rowResult">'+
							'<label>ID_Client </label>'+
							'<div class="valueResult"> '+elem["ID"]+'</div>'+
						'</div>'+
						'<div class="rowResult">'+
							'<label>Nom </label>'+
							'<div class="valueResult"> '+elem["general"]["entreprise"]+'</div>'+
						'</div>'+
						'<div class="rowResult">'+
							'<label>commentaire </label>'+
							'<div class="valueResult"> '+elem["general"]["commentaire"]+'</div>'+
						'</div>'+
						'<div class="rowResult">'+
							'<label>email </label>'+
							'<div class="valueResult"> '+elem["general"]["email"]+'</div>'+
						'</div>'+
						'<div class="rowResult">'+
							'<label>Téléphone </label>'+
							'<div class="valueResult"> '+elem["general"]["tel"]+'</div>'+
						'</div>'+
						'<div class="rowResult">'+
							'<label>Adresse </label>'+ 
							'<div class="valueResult"> '+ elem["general"]["adresse"] + ' ' + elem["general"]["codePostal"] + ' ' + elem["general"]["ville"] + '</div>'+
						'</div>'+
					'</div>'
				);
				$("#clientID").val(value);
			}
		});
	},

	setValue : function(id){
		this.list.forEach(function(elem, index){
			if(elem["ID"] == id){
				this.value = this.list[index];
				this.fillLivraison();
			}
		}.bind(this));
	},

	fillLivraison : function(){
		if(this.value.hasOwnProperty("livraison")){
			$("#livraisonNom").val(this.value.livraison.nom);
			$("#livraisonAdresse").val(this.value.livraison.adresse);
			$("#livraisonCP").val(this.value.livraison.codePostal);
			$("#livraisonVille").val(this.value.livraison.ville);
			$("#commentaireLivraison").val(this.value.livraison.commentaire);
		}
		if(this.value.hasOwnProperty("contact")){
			$("#contactTel").val(this.value.contact.tel);
			$("#contactMail").val(this.value.contact.email);
			$("#contactNom").val(this.value.contact.nom);
		}
		
	}
};
