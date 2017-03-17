Ext.define('EternumPro.view.profile.ProfileController', {
	 extend: 'Ext.app.ViewController'
	,alias: 'controller.profile'

	,doChangeCustomer: function( btn ) {
		var me = this;

		var confirmChange = function() {
			var mainView = Ext.cq1('app-main');
			mainView.setActiveItem(0);
			mainView.down('tabpanel').setActiveItem(0);

			mainView.lookupReference('customer').suspendEvent('change');
			mainView.lookupReference('local').suspendEvent('change');

			Ext.getStore('orders.Orders').removeAll();

			mainView.down('formpanel').reset();

			mainView.lookupReference('customer').setDisabled(false);
			mainView.lookupReference('local').setDisabled(true);
			mainView.lookupReference('section').setDisabled(true);

			mainView.down('#continueBtn').setDisabled(true);

			mainView.lookupReference('customer').resumeEvent('change');
			mainView.lookupReference('local').resumeEvent('change');


			// Limpio los datos del Cliente actual
			localStorage.removeItem('customer');
			localStorage.removeItem('local');
			localStorage.removeItem('section');
		};

		if ( Ext.getStore('orders.Orders').getCount() > 0 ) {
			Ext.Msg.confirm('PEDIDO SIN FINALIZAR', 'Usted tiene un pedido sin finalizar y lo perderá si continúa. ¿Está seguro que desea cambiar de cliente?', function(btnId) {
				if ( btnId === 'yes' ) {
					confirmChange();
				}
			});
		} else {
			confirmChange();
		}
	}

	,doLogout: function( btn ) {
		var me = this;

		EternumPro.util.OAuth.onLogout();
	}
});
