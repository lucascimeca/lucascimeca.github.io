---
layout: page
title: Curriculum Vitae
permalink: /cv/
lede: >-
  The full CV, always the current version.
description: Luca Scimeca's curriculum vitae.
---

<section class="section">
  <div class="wrap">

    {%- comment -%}
      Google Drive's /preview endpoint is the embeddable one — /view sends
      X-Frame-Options: SAMEORIGIN and would render a blank frame. Because this
      points at the file id rather than a copied PDF, replacing the file in
      Drive updates this page with no change here.
    {%- endcomment -%}
    <div class="pdf-frame">
      <iframe src="https://drive.google.com/file/d/{{ site.cv.drive_id }}/preview"
              title="Curriculum Vitae of Luca Scimeca"
              allow="autoplay"></iframe>
    </div>

    <div class="actions" style="margin-top:1.5rem">
      <a class="btn btn-primary"
         href="https://drive.google.com/uc?export=download&amp;id={{ site.cv.drive_id }}">
        {% include icon.html name="document" %}Download PDF
      </a>
      <a class="btn"
         href="https://drive.google.com/file/d/{{ site.cv.drive_id }}/view"
         target="_blank" rel="noopener">
        Open in Google Drive {% include icon.html name="external" %}
      </a>
    </div>

    <p class="pdf-note">
      Trouble viewing? Some browsers and privacy extensions block embedded
      frames — the two buttons above always work.
    </p>

  </div>
</section>
