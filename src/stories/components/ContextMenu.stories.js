import html from './context-menu.html';
import '@/javascripts/context_menu';
import '@/stylesheets/context_menu.css';

export default {
  title: "Components/ContextMenu",
  decorators: [
    (Story) => (
      `<div style="width: 300px; max-width: 100%; margin: 0 auto;">${Story()}</div>`
    ),
  ],
};

export const ContextMenu = () => html
