var publicSite = (document.domain) ? document.location.origin : 'http://pf-01.lab.parisdescartes.fr:1305';
var JNTP = {

	uri : publicSite+'/jntp/',
	authentified : false,
	Storage: {
		Session: ''
	},
	execute : function(cmd, callback, xhrInPool) {
		$.ajax({
			type: 'POST',
			url: this.uri,
			dataType: 'json',
			headers: { 'JNTP-Session': this.Storage.Session },
			data: JSON.stringify(cmd),
	 	})
	 	.done(function(data, textStatus, xhr) {
			this.donnees = data;
			if(cmd[0] == "auth") {
				JNTP.initSession(cmd, data);
			}
			if(cmd[0] == "quit"){
				JNTP.deleteSession();
			}
			if(callback) callback(data);
		})
		.fail(function(error){
			console.error("Error : Unable to connect to the server !",  JSON.stringify(error));
		});
	},
	initSession: function(cmd, data){
		switch(data.code) {
		case "200":
			JNTP.Storage.Session = data.body.Session;
			JNTP.Storage.mail = data.body.mail;
			JNTP.Storage.nom = data.body.nom;
			JNTP.Storage.privilege = data.body.privilege;
			JNTP.authentified = true;
		break;
		case "400":
			JNTP.Storage.Session = false;
			JNTP.authentified = false;
		break;
		}
	},
	deleteSession(){
		JNTP.Storage.Session = false;
		JNTP.authentified = false;
		JNTP.Storage.mail =  "";
		JNTP.Storage.nom = "";
		JNTP.Storage.privilege =  "";
	},
	auth : function(){
		JNTP.execute(["auth", {isAuth : ""}], function(j){
			if(j.code=="200"){
				$('#auth').css("display", "none");
				if(JNTP.Storage.privilege=="Administrateur"){
					init();
				}
			}
		})
	}
}

