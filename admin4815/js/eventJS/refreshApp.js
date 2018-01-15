$(document).ready(function(){
	$("#variablePanel").click(function(){
		InterfaceVariable.resetVariable();
	});

	$("#productPanel").click(function(){
		$("#search").hide();
		$("#searchClient").hide();
		$("#searchUser").hide();
		$("#searchMedia").hide();
		$("#searchProduct").show();
		$("#deleteLigneProduct").prop("disabled", true);

		InterfaceProduct.resetProduct();
	});

	$("#mediaPanel").click(function(){
		$("#searchProduct").hide();
		$("#search").hide();
		$("#searchClient").hide();
		$("#searchUser").hide();
		$("#searchMedia").show();
		InterfaceMedia.resetMedia();
	});

	$("#userPanel").click(function(){
		$("#searchProduct").hide();
		$("#search").hide();
		$("#searchClient").hide();
		$("#searchMedia").hide();
		$("#searchUser").show();
		InterfaceUser.resetUser();
	});

	$("#facturePanel").click(function(){
		$("#searchProduct").hide();
		$("#search").show();
		$("#searchUser").hide();
		$("#searchMedia").hide();
		$("#searchClient").hide();
		InterfaceFacture.resetFacture();
	});

	$("#clientPanel").click(function(){
		Client.init("");
		initMap();
		$("#searchProduct").hide();
		$("#search").hide();
		$("#searchMedia").hide();
		$("#searchUser").hide();
		$("#searchClient").show();
		$( "#clientRecherche" ).autocomplete({
			source: Client.entrepriseTags
		});
	});
});