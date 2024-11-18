// FIXME: Build error
// import '@/jquery/jquery-ui-1.13.2.css';
// import '@/tribute-5.1.3.css';
// import '@/application.css';
// import '@/responsive.css';
// import '@/jstoolbar.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  options: {
    storySort: {
      order: ['Layout', 'Pages', 'Components', '*'],
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    hideNoControlsWarning: true,
  },
  backgrounds: {
    default: 'white',
    values: [
      {
        name: 'white',
        value: 'white',
      },
    ],
  },
}
