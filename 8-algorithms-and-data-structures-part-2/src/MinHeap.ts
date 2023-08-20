// a little upgrade from the MinHeap below
export class MinHeap<T> {
  heap: [T, number][];

  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  getLeftChildIndex(index: number) {
    return 2 * index + 1;
  }

  getRightChildIndex(index: number) {
    return 2 * index + 2;
  }

  getParentIndex(index: number) {
    return Math.floor((index - 1) / 2);
  }

  hasLeftChild(index: number) {
    return this.getLeftChildIndex(index) < this.size();
  }

  hasRightChild(index: number) {
    return this.getRightChildIndex(index) < this.size();
  }

  hasParent(index: number) {
    return this.getParentIndex(index) >= 0;
  }

  leftChild(index: number) {
    return this.heap[this.getLeftChildIndex(index)];
  }

  rightChild(index: number) {
    return this.heap[this.getRightChildIndex(index)];
  }

  parent(index: number) {
    return this.heap[this.getParentIndex(index)];
  }

  swap(index1: number, index2: number) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }

  insert(data: T, priority: number) {
    this.heap.push([data, priority]);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.size() - 1;
    while (
      this.hasParent(index) &&
      this.parent(index)[1] > this.heap[index][1]
    ) {
      this.swap(this.getParentIndex(index), index);
      index = this.getParentIndex(index);
    }
  }

  removeMin() {
    if (this.heap.length === 0) {
      return undefined;
    }

    if (this.heap.length === 1) {
      return this.heap.pop()?.[0];
    }

    const root = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown();

    return root[0];
  }

  heapifyDown() {
    let index = 0;
    while (this.hasLeftChild(index)) {
      let smallerChildIndex = this.getLeftChildIndex(index);

      if (
        this.hasRightChild(index) &&
        this.rightChild(index)[1] < this.leftChild(index)[1]
      ) {
        smallerChildIndex = this.getRightChildIndex(index);
      }

      if (this.heap[index][1] < this.heap[smallerChildIndex][1]) {
        break;
      } else {
        this.swap(index, smallerChildIndex);
      }
      index = smallerChildIndex;
    }
  }
}

// This is a basic MinHeap implementation.
// based on https://www.youtube.com/watch?v=ifNlv0N5wT8&ab_channel=NoobCoder

// export class MinHeap<T> {
//    storage: [T, number][];
//    size: number;

//   constructor() {
//     this.storage = [];
//     this.size = 0;
//   }

//   getLeftChildIndex(index: number) {
//     return 2 * index + 1;
//   }

//   getRightChildIndex(index: number) {
//     return 2 * index + 2;
//   }

//   getParentIndex(index: number) {
//     return Math.floor((index - 1) / 2);
//   }

//   hasLeftChild(index: number) {
//     return this.getLeftChildIndex(index) < this.size;
//   }

//   hasRightChild(index: number) {
//     return this.getRightChildIndex(index) < this.size;
//   }

//   hasParent(index: number) {
//     return this.getParentIndex(index) >= 0;
//   }

//   leftChild(index: number) {
//     return this.storage[this.getLeftChildIndex(index)];
//   }

//   rightChild(index: number) {
//     return this.storage[this.getRightChildIndex(index)];
//   }

//   parent(index: number) {
//     return this.storage[this.getParentIndex(index)];
//   }

//   swap(index1: number, index2: number) {
//     let temp = this.storage[index1];
//     this.storage[index1] = this.storage[index2];
//     this.storage[index2] = temp;
//   }

//   insert(data: T, priority: number) {
//     this.storage[this.size] = [data, priority];
//     this.size += 1;
//     this.heapifyUp();
//   }

//   heapifyUp() {
//     let index = this.size - 1;
//     while (this.hasParent(index) && this.parent(index) > this.storage[index]) {
//       this.swap(this.getParentIndex(index), index);
//       index = this.getParentIndex(index);
//     }
//   }

//   removeMin() {
//     if (this.size == 0) throw new Error('Empty Heap');
//     let data = this.storage[0];
//     this.storage[0] = this.storage[this.size - 1];
//     this.size -= 1;
//     this.heapifyDown();
//     return data;
//   }

//   heapifyDown() {
//     let index = 0;
//     while (this.hasLeftChild(index)) {
//       let smallerChildIndex = this.getLeftChildIndex(index);
//       if (
//         this.hasRightChild(index) &&
//         this.rightChild(index) < this.leftChild(index)
//       )
//         smallerChildIndex = this.getRightChildIndex(index);
//       if (this.storage[index] < this.storage[smallerChildIndex]) break;
//       else this.swap(index, smallerChildIndex);
//       index = smallerChildIndex;
//     }
//   }
// }

// export class MinHeap<T> {
//   public storage: T[];
//   public size: number;

//   constructor() {
//     this.storage = [];
//     this.size = 0;
//   }

//   getLeftChildIndex(index: number) {
//     return 2 * index + 1;
//   }

//   getRightChildIndex(index: number) {
//     return 2 * index + 2;
//   }

//   getParentIndex(index: number) {
//     return Math.floor((index - 1) / 2);
//   }

//   hasLeftChild(index: number) {
//     return this.getLeftChildIndex(index) < this.size;
//   }

//   hasRightChild(index: number) {
//     return this.getRightChildIndex(index) < this.size;
//   }

//   hasParent(index: number) {
//     return this.getParentIndex(index) >= 0;
//   }

//   leftChild(index: number) {
//     return this.storage[this.getLeftChildIndex(index)];
//   }

//   rightChild(index: number) {
//     return this.storage[this.getRightChildIndex(index)];
//   }

//   parent(index: number) {
//     return this.storage[this.getParentIndex(index)];
//   }

//   swap(index1: number, index2: number) {
//     let temp = this.storage[index1];
//     this.storage[index1] = this.storage[index2];
//     this.storage[index2] = temp;
//   }

//   insert(data: T) {
//     this.storage[this.size] = data;
//     this.size += 1;
//     this.heapifyUp();
//   }

//   heapifyUp() {
//     let index = this.size - 1;
//     while (this.hasParent(index) && this.parent(index) > this.storage[index]) {
//       this.swap(this.getParentIndex(index), index);
//       index = this.getParentIndex(index);
//     }
//   }

//   removeMin() {
//     if (this.size == 0) throw new Error('Empty Heap');
//     let data = this.storage[0];
//     this.storage[0] = this.storage[this.size - 1];
//     this.size -= 1;
//     this.heapifyDown();
//     return data;
//   }

//   heapifyDown() {
//     let index = 0;
//     while (this.hasLeftChild(index)) {
//       let smallerChildIndex = this.getLeftChildIndex(index);
//       if (
//         this.hasRightChild(index) &&
//         this.rightChild(index) < this.leftChild(index)
//       )
//         smallerChildIndex = this.getRightChildIndex(index);
//       if (this.storage[index] < this.storage[smallerChildIndex]) break;
//       else this.swap(index, smallerChildIndex);
//       index = smallerChildIndex;
//     }
//   }
// }
