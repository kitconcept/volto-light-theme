# Compatibility

| VLT version | Volto version |
|-------------|---------------|
|   3.x.x  |   >= Volto 17.0.0-alpha.16  |
|   4.x.x  |   < Volto 17.18.0  |
|   5.x.x  |   >= Volto 17.18.0 or >=Volto 18.0.0-alpha.36  |

Compatibility with Volto 16 might be achieved, but it has to be at customization level in the specific project add-on.
This is mainly due to the `RenderBlocks` customization that is based in the one in 17 because of the Grid block in core and the autogrouping feature.
See more information about the other dependencies in `peerDependencies` in `package.json`.