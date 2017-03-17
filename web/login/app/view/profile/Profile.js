Ext.define('EternumPro.view.profile.Profile', {
	 extend: 'Ext.Panel'
	,xtype: 'profile'

	,requires: [
		 'EternumPro.view.profile.ProfileController'
		,'EternumPro.view.profile.ProfileModel'

		,'Ext.Img'
	]

	,controller: 'profile'
	,viewModel: 'profile'

	,cls: 'profile'

	,items: [
		{
			 xtype: 'container'
			,layout: {
				 type: 'hbox'
				,pack: 'center'
			}
			,cls: 'picture'
			,items: [
				{
					 xtype: 'img'
					,width: 128
					,height: 128
					,margin: 20
					,bind: {
						 src: '{picture}'
					}
				}
			]
		}
		,{
			 xtype: 'container'
			,flex: 1
			,items: [
				{
					 xtype: 'textfield'
					,label: 'Nombre'
					,labelAlign: 'top'
					,bind: { value: '{firstname}' }
					,readOnly: true
				}
				,{
					 xtype: 'textfield'
					,label: 'Apellido'
					,labelAlign: 'top'
					,bind: { value: '{lastname}' }
					,readOnly: true
				}
			]
		}
		,{
			 xtype: 'segmentedbutton'
			,docked: 'bottom'
			,allowToggle: false
			,items: [
				{
					 xtype: 'button'
					,text: 'Cambiar Cliente'
					,handler: 'doChangeCustomer'
					,flex: 1
				}
				,{
					 xtype: 'button'
					,ui: 'decline'
					,text: 'Salir'
					,handler: 'doLogout'
					,flex: 1
				}
			]
		}
	]
});
