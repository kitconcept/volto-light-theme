
# Layout

## Containers

VLT uses three types of container widths:

-   Narrow (text)
-   Default (blocks)
-   Layout (main screen elements such as Header, Footer)

The values of these containers are controlled by SCSS variables in {file}`_variables.scss` and have these default values:

```scss
$layout-container-width: 1440px !default;
$default-container-width: 940px !default;
$narrow-container-width: 620px !default;
```

You can customize them by overriding them in your add-on {file}`_variables.scss`:

```scss
$narrow-container-width: 940px;
```

The Layout sized elements snap to 1440px (they do not grow beyond 1440px).
The breakpoints are also different from default Volto, see {file}`_variables.scss` for reference.
This layout uses mixins and CSS that can be found in {file}`_layout.scss` in the {file}`src/theme` folder so you can use them also in your projects and add-ons.


## Media queries vs. container queries

We use media queries when the styling is generic enough to apply only to the view.

We use container queries when we care explicitly about how the styles are applied in edit mode, and we want the content area to behave 1:1 with the view mode.

This is because the container queries allow us to abstract the width from the sidebar and toolbar in edit mode, showing the content area as it will be in that size, in view mode.

**Remember**: The margins in responsive layouts are handled with container queries in {file}`layout.scss`.
So everything related to that, goes like it works in there, with container queries.
See implementations for details in case you need it.


