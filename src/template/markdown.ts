/*
A custom renderer for Marked that:
-	Renders a div#fork instead of a blockquote character
*/

import marked from 'marked';

const rendererOverride = {
  blockquote(src): string {
    return `<div class="fork">${src}</div>`;
  }
}

class Markdown {
  render(source: string): string {
    // TODO: can we NOT use global?
    marked.use({ renderer: rendererOverride });
    return marked(source);
  }
}

export default Markdown;