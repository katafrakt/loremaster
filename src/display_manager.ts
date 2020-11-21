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
      let target = e.target;

			if(target instanceof HTMLElement) {
				if (
					target.dataset &&
					Object.keys(target.dataset).some(key => key == 'passageChange')
				) {
					this.event_mgr.emit(`passage-change`, target.dataset.passageChange);
				}

				target = target.parentNode;
			}
    });

    this.event_mgr.on('refresh-display', (_) => {
      this.update();
    });
  }
}

export default DisplayManager;