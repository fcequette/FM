Ext.define('EternumPro.view.main.Main', {
	 extend: 'Ext.navigation.View'
	,xtype: 'app-main'

	,requires: [
		 'EternumPro.view.main.MainController'
		,'EternumPro.view.main.MainModel'
		,'EternumPro.view.history.History'
		,'EternumPro.view.products.Products'
		,'EternumPro.view.orders.Orders'
		,'EternumPro.view.profile.Profile'
	]

	,controller: 'main'
	,viewModel: 'main'

	,navigationBar: false
	,items: [
		{
			 xtype: 'formpanel'
			,layout: 'vbox'
			,bodyPadding: 20
			,items: [
				{
					 xtype: 'container'
					,flex: 1
				}
				,{
					 xtype: 'selectfield'
					,label: 'Cliente'
					,labelAlign: 'top'
					,name: 'customer'
					,reference: 'customer'
					,placeHolder: 'Seleccionar...'
					,store: 'Customers'
					,displayField: 'razsoc'
					,valueField: 'codigo'
					//,value: localStorage.getItem('customer')
					,autoSelect: false
					,disabled: true
					,defaultPhonePickerConfig: {
						 cancelButton: 'Cancelar'
						,doneButton: 'Listo'
					}
					,listeners: {
						change: 'loadLocals'
					}
				}
				,{
					 xtype: 'selectfield'
					,label: 'Domicilio de entrega'
					,labelAlign: 'top'
					,name: 'local'
					,reference: 'local'
					,placeHolder: 'Seleccionar...'
					,store: 'Locals'
					,displayField: 'descri'
					,valueField: 'codlug'
					//,value: localStorage.getItem('local')
					,autoSelect: false
					,disabled: true
					,defaultPhonePickerConfig: {
						 cancelButton: 'Cancelar'
						,doneButton: 'Listo'
					}
					,listeners: {
						change: 'loadSections'
					}
				}
				,{
					 xtype: 'selectfield'
					,label: 'Sección'
					,labelAlign: 'top'
					,name: 'section'
					,reference: 'section'
					,placeHolder: 'Seleccionar...'
					,store: 'Sections'
					,displayField: 'descri'
					,valueField: 'codclas'
					//,value: localStorage.getItem('section')
					,autoSelect: false
					,disabled: true
					,defaultPhonePickerConfig: {
						 cancelButton: 'Cancelar'
						,doneButton: 'Listo'
					}
					,listeners: {
						change: 'enableContinue'
					}
				}
				,{
					 xtype: 'container'
					,flex: 1
				}
				,{
					 xtype: 'segmentedbutton'
					,docked: 'bottom'
					,allowToggle: false
					,items: [
						{
							 xtype: 'button'
							,text: 'Salir'
							,ui: 'decline'
							,flex: 1
							,handler: 'doLogout'
						}
						,{
							 xtype: 'button'
							,text: 'Continuar'
							,itemId: 'continueBtn'
							,ui: 'confirm'
							,flex: 1
							,disabled: true
							,handler: 'confirmCustomer'
						}
					]
				}
			]
		}
		,{
			 xtype: 'tabpanel'
			,tabBarPosition: 'bottom'
			,defaults: {
				tab: { iconAlign: 'top' }
			}
			,items: [
				{
					 title: 'Historial'
					,id: 'historial'
					,xtype: 'navigationview'
					,iconCls: 'x-fa fa-history'
					,defaultBackButtonText: 'Volver'
					,navigationBar: { animation: false }
					,items: [
						{
							xtype: 'history'
						}
					]
				},
				{
					 title: 'Productos'
					,id: 'productos'
					,xtype: 'navigationview'
					,iconCls: 'x-fa fa-list'
					,defaultBackButtonText: 'Volver'
					,navigationBar: { animation: false }
					,items: [
						{
							xtype: 'products'
						}
					]
				},
				{
					 title: 'Pedido'
					,id: 'pedidos'
					,xtype: 'navigationview'
					,iconCls: 'x-fa fa-cube'
					,defaultBackButtonText: 'Volver'
					,items: [
						{
							xtype: 'orders'
						}
					]
					,navigationBar: {
						 animation: false
						,items: [
							{
								 xtype: 'button'
								,text: 'Siguiente'
								,align: 'right'
								,ui: 'forward'
								,handler: 'doNext'
								,hidden: true
							}
							,{
								 xtype: 'button'
								,text: 'Siguiente'
								,align: 'right'
								,ui: 'forward'
								,handler: 'doNext2'
								,hidden: true
							}
							,{
								 xtype: 'button'
								,text: 'Confirmar'
								,align: 'right'
								,ui: 'confirm-forward'
								,handler: 'doConfirm'
								,hidden: true
							}
						]
					}
				}
				,{
					 title: 'Perfil'
					,xtype: 'profile'
					,iconCls: 'x-fa fa-user'
				}
			]
		}
	]

	,listeners: {
		show: 'onShow'
	}
});
