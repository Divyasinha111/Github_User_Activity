# GitHub User Activity CLI

A simple command-line tool built with Node.js to fetch and display the recent public activity of any GitHub user using the GitHub API.

## Features

- Fetch recent public events of a GitHub user
- Display meaningful activity summaries like commits pushed, issues opened, repositories starred, and more
- Handles errors gracefully for invalid usernames or API failures
- No external HTTP request libraries needed — uses Node.js built-in `https` module
- Simple to run and extend

## Requirements

- Node.js v12 or higher
- Internet connection

  **This project is inspired by and part of the roadmap.sh projects:**  
[https://roadmap.sh/projects/github-user-activity]

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/github-user-activity.git

2. Navigate into the project directory:
cd github-activity

3. (Optional) Install dependencies if you add any later:
npm install

4. Run the CLI by providing a GitHub username as an argument:
node index.js <username>


