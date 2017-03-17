Ext.define('EternumPro.view.main.MainController',{
	 extend: 'Ext.app.ViewController'
	,alias: 'controller.main'

	,onShow: function (view) {
		var me = this;

		if ( localStorage.getItem('customer') ) {
			// Cambio de card
			view.setActiveItem(1);
			// Cargo el historial de pedidos
			me.loadHistory();
		}

		me.lookupReference('customer').setPlaceHolder('Cargando...');
		Ext.getStore('Customers').load({
			params: {
				usrid: localStorage.getItem('EPW-UserID')
			}
			,callback: function () {
				me.lookupReference('customer').setPlaceHolder('Seleccionar...');
				me.lookupReference('customer').setDisabled(false);

				// Seteo los datos
				if ( localStorage.getItem('customer') ) me.lookupReference('customer').setValue(localStorage.getItem('customer'));
			}
		});
	}

	,loadLocals: function () {
		var me = this;

		if ( me.lookupReference('customer').getValue() === null ) return;

		me.lookupReference('local').setPlaceHolder('Cargando...');
		Ext.getStore('Locals').load({
			params: {
				 codigo: me.lookupReference('customer').getValue()
				,usrid: localStorage.getItem('EPW-UserID')
			}
			,callback: function () {
				me.lookupReference('local').setPlaceHolder('Seleccionar...');
				me.lookupReference('local').setDisabled(false);

				// Seteo los datos
				if ( localStorage.getItem('local') ) me.lookupReference('local').setValue(localStorage.getItem('local'));
			}
		});
	}

	,loadSections: function () {
		var me = this;

		if ( me.lookupReference('local').getValue() === null ) return;

		me.lookupReference('section').setPlaceHolder('Cargando...');
		Ext.getStore('Sections').load({
			params: {
				codlug: me.lookupReference('local').getValue()
			}
			,callback: function () {
				me.lookupReference('section').setPlaceHolder('Seleccionar...');
				me.lookupReference('section').setDisabled(false);

				// Seteo los datos
				if ( localStorage.getItem('section') ) me.lookupReference('section').setValue(localStorage.getItem('section'));
			}
		});
	}

	,enableContinue: function() {
		var me = this;

		me.getView().down('#continueBtn').setDisabled(false);
	}

	,doLogout: function () {
		EternumPro.util.OAuth.onLogout();
	}

	,confirmCustomer: function () {
		var me = this;

		me.getView().setActiveItem(1);

		// Guardo datos del Cliente
		localStorage.setItem('customer', me.lookupReference('customer').getValue());
		localStorage.setItem('local', me.lookupReference('local').getValue());
		localStorage.setItem('section', me.lookupReference('section').getValue());

		// Cargo el historial de pedidos
		me.loadHistory();
	}

	,loadHistory: function() {
		var me = this;

		// Cargo el historial de pedidos
		Ext.cq1('history').getStore().load({
			params: {
				 codigo: parseInt(localStorage.getItem('customer'))
				,lugent: parseInt(localStorage.getItem('local'))
			}
			,callback: function () {
				//me.lookupReference('section').setPlaceHolder('Seleccionar...');
				//me.lookupReference('section').setDisabled(false);

				// Cargo las familias de productos que luego carga el listado de productos
				Ext.getStore('Families').load();
			}
		});
	}

	,doNext: function (btn) {
		Ext.getCmp('pedidos').push({
			 xtype: 'formpanel'
			,title: 'Completar datos'
			,cls: 'hideTitleBar'
			,layout: 'fit'
			,items: [
				{
					 xtype: 'textareafield'
					,label: 'Observaciones'
					,labelAlign: 'top'
					,name: 'observations'
					,placeHolder: 'Escriba alguna observación de ser necesario...'
					,autoCorrect: true
					,height: 400
				}
			]
			,listeners: {
				painted: function () {
					btn.up('navigationview').getDockedItems()[0].query('button')[2].show();
					btn.up('navigationview').getDockedItems()[0].query('button')[3].hide();
				}
			}
		});

		btn.hide();
		btn.up('navigationview').getDockedItems()[0].query('button')[2].show();
	}

	,doNext2: function (btn) {
		var values = btn.up('navigationview').getActiveItem().getValues();

		Ext.getCmp('pedidos').push({
			 xtype: 'panel'
			,title: 'Resumen'
			,cls: 'hideTitleBar'
			,layout: 'vbox'
			,items: [
				{
					 xtype: 'textareafield'
					,label: 'Observaciones'
					,labelAlign: 'top'
					,name: 'observations'
					,value: values.observations
					,readOnly: true
				}
				,{
					 xtype: 'list'
					,store: {type: 'orders'}
					,flex: 1
					,itemTpl: '<div class="product"><strong>{desart}</strong><br />Cantidad: {cantidad}</div>'
					,emptyText: 'No tiene ningún pedido en curso...'
					,indexBar: false
					,grouped: false
					,striped: true
					,variableHeights: true
					,items: [
						{
							 xtype: 'toolbar'
							,docked: 'top'
							,title: 'Productos'
						}
					]
				}
			]
		});

		btn.hide();
		btn.up('navigationview').getDockedItems()[0].query('button')[3].show();
	}

	,doConfirm: function (btn) {
		var me = this;

		Ext.Msg.confirm('Confirmar','¿Está seguro que desea confirmar el pedido?',function (btnId) {
			if (btnId === 'yes') {
				var renglones = [];
				Ext.getStore('orders.Orders').each(function(pedido) {
					renglones.push({
						 codart: pedido.get('codalfa')
						,valatr1: 'null'
						,valatr2: 'null'
						,valatr3: 'null'
						,valatr4: 'null'
						,volumen: pedido.get('volumen').toString()
						,cantidad: pedido.get('cantidad').toString()
						,precio: 'null'
					});
				});

				var pedido = Ext.encode({
					cabecera: [
						{
							 codigo: localStorage.getItem('customer')
							,codlug: localStorage.getItem('local')
							,seccion: localStorage.getItem('section')
							,usrid: localStorage.getItem('EPW-UserID')
							,detalle: btn.up('navigationview').getActiveItem().down('[name="observations"]').getValue()
						}
					]
					,renglones: renglones
				});

				// Hago el request al servidor
				Ext.Ajax.request({
					 url: '/cgi-bin/putPedido.cgi'
					,method: 'POST'
					,cors: true
					,params: {
						pedido: pedido
					}
					,success: function(response, opts) {
						var json = Ext.decode(response.responseText);

						if ( json.success ) {
							Ext.getCmp('pedidos').getDockedItems()[0].query('button')[0].hide();
							Ext.getCmp('pedidos').getDockedItems()[0].query('button')[1].hide();
							Ext.getCmp('pedidos').getDockedItems()[0].query('button')[2].hide();
							Ext.getCmp('pedidos').getDockedItems()[0].query('button')[3].hide();
							Ext.getCmp('pedidos').pop(2);
							Ext.getStore('orders.Orders').removeAll();
							btn.hide();

							me.getView().down('tabpanel').setActiveItem(0);
							me.getView().setActiveItem(0);

							me.getView().lookupReference('section').reset();

							me.getView().down('#continueBtn').setDisabled(true);
						} else {
							Ext.Msg.show({
								 title: 'ERROR'
								,message: 'No se pudo completar su pedido. Intente nuevamente y si el problema persiste, contáctese con la empresa.'
								,icon: Ext.MessageBox.ERROR
								,buttons: Ext.MessageBox.OK
							});
						}
					}
					,failure: function(response, opts) {
						Ext.Msg.show({
							 title: 'ERROR'
							,message: 'No se pudo completar su pedido. Intente nuevamente y si el problema persiste, contáctese con la empresa.'
							,icon: Ext.MessageBox.ERROR
							,buttons: Ext.MessageBox.OK
						});
					}
				});
			}
		});
	}
});
