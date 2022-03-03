import { inspect } from "node:util";

import Eleventy from "@11ty/eleventy";
import rimraf from "rimraf";

import globaldata from "./sites/_data/global.js";
import sites from "./sites/_data/sites.js";

const IS_PROD = process.env.NODE_ENV === "production";

if (IS_PROD) {
  rimraf.sync("www");
}

for (const site of sites) {
  // Load site specific data file.
  // NOTE: Not sure this is a good idea, versus just putting a site's global data in the `sites/{{name}}/{{name}}.11tydata.js` file.
  // const { default: sitedata } = await import(`./sites/_data/${site}.js`);

  const elev = new Eleventy(`sites/${site}`, `www/${site}`, {
    quietMode: IS_PROD,
    configPath: ".eleventy.js",

    config(eleventyConfig) {
      eleventyConfig.addFilter("inspect", IS_PROD ? () => {} : inspect);
      eleventyConfig.addGlobalData("global", globaldata);
      // eleventyConfig.addGlobalData("site", sitedata);
      eleventyConfig.addGlobalData("layout", "base");

      eleventyConfig.addLayoutAlias("base", "_layouts/base.liquid");

      eleventyConfig;
    },
  });

  await elev.write();
}
