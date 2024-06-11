function MaxBinaryHeap() {
  this.values = [];
}

MaxBinaryHeap.prototype.insert = function (value) {
  this.values.push(value);

  let lastIndex = this.values.length - 1;
  // let lastItem = this.values[lastIndex]

  while (lastIndex > 0) {
    let parentIndex = Math.floor((lastIndex - 1) / 2);

    if (this.values[lastIndex] < this.values[parentIndex]) break;

    let temp = this.values[parentIndex];
    this.values[parentIndex] = this.values[lastIndex];
    this.values[lastIndex] = temp;
    lastIndex = parentIndex;
  }
};

MaxBinaryHeap.prototype.remove = function () {
  if (this.values.length === 0) return;

  const root = this.values[0];
  const lastItem = this.values.pop();

  this.values[0] = lastItem;

  let index = 0;
  const length = this.values.length;
  const element = this.values[0];

  while (true) {
    let leftChildIndex = 2 * index + 1;
    let rightChildIndex = 2 * index + 2;
    let leftChild, rightChild;
    let swap = null;

    if (leftChildIndex < length) {
      leftChild = this.values[leftChildIndex];
      if (leftChild > element) {
        swap = leftChildIndex;
      }
    }

    if (rightChildIndex < length) {
      rightChild = this.values[rightChildIndex];
      if (
        (swap === null && rightChild > element) ||
        (swap !== null && rightChild > leftChild)
      ) {
        swap = rightChildIndex;
      }
    }

    if (swap === null) break;

    this.values[index] = this.values[swap];
    this.values[swap] = element;
    index = swap;
  }

  return root;
};

const checkMaxHeap = (value) => {
  if (value.length === 0) return false;

  for (let index in value) {
    let leftChild = value[2 * index + 1];
    let rightChild = value[2 * index + 2];
    let parent = value[index];

    if (leftChild > parent || rightChild > parent) {
      return false;
    }

    return true;
  }
};

const maxHeapify = (array) => {
  const heapSize = array.length;

  const heapify = (index) => {
    let largest = index;
    let left = 2 * index + 1;
    let right = 2 * index + 2;

    if (left < heapSize && array[left] > array[largest]) {
      largest = left;
    }

    if (right < heapSize && array[right] > array[largest]) {
      largest = right;
    }

    if (largest !== index) {
      [array[index], array[largest]] = [array[largest], array[index]];
      heapify(largest);
    }
  };

  // Build max heap
  for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
    heapify(i);
  }

  return array;
};

// Example usage:
const array = [3, 19, 1, 14, 8, 7];
// console.log(maxHeapify(array)); // Output should be a max-heap

let heap = new MaxBinaryHeap();

heap.insert(10);
heap.insert(9);
heap.insert(8);
heap.insert(7);
heap.insert(6);
heap.insert(5);
heap.insert(4);
heap.insert(3);

console.log(heap.remove());
