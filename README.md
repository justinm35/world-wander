
# World Wander
Welcome to the World Wander source code, you can check out the live site here [worldwander.justinm.dev](https://worldwander.justinm.dev).

### What is World Wander?
World Wander is a social media website that allows users to share their adventures and travels with the world. Users can mark their locations on a globe. Other users can click on these markers to see pictures and descriptions of the corresponding "wander." The globe is powered by the MapBox GLJS client-side rendering API. Redux Toolkit and RTK Query are used to manage the client global state, queries, and caching. To create a smooth and visually appealing UI/UX, TailwindCSS and Framer Motion animations are employed. In the backend, the API endpoints are created using Node.js and Express. The database is a MongoDB database, and it is accessed using Mongoose.
## Tech Stack

**Client:** React, React Router, Redux, RTK Query, TailwindCSS, Material UI

**Server:** Node, Express, Mongoose, Firebase


## Run Locally

To deploy this project first you must have node and npm installed globally.

Clone the repository:

```bash
  git clone https://github.com/justinm35/world-wander-project.git
```


In the client/src/features/api/apiSlice.tsx file uncommment line 10 if you are running locally. Comment line 12.

Install all node packages (in root and in functions folder):

```bash
  npm install
```

To start the client and server locally cd into the functions directory and run:

```bash
  npm run dev
```

Vite will select a port that is available on your machine to host on. Vite will then display the URL in the console. Use that URL to access the UI.
### Thanks for checking out my project :)