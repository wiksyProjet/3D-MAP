var InterfaceUser = {
	modif : false,

	alterLineColor: function(){
		$(".ligneUser").each(function(i) {
			if(i%2) {
				$(this).css("background-color", "#daf3f9");
			}
		})
	},

	displayListUser : function(){
		User.list.forEach(function(elem){
			nom =  elem["nom"] ? elem["nom"] : '<span style="color:#ffb732" class="glyphicon glyphicon-remove"></span>';
			email = elem["email"] ? elem["email"] : '<span style="color:red" class="glyphicon glyphicon-remove"></span>';
			privilege = elem["privilege"] ? elem["privilege"] : '<span style="color:red" class="glyphicon glyphicon-remove"></span>';

			$("#tableUser").append(
				this.cloneDOM('modelUser', {
					".nomUser" : '<div data-id="'+elem["ID"]+'" class="cell">' + nom + '</div>',
					".mailUser" : email,
					".priviUser" : privilege
				})
				);
		}.bind(this));

		this.alterLineColor();
	},

	cloneDOM : function(modelID, json){
		var content = $("#"+modelID).clone().removeAttr('id').addClass("ligneUser").show();
		for (key in json) {
			$(content).find( key ).html( json[key] );
		}
		return content;
	},

	userToForm : function(){
		$("#formUser").find("input").each(function(index, elem){
			$(elem).val(User.value[$(elem).attr("name")]);
		}.bind(this));
		$('#showMdpUser').attr('value', User.value.password);
		$("#formUser").find("select").each(function(index, elem){
			$(elem).val( User.value[ $(elem).attr("name") ] );
		});
	},

	resetUser : function(){
		$("#mdpSettings").fadeOut("fast");		
		$(".ligneUser").remove();
		User.getThread( {}, function(j){
			this.displayListUser();
		}.bind(this));

		$("#formUser").find("input").each(function(index, elem){
			$(this).val("");
		});

		$("#formUser").find("select").each(function(index,elem){
			$(this).val("Administrateur");
		});

		$("#validationUser").text("valider");
	},

	alertMsg : function(message){
		$('#dialog-content').html(message);
		$( "#dialog" ).dialog({
			active : true,
			autoOpen: true,
			width: 300,
		});
	},

	fillSource : function(){
		User.formToJson();
		$('#dialog-content').jsonViewer( User.value );
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
};