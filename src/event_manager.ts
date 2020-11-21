// TODO: replace nanobus with custom implementation or at least figure
// out if its feasible (should be)
import Nanobus from 'nanobus';

class EventManager {
  bus: Nanobus;

  constructor() {
    this.bus = new Nanobus();
  }

  on(event: string, callback: any) {
    this.bus.on(event, callback);
  }

  emit(event: string, value: any) {
    console.log('emitting ', event, value);
    this.bus.emit(event, value);
  }
}

export default EventManager;