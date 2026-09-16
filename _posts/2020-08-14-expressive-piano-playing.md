---
title: "Gaussian Process Inference Modelling of Dynamic Robot Control for Expressive Piano Playing"
date: 2020-08-14
venue: PLOS ONE
redirect_from:
  - /example-post/
  - /portfolio/dynamic-robot-control-for-expressive-piano-playing/
clip: piano
clip_pos: "center 64%"
cover: /assets/img/posts/piano-card.jpg
cover_alt: A robot arm pressing piano keys, from the expressive piano playing experiments
show_cover: false
standfirst: >-
  A robot that can autonomously learn to play piano by mimicking the dynamics of
  different human playing styles.
resources:
  - label: Paper (PLOS ONE)
    url: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0237826
  - label: Code & data
    url: https://github.com/lucascimeca/robo_piano_learning
---

{% include clip.html name="piano" portrait=true
   alt="A robot arm pressing piano keys while learning a playing style" %}

Our paper in *PLOS ONE*, written with Cheryn Ng and Fumiya Iida, proposes a
Gaussian process–based framework that lets a robot use sound feedback to learn to
play the piano in ten different styles.

The piano takes humans years of practice to learn, and much of the skill lies in details
that are hard to see: how fast a key is struck, how long it is held, and how it is
released. These details matter most for the delicate expression of advanced pieces. By
studying the physical interaction between player and instrument, we hoped to gain insight
into human dexterity and adaptability.

Our hypothesis was that the relationship between how a key is pressed and the sound it
produces is highly nonlinear. To test it, we kept the platform minimal: a UR5 robotic arm
with a single elastic, 3D-printed finger, playing a digital piano. The robot performed
3,125 key presses with varied control parameters, while the piano recorded the sound of
each one as MIDI data.

<figure>
  <img src="/assets/img/posts/piano-framework.png" alt="Diagram of the learning loop linking the robot's control parameters, the piano's MIDI audio, and the Gaussian process models for each playing style">
  <figcaption>(a) The learning loop: the piano's MIDI output is used to fit GP models, which set the robot's control parameters for each playing style. (b) The mapping the models learn. Figure from the paper (CC BY 4.0).</figcaption>
</figure>

From this data, we trained Gaussian process (GP) models for ten playing styles, covering
articulations such as staccato and tenuto, and dynamics from *fortissimo* down to *pppp*.
Comparing the control parameters with the sounds they produced confirmed a strongly
nonlinear relationship, especially for rich expressions such as a wide range of dynamics.
Linear regression models found this relationship difficult and slow to learn, compared
with our GP-based approach.

Finally, we compared the robot with an experienced human pianist playing the same styles.
For some expressions the robot's sound came close to the human's; others will need
further investigation.
