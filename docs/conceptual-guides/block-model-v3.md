---
myst:
  html_meta:
    "description": "Block model version 3"
    "property=og:description": "Block model version 3"
    "property=og:title": "Block model version 3"
    "keywords": "Volto Light Theme, Block model version 3"
---

# Block model version 3

## Introduction and history

### DLR Block model (v1)

The block has all the information needed for rendering itself, but the rules are exhaustive, cumbersome, and prone to error if they are not exhaustive enough.


### VLT Block model (v2)

After the DLR experience, we tried the approach of using a block wrapper in view mode that would arrange the blocks grouped by a property, background color, and wrapped in a container.
This container is the one with the vertical spacing and the color.
This proved to dramatically simplify the CSS, with the drawback that the wrapper and the arrangement logic should be present in the view mode.
This made it very difficult to do the same in edit mode, because of the existing drag-and-drop wrappers, so the edit mode renders "ugly" without them.


## Block Model version 3

### View/Edit containers

The block should have the same containers in both View and Edit components, so we can write CSS once that applies to both.

These containers will conform the following two-level wrappers definitions.


#### Main/Outer container

This is the container that receives the injected block classNames and styles from the StyleWrapper.
It's the (familiar) `div` that has the `block ${type}` className.
In View mode it should be provided by the block developer.
In Edit mode it's part of the edit wrappers, `block-editor-${type}` wrapper, and automatically receives the StyleWrapper injected properties.

The principal responsibility of the Main/Outer container, other than giving the block its background color, is to fit the block into the layout of the page by stacking itself above or below its siblings.
It _must_ be full width, and go from the left edge to the right edge of the page.
It _must not_ have any margin or padding.
The only exception to this is the extra padding that is added for visual coherence when the block's background color is different from the previous or next sibling's background color.


#### Secondary/Inner container

The Secondary/Inner container takes care of the horizontal (block's content width) and vertical (vertical spacing between siblings) offsets.
For example, for a block such as the Slider, you might want to have a horizontal offset of zero, and have the content fill the width of the page.
On the other hand, for a Slate with a paragraph of text, you might want space offsetting both sides to facilitate readability and create a cleaner look.

The vertical spatial relationships between contiguous blocks will be defined by the blocks' categories.
For example, if a Slate (which has category inline) comes after a Slider (which has category full-width), the latter should add an extra bottom padding to improve the readability of the following paragraph.

To avoid background color inconsistencies, the vertical offset given by the Secondary/Inner container must be implemented using the padding property.
As a general rule—and to establish a convention—the vertical space between two blocks should be provided by the upper block.
This means that, for most cases, the top of the block's content must be flush with the top of the container.


### Block category

A block should be able to be categorized given its nature and visual characteristics.
This nature determines how they relate with the other siblings.

This category will help to determine the default behavior of the block by injecting it as a className.


### Improve the edit mode wrappers

We can improve the current edit wrappers, but we have to do it in a non-breaking way.

Current Edit mode wrappers:

```text
.block-editor-$type $StyleWrapperClassNames $StyleWrapperStyles
  div.[style="position: relative"] (the relative container)
    div.drag.handle.wrapper (the one of the drag icon)
    div.ui.drag.block.inner.$type (this is superfluous, but the block classname can't be removed)
      div.[role="presentation"].block.$type.selected (the state-wrapper, controls the blue border)
        {Edit component}
      button.ui.basic.button.delete-button
```

Proposed wrappers:

Edit

```text
.block-editor-$type $StyleWrapperClassNames $StyleWrapperStyles
  div.[style="position: relative"] (the relative container)
    div.drag.handle.wrapper (the one of the drag icon)
    div.ui.drag.block.inner.$type (this is superfluous, but the block classname can't be removed)
      div.[role="presentation"].block.$type.selected category-action
        <div classname="block-inner-container">
          {Edit component}
        </div>
      button.ui.basic.button.delete-button
```

View

```jsx
<div classname="block button category-action $StyleWrapperClassNames $StyleWrapperStyles">
  <div classname="block-inner-container">
    {View component}
  </div>
</div>
```

CSS

```css
.block-editor-button,
.button.button {
  background: var(--background-color)
}
```
