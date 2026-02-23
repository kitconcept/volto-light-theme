const plugins = (defaultPlugins) => {
  const newPlugins = defaultPlugins.filter((plugin) => {
    if (typeof plugin === 'string') return plugin !== 'scss';
    if (typeof plugin === 'object' && plugin !== null && plugin.name === 'scss')
      return false;
    return true;
  });
  newPlugins.push({
    name: 'scss',
    options: {
      sass: {
        dev: {
          sassOptions: {
            includePaths: ['node_modules'],
            outputStyle: 'expanded',
            sourceMap: true,
            silenceDeprecations: ['legacy-js-api', 'mixed-decls', 'import'],
            quietDeps: true,
          },
        },
        prod: {
          sassOptions: {
            includePaths: ['node_modules'],
            outputStyle: 'expanded',
            sourceMap: true,
            silenceDeprecations: ['legacy-js-api', 'mixed-decls', 'import'],
            quietDeps: true,
          },
        },
      },
    },
  });
  return newPlugins;
};

const modify = (config, { target, dev }, webpack) => {
  return config;
};

module.exports = {
  plugins,
  modify,
};
