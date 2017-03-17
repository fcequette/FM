var development = false;
/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Ext.application({
    name: 'EternumPro',

    extend: 'EternumPro.Application',

    requires: [
         'EternumPro.view.login.Login'
		,'EternumPro.view.main.Main'
    ]

    // The name of the initial view to create. With the classic toolkit this class
    // will gain a "viewport" plugin if it does not extend Ext.Viewport. With the
    // modern toolkit, the main view will be added to the Viewport.
    //
    //mainView: 'EternumPro.view.main.Main'
	//mainView: 'EternumPro.view.login.Login'

    //-------------------------------------------------------------------------
    // Most customizations should be made to EternumPro.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------
});

Ext.override(Ext, {
	cq1: function(selector) {
		return Ext.ComponentQuery.query(selector)[0];
	}
});

// Set the default Base URL
Ext.Ajax.on('beforerequest', function(connection, options) {
	if ( development ) {
		var url = options.url.split('?');
		//options.url = '///android_asset/www' + url[0] + '.json?' + url[1];
		options.url = '.' + url[0] + '.json?' + url[1];
	} else {
		options.url = 'http://sadia.dyndns.org' + options.url;
	}
});

Ext.MessageBox.OKCANCEL = [
	{text: 'Cancelar', itemId: 'cancel'},
	{text: 'OK',     itemId: 'ok',  ui : 'action'}
];
Ext.MessageBox.YESNO = [
	{text: 'No',  itemId: 'no'},
	{text: 'Si', itemId: 'yes', ui: 'action'}
];
