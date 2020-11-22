import Markdown from './markdown';

class Template {
  render(source: string): string {
    source = this.renderLinks(source);
    source = this.renderMarkdown(source);
    source = this.renderDetails(source);
    return source;
  }

  private renderMarkdown(source: string): string {
    const renderer = new Markdown();
    return renderer.render(source);
  }

  private renderDetails(source: string): string {
    return source.replace(/\[(.*)\]\{([^\}]*)\}/g, (_, label, text) => {
      return this.htmlify(
        'a',
        {
          href: 'javascript:void(0)',
          'data-detail-show': this.renderMarkdown(text),
          class: 'detail-link'
        },
        [label]
      );
    });
  }

  // copied from Chapbook
  private renderLinks(source: string): string {
    return source.replace(/\[\[(.*?)\]\]/g, (_, target) => {
      let label = target;
  
      // display|target format
  
      const barIndex = target.indexOf('|');
  
      if (barIndex !== -1) {
        label = target.substr(0, barIndex);
        target = target.substr(barIndex + 1);
      } else {
        // display->target format
  
        const rightArrIndex = target.indexOf('->');
  
        if (rightArrIndex !== -1) {
          label = target.substr(0, rightArrIndex);
          target = target.substr(rightArrIndex + 2);
        } else {
          // target<-display format
  
          const leftArrIndex = target.indexOf('<-');
  
          if (leftArrIndex !== -1) {
            label = target.substr(leftArrIndex + 2);
            target = target.substr(0, leftArrIndex);
          }
        }
      }
  
      return this.renderLink(target, label || target);
    });
  }

  // copied from Chapbook
  // adjusted not to use cb in attr
  private renderLink(target, label) {
    // Does the target look like an external link?
  
    if (/^\w+:\/\/\/?\w/i.test(target)) {
      return this.htmlify(
        'a',
        {
          href: target,
          target: '_blank'
        },
        [label || target]
      );
    }
  
    // We'll treat it as an internal one if not.
  
    return this.htmlify(
      'a',
      {
        href: 'javascript:void(0)',
        'data-passage-change': target
      },
      [label || target]
    );
  }

  // copied from Chapbook
  private domify(tagName: string, attrs, children = []) {
    const result = document.createElement(tagName);
  
    Object.keys(attrs).forEach(a => {
      if (attrs[a] !== undefined) {
        result.setAttribute(a, attrs[a]);
      }
    });
  
    children.forEach(c => {
      if (typeof c === 'string') {
        result.appendChild(document.createTextNode(c));
      } else {
        result.appendChild(c);
      }
    });
  
    return result;
  }
  
  // copied from Chapbook
  private htmlify(tagName: string, attrs, children) {
    return this.domify(tagName, attrs, children).outerHTML;
  }
}

export default Template