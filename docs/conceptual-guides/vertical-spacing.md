# Vertical spacing

## Vertical spacing rules

The following main rules specification applies to the theme.

-   On each change of color, a vertical padding (both `padding-bottom` and `padding-top`) of `80px` defined by the main variable `$color-block-change-vertical-spacing`.
-   The default bottom margin is defined with the main variable `$block-vertical-space` and set by default to `25px`.
-   [grid] Vertical spacing for grids should be `80px` for both top and bottom, even if the previous and next blocks are of the same color.
-   [grid+grid] When two grids happen side by side and are of the same color, it should be equal to the grid gap.
    Thus, it's set to `@gutterWidth`, and currently `1rem`.
    It has to be adjusted with a bit of negative margin to cancel the current inner padding in grid cells.
-   [grid+grid] Grids columns belonging to the same grid and same color in small mobile viewports.
    They should be closer to match the other adjacent ones, so they seem to belong to the same grid set.
-   [footer] The footer has a top vertical spacing of `80px`.
-   [teasers] The last teaser, except if the following is a button, does _not_ have a line at the bottom.
-   [listing] The last listing, except if the following is a button, does _not_ have a line at the bottom.
-   [listing] After two consecutive listings, the vertical spacing should be `200px`.
-   [text+button] If there's a text and a button, then the vertical spacing between them is `60px`.
-   [image+separator-block] If after an image comes a separator block, the vertical spacing between them is `40px`.


## Block model (v2)

This theme has the concept of block "grouping", given two consecutive blocks with the same styling block wrapper property `backgroundColor`.
You have to add this property to your blocks in your blocks code.
This add-on customizes the {file}`RenderBlocks.jsx` component to do so, so it differs from the vanilla Volto one, what we call the "block model v1".

The wrappers have the class names `blocks-group-wrapper`, and the name of the background color, such as `grey`, defaulting to `transparent` if no `backgroundColor` property is set in the styling block wrapper in the block.

```{important}
A new block model is in the development planning.
It will be a new integral Block Model for VLT and Volto.
For more information see {doc}`block-model-v3`.
```
