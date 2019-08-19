const normalizeIdcc = str => {
  while (("" + str).length < 4) {
    str = "0" + str;
  }
  return str;
};

module.exports = normalizeIdcc;
