import Story from './story';
import EventManager from './event_manager';
import StateManager from './state_manager';
import DisplayManager from './display_manager';

const event_mgr = new EventManager();
const state_mgr = new StateManager(event_mgr);

const story = new Story({event_mgr, state_mgr});
story.loadFromData(document.querySelector('tw-storydata'));
story.init();

const dm = new DisplayManager();
dm.init(story);
dm.update();