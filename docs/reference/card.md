---
myst:
  html_meta:
    "description": "Card primitive"
    "property=og:description": "Card primitive"
    "property=og:title": "Card primitive"
    "keywords": "Volto Light Theme, Card, primitive"
---

# Card primitive

The card primitive is a simple component that can be used to display content in a card-like format.
It has the traditional card layout with three configurable slots: image, summary, and actions.
These slots are filled via children components provided by the card component.

## Usage
The card primitive is used in the following way:

```jsx
<Card href="/path/to/item">
  <Card.Image src="/path/to/image" />
  <Card.Summary>
    <h2>Title</h2>
    <p>Summary text goes here.</p>
  </Card.Summary>
  <Card.Actions>
    <Button>Action 1</Button>
  </Card.Actions>
</Card>
```

```{tip}
See the [VLT Storybook](https://volto-light-theme.readthedocs.io/storybook/?path=/story/primitives-card--simple) for a live demo and the different variations of the card primitive.
```

## Variations

The card defaults to a simple vertical layout, but it can be configured to display in a horizontal layout.
The horizontal layout has two variations: image on the left and image on the right.

### Contained

If the card is contained, it will have a background color defined by the current theme colors.

### Listing

The card can be used in a listing format, where the image is displayed on the left and the summary and actions are displayed on the right.
The image slot takes an specific size controlled by the `--card-listing-image-size` CSS variable.
By default, this is set to `220px`.

## Slots

The card primitive has three slots: image, summary, and actions.
These have to be provided as children components.
These components are meant to be used in this specific order and are not interchangeable.

### `Card.Image`

This is the top slot of the card.
It is normally used to display an image, although it can be used to display any content.
By default, this component knows how to display an image given a `src` prop:

```tsx
<Card.Image src="/path/to/image" />
```

Or pass an image object that complies with the Plone's image [ObjectBrowserItem](https://github.com/plone/volto/blob/main/packages/types/src/blocks/objectBrowser.d.ts#L3) interface:

```tsx
<Card.Image image={image} />
```

This object is the one returned by Plone's content image field or Plone's catalog when selected using `ObjectBrowser`.

In case that you want to display a custom image component, you can pass it as a prop:

```tsx
<Card.Image
  src="/path/to/image"
  imageComponent={MyCustomImageComponent}
/>
```
This will render the image using the `MyCustomImageComponent` component, passing the `src` and `image` props to it.

### `Card.Summary`

This is the middle slot of the card.
It is used to display the kicker, title and description of the card.
You can pass any content to this slot, but it is recommended to use the following structure:

```tsx
<Card.Summary>
  <h2>Title</h2>
  <p>Summary text goes here.</p>
</Card.Summary>
```

It is recommended that you use the VLT `Summary` component in this slot.

```tsx
<Card.Summary>
  <Summary
    item={item}
    HeadingTag="h2"
  />
</Card.Summary>
```

This will ensure that the summary is displayed correctly and is accessible using VLT styles.

The `Summary` component can be retrieved from the component registry, depending on the current item type.

```tsx
import DefaultSummary from '@kitconcept/volto-light-theme/components/Summary/DefaultSummary';

const Summary =
  config.getComponent({
    name: 'Summary',
    dependencies: [href['@type']],
  }).component || DefaultSummary;
```

VLT has registered a few variations of the `Summary` component (eg. Events, News, etc.).

### `Card.Actions`

This is the bottom slot of the card.
It is used to display the actions of the card (if any).
You can pass any content to this slot.

```tsx
<Card.Actions>
  <Button>Action 1</Button>
</Card.Actions>
```

### Example usage in `DefaultBody` Teaser block component

```tsx
<Card
  href={!isEditMode ? href['@id'] : null}
  openLinkInNewTab={openLinkInNewTab}
>
  <Card.Image
    src={url && !image?.image_field ? url : undefined}
    item={!data.overwrite ? href : { ...href, ...filteredData }}
    image={data.overwrite ? image : undefined}
    imageComponent={Image}
  />
  <Card.Summary>
    <Summary
      item={!data.overwrite ? href : { ...href, ...filteredData }}
      HeadingTag="h2"
    />
  </Card.Summary>
</Card>
```
