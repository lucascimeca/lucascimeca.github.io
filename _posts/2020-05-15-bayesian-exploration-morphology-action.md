---
title: "Efficient Bayesian Exploration for Soft Morphology-Action Co-optimization"
date: 2020-05-15
venue: IEEE RoboSoft 2020
redirect_from:
  - /example-post-3/
  - /portfolio/bayesian-exploration-for-morphology-action-co-optimization/
clip: co-opt
cover: /assets/img/posts/co-opt-poster.jpg
cover_alt: A soft robotic end-effector changing morphology while probing objects
show_cover: false
standfirst: >-
  A mathematical framework for the active exploration of robot control and
  morphology, to aid in tactile discrimination tasks.
resources:
  - label: Paper (IEEE Xplore)
    url: https://ieeexplore.ieee.org/abstract/document/9116057
  - label: Code & data
    url: https://github.com/lucascimeca/morph_action_co-opt
---

{% include clip.html name="co-opt"
   alt="A soft robotic end-effector changing morphology while probing objects" %}

In "Efficient Bayesian Exploration for Soft Morphology-Action Co-optimization",
written with Perla Maiolino and Fumiya Iida, we propose a framework for actively
exploring robot control and morphology to aid discrimination tasks.

In soft robotics, a sensor's morphology, meaning its shape and the materials it is made
of, affects what it can feel. The right morphology can make a hard discrimination task
easier, or even possible. But a robot that can change both its sensor morphology and the
way it moves faces a large search: trying every combination of the two is slow, and
unsuited to real-world use.

We developed a framework based on Bayesian exploration that lets a robot co-optimize
both at once. The robot's flat end-effector carries a capacitive tactile sensor, and we
made three soft silicone filters for it, each with different morphological properties
that change how the sensor responds to touch. Mounted on a robotic arm, the end-effector
performed repeated, parameterized touches on eight objects that differ in geometry,
surface texture, and stiffness. The tasks were to tell round objects from edged ones,
rough surfaces from smooth ones, and stiff objects from soft ones.

The experiments show that morphing is necessary: with this sensor, some object
properties can only be told apart by changing its morphology. The framework consistently
found the best morphology-action configurations in about half the time of a systematic
search over all parameters. It is a step toward robots that use both their bodies and
their movements to help them perceive.

The work shares a question with our
[study of robotic palpation]({% post_url 2020-07-29-structuring-tactile-sensory-information %}):
how the way a robot touches shapes what it feels.

## Presentation

<div class="video">
  <iframe src="https://www.youtube-nocookie.com/embed/7IyPawFCycQ"
          title="Efficient Bayesian Exploration for Soft Morphology-Action Co-optimization"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen loading="lazy"></iframe>
</div>
