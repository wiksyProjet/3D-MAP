$(document).ready(function(){

	$("#expeditionColis").click(function(){
		Facture.expedition();
	})

	$("#showMdpUser").click(function(){
		User.decryptMdp(parseInt($(this).attr("data-id")));
	})

	$(document).on("click", "#copy", function(){
		$("#copy").text("lien copié");
		$("#copy").css({
		    backgroundColor: "#4ca64c",
			WebkitTransition: "background-color 1000ms linear",
			Mstransition: "background-color 1000ms linear",
			OTransition : "background-color 1000ms linear",
			transition: "background-color 1000ms linear"
		});

		$("#to-copy").select();
		document.execCommand( 'copy' );
		return false;
	});

	$("#deleteLigneVariable").click(function(){
		var ID = parseInt($(".selected").parent().find(".clefTabVariable").find(".cell").attr("data-id"));
		Variable.deleteVariable(ID);
	});

	$("#reinitVariable").click(function(){
		InterfaceVariable.resetVariable();
	});

	$(document).on("click", ".ligneVariable", function(){
		var ID = parseInt($(this).find(".clefTabVariable ").find(".cell").attr("data-id"));
		$(".selected").removeClass("selected");
		$(this).find("td").addClass("selected");
		Variable.getVal({"ID" : ID}, function(){
			$("#deleteLigneVariable").prop("disabled", false);
			InterfaceVariable.modif = true;
			InterfaceVariable.jsonToForm();
			$("#validationVariable").text("Mettre à jour la variable");
		});
	});

	$("#validationVariable").click(function(){
		Variable.setVariable();
	});

	$(".editionFacture").click(function(){
		if(InterfaceFacture.modif){
			window.open(publicSite+'?media=facture&id='+Facture.value.ID+"&type="+$(this).attr("data-type"),'_blank');
		}
		else{
			InterfaceClient.alertMsg("Veuillez sélectionner une facture");
		}
	});

	$("#sourceProduct").click(function(){
		InterfaceProduct.fillSource();
	});

	$("#searchButtonProduct").click(function(){
		Recherche.rechercheProduct();
	});

	$("#reinitProduct").click(function(){
		InterfaceProduct.resetProduct();
	});

	$("#closeWindow").click(function(){
		$("#listeIDMedia").slideUp("slow");
	});

	$(document).on("click", ".imgResult", function(){
		$("#containerImage").append(
		'<li><img class="indexImg" data-id="'+$(this).attr("data-id")+'" src='+publicSite+'?media=image&id='+$(this).attr("data-id")+'&width=150></li>'
		);
		InterfaceUser.alertMsg("Média ajouté");
		$(".indexImg").draggable({
			revert : true
		});
		$(this).fadeOut("slow");
	});

	$("#searchMediaList").keypress(function(e) {
		if(e.which == 13) {
			InterfaceProduct.searchMedia($("#searchMediaList").val());
		}
	});

	$(".addImg").click(function(){
		$("#listeIDMedia").fadeIn("slow");
		$("#containResultProduct").empty();
		$("#searchMediaList").val("");
	});	


	$("#validationProduct").click(function(){
		Product.setProduct();
	});

	$("#sourceMedia").click(function(){
		InterfaceMedia.fillSource();
	});

	$("#deleteMedia").click(function(){
		Media.deleteMedia();
	});

	$("#validationMedia").click(function(){
		if($("#typeForm").val() == "image"){
			InterfaceMedia.setImage();
		}
	});

	$("#reinitMedia").click(function(){
		$("#deleteMedia").prop("disabled", true);
		InterfaceMedia.modif = false;
		InterfaceMedia.resetMedia();
	});

	$("#searchButtonMedia").click(function(){
		Recherche.rechercheMedia();
	});

	$("#searchButtonUser").click(function(){
		Recherche.rechercheUser();
	});

	$("#sourceUser").click(function(){
		InterfaceUser.fillSource();
	});

	$("#deleteUser").click(function(){
		if(InterfaceUser.modif){
			var ID = parseInt($(".selected").parent().find(".nomUser").find(".cell").attr("data-id"));
			User.deleteUser(ID);
		}
	});

	$("#validationUser").click(function(){
		User.formToJson();
		User.setUser();
	});

	$(document).on('mouseenter','.ligne', function (event) {
		if($(this).find(".selected").length < 1){
			$(this).attr("data-color", $(this).css("backgroundColor"));
			$(this).css("backgroundColor", "#e8e6ff");
		}
	}).on('mouseleave','.ligne',  function(){
			$(this).css("backgroundColor", $(this).attr("data-color"));
	});

	$(document).on('mouseenter','.ligneClient', function (event) {
		if($(this).find(".selected").length < 1){
			$(this).attr("data-color", $(this).css("backgroundColor"));
			$(this).css("backgroundColor", "#e8e6ff");
		}
	}).on('mouseleave','.ligneClient',  function(){
			$(this).css("backgroundColor", $(this).attr("data-color"));
	});

	$(document).on('mouseenter','.ligneUser', function (event) {
		if($(this).find(".selected").length < 1){
			$(this).attr("data-color", $(this).css("backgroundColor"));
			$(this).css("backgroundColor", "#e8e6ff");
		}
	}).on('mouseleave','.ligneUser',  function(){
			$(this).css("backgroundColor", $(this).attr("data-color"));
	});

	$(document).on('mouseenter','.ligneMedia', function (event) {
		if($(this).find(".selected").length < 1){
			$(this).attr("data-color", $(this).css("backgroundColor"));
			$(this).css("backgroundColor", "#e8e6ff");
		}
	}).on('mouseleave','.ligneMedia',  function(){
			$(this).css("backgroundColor", $(this).attr("data-color"));
	});

	$("#searchButtonClient").click(function(){
		Recherche.rechercheClient();
	});


	$("#getLL").click(function(){
		var adresse =  $("#inputAdresse").val() + ", " + $("#inputCP").val() + $("#inputVille").val();
		Client.setCoordonnees(adresse);
	});

	$(document).on("click", ".ligne", function() {
		var ID = parseInt($(this).find(".numFacture").find(".cell").attr("data-id"));
		pointer = $(this);
		$(".selected").removeClass("selected");
		$(this).find("td").addClass("selected");
		Facture.get({"ID":ID}, function(){
			$("#validation").prop({
			  disabled: true
			});
			$("#debloque").show();
			$("#deleteFacture").prop("disabled", false);
			InterfaceFacture.modif = true;
			InterfaceFacture.factureToForm();
			InterfaceFacture.clientToForm();
			$("#validation").text("Mettre à jour la commande");
		})
	});

	$(document).on("click", ".ligneUser", function() {
		var ID = parseInt($(this).find(".nomUser").find(".cell").attr("data-id"));
		pointer = $(this);
		$(".selected").removeClass("selected");
		$(this).find("td").addClass("selected");
		User.get({"ID" : ID}, function(){
			$("#showMdpUser").fadeIn("slow");
			$("#showMdpUser").attr("data-id", ID);
			$("#deleteUser").prop("disabled", false);
			InterfaceUser.modif = true;
			InterfaceUser.userToForm();
			$("#validationUser").text("Mettre à jour l'utilisateur");
		});
	});

	$(document).on("click", ".ligneMedia", function() {
		var ID = parseInt($(this).find(".nomMedia").find(".cell").attr("data-id"));
		pointer = $(this);
		$(".selected").removeClass("selected");
		$(this).find("td").addClass("selected");
		Media.get({"ID" : ID}, function(){
			$("#deleteMedia").prop("disabled", false);
			InterfaceMedia.modif = true;
			InterfaceMedia.mediaToForm();
			$("#validationMedia").text("Mettre à jour le média");
		});
	});

	$("#deleteLigneProduct").click(function(){
		var ID = parseInt($(".selected").parent().find(".refTabProduct").find(".cell").attr("data-id"));
		Product.deleteProduct(ID);
	});

	$(document).on("click", ".ligneProduct", function(){
		$(".containerImage").empty().append("<h1>List images </h1>");
		var ID = parseInt($(this).find(".refTabProduct").find(".cell").attr("data-id"));
		$(".selected").removeClass("selected");
		$(this).find("td").addClass("selected");
		Product.getVal({"ID" : ID}, function(){
			$("#deleteLigneProduct").prop("disabled", false);
			InterfaceProduct.modif = true;
			InterfaceProduct.jsonToForm();
			$("#validationProduct").text("Mettre à jour le produit");
		});
	});

	$("#debloque").click(function(){
		$("#validation").prop("disabled", false);
		$(this).hide();
	});

	$("#factureFacturee").change(function(){
		if($("#factureFacturee").is(":checked")){
			$("#factureNumFacture").val("");
		}
		else{
			$("#factureNumFacture").val("EC");
		}
	});

	$("#reinitSearch").click(function(){
		$("#factureClient").val("");
		$("#factureCommande").val("");
		$("#factureNumFacture").val("EC");
		$("#facturePaye").prop("checked", false);
		$("#factureLivre").prop("checked", false)
		$("#factureFacturee").prop("checked", false)
		$("#typeMontant").val("0");
		$("#searchMontant").val("");
		InterfaceFacture.resetFacture();
	});

	$("#reinitUser").click(function(){
		$("#deleteUser").prop("disabled", true);
		InterfaceUser.modif = false;
		InterfaceUser.resetUser();
	});

	$("#searchFacture").click(function(){
		Recherche.rechercheFacture();
	});

	$("#deleteClient").click(function(){
		if(InterfaceClient.modif){
			$( "#dialog-confirm-deleteClient" ).dialog({
				resizable: false,
				height: "auto",
				width: 400,
				modal: true,
				buttons: {
					"Confirmation": function() {
						Client.deleteClient();
					},
					Annulation: function() {
						$( this ).dialog( "close" );
					}
				}
			});
		}
		else{
			InterfaceClient.alertMsg("Pas de client sélectionné");
		}
	});

	$("#reinitClient").click(function(){
		$("#ValidationClient").text("Valider");
		InterfaceClient.reinitClient();
	});

	$("#sourceClient").click(function(){
		InterfaceClient.fillSource();
	});

	$("#ValidationClient").click(function(){
		Client.setClient();
	});

	$(".colFacture").click(function(){
		InterfaceFacture.tri($(this).attr("data-col"));
	});

	$( "#delai" ).change(function() {
		var t = new Date().getTime();
		t += (parseInt($("#delai").val()) * 24 * 3600 * 1000);
		
		var date = new Date(t); 
		if($("#delai").val().includes("fin"))
			date.setDate(28);

		$("#datePaiement").val(date.toISOString().split('T')[0]);
	});

	$("#btnFacture").click(function(){
		Facture.updateValue();
		Facture.setFacture(true);
	});

	$(document).on("click", ".ajoutClient", function(){
		Client.setValue($(this).parent().parent().parent().attr("data-id"));
		InterfaceFacture.deleteNonSelectClient();
		$(".result").prepend(
			'<div id="reponse" style="display:none">Client ajouté</div>'
			);
		$("#reponse").slideDown("normal");
		setTimeout(function(){ 
			$("#reponse").slideUp("normal");
		}, 2000);
	});

	$(document).on('mouseenter','.containResult', function (event) {
		$(this).find(".containInteraction").show();
	}).on('mouseleave','.containResult',  function(){
		$(this).find(".containInteraction").hide();
	});


	$(document).on("change", ".totalChange", function(){
		InterfaceFacture.totalFacture();
	});


	$("#clientID").change(function(){
		Client.fillResult("entreprise", $(this).val());
	});

	$("#valueRecherche").keypress(function(e) {
		if(e.which == 13) {
			Client.fillResult($("#typeRecherche").val(), $(this).val());
		}
	});

	$("#valueRecherche").on("focus", function(){

	});

	$(document).on("click", ".ui-menu-item-wrapper", function(){
		if($("#valueRecherche").is(":focus")){
			Client.fillResult($("#typeRecherche").val(), $(this).html());
		}
	});

	$("#typeRecherche").change(function(){
		var tags = Client.entrepriseTags;
		switch($(this).val()){
			case "entreprise" : 
			tags = Client.entrepriseTags;
			break;
			case "adresse" :
			tags = Client.adresseTags;
			break;
			case "codePostal" : 
			tags = Client.codePostalTags;
			break;
			case "ville" : 
			tags = Client.villeTags;
			break;
			default : 
			tags = "";
			break;
		}

		$( "#valueRecherche" ).autocomplete({
			source: tags
		});
	});

	$("#rechercheClient").click(function(){
		var type = $("#typeRecherche").val();
		var value = $("#valueRecherche").val();
	});

	$("#pointer").click(function(){
		$('#containSearch').animate({
			left : "0%",	
		}, 750, function(){
			$("#pointer").fadeOut("slow");
			$("#croix").fadeIn("slow");
		});
	});

	$("#croix").click(function(){
		$("#croix").fadeOut("fast", function(){
			$('#containSearch').animate({
				left : "-18%",	
			}, 750, function(){
				$("#pointer").fadeIn("slow");
			});
		});
	});

	$('#source').click(function() {
		InterfaceFacture.fillSource();
	});

	$(document).on("click", ".addProduct", function(){
		InterfaceFacture.displayListProduct();
	});


	$(document).on("click", ".addReduction", function(){
		InterfaceFacture.addPile(this);
	});

	$(document).on("click", ".addFrais", function(){
		InterfaceFacture.addPile(this);
	});

	$(document).on("click", ".deleteProduct", function(){
		InterfaceFacture.deleteProduct(this);
	});

	$(document).on("click", ".deleteFrais", function(){
		InterfaceFacture.deletePile(this);
	});

	$(document).on("click", ".deleteReduction", function(){
		InterfaceFacture.deletePile(this);
	});


	$("#connexion").click(function(){
		var login = $("#login").val();
		var mdp = $("#mdp").val();
		JNTP.execute(["auth", {"auth" : {"login" : login, "mdp" : mdp}}], function(j){
			if(JNTP.authentified){
				$("#login").val(" ");
				$("#mdp").val(" ");
				$('#auth').animate({
					marginTop: '+100%',	
				}, 750);
				if(JNTP.Storage.privilege=="Administrateur"){
					init();
				}
			}
			else{
				$("#messageLogin").show();
				setTimeout(function(){
					$("#messageLogin").hide();
				}, 2000);
			}
		}.bind(this));
	});


	$("#mdp").keypress(function(e) {
		if(e.which == 13) {
			var login = $("#login").val();
			var mdp = $("#mdp").val();
			JNTP.execute(["auth", {"auth" : {"login" : login, "mdp" : mdp}}], function(j){
				if(JNTP.authentified){
					$('#auth').animate({
						marginTop: '+100%',	
					}, 750);
					if(JNTP.Storage.privilege=="Administrateur"){
						init();
					}
				}
				else{
					$("#messageLogin").show();
					setTimeout(function(){
						$("#messageLogin").hide();
					}, 2000);
				}
			}.bind(this));
		}
	});

	$("#login").keypress(function(e){
		if(e.which == 13) {
			var login = $("#login").val();
			var mdp = $("#mdp").val();
			JNTP.execute(["auth", {"auth" : {"login" : login, "mdp" : mdp}}], function(j){
				if(JNTP.authentified){
					$('#auth').animate({
						marginTop: '+100%',	
					}, 750);
					if(JNTP.Storage.privilege=="Administrateur"){
						init();
					}
				}
				else{
					$("#messageLogin").show();
					setTimeout(function(){
						$("#messageLogin").hide();
					}, 2000);
				}
			}.bind(this));
		}
	});

	$(".glyphicon-log-out").click(function(){
		JNTP.execute(["quit", {}], function(j){
			JNTP.deleteSession();
			$("#auth").fadeIn("slow");
		});
		$('#auth').animate({
			marginTop: '0',
		}, 750);
	});

	$("#nouvelleFacture").click(function(){
		$("#debloque").hide();
		InterfaceFacture.modif = false;
		InterfaceFacture.resetForm();
		$("#validation").text("Insérer une commande").prop("disabled", false);
		$("#numFacture").hide();
		$("#btnFacture").show();
		$("#valueRecherche").val("");
	});

	$("#deleteFacture").click(function(){
		if(InterfaceFacture.modif){
			$("#numFactureDelete").css("color", "black");
			$( "#dialog-confirm-Delete" ).dialog({
				resizable: false,
				height: "auto",
				width: 400,
				modal: true,
				buttons: {
					"Confirmation": function() {
						if($("#numFactureDelete").val() ==  Facture.value.refCommande){
							Facture.deleteFacture(Facture.value.ID);
						}
						else
							$("#numFactureDelete").css("color", "red");
					},
					Annulation: function() {
						$( this ).dialog( "close" );
					}
				}
			});
		}
	});

	$("#validation").click(function(){
		//$("#dialog-confirm").show();
		$( "#dialog-confirm" ).dialog({
			resizable: false,
			height: "auto",
			width: 400,
			modal: true,
			buttons: {
				"Confirmation": function() {
					Facture.setFacture(false);
					$(this).dialog("close");
				},
				Annulation: function() {
					$( this ).dialog( "close" );
				}
			}
		});
	});



	$(document).on("change", ".refProduct", function(){
		var id = $(this).attr("data-id");
		var prix = $(this).find("option:selected").attr("data-prix");
		if ( $(this).find("option:selected").attr("data-prix") ) {
			$("#prix-"+id).val(prix);
			$("#qt-"+id).val(1);
		}else{
			$("#prix-"+id).val(0);
			$("#qt-"+id).val(0);
		}
	});

});