---
layout: page
title: Posts
permalink: /posts/
lede: >-
  Research write-ups, papers explained, and the occasional piece of news.
description: Writing and news from Luca Scimeca — research write-ups and press.
---

<section class="section">
  <div class="wrap">
    {%- assign visible_posts = site.posts | where_exp: "p", "p.visible != false" -%}
    {%- if visible_posts.size > 0 %}
    <div class="card-grid">
      {%- for post in visible_posts %}
      <a class="card" href="{{ post.url | relative_url }}">
        {%- if post.cover %}
        <div class="card-media{% if post.cover_fit == 'contain' %} card-media--contain{% endif %}">
          <img src="{{ post.cover | relative_url }}" alt="" loading="lazy">
        </div>
        {%- endif %}
        <div class="card-body">
          <span class="card-date">{{ post.date | date: "%d %b %Y" }}{% if post.venue %} · {{ post.venue }}{% endif %}</span>
          <span class="card-title">{{ post.title }}</span>
          <p class="card-excerpt">{{ post.standfirst | default: post.excerpt | strip_html | normalize_whitespace | truncate: 165 }}</p>
          <span class="card-more">Read {% include icon.html name="arrow-right" %}</span>
        </div>
      </a>
      {%- endfor %}
    </div>
    {%- else %}
    <p class="lede">Nothing published yet.</p>
    {%- endif %}
  </div>
</section>
