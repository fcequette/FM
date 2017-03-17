Ext.define('EternumPro.view.login.LoginController', {
	 extend: 'Ext.app.ViewController'
	,alias: 'controller.login'

	,doIngresar: function( btn ) {
		var me = this;

		me.getView().push({
			 xtype: 'panel'
			,title: 'Espere por favor...'
			,cls: 'hideTitleBar loader'
			,items: [
				{
					 xtype: 'button'
					,ui: 'decline'
					,text: 'Cancelar'
					,docked: 'bottom'
					,handler: 'doCancelar'
				}
			]
		});

		Ext.select('.login .x-button-back').hide();

		var form = me.getView().down('formpanel');
		console.log(form.getValues());

		// Me logueo y obtengo el AccessToken y RefreshToken
		Ext.Ajax.request({
			 url: '/api/oauth'
			,method: 'POST'
			,headers: { 'Content-Type': 'application/json' }
			,jsonData: form.getValues()
			,callback: function(opt, success, response) {
				var json = Ext.decode(response.responseText);

				if ( response.status === 200 ) {
					// Obtengo el perfil del usuario
					Ext.Ajax.request({
						 url: '/api/profile/data'
						,method: 'POST'
						,headers: {
							 'Content-Type': 'application/json'
							,'Authorization': 'Bearer '+json.access_token
						}
						,callback: function(opt, success, response) {
							var json2 = Ext.decode(response.responseText);

							var statusCode = development ? 200 : 201;
							if ( response.status === statusCode && json2.success ) {
								localStorage.setItem('EPW-UserID', json2.iduser);
								localStorage.setItem('EPW-UserFIRST', json2.firstname);
								localStorage.setItem('EPW-UserLAST', json2.lastname);
								localStorage.setItem('EPW-UserSEX', json2.sex);

								// Guardo el AccessToken y el RefreshToken
								localStorage.setItem('EPW-AccessToken', json.access_token);
								localStorage.setItem('EPW-RefreshTOKEN', json.refresh_token);
								localStorage.setItem('EPW-ExpireOAUTH', json.expires_in);

								// Remove Login Window
								me.getView().destroy();

								// Add the main view to the viewport
								Ext.Viewport.add({
									xtype: 'app-main'
								});

								Ext.cq1('profile').getViewModel().setConfig('data', {
									 picture: localStorage.getItem('EPW-UserSEX') === '' ? 'resources/unknown.png' : ('resources/'+localStorage.getItem('EPW-UserSEX')+'.png')
									,firstname: localStorage.getItem('EPW-UserFIRST')
									,lastname: localStorage.getItem('EPW-UserLAST')
								});
							}
						}
						,failure: function(response, action) {
							me.getView().push({
								 xtype: 'panel'
								,title: 'Hubo un problema...'
								,cls: 'hideTitleBar'
								,bodyPadding: 30
								,html: 'Surgió un problema a la hora de obtener su perfil.'
								,items: [
									{
										 xtype: 'button'
										,ui: 'action'
										,text: 'Volver'
										,docked: 'bottom'
										,handler: 'doVolver'
									}
								]
							});
						}
					});
				}
			}
			,failure : function(response, action) {
				var json = Ext.decode(response.responseText);
				me.getView().push({
					 xtype: 'panel'
					,title: 'Hubo un problema...'
					,cls: 'hideTitleBar'
					,bodyPadding: 30
					,html: json.detail ? json.detail : 'Los datos ingresados no coinciden con los de la Base de Datos.'
					,items: [
						{
							 xtype: 'button'
							,ui: 'action'
							,text: 'Volver'
							,docked: 'bottom'
							,handler: 'doVolver'
						}
					]
				});
			}
		});
	}

	,doCancelar: function( btn ) {
		var me = this;

		me.getView().pop();
	}

	,doVolver: function( btn ) {
		var me = this;

		me.getView().pop(2);
	}
});
