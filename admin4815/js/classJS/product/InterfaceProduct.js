var InterfaceProduct = {
	modif : false,

	displayListProduct : function(){
		Product.value.forEach(function(elem){
			$("#tableProduct").append(
				this.cloneDOM('modelTabProduct', {
					".refTabProduct" : '<div data-id="'+elem["ID"]+'" class="cell">' + elem["ref"] + '</div>',
					".titreTabProduct" : elem["titre"],
					".prixTabProduct" : elem["prixPublic"],
					".dimTabProduct" : elem["dimension"]
				})
			);
		}.bind(this));

		this.alterLineColor();
	},

	jsonToForm : function(){
		$("#libelleStock").css("background-color", "white");
		$("#productActif").prop("checked", Product.valProduct.actif);
		$("#inputprixDist").val(Product.valProduct.prixDist);
		$("#inputprixPro").val(Product.valProduct.prixPro);
		$("#inputprixPublic").val(Product.valProduct.prixPublic);
		$("#productTitre").val(Product.valProduct.titre);
		$("#inputproductTVA").val(Product.valProduct.tauxTVA);
		$("#inputPoids").val(Product.valProduct.poids);
		$("#inputproductDimensions").val(Product.valProduct.dimension);
		$("#productRef").val(Product.valProduct.ref);

		$("#libelleStock").attr("placeholder", "0 en stock");
		$("#stockVariation").val(0);
		if(Product.valProduct.stock){
			$("#libelleStock").attr("placeholder", Product.valProduct.stock + " en stock");
		}

		if(Product.valProduct.stock <= 0){
			$("#libelleStock").css("background-color", "rgba(255, 0, 0, 0.37)");
		}

		if(Product.valProduct.uriModel3D)
			$("#uriModel3D").importTags(Product.valProduct.uriModel3D.toString());
		if(Product.valProduct.uriVideo)
			$("#uriVideo").importTags(Product.valProduct.uriVideo.toString());

		$('#productType').importTags(Product.valProduct.tags.toString());

		$("#productDescriptif").siblings(".trumbowyg-editor").html(Product.valProduct.desc);

		$(".containerImage").sortable({
			revert : true
		})

		Product.valProduct.indexImage.forEach(function(elem){
			$(".containerImage").append(
				'<img class="indexImg" data-id="'+elem+'" src='+publicSite+'?media=image&id='+elem+'&width=150>'
			);
			$(".indexImg").draggable({
				connectToSortable: ".containerImage",
				revert : "invalid"
			});
		});
	},

	alterLineColor: function(){
		$(".ligneProduct").each(function(i) {
			if(i%2) {
				$(this).css("background-color", "#daf3f9");
			}
		})
	},

	cloneDOM : function(modelID, json){
		var content = $("#"+modelID).clone().removeAttr('id').addClass("ligneProduct").show();
		for (key in json) {
			$(content).find( key ).html( json[key] );
		}
		return content;
	},

	resetProduct : function(){
		$("#libelleStock").css("background-color", "white");
		$(".model3DUri").tagsInput();
		$(".uriVideo").tagsInput();
		$(".model3DUri").removeTag();
		$(".uriVideo").removeTag();
		this.modif = false;
		$(".ligneProduct").remove();
		$("#stockVariation").val(0);
		$("#libelleStock").attr("placeholder", "aucun produit selectionné");
		$("#validationProduct").text("Valider");
		$("#deleteLigneProduct").prop("disabled", true);
		Product.get({}, function(j){
			this.displayListProduct();
		}.bind(this));

		$(".listData").each(function(index, elem){
		    $(elem).val("");
		});

		$("#productForm").find("input[type=text]").each(function(index, elem){
			$(elem).val("");
		}.bind(this));

		$("#productType").importTags('');

		$("#productActif").prop("checked", false);

		$("#productDescriptif").siblings(".trumbowyg-editor").html("");


		$(".containerImage").empty();
		$(".containerImage").append("<h1> Liste images</h1>");

		$("#inputproductTVA").val("20");

	},

	fillSource : function(){
		if(this.modif){
			Product.formToJSON();
			$('#dialog-content').jsonViewer( Product.valProduct );
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
		}
		else{
			InterfaceUser.alertMsg("Veuillez choisir un produit");
		}
	},

	searchMedia : function(param){
		var filter = {};

		if($("#searchMediaType").val() == "ID"){
			filter[$("#searchMediaType").val()] = parseInt(param);
		}
		else{
			if($("#searchMediaType").val() == "tags"){
				filter[$("#searchMediaType").val()] =  {'$in' : param.split(",")};
			}
			else{
				filter[$("#searchMediaType").val()] =  {'$regex' : param, '$options': 'i'};
			}
		}

		JNTP.execute(["get", { filter, "collection" : "media"}], function(j){
			if(j.body.length == 0)
				InterfaceUser.alertMsg("Aucun résultat");
			j.body.forEach(function(elem){
				if(!this.isDoublon(elem.ID)){
					$("#containResultProduct").append(
						'<img class="imgResult"data-id="'+elem.ID+'" src='+publicSite+'?media=image&id='+elem.ID+'&width=150>'
					);
					$(".containerImage").sortable({
						revert : true
					})
					$(".imgResult").draggable({
						connectToSortable: ".containerImage",
						revert : "invalid"
					});
				}
				else{
					InterfaceUser.alertMsg("Image déjà ajoutée");
				}
			}.bind(this));
		}.bind(this));
	},

	isDoublon : function(ID){
		var monBoolean = false;
		$(".imgResult").each(function(index, elem){
			if(parseInt(ID) == parseInt($(elem).attr("data-id"))){
				monBoolean = true;
			}
		});

		$(".indexImg").each(function(index, elem){
			if(parseInt(ID) == parseInt($(elem).attr("data-id"))){
				monBoolean = true;
			}
		});

		return monBoolean;
	}
};