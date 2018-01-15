var Variable = {
	value : [],
	valVariable : {},

	/*Récupère la liste des variables*/
	get : function(filter, callback) {
		JNTP.execute(["get", {"filter" : filter, "collection" : "variable"}], function(j){
			this.value = j.body;
			if(callback)
				callback();
		}.bind(this));
	},

	getVal : function(filter, callback){
		JNTP.execute(["get", {"filter" : filter, "collection" : "variable"}] , function(j){
			this.valVariable = j.body[0];
			if(callback)
				callback();
		}.bind(this));
	},

	deleteVariable : function(ID){
		if(InterfaceVariable.modif){
			JNTP.execute( [ "delete", { "collection":"variable", "ID": ID } ], function(e) {
				InterfaceVariable.resetVariable();
				InterfaceUser.alertMsg(e.info);
			}.bind(this));
		}
	},


	/*Vérifie la validité du formulaire*/
	isValid : function(){
		return true;
	},

	setVariable : function(){
		this.formToJSON();
		if(this.isValid()){
			if(!InterfaceVariable.modif){
				JNTP.execute(["setVariable", {"new" : this.valVariable}], function(j){
					InterfaceVariable.resetVariable();
					InterfaceUser.alertMsg(j.info);
				}.bind(this))
			}
			else{
				JNTP.execute(["setVariable", {"update" : this.valVariable}], function(j){
					InterfaceVariable.resetVariable();
					InterfaceUser.alertMsg(j.info);
				}.bind(this))
			}
		}
	},

	formToJSON : function(){
		monJson = {
			"key" : $("#variableClef").val(),
			"desc" : $("#variableDesc").val(),
			"value" : $("#variableValue").siblings(".trumbowyg-editor").html()
		}

		if(InterfaceVariable.modif){
			monJson["ID"] = this.valVariable.ID;
		}

		this.valVariable = monJson;
	}
}