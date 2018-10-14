'use strict';

let monday = [
  {
    name: 'Write a summary HTML/CSS',
    duration: 180
  },
  {
    name: 'Some web development',
    duration: 120
  },
  {
    name: 'Fix homework for class10',
    duration: 20
  },
  {
    name: 'Talk to a lot of people',
    duration: 200
  }
];

let tuesday = [
  {
    name: 'Keep writing summary',
    duration: 240
  },
  {
    name: 'Some more web development',
    duration: 180
  },
  {
    name: 'Staring out the window',
    duration: 10
  },
  {
    name: 'Talk to a lot of people',
    duration: 200
  },
  {
    name: 'Look at application assignments new students',
    duration: 40
  }
];

let tasks = monday.concat(tuesday);

const hourlyRate = 20;

function map(arr, mapFn) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const elem = arr[i];
    const mappedValue = mapFn(elem, i, arr);
    result.push(mappedValue);
  }
  return result;
}

function filter(arr, predicateFn) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const elem = arr[i];
    if (predicateFn(elem, i, arr)) {
      result.push(arr[i]);
    }
  }
  return result;
}

function forEach(arr, func) {
  for (let i = 0; i < arr.length; i++) {
    const elem = arr[i];
    func(elem, i, arr);
  }
}
const hourDurations = map(tasks, task => task.duration / 60);
const twoHoursOrMoreDurations = filter(hourDurations, duration => duration >= 2);
const amounts = map(twoHoursOrMoreDurations, duration => duration * hourlyRate);

let total = 0;
forEach(amounts, amount => total += amount);

console.log(`Maartje has earned €${total.toFixed(2)}`);