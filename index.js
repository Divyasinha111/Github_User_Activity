const https = require('https');
require('dotenv').config();

// Get username from command line
const username = process.argv[2];

if (!username) {
  console.log('Usage: node index.js <github-username>');
  process.exit(1);
}

// Read GitHub token from .env
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
  console.error('GitHub token not found. Please add it to your .env file.');
  process.exit(1);
}

const url = `https://api.github.com/users/${username}/events`;

const options = {
  headers: {
    'User-Agent': 'node.js',
    'Authorization': `token ${GITHUB_TOKEN}`
  }
};

https.get(url, options, (res) => {
  let data = '';

  if (res.statusCode !== 200) {
    console.error(`Failed to fetch. Status Code: ${res.statusCode}`);
    res.resume();
    return;
  }

  res.on('data', chunk => {
    data += chunk;
  });

//     res.on('end', () => {
//     try {
//     const events = JSON.parse(data);

//     // ✅ Show full event data (debugging)
//     console.log(JSON.stringify(events, null, 2));

//     // displayEvents(events); // 🔒 Commented out for now
//   } catch (err) {
//     console.error('Error parsing JSON:', err.message);
//   }
// });


  res.on('end', () => {
    try {
      const events = JSON.parse(data);
      displayEvents(events);
    } catch (err) {
      console.error('Error parsing JSON:', err.message);
    }
  });

}).on('error', err => {
  console.error('Error:', err.message);
});

// function displayEvents(events) {
//   if (!events.length) {
//     console.log('No recent activity found.');
//     return;
//   }

//   events.slice(0, 10).forEach(event => {
//     const repo = event.repo.name;
//     const type = event.type;

//     switch (type) {
//       case 'PushEvent':
//         const commitCount = event.payload.commits.length;
//         console.log(`- Pushed ${commitCount} commits to ${repo}`);
//         break;
//       case 'IssuesEvent':
//         if (event.payload.action === 'opened') {
//           console.log(`- Opened a new issue in ${repo}`);
//         }
//         break;
//       case 'WatchEvent':
//         console.log(`- Starred ${repo}`);
//         break;
//       case 'ForkEvent':
//         console.log(`- Forked ${repo}`);
//         break;
//       default:
//         console.log(`- ${type} in ${repo}`);
//     }
//   });
// }


function displayEvents(events) {
  if (!events.length) {
    console.log('No recent activity found.');
    return;
  }

  events.slice(0, 10).forEach(event => {
    const repo = event.repo.name;
    const type = event.type;

    switch (type) {
      case 'PushEvent':
        const commitCount = event.payload.commits.length;
        console.log(`- Pushed ${commitCount} commits to ${repo}`);
        break;
      case 'IssuesEvent':
        if (event.payload.action === 'opened') {
          console.log(`- Opened a new issue in ${repo}`);
        }
        break;
      case 'WatchEvent':
        console.log(`- Starred ${repo}`);
        break;
      case 'ForkEvent':
        console.log(`- Forked ${repo}`);
        break;
      default:
        console.log(`- ${type} in ${repo}`);
    }
  });
}
