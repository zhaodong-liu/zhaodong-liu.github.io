# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal academic website for Zhaodong Liu, built on the [al-folio](https://github.com/alshedivat/al-folio) Jekyll theme and hosted at https://zhaodong-liu.github.io (a GitHub Pages user site: `url` is set, `baseurl` is empty). It is **bilingual (English/Chinese)** via a custom language toggle layered on top of the stock theme.

The site builds as a static Jekyll site. Content lives in `_pages/`, `_data/`, `_projects/`, `_news/`, `_posts/`, and `_bibliography/`; presentation in `_layouts/`, `_includes/`, `_sass/`, and `assets/js/`.

## Commands

Requires Ruby 3.3.x and `imagemagick` (used by `jekyll-imagemagick` for responsive WebP images).

```bash
bundle install                     # install Ruby gems (see Gemfile)
bundle exec jekyll serve --livereload   # local dev server at http://localhost:4000
bundle exec jekyll build           # build into _site/ (also bin/cibuild)
JEKYLL_ENV=production bundle exec jekyll build   # production build (matches CI/deploy)
purgecss -c purgecss.config.js     # strip unused CSS from _site (post-build step)
bin/deploy                         # manual deploy: build + purgecss + push to gh-pages branch

# Formatting / linting (see CONTRIBUTING.md)
npx prettier --write .             # Prettier with @shopify/prettier-plugin-liquid (printWidth 150)
pre-commit run --all-files         # trailing whitespace, EOF, YAML, large-file checks

# Docker (alternative to local Ruby)
docker compose up                  # full image; docker compose -f docker-compose-slim.yml up for slim
```

Deployment is normally automated: GitHub Actions `.github/workflows/deploy.yml` builds on push to `main` (Ruby 3.3.5 + Python 3.13, `bundle exec jekyll build` with `JEKYLL_ENV=production`, then purgecss, then `JamesIves/github-pages-deploy-action`). Do not edit the generated `_site/` directory.

## Architecture

### Bilingual (EN/ZH) system — the key customization

The site shows English and Chinese side by side in the source and switches at runtime:

- `assets/js/lang-toggle.js` sets `data-lang` and `lang` attributes on `<html>` and persists the choice in `localStorage["lang"]`. It also swaps any element carrying `data-i18n-en` / `data-i18n-zh` attributes.
- `_sass/_base.scss` hides the inactive language: `html[data-lang="en"] .lang-zh { display: none }` and vice versa.
- Content authors wrap the two versions in paired elements. In Markdown pages, use `<span class="lang-en">…</span><span class="lang-zh">…</span>` inline, or `<div class="lang-en" markdown="1">…</div>` / `<div class="lang-zh" markdown="1">…</div>` for block content (see `_pages/about.md`).
- `_includes/header.liquid` renders the toggle button and auto-translates standard nav page titles via a `case` statement (about/projects/news/cv/blog/repositories/publications → 关于/项目/动态/简历/博客/代码仓库/论文). A page whose frontmatter `title` already contains `<span class="lang-en">` is emitted verbatim rather than auto-translated.
- `_includes/metadata.liquid` strips the `<span>` tags to derive an English-only `<title>` for SEO/OpenGraph.

**When adding or editing content, provide both `lang-en` and `lang-zh` versions.** Pages with a single-language title (e.g. `publications.md`) still get an auto-translated nav label from the header `case`.

### CV / resume data flow (three sources — know which is live)

The `/cv/` page (`_layouts/cv.liquid`) has two rendering branches:

1. `site.data.resume` present → renders the **JSONResume-format** resume:
   - English comes from `assets/json/resume.json`, fetched by the `jekyll-get-json` plugin into `site.data.resume`.
   - Chinese comes from `_data/resume_zh.yml`, which mirrors the JSON structure key-for-key.
   - `cv.liquid` renders both a `.cv.lang-en` block (from `site.data.resume`) and a `.cv.lang-zh` block (from `site.data.resume_zh`), reusing the same `_includes/resume/*.liquid` partials.
2. `site.data.resume` absent → renders the legacy `_data/cv.yml` schema via `_includes/cv/*.liquid`.

Because `resume.json` exists, `_data/cv.yml` is currently **dead code** (the legacy fallback path). The live English/Chinese resume content is `assets/json/resume.json` + `_data/resume_zh.yml` — keep those two in sync when editing. The section list shown is gated by the `jsonresume:` list in `_config.yml`.

Downloadable PDFs are declared in `_pages/cv.md` frontmatter (`cv_pdf`, `cv_pdf_zh`) and live in `assets/pdf/`.

### Content model

- `_pages/*.md` — top-level pages (about, projects, publications, blog, news, cv, repositories, profiles). Included in the build via `include: ["_pages"]` in `_config.yml`.
- `_data/*.yml` — structured site data: `socials.yml` (social links shown in order), `repositories.yml` (GitHub repos surfaced on the repositories page), `resume_zh.yml`, `cv.yml` (legacy), `coauthors.yml`, `venues.yml`.
- `_bibliography/papers.bib` — publications rendered by `jekyll-scholar` on the publications page (`_pages/publications.md`). Currently empty (a `@comment` placeholder).
- `_news/*.md` — short news items surfaced as announcements on the about page.
- `_projects/*.md` — project cards/pages, sorted by frontmatter `importance`. Real projects use descriptive filenames (`recommendation_system.md`, `c14_tissue_age.md`, …); the numbered `1_project.md`…`9_project.md` are excluded theme demo files.
- `_posts/*.md` — blog posts. The dated `2015-…`/`2023-…` example posts are excluded in `_config.yml`.

### Build pipeline & plugins

The site is heavily plugin-based (see `plugins:` in `_config.yml`): `jekyll-imagemagick` (responsive WebP from `assets/img/`), `jekyll-terser` (JS minification, `drop_console: true`), `jekyll-minifier` (HTML minification, JS left to terser), `jekyll-paginate-v2`, `jekyll-archives-v2`, `jekyll-get-json` (loads `resume.json`), `jekyll-scholar` (bibliography), `jekyll-sitemap`, `jekyll-feed`, plus many others.

Custom site plugins live in `_plugins/` (e.g. `cache-bust.rb` for cache-busted asset URLs via the `bust_file_cache` Liquid filter, `download-3rd-party.rb` for vendoring CDN libs when `third_party_libraries.download: true`, `google-scholar-citations.rb`/`inspirehep-citations.rb` for publication badges). Third-party libs are pinned with SRI integrity hashes under `third_party_libraries:` in `_config.yml`.

### Exclude list gotcha

`_config.yml` has a large `exclude:` list that removes theme demo content from the build — including `_pages/about_einstein.md`, `_pages/publications.md`, `_pages/profiles.md`, the numbered `_projects/1_project.md`…`9_project.md`, and all dated demo `_posts/*.md`. If you can't find where a page is coming from, or a new page isn't rendering, check whether it (or its layout) is excluded here. `assets/libs/`, `vendor/`, and `_site/` are also excluded.

### Search

Site search (`search_enabled: true`) is client-side, generated from `_scripts/search.liquid.js` into `assets/js/search/` (excluded from Prettier; see `.prettierignore`).
