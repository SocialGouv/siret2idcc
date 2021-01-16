const getConventionUrl = (id) =>
  `https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=${id}`;

module.exports = getConventionUrl;
