var Media = {
	value : {},
	list : [],

	get : function(filter, callback) {
		JNTP.execute(["get", {"filter" : filter, "collection" : "media"}], function(j){
			this.value = j.body[0];
			if (callback) callback(j);
		}.bind(this));
	},

	getThread : function(filter, callback) {
		JNTP.execute(["get", {"filter" : filter, "collection" : "media"}], function(j){
			this.list = j.body;
			if (callback) callback(j);
		}.bind(this));
	},

	setImg : function(listImg){
		$("#loaderImgContainer").fadeIn("fast");
		if(!InterfaceMedia.modif){
			JNTP.execute(["setMedia", {"new" : listImg}], function(j){
				$("#loaderImgContainer").fadeOut("fast");
				InterfaceUser.alertMsg(j.info);
				InterfaceMedia.resetMedia();
			}.bind(this));
		}
		else{
			listImg[0].ID = parseInt($(".selected").parent().find(".nomMedia").find(".cell").attr("data-id"));
			JNTP.execute(["setMedia", {"update" : listImg[0]}], function(j){
				$("#loaderImgContainer").fadeOut("fast");
				InterfaceUser.alertMsg(j.info);
				InterfaceMedia.resetMedia();
			}.bind(this));
		}
	},

	deleteMedia : function(listImg){
		if(InterfaceMedia.modif){
			var ID = parseInt($(".selected").parent().find(".nomMedia ").find(".cell").attr("data-id"));
			JNTP.execute( [ "delete", { "collection":"media", "ID": ID } ], function(e) {
				InterfaceMedia.resetMedia();
			}.bind(this));
		}
	}
};