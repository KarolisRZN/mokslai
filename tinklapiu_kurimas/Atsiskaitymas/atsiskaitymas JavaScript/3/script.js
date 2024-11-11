function sumPositiveNumbers() {
  let sum = 0;
  while (true) {
    let input = prompt("Įveskite skaičių:");
    let num = parseFloat(input);
    if (num < 0) {
      break;
    }
    if (num >= 0) {
      sum += num;
    }
  }
  console.log("Visų įvestų teigiamų skaičių suma:", sum);
}
sumPositiveNumbers();
