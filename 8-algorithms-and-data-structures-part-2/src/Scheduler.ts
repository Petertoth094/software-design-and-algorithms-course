import {PriorityQueue} from './PriorityQueue';

export interface SchedulerI {
  postTask(task: () => Promise<any>, priority: number): void;
  run(): Promise<void>;
}

export class Scheduler implements SchedulerI {
  taskQueue: PriorityQueue<() => Promise<any>> = new PriorityQueue<
    () => Promise<any>
  >();

  postTask(task: () => Promise<any>, priority: number): void {
    this.taskQueue.enqueue(task, priority);
  }

  async run(): Promise<void> {
    const tasks: (() => Promise<any>)[] = [];

    while (!this.taskQueue.isEmpty()) {
      const task = this.taskQueue.dequeue();
      if (task) {
        tasks.push(task);
      }
    }

    tasks.forEach(async (task) => await task());
  }
}
