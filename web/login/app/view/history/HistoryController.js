Ext.define('EternumPro.view.history.HistoryController', {
	 extend: 'Ext.app.ViewController'
	,alias: 'controller.history'

	,onItemTap: function (list, index, target, record, e) {
		Ext.getCmp('historial').push({
			 xtype: 'history_orders'
			,title: record.get('numorig')
		});

		Ext.getStore('Orders').load({
			params: {
				 codemp: record.get('codemp')
				,codcom: record.get('codcom')
				,codtal: record.get('codtal')
				,numero: record.get('numero')
			}
		});
	}
});
