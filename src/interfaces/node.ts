interface Node {
  textContent: string;
  getAttribute(attr: string): string;
  querySelectorAll(attr: string): NodeListOf<any>;
}

export default Node;