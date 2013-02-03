var app = module.exports = require('appjs');

app.serveFilesFrom(__dirname + '/content');

var menubar = app.createMenu([{
  label: '&File',
  submenu: [{
    label: 'E&xit',
    action: function () {

      'use strict';
      win.close();
    }
  }]
},
{
  label: '&Window',
  submenu: [{
    label: 'Fullscreen',
    action: function (item) {
      'use strict';
      win.frame.fullscreen();
      console.log(item.label + " called.");
    }
  },
  {
    label: 'Minimize',
    action: function () {
      'use strict';
      win.frame.minimize();
    }
  },
  {
    label: 'Maximize',
    action: function () {
      'use strict';
      win.frame.maximize();
    }
  },
  {
    label: '' //separator
  },
  {
    label: 'Restore',
    action: function () {
      'use strict';
      win.frame.restore();
    }
  }]
}]);

menubar.on('select', function (item) {
  'use strict';
  console.log("menu item " + item.label + " clicked");
});

//var trayMenu = app.createMenu([{
//  label:'Show',
//  action:function(){
//    window.frame.show();
//  }
//},{
//  label:'Minimize',
//  action:function(){
//    window.frame.hide();
//  }
//},{
//  label:'Exit',
//  action:function(){
//    window.close();
//  }
//}]);
//var statusIcon = app.createStatusIcon({
//  icon:'./data/content/icons/32.png',
//  tooltip:'AppJS Hello World',
//  menu:trayMenu
//});
var win = app.createWindow({
  width: 640,
  height: 460,
  icons: __dirname + '/content/icons',
  disableSecurity: true
});

win.on('create', function () {
  'use strict';
  console.log("Window Created");
  win.frame.show();
  win.frame.center();
  win.frame.setMenuBar(menubar);
});

win.on('ready', function () {
  'use strict';
  console.log("Window Ready");
  win.process = process;
  win.module = module;

  function f12(e) {
    return e.keyIdentifier === 'F12';
  }

  function command_Option_J(e) {
    return e.keyCode === 74 && e.metaKey && e.altKey;
  }

  win.addEventListener('keydown', function (e) {
    if (f12(e) || command_Option_J(e)) {
      win.frame.openDevTools();
    }
  });
});

win.on('close', function () {
  'use strict';
  console.log("Window Closed");
});