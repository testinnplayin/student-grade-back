// These functions help with error handling throughout the back-end
// Author: R.Wood
// 20/1/18

'use strict';

function checkRequiredFields(req, reqFields) {
  let reqStatus;
  if (req.body) {
    for (field of reqFields) {
      const properties = Object.keys(req.body);
      if (!properties.includes(field)) {
        reqStatus = { isOk : false, msg : `Required field ${field} not on request body` };
        return reqStatus;
      } else {
        if (req.body[field] === null || req.body[field] === undefined) {
          reqStatus = { isOk : false, msg : `Required field ${field} not filled` };
          return reqStatus;
        }
      }
    }
    reqStatus = { isOk : true, msg : null };
  } else {
    reqStatus = { isOk : false, msg : 'No request body' };
  }
  return reqStatus;
}

function sendError(err, res, status, msg) {
  console.error(err);
  res.status(status).json({ message : msg });
}

module.exports = {sendError};
