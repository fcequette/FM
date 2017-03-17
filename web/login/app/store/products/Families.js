Ext.define('EternumPro.store.products.Families', {
	 extend: 'Ext.data.Store'
	,storeId: 'Families'
	,alias: 'store.families'

	,fields: [
		 { name: 'descri', type: 'string' }
		,{ name: 'codfam', type: 'int' }
	]

	,autoLoad: false

	,proxy: {
		 type: 'ajax'
		,url: '/cgi-bin/familias.cgi'
		,noCache: false
		,pageParam: ''
		,startParam: ''
		,limitParam: ''
		,reader: {
			 type: 'json'
			,rootProperty: 'familias'
			,totalProperty: 'totalCount'
		}
	}
});
