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
      {% include post-card.html post=post %}
      {%- endfor %}
    </div>
    {%- else %}
    <p class="lede">Nothing published yet.</p>
    {%- endif %}
  </div>
</section>
