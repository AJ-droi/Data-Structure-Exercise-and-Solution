function Node(val){
    this.val = val;
    this.prev = null;
    this.next = null;
}

function DoublyLinkedList(){
    this.head = null;
    this.tail = null;
    this.length = 0;

    this.push = (value) => {
        let newNode = new Node(value);
        if(this.length === 0){
            this.head = newNode;
            this.tail = newNode;
        }

        this.tail.next = newNode
        newNode.prev = this.tail
        this.tail = newNode
        
        this.length++

        return this
    }

    this.pop = () => {
        if(this.head === null) return undefined

        let temp = this.tail

        if(this.length === 1){
            this.head = null
            this.tail = null
        }else{
            this.tail = temp.prev
            this.tail.next = null
        }

        this.length--
        return temp.val
    }

    this.unshift = (value) => {
        let nodeValue = new Node(value)

        if(this.length === 0){
            this.head = nodeValue
            this.tail = nodeValue
        }else{
            this.head.prev = nodeValue
            nodeValue.next = this.head
            this.head = nodeValue
        }

        this.length++

        return this
    }

    this.shift = () => {
        if(this.length === 0) return undefined

        let temp = this.head
        this.head.prev = null
        this.head = this.head.next

        this.length--

        return temp.val
    }


    this.set = (index, value) => {
        if(index < 0 || index >= this.length) return false

        let counter = 0
        let current = this.head

        while(counter !== index){
            current = current.next
            counter++
        }

       current.val = value
       return true
    }

    this._get=(index) => {
        if (index < 0 || index >= this.length) return null;

        let current = this.head;
        let count = 0;

        while (count !== index) {
            current = current.next;
            count++;
        }

        return current;
    }

    this.get = (index) => {
        let foundNode = this._get(index)
        return foundNode ? foundNode.val : null
    }

    this.insert = (index,value) => {
        if(index < 0 || index > this.length) return false

        if(index === 0) return this.unshift(value)
        if(index === this.length) return this.push(value)

        let newNode = new Node(value)
        let prevNode = this._get(index-1)
        let nextNode = prevNode.next

        prevNode.next = newNode
        newNode.prev = prevNode
        newNode.next = nextNode
        nextNode.prev = newNode

        this.length++

        return this

    }

    this.remove = (index) => {
        if(index < 0 || index > this.length) return false

        if(index === 0) return this.shift()
        if(index === this.length) return this.pop()

        let removedNode = this._get(index)
        let prevNode = removedNode.prev
        let nextNode = removedNode.next

        prevNode.next = nextNode
        nextNode.prev = prevNode
        this.length--

        return removedNode
    }


    this.reverse = () => {
        let current = this.head
        this.head = this.tail
        this.tail = current

        let prev = null
        let next = null

        for(let i=0; i<this.length; i++){
            next = current.next
            current.next = prev
            current.prev = next
            prev = current
            current = next
        }

        return this
    }
}

const list = new DoublyLinkedList()

list.push(1)
list.push(5)
list.push(7)

console.log(list.insert(1,8))
console.log(list)