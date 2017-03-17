Ext.define('EternumPro.store.products.Products', {
	 extend: 'Ext.data.Store'
	,storeId: 'Products'
	,alias: 'store.products'

	,fields: [
		 { name: 'codalfa', type: 'string' }
		,{ name: 'desart', type: 'string' }
		,{ name: 'lote', type: 'string' }
		,{ name: 'stock', type: 'int' }
		,{ name: 'unidad', type: 'string' }
		,{ name: 'volele', type: 'int' } // factor para multiplicar
		,{ name: 'univol', type: 'string' } // unidad de medida del contenedor (generalmente caja)
		,{ name: 'stkvol', type: 'int' } // stock / volele
	]

	,sorters: 'desart'
	,grouper: {
		groupFn: function(record) {
			return record.get('desart')[0];
		}
	}

	,data: []

	,autoLoad: false

	,proxy: {
		 type: 'ajax'
		,url: '/cgi-bin/stock.cgi'
		,noCache: false
		,pageParam: ''
		,startParam: ''
		,limitParam: ''
		,reader: {
			 type: 'json'
			,rootProperty: 'stock'
			,totalProperty: 'totalCount'
		}
	}
});
