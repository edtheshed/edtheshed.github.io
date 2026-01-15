# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hugo-based static website for CodeBass Ltd (codebass.io), a software development consultancy blog. It uses the `hello-4s3ti` theme.

## Commands

```bash
# Local development server with live reload
hugo server

# Build for production (outputs to public/)
hugo --minify

# Create a new blog post
hugo new posts/post-name.md
```

## Deployment

The site deploys automatically via GitHub Actions on push to `main`. The workflow (`.github/workflows/gh-pages.yml`) builds with Hugo extended and deploys to GitHub Pages.

## Architecture

### Content Structure
- `content/posts/` - Blog posts in Markdown with YAML front matter
- Front matter fields: `title`, `date`, `draft`, `description`, `tags`

### Theme Customization
The project overrides parts of the `hello-4s3ti` theme:
- `layouts/_default/list.html` - Custom list template
- `layouts/posts/single.html` - Blog post template
- `layouts/partials/blog-sidebar.html` - Sidebar with profile, archive, and tags
- `layouts/shortcodes/slideshow.html` - Image slideshow shortcode

### Styling
- `static/css/blog.css` - Custom CSS for blog layout, sidebar, and light/dark theme support
- Theme supports light/dark mode toggle (configured in `config.toml`)

### Key Configuration (config.toml)
- `defaultTheme = "dark"` with toggle enabled
- Google Analytics configured
- Custom background images and visual effects
- Permalink structure: `/posts/:year/:month/:title/`

### Shortcodes
- `{{< slideshow "img1.jpg" "img2.jpg" ... >}}` - Auto-rotating image slideshow
