function allPositive(arr) {
  return arr.every((num) => num > 0);
}
console.log(allPositive([1, 2, 3, 4, 5]));
console.log(allPositive([1, 2, -3, 4, 5]));
console.log(allPositive([0, 0, 1]));
