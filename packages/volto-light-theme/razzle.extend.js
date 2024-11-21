const plugins = (defaultPlugins) => {
  const newPlugins = defaultPlugins.filter((plugin) => plugin !== 'scss');
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
