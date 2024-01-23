#!/usr/bin/node
const request = require('request');
const url = process.argv[2];

request(url, (err, response, body) => {
  if (err) {
    console.error(err);
    return;
  }

  if (response.statusCode !== 200) {
    console.error(`Error status code: ${response.statusCode}`);
    return;
  }

  try {
    const tasks = JSON.parse(body);
    const results = {};

    tasks.forEach(task => {
      if (task.completed) {
        if (!results[task.userId]) {
          results[task.userId] = 0;
        }
        results[task.userId]++;
      }
    });

    for (const user in results) {
      if (results.hasOwnProperty(user) && results[user] === 0) {
        delete results[user];
      }
    }

    console.log(results);
  } catch (error) {
    console.error(error);
  }
});
