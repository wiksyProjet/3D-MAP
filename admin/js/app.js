$(document).ready(function(){
	JNTP.auth();
});


function init(){
	$("#userProfil").append(JNTP.Storage.nom);
	$("#userProfil").fadeIn("slow");


	$("#userPrivilege").append(JNTP.Storage.privilege);
	$("#userPrivilege").fadeIn("slow");
	//On initialise la pile de réduction et de frais
	InterfaceFacture.initPile();

	//Gestion Facture & produit
	Facture.getThread( {}, function(j){
		Client.getThread({}, function(j){
			$("#deleteFacture").prop("disabled", true);
			$("#numFacture").hide();
			$("#btnFacture").show();
			InterfaceFacture.displayListFacture();

			//Sinon, on définit le formulaire comme étant un formulaire d'insertion
			InterfaceFacture.modif = false;
			Product.get({}, function(j){
				InterfaceFacture.displayListProduct();
			});

			var t = new Date().getTime();
			t += (parseInt($("#delai").val()) * 24 * 3600 * 1000);
			
			var date = new Date(t); 
			$("#dateEcheance").val(date.toISOString().split('T')[0]);

			$("#validation").text("Insérer une commande");
			$("#dateCommande").val(new Date().toISOString().split('T')[0]);

			$("#factureClient").autocomplete({
				source: Client.entrepriseTags
			});
			
			$( "#valueRecherche" ).autocomplete({
				source: Client.entrepriseTags
			});
		});
	});
}