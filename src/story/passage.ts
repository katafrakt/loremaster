class Passage {
  id: number;
  name: string;
  source: any;
  tags: string[];

  constructor(id: number, name: string, source: any) {
    this.id = id;
    this.name = name;
    this.source = source;
  }
}

export default Passage;