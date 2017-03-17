Ext.define('EternumPro.store.Customers', {
	 extend: 'Ext.data.Store'
	,storeId: 'Customers'
	,alias: 'store.customers'

	,fields: [
		 { name: 'codigo', type: 'int' }
		,{ name: 'razsoc', type: 'string' }
	]

	,autoLoad: false

	,proxy: {
		 type: 'ajax'
		,url: '/cgi-bin/clientes.cgi'
		,noCache: false
		,pageParam: ''
		,startParam: ''
		,limitParam: ''
		,reader: {
			 type: 'json'
			,rootProperty: 'clientes'
			,totalProperty: 'totalCount'
		}
	}
});
