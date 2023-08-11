// PriorityQueue
export class Queue<T> {
  public elements: [T, number][];

  constructor() {
    this.elements = [];
  }

  enqueue(element: [T, number]) {
    if (this.isEmpty()) {
      this.elements.push(element);
    } else {
      let added = false;
      for (let i = 1; i <= this.elements.length; i++) {
        if (element[1] < this.elements[i - 1][1]) {
          this.elements.splice(i - 1, 0, element);
          added = true;
          break;
        }
      }
      if (!added) {
        this.elements.push(element);
      }
    }
  }

  dequeue() {
    let value = this.elements.shift();
    return value;
  }

  isEmpty() {
    return this.elements.length === 0;
  }
}
