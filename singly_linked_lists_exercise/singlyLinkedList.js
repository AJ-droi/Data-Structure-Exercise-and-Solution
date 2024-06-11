function Node(val) {
  this.val = val;
  this.next = null;
}

function SinglyLinkedList() {
  this.head = null;
  this.tail = null;
  this.length = 0;

  this.push = (val) => {
    let newNode = new Node(val);

    if (this.head === null) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  };

  this.pop = () => {
    if (this.head === null) return undefined;

    let current = this.head;
    let newTail = current;
    while (current.next) {
      newTail = current;
      current = current.next;
    }

    this.tail = newTail;
    this.tail.next = null;
    this.length--;

    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return current.val;
  };



  this.unshift = (val) => {
    let newNode = new Node(val);

    if (this.head === null) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      let current = this.head;
      this.head = newNode;
      this.head.next = current;
    }

    this.length++;
    return this;
  };

  this.shift = () => {

    if(this.head === null) return undefined

    let current = this.head;
    this.head = current.next;
    this.length--;

    return current.val
  }

  this.set = (index, value) => {
    if (index < 0 || index >= this.length) return false;

    let current = this.head;
    let count = 0;

    while (count !== index) {
      current = current.next;
      count++;
    }

    if (current) {
      current.val = value;
      return true;
    }

    return false;
  };

  this._get = (index) => {
    if (index < 0 || index >= this.length) return null;

    let current = this.head;
    let count = 0;

    while (count !== index) {
      current = current.next;
      count++;
    }

    return current
  };

  this.get = (index) => {
    let foundNode = this._get(index);
    return foundNode ? foundNode.val : null;
  }


  this.insert = (index, value) => {
    if (index < 0 || index > this.length) return false;

    if (index === this.length) return this.push(value);

    if (index === 0) return this.unshift(value);

    let current = this.head;
    let count = 0;
    let newNode = new Node(value)

    while (count !== index-1) {
      current = current.next;
      count++;
    }

    let temp = current.next;
    current.next = newNode;
    newNode.next = temp;

    this.length++;
    return true;
  };


  this.remove = (index) => {
    if (index < 0 || index >= this.length) return undefined;

    if (index === this.length - 1) return this.pop();

    if (index === 0) return this.shift();


    let removedNode = this._get(index-1)

    let temp = removedNode.next;
    removedNode.next = temp.next;

    this.length--;

    return temp.val;
  }

  this.reverse = () => {
    let current = this.head;
    this.head = this.tail;
    this.tail = current;

    let prev = null;
    let next = null;

    for (let i = 0; i < this.length; i++) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;

      console.log(next, prev, current)
    }

    return this;
  
  }


}

let list = new SinglyLinkedList();

list.push(5);
list.push(7);

list.unshift(4);


list.insert(1,6)
list.shift()
console.log(list.reverse())



console.log(list);
