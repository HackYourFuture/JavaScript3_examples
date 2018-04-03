# Functions, callbacks, promises and async/await

## Why use functions?

We create and use functions to make our programming life easier, not harder. But in order to use them effectively we must have a sound understanding of how to organize them.

Because our brain limits the complexity that we can manage at any single point in time¹, it is better to carve up a large task into a number of smaller tasks, each doing one thing only and doing it well. We can then focus on each of the small tasks, one at a time. This is a strategy of "divide and conquer²".

When applying this strategy, we are in the knowledge that each individual task has been well taken care of, and we no longer need to worry about the internal details of each of them. Instead, we can now focus on orchestrating the combined use of the smaller tasks to establish the greater goals of the larger task. If there is a problem somewhere in our code, we can try and find the smaller task that causes the problem, fix it in isolation and not worry about all the other smaller tasks while doing that.

Taking the above into consideration, the most effective JavaScript functions exhibit the following characteristics:

- They are relatively small.
- They do one thing only and do it well.
- They are named to accurately describe what the function does.
- They get all the data they require through arguments, each named to accurately describe what the argument represents. They do not reference global variables.
- If the purpose of the function is to produce a new value from its argument(s), that value is returned from the function through a `return` statement. In this case the function should produce no side-effects (see next point).
- Functions that do not return a value are said to produce a "side-effect", e.g. writing to the console, generating HTML elements etc.
- If the function produces a value asynchronously, that value must be "returned" by means of a callback or promise.

Notes:

1. In psychology this is called "cognitive load": _the total amount of mental activity imposed on working memory in any one instant_. See for instance: [What is cognitive load?](http://theelearningcoach.com/learning/what-is-cognitive-load/)
2. _Divide and conquer_ is an approach to a problem or task, attempting to achieve an objective by breaking it into smaller parts. Often it is used to separate a force that would be stronger if united, or to cause confusion amongst rival factions. Divide and conquer has applications in many areas, from political science to economic and military strategy. <small>(Source: http://www.axis-and-allies.com/military-tactics-divide-and-conquer.html#w21)</small>


## Example: Eating lunch (Campbell's tomato soup)

Let's look at a simple example that applies all these principles in practice. The problem at hand is preparing and eating lunch. The lunch itself is a bit simplistic: it consist of a can of [Campbell's tomato soup](https://www.campbellsfoodservice.com/product/campbells-classic-tomato/). The larger task is to:

1. Open the can with a can opener.
2. Warm up the contents of each can.
3. Enjoy the warmed up soup.

First, we need some way to represent our canned foodstuff. Let's use a JavaScript object literal for that.

```js
const campbellsTomatoSoup = {
  contents: 'tomato soup',
  weightInOz: 12
};
```

Of course, we could well write this simple example without using any functions or perhaps just one or two but for demonstration purposes, let's use a couple more. Given the tasks at hand, the following set of functions seems appropriate:

| Function | Description |
| -------- | ----------- |
| `openCan(foodCan)` | Opens a food can and returns its contents. |
| `warmUp(food)` | Warms up the food and return the heated food. |
| `eat(food)` | Writes to the console that we are eating the food. |
| `eatLunch(cannedFood)` | Takes a can of food as its argument and calls the previous three functions to prepare and eat the canned food. |
| `main()` | Starts up the whole process by calling `eachLunch()` and passing it the `campbellsTomatoSoup` object. |  

We will develop five versions of this example. The first version is the simplest, without any asynchronous activity. In versions two and beyond we will introduce the factor of time and as a consequence, asynchronicity.

### Version 1: Base version

File: [1-functions-sync.js](1-functions-sync.js)

A complete solution using plain JavaScript functions is shown below in Listing 1.

```js
'use strict';

const campbellsTomatoSoup = {
  contents: 'tomato soup',
  brand: 'Campbell',
  weightInOz: 12
};

function openCan(foodCan) {
  return foodCan.contents;
}

function warmUp(food) {
  return 'hot ' + food;
}

function eat(food) {
  console.log('Eating: ' + food);
}

function eatLunch(cannedFood) {
  const contents = openCan(cannedFood);
  console.log('Opened can: ' + contents);
  const hotFood = warmUp(contents);
  console.log('Warmed up: ' + hotFood);
  eat(hotFood);
}

function main() {
  console.log('It\'s lunch time!');
  eatLunch(campbellsTomatoSoup);
  console.log('Finished lunch');
}

main();
```

Listing 1. Eating lunch (base version)

This version should produce the following output in the console (try and confirm this by just reading and analyzing the code of Listing 1!):

```
It's lunch time!
Opened can: tomato soup
Warmed up: hot tomato soup
Eating: hot tomato soup
Finished lunch
```

### Version 2: Callbacks, using regular functions

File: [2-functions-callback.js](./2-functions-callback.js)

In this version and the next version we will introduce the factor of time. It will now take some time to open a can and some more time to warm up its contents. Eating the soup also takes time.

For the examples we will use accelerated time (seconds instead of minutes), otherwise we will just be waiting too long.

| Task | Time required (secs) |
| ---- | :-----------: |
| open a can | 2 |
| warm up contents | 4 |
| eating contents | 4 |

We will use the standard `setTimeout()` function to time the various time dependent activities.

We will also use two helper functions, notably `startTimer()` and `stopTimer()`, to show the elapsed time (in seconds) while we are waiting. These helper functions reside in a separate file (`timer.js`), so that they do not clutter up the code we want to focus on. To access them, we must use some syntax from Node (see below).  If you are unfamiliar with Node just take it for granted for now that this syntax makes the functions `startTimer()` and `stopTimer()` available for use in our code. 

```js
const { startTimer, stopTimer } = require('./timer');
```

As our tasks take time now, we can no longer use a `return` statement to return the result of a task. Instead, we need to rewrite our functions to handle the asynchronous nature of the tasks. In version 2 of the example as described in this section we will use _callback_ functions to achieve this.

| Function | Description |
| -------- | ----------- |
| `openCan(foodCan, onOpened)` | Opens a food can and when done, calls the `onOpened` callback passing it the opened contents. |
| `warmUp(food, onReady)` | Warns up the food and when done, calls the `onReady` callback to pass back the heated food. |
| `eat(food, onReady)` | Writes to the console that we are eating the food and when done, calls the `onReady` callback. |
| `eatLunch(cannedFood, onReady)` | Takes a can of food as its argument and calls the previous three functions to prepare and eat the canned food. It calls the `onReady` callback when done. |
| `main()` | Starts the timer, calls `eatLunch()` passing it the `campbellsTomatoSoup` object and stops the timer when the lunch has been finished. |  

Let's look at the first function, `openCan(foodCan, onOpened)`, and inspect how it works. 

```js
function openCan(foodCan, onOpened) {
  setTimeout(function () {
    onOpened(foodCan.contents);
  }, 2000);
}
```

The revised `openCan()` function now uses the standard `setTimeout()` function to simulate the time it takes to open a can (2 secs). When the time has passed, it call the `openOpened` callback, passed as argument by its caller, and passes it the opened contents of the food can.

The other time-dependent functions work similarly; for details check the file `2-functions-callback.js`.

Let's focus now on the function `eatLunch()` shown in Listing 2 below. As in the previous version, we start with opening the can by calling `openCan()`. Because opening a can now takes time, we can no longer obtain the content of the can as a simple return value of the `openCan` function, but instead, must supply a callback to receive the contents when the can has been opened.

```js
function eatLunch(cannedFood, onReady) {
  openCan(cannedFood, function (contents) {
    warmUp(contents, function (hotFood) {
      eat(hotFood, onReady);
    });
  });
}
```

Listing 2. The `eatLunch()` function, asynchronous version (for brevity, all `console.log` statements have been removed).

Because we cannot warm up the contents of the can before it has been opened, we can must handle warming up of the content inside the callback we passed to `openCan()`.  

Similarly, we cannot eat the hot food until it has been fully warmed up. Therefore, we need to wait for the hot food by passing a callback to `warmUp()` that will receive it (when ready) in its argument `hotFood`. 

We can now start eating the hot food. When done we need to call the `onReady` callback to give notification that we have finished our lunch and can stop the timer.

The `main()` function that starts up the whole process looks like this:

```js
function main() {
  startTimer();
  eatLunch(campbellsTomatoSoup, function () {
    stopTimer();
    console.log('Finished lunch');
  });
}
```

Listing 3. The `main()` function, asynchronous version.

In `main()` we first start the timer, call our function `eatLunch()`, passing it a can of Campbell's soup and a callback function to stop the timer when we finished eating our lunch.

When we finally execute our `main()` function, the following output will be produced (taking 10 seconds in total to complete):

```
It's lunch time!
Opening can
1
2
Opened can: tomato soup
Warming up: tomato soup
3
4
5
6
Warmed up: hot tomato soup
Eating: hot tomato soup
7
8
9
10
Finished eating: hot tomato soup
Finished lunch
```

## Version 3: Callbacks, using ES6 fat arrow functions

File: [3-functions-callback-fat-arrow.js](./3-functions-callback-fat-arrow.js)

This version is nearly identical to Version 2. However, all (anonymous) callback functions are now converted to ES6 fat arrow functions. Let's take the `eatLunch()` function as illustration (leaving the `console.log` statements, for brevity). The first code snippet shows the version using regular functions. The second one uses ES6 fat arrow functions.

```js
function eatLunch(cannedFood, onReady) {
  openCan(cannedFood, function (contents) {
    warmUp(contents, function (hotFood) {
      eat(hotFood, onReady);
    });
  });
}
```

```js
function eatLunch(cannedFood, onReady) {
  openCan(cannedFood, contents => {
    warmUp(contents, hotFood => {
      eat(hotFood, onReady);
    });
  });
}
```

To convert a regular anonymous function to a fat arrow function you can just take out the `function` keyword and insert a "fat arrow" `=>` between the closing parenthesis of the argument list and the opening curly brace of the function body.

If there is exactly one argument in the function's argument list you can also take out the parentheses surrounding the argument.

If the function body of a fat arrow function consists of one line only, the function can be written even more concisely by taking out the curly braces too. In that case, if the function returns a value, the `return` keyword must be taken out too. For example, the following fat arrow function returns the square of a number:

```js
const square = x => x * x;

console.log(square(4)); // -> 16
```

## Version 4: Promises

File: [4-functions-promise.js](./4-functions-promise.js)

We will not repeat here the explanation that we have provided in the [fundamental on promises](https://github.com/HackYourFuture/fundamentals/blob/master/fundamentals/promises.md). But let's look how can convert the `openCan()` function.

We no longer need a callback parameter in our `openCan()` function, only the `foodCan` that we want to open. In the promise version, we create a promise with `new Promise(resolve => { ... })`. Note that, because we are not rejecting anything, we don't need a `reject` argument in the function that we pass to the `Promise` constructor. Our `openCan()` function returns the newly created promise.

```js
// callback version
function openCan(foodCan, onOpened) {
  setTimeout(() => {
    onOpened(foodCan.contents);
  }, 2000);
}
```

```js
// promise version
function openCan(foodCan) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(foodCan.contents);
    }, 2000);
  });
}
```

Our `eatLunch()` and `main()` functions can now be rewritten as follows (`console.log` statements taken out for brevity):

```js
function eatLunch(cannedFood) {
  return openCan(cannedFood)
    .then(contents => {
      return warmUp(contents);
    })
    .then(hotFood => {
      return eat(hotFood);
    });
}

function main() {
  startTimer();
  eatLunch(campbellsTomatoSoup)
    .then(() => {
      stopTimer();
    });
}
```

## Version 5: async/await

File: [5-functions-await.js](./5-functions-await.js)

In the final version, we will "consume" the promises with `async` and `await`, as described in the [fundamental on async/await](https://github.com/HackYourFuture/fundamentals/blob/master/fundamentals/async_await.md). The `eatLunch()` function using `async` and `await` looks similar to the synchronous version (shown here as comments). It is almost as if the factor time has been taken out again. Note however, that we still need to create promises to begin with: it's only at the "consuming" side that we can benefit from using `async` and `await`.

```js
function openCan(foodCan) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(foodCan.contents);
    }, 2000);
  });
}

// synchronous version
// function eatLunch(cannedFood) {
//   const contents = openCan(cannedFood);
//   const hotFood = warmUp(contents);
//   eat(hotFood);

async function eatLunch(cannedFood) {
  const contents = await openCan(cannedFood);
  const hotFood = await warmUp(contents);
  await eat(hotFood);
  return;
}

async function main() {
  startTimer();
  await eatLunch(campbellsTomatoSoup);
  stopTimer();
}
```