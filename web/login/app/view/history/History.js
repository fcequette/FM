Ext.define('EternumPro.view.history.History', {
	 extend: 'Ext.grid.Grid'
	,xtype: 'history'

	,requires: [
		 'EternumPro.view.history.HistoryController'
		,'EternumPro.view.history.HistoryModel'
		,'EternumPro.store.history.History'
		,'EternumPro.view.history.Orders'
	]

	,controller: 'history'
	,viewModel: 'history'

	,title: 'Historial de Pedidos'

	,cls: 'hideTitleBar'

	,store: { type: 'history' }

	,columns: [
		 { text: 'Fecha', xtype: 'datecolumn', dataIndex: 'fecha', width: 80, format: 'd-m' }
		,{ text: 'Factura',  dataIndex: 'numorig', flex: 1 }
	]

	,listeners: {
		itemtap: 'onItemTap'
	}
});
