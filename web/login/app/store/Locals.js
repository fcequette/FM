Ext.define('EternumPro.store.Locals', {
	 extend: 'Ext.data.Store'
	,storeId: 'Locals'
	,alias: 'store.locals'

	,fields: [
		 { name: 'codlug', type: 'int' }
		,{ name: 'descri', type: 'string' }
	]

	,autoLoad: false

	,proxy: {
		 type: 'ajax'
		,url: '/cgi-bin/locales.cgi'
		,noCache: false
		,pageParam: ''
		,startParam: ''
		,limitParam: ''
		,reader: {
			 type: 'json'
			,rootProperty: 'locales'
			,totalProperty: 'totalCount'
		}
	}
});
