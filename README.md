````markdown
# 11ty & Decap CMS Website for thinIceProject

This repository contains the source code for the thinIceProject website, a research group focused on freshwater ecology in the Hudson Valley. The site is built to be fast, secure, and easy to update using a modern web development stack.

The project uses the Eleventy (11ty) static site generator, with content managed through Decap CMS. Authentication for the CMS is handled by DecapBridge, allowing team members to easily write and publish articles without touching the code. The live site is hosted on Cloudflare Pages.

## Tech Stack

* **Static Site Generator:** Eleventy (11ty)
* **Templating Language:** Nunjucks (.njk)
* **CMS:** Decap CMS
* **CMS Authentication:** DecapBridge
* **Hosting:** Cloudflare Pages
* **Dependencies:** Node.js / npm

---

## Getting Started

To run this project on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/RodolfoBaez/11tyDecapCms.git](https://github.com/RodolfoBaez/11tyDecapCms.git)
    cd 11tyDecapCms
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the local development server:**
    ```bash
    npx @11ty/eleventy --serve
    ```
    This will build the site and start a local server, typically at `http://localhost:8080`. The site will automatically rebuild and refresh when you save changes to your files.

---

## Project Structure

The project is organized to separate content, templates, configuration, and assets, which is a standard practice for 11ty sites.

````

/
├── src/
│   ├── \_includes/      \# Reusable Nunjucks templates (layouts, components)
│   │   ├── article.njk
│   │   └── article-snippet.njk
│   ├── admin/          \# Decap CMS configuration files
│   │   ├── config.yml
│   │   └── index.html
│   ├── assets/         \# Static assets (images, fonts, etc.)
│   ├── blog/           \# Content files (blog posts in Markdown)
│   ├── blog.njk        \# The main blog listing page
│   └── index.njk       \# The site homepage
├── .eleventy.js        \# Main 11ty configuration file
├── package.json        \# Project dependencies
└── README.md           \# You are here\!

```

### Key Files and Directories Explained

* **`src/_includes`**: This directory holds the building blocks of the site. Templates here are reused across multiple pages.
    * `article.njk`: The template that renders a single, full blog post. It pulls data like title and image from the Markdown files in the `src/blog` folder.
    * `article-snippet.njk`: A smaller template used to display a summary of a blog post. It's used on the `blog.njk` page to create a list of all articles.

* **`src/admin`**: This folder contains everything needed to run the Decap CMS admin panel.
    * `index.html`: The entry point for the CMS, available at `/admin/` on the live site. It loads the necessary scripts for Decap CMS and DecapBridge.
    * `config.yml`: The "brain" of the CMS. It defines the content structure (collections), media file locations, and, most importantly, the backend configuration. This project uses `git-gateway` with DecapBridge to handle authentication securely.

* **`src/blog`**: This is where all the content for blog posts and field reports is stored. Each `.md` (Markdown) file represents a single article. The content in these files is what the team will edit through the CMS interface.

* **`blog.njk` & `index.njk`**: These are the two main pages of the site.
    * `index.njk` is the homepage.
    * `blog.njk` is the main blog page, which loops through all posts in the `collections.post` and uses the `article-snippet.njk` template to display them in a list.

* **`.eleventy.js`**: The central configuration file for 11ty. It tells 11ty which files to copy directly to the output folder (like CSS and assets), defines custom filters (like formatting dates), and sets the input and output directories (`src` and `public`).

---

## How Content Management Works

This setup allows for a seamless content editing workflow:

1.  A team member navigates to `https://11tydecapcms.pages.dev/admin/`.
2.  DecapBridge handles the login process, authenticating the user with their GitHub account.
3.  Once logged in, the Decap CMS interface loads, showing the "Blog" and "Pages" collections defined in `config.yml`.
4.  The user can create a new post or edit an existing one. When they hit "Publish," Decap CMS (via DecapBridge) commits the changes as a new Markdown file or an update to an existing one in the `src/blog/` directory of the GitHub repository.
5.  This new commit automatically triggers a new build on Cloudflare Pages.
6.  Eleventy runs, rebuilding the entire static site with the new content.
7.  The updated site is deployed and becomes live.
```
