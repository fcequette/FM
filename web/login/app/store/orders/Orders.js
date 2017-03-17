Ext.define('EternumPro.store.orders.Orders', {
	 extend: 'Ext.data.Store'
	,storeId: 'orders.Orders'
	,alias: 'store.orders'

	,fields: [
		 { name: 'desart', type: 'string' }
		,{ name: 'codalfa', type: 'string' }
		,{ name: 'max', type: 'int' }
		,{ name: 'volele', type: 'int' }
		,{ name: 'volumen', type: 'int' }
		,{ name: 'cantidad', type: 'int' }
	]

	,autoLoad: true
	,autoSync: true
	,pageSize: ''

	,proxy: {
		 type: 'localstorage'
		,id: 'orders'
		,limitParam: ''
	}
});
