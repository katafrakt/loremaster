import Passage from './story/passage';
import Node from './interfaces/node';

class Story {
  name: string;
  startNode: any;
  creatorVersion: any;

  constructor() {
    // TODO: custom scripts and style go here
  }

  init() {
    document.title = this.name;
  }

  loadFromData(el: Node) {
    let passages: any[];

    ['name', 'creator', 'ifid', 'options'].forEach(
      attr => (this[attr] = el.getAttribute(attr))
    );
  
    /* Camel-case creator version and start node. */
  
    this.startNode = parseInt(el.getAttribute('startnode'));
    this.creatorVersion = el.getAttribute('creator-version');
  
    /* Custom script and style. */
  
    const elsToContents = els => els.map(el => el.textContent);
  
    // story.customScripts = elsToContents(
    //   selectAll(el, '[type="text/twine-javascript"]')
    // );
    // story.customStyles = elsToContents(selectAll(el, '[type="text/twine-css"]'));
  
    /* Create passages. */
  
    passages = this.selectAll(el, 'tw-passagedata').map(p => {
      let passage = new Passage(
        parseInt(p.getAttribute('pid')), 
        p.getAttribute('name'), 
        p.textContent
      );
  
      const tagAttr = p.getAttribute('tags');
  
      if (tagAttr) {
        passage.tags = tagAttr.split(' ');
      } else {
        passage.tags = [];
      }
  
      return passage;
    });
  }

  private selectAll(el: Node, selector: string): Element[] {
    return Array.from(el.querySelectorAll(selector));
  }
}

export default Story;