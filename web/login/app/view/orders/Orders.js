Ext.define('EternumPro.view.orders.Orders', {
	 extend: 'Ext.Panel'
	,xtype: 'orders'

	,requires: [
		 'EternumPro.view.orders.OrdersController'
		,'EternumPro.view.orders.OrdersModel'
		,'EternumPro.store.orders.Orders'
	]

	,controller: 'orders'
	,viewModel: 'orders'

	,title: 'Pedido'
	,cls: 'hideTitleBar'
	,layout: 'fit'

	,items: [
		{
			 xtype: 'list'
			,store: { type: 'orders' }
			,itemTpl: '<div class="product"><strong>{desart}</strong><br />Cantidad: {volumen}</div>'
			,emptyText: 'No tiene ningún pedido en curso...'
			,indexBar: false
			,grouped: false
			,striped: true
			,variableHeights: true
			,listeners: {
				 itemtaphold: 'onItemTapHold'
				,itemdoubletap: 'onItemTapHold'
			}
		}
	]

	,listeners: {
		painted: 'onPainted'
	}
});
