var User = {
	value : {},
	list : [],

	getThread : function(filter, callback) {
		JNTP.execute(["get", {"filter" : filter, "collection" : "user"}], function(j){
			this.list = j.body;
			if (callback) callback(j);
		}.bind(this));
	},

	get : function(filter, callback) {
		JNTP.execute(["get", {"filter" : filter, "collection" : "user"}], function(j){
			this.value = j.body[0];
			if (callback) callback(j);
		}.bind(this));
	},

	deleteUser : function(ID){
		if(InterfaceUser.modif){
			JNTP.execute( [ "delete", { "collection":"user", "ID": ID } ], function(e) {
				InterfaceUser.resetUser();
				InterfaceUser.alertMsg(e.info);
			}.bind(this));
		}
	},

	setUser(){
		if(InterfaceUser.modif){
			this.value.ID = parseInt($(".selected").parent().find(".nomUser").find(".cell").attr("data-id"));
			JNTP.execute(["setUser", {"update" : this.value}], function(j){
				InterfaceUser.resetUser();
				InterfaceUser.alertMsg(j.info);
			}.bind(this));
		}
		else{
			JNTP.execute(["setUser", {"new" : this.value}], function(j){
				InterfaceUser.resetUser();
				InterfaceUser.alertMsg(j.info);
			}.bind(this));
		}
	},

	formToJson : function(){
		this.value = {};
		$("#formUser").find("input").each(function(index, elem){
			this.value[$(elem).attr("name")] = $(elem).val();
		}.bind(this));

		$("#formUser").find("select").each(function(index, elem){
			this.value[$(elem).attr("name")] = $(elem).val();
		}.bind(this));
	},

	passwordToJson: function(){
		this.value = {};
		this.value.password = $("#newMdpUser").val();
	},

	decryptMdp : function(mdp){
		JNTP.execute(["decrypt", {"data" : mdp}], function(j){
			InterfaceUser.alertMsg(j.body);
		}.bind(this));
	}
};