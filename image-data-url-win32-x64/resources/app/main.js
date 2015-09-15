var app = require('app');  // Module to control application life.
var Menu = require('menu');
var Tray = require('tray');
var clipboard = require('clipboard');
var NativeImage = require('native-image');
var dialog = require('dialog');

// Report crashes to our server.
require('crash-reporter').start();

var appIcon = null;
app.on('ready', function(){
  appIcon = new Tray(NativeImage.createFromDataUrl('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAACIElEQVQ4jY2Uy6oTQRCG/6rp44RZhOw04UCiZJeVbofKE+gbCGejgqjB20b0BcSFulbwAj6BvkEmDyCShRDCQBbZZRFhzkno6XLTHWIug7WZ6am/vrr0dBMAA8CKyGdmPlNVS0QGW6aqJRFFZVl+yLLsHoAIgAOg27rtIPaBHwE4VQ1rYuaVc+5WFEV3ReTPcDh8dgi4DTOquprP548nk8kKAHlhBKAUkWsArjLzUxE5GQ6Hg10gY8eSJDEeZACYbrdrAICIQqUXzPyo3++/B1B6LQ7CiqKwPpMFYCeTifWu8CRVvSCigQe6ANyDHTPnXBTGQUQ1vymDNE1f+OTGVMRvOL691wC+lGVJqupU9cQY8w1ALwj/B6YAMBqNsk6nE+d5vgKg3W43brVa621hVZsEwPR6vUsAICKv2u32uYg89/4YAJh5w6iCKQA7Ho9Dm6f++xUASJKk3A3Yg1lrw1YbEXkjIjcBYDqdPlmv1zdms9lLAFgul3uwvZnV6/UIANI0fcvMD1T1vog8JKJT59x5nue/jrVydAOY+bJ/jZn5k6raKIpMmqbXR6PR7ZC0ErZYLMKMvqrqT+dc4V2lqiYAfgddo9GohtVqNQcAWZb9APD9QNG0rauE+bO57nQ68QEQACDP85XXVcPC2Qw/55HKtCgKW9WmJaK42Wy+a7Va4T47CCMip6pMRLGqhgvgH5jzyjtEZIhoj7JjAbKZ3V99I/VfzHxptwAAAABJRU5ErkJggg=='));
  var contextMenu = Menu.buildFromTemplate([
    {
      label: 'Clipboard image to Data Url',
      //accelerator: 'Shift+CmdOrCtrl+V',
      click: function() {
        var image = clipboard.readImage();
        if (image.isEmpty()) {
          dialog.showMessageBox({
            type: 'info',
            buttons: ['OK'],
            message: 'クリップボードに画像がありません。',
          });
        } else {
          clipboard.writeText(image.toDataUrl());
        }
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Quit',
      //accelerator: 'Command+Q',
      click: function() { app.quit(); }
    },
  ]);
  appIcon.setToolTip('Clipboard image to base64 img tag.');
  appIcon.setContextMenu(contextMenu);
});
