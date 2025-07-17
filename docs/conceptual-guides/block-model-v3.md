---
myst:
  html_meta:
    "description": "Block model version 3"
    "property=og:description": "Block model version 3"
    "property=og:title": "Block model version 3"
    "keywords": "Volto Light Theme, Block model version 3"
---

# Block Model Version 3

## Summary

Block Model v3 introduces a unified container architecture (block anatomy) that ensures consistent styling and spacing between View and Edit modes. This eliminates the previous issues where Edit mode appeared different from the View and simplifies CSS by providing a standardized two-level container system.

**Key Benefits:**
- Consistent rendering across View and Edit modes
- Simplified CSS with standardized container structure
- Improved spacing control through block categories
- Reduced maintenance overhead

## Visual Architecture

```
┌────────────────────────────────────────────────────────────┐
│ Main/Outer Container (.block.${type}.category-${category}) │
│ • Full width (edge to edge)                                │
│ • Background color & theme variables                       │
│ • Vertical spacing via padding on BG color changes         │
│                                                            │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ Secondary/Inner Container (.block-inner-container)    │ │
│  │ • Content width & horizontal centering                │ │
│  │ • Default vertical spacing between blocks             │ │
│  │ • Content alignment via CSS Grid                      │ │
│  │                                                       │ │
│  │    [Block Content Here]                               │ │
│  │                                                       │ │
│  └───────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────┘
```

## History and Evolution

### DLR Block Model (v1)
The block contained all rendering information but required exhaustive, error-prone rules that were difficult to maintain comprehensively.

### VLT Block Model (v2)
Introduced block wrappers in view mode with grouped properties, background colors, and containers. This simplified CSS significantly but created inconsistency between view and edit modes, making them appear different due to wrapper structures conflicting with drag-and-drop functionality.

#### Current Edit Mode Structure
```jsx
<div
  style="$StyleWrapperStyles"
  class="block-editor-{$type} $StyleWrapperClassNames"
>
  <div style="position: relative;">
    <div class="drag handle wrapper" />
    <div class="ui drag block inner $type">
      <div class="block $type selected">
        <div class="block $type">
          {Edit component}
        </div>
      </div>
      <button class="ui basic icon button delete-button" />
      <button class="ui basic icon button block-add-button new-add-block" />
    </div>
  </div>
</div>
```

### Block Model v3 Solution
Provides identical container structures in both View and Edit modes, enabling unified CSS that works consistently across both rendering contexts–a cross-contextual block. It relies heavily on the Sidebar Order tab to move blocks on the page.

## Container Architecture

### Main/Outer Container

**Purpose:** Handles block positioning within the page layout and applies theme styling.

**Characteristics:**
- **Full width:** Must extend from left edge to right edge of page
- **No horizontal spacing:** Must not have horizontal margin or padding
- **Vertical spacing only:** Uses padding (not margin) to maintain background color consistency
- **Theme integration:** Receives injected classNames and styles from StyleWrapper

**CSS Classes:** `.block.${type}.category-${category}`

### Secondary/Inner Container

**Purpose:** Manages content width constraints and provides consistent inter-block spacing.

**Characteristics:**
- **Content width control:** Can use full width (e.g., Slider) or constrained width (e.g., text blocks)
- **Horizontal centering:** Uses CSS Grid with `place-content` for alignment
- **Vertical spacing:** Provides default spacing between blocks via `padding-bottom`, which can be adjusted based on the blocks' category.
- **Content alignment:** Supports alignment options through CSS variables

**CSS Class:** `.block-inner-container`

## Block Categories

Block categories determine spacing relationships and default behaviors between adjacent blocks based on their category attribute available at `config.blocks.blocksConfig.[$type].category`.

### Spacing Rules
Vertical spacing between blocks is provided by the **upper block** following this convention:
- Block content, in general, should be flush with the top of its container
- Bottom padding creates space for the following block
- Different category combinations may have specific spacing adjustments

As a general rule, if the block's content requires internal spacing in _all_ possible cases, then it should be applied to the content itself. Otherwise, it is recommended to rely on the block category system to manage spatial relationships between blocks.

## Implementation

### View Mode Structure
```jsx
<div 
  style="$StyleWrapperStyles" 
  className="block $type category-$category $StyleWrapperClassNames"
>
  <div className="block-inner-container">
    {View component}
  </div>
</div>
```

### Edit Mode Structure
```jsx
<div 
  style="$StyleWrapperStyles" 
  className="block $type category-$category $StyleWrapperClassNames"
>
  <div className="block-inner-container">
    {Edit component}
  </div>
  <div className="block-edit-helpers">
    {/* Delete block button, move block buttons, etc. */}
  </div>
</div>
```

### CSS Framework
```css
.block {
  background: var(--theme-color, --background-color);
  color: var(--theme-foreground-color, --font-color);

  .block-inner-container {
    @include default-container-width(); /* This mixin sets a max-width and left/right margins to auto */
    display: grid;
    
    /* Spacing between sibling blocks, this is the place to increase spacing based on block categories */
    padding-bottom: $block-vertical-space; /* Default spacing between blocks */
    
    /* Generic content alignment */
    place-content: var(--block-alignment, start);
  }
}
```

## Block Component Simplicity

Block Model v3 aims for simplicity in block components. A button block should be just a `<button>` element, no additional wrappers or styling divs. The standardized container system, through general use block widgets, handles all layout, spacing, backgrounds, and theme integration, allowing block developers to focus purely on content and functionality.

### Button Block Example

**View Component:**
```jsx
<div 
  style="$StyleWrapperStyles" 
  className="block __button category-action $StyleWrapperClassNames"
>
  <div className="block-inner-container">
    <button onClick={handleClick}>
      {buttonText}
    </button>
  </div>
</div>
```

**Edit Component:**
```jsx
<div 
  style="$StyleWrapperStyles" 
  className="block __button category-action $StyleWrapperClassNames"
>
  <div className="block-inner-container">
    <button onClick={handleClick}>
      {buttonText}
    </button>
  </div>
  <div className="block-edit-helpers">
    {/* Delete block button, move block buttons, etc. */}
  </div>
</div>
```

Notice how the actual block content (the `<button>` element) remains identical in both modes, while the framework containers handle all the differences in layout and editing functionality. There are of course cases, like text blocks with inline editing, where the View and Edit components must differ, but their spatial and styling needs would most likely remain the same.

## Configuration

### Project-Level Configuration
Set `config.settings.blockModel: 3` to enable v3 for all compatible blocks.

### Block-Level Configuration
Individual blocks can opt into v3 via `config.blocks.blocksConfig.[$type].blockModel: config.settings.blockModel`.

### Block Category Configuration
Block categories are available at `config.blocks.blocksConfig.[$type].category`.

**⚠️ Important:** It is recommended to only set project-level block model to 3 when all blocks in the registry are v3-compatible (indicated by banner in block's GitHub repository).

### Compatibility Considerations
Block Model v3 is introduced as opt-in to maintain backward compatibility with existing implementations.
