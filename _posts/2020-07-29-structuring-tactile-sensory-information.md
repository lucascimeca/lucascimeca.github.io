---
title: "Structuring of Tactile Sensory Information for Category Formation in Robotics Palpation"
date: 2020-07-29
venue: Autonomous Robots
redirect_from:
  - /example-post-2/
  - /portfolio/robotics-palpation/
clip: palpation
cover: /assets/img/posts/palpation-poster.jpg
cover_alt: A robotic arm with a capacitive tactile sensor palpating a soft phantom
cover_fit: contain   # 2.33:1 clip — cropping it to the card box cut off the panel labels
show_cover: false
standfirst: >-
  Robotics and medicine — applying machine learning and tactile sensing to the
  autonomous detection of abnormal lumps in soft bodies.
resources:
  - label: Paper (Autonomous Robots)
    url: https://link.springer.com/article/10.1007/s10514-020-09931-y
  - label: Code
    url: https://github.com/lucascimeca/palpation_analysis
---

{% include clip.html name="palpation"
   alt="A robotic arm palpating a soft phantom with a capacitive tactile sensor" %}

Published in *Autonomous Robots*, with Perla Maiolino, Ed Bray, and Fumiya Iida.

When a robot palpates a soft body, the way it touches shapes what it feels. In this paper,
we propose a framework to study how a robot's physical interactions influence the tactile
information it gathers, and how to choose the interactions that make that information most
useful.

We fitted a capacitive tactile sensor to a 3D-printed end-effector on a robotic arm and used
it to probe soft silicone phantoms. Hidden inside were hard spherical inclusions, 7 or 20 mm
across, placed 5 or 15 mm below the surface. Each location was probed with different motion
strategies. We then compressed the resulting tactile data with principal component analysis
(PCA) and grouped it with k-means clustering, without using any labels.

The results show that the right probing strategy can compensate for data that is limited or
of poor quality. In a final palpation test, we trained a support vector machine (SVM) to tell
the types of inclusion apart. The unsupervised cluster analysis alone, with no labels,
predicted which motion strategy would work best and how the classifier's performance would
compare across strategies.

## The machine learning side

Another part of the project asks how a robot can choose its actions, and even the shape of
its body, to make touch more informative. I explain it in
[my talk at IEEE RoboSoft 2020](https://www.youtube.com/watch?v=7IyPawFCycQ), below. The paper
is covered in
"[Efficient Bayesian Exploration for Soft Morphology-Action Co-optimization]({% post_url 2020-05-15-bayesian-exploration-morphology-action %})".

<div class="video">
  <iframe src="https://www.youtube-nocookie.com/embed/7IyPawFCycQ"
          title="Efficient Bayesian Exploration for Soft Morphology-Action Co-optimization"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen loading="lazy"></iframe>
</div>
