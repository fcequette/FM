Ext.define('EternumPro.util.OAuth', {
	 singleton: true
	/**
	 * Metodo que se ejecuta cuando el access token expira
	 */
	,refreshToken: function() {
		var myObj = {
			 grant_type : 'refresh_token'
			,refresh_token: localStorage.getItem('EPW-RefreshTOKEN')
			,client_id: 'eternumpro'
		};
		Ext.Ajax.request({
			 url: '/api/oauth'
			,method: 'POST'
			,jsonData: myObj
			,callback: function(opt, success, response) {
				if ( response.status === 200 ) {
					var json = Ext.decode(response.responseText);
					localStorage.setItem('EPW-AccessToken',json.access_token);
					localStorage.setItem('EPW-RefreshTOKEN',json.refresh_token);
					var today= new Date();//fecha actual
					var expiration= json.expires_in-600; // tomo el token y le resto lo que deseo restar de tiempo 1 minuto
					var dateExpiration =Ext.Date.add( today, Ext.Date.SECOND, expiration);//fecha actual mas expiracion
					localStorage.setItem('EPW-DateExpiration',dateExpiration); // guardo en localStorage
				}
			}
			,failure : function(opt, success, response) {
				Ext.Msg.show({
					 title:'Error'
					,message: 'Se ha producido un error de autenticaciÃ³n, deberÃ¡ ingresar nuevamente '
					,buttons: Ext.Msg.OK
					,icon: Ext.Msg.WARNING
					,fn: function(btn) {
						if (btn === 'ok') {
							EPW.util.OAuth.onLogout();
						}
					}
				});
			}
		});
	}

	/**
	* Metodo que se ejecuta cuando se cierra la sesion del usuario
	*/
	,onLogout: function() {
		var mask = Ext.Viewport.add({
			masked: {
				 xtype: 'loadmask'
				,message: 'Saliendo...'
			}
		}).show();

		Ext.Ajax.request({
			 url: '/api/oauth/revocation/'+localStorage.getItem('EPW-AccessToken')
			,method: 'DELETE'
			,headers: {
				 'Content-Type': 'application/json'
				,'Authorization': 'Bearer '+localStorage.getItem('EPW-AccessToken')
			}
			,callback: function(opt, success, response) {
				mask.destroy();
				localStorage.clear();

				// Remove Login Window
				Ext.cq1('app-main').destroy();

				// Add the main view to the viewport
				Ext.Viewport.add({
					xtype: 'app-login'
				});
			}
		});
	}
});
