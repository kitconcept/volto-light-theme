---
myst:
  html_meta:
    "description": "React hook for live value updates in Volto add and edit modes."
    "property=og:description": "React hook for live value updates in Volto add and edit modes."
    "property=og:title": "useLiveData Hook"
    "keywords": "Volto, Hook, Redux, useLiveData, live update"
---

# useLiveData Hook

The `useLiveData` hook is a utility in volto-light-them project that provides a **single source of truth** for field values while creating or editing content.
It ensures that values are always **up-to-date** in both:

- **Add/Edit mode** → reads live values from the Redux form store.
- **View mode** → falls back to the content object or inherited behavior data.

This allows components to display field values that update immediately as the user types or updates value.

---

## Signature

```ts
function useLiveData<T>(
  content: Content,
  behavior: string | undefined,
  field: string,
): T | undefined
```

## How It Works

1. Detects if the current route is in **add mode** (`/add`).
2. If in add mode → always return the live form value from `state.form.global`.
3. Otherwise → return the live form value if present, else fallback to:
   - Behavior data  if behaviour is defined(`content['@components'].inherit[behavior].data[field]`)
   - Or get the direct field value on the content object.

This ensures the value is **reactive** to user input while editing and **correctly reflects stored content** in view mode.

## Example Usage

The following example demonstrates how to use `useLiveData` in a component that displays tags from content.
It works both in **add/edit mode** (live-updating values) and **view mode** (falling back to stored content).

```tsx
import { useLiveData } from 'hooks/useLiveData';
import { Link } from 'react-router-dom';
import { config } from '@plone/volto';

const Tags = ({ content }) => {
  // Get tags from content; live updates in add/edit mode
  const tags = useLiveData(content, undefined, 'subjects') || [];

  const Container =
    config.getComponent({ name: 'Container' }).component || SemanticContainer;

  if (!config.settings.showTags || !tags.length) return null;

  return (
    <Container className="default tags">
      {tags.map((tag) => (
        <Link className="ui label" to={`/search?Subject=${tag}`} key={tag}>
          {tag}
        </Link>
      ))}
    </Container>
  );
};

```


## Example: Behavior-based Live Data

`useLiveData` also works with fields provided by behaviors.
For instance, in the `FollowUsPostFooterLogoAndLinks` component, several fields are loaded via behaviors:

```tsx
const social_links = useLiveData(content, 'plonegovbr.socialmedia.settings', 'social_links');
const footer_links = useLiveData(content, 'voltolighttheme.footer', 'footer_links');
const post_footer_logo = useLiveData(content, 'kitconcept.footer', 'post_footer_logo');
```

## Explanation

- **Content:** The content object.
- **Behavior:** The behavior you describe in backend.
- **Field:** The field name.
- **Add/Edit mode:** These values **update live** as the user changes the corresponding fields.
- **View mode:** They fallback to the stored content or behavior data.
- **Full component reference:**
  See [FollowUsPostFooterLogoAndLinks](https://github.com/kitconcept/volto-light-theme/blob/main/frontend/packages/volto-light-theme/src/components/Footer/slots/FollowUsLogoAndLinks.tsx)
  for the full implementation, which renders **Follow Us links, footer links, and a post footer logo**.


