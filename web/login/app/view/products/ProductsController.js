Ext.define('EternumPro.view.products.ProductsController', {
	 extend: 'Ext.app.ViewController'
	,alias: 'controller.products'

	,doFilterFamily: function( field, newValue, oldValue ) {
		var me = this;

		Ext.getStore('Products').load({
			params: {
				 codfam: newValue.get('codfam')
				,seccion: localStorage.getItem('section')
			}
		});
	}
	,doSearch: function( field ) {
		var me = this;

		Ext.getStore('Products').filterBy(function(rec) {
			if ( rec.get('desart').toUpperCase().indexOf(field.getValue().toUpperCase()) >= 0 ) return true;
		});
	}

	,clearSearch: function() {
		var me = this;

		Ext.getStore('Products').clearFilter();
	}

	,showSearch: function() {
		var me = this;

		me.lookupReference('searchToolbar').show();
	}

	,cancelSearch: function() {
		var me = this;

		Ext.getStore('Products').clearFilter();
		me.lookupReference('searchToolbar').down('searchfield').reset();
		me.lookupReference('searchToolbar').hide();
	}

	,onItemTapHold: function( list, index, target, record, e ) {
		var me = this;

		Ext.getCmp('productos').push({
			 xtype: 'products_details'
			,title: record.get('desart')
			,data: record.getData()
		});
	}

	,onItemDoubleTap: function( list, index, target, record, e ) {
		var me = this;

		// Si no tiene stock, no hago nada
		if (  record.get('stkvol') === 0 ) return;

		Ext.Msg.prompt(
			 'Agregar Producto'
			,record.get('name')
			,function ( btnId, value ) {
				if ( btnId === 'ok' ) {
					Ext.getStore('orders.Orders').add({
						 desart: record.get('desart')
						,codalfa: record.get('codalfa')
						,max: record.get('stkvol')
						,volele: record.get('volele')
						,volumen: parseInt(value)
						,cantidad: parseInt(value) * record.get('volele')
					});
					Ext.getStore('orders.Orders').commitChanges();
				}
			}
			,me
			,false
			,1
			,{
				 xtype: 'spinnerfield'
				,minValue: 1
				,maxValue: record.get('stkvol')
				,stepValue: 1
			}
		);
	}
});
