const bubbleSort = (array) => {
    let swapped = true;
    while (swapped) {
        swapped = false;
        for (let i = 0; i < array.length; i++) {
            if (array[i] > array[i + 1]) {
                let temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapped = true;
            }
        }
    }
    return array;
}


const insertionSort = (array) => {
    for (let i = 1; i < array.length; i++) {
        let current = array[i]
        let j=i-1

       while(j>=0 && array[j] > current ){
              array[j+1] = array[j]
              j--
       }

       array[j+1] = current
    }
  
    return array;
}

const selectionSort = (array) => {
    for (let i = 0; i < array.length; i++) {
        let minimumIndex = i
        let j=i+1

         while(j<array.length){
              if(array[j]< array[minimumIndex]){
                minimumIndex = j
              }
              j++
            }

            if(i !== minimumIndex){
                let temp = array[i];
                array[i] = array[minimumIndex];
                array[minimumIndex] = temp;
            }      
    
    }

    return array
}

const mergeSort = (array) => {

    if (array.length <= 1) {
        return array;
    }

    let mid = Math.floor(array.length / 2);
    let left = array.slice(0, mid);
    let right = array.slice(mid);

    return merge(mergeSort(left), mergeSort(right));
}

const merge = (left, right) => {

    let sortedArray = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // Merge the two arrays together until one is empty
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            sortedArray.push(left[leftIndex]);
            leftIndex++;
        } else {
            sortedArray.push(right[rightIndex]);
            rightIndex++;
        }
    }

 
    // Concatenate remaining elements
    return sortedArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

const quickSort = (array) => {
    // Base case: arrays with fewer than 2 elements are already sorted
    if (array.length < 2) {
        return array;
    }

    // Choose a pivot element (here we choose the last element)
    const pivot = array[array.length - 1];
    let left = [];
    let right = [];

    // Partition the array into two subarrays: one with elements less than the pivot and one with elements greater than or equal to the pivot
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] < pivot) {
            left.push(array[i]);
        } else {
            right.push(array[i]);
        }
    }

    // Recursively apply quick sort to the left and right subarrays, then concatenate the results with the pivot
    return [...quickSort(left), pivot, ...quickSort(right)];
};




