Ext.define('EternumPro.view.products.Details', {
	 extend: 'Ext.Panel'
	,xtype: 'products_details'

	,requires: [
		 'EternumPro.view.products.DetailsController'
		,'EternumPro.view.products.DetailsModel'
	]

	,controller: 'products_details'
	,viewModel: 'products_details'

	,cls: 'hideTitleBar'

	,tpl: [
		// '<div style="background-image:url(http://lorempixel.com/400/200/food);background-repeat:no-repeat;background-size: 100%;height:200px;background-color:#F9F9F9;border-bottom:1px solid #CCC;"></div>'
		 '<div style="padding: 20px;">'
			,'<div style="padding: 10px;"><b>Nombre:</b> {desart}</div>'
			,'<div style="padding: 10px;"><b>Código:</b> {codalfa}</div>'
			,'<div style="padding: 10px;"><b>Lote:</b> {lote}</div>'
			,'<div style="padding: 10px;"><b>Stock:</b> {stkvol} {univol} de {volele} {unidad}</div>'
			,'<div style="padding: 10px;"><b>Unidad:</b> {unidad}</div>'
		,'</div>'
	]
});
