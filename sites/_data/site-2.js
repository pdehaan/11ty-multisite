const global = require("./global");

module.exports = () => {
  return Object.assign({}, global, {
    title: "Site Two",
  });
};
