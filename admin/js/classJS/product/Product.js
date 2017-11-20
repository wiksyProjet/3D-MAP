var Product = {
	value : [],
	valProduct : {},

	get : function(filter, callback) {
		//Problème : il effecture un callback AVANT le callback de JNTP. Donc, n'affecte pas la value.
		JNTP.execute(["get", {"filter" : filter, "collection" : "product"}], function(j){
			this.value = j.body;
			if(callback)
				callback();
		}.bind(this));
	},

	getVal : function(filter, callback){
		JNTP.execute(["get", {"filter" : filter, "collection" : "product"}] , function(j){
			this.valProduct = j.body[0];
			if(callback)
				callback();
		}.bind(this));
	},

	deleteProduct : function(ID){
		if(InterfaceProduct.modif){
			JNTP.execute( [ "delete", { "collection":"product", "ID": ID } ], function(e) {
				InterfaceProduct.resetProduct();
				InterfaceUser.alertMsg(e.info);
			}.bind(this));
		}
	},

	setProduct : function(){
		this.formToJSON();
		if(!InterfaceProduct.modif){
			if(this.correctProduct()){
				JNTP.execute(["setProduct", {"new" : this.valProduct}], function(j){
					InterfaceProduct.resetProduct();
					InterfaceUser.alertMsg(j.info);
				}.bind(this));
			}
			else{
				InterfaceUser.alertMsg("erreur produit...");
			}
		}
		else{
			if(this.correctProduct()){
				JNTP.execute(["setProduct", {"update" : this.valProduct}], function(j){
					InterfaceProduct.resetProduct();
					InterfaceUser.alertMsg(j.info);
				}.bind(this));
			}
			else{
				InterfaceUser.alertMsg("Erreur produit...");
			}
		}
	},

	correctProduct : function(){
		var b = true;
		$("#productForm").find("input[type=text]").each(function(index, elem){
			if(!$(elem).val() && $(elem).attr("id")!="uriModel3D" &&  $(elem).attr("id")!="uriVideo" && $(elem).attr("id")!="libelleStock")
				b = false;
		}.bind(this));

		$("#productForm").find("input[type=number]").each(function(index, elem){
			if(!$(elem).val())
				b = false;
		}.bind(this));


		$("#productForm").find(".listData").each(function(index, elem){
			if(!$(elem).val()){
				b = false;
			}
		}.bind(this));

		return b;
	},

	formToJSON : function(){
		$("#productForm").find("input[type=text]").each(function(index, elem){
			if($(elem).attr("id") == "productType"){
				this.valProduct[ $(elem).attr("name") ] = $(elem).val().split(",");
			}
			else{
				if($(elem).attr("id") == "uriModel3D"){
					if($(elem).val().length > 0)
						this.valProduct["uriModel3D"] = $(elem).val().split(",");
				}
				else{
					if($(elem).attr("id") == "uriVideo"){
						if($(elem).val().length > 0)
							this.valProduct["uriVideo"] = $(elem).val().split(",");
					}
					else{
						if($(elem).attr("id")!="libelleStock"){
							this.valProduct[$(elem).attr("name")] = $(elem).val();
						}
					}
				}
			}
		}.bind(this));

		$("#productForm").find("input[type=number]").each(function(index, elem){
			this.valProduct[$(elem).attr("name")] = $(elem).val();
		}.bind(this));

		$("#productForm").find("input[type=checkbox]").each(function(index, elem){
			this.valProduct[$(elem).attr("name")] = $(elem).is(":checked");
		}.bind(this));

		$("#productForm").find(".listData").each(function(index, elem){
			var tmp = $(elem).val();
			if($(elem).hasClass("unNombre"))
				tmp = parseInt(tmp);
			if($(elem).hasClass("unFloat"))
				tmp = parseFloat(tmp);

			this.valProduct[$(elem).attr("name")] = tmp;
		}.bind(this));

		this.valProduct[$("#productDescriptif").attr("name")] = $("#productDescriptif").siblings(".trumbowyg-editor").html();

		this.valProduct["indexImage"] = [];
		$(".indexImg").each(function(index, elem){
			this.valProduct["indexImage"].push(parseInt($(elem).attr("data-id")));
		}.bind(this));
	}
}