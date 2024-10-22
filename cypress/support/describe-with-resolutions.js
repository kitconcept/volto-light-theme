/*
This are the default resolutions:

```
["macbook-16", "macbook-13", "ipad-2", "iphone-8"]
```

To specify a different set, or even add a tuple of numbers:

```
["macbook-16", [1280, 1200]]
```

Usage: embed your tests into:

```js
  describeWithResolutions(undefined, (setViewport, title) => {
     // your tests
  }));
```

To override the default resolutions:

```js
  describeWithResolutions(['macbook-16', 'iphone-8', [1280, 1000]], (setViewport, title) => {
     // your tests
  }));
```
*/

const defaultResolutions = ['macbook-16', 'macbook-13', 'ipad-2', 'iphone-8'];

const describeWithResolutions = (
  resolutions = defaultResolutions,
  fDescribe,
) => {
  for (const resolution of resolutions) {
    const setViewport =
      typeof resolution === 'string'
        ? (cy) => cy.viewport(resolution)
        : (cy) => cy.viewport(resolution[0], resolution[1]);
    const title =
      typeof resolution === 'string'
        ? resolution
        : `${resolution[0]}x${resolution[1]}`;
    describe(`resolution=${title}`, () =>
      fDescribe(setViewport, title, resolution));
  }
};

export default describeWithResolutions;
