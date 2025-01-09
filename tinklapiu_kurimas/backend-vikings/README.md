# LAB | JS Vikings

![giphy](https://user-images.githubusercontent.com/76580/167318130-3f0e5e19-86bc-4278-aaab-a988febcea3f.gif)

<details>
  <summary>
   <h2>Learning Goals</h2>
  </summary>

 This exercise allows you to practice and apply the concepts and techniques taught in class. 

  Upon completion of this exercise, you will be able to:

  - Define a `class` and use it to create objects (instances).
  - Create a subclass that extends a parent class using `extends` and `super()` to inherit properties and methods.
  - Define class methods that use the `this` keyword to access object properties.
  - Add or remove items from an array using the array methods (`push`, `pop`, `shift`, `unshift`, and `splice`).
  - Iterate over arrays using the `for` and `forEach` loops.
  - Pass values as arguments to functions.
  - Use the `return` keyword to return a value from a function.

  <br>
  <hr> 

</details>

## Instructions

You will work on the `src/viking.js` file.

Your task is to write the correct code in the `src/viking.js` file. In this file, you will find the following starter code:

```javascript
// Soldier
class Soldier {}

// Viking
class Viking {}

// Saxon
class Saxon {}

// War
class War {}
```


### Iteration 0: 

 Soldier class should receive 2 arguments (health & strength), so we have to write the correct code. Let's make the `Soldier` class receive two arguments:

```javascript
// Soldier
class Soldier {
  constructor(health, strength) {}
}

// Viking
class Viking {}

// Saxon
class Saxon {}

// War
class War {}
```

<br>


### Iteration 1: Soldier

Modify the `Soldier` class and add 2 methods to it: `attack()`, and `receiveDamage()`.

#### class

- should receive **2 arguments** (health & strength)
- should receive the **`health` property** as its **1st argument**
- should receive the **`strength` property** as its **2nd argument**

#### `attack()` method

- should be a function
- should receive **0 arguments**
- should return **the `strength` property of the `Soldier`**

#### `receiveDamage()` method

- should be a function
- should receive **1 argument** (the damage)
- should remove the received damage from the `health` property
- **shouldn't return** anything

<br>

### Iteration 2: Viking

A `Viking` is a `Soldier` with an additional property, their `name`. They also have a different `receiveDamage()` method and a new method, `battleCry()`.

Modify the `Viking` class, have it inherit from `Soldier`, re-implement the `receiveDamage()` method for `Viking`, and add a new `battleCry()` method.

#### inheritance

- `Viking` should **extend** `Soldier`

#### class

- should receive **3 arguments** (name, health & strength)
- should receive the **`name` property** as its **1st argument**
- should receive the **`health` property** as its **2nd argument**
- should receive the **`strength` property** as its **3rd argument**

#### `attack()` method

(This method should be **inherited** from `Soldier`, no need to re-implement it.)

- should be a function
- should receive **0 arguments**
- should return **the `strength` property of the `Viking`**

#### `receiveDamage()` method

This method needs to be **re-implemented** for `Viking` because the `Viking` version needs to have different return values.

- should be a function
- should receive **1 argument** (the damage)
- should remove the received damage from the `health` property
- **if the `Viking` is still alive**, it should return **"NAME has received DAMAGE points of damage"**
- **if the `Viking` dies**, it should return **"NAME has died in act of combat"**

#### `battleCry()` method

- should be a function
- should receive **0 arguments**
- should return **"Odin Owns You All!"**

<br>

### Iteration 3: Saxon

A `Saxon` is a weaker kind of `Soldier`. Unlike a `Viking`, a `Saxon` has no name. Their `receiveDamage()` method will also be different than the original `Soldier` version.

Modify the `Saxon`, constructor function, have it inherit from `Soldier` and re-implement the `receiveDamage()` method for `Saxon`.

#### inheritance

- `Saxon` should extend `Soldier`

#### class

- You don't have to include a constructor method since this class will inherit perfectly from the parents class, both the health and the strength (it `extends` Soldier class :wink: )

#### `attack()` method

This method should be **inherited** from `Soldier`, no need to re-implement it.

- should be a function
- should receive **0 arguments**
- should return **the `strength` property of the `Saxon`**

#### `receiveDamage()` method

This method needs to be **re-implemented** for `Saxon` because the `Saxon` version needs to have different return values.

- should be a function
- should receive **1 argument** (the damage)
- should remove the received damage from the `health` property
- **if the Saxon is still alive**, it should return **_"A Saxon has received DAMAGE points of damage"_**
- **if the Saxon dies**, it should return **_"A Saxon has died in combat"_**

<br>

### Iteration 4: War

Now we get to the good stuff: WAR! Our `War` class will allow us to have a `Viking` army and a `Saxon` army that battle each other.

Modify the `War` class and add 5 methods to its `class`:

- `addViking()`
- `addSaxon()`
- `vikingAttack()`
- `saxonAttack()`
- `showStatus()`

#### class

When we first create a `War`, the armies should be empty. We will add soldiers to the armies later.

- should receive **0 arguments**
- should assign an empty array to the **`vikingArmy` property**
- should assign an empty array to the **`saxonArmy` property**

#### `addViking()` method

Adds 1 `Viking` to the `vikingArmy`. If you want a 10 `Viking` army, you need to call this 10 times.

- should be a function
- should receive **1 argument** (a `Viking` object)
- should add the received `Viking` to the army
- **shouldn't return** anything

#### `addSaxon()` method

The `Saxon` version of `addViking()`.

- should be a function
- should receive **1 argument** (a `Saxon` object)
- should add the received `Saxon` to the army
- **shouldn't return** anything

#### `vikingAttack()` method

A `Saxon` (chosen at random) has their `receiveDamage()` method called with the damage equal to the `strength` of a `Viking` (also chosen at random). This should only perform a single attack and the `Saxon` doesn't get to attack back.

- should be a function
- should receive **0 arguments**
- should make a `Saxon` `receiveDamage()` equal to the `strength` of a `Viking`
- should remove dead Saxons from the army
- should return **result of calling `receiveDamage()` of a `Saxon`** with the `strength` of a `Viking`

#### `saxonAttack()` method

The `Saxon` version of `vikingAttack()`. A `Viking` receives damage equal to the `strength` of a `Saxon`.

- should be a function
- should receive **0 arguments**
- should make a `Viking` `receiveDamage()` equal to the `strength` of a `Saxon`
- should remove dead Vikings from the army
- should return **result of calling `receiveDamage()` of a `Viking`** with the `strength` of a `Saxon`

<br>

