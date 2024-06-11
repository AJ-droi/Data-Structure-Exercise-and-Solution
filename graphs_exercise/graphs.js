function Graph(){
    this.vertices = [];
    this.adjacencyList = {};
}

Graph.prototype.addVertex = function(node){
    this.vertices.push(node);

    this.adjacencyList[`${node}`] = []
}


// Add an edge between two vertices
Graph.prototype.addEdge = function(vertex1, vertex2) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
        this.adjacencyList[vertex1].push(vertex2);
        this.adjacencyList[vertex2].push(vertex1); // Since it's an undirected graph
    }
};


 // Remove an edge between two vertices
Graph.prototype.removeEdge = function(vertex1, vertex2) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
        this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(v => v !== vertex2);
        this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(v => v !== vertex1); // Since it's an undirected graph
    }
};

// Remove a vertex and all associated edges
Graph.prototype.removeVertex = function(vertex) {
    if (!this.adjacencyList[vertex]) return;

    // Remove the vertex from the adjacency list of all connected vertices
    while (this.adjacencyList[vertex].length) {
        const adjacentVertex = this.adjacencyList[vertex].pop();
        this.removeEdge(vertex, adjacentVertex);
    }

    // Remove the vertex from the adjacency list
    delete this.adjacencyList[vertex];

    // Remove the vertex from the vertices array
    this.vertices = this.vertices.filter(v => v !== vertex);
};


// Depth-First Search (DFS) - Recursive
Graph.prototype.depthFirstSearch = function(start) {
    const result = [];
    const visited = {};
    const adjacencyList = this.adjacencyList;

    function dfs(vertex) {
        if (!vertex) return null;
        visited[vertex] = true;
        result.push(vertex);
        adjacencyList[vertex].forEach(neighbor => {
            if (!visited[neighbor]) {
                return dfs(neighbor);
            }
        });
    }

    dfs(start);
    return result;
};


// Breadth-First Search (BFS) - Iterative
Graph.prototype.breadthFirstSearch = function(start) {
    const queue = [start];
    const result = [];
    const visited = {};
    let currentVertex;

    visited[start] = true;

    while (queue.length) {
        currentVertex = queue.shift();
        result.push(currentVertex);

        this.adjacencyList[currentVertex].forEach(neighbor => {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.push(neighbor);
            }
        });
    }

    return result;
};



// WeightedGraph constructor
function WeightedGraph() {
    Graph.call(this); // Call the Graph constructor
}

// Inherit from Graph
WeightedGraph.prototype = Object.create(Graph.prototype);
WeightedGraph.prototype.constructor = WeightedGraph;

// Add edge with weight
WeightedGraph.prototype.addEdge = function(vertex1, vertex2, weight) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
        this.adjacencyList[vertex1].push({ node: vertex2, weight });
        this.adjacencyList[vertex2].push({ node: vertex1, weight });
    }
};


// Dijkstra's algorithm
WeightedGraph.prototype.Dijkstra = function(start, end) {
    const distances = {};
    const priorityQueue = new PriorityQueue();
    const previous = {};
    let path = []; // to return at the end
    let smallest;

    // build up initial state
    for (let vertex in this.adjacencyList) {
        if (vertex === start) {
            distances[vertex] = 0;
            priorityQueue.enqueue(vertex, 0);
        } else {
            distances[vertex] = Infinity;
            priorityQueue.enqueue(vertex, Infinity);
        }
        previous[vertex] = null;
    }

    // as long as there is something to visit
    while (priorityQueue.values.length) {
        smallest = priorityQueue.dequeue().val;
        if (smallest === end) {
            // we are done
            // build up path to return at end
            while (previous[smallest]) {
                path.push(smallest);
                smallest = previous[smallest];
            }
            break;
        }

        if (smallest || distances[smallest] !== Infinity) {
            for (let neighbor in this.adjacencyList[smallest]) {
                // find neighboring node
                let nextNode = this.adjacencyList[smallest][neighbor];
                // calculate new distance to neighboring node
                let candidate = distances[smallest] + nextNode.weight;
                let nextNeighbor = nextNode.node;
                if (candidate < distances[nextNeighbor]) {
                    // updating new smallest distance to neighbor
                    distances[nextNeighbor] = candidate;
                    // updating previous - How we got to neighbor
                    previous[nextNeighbor] = smallest;
                    // enqueue in priority queue with new priority
                    priorityQueue.enqueue(nextNeighbor, candidate);
                }
            }
        }
    }

    return [distances[end], path.concat(smallest).reverse()];
};

// PriorityQueue for Dijkstra's algorithm
class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(val, priority) {
        this.values.push({ val, priority });
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }
}


// Example Usage
const graphh = new WeightedGraph();
graphh.addVertex("A");
graphh.addVertex("B");
graphh.addVertex("C");
graphh.addVertex("D");
graphh.addVertex("E");
graphh.addVertex("F");

graphh.addEdge("A", "B", 4);
graphh.addEdge("A", "C", 2);
graphh.addEdge("B", "E", 3);
graphh.addEdge("C", "D", 2);
graphh.addEdge("C", "F", 4);
graphh.addEdge("D", "E", 3);
graphh.addEdge("D", "F", 1);
graphh.addEdge("E", "F", 1);

console.log(graphh)

console.log(graphh.Dijkstra("A", "E"));
