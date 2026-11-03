---
title: 'Sketchbook'
labels: ['Sketchbook', 'Painting', 'Lettering', 'Illustration']
paper: '#FEFBEE'
# Figma frame "Desktop - 3" (node 40:38) — all x/y/w/h below are in its 1632-px coordinate space
canvas: { w: 1632, h: 10030 }
pieces:
  - id: paper
    node: '40:40'
    kind: texture
    src: ./pieces/paper-texture.jpg
    alt: ''
    x: -43
    y: 980
    w: 1526
    h: 2007
    z: 1
    speed: 0.88
    phone: { hidden: true }

  - id: portrait
    node: '40:41'
    src: ./pieces/portrait-headscarf.jpg
    alt: 'Oil portrait of a woman in a headscarf, in profile'
    x: -67
    y: 151
    w: 822
    h: 903
    z: 3
    speed: 0.94
    zoom: true
    phone: { w: 246, align: bleed-start }

  - id: lettering
    node: '40:42'
    src: ./pieces/lettering-handmade-fonts.png
    alt: 'Hand-lettering study “Handmade fonts” with drawn flowers'
    x: 674
    y: 176
    w: 284
    h: 426
    z: 4
    speed: 1.1
    phone: { w: 148, align: end }

  - id: notes-1
    node: '40:43'
    kind: notes
    src: ./pieces/notes-1.png
    alt: 'Handwritten notes on the lettering, in red and black'
    x: 776
    y: 671
    w: 548
    h: 309
    z: 4
    speed: 1.14
    phone: { w: 213, align: start }

  - id: figures
    node: '40:45'
    src: ./pieces/figures-on-paper.jpg
    alt: 'Painting of reclining figures on paper'
    x: 323
    y: 1160
    w: 1146
    h: 859
    z: 3
    speed: 0.95
    zoom: true
    phone: { align: bleed }

  - id: notes-2
    node: '40:44'
    kind: notes
    src: ./pieces/notes-2.png
    alt: 'Handwritten notes on the painting'
    x: 49
    y: 1710
    w: 548
    h: 309
    z: 4
    speed: 1.14
    phone: { w: 197, align: end }

  - id: poster
    node: '40:46'
    src: ./pieces/poster-city-words.jpg
    alt: 'Poster “A City Transformed by Words”'
    x: 162
    y: 2289
    w: 734
    h: 1079
    z: 5
    speed: 1.06
    hold: true # CHECK RIGHTS before publishing
    phone: { w: 197, align: start }

  - id: scribble
    node: '40:55'
    kind: scribble
    src: ./pieces/scribble-ss13.png
    alt: 'Black ink scribbles and the cover line “SS — 13, Issue №5”'
    x: -215
    y: 3290
    w: 2015
    h: 1079
    z: 6
    speed: 1.08
    phone: { align: bleed }

  - id: red
    node: '40:39'
    kind: block
    color: '#C33030'
    bgShift: true
    x: -130
    y: 4340
    w: 2064
    h: 1534
    z: 1

  - id: portrait-blue
    node: '40:56'
    src: ./pieces/portrait-blue.jpg
    alt: 'Painted portrait of a woman in a blue patterned top'
    x: 831
    y: 4663
    w: 527
    h: 703
    z: 3
    speed: 1.07
    zoom: true
    phone: { w: 180, align: end, group: block }

  - id: figure-behind
    node: '40:58'
    src: ./pieces/figure-from-behind.jpg
    alt: 'Painting of a figure seen from behind'
    x: 287
    y: 4862
    w: 483
    h: 644
    z: 3
    speed: 0.93
    zoom: true
    phone: { w: 164, align: start, group: block }

  - id: reclining
    node: '40:57'
    src: ./pieces/reclining-figure.jpg
    alt: 'Large painting of a reclining nude figure in warm colours'
    x: -97
    y: 5728
    w: 1825
    h: 1289
    z: 2
    speed: 0.92
    zoom: true
    phone: { align: bleed }

  - id: hot-mess
    node: '40:48'
    src: ./pieces/hot-mess.png
    alt: 'Brush lettering “Hot Mess!”'
    x: 9
    y: 7457
    w: 807
    h: 622
    z: 3
    speed: 1.06
    hold: true # CHECK RIGHTS: looks like a font product sheet
    phone: { w: 246, align: start }

  # Children's drawings (credit + permission needed). Positions read from the canvas; 40:51's layer data is off.
  # Tiled with 20-px gaps, so only the right-hand column (city, peacock) gets a speed, shared by both.
  - { id: kids-leaves, node: '40:51', kind: group, src: ./pieces/kids-leaves.jpg, alt: 'Child’s painting of leaves and chestnuts', x: 111, y: 8040, w: 662, h: 417, z: 3, phone: { group: grid-a } }
  - { id: kids-city, node: '40:49', kind: group, src: ./pieces/kids-city.jpg, alt: 'Child’s painting of a city by the sea with boats', x: 793, y: 8041, w: 809, h: 561, z: 3, speed: 1.06, phone: { group: grid-b } }
  - { id: kids-nest, node: '40:54', kind: group, src: ./pieces/kids-nest.jpg, alt: 'Child’s painting of a bird’s nest in a tree', x: -69, y: 8477, w: 411, h: 548, z: 3, phone: { group: grid-a } }
  - { id: kids-still-life, node: '40:52', kind: group, src: ./pieces/kids-still-life.jpg, alt: 'Child’s still life with a bottle and fruit', x: 362, y: 8477, w: 411, h: 548, z: 4, phone: { group: grid-a } }
  - { id: kids-peacock, node: '40:50', kind: group, src: ./pieces/kids-peacock.jpg, alt: 'Child’s painting of a peacock', x: 793, y: 8622, w: 809, h: 529, z: 4, speed: 1.06, phone: { group: grid-b } }
  - { id: kids-nest-2, node: '40:53', kind: group, src: ./pieces/kids-nest-2.jpg, alt: 'Child’s painting of storks in a nest', x: 362, y: 9045, w: 411, h: 548, z: 3, phone: { group: grid-b } }
---

Painting, lettering and illustration from my sketchbooks: the hand-made side of the brand work.
