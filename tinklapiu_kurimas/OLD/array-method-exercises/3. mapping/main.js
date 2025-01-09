const numbers = [1, 2, 3, 4];
const names = ["james", "mary", "john", "jennifer", "michael", "elizabeth"];
const users = [
  {
    name: "James",
    age: 28,
    email: "james@example.com",
    address: {
      city: "New York",
      country: "USA",
    },
  },
  {
    name: "Mary",
    age: 34,
    email: "mary@example.com",
    address: {
      city: "London",
      country: "UK",
    },
  },
  {
    name: "John",
    age: 45,
    email: "john@example.com",
    address: {
      city: "Sydney",
      country: "Australia",
    },
  },
  {
    name: "Jennifer",
    age: 22,
    email: "jennifer@example.com",
    address: {
      city: "Toronto",
      country: "Canada",
    },
  },
];

// A function that takes an array of numbers and returns a new array with each number doubled.
function doubleNumbers(numbers) {
  return numbers.map((number) => number * 2);
}
const doubled = doubleNumbers(numbers);
console.log(doubled);

// A function that takes an array of numbers and returns a new array with 5 added to each number.
function addFive(numbers) {
  return numbers.map((number) => number + 5);
}
const result = addFive(numbers);
console.log(result);

// A function that takes an array of names and returns a new array with "hello " in front of each name.
function greetPerson(names) {
  return names.map((name) => "hello " + name);
}
// const greetings = greetPerson(names);
// console.log(greetings);

//A function that takes an array of names and returns a new array with each name capitalized.
function capitalizeNames(names) {
  return names.map(
    (name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
  );

  /* This one is a bit trickier.
        utilize slice and toUpperCase string methods.*/
}
const capitalizedNames = capitalizeNames(names);
console.log(capitalizedNames);

// !!!!!!!!!!!!!!!!!!!!!!!!!!!This one is a bit bigger and incorporates HTML!!!!!!!!!!!!!!!
function createUserCard(user) {
  const {
    name,
    age,
    email,
    address: { city, country },
  } = user;

  // Generate HTML for the card component
  const cardHTML = `
    <div class="card">
    <div class="card-header">
    <h2>${name}</h2>
    <p>Age: ${age}</p>
    </div>
    <div class="card-body">
    <p>Email: ${email}</p>
    <p>Location: ${city}, ${country}</p>
    </div>
    </div>
    `;

  return cardHTML;
}

function renderUserCards(users) {
  const USER_CONTAINER = document.getElementById("user-container");
  // utilize the map method and createUserCard function to generate an array of html views
  //iterate over the html views and append them to the USER_CONTAINER.
}

const doubledArray = doubleNumbers(numbers);
console.log(doubledArray); /*should output 2, 4, 6, 8 */

const plusFive = addFive(numbers);
console.log(plusFive); /*should output 6, 7, 8, 9 */

const greetings = greetPerson(names);
console.log(greetings); /*should output 
                                hello james
                                hello mary
                                hello john
                                hello jennifer
                                hello michael
                                hello elizabeth */

const capitalizedArray = capitalizeNames(names);
console.log(capitalizedArray); /* 
                                    James
                                    Mary
                                    John
                                    Jennifer
                                    Michael
                                    Elizabeth*/

renderUserCards(users);
/* The output of this function should be visible on the UI(html preview)*/
