Ext.define('EternumPro.store.history.Orders', {
	 extend: 'Ext.data.Store'
	,storeId: 'Orders'
	,alias: 'store.history_orders'

	,fields: [
		 { name: 'codalfa', type: 'string' }
		,{ name: 'desart', type: 'string' }
		,{ name: 'cantidad', type: 'int' }
		,{ name: 'unidad', type: 'string' }
	]

	,autoLoad: false

	,proxy: {
		 type: 'ajax'
		,url: '/cgi-bin/rennped.cgi'
		,noCache: false
		,pageParam: ''
		,startParam: ''
		,limitParam: ''
		,reader: {
			 type: 'json'
			,rootProperty: 'rennped'
			,totalProperty: 'totalCount'
		}
	}
});
