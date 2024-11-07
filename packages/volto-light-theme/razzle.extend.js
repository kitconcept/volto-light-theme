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
            quiet: true,
            quietDeps: true,
          },
        },
        prod: {
          sassOptions: {
            includePaths: ['node_modules'],
            outputStyle: 'expanded',
            sourceMap: true,
            quiet: true,
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
