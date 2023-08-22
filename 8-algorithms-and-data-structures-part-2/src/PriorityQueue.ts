import {MinHeap} from './MinHeap';

interface PriorityQueueI<T> {
  enqueue(value: T, priority: number): void;
  dequeue(): T | undefined;
  size(): number;
}

export class PriorityQueue<T> implements PriorityQueueI<T> {
  queue: MinHeap<T>;

  constructor() {
    this.queue = new MinHeap();
  }

  enqueue(value: T, priority: number): void {
    this.queue.insert(value, priority);
  }

  dequeue(): T {
    return this.queue.poll();
  }

  size(): number {
    return this.queue.size();
  }

  isEmpty(): boolean {
    return this.queue.size() === 0;
  }
}
