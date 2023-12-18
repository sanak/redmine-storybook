module.exports = {
  stories: [
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
    // Skip html-loader sources processing
    const htmlLoader = config.module.rules.find(
      (rule) => rule.test?.toString() === "/\\.html$/"
    );
    htmlLoader.use = {
      loader: 'html-loader',
      options: {
        sources: false,
      }
    };
    // Replace absolute paths for GitHub Pages
    if (process.env.GH_PAGES) {
      config.module.rules.push({
        test: /.html$/,
        loader: 'string-replace-loader',
        options: {
          search: '"\/(attachments|images|javascripts)\/',
          replace(match, p1, offset, string) {
            return `"/${process.env.REPOSITORY_NAME}/${p1}/`;
          },
          flags: 'g'
        },
      });
    }
    return config;
  },
  docs: {
    autodocs: false
  }
}
