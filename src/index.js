import "./theme/main.less";
import { TeaserStylingSchema } from "./components/Blocks/Teaser/schema";
import AlignWidget from "./components/Widgets/AlignWidget";

const applyConfig = (config) => {
  config.settings = {
    ...config.settings,
    slidingSearchAnimation: true,
  };

  config.widgets.widget.inner_align = AlignWidget;

  config.blocks.blocksConfig.__grid = {
    ...config.blocks.blocksConfig.__grid,
    // One could customize the blocks inside the grid like this:
    blocksConfig: {
      ...config.blocks.blocksConfig,
      teaser: {
        ...config.blocks.blocksConfig.teaser,
        enableStyling: false,
      },
    },
  };

  config.blocks.blocksConfig.teaser = {
    ...config.blocks.blocksConfig.teaser,
    enableStyling: true,
    stylesSchema: TeaserStylingSchema,
    group: "teasers",
    imageScale: "larger",
    // schemaEnhancer: teaserSchemaEnhancer,
  };

  return config;
};

export default applyConfig;
