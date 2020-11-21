import Story from "./story";
import Passage from "./story/passage";

class DisplayManager {
  currentPassage: Passage;
  story: Story;
  rootElement: Element;

  init(story: Story) {
    this.rootElement = document.getElementById('app');
    this.story = story;
  }

  update() {
    const currentPassage = this.story.currentPassage;
    this.rootElement.innerHTML = currentPassage.source;
  }
}

export default DisplayManager;