var InterfaceMedia = {
	modif : false,

	displayListMedia : function(){
		Media.list.forEach(function(elem){
			var tag = elem["tags"] ? elem["tags"].toString() : '<span style="color:#ffb732" class="glyphicon glyphicon-remove"></span>';
			var type = elem["type"] ? elem["type"] : '<span style="color:#ffb732" class="glyphicon glyphicon-remove"></span>';
			switch(type){
				case "image" : 
					type += '~ <span style="font-size : 12px" class="glyphicon glyphicon-picture"></span>';
			}


			$("#tableMedia").append(
				this.cloneDOM('modelMedia', {
					".nomMedia" : '<div data-id="'+elem["ID"]+'" class="cell">' + elem["nom"] + '</div>',
					".tagMedia" : tag,
					".typeMedia" : type
				})
			);
		}.bind(this));

		this.alterLineColor();
	},

	alterLineColor: function(){
		$(".ligneMedia").each(function(i) {
			if(i%2) {
				$(this).css("background-color", "#daf3f9");
			}
		})
	},

	cloneDOM : function(modelID, json){
		var content = $("#"+modelID).clone().removeAttr('id').addClass("ligneMedia").show();
		for (key in json) {
			$(content).find( key ).html( json[key] );
		}
		return content;
	},

	setImage : function(){
		var listImg = [];
		if($(".containImg").length > 0){
			$(".containImg").each(function(index, elem){
				var jsonMedia = {
					//"data" : $(elem).find(".mesimages").attr("src"),
					"nom" : $(elem).find(".inputName").val(),
					"description" : $(elem).find(".commentaireImg").val(),
					"tags" : $(elem).find(".mesTags").val().split(","),
					"type" : "image"
				};
				if(this.modif){
					var pattern = new RegExp('media=');
					if(!pattern.test($(elem).find(".mesimages").attr("src"))){
						jsonMedia["data"] = $(elem).find(".mesimages").attr("src");
					}
				}
				else{
					alert(this.modif);
					jsonMedia["data"] = $(elem).find(".mesimages").attr("src");
				}
				listImg.push(jsonMedia);
			}.bind(this));
			
			Media.setImg(listImg);
		}
		else{
			alert("pas d'image..");
		}
	},

	mediaToForm : function(){
		switch(Media.value.type){
			case "image":
				var med = "";
				if(Media.value.description){
					med = Media.value.description;
				}
				$("#imgForm").hide();
				$('#updateImg').empty();
				$('#updateImg').append('<div class="containImg">'+
				   '<div class="groupImg">'+
				      '<input type="file" id="changeImg"><img class="mesimages" src='+publicSite+'?media=image&id='+Media.value.ID+'&width=300>'+
				      '<textarea  id="to-copy">'+publicSite+'?media=image&id='+Media.value.ID+'&width=800</textarea>'+
				      '<button id="copy" type="button">Copier le lien</button>'+
				   '</div>'+
				   '<div class="groupTag">'+
				      '<label>Tag </label>'+
				      '<input class="mesTags" type="text" placeholder="tag...">'+
				      '<label>Nom </label>'+
				      '<input <style="margin : 0; padding : 0" class="inputName" type="text" value='+ Media.value.nom +' placeholder="Nom de l"image..>'+
				     ' <label>Commentaire </label><textarea class="commentaireImg">'+Media.value.description+'</textarea>'+
				   '</div>'+
				'</div>');

				$('.mesTags').tagsInput();
				if(Media.value.tags.length > 0)
					$(".mesTags").importTags(Media.value.tags.toString());
				break;
			default :
				alert("problème type inconnu"); 
				break;
		}
	},

	resetMedia : function(){
		$(".ligneMedia").remove();
		$(".containImg").remove();
		$("#imgForm").show();
		$("#typeForm").val("image");
		$("#validationMedia").text("Valider")
		Media.value = {};
		Media.list = [];

		Media.getThread({}, function(j){
			$("#deleteMedia").prop("disabled", true);
			this.displayListMedia();
		}.bind(this));
	},

	fillSource : function(){
		if(this.modif){
			var monJSON =  Object.assign({}, Media.value);
			delete monJSON.data;
			$('#dialog-content').jsonViewer( monJSON );
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
			alert("Pas de média sélectionné");
		}
	}
};