// Fibonacci

function fibonacci(num) {
  let currentNumber = 0;
  let result = [0];

  for (let i = 0; i < num - 1; i++) {
    if (currentNumber == 0) {
      result.push(1);
      currentNumber++;
    } else {
      result.push(result[i - 1] + result[i]);
      currentNumber++;
    }
  }
  return result;
}

function fiboRec(num) {
  const result = [0, 1];
  if (num <= 1) return [0];
  if (num === 2) return result;

  let fibSeries = fiboRec(num - 1);
  fibSeries.push(
    fibSeries[fibSeries.length - 2] + fibSeries[fibSeries.length - 1]
  );

  return fibSeries;
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr; // Base case: single element or empty array

  let mid = Math.floor(arr.length / 2); // Find the middle index
  let left = mergeSort(arr.slice(0, mid)); // Recursively sort the left half
  let right = mergeSort(arr.slice(mid)); // Recursively sort the right half

  return merge(left, right); // Merge the sorted halves
}

// Helper function to merge two sorted arrays
function merge(left, right) {
  let sortedArray = [];
  let i = 0,
    j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      sortedArray.push(left[i]);
      i++;
    } else {
      sortedArray.push(right[j]);
      j++;
    }
  }

  // Append remaining elements (if any)
  return sortedArray.concat(left.slice(i)).concat(right.slice(j));
}

console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));
