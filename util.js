function errorCheck(res, message, code) {
  return res.json({
    code: code || 400,
    mseeage: message,
    data: null
  });
}

module.exports = {
  errorCheck
};
