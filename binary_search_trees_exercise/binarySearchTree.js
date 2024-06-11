


function Node(val) {
  this.value = val;
  this.left = null;
  this.right = null;
}

function BinarySearchTree() {
  this.root = null;
}

BinarySearchTree.prototype.insertIteratively = function (val) {
  let newNode = new Node(val);

  // If the tree is empty, set the new node as the root
  if (this.root === null) {
    this.root = newNode;
    return this; // Return the tree instance for chaining
  }

  let current = this.root;
  let parent = null;

  while (current !== null) {
    parent = current;
    if (val < current.value) {
      current = current.left;
    } else {
      current = current.right;
    }
  }

  // At this point, parent is the node to which we need to attach the new node
  if (val < parent.value) {
    parent.left = newNode;
  } else {
    parent.right = newNode;
  }

  return this; // Return the tree instance for chaining
};

BinarySearchTree.prototype.insertRecursively = function (val) {
  let newNode = new Node(val);

  // If the tree is empty, set the new node as the root
  if (this.root === null) {
    this.root = newNode;
    return this; // Return the tree instance for chaining
  }

  this.binaryRecursive = (current, val) => {
    if (val < current.value) {
      if (current.left === null) {
        current.left = newNode;
      } else {
        this.binaryRecursive(current.left, val);
      }
    } else {
      if (current.right === null) {
        current.right = newNode;
      } else {
        this.binaryRecursive(current.right, val);
      }
    }
  };

  this.binaryRecursive(this.root, val);

  return this;
};

BinarySearchTree.prototype.findIteratively = function (val) {
  let current = this.root;

  while (current) {
    if (val === current.value) {
      return current;
    } else if (val < current.value) {
      current = current.left;
    } else {
      current = current.right;
    }
  }

  return undefined;
};

BinarySearchTree.prototype.findRecursively = function (val) {
  let current = this.root;

  this.binaryFindRecursive = (node, value) => {
    if (node === null) return undefined;

    if (value === node.value) {
      return node;
    } else if (val < node.value) {
      return this.binaryFindRecursive(node.left, val);
    } else {
      return this.binaryFindRecursive(node.right, val);
    }
  };

  return this.binaryFindRecursive(current, val);
};

BinarySearchTree.prototype.toArray = function() {
    let array = [];
    let stack = [];
    let current = this.root;
  
    while (current !== null || stack.length > 0) {
      // Reach the leftmost Node of the current Node
      while (current !== null) {
        stack.push(current);
        current = current.left;
      }
  
      // Current must be null at this point
      current = stack.pop();
      array.push(current.value);
  
      // Visit the right subtree
      current = current.right;
    }
  
    return array;
  };
  

BinarySearchTree.prototype.DFSPreOrder = function() {
    if(this.root === null){
        return null
    }

    let array = [];
    let stack = []
    let current = this.root
    stack.push(current)

    while(stack.length !== 0){
        current = stack.pop()

        if(current.right !== null){
            stack.push(current.right)
        }
        
        if(current.left !== null){
           stack.push(current.left)
        }

        array.push(current.value)
    }

    return array

}

BinarySearchTree.prototype.DFSInOrder = function() {
    if(this.root === null){
        return null
    }

    let array = [];
    let stack = []
    let current = this.root

    while(current || stack.length !== 0){
        while(current !== null){
            stack.push(current)
            current= current.left
        }

        current = stack.pop()
        array.push(current.value)
        current = current.right
    }

    return array
}

BinarySearchTree.prototype.DFSPostOrder = function() {
    if (this.root === null) {
        return [];
    }

    let array = [];
    let stack = [];
    let current = this.root;

    while (current !== null || stack.length > 0) {
        // Traverse to the leftmost node
        while (current !== null) {
            // Push the node and a marker to the stack
            stack.push({ node: current, processed: false });
            current = current.left;
        }

        // Peek the top element of the stack
        let { node, processed } = stack.pop();

        if (!processed) {
            // Push the node back to the stack with the processed flag set to true
            stack.push({ node, processed: true });
            // Traverse the right subtree
            current = node.right;
        } else {
            // If processed, add the node's value to the array
            array.push(node.value);
            current = null;
        }
    }

    return array;
};


BinarySearchTree.prototype.breadthFirstSearch = function() {
  let array = [];
  let queue = [];

  if (this.root === null) {
    return array;
  }

  queue.push(this.root);

  while (queue.length > 0) {
    let node = queue.shift();
    array.push(node.value);

    if (node.left !== null) {
      queue.push(node.left);
    }
    if (node.right !== null) {
      queue.push(node.right);
    }
  }

  return array;
};

BinarySearchTree.prototype.remove = function(val) {
  if (this.root === null) return null;

  let parent = null;
  let current = this.root;

  // Find the node to be removed and its parent
  while (current !== null && current.value !== val) {
    parent = current;
    if (val < current.value) {
      current = current.left;
    } else {
      current = current.right;
    }
  }

  // Node not found
  if (current === null) return null;

  // Case 1: Node has no children (leaf node)
  if (current.left === null && current.right === null) {
    if (current === this.root) {
      this.root = null;
    } else if (current === parent.left) {
      parent.left = null;
    } else {
      parent.right = null;
    }
  }
  // Case 2: Node has one child
  else if (current.left === null || current.right === null) {
    let child = current.left !== null ? current.left : current.right;

    if (current === this.root) {
      this.root = child;
    } else if (current === parent.left) {
      parent.left = child;
    } else {
      parent.right = child;
    }
  }
  // Case 3: Node has two children
  else {
    let successorParent = current;
    let successor = current.right;

    // Find the in-order successor (leftmost node in the right subtree)
    while (successor.left !== null) {
      successorParent = successor;
      successor = successor.left;
    }

    // Replace current node's value with the successor's value
    current.value = successor.value;

    // Fix the right subtree
    if (successorParent !== current) {
      successorParent.left = successor.right;
    } else {
      successorParent.right = successor.right;
    }
  }

  return current;
};




let tree = new BinarySearchTree();

tree.insertIteratively(8);
tree.insertIteratively(9);
tree.insertIteratively(7);
tree.insertIteratively(3);
tree.insertIteratively(10);

// console.log(tree.BreadthFirstSearch())



console.log(tree);
