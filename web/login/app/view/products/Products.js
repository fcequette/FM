Ext.define('EternumPro.view.products.Products', {
	 extend: 'Ext.Panel'
	,xtype: 'products'

	,requires: [
		 'EternumPro.view.products.ProductsController'
		,'EternumPro.view.products.ProductsModel'
		,'EternumPro.store.products.Products'
		,'EternumPro.view.products.Details'
	]

	,controller: 'products'
	,viewModel: 'products'

	,title: 'Productos'
	,cls: 'hideTitleBar'
	,layout: 'fit'
	,items: [
		{
			 xtype: 'toolbar'
			,docked: 'top'
			,items: [
				{
					 xtype: 'selectfield'
					,store: 'Families'
					,displayField: 'descri'
					,valueField: 'codfam'
					,flex: 1
					,listeners: {
						change: 'doFilterFamily'
					}
				}
				,{
					 xtype: 'button'
					,iconCls: 'x-fa fa-search'
					,align: 'right'
					,handler: 'showSearch'
				}
			]
		}
		,{
			 xtype: 'toolbar'
			,docked: 'top'
			,reference: 'searchToolbar'
			,hidden: true
			,items: [
				{
					 xtype: 'searchfield'
					,placeHolder: 'Buscar producto...'
					,flex: 1
					,listeners: {
						 action: 'doSearch'
						,clearicontap: 'clearSearch'
					}
				}
				,{
					 xtype: 'button'
					,text: 'Cancelar'
					,ui: 'decline'
					,handler: 'cancelSearch'
				}
			]
		}
		,{
			 xtype: 'list'
			,store: { type: 'products' }
			,itemTpl: '<div class="product"><strong>{desart}</strong><br />Stock: {stkvol} {univol} de {volele} {unidad} <span style="float:right;position:relative;padding-right:25px;">Lote: {lote}</span></div>'
			,loadingText: 'Cargando...'
			,emptyText: 'No se encontraron productos'
			,indexBar: true
			,grouped: true
			,striped: true
			,variableHeights: true
			,listeners: {
				 itemtaphold: 'onItemTapHold'
				,itemdoubletap: 'onItemDoubleTap'
			}
		}
	]
});
