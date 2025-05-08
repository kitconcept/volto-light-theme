---
myst:
  html_meta:
    "description": "Volto Light Theme image aspect ratio"
    "property=og:description": "Volto Light Theme image aspect ratio token description"
    "property=og:title": "Image aspect ratio"
    "keywords": "Volto Light Theme, aspect ratio"
---

# Image aspect ratio

The `--image-aspect-ratio` CSS custom property defines the preferred width-to-height ratio for the image elements in the site. When set to a numeric value, it represents the specific aspect ratio to be set (width divided by height). For example, a value of `1.5` would create a 3:2 ratio where the width is 1.5 times the height. When set to `auto`, the images will use their intrinsic aspect ratio; however, this could generate alignment issues among images in grid elements if they have different width-to-height ratios from origin.

