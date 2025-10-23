// Import Luxon, a helpful library that makes working with dates easy
const { DateTime } = require("luxon");
// *** NEW: Import the Markdown-it library for rich text processing ***
const markdownIt = require('markdown-it');

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

  // *** NEW: Configure and add the 'markdown' filter for Nunjucks ***
  const md = new markdownIt({
      html: true,       // Allow HTML tags in source
      breaks: true,     // Convert '\n' in paragraphs into <br>
      linkify: true     // Auto-convert URL-like text to links
  });

  eleventyConfig.addNunjucksFilter("markdown", (markdownString) => {
      // Use markdown-it to render the string as HTML
      return md.render(markdownString);
  });
  // *** END NEW CONFIGURATION ***

  return {
    dir: {
      // Look inside the 'src' folder for all your source files (templates, content)
      input: "src",
      // Build the final, static website files into the 'public' folder
      output: "public"
    },
    // Add this line to stop Eleventy from processing .html files as templates
    htmlTemplateEngine: false
  };
}
