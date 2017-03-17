Ext.define('EternumPro.view.login.Login', {
	 extend: 'Ext.navigation.View'
	,xtype: 'app-login'

	,requires: [
		 'Ext.navigation.View'

		,'EternumPro.view.login.LoginController'
		,'EternumPro.view.login.LoginModel'
	]

	,controller: 'login'
	,viewModel: 'login'

	,cls: 'login'
	,defaultBackButtonText: 'Volver'
	,items: [
		{
			 title: 'Bienvenido'
			,xtype: 'formpanel'
			,cls: 'hideTitleBar'
			,layout: 'vbox'
			,bodyPadding: 30
			,items: [
				{
					 xtype: 'container'
					,cls: 'logo'
					,flex: 1
				}
				,{
					 xtype: 'fieldset'
					,title: 'Ingrese sus credenciales'
					,instructions: 'Si tiene problemas, contáctese con la empresa.'
					,defaults: {
						labelWidth: 110
					}
					,items: [
						{
							 xtype: 'textfield'
							,label: 'Usuario'
							,labelAlign: 'left'
							,width: '100%'
							,name: 'username'
							,allowBlank: false
						}
						,{
							 xtype: 'textfield'
							,label: 'Contraseña'
							,labelAlign: 'left'
							,width: '100%'
							,inputType: 'password'
							,name: 'password'
							,allowBlank: false
						}
						,{
							 xtype: 'hiddenfield'
							,name: 'grant_type'
							,value: 'password'
						}
						,{
							 xtype: 'hiddenfield'
							,name: 'client_id'
							,value: 'eternumpro'
						}
					]
				}
				,{
					 xtype: 'container'
					,flex: 1
				}
				,{
					 xtype: 'button'
					,ui: 'confirm'
					,text: 'Ingresar'
					,docked: 'bottom'
					,handler: 'doIngresar'
					,formBind: true
				}
			]
		}
	]
});
