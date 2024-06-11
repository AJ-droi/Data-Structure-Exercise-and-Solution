const linearSearch = (searchArray, searchValue) => {
    for(let index in searchArray){
        if(searchArray[index] == searchValue){
            return parseInt(index)
        }
    }
    return -1
}

const linearSearchRecursive = (searchArray, searchValue, index=0) => {
    if(index >= searchArray.length){
        return -1
    }

    if(searchArray[index] === searchValue){
        return index
    }

    return linearSearchRecursive(searchArray, searchValue, index+1)
}

const binarySearch= (searchArray, searchValue) => {
    // Sort the array first
    let sortedArray = searchArray.slice().sort((a, b) => a - b);

    let start = 0;
    let end = sortedArray.length - 1;

    while (start <= end) {
        const midpointIndex = Math.floor((start + end) / 2);
        console.log(midpointIndex, sortedArray[midpointIndex]); // Debugging output

        if (sortedArray[midpointIndex] === searchValue) {
            return midpointIndex;
        } else if (sortedArray[midpointIndex] < searchValue) {
            start = midpointIndex + 1;
        } else {
            end = midpointIndex - 1;
        }
    }

    return -1; // Value not found
};


const binarySearchRecursive = (searchArray, searchValue) => {
    let sortedArray = searchArray.slice().sort((a,b) => a - b)

    // Internal helper function to perform binary search
    const binarySearch = (arr, value, start, end) => {
        if (start > end) {
            return -1; // Base case: value not found
        }

        const midpointIndex = Math.floor((start + end) / 2);

        if (arr[midpointIndex] === value) {
            return midpointIndex;
        } else if (arr[midpointIndex] < value) {
            return binarySearch(arr, value, midpointIndex + 1, end);
        } else {
            return binarySearch(arr, value, start, midpointIndex - 1);
        }
    };

    return binarySearch(sortedArray, searchValue, 0, sortedArray.length - 1);

  
   
}




console.log(linearSearch([1,2,3,4,5], 5))