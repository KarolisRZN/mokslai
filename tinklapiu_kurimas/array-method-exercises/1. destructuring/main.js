/* EXAMPLES */

/* Example of Simple Array Destructuring */
function printFirst2Cars() {
  // In this example, we are destructuring from an array of car manufacturers.
  const cars = ["Toyota", "Mazda", "Honda", "Ford"];

  /* When we destructure data from arrays, values are selected based on their index. 
  The variable names we assign to these values do not matter. */
  const [car1, car2] = cars;

  console.log(car1, car2); // Outputs: Toyota Mazda
}

/* Example of Simple Object Destructuring */
function printJediNameAndAge() {
  // In this example, we are destructuring select data from a user object.
  const jedi = {
    name: "Yoda",
    occupation: "Jedi Master",
    age: 800,
    lightSaberColor: "green",
  };

  /* When we destructure data from objects, values are selected based on the object key.
       In this case, the variable names must match the keys of the values we want to extract from the object. */
  const { name, age } = jedi;

  console.log(name, age); // Outputs: Yoda 800
}

/* Example of Destructuring a Function from an Array */
function executeSomeFunction() {
  const data = [
    "hello",
    function helloWorld() {
      console.log("Hello World");
    },
  ];

  const [text, someFunction] = data;

  someFunction(); // Outputs: Hello World
}

/* TODO EXERCISES */

/* Practice with Array Destructuring */
function printFirst2Fruits() {
  // Here, we have an array of fruit names.
  const fruits = ["Apple", "Banana", "Cherry", "Date"];

  /* TODO: Destructure the first two fruit names from the array.
         Use array destructuring to select the first and second fruit.
         Assign them to variables and log those variables to the console. */
  // Example: const [fruit1, fruit2] = fruits;
  const [fruit1, fruit2] = fruits;
  // Uncomment and complete the line below to log the first two fruits.
  // console.log(/* Your variables here */); // Expected Output: Apple Banana
  console.log(fruit1, fruit2);
}

/* Practice with Object Destructuring */
function printCharacterDetails() {
  // In this example, we have an object representing a character.
  const character = {
    name: "Luke Skywalker",
    species: "Human",
    occupation: "Jedi Knight",
    homePlanet: "Tatooine",
  };

  /* TODO: Destructure 'species' and 'occupation' from the character object.
         Remember, when destructuring objects, the variable names must match the object keys.
         Assign them to variables and log those variables to the console. */
  // Example: const { species, occupation } = character;
  const { species, occupation } = character;
  console.log(species, occupation);
  // Uncomment and complete the line below to log the species and occupation
  // console.log(/* Your variables here */); // Expected Output: Human Jedi Knight
}

/* Practice with Destructuring and Executing Functions from Arrays */
function printMissionDetails() {
  // In this example, we have an object representing a space mission.
  const mission = {
    name: "Voyager 1",
    planet: "Jupiter",
    year: 1979,
    missionType: "Flyby",
  };

  /* TODO: Destructure 'planet' and 'year' from the mission object.
         Use object destructuring to extract these two properties.
         Assign them to variables and log those variables to the console. */
  // Example: const { planet, year } = mission;
  const { planet, year } = mission;
  console.log(planet, year);
  // Uncomment and complete the line below to log the planet and year of the mission
  // console.log(/* Your variables here */); // Expected Output: Jupiter 1979
}

// DO NOT EDIT CODE BEYOND THIS LINE
console.log("printFirst2Cars:");
printFirst2Cars();
console.log("printJediNameAndAge:");
printJediNameAndAge();
console.log("executeSomeFunction:");
executeSomeFunction();
console.log("printFirst2Fruits:");
printFirst2Fruits();
console.log("printCharacterDetails:");
printCharacterDetails();
console.log("printMissionDetails:");
printMissionDetails();
