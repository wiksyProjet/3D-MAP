$(document).ready(function(){

	$(".drop").droppable({
	    drop:function(event, ui){
	        ui.draggable.remove();
	    }
	})

	$( "#deletefile" ).droppable({
		drop : function(event, ui){
			ui.draggable.fadeOut("slow", function(){
				$("#targetUpdate").css("color", "black");
				$(this).parent().parent().remove();
				ui.draggable.remove();
			});
		}
	});

	/*	
	* Changement border lorsqu'on passe le fichier dessus
	*/
	$(document).on('dragenter', '.drop', function() {
		$(this).css('border', '3px dashed red');
		return false;
	});

	$(document).on('dragover', '.drop', function(e){
		e.preventDefault();
		e.stopPropagation();
		$(this).css('border', '3px dashed red');
		return false;
	});


//On reactualise la couleur de la bordure
$(document).on('dragleave', '.drop', function(e) {
	e.preventDefault();
	e.stopPropagation();
	$(this).css('border', '3px dashed #BBBBBB');
	return false;
});

	//Lorsqu'on ajoute un fichier, on appel la fonction upload qui va récupérer l'image
	$(document).on('drop', '#dropfile', function(e) {
		if(e.originalEvent.dataTransfer){
			if(e.originalEvent.dataTransfer.files.length) {
				e.preventDefault();
				e.stopPropagation();
				$(this).css('border', '3px dashed green');
	           // Main function to upload
	           upload(e.originalEvent.dataTransfer.files);
	       }
	   }
	   else {
	   	$(this).css('border', '3px dashed #BBBBBB');
	   }
	   return false;
	});

	$("#uploadimg").change(function(evt){
		var files = evt.target.files; // FileList object
		for (var i = 0, f; f = files[i]; i++) {
			var reader = new FileReader();
			reader.onload = function (event) {
				$("#targetUpdate").css("color", "black");
				ajoutFile(event.target.result);
				nowYouCanDrag();
			}
			reader.readAsDataURL(f);
		}


		$("#uploadimg").val('');
	});

	$(document).on("change", "#changeImg", function(evt){
		var files = evt.target.files; // FileList object
		for (var i = 0, f; f = files[i]; i++) {
			var reader = new FileReader();
			reader.onload = function (event) {
				$(".mesimages").attr("src", event.target.result);
			}
			reader.readAsDataURL(f);
		}


		$("#changeImg").val('');
	});
});



//Ouvre un flux de lecture et récupère l'image puis appel la fonction ajoutFile.
function upload(files) {
	for (var i = 0, f; f = files[i]; i++) {
		var reader = new FileReader();
		reader.onload = function (event) {
			$("#targetUpdate").css("color", "black");
			ajoutFile(event.target.result);
			nowYouCanDrag();
		}
		reader.readAsDataURL(f);
	}
}

//On ajoute une div <img> qui contiendra l'image dans la file d'attente
//Plutôt que de stocker avec un tableau, on va se servir du DOM
function ajoutFile(data){
	$('.file').append("<div class='containImg'>"+
		"<div class='groupImg'>"+
		"<img class='mesimages' src='"+data+"'></div> "+
		"<div class='groupTag'>"+
		"<input class='mesTags' type='text' placeholder='tag...'>"+
		"<input class='inputName' type='text' placeholder='Nom de l'image..>"+
		"<textarea class='commentaireImg' placeholder='Commentaire..'></textarea></div></div>");

		$('.mesTags').tagsInput();
}

function nowYouCanDrag(){
	$( ".file img" ).draggable({
		revert : true
	});
}