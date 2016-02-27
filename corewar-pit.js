'use strict';

var CorewarPit = (function () {
  var pitService = 'http://localhost:4201';

  return {
    validate: function (src, cb) {
      $.ajax({
        url: pitService,
        data: JSON.stringify({
          src: src
        }),
        cache: false,
        contentType: 'application/json; charset=utf-8',
        processData: false,
        type: 'POST',
        success: function (data) {
          cb(data);
        }
      });
    }
  };
}());
