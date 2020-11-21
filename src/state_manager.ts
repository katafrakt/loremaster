import EventManager from "./event_manager";

class StateManager {
  state: {[index: string] : any};
  event_manager: EventManager;

  constructor(event_manager: EventManager) {
    this.event_manager = event_manager;
    this.state = {};
  }

  get(name: string): any {
    return this.state[name];
  }

  setDefault(name: string, value: any) {
    const previous = this.get(name);
  
    //log(`Defaulting "${name}" to ${JSON.stringify(value)}`);
    //deepSet(defaults, name, value);
    this.state[name] = value
  
    if (previous === null || previous === undefined) {
      this.event_manager.emit('state-change', {name, value, previous});
    }
  }
}

export default StateManager;