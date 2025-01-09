function calculate(num1, num2, operation) {
  try {
    if (typeof num1 !== "number" || typeof num2 !== "number") {
      throw new Error("Both inputs must be numbers.");
    }
    let result;
    switch (operation) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        if (num2 === 0) {
          throw new Error("Cannot divide by zero");
        }
        result = num1 / num2;
        break;
      default:
        throw new Error("Invalid operation. Please use +, -, *, or /.");
    }
    console.log(result);
    return result;
  } catch (error) {
    console.error(error.message);
  }
}
console.log(calculate(10, 2, "+")); // Should output 12
console.log(calculate(10, 2, "/")); // Should output 5
console.log(calculate(10, 0, "/")); // Should throw "Cannot divide by zero" error
console.log(calculate(10, 2, "&")); // Should throw "Invalid operation" error
