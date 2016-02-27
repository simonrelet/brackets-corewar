define(function (require, exports, module) {
  'use strict';

  var CodeInspection = brackets.getModule('language/CodeInspection');
  var AppInit = brackets.getModule('utils/AppInit');
  var Menus = brackets.getModule('command/Menus');
  var CommandManager = brackets.getModule("command/CommandManager");
  var DocumentManager = brackets.getModule("document/DocumentManager");

  var commandID = 'corewar_refresh';
  var providerName = 'Corewar';

  require('corewar-pit');

  function asyncValidation(text, fullPath) {
    var response = new $.Deferred();
    var result = {
      errors: []
    };

    CorewarPit.validate(text, function (res) {
      if (res.errors) {
        res.errors.forEach(function (err) {
          result.errors.push({
            pos: {
              line: err.line - 1,
              ch: 0
            },
            message: err.msg,
            type: CodeInspection.Type.ERROR
          });
        });
      }
      response.resolve(result);
    });

    return response.promise();
  }

  AppInit.appReady(function () {
    CodeInspection.register('turtle', {
      name: providerName,
      scanFileAsync: asyncValidation
    });
  });

  function refreshValidation() {
    var currentDoc = DocumentManager.getCurrentDocument();
    currentDoc.notifySaved();
  }

  CommandManager.register('Refresh Corewar', commandID, refreshValidation);

  // Menu
  var editMenu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
  editMenu.addMenuItem(commandID, 'F9');
});
