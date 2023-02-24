const plugins = (defaultPlugins) => {
  if (!defaultPlugins.includes('scss')) {
    return defaultPlugins.concat(['scss']);
  } else {
    return defaultPlugins;
  }
};
const modify = (config, { target, dev }, webpack) => {
  const themeConfigPath = `${__dirname}/src/theme/theme.config`;
  config.resolve.alias['../../theme.config$'] = themeConfigPath;
  config.resolve.alias['../../theme.config'] = themeConfigPath;

  const customThemePath = `${__dirname}/src/theme/custom`;
  config.resolve.alias['themeCustomizations'] = customThemePath;

  return config;
};

module.exports = {
  plugins,
  modify,
};
