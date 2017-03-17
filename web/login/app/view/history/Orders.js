Ext.define('EternumPro.view.history.Orders', {
	 extend: 'Ext.grid.Grid'
	,xtype: 'history_orders'

	,requires: [
		'EternumPro.store.history.Orders'
	]

	,controller: 'history_orders'
	,viewModel: 'history_orders'

	,cls: 'hideTitleBar'

	,store: { type: 'history_orders' }

	,columns: [
		 { text: 'Nombre de Producto', dataIndex: 'desart', flex: 1 }
		,{ text: 'Cantidad', dataIndex: 'cantidad', width: 90, xtype: 'numbercolumn', format: '0', align: 'right', sortable: false }
	]
});
