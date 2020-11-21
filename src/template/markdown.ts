/*
A custom renderer for Marked that:
-	Renders a div#fork instead of a blockquote character
*/

import marked from 'marked';

class Markdown {
  renderer: any;

  constructor() {
    this.renderer = new marked.Renderer();

    Object.assign(this.renderer, {
      blockquote(src): string {
        return `<div class="fork">${src}</div>`;
      },
    });
  }

  render(source: string): string {
    const options = {
      renderer: this.renderer,
      smartypants: true
    }

    // TODO: can we NOT use global?
    marked.setOptions(options);
    return marked(source);
  }
}

export default Markdown;