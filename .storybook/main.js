module.exports = {
  stories: [
    "../src/stories/**/*.stories.mdx",
    "../src/stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-viewport",
  ],
  staticDirs: [
    '../public'
  ],
  framework: {
    name: "@storybook/html-webpack5",
    options: {}
  },
  webpackFinal: async (config) => {
    const htmlLoader = config.module.rules.find(
      (rule) => rule.test?.toString() === "/\\.html$/"
    );
    htmlLoader.use = {
      loader: 'html-loader',
      options: {
        sources: false,
      }
    };
    return config;
  },
  docs: {
    autodocs: true
  }
}
