# Block Model version 3

## Introduction and history

### DLR Block model (v1)

The block has all the information needed for render itself, but the rules are exhaustive and cumbersome, prone to error if they are not exhaustive enough.

### VLT Block model (v2)

After DLR experience, we tried the approach of using a block wrapper in view mode that would arrange the blocks are grouped by a property (background color) and wrapped in a container. This container is the one having the vertical spacing and the color.
This proved to simplify CSS dramatically, with the drawback that the wrapper and the arrangement logic should be present in the view mode, being very difficult to do the same in edit mode because of the DandD existing wrappers, so the edit mode renders "ugly" without them.

## Block Model version 3

### View/Edit containers

The block should have the same containers in both View/Edit components, so we can write CSS once that applies to both.

These containers will conform this two level wrappers definitions:

#### Main/Outter container

This is the container that receives the block injected classNames and styles from the StyleWrapper.
It's the (familiar) `div` that has the `block ${type}` className.
In View mode it should be provided by the block developer.
In Edit mode it's part of the edit wrappers: `block-editor-${type}` wrapper, and automatically receives the StyleWrapper injected properties.

#### Secondary/Inner container

This is the container that decides the inner properties, being the most important one, the width.


### Block category

A block should be able to be categorized given its nature. This nature determines how they relate with the other siblings.

This category will help to determine the default behavior of the block by injecting it as a className.

### Improve the edit mode wrappers

We can improve the current edit wrappers, but we have to do it in a non-breaking way.

Current Edit mode wrappers:

```
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
```
.block-editor-$type $StyleWrapperClassNames $StyleWrapperStyles
  div.[style="position: relative"] (the relative container)
    div.drag.handle.wrapper (the one of the drag icon)
    div.ui.drag.block.inner.$type (this is superfluous, but the block classname can't be removed)
      div.[role="presentation"].block.$type.selected category-inline
        <div classname="block-inner-container">
          {Edit component}
        </div>
      button.ui.basic.button.delete-button
```

View
```
<div classname="block button category-inline $StyleWrapperClassNames $StyleWrapperStyles">
  <div classname="block-inner-container">
    {View component}
  </div>
</div>
```

CSS
```
.block-editor-button,
.button.button {
  background: var(--background-color)
}
```

## Layout and vertical space rules

https://github.com/kitconcept/volto-light-theme#vertical-spacing-rules
https://github.com/kitconcept/dlr-internet/blob/main/docs/development/layout-rules.md
