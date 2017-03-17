Ext.define('EternumPro.store.history.History', {
	 extend: 'Ext.data.Store'
	,storeId: 'History'
	,alias: 'store.history'

	,fields: [
		 { name: 'fecha', type: 'date' }
		,{ name: 'numorig', type: 'string' }
		,{ name: 'seccion', type: 'string' }
		,{ name: 'codemp', type: 'int' }
		,{ name: 'codcom', type: 'int' }
		,{ name: 'codtal', type: 'int' }
		,{ name: 'numero', type: 'int' }
	]

	,sorters: [
		{
			 property: 'fecha'
			,direction: 'DESC'
		}
	]

	,autoLoad: false

	,proxy: {
		 type: 'ajax'
		,url: '/cgi-bin/cabnped.cgi'
		,noCache: false
		,pageParam: ''
		,startParam: ''
		,limitParam: ''
		,reader: {
			 type: 'json'
			,rootProperty: 'cabnped'
			,totalProperty: 'totalCount'
		}
	}
});
