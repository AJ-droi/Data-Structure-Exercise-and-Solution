function Node(val) {
    this.value = val;
    this.next = null;
}

 function Queue() {
    this.first = null;
    this.last = null;
    this.size = 0;

    this.enqueue = (value) => {
        let node = new Node(value)

        if(this.size ===0){
            this.first = node;
            this.last = node;
        }

        this.last.next = node
        this.last = node

        this.size++

        return this.size
    }

    this.dequeue = () => {
        if(this.size === 0) return null

        let temp = this.first

        if(this.size === 1){
            this.first = null;
            this.last = null;
        }else{
            this.first = this.first.next
        }

        this.size--

        return temp.value
    }

    this.peek =() => {
        if(this.size === 0) return null

        return this.first.value
    }
}

let que = new Queue

que.enqueue(7)
que.enqueue(8)
console.log(que.dequeue())

console.log(que)