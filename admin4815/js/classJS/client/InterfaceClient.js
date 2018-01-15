var InterfaceClient = {
	modif : false,

	alterLineColor: function(){
		$(".ligneClient").each(function(i) {
			if(i%2) {
				$(this).css("background-color", "#daf3f9");
			}
		})
	},
	
	displayListClient : function(){
		var email;
		var tel;
		var adresse;
		var entreprise;

		Client.list.forEach(function(elem){
			entreprise =  elem["general"]["entreprise"] ? elem["general"]["entreprise"] : '<span style="color:#ffb732" class="glyphicon glyphicon-remove"></span>';
			email =  elem["general"]["email"] ? elem["general"]["email"] : '<span style="color:#ffb732" class="glyphicon glyphicon-remove"></span>';
			tel = elem["general"]["tel"] ?  elem["general"]["tel"] : '<span style="color:#ffb732" class="glyphicon glyphicon-remove"></span>';
			adresse = (elem["general"]["adresse"] || elem["general"]["codePostal"] || elem["general"]["ville"]) ? (elem["general"]["adresse"]+", " + elem["general"]["codePostal"] + elem["general"]["ville"]) : '<span style="color:#ffb732" class="glyphicon glyphicon-remove"></span>';



			$("#tableClient").append(
				this.cloneDOM('modelClient', {
					".nomClient" : '<div data-id="'+elem["ID"]+'" class="cell">' + entreprise + '</div>',
					".mailClient" : email,
					".telClient" : tel,
					".adresseClient" : adresse
				})
			);
		}.bind(this));

		this.alterLineColor();
	},

	clientToForm : function(){
		$("#inputCom").val(Client.value.general.commentaire);
		$("#inputNom").val(Client.value.general.entreprise);
		$("#inputTel").val(Client.value.general.tel);
		$('#inputAdresse').val(Client.value.general.adresse);
		$("#inputCP").val(Client.value.general.codePostal);
		$("#inputMail").val(Client.value.general.email);
		$("#inputVille").val(Client.value.general.ville);

		$("#clientLivraisonNom").val(Client.value.livraison.entreprise);
		$("#clientLivraisonAdresse").val(Client.value.livraison.adresse);
		$("#clientLivraisonCP").val(Client.value.livraison.codePostal);
		$("#clientLivraisonVille").val(Client.value.livraison.ville);

		$("#clientContactMail").val(Client.value.contact.email);
		$("#clientContactNom").val(Client.value.contact.nom);
		$("#clientContactTel").val(Client.value.contact.tel);

		Client.setCoordonnees(Client.value.general.adresse + ", " + Client.value.general.codePostal + Client.value.general.ville);
	},

	cloneDOM : function(modelID, json){
		var content = $("#"+modelID).clone().removeAttr('id').addClass("ligneClient").show();
		for (key in json) {
			$(content).find( key ).html( json[key] );
		}
		return content;
	},

	fillSource : function(){
		Client.formToJSON();
		$('#dialog-content').jsonViewer( Client.value );
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

	reinitClient : function(){
		$(".selected").removeClass("selected");
		$("#deleteClient").prop("disabled", true);
		this.modif = false;
		Client.value = {};
		$('#recapClient').find("input").val("");
		$("#ValidationClient").text("Valider");
		$("#coordonnees").removeAttr("data-lat").removeAttr("data-lng");
		$("#clientLivraisonNom").val("");
		$("#clientLivraisonAdresse").val("");
		$("#clientLivraisonCP").val("");
		$("#clientLivraisonVille").val("");
		$("#clientContactNom").val("");
		$("#clientContactMail").val("");
		$("#clientContactTel").val("");		
		$("#inputComLivraison").val("");
		initMap();

	},

	alertMsg : function(message){
		$('#dialog-content').html(message);
		$( "#dialog" ).dialog({
			active : true,
			autoOpen: true,
			width: 300,
		});
	}
};
