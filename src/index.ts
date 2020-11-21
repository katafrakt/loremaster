import Story from './story';

const story = new Story();
story.loadFromData(document.querySelector('tw-storydata'));
story.init();