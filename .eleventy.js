// Import Luxon, a helpful library that makes working with dates easy
const { DateTime } = require("luxon");

// This is the main configuration file for Eleventy
module.exports = function(eleventyConfig) {
  // 1. Your main styles file
  eleventyConfig.addPassthroughCopy('./src/style.css');
  // 2. The images, fonts, and other files you use
  eleventyConfig.addPassthroughCopy('./src/assets');
  // 3. Files needed for the admin/CMS dashboard (Netlify CMS)
  eleventyConfig.addPassthroughCopy('./src/admin');

  // Create a custom tool (called a 'filter') to format dates beautifully
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  return {
    dir: {
      // Look inside the 'src' folder for all your source files (templates, content)
      input: "src",
      // Build the final, static website files into the 'public' folder
      output: "public"
    }
  };
}