Ext.define('EternumPro.Application', {
	 extend: 'Ext.app.Application'

	,name: 'EternumPro'

	,requires: [
		 'Ext.MessageBox'
		,'Ext.navigation.View'
		,'Ext.form.Panel'
		,'EternumPro.util.OAuth'
	]

	,stores: [
		 'Customers'
		,'Locals'
		,'Sections'
		,'products.Families'
		,'products.Products'
		,'history.History'
		,'history.Orders'
		,'orders.Orders'
	]

	,launch: function () {
		Ext.Viewport.add({ xtype: localStorage.getItem('EPW-AccessToken') ? 'app-main' : 'app-login' });
	}

	,onAppUpdate: function () {
		Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
			function (choice) {
				if (choice === 'yes') {
					window.location.reload();
				}
			}
		);
	}
});
