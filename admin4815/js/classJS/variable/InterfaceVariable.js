var InterfaceVariable = {
	modif : false,

	resetVariable : function(){
		$(".selected").removeClass("selected");
		$("#deleteLigneVariable").prop("disabled", true);
		InterfaceVariable.modif = false;
		$("#validationVariable").text("Valider");
		$("#variableClef").val("");
		$("#variableValue").siblings(".trumbowyg-editor").html("");
		$(".ligneVariable").remove();
		Variable.get({}, function(j){
			this.displayListVariable();
		}.bind(this));
	},

	displayListVariable : function(){
		Variable.value.forEach(function(elem){
			$("#tableVariable").append(
				this.cloneDOM('modelTabVariable', {
					".clefTabVariable" : '<div data-id="'+elem["ID"]+'" class="cell">' + elem["key"] + '</div>',
					".descTabVariable" : elem["desc"]
				})
			);
		}.bind(this));

		this.alterLineColor();
	},

	jsonToForm : function(){
		$("#variableClef").val(Variable.valVariable.key);
		$("#variableDesc").val(Variable.valVariable.desc);
		$("#variableValue").siblings(".trumbowyg-editor").html(Variable.valVariable.value);
	},

	cloneDOM : function(modelID, json){
		var content = $("#"+modelID).clone().removeAttr('id').addClass("ligneVariable").show();
		for (key in json) {
			$(content).find( key ).html( json[key] );
		}
		return content;
	},

	alterLineColor: function(){
		$(".ligneVariable").each(function(i) {
			if(i%2) {
				$(this).css("background-color", "#daf3f9");
			}
		})
	}
}