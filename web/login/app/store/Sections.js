Ext.define('EternumPro.store.Sections', {
	 extend: 'Ext.data.Store'
	,storeId: 'Sections'
	,alias: 'store.sections'

	,fields: [
		 { name: 'codclas', type: 'int' }
		,{ name: 'descri', type: 'string' }
	]

	,autoLoad: false

	,proxy: {
		 type: 'ajax'
		,url: '/cgi-bin/secciones.cgi'
		,noCache: false
		,pageParam: ''
		,startParam: ''
		,limitParam: ''
		,reader: {
			 type: 'json'
			,rootProperty: 'secciones'
			,totalProperty: 'totalCount'
		}
	}
});
