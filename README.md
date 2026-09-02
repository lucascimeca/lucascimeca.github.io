# lucascimeca.github.io

Personal site — a small Jekyll site built for GitHub Pages.

Live at **https://lucascimeca.github.io**

---

## Work in progress: the site is hidden from search

`_config.yml` has a single switch:

```yaml
noindex: true
```

While it is `true`:

- every page carries `<meta name="robots" content="noindex, nofollow">`
- `robots.txt` serves `Disallow: /`

The site is still *reachable* by anyone who types the URL — a public GitHub repo
cannot serve a truly private page — but nothing links to it and no search engine
will index it. Flip to `false` when you're ready to be found.

---

## Structure

```
_config.yml            site settings + the noindex / show_posts switches
index.html             home page
work.md                /work/  — full employment history
posts.md               /posts/ — post index

_data/
  links.yml            CV / email / Scholar / LinkedIn / GitHub / ORCID / Bitbucket
  experience.yml       current + past roles
  education.yml        degrees
  services.yml         academic service
  awards.yml           awards & honours

_posts/                one Markdown file per post
_layouts/              default · page · post
_includes/             head · icon (inline SVG set)
assets/css/main.css    the whole design system (tokens at the top)
assets/img/            portrait, org logos, post images
```

Nothing on the site is hard-coded twice: the home page and the work page both
read from `_data/`, so editing a YAML file updates both.

---

## Editing content

### Adding a role

Edit `_data/experience.yml`. Add `featured: true` to also show it in
**Selected roles** on the home page. `logo:` points at a file in
`assets/img/logos/`; leave it out and the row still lines up.

### Adding a post

Create `_posts/YYYY-MM-DD-some-slug.md`:

```yaml
---
title: "Post title"
date: 2026-01-15
venue: NeurIPS 2026        # optional, shown next to the date
cover: /assets/img/posts/something.jpg
cover_alt: Description of the image for screen readers
standfirst: >-
  One or two sentences. Used as the card excerpt and the intro paragraph.
math: true                 # optional, loads MathJax for $...$ and $$...$$
resources:                 # optional buttons at the end of the post
  - label: Paper
    url: https://arxiv.org/abs/...
---
```

Useful extras:

| Front matter | Effect |
| --- | --- |
| `visible: false` | Hides one post from the index, the home page and prev/next |
| `show_cover: false` | Keeps the card thumbnail but skips the big header image |
| `cover_fit: contain` | Letterboxes a wide diagram in the card instead of cropping |
| `redirect_from:` | Old URLs that should land on this post |

### Hiding the whole Posts section

```yaml
show_posts: false
```

in `_config.yml`. That drops the nav link, the home-page **Writing** block and
the `/posts/` index in one move. The Markdown files stay where they are.

---

## Running it locally

Needs Ruby 3+ (`brew install ruby`), then:

```bash
bundle install
bundle exec jekyll serve
```

→ http://localhost:4000

> The `Gemfile` pins modern Jekyll for local previews. GitHub Pages builds the
> deployed site with its own `github-pages` gem — everything here sticks to
> plugins that build supports (`jekyll-feed`, `jekyll-sitemap`,
> `jekyll-redirect-from`), so the two agree.

---

## Old URLs

Redirect stubs keep the previous site's paths working, so nothing 404s if this
repo ever serves `lucascimeca.com`:

| Old | New |
| --- | --- |
| `/responsibilities/`, `/roles-responsibilities/` | `/work/` |
| `/news-others/` | `/posts/` |
| `/curriculum-vitae/` | Google Drive CV |
| `/publications/` | Google Scholar |
| `/example-post/`, `/portfolio/…`, and the long WordPress slugs | the matching post |

---

## Theme

Light and dark are both first-class. The site follows the visitor's OS setting
until they press the toggle in the header, after which their choice is
remembered in `localStorage`. All colours are CSS custom properties defined at
the top of `assets/css/main.css` — change `--accent` there and the whole site
follows.
