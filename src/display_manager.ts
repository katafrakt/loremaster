import EventManager from "./event_manager";
import Story from "./story";
import Passage from "./story/passage";
import Template from "./template";

class DisplayManager {
  currentPassage: Passage;
  story: Story;
  rootElement: Element;
  templateRenderer: Template;
  event_mgr: EventManager;

  init(story: Story, event_mgr: EventManager) {
    this.rootElement = document.getElementById('app');
    this.story = story;
    this.event_mgr = event_mgr;
    this.templateRenderer = new Template();
    this.attachEventListeners()
  }

  update() {
    const currentPassage = this.story.currentPassage;
    const html = this.templateRenderer.render(currentPassage.source);
    this.rootElement.innerHTML = html;
  }

  attachEventListeners() {
    document.body.addEventListener("click", e => {
      let target = e.target as HTMLElement;

			if(target instanceof HTMLElement) {
        // we might click on something else, such as <em>
        while(!(target instanceof HTMLAnchorElement) && !(target === null)) {
          target = target.parentElement as HTMLElement;
        }
        if (target == null) return;

				if (
					target.dataset && Object.keys(target.dataset).some(key => key == 'passageChange')) {
					this.event_mgr.emit('passage-change', target.dataset.passageChange);
				} else if (
          target.dataset && Object.keys(target.dataset).some(key => key == 'detailShow')) {
            this.event_mgr.emit('detail-show', target.dataset.detailShow);
          }
        }
    });

    this.event_mgr.on('refresh-display', (_) => {
      this.update();
    });

    this.event_mgr.on('detail-show', (text: string) => {
      let modal_body = document.getElementById('modal-body');
      modal_body.innerHTML = text;
      document.dispatchEvent(new Event('toggleModal'))
    });
  }
}

export default DisplayManager;