$(document).ready(function(){
	$("#variablePanel").click(function(){
		if(JNTP.Storage.privilege=="Administrateur"){
		InterfaceVariable.resetVariable();
		}
	});

	$("#productPanel").click(function(){
		if(JNTP.Storage.privilege=="Administrateur"){
		$("#search").hide();
		$("#searchClient").hide();
		$("#searchUser").hide();
		$("#searchMedia").hide();
		$("#searchProduct").show();
		$("#deleteLigneProduct").prop("disabled", true);

		InterfaceProduct.resetProduct();
		}
	});

	$("#mediaPanel").click(function(){
		if(JNTP.Storage.privilege=="Administrateur"){
		$("#searchProduct").hide();
		$("#search").hide();
		$("#searchClient").hide();
		$("#searchUser").hide();
		$("#searchMedia").show();
		InterfaceMedia.resetMedia();
		}
	});

	$("#userPanel").click(function(){
		if(JNTP.Storage.privilege=="Administrateur"){
		$("#searchProduct").hide();
		$("#search").hide();
		$("#searchClient").hide();
		$("#searchMedia").hide();
		$("#searchUser").show();
		InterfaceUser.resetUser();
		}
	});

	$("#facturePanel").click(function(){
		if(JNTP.Storage.privilege=="Administrateur"){
		$("#searchProduct").hide();
		$("#search").show();
		$("#searchUser").hide();
		$("#searchMedia").hide();
		$("#searchClient").hide();
		InterfaceFacture.resetFacture();
		}
	});

	$("#clientPanel").click(function(){
		if(JNTP.Storage.privilege=="Administrateur"){
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
		}
	});
});