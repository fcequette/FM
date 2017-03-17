Ext.define('app.view.Main', {
    extend: 'Ext.navigation.View',
    xtype: 'main',
    requires: [
        //'Ext.TitleBar',
        //'Ext.Video'
    ],
    config: {
      //  tabBarPosition: 'bottom',

        defaultBackButtonText: 'Volver'
        ,items: [
          {
             title: 'Bienvenido'
            ,xtype: 'formpanel'
            ,cls: 'hideTitleBar'
            ,layout: 'vbox'
            ,bodyPadding: 30
            ,items: [
              {
                 xtype: 'container'
                ,cls: 'logo'
                ,flex: 1
              }
              ,{
                 xtype: 'fieldset'
//,title: 'Ingrese sus credenciales'
//,instructions: 'Si tiene problemas, contáctese con la empresa.'
                ,defaults: {
                  labelWidth: 110
                }
                ,items: [
                  {
                     xtype: 'textfield'
                    ,label: 'Usuario'
                    ,labelAlign: 'left'
                    ,width: '100%'
                    ,name: 'username'
                    ,allowBlank: false
                  }
                  ,{
                     xtype: 'textfield'
                    ,label: 'Contraseña'
                    ,labelAlign: 'left'
                    ,width: '100%'
                    ,inputType: 'password'
                    ,name: 'password'
                    ,allowBlank: false
                  }
                  ,{
                     xtype: 'hiddenfield'
                    ,name: 'grant_type'
                    ,value: 'password'
                  }
                  ,{
                     xtype: 'hiddenfield'
                    ,name: 'client_id'
                    ,value: 'eternumpro'
                  }
                ]
              }
              ,{
                 xtype: 'container'
                ,flex: 1
              }
              ,{
                 xtype: 'button'
                ,ui: 'confirm'
                ,text: 'Ingresar'
                ,docked: 'bottom'
                ,handler: 'doIngresar'
                ,formBind: true
              }
            ]
          }
        ]
    }
});
