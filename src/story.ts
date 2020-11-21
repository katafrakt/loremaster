import Passage from './story/passage';
import EventManager from './event_manager';
import StateManager from './state_manager';

interface StoryParams {
  event_mgr: EventManager,
  state_mgr: StateManager
}

class Story {
  name: string;
  startNode: number;
  creatorVersion: any;
  passages: Passage[];
  currentPassage: Passage;
  event_mgr: EventManager;
  state_mgr: StateManager;

  constructor({event_mgr, state_mgr}: StoryParams) {
    this.event_mgr = event_mgr;
    this.state_mgr = state_mgr;
  }

  init() {
    document.title = this.name;
    this.event_mgr.emit('trail', [this.startNode]);
    const passageId = this.startNode;
    this.currentPassage = this.passages.find((e) => e.id == passageId);
    this.bindEvents();
  }

  loadFromData(el: Element) {
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
  
    this.passages = this.selectAll(el, 'tw-passagedata').map(p => {
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

  private selectAll(el: Element, selector: string): Element[] {
    return Array.from(el.querySelectorAll(selector));
  }

  private bindEvents() {
    this.event_mgr.on('passage-change', (targetPassageName: string) => {
      this.goToPassage(targetPassageName)
    });
  }

  private goToPassage(name: string) {
    const passage: Passage = this.passages.find((e) => e.name == name)
    if(passage) {
      this.currentPassage = passage;
      this.event_mgr.emit('refresh-display', null);
    } else {
      console.warn('Unknown passage ' + name);
    }
  }
}

export default Story;