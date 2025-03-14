---
myst:
  html_meta:
    'description': 'How to use the Summary component in Volto Light Theme'
    'property=og:description': 'How to use the Summary component in Volto Light Theme'
    'property=og:title': 'Customizing'
    'keywords': 'Volto Light Theme, summary, listing, teaser, content type'
---

# Summary component

```{versionadded} volto-light-theme 6.0.0-alpha.13

```

The `Summary` component is used to render key information about a content item in several locations:

- listing block
- search block
- teaser block

```{figure} /_static/summary.png
:alt: Screenshot of a Volto listing highlighting the Summary component
:target: /_static/summary.png
The default summary includes the kicker, title, and description.
```

## Built-in summary implementations

Volto Light Theme includes the following summary implementations for core content types:

- `DefaultSummary`: Includes the kicker, title, and description. This component is used for any content type that doesn't have a specific summary component registered.
- `NewsItemSummary`: Includes the publication date, kicker, title, and description for News Items.
- `EventSummary`: Includes the start and end date, kicker, title, and description for Events.
- `FileSummary`: Includes the file size and type for Files.

## Register a summary for a content type

You can create a custom summary implementation and register it for a content type.

The summary component must accept `item` and `HeadingTag` as props.
Here is an example which renders the publication date for a `Blog Post` content type:

```jsx
import { parseDateFromCatalog } from '@kitconcept/volto-light-theme/helpers/dates';
import FormattedDate from '@plone/volto/components/theme/FormattedDate/FormattedDate';

const BlogPostSummary = (props) => {
  const { item, HeadingTag = 'h3' } = props;

  const effective = parseDateFromCatalog(item.effective);
  const headline = [
    effective ? (
      <FormattedDate
        key="day"
        date={effective}
        format={{
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }}
        className="day"
      />
    ) : null,
    item.head_title,
  ]
    .filter((x) => x)
    .flatMap((x) => [' | ', x])
    .slice(1);

  return (
    <>
      {headline.length ? <div className="headline">{headline}</div> : null}
      <HeadingTag className="title">
        {item.title ? item.title : item.id}
      </HeadingTag>
      {!item.hide_description && (
        <p className="description">{item.description}</p>
      )}
    </>
  );
};

export default BlogPostSummary;
```

The custom summary component must be registered in the Volto registry in your add-on's `applyConfig` function.
For example, this registers the `BlogPostSummary` component as the summary to be used for a custom content type named `Blog Post`:

```jsx
import BlogPostSummary from 'volto-my-add-on/components/Summary/BlogPostSummary';

const applyConfig = (config) => {
  config.registerComponent({
    name: 'Summary',
    component: BlogPostSummary,
    dependencies: ['Blog Post'],
  });
};
```

## Use the summary component

You can use the `Summary` component to render a content type anywhere that the summary serialization is available (such as from `items` in the Plone REST API, or the results from the `@querystring-search` endpoint).

Use it like this:

```jsx
import config from '@plone/volto/registry';
import DefaultSummary from '@kitconcept/volto-light-theme/components/Summary/DefaultSummary';

const Summary =
  config.getComponent({
    name: 'Summary',
    dependencies: [item['@type']],
  }).component || DefaultSummary;

return <Summary item={item} />;
```
