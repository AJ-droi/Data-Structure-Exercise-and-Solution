function HashTable(size = 5) {
  this.keyMap = new Array(size);
}

HashTable.prototype.set = function (key, value) {
  var index = this._hash(key);

  if (!this.keyMap[index]) {
    this.keyMap[index] = [];
  }
  this.keyMap[index].push([key, value]);
};

HashTable.prototype.get = function (key) {
  var index = this._hash(key);

  return !this.keyMap[index]
    ? null
    : this.keyMap[index].find((item) => item[0] === key)[1];
};

HashTable.prototype.containsKey = function (key) {
  var index = this._hash(key);

  if (!this.keyMap[index]) return false;

  const findItem = this.keyMap[index].findIndex((item) => item[0] === key);

  return findItem === -1 ? false : true;
};

HashTable.prototype.remove = function (key) {
  var index = this._hash(key);

  let initalLength = this.keyMap[index].length;
  this.keyMap[index] = this.keyMap[index].filter((item) => item[0] !== key);

  return this.keyMap[index].length < initalLength ? true : false;
};

HashTable.prototype.keys = function(key) {
    var index = this._hash(key);

    if (!this.keyMap[index]) return;

    let keyArray = []

    for(let i in this.keyMap[index]){
        keyArray.push(this.keyMap[index][i][0])
    }

    return keyArray
}


HashTable.prototype.values = function(key) {
    var index = this._hash(key);

    if (!this.keyMap[index]) return;

    let valueArray = []

    for(let i in this.keyMap[index]){
        valueArray.push(this.keyMap[index][i][1])
    }

    return valueArray
}


// Separate Chaining

HashTable.prototype.setSeparateChaining = function (key, value) {
    var index = this._hash(key);
    if (!this.keyMap[index]) {
      this.keyMap[index] = [];
    }
    for (let i = 0; i < this.keyMap[index].length; i++) {
      if (this.keyMap[index][i][0] === key) {
        this.keyMap[index][i][1] = value;
        return;
      }
    }
    this.keyMap[index].push([key, value]);
  };
  
  HashTable.prototype.getSeparateChaining = function (key) {
    var index = this._hash(key);
    const bucket = this.keyMap[index];
    
    if (!bucket) return null;
  
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      }
    }
    
    return null;
  };
  
  // Linear Probing
  
  HashTable.prototype.setLinearProbing = function (key, value) {
    var index = this._hash(key);
    while (this.keyMap[index] !== undefined && this.keyMap[index][0] !== key) {
      index = (index + 1) % this.keyMap.length;
    }
    this.keyMap[index] = [key, value];
  };
  
  HashTable.prototype.getLinearProbing = function (key) {
    var index = this._hash(key);
    while (this.keyMap[index] !== undefined) {
      if (this.keyMap[index][0] === key) {
        return this.keyMap[index][1];
      }
      index = (index + 1) % this.keyMap.length;
    }
    return null;
  };
  

HashTable.prototype.RANDOM_VAL = 18539;

HashTable.prototype._hash = function (key) {
  var hashFunction = function (numericKey, multiple, size) {
    return (numericKey * multiple) % size;
  };

  if (Number.isFinite(key)) {
    return hashFunction(key, this.RANDOM_VAL, this.keyMap.length);
  }

  if (typeof key === "string" && !isNaN(Number(key))) {
    return hashFunction(Number(key), this.RANDOM_VAL, this.keyMap.length);
  }

  var tempKey = key;
  if (key === null) {
    tempKey = "null";
  }

  if (key === undefined) {
    tempKey = "undefined";
  }

  if (isNaN(key) || !isFinite(key)) {
    tempKey = "NaN";
  }

  if (typeof tempKey === "string") {
    var numKey = 0;
    for (var i = 0; i < tempKey.length && i < 5; i++) {
      numKey += tempKey.charCodeAt(i);
    }

    return hashFunction(numKey, this.RANDOM_VAL, this.keyMap.length);
  }
};

const ht = new HashTable(5);
ht.set("apple", 1);
ht.set("apple", 1);
ht.set("banana", 2);
ht.set("cherry", 3);
ht.set(42, "answer");
ht.set(null, "nothing");
ht.set(undefined, "void");
ht.set(NaN, "not-a-number");

console.log(ht);
