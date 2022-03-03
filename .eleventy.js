const eleventyVersion = require("@11ty/eleventy/package.json").version;

module.exports = (eleventyConfig) => {
  eleventyConfig.addGlobalData("eleventyVersion", eleventyVersion);

  return {
    includes: "_includes",
    layouts: "_layouts",
  };
};
