---
layout: page
title: Posts & News
permalink: /posts/
lede: Coverage, interviews, posts and more.
description: News coverage, interviews and writing from Luca Scimeca.
---

{%- if site.data.media and site.data.media.size > 0 %}
<section class="section">
  <div class="wrap">
    <h2 class="eyebrow">In the media</h2>

    <div class="newslist">
      {%- for m in site.data.media %}
      <article class="news">
        <div class="news-media{% unless m.image %} news-media--blank{% endunless %}{% if m.image_fit == 'contain' %} news-media--contain{% endif %}">
          {%- if m.image %}
          <img src="{{ m.image | relative_url }}" alt="" loading="lazy">
          {%- else %}
          <span class="news-media-label">{{ m.outlet }}</span>
          {%- endif %}
        </div>

        <div class="news-body">
          <p class="news-meta">
            <time datetime="{{ m.date | date: '%Y-%m-%d' }}">{{ m.date | date: "%d %b %Y" }}</time>
            <span class="sep" aria-hidden="true">·</span>{{ m.kind }}
            <span class="sep" aria-hidden="true">·</span>{{ m.outlet }}
          </p>

          {%- comment -%}
            Only the title is a real link; it stretches over the whole card via
            ::after. Nesting the "also in" links inside an outer <a> would be
            invalid HTML, so they sit above the overlay instead.
          {%- endcomment -%}
          <h3 class="news-title">
            <a href="{{ m.url }}" target="_blank" rel="noopener">{{ m.title }}</a>
          </h3>

          <p class="news-summary">{{ m.summary }}</p>

          {%- if m.also and m.also.size > 0 %}
          <ul class="news-also">
            {%- for o in m.also %}
            <li><a href="{{ o.url }}" target="_blank" rel="noopener">{{ o.name }}</a></li>
            {%- endfor %}
          </ul>
          {%- endif %}
        </div>
      </article>
      {%- endfor %}
    </div>
  </div>
</section>
{%- endif %}

<section class="section">
  <div class="wrap">
    <h2 class="eyebrow">Posts</h2>
    {%- assign visible_posts = site.posts | where_exp: "p", "p.visible != false" -%}
    {%- if visible_posts.size > 0 %}
    <div class="card-grid">
      {%- for post in visible_posts %}
      {% include post-card.html post=post %}
      {%- endfor %}
    </div>
    {%- else %}
    <p class="lede">Nothing published yet.</p>
    {%- endif %}
  </div>
</section>
