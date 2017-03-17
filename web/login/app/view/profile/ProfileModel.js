Ext.define('EternumPro.view.profile.ProfileModel', {
	 extend: 'Ext.app.ViewModel'

	,alias: 'viewmodel.profile'

	,data: {
		 picture: localStorage.getItem('EPW-UserSEX') === '' ? 'resources/unknown.png' : ('resources/'+localStorage.getItem('EPW-UserSEX')+'.png')
		,firstname: localStorage.getItem('EPW-UserFIRST')
		,lastname: localStorage.getItem('EPW-UserLAST')
	}
});
