function Node(val) {
    this.value = val;
    this.next = null;
}

function Stack() {
    this.first = null;
    this.last = null;
    this.size = 0;

    this.push = (value) => {
        let newNode = new Node(value)
    
        if(this.size === 0){
            this.first = newNode;
            this.last = newNode;
        }else{
           newNode.next = this.first
           this.first = newNode
        }
    
        this.size++
    
        return this.size
    }

    this.pop = () => {
        if(this.size === 0) return null

        let poppedValue = this.first

        if(this.length === 1){
            this.first = null
            this.last = null
        }else{
            this.first = this.first.next
        }

        this.size--

        return poppedValue.value
    }

    this.peek =() => {
        if(this.size === 0) return null

        return this.first.value
    }
    
}


const stackk = new Stack()

stackk.push(3)

console.log(stackk)
