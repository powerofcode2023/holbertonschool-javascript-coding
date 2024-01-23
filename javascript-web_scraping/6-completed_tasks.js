#!/usr/bin/node
const request = require('request');
const url = process.argv[2];
const results = {};
let completedTasks = 0;
request(url, (err, response, body) => {
  if (err) {
    console.error(err);
  } else {
    const data = JSON.parse(body);
    data.forEach(forUser => {
      const actualUser = forUser.userId;
      completedTasks = 0;
      data.forEach(countTask => {
        if (countTask.userId === actualUser && countTask.completed === true) { completedTasks += 1; }
      });
      if (completedTasks !== 0) { results[actualUser] = completedTasks; }
    });
  }
  console.log(results);
});
