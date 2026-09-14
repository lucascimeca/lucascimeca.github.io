---
layout: page
title: Work
permalink: /work/
linkbar: true
sticky_sections: true
lede: Employment, education, academic service and awards.
description: >-
  Luca Scimeca's full work history — employment, education, academic service
  and awards.
---

<!-- ====================================================== Employment -->
<section class="section">
  <div class="wrap">
    <h2 class="eyebrow">Current</h2>

    <div class="timeline">
      {%- for c in site.data.experience.current %}
      <div class="entry">
        <div class="entry-years">{{ c.years }}</div>
        <div class="entry-logo entry-logo--empty" aria-hidden="true"></div>
        <div class="entry-body">
          <p class="entry-role">{{ c.role }}</p>
          <p class="entry-org"><span class="mark">{{ c.org }}</span>{% if c.location %}<span class="sep">·</span>{{ c.location }}{% endif %}</p>
          {%- if c.note %}<p class="entry-detail">{{ c.note }}</p>{% endif %}
        </div>
      </div>
      {%- endfor %}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <h2 class="eyebrow">Employment history</h2>

    <div class="timeline">
      {%- for e in site.data.experience.past %}
      <div class="entry">
        <div class="entry-years">{{ e.years }}</div>
        {%- if e.logo %}
        <div class="entry-logo"><img src="{{ '/assets/img/logos/' | append: e.logo | relative_url }}" alt="" loading="lazy"></div>
        {%- elsif e.monogram %}
        <div class="entry-logo"><span class="logo-monogram">{{ e.monogram }}</span></div>
        {%- else %}
        <div class="entry-logo entry-logo--empty" aria-hidden="true"></div>
        {%- endif %}
        <div class="entry-body">
          <p class="entry-role">{{ e.role }}</p>
          <p class="entry-org"><span class="mark">{{ e.org }}</span>{% if e.location %}<span class="sep">·</span>{{ e.location }}{% endif %}</p>
          {%- if e.detail %}<p class="entry-detail">{{ e.detail }}</p>{% endif %}
          {%- if e.sub %}
          {%- for s in e.sub %}
          <p class="entry-sub"><strong>{{ s.role }}</strong>{% if s.detail %} — {{ s.detail }}{% endif %}</p>
          {%- endfor %}
          {%- endif %}
        </div>
      </div>
      {%- endfor %}
    </div>
  </div>
</section>

<!-- ====================================================== Education -->
<section class="section">
  <div class="wrap">
    <h2 class="eyebrow">Education</h2>

    <div class="timeline">
      {%- for e in site.data.education %}
      <div class="entry">
        <div class="entry-years">{{ e.years }}</div>
        {%- if e.logo %}
        <div class="entry-logo"><img src="{{ '/assets/img/logos/' | append: e.logo | relative_url }}" alt="" loading="lazy"></div>
        {%- elsif e.monogram %}
        <div class="entry-logo"><span class="logo-monogram">{{ e.monogram }}</span></div>
        {%- else %}
        <div class="entry-logo entry-logo--empty" aria-hidden="true"></div>
        {%- endif %}
        <div class="entry-body">
          <p class="entry-role">{{ e.degree }}</p>
          <p class="entry-org"><span class="mark">{{ e.org }}</span>{% if e.location %}<span class="sep">·</span>{{ e.location }}{% endif %}</p>
          {%- if e.detail %}<p class="entry-detail">{{ e.detail }}</p>{% endif %}
        </div>
      </div>
      {%- endfor %}
    </div>
  </div>
</section>

<!-- ====================================================== Academic service -->
<section class="section">
  <div class="wrap">
    <h2 class="eyebrow">Academic service</h2>
    <div class="stack">
      {%- for g in site.data.services %}
      <div class="stack-row">
        <div class="entry-years">{{ g.years }}</div>
        <ul>{% for i in g.items %}<li>{{ i }}</li>{% endfor %}</ul>
      </div>
      {%- endfor %}
    </div>
  </div>
</section>

<!-- ====================================================== Awards -->
<section class="section">
  <div class="wrap">
    <h2 class="eyebrow">Awards &amp; honours</h2>
    <div class="stack">
      {%- for a in site.data.awards %}
      <div class="stack-row">
        <div class="entry-years">{{ a.years }}</div>
        <div>
          <p class="award-title">{{ a.title }}</p>
          {%- if a.org %}
          <p class="award-org"><span class="mark">{{ a.org }}</span>{% if a.location %}<span class="sep">·</span>{{ a.location }}{% endif %}</p>
          {%- endif %}
          {%- if a.detail %}<p class="award-detail">{{ a.detail }}</p>{% endif %}
        </div>
      </div>
      {%- endfor %}
    </div>
  </div>
</section>

<!-- ====================================================== CTA -->
<section class="section">
  <div class="wrap">
    <p>
      <a class="btn" href="https://scholar.google.co.uk/citations?user=fKJvAvMAAAAJ" target="_blank" rel="noopener">
        {% include icon.html name="scholar" %}Publications on Google Scholar
      </a>
    </p>
  </div>
</section>
