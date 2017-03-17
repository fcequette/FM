Ext.define('EternumPro.view.orders.OrdersController', {
	 extend: 'Ext.app.ViewController'
	,alias: 'controller.orders'

	,onPainted: function( el ) {
		var me = this;

		var view = me.getView();

		view.down('list').getStore().load();

		if ( view.down('list').getStore().getCount() > 0 ) {
			view.up('navigationview').getDockedItems()[0].query('button')[1].show();
		} else {
			view.up('navigationview').getDockedItems()[0].query('button')[1].hide();
		}

		view.up('navigationview').getDockedItems()[0].query('button')[2].hide();
		view.up('navigationview').getDockedItems()[0].query('button')[3].hide();
	}

	,onItemTapHold: function( list, index, target, record, e ) {
		var me = this;

		var actions = Ext.create('Ext.ActionSheet', {
			items: [
				{
					 xtype: 'toolbar'
					,title: record.get('desart')
					,margin: '0 0 10 0'
				}
				,{
					 text: 'Modificar cantidad'
					,ui: 'action'
					,scope: me
					,handler: function() {
						actions.hide();
						Ext.Msg.prompt(
							 'Modificar Producto'
							,record.get('desart')
							,function ( btnId, value ) {
								if ( btnId === 'ok' ) {
									record.set({
										 volumen: parseInt(value)
										,cantidad: parseInt(value) * record.get('volele')
									});
									Ext.getStore('orders.Orders').commitChanges();
									Ext.getStore('orders.Orders').reload();
								}
							}
							,me
							,false
							,record.get('volumen')
							,{
								 xtype: 'spinnerfield'
								,minValue: 1
								,maxValue: record.get('max')
								,stepValue: 1
							}
						);
					}
				}
				,{
					 text: 'Borrar Producto'
					,ui: 'decline'
					,scope: me
					,handler: function( btn ) {
						actions.hide();
						Ext.Msg.confirm('CONFIRMAR', '¿Está seguro que desea borrar el producto del pedido?', function( btnId ) {
							if ( btnId === 'yes' ) {
								Ext.getStore('orders.Orders').remove(record);
								Ext.getStore('orders.Orders').commitChanges();
								Ext.getStore('orders.Orders').reload();
							}
						});
					}
				}
				,{
					 xtype: 'button'
					,text: 'Cancelar'
					,scope: me
					,handler: function() {
						actions.hide();
					}
				}
			]
		});

		Ext.Viewport.add(actions);
		actions.show();
	}
});
