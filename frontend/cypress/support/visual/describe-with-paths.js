/*

Usage: embed your tests into:

```js
  describeWithPaths({
    urls: [
      '/de',
      '/de/beispiele/block/das-dlr',
    },
  ], (path) => {
     // your tests
  });
```


You can optionally use a range filter:

```js
  describeWithPaths({
    urls: [
      '/de',
      '/de/beispiele/block/das-dlr',
    },
    filter: rangeFilter({
      start: 10,
      length: 50,
    })
  }, (path) => {
     // your tests
  });
```
*/

import { skipOn } from '@cypress/skip-test';
import rangeFilter from './range-filter';
import md5 from './md5';

const describeWithPaths = (
  name,
  {
    urls = [],
    filter = rangeFilter({
      start: 0,
      length: +Infinity,
      exclude: [],
      include: [],
    }),
  } = {},
  fDescribe,
  setViewport,
) => {
  for (const index in urls) {
    const url = urls[index];
    const path = new URL(url, window.location.href).href.match(
      /^[^/]*\/\/[^/]*(.*)$/,
    )[1];
    const fullPath = path.replace(/\//g, '+');
    describe(`${name}${String(index).padStart(4, '0')}=${
      fullPath.length <= 150
        ? fullPath
        : fullPath.substring(0, 110) + '...' + md5(path)
    }`, () => {
      fDescribe(path);
    });
  }
};

export default describeWithPaths;
