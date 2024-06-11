const productOfArray = (array) => {
    if (array.length === 0) {
        return 1;
    }
    return array[0] * productOfArray(array.slice(1));
}

// const contains = (object, value) => {

//     if(object == null || Object.keys(object).length == 0 ){
//         return false
//     }

//     let objectEntries = Object.entries(object)

//     if(objectEntries[0][1] === value || Object.keys(objectEntries[0][1])[0] === value){
//         return true
//     }

//     let newObject = object[objectEntries[0][0]]

//     return contains(newObject, value)
  
// }

const contains = (object, checkValue) => {
    if (object == null || Object.keys(object).length === 0) {
        return false;
    }

    for (let [key, value] of Object.entries(object)) {
        if (key === checkValue || value === checkValue) {
            return true;
        }
        if (typeof value === 'object' && contains(value, checkValue)) {
            return true;
        }
    }

    return false;
};

const search = (searchArray, searchValue) => {
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

console.log(search([1,2,3,4,5],5)) // 4

// function fib(n) {
//     if (n <= 0) { return 0; }
//     if (n <= 2) { return 1; }

//     return fib(n - 1) + fib(n - 2); 
//   }

// console.log(fib(5))