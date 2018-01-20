// These functions help with error handling throughout the back-end
// Author: R.Wood
// 20/1/18

'use strict';

function send404(req, res) {
  res.status(404).json({ message : 'Cannot find resource' });
}

function send500(req, res, err, msg) {
  res.status(500).json({ message : `Internal server error, ${msg}`});
}

module.exports = {send404, send500};
