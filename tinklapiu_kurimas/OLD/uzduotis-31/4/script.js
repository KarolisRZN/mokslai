function sumNumbers(arr) {
    return arr.reduce((sum, num) => sum + num, 0);
  }
  console.log(sumNumbers([1, 4, 8]));